<template>
  <div>
    <div>
      <h1 class="title has-text-weight-semibold"> Your records </h1>
      <table class="table has-text-left">
        <thead>
        <tr>
          <th>Record Name</th>
          <th>Record Artist</th>
          <th>Record Year</th>
          <th>Options</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="record in records" :key="record.id" class="has-text-left">
          <td>
            <p>
              <svg viewBox="0 0 24 24" width="24" height="24"><title>record vinyl</title>
                <path
                    d="M23.938 10.773a11.915 11.915 0 0 0-2.333-5.944 12.118 12.118 0 0 0-1.12-1.314A11.962 11.962 0 0 0 12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12c0-.414-.021-.823-.062-1.227zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
              </svg>
              {{ record.title }}
            </p>
          </td>
          <td><p class="block font-mono font-semibold">{{ getArtist(record) }}</p></td>
          <td>{{ record.year }}</td>
          <td>
            <button class="button is-primary"
                    @click="editRecord(record)">Edit
            </button>

            <button class="button ml-3 is-danger"
                    @click="removeRecord(record)">Delete
            </button>
          </td>
          <div class="record-container" >
            <b-modal
                :active="record === editedRecord"
                has-modal-card
                tabindex=""
                class="has-no-button-close"
                @close="$emit('close')"
            >
              <div class="modal-card">
                <div class="card">
                  <div class="card-content">

                    <div class="mb-6">
                      <label class="label">Title</label>
                      <input class="input" v-model="record.title">
                    </div>

                    <div class="mb-6">
                      <label class="label">Year</label>
                      <input class="input" v-model="record.year">
                    </div>

                    <div class="mb-6">
                      <ArtistAutocomplete :artists="artists" @setSelectedArtist="setArtist"/>
                    </div>
                    <b-button class="button is-primary" @click="updateRecord(record)">Update</b-button>
                  </div>
                </div>
              </div>
            </b-modal>
          </div>
        </tr>

        </tbody>
      </table>
      <ul v-if="false" class="list-reset mt-4">
        <li class="py-4" v-for="record in records" :key="record.id">
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

            <button class="button is-primary"
                    @click="editRecord(record)">Edit
            </button>

            <button class="button ml-3 is-danger"
                    @click="removeRecord(record)">Delete
            </button>
          </div>

          <div class="record-container" v-if="record === editedRecord">
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
                <ArtistAutocomplete :artists="artists" @setSelectedArtist="setArtist"/>
              </div>
              <b-button class="button is-primary" @click="updateRecord(record)">Update</b-button>
            </div>
          </div>
        </li>
      </ul>
      <h1 class="title has-text-weight-semibold"> Add new record </h1>
      <b-button
          class="button is-primary"
          label="Add record"
          type="is-primary"
          size="is-medium"
          @click="isComponentModalActive = true">open
      </b-button>
    </div>
    <AddArtistModal :is-active="isComponentModalActive" @close="closeModal"/>
  </div>
</template>

<script>
import records from "../../api/records";
import artists from "../../api/artists";
import AddArtistModal from "@/components/modals/AddRecordModal";
import ArtistAutocomplete from "@/components/artistAutocomplete";

export default {
  name: 'Records',
  components: {
    AddArtistModal,
    ArtistAutocomplete
  },
  data() {
    return {
      artists: [],
      records: [],
      newRecord: [],
      error: '',
      editedRecord: '',
      isComponentModalActive: false,
      selectedArtist: ''
    }
  },
  computed: {
    filteredDataArray() {
      let filteredArtists = []
      this.artists.forEach(artist => filteredArtists.push(artist.name))
      return filteredArtists.filter((option) => {
        return option
            .toString()
            .toLowerCase()
      })
    }
  },
  created() {
    records.getRecords(this.$store.state.jwt)
        .then(response => {
          this.records = response.data
        })
        .catch(error => this.setError(error, 'Something went wrong'))

    artists.getArtists(this.$store.state.jwt)
        .then(response => {
          this.artists = response.data
        })
        .catch(error => this.setError(error, 'Something went wrong'))
  },
  methods: {
    setArtist(value) {
      this.selectedArtist = value
    },
    closeModal() {
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
.record-container {
  margin: auto;
  width: 30%;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.table {
  margin: auto;
}
</style>
