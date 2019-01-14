<template>
  <div class="fileDisplayComp">
    <b-container>
      <b-row>
        <b-col lg="12" class="row">
              <b-button class="btnHeader"> <router-link to="/upload" style="color: white;"> Upload </router-link></b-button>
              <b-button class="btnHeader" @click="getBuckets"> <a href="#" style="color: white; text-decoration: none;">Show current containers </a></b-button>
              <createBucket class="btnHeader"/> 
        </b-col>
         <hr width="100%">
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
         <b-col lg="12" class="row"></b-col>
        <b-col lg="6">
          <h5>File List: </h5>
          <hr>
            <b-list-group>
              <b-list-group-item  v-for="(file, item) in filelist" :key="item" 
              :value="item" @click="getMetaData(file)" href="#">
              <font-awesome-icon :icon="['fas', 'file']" /> 
              {{file}}
              </b-list-group-item>
            </b-list-group>
        </b-col>
        <b-col>
          <div class="fileImage">
            <b-img thumbnail fluid :src="metaData.mediaLink" class="fileClick fileDispaly"/> 
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import createBucket from '@/components/createBucket.vue';

export default {
  name: 'fileDisplayComp',
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
      nGrok: 'http://ffae935b.ngrok.io',
    };
  },
  watch: {

  },
  methods: {
    getBuckets() {
      // get all buckets for user/project
      this.metaData = [];
      axios.get(`${this.nGrok}/api/buckets`)
        .then((response) => {
          this.options = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getBucketObject(name) {
      this.metaData = [];
      // lists folders in the bucket
      this.storageBucket = name;
      axios.get(`${this.nGrok}/api/objects/${name}`)
        .then((response) => {
          this.folderList = response.data;
          this.whenFiles = false;
          this.showImage = false;
        })
        .catch((error) => {
          console.log(error, 'BucketObjects error line 79');
        });
    },
     getFileObject(name) {
       this.filelist = [];
       this.metaData = [];
      // lists files in the bucket
      this.selectedFolder = name; 
      axios.get(`${this.nGrok}/api/objects/files/${this.storageBucket}/${name}`)
        .then((response) => {
          this.filelist = response.data;
          this.whenFiles = true;
        })
        .catch((error) => {
          console.log(error, '113');
        });
    },
    getMetaData(fileName) {
      name = this.selectedFolder;
      this.fileName = fileName
      axios.get(`${this.nGrok}/api/objects/files/${this.storageBucket}/${name}/${fileName}`)
        .then((response) => {
          this.metaData = response.data;
        })
        .catch((error) => {
          console.log(error, '113');
        });
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.btnHeader {
  color: white;
  background-color: $colorBlue;
  border: $colorBlue;
  border-radius: 7px;
  margin: 5px;
  padding: 5px;
  &:hover {
    background-color: $hoverBlue;
    border: $hoverBlue;
  }
}
.homeButton {
  margin: 5px;
}
.fileList {
  margin-top: 4em;
}
.fileImage {
  margin-top: 3.2em;
}
.listToScroll {
  cursor: pointer;
  overflow: scroll;
  font-size: 16px;
}
</style>
