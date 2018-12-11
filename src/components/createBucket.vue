<template>
  <div class="createBucket">
    <b-button @click="showModal">Create a new container</b-button>
    <b-modal ref="createBucketRef" hide-footer title="Create Storage Container">
      <div class="d-block text-center">
        <b-container>
          <b-row class="justify-content-center">
          <b-col md="10">
            <h6>Create a new bucket</h6>
          </b-col>
          <b-col>
            <div>
              <b-form-input v-model="bucketName" type="text" placeholder="Enter a name for your new bucket"></b-form-input>
              <br>
              <b-button @click="createNewBucket">Create Bucket</b-button>
              <p></p>
            </div>
          </b-col>
        </b-row>
      </b-container>
      </div>
      <b-btn @click="hideModal">Close Me</b-btn>
    </b-modal>  
  </div>
</template>
<script>
  export default {
  name: 'createBucket',
  data() {
    return {
      nGrok:'http://2ca1b7de.ngrok.io',
      bucketName: '',
    }
  },
  methods: {
    showModal () {
      this.$refs.createBucketRef.show()
    },
    hideModal () {
      this.$refs.createBucketRef.hide()
    },
     createNewBucket() {
      axios.post(''+this.nGrok+'/api/buckets/', { name: this.bucketName })
      .then((response) => {
        console.log(response, 'good');
      })
      .catch((err) => {
        console.log(err.message);
      })
    },
  }
}
</script>
<style scoped lang="scss">
  
</style>