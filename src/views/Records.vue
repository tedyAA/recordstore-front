<template>
  <div>
    <div>
     <h1> Your records </h1>
      <ul class="list-reset mt-4">
        <li class="py-4" v-for="record in records" :key="record.id" :record="record">
          <div class="flex items-center justify-between flex-wrap">
            <div class="flex-1 flex justify-between flex-wrap pr-4">
              <p class="block flex font-mono font-semibold flex items-center">
                <svg class="fill-current text-indigo w-6 h-6 mr-2" viewBox="0 0 24 24" width="24" height="24"><title>
                  record vinyl</title>
                  <path
                      d="M23.938 10.773a11.915 11.915 0 0 0-2.333-5.944 12.118 12.118 0 0 0-1.12-1.314A11.962 11.962 0 0 0 12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12c0-.414-.021-.823-.062-1.227zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
                </svg>
                {{ record.title }} &mdash; {{ record.year }}
              </p>
              <p class="block font-mono font-semibold">{{ getArtist(record) }}</p>
            </div>

            <button
                class="bg-transparent text-sm hover:bg-blue hover:text-white text-blue border border-blue no-underline font-bold py-2 px-4 mr-2 rounded"
                @click.prevent="editRecord(record)">Edit
            </button>

            <button
                class="bg-transparent text-sm hover:bg-red text-red hover:text-white no-underline font-bold py-2 px-4 rounded border border-red"
                @click.prevent="removeRecord(record)">Delete
            </button>
          </div>

          <div v-if="record == editedRecord">
            <form action="" @submit.prevent="updateRecord(record)">
              <div class="mb-6 p-4 bg-white rounded border border-grey-light mt-4">

                <div class="mb-6">
                  <label class="label">Title</label>
                  <input class="input" v-model="record.title">
                </div>

                <div class="mb-6">
                  <label class="label">Year</label>
                  <input class="input" v-model="record.year">
                </div>

                <div class="mb-6">
                  <select id="artist_update" class="select" v-model="record.artist">
                    <option disabled value="">Select an artist</option>
                    <option :value="artist.id" v-for="artist in artists" :key="artist.id">{{ artist.name }}</option>
                  </select>
                </div>

                <input type="submit" value="Update"
                       class="bg-transparent text-sm hover:bg-blue hover:text-white text-blue border border-blue no-underline font-bold py-2 px-4 mr-2 rounded">
              </div>
            </form>
          </div>
        </li>
      </ul>
      <h1> add record </h1>
      <b-button
          class="button is-primary"
          label="Launch component modal"
          type="is-primary"
          size="is-medium"
          @click="isComponentModalActive = true">open</b-button>
      <div v-for="record in records" :key="record.id">
        {{record}}
      </div>
    </div>
    <AddArtistModal :is-active="isComponentModalActive" @close="closeModal"/>
  </div>
</template>

<script>
import records from "../../api/records";
import AddArtistModal from "@/components/modals/AddRecordModal";

export default {
  name: 'Records',
  components: {
    AddArtistModal
  },
  data() {
    return {
      artists: [],
      records: [],
      newRecord: [],
      error: '',
      editedRecord: '',
      isComponentModalActive: false
    }
  },
  mounted() {
    records.getRecords(this.$store.state.jwt)
        .then(response => {
          console.log(response)
          this.records = response.data
        })
        .catch(error => this.setError(error, 'Something went wrong'))
  },
  methods: {
    closeModal(){
      this.isComponentModalActive = false
    },
    setError(error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    getArtist(record) {
      const recordArtistValues = this.artists.filter(artist => artist.id === record.artist_id)
      let artist

      recordArtistValues.forEach(function (element) {
        artist = element.name
      })

      return artist
    },
    removeRecord(record) {
      records.removeRecord(this.newRecord.title, this.newRecord.year, this.newRecord.artist, record.id, this.$store.state.jwt)
          .then((response) => {
            console.log(response)
            this.records.splice(this.records.indexOf(record), 1)
          })
          .catch(error => this.setError(error, 'Cannot delete record'))

    },
    editRecord(record) {
      this.editedRecord = record
    },
    updateRecord(record) {
      this.editedRecord = ''
      records.updateRecord(this.newRecord.title, this.newRecord.year, this.newRecord.artist, record.id, this.$store.state.jwt)
          .catch(error => this.setError(error, 'Cannot update record'))
    }
  }
}
</script>
<style>
.container {
  width: 30%;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
</style>
