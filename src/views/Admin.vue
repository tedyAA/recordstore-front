<template>
  <div>
    <p>i'm admin</p>
    <div class="add-artist">
      <p>Add Artist</p>
      <input class="input mb-3" v-model="newArtist" type="email" placeholder="Enter email">
      <b-button class="button is-primary" @click="addArtist">Add</b-button>
    </div>
    <div class="columns is-centered">
      <div class="column is-one-third">
        <table class="table is-fullwidth has-text-left">
          <thead>
          <tr>
            <th>User Id</th>
            <th>User Name</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="user in users" :key="user.id" class="has-text-left">
            <td>{{ user.id }}</td>
            <td>{{ user.email }}</td>
            <td>
              <b-button class="button is-primary">Edit</b-button>
            </td>
            <td>
              <b-button class="button is-danger">Delete</b-button>
            </td>
          </tr>

          </tbody>
        </table>
      </div>
      <div class="column is-one-third">
        <table class="table is-fullwidth has-text-left">
          <thead>
          <tr>
            <th>Artist Id</th>
            <th>Artist Name</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="artist in approvedArtists" :key="artist.id" class="has-text-left">
            <td>{{ artist.id }}</td>
            <td>{{ artist.name }}</td>
            <td>
              <b-button class="button is-primary" @click="openModalEditArtist(artist)">Edit</b-button>
            </td>
            <td>
              <b-button class="button is-danger" @click="deleteArtist(artist.id)">Delete</b-button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="columns is-centered">
      <div class="column is-one-third">
        <h1 class="title">Approve Artist</h1>
        <table class="table is-fullwidth has-text-left">
          <thead>
          <tr>
            <th>Artist Id</th>
            <th>Artist Name</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="artist in unapprovedArtists" :key="artist.id" class="has-text-left">
            <td>{{ artist.id }}</td>
            <td>{{ artist.name }}</td>
            <td>
              <b-button class="button is-success" @click="approveArtist(artist, true)">Approve</b-button>
            </td>
            <td>
              <b-button class="button is-danger" @click="deleteArtist(artist.id)">Delete</b-button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <b-modal
        :active="modalEditArtistActive"
        has-modal-card
        tabindex=""
        class="has-no-button-close"
        @close="closeModalEditArtist"
    >
      <div class="modal-card">
        <div class="card">
          <div class="card-content">

            <div class="mb-6">
              <label class="label">Title</label>
              <input class="input" v-model="editedArtist.name">
            </div>
            <b-button class="button is-primary" @click="updateArtist(editedArtist)">Update</b-button>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import admin from "../../api/admin";

export default {
  name: "Admin",
  data() {
    return {
      adminResponse: '',
      newArtist: '',
      editedArtist: '',
      modalEditArtistActive: false,
      users: [],
      artists: [],
      approvedArtists: [],
      unapprovedArtists: []
    }
  },
  created() {
    if(!this.$store.state.isAdmin){
      this.$router.replace('/records')
    }
    if(!this.$store.state.signedIn){
      this.$router.replace('/')
    }
    this.getInfo()
  },
  methods: {
    setUnapprovedArtists(){
      const result = this.artists.filter(artist => artist.approved === false);
      this.unapprovedArtists = result
      console.log(result)
    },
    setApprovedArtists(){
      const result = this.artists.filter(artist => artist.approved === true);
      this.approvedArtists = result
      console.log(result)
    },
    async getInfo() {
      admin.getAdminInfo(this.$store.state.jwt)
          .then(response => {
            this.adminResponse = response.data
            this.users = response.data.users
            this.artists = response.data.artists
            this.setUnapprovedArtists()
            this.setApprovedArtists()
          })
          .catch(error => this.setError(error, 'Something went wrong'))
    },
    closeModalEditArtist() {
      this.modalEditArtistActive = false
    },
    openModalEditArtist(artist) {
      this.editedArtist = artist
      this.modalEditArtistActive = true
    },
    deleteArtist(artist) {
      admin.deleteArtist(artist, this.$store.state.jwt)
          .then(this.$buefy.toast.open({
            message: 'Artist deleted successfully!',
            type: 'is-success'
          }))
          .then(this.getInfo())
          .catch(error => this.setError(error, 'Something went wrong'))

    },
    addArtist() {
      admin.createArtist(this.newArtist, this.$store.state.jwt)
          .then(this.$buefy.toast.open({
            message: 'Artist created successfully!',
            type: 'is-success'
          }))
          .then(this.getInfo())
          .catch(error => this.setError(error, 'Something went wrong'))
    },
    updateArtist(artist) {
      admin.updateArtist(artist.name, artist.id, this.$store.state.jwt)
          .then(this.$buefy.toast.open({
            message: 'Artist created successfully!',
            type: 'is-success'
          }))
          .then(this.getInfo())
          .catch(error => this.setError(error, 'Something went wrong'))
    },
    approveArtist(artist, approved) {
      console.log(artist.id)
      admin.approveArtist(approved, artist.id, this.$store.state.jwt)
          .then(this.$buefy.toast.open({
            message: 'Artist created successfully!',
            type: 'is-success'
          }))
          .then(this.getInfo())
          .catch(error => this.setError(error, 'Something went wrong'))
    }
  }
}
</script>

<style scoped>
.add-artist {
  width: 50%;
  margin: auto;
}
</style>
