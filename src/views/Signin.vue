<template>
  <div class="signin-container has-text-centred mt-5 p-5">
    <p class="title is-size-4 has-text-link">Log in</p>
    <input class="input mb-3" v-model="email" type="email" placeholder="Enter email">
    <input class="input" type="password" v-model="password" placeholder="Enter Password">
    <button class="button is-link mt-5" @click="signin">Log in</button>
    <p class="has-text-centered mt-3">or</p>
    <button class="button is-link mt-3" @click="goToSignup">Signup</button>
  </div>
</template>

<script>
import account from "../../api/account";
export default {
  name: 'Signin',
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  created() {
    this.checkSignedIn()
  },
  updated() {
    this.checkSignedIn()
  },
  methods: {
    goToSignup() {
      this.$router.replace('/signup')
    },
    signin() {
      if(this.email === '') {
        this.$buefy.toast.open({
          message: "Enter email, email can't be blank!",
          type: 'is-danger'
        })
        return
      }
      if(this.password === '') {
        this.$buefy.toast.open({
          message: "Enter password, password can't be blank!",
          type: 'is-danger'
        })
        return
      }
     account.signin(this.email, this.password)
          .then(response => this.signinSuccessful(response))
          .catch(error => this.signinFailed(error))
    },
    signinSuccessful(response) {
      if (!response.data.data.csrf) {
        this.signinFailed(response)
        return
      }
      this.error = response
      this.$store.state.jwt = response.data.data.access
      this.$store.state.csrf = response.data.data.csrf
      this.$store.state.signedIn = true
      this.error = ''
      this.$buefy.toast.open({
        message: 'Signed in successfully',
        type: 'is-success'
      })
      this.$router.replace('/records')
    },
    signinFailed(error) {
      this.error = (error.response && error.response && error.response.error) || ''
      this.$buefy.toast.open({
        message: "Couldn't sign in",
        type: 'is-danger'
      })
      delete this.$store.state.csrf
      delete this.$store.state.jwt
      this.$store.state.signedIn = false
    },
    checkSignedIn() {
      if (localStorage.signedIn) {
        this.$router.replace('/records')
      }
    }
  }
}
</script>
<style>
.signin-container {
  margin: auto;
  max-width: 500px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
</style>

