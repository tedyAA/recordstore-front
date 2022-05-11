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
         <ArtistAutocomplete :artists="artists" @setSelectedArtist="setArtist"/>
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
import ArtistAutocomplete from "@/components/artistAutocomplete";
export default {
  name: "AddArtistModal",
  props: {
    isActive: {type: Boolean, default: true}
  },
  components:{
    ArtistAutocomplete
  },
  data() {
    return {
      newRecord: [],
      artists: [],
      selected: null
    }
  },
  created() {
    artists.getArtists(this.$store.state.jwt)
        .then(response => {
          console.log(response)
          this.setArtists(response.data)
        })
        .catch(error => this.setError(error, 'Something went wrong'))
  },
  methods:{
    setArtists(artists){
      const result = artists.filter(artist => artist.approved === true);
      this.artists = result
      console.log(result)
    },
    setArtist(value){
      this.selected = value
    },
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
