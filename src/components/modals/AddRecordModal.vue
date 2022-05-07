<template>
  <b-modal
      :active="isActive"
      has-modal-card
      tabindex=""
      class="has-no-button-close"
      @close="$emit('close')"
  >
    <div class="modal-card">
      <div class="card">
        <div class="card-content">
          <label class="label">Enter title</label>
          <input class="input is-primary" type="text" placeholder="Enter title" v-model="newRecord.name">
          <label class="label mt-4">Enter year</label>
          <input class="input is-primary" type="text" placeholder="Enter year" v-model="newRecord.year">
          <b-field label="Select Artist" class="mb-5 mt-5">
            <b-autocomplete
                rounded
                v-model="name"
                :data="filteredDataArray"
                placeholder="e.g. jQuery"
                icon="magnify"
                clearable
                @select="option => selected = option">
              <template #empty>No results found</template>
            </b-autocomplete>
          </b-field>
          <p class="pt-4">Don't see your artist?
            <router-link to="/artists" class="link-grey">Create one</router-link>
          </p>
          <b-button class="button is-primary mt-5" @click="addRecord">Add record</b-button>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
import artists from "../../../api/artists";
import records from "../../../api/records";

export default {
  name: "AddArtistModal",
  props: {
    isActive: {type: Boolean, default: true}
  },
  data() {
    return {
      newRecord: [],
      artists: [],
      name: '',
      selected: null
    }
  },
  created() {
    artists.getArtists(this.$store.state.jwt)
        .then(response => {
          console.log(response)
          this.artists = response.data
        })
        .catch(error => this.setError(error, 'Something went wrong'))
  },
  computed: {
    filteredDataArray() {
      let filteredArtists = []
      this.artists.forEach(artist =>filteredArtists.push(artist.name) )
      return filteredArtists.filter((option) => {
        return option
            .toString()
            .toLowerCase()
      })
    }
  },
  methods:{
    addRecord() {
      const found = this.artists.find(element => element.name === this.selected);
      console.log(found)
      records.addRecord(this.newRecord.name, this.newRecord.year, found.id, this.$store.state.jwt)
          .then(response => {
            this.records.push(response.data)
            this.newRecord = ''
          })
          .catch(error => this.setError(error, 'Cannot create record'))
    }
  }
}
</script>

<style scoped>

</style>
