<template>
  <div class="aboutModal">
    <b-button variant="primary" @click="showModal">  About </b-button>
    <b-modal ref="myModalRef" hide-footer title="About Storage Containers">
      <div class="d-block text-center">
        <p> This is your storage! 
          Containers hold objects <br>
          Objects are folders and files. <br>
          Click get containers to begin!
        </p>
      </div>
      <b-btn size="small" variant="outline-danger"  @click="hideModal">Close Me</b-btn>
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