<template>
  <div class="HomePage">
    <b-container>
      <b-row>
        <aboutModal />
      </b-row>
      <b-row>
        <b-col></b-col>
        <b-col lg="6">
          <b-button variant="success" @click="getBuckets">Get Buckets</b-button> 
          <hr>
          <h6> Buckets in storage: </h6>
          <div>
            <b-form-select v-model="selectedBucket" :options="options.name" class="mb-3" >
              <option disabled value="null"> Select a bucket</option>
              <option v-for="(option, index) in options" v-bind:value="option.name" :key="index">
                {{ option.name }}
              </option>
            </b-form-select>
            <div>Selected: <strong>{{ selectedBucket }}</strong></div>
            <br>
            <div v-if="showButton">
              <b-button variant="primary" @click="getBucketObject"> Get files from {{selectedBucket}} ? </b-button>
            </div>
            <div v-if="showNoneSelected">
              <p>Please select a bucket from above</p>
            </div>
          </div>
        </b-col>
        <b-col></b-col>
      </b-row>
      <hr>
      <b-row>
        <b-col>
          <h6>Create a new bucket</h6>
        </b-col>
        <b-col>
          <div>
            <b-form-input v-model="bucketName" type="text" placeholder="Enter a name for your new bucket"></b-form-input>
            <p>Value: {{ bucketName }}</p>
            <br>
            <b-button variant="success" @click="createNewBucket">Create Bucket</b-button>
            <p>{{errorMsg}}</p>
          </div>
        </b-col>
        <b-col></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import aboutModal from '@/components/aboutModal'
export default {
  name: 'HomePage',
  components: {
    aboutModal,
  },
  data() {
    return {
      selectedBucket: null,
      options: [],
      bucketName: '',
      errorMsg: '',
      showButton: false,
      showNoneSelected: false,
    }
  },
  watch: {
    selectedBucket(newVal, oldVal) {
      console.log(newVal, 'new');
      console.log(oldVal, 'old');
      this.showIfThen();
    }
  },
  methods: {
    getBuckets() {
      axios.get('http://0a1fb6c9.ngrok.io/api/buckets')
      .then((response) => {
        console.log(response);
        this.options = response.data;
      })
      .catch((error) => {
        console.log(error);
      })
    },
    createNewBucket() {
      axios.post('http://0a1fb6c9.ngrok.io/api/buckets/', { name: this.bucketName })
      .then((response) => {
        console.log(response, 'good');
      })
      .catch((err) => {
        console.log(err.message, 'eadawdawda');
      })
    },
    showIfThen() {
      console.log(this.selectedBucket);
      if(this.selectedBucket) {
        this.showButton = true
      } else {
        this.showNoneSelected = true;
      }
    },
    getBucketObject() {
      console.log('at get bucket objects');
      axios.get('http://0a1fb6c9.ngrok.io/api/objects/'+this.selectedBucket)
       .then((response) => {
        console.log(response, 'good');
      })
      .catch((error) => {
        console.log(error, 'BucketObjects');
      })
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
a {
  color: #42b983;
}
</style>
