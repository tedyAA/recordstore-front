<template>
  <div class="artists-container p-3">
    <h1 class="title has-text-weight-semibold">Add a new artist</h1>
    <input class="input mb-3" v-model="newArtist" type="text" placeholder="Enter artist name">
    <b-button @click="addArtist" class="button is-primary mt-5">Add artist</b-button>

    <hr/>

    <ul class="list-reset mt-4">
      <li class="py-4 has-text-left" v-for="artist in artists" :key="artist.id">
        <div class="is-inline-flex">
          <div class="has-text-left mr-5">
            <p>
              <svg viewBox="0 0 20 20" width="20" height="20"><title>music
                artist</title>
                <path
                    d="M15.75 8l-3.74-3.75a3.99 3.99 0 0 1 6.82-3.08A4 4 0 0 1 15.75 8zm-13.9 7.3l9.2-9.19 2.83 2.83-9.2 9.2-2.82-2.84zm-1.4 2.83l2.11-2.12 1.42 1.42-2.12 2.12-1.42-1.42zM10 15l2-2v7h-2v-5z"></path>
              </svg>
              {{ artist.name }}
            </p>
          </div>
        </div>
        <div v-if="artist === editedArtist">
            <div class="mb-6 p-4 mt-4">
              <input class="input mb-3" v-model="artist.name" type="text" placeholder="Enter new name">
              <b-button class="button is-primary" @click="updateArtist(editArtist)">Save</b-button>
            </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import artists from "../../api/artists";

export default {
  name: 'Artists',
  data() {
    return {
      artists: [],
      newArtist: '',
      error: '',
      editedArtist: ''
    }
  },
  created() {
    if (!this.$store.state.signedIn) {
      this.$router.replace('/')
    } else {
      artists.getArtists(this.$store.state.jwt)
          .then(response => this.artists = response.data)
          .catch(error => this.setError(error, 'Could not get artists'))
    }
  },
  methods: {
    setError(error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    addArtist() {
      const value = this.newArtist
      if (!value) {
        return
      }
      artists.addArtist(this.newArtist, this.$store.state.jwt)
          .then(response => response.json())
          .then(response => {
            this.artists.push(response.data)
            this.newArtist = ''
          })
          .catch(error => this.setError(error, 'Cannot create artist'))
    },
    editArtist(artist) {
      this.editedArtist = artist
    },
    updateArtist(artist) {
      this.editedArtist = ''
      artists.updateArtist(artist.id, artist, name, this.$store.state.jwt)
          .catch(error => this.setError(error, 'Cannot update artist'))
    }
  }
}
</script>
<style>
.artists-container {
  width: 500px;
  margin: auto;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
</style>
