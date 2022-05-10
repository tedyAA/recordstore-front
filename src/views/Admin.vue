<template>
<div>
  <p>i'm admin</p>
</div>
</template>

<script>
import admin from "../../api/admin";

export default {
  name: "Admin",
  data(){
    return{
      adminResponse: ''
    }
  },
  created() {
    admin.getAdminInfo(this.$store.state.jwt)
        .then(response => {
          this.adminResponse = response.data
        })
        .catch(error => this.setError(error, 'Something went wrong'))
  },
}
</script>

<style scoped>

</style>
