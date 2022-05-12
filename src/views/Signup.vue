<template>
  <div class="signup-container has-text-centred mt-5 p-5">
    <p class="title is-size-4 has-text-link">Sign up</p>
    <input class="input" v-model="email" type="email" placeholder="Enter email">
    <input class="input mb-3 mt-3" type="password" v-model="password" placeholder="Enter password">
    <input class="input" type="password" v-model="password_confirmation" placeholder="Repeat password">
    <button class="button is-link mt-5" @click="signup">Sign up</button>
    <p class="has-text-centered mt-3">or</p>
    <button class="button is-link mt-3" @click="goToSignin">Log in</button>
  </div>
</template>

<script>
import account from "../../api/account";
export default {
  name: 'Signup',
  data () {
    return {
      email: '',
      password: '',
      password_confirmation: '',
      error: ''
    }
  },
  created () {
    this.checkedSignedIn()
  },
  updated () {
    this.checkedSignedIn()
  },
  methods: {
    toast(message) {
      this.$buefy.toast.open(message)
    },
    goToSignin(){
      this.$router.replace('/signin')
    },
    signup () {
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
      if(this.password_confirmation === '') {
        this.$buefy.toast.open({
          message: "Confirm your password, password can't be blank!",
          type: 'is-danger'
        })
        return
      }
      account.signup(this.email, this.password, this.password_confirmation)
          .then(response => this.signupSuccessful(response))
          .catch(error => this.signupFailed(error))
    },
    signupSuccessful (response) {
      if (!response.csrf) {
        this.signupFailed(response)
        return
      }

      localStorage.csrf = response.csrf
      localStorage.signedIn = true
      this.error = ''
      this.$buefy.toast.open({
        message: 'Signed up successfully',
        type: 'is-success'
      })
      this.$router.replace('/records')
    },
    signupFailed (error) {
      this.error = (error.response && error.response.data && error.response.data.error) || 'Sng'
      this.$buefy.toast.open({
        message: "Couldn't sign up",
        type: 'is-danger'
      })
      delete localStorage.csrf
      delete localStorage.signedIn
    },
    checkedSignedIn () {
      if (this.$store.state.signedIn) {
        this.$router.replace('/records')
      }
    }
  }
}
</script>
<style>
.signup-container {
  margin: auto;
  max-width: 500px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
</style>
