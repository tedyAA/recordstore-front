<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item">
        <img src="../assets/record.png" width="28" height="28"> <span class="ml-2">Record Store</span>
      </a>

      <a
          role="button"
          class="navbar-burger"
          @click="showNav = !showNav"
          :class="{ 'is-active': showNav }"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div  :class="{ 'is-active': showNav }" id="navbarBasicExample" class="navbar-menu has-text-left">
      <div class="navbar-start m-0 " v-if="isSignedIn">
        <a class="navbar-item is-clickable" @click="goTo('artists')">
          Artists
        </a>

        <a class="navbar-item is-clickable" @click="goTo('records')">
          My Records
        </a>
      </div>

      <div class="navbar-end has-text-right mr-0">
        <div class="navbar-item">
          <div v-if="!isSignedIn" class="buttons">
            <a class="button is-primary" @click="goTo('signup')">
              <strong>Sign up</strong>
            </a>
            <a class="button is-light" @click="goTo('signin')">
              Log in
            </a>
          </div>
          <b-button class="button is-primary" @click="signOut" v-if="isSignedIn">Sign out</b-button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from "axios";

export default {
  name: 'Header',
  data(){
    return{
      showNav: false
    }
  },
  created () {
    this.signedIn()
  },
  computed:{
    isSignedIn(){
      return this.$store.state.signedIn
    }
  },
  methods: {
    goTo(location){
      this.$router.replace('/' + location)
    },
    toast() {
      this.$buefy.toast.open('Something happened')
    },
    signedIn () {
      return localStorage.signedIn
    },
    signOut () {
      axios({
        method: 'delete',
        url: 'http://127.0.0.1:3000/signin',
        headers: { Authorization: `Bearer ${this.$store.state.jwt}` },
      })
          .then(response => {
            console.log(response)
            delete this.$store.state.csrf
            delete this.$store.state.jwt
            this.$store.state.signedIn = false
            this.$router.replace('/signin')
          })
          .catch(error => this.toast(error))

    }
  }
}
</script>
