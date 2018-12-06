<template>
  <div class="HomePage">
    <b-container>
      <b-row>
        <div>
            <b-button @click="showModal">  About </b-button>
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
      </b-row>
      <b-row>
        <b-col>
          
        </b-col>
        <b-col lg="6">
          <b-button variant="success" @click="getBuckets">Get Buckets</b-button> 
          <hr>
          <h6> Buckets in storage: </h6>
          <div>
            <b-form-select v-model="selected" :options="options" class="mb-3" >
              <option disabled value="null"> Select a bucket</option>
            </b-form-select>
            <div>Selected: <strong>{{ selected }}</strong></div>
          </div>
        </b-col>
        <b-col></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      selected: null,
      options: [],
    }
  },
  methods: {
    getBuckets() {
      axios.get('http://4900f998.ngrok.io/api/buckets')
      .then((response) => {
        console.log(response);
        this.options = response.data;
      })
      .catch((error) => {
        console.log(error);
      })
    },
    showModal () {
      this.$refs.myModalRef.show()
    },
    hideModal () {
      this.$refs.myModalRef.hide()
    },
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
a {
  color: #42b983;
}
</style>
