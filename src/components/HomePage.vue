<template>
  <div class="HomePage">
    <b-container>
      <b-row>
        <hr width="100%">
        <b-col lg="2">
          <b-button class="homeButton" @click="getBuckets">Show current containers</b-button>
          <p></p>
          <createBucket />
        </b-col>
        <b-col lg="3">
          <h5> Containers in storage: </h5>
          <div>
            <div v-for="(item, index) in options" :key="index">
              <div class="containerButtons">
                <b-button class="homeButton" @click="getBucketObject(item.name)">{{item.name}}</b-button>
              </div>
            </div>
          </div>
        </b-col>
        <b-col>
          <h5>Folder List: </h5>
          <div v-for="(folder, item) in folderList" :key="item">
            <span class="fileClick" @click="getFileObject(folder)"> <font-awesome-icon :icon="['fas', 'folder-open']" size="3x" /><h6>{{folder}}</h6></span>
          </div>
        </b-col>
      </b-row>
      <b-row class="fileList" v-show="whenFiles">
        <b-col lg="2">
          <h5>File List: </h5>
          <hr>
        </b-col>
        <b-col lg="12" class="row">
          <div v-for="(file, item) in filelist" :key="item">
            <p class="fileClick fileDispaly"> <font-awesome-icon :icon="['fas', 'file']" />  {{file.name}} </p>
            <b-img thumbnail fluid :src="file.meta.mediaLink"  alt="Responsive image" />
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import createBucket from '@/components/createBucket.vue';

export default {
  name: 'HomePage',
  components: {
    createBucket,
  },
  data() {
    return {
      options: [],
      folderList: [],
      filelist: [],
      metaData: [],
      storageBucket: '',
      whenFiles: false,
      selectedFolder: '',
      nGrok: 'http://24b2dbb0.ngrok.io',
    };
  },
  methods: {
    getBuckets() {
      // get all buckets for user/project
      axios.get(`${this.nGrok}/api/buckets`)
        .then((response) => {
          this.options = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getBucketObject(name) {
      // lists folders in the bucket
      this.storageBucket = name;
      axios.get(`${this.nGrok}/api/objects/${name}`)
        .then((response) => {
          this.folderList = response.data;
        })
        .catch((error) => {
          console.log(error, 'BucketObjects error line 79');
        });
    },
     getFileObject(name) {
       this.metaData = [];
       this.filelist = [];
      // lists files in the bucket
      this.selectedFolder = name; 
      axios.get(`${this.nGrok}/api/objects/files/${this.storageBucket}/${name}`)
        .then((response) => {
          this.filelist = response.data;
          this.whenFiles = true;
        })
        .catch((error) => {
          console.log(error, 'getFileObject error line 83');
        });
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.containerButtons {
  padding: 6px;
}
.homeButton {
  background-color: $colorBlue;
  border-color: $colorBlue;
}
.fileList {
  margin-top: 90px;
}
.fileDispaly {
  padding: 10px;
}
.fileClick {
  cursor: pointer;
}
</style>
