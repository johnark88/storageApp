<template>
  <div class="HomePage">
    <b-container>
      <b-row class="justify-content-md-center">
        <b-col md="2">
           
        </b-col>
        <b-col md="3">
          <b-button variant="success" @click="getBuckets">Show current containers</b-button> 
        </b-col>
        <b-col md="2">
           <createBucket /> 
        </b-col>
        <b-col>
          <b-button>Upload</b-button>
        </b-col>
      </b-row>
    </b-container>
    <b-container>
      <b-row>
        <hr width="100%">
        <b-col lg="2">
          <h5> Containers in storage: </h5>
          <div>
            <div v-for="(item, index) in options" :key="index">
              <div class="containerButtons">
                <b-button @click="getBucketObject(item.name)">{{item.name}}</b-button> 
              </div>
            </div>
          </div>
        </b-col>
        <b-col>
         
          <h5>Folder List: </h5>
          <div v-for="(folder, item) in folderList" :key="item">
            <h6> <font-awesome-icon :icon="['fas', 'folder-open']" size="lg" /> {{folder}}</h6>
            <h6> {{folder}}</h6>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <b-container>

    </b-container>
  </div>
</template>

<script>
// import aboutModal from '@/components/aboutModal'
import createBucket from '@/components/createBucket'
export default {
  name: 'HomePage',
  components: {
    // aboutModal,
    createBucket,
  },
  data() {
    return {
      selectedBucket: null,
      options: [],
      bucketName: '',
      errorMsg: '',
      objectList: [],
      prefixList: [],
      folderList: [],
      filelist: [],
      nGrok:'http://e42fbb95.ngrok.io'
    }
  },
  watch: {
    selectedBucket(newVal, oldVal) {
      console.log(newVal, 'new');
      console.log(oldVal, 'old');
    }
  },
  methods: {
    getBuckets() {
      // get all buckets for user/project
      axios.get(''+this.nGrok+'/api/buckets')
      .then((response) => {
        console.log(response);
        this.options = response.data;
      })
      .catch((error) => {
        console.log(error);
      })
    },
    getBucketObject(name) {
      // lists files and folders in the bucket
      axios.get(''+this.nGrok+'/api/objects/'+name)
       .then((response) => {
        this.objectList = response.data.files;
        this.sortFiles();
      })
      .catch((error) => {
        console.log(error, 'BucketObjects');
      })
    },
    sortFiles() {
      this.objectList.forEach((file) => {
        // Breaks off the prefix
        const stringSplit = file.split('/')[0];
        // console.log(stringSplit);
        this.prefixList.push(stringSplit);
      })
      this.findDuplicates(this.prefixList);
      // string split the files as well to file list array 

    },
    findDuplicates(data) {
      // Sort out all duplications
      // push remaining folders to folderList array
      let result = [];
      data.forEach(function(element, index) {
      // Find if there is a duplicate or not
        if (data.indexOf(element, index + 1) > -1) {
        // Find if the element is already in the result array or not
          if (result.indexOf(element) === -1) {
            result.push(element);
          }
        }
      });
      this.folderList = result;
      console.log(this.folderList, 'results');
    }     
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
a {
  color: #42b983;
}
.containerButtons {
  padding: 6px;
}
</style>
