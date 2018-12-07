<template>
  <div class="aboutModal">
    <b-button variant="primary" @click="showModal">  About </b-button>
    <b-modal ref="myModalRef" hide-footer title="Google Cloud Storage">
      <div class="d-block text-center">
        <p> This is your storage! 
          Buckets hold objects <br>
          Objects are folders or files. <br>
          Click get buckets to begin!
        </p>
      </div>
      <b-btn class="mt-3" variant="outline-danger" block @click="hideModal">Close Me</b-btn>
    </b-modal>  
  </div>
</template>
<script>
  export default {
  name: 'aboutModal',
  data() {
    return {
      
    }
  },
  methods: {
    showModal () {
      this.$refs.myModalRef.show()
    },
    hideModal () {
      this.$refs.myModalRef.hide()
    },
  }
}
</script>
<style scoped lang="scss">
  
</style>