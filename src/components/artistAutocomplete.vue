<template>
  <b-field label="Select Artist" class="mb-5 mt-5">
    <b-autocomplete
        rounded
        v-model="name"
        :data="filteredDataArray"
        placeholder="Enter artist name"
        icon="magnify"
        clearable
        @select="option => selected = option">
      <template #empty>No results found</template>
    </b-autocomplete>
  </b-field>
</template>

<script>
export default {
  name: "artistAutocomplete",
  props:{
    artists: { type: Array, required: true}
  },
  data(){
    return{
      name: '',
      selected: null
    }
  },
  watch: {
    'selected'(value) {
      console.log(value)
      this.$emit("setSelectedArtist", value)
    }
  },
  computed:{
    filteredDataArray() {
      let filteredArtists = []
      this.artists.forEach(artist =>filteredArtists.push(artist.name) )
      return filteredArtists.filter((option) => {
        return option
            .toString()
            .toLowerCase()
      })
    }
  }
}
</script>

<style scoped>

</style>
