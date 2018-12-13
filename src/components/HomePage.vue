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
            <h6> <font-awesome-icon :icon="['fas', 'folder-open']" size="lg" /> {{folder}}</h6>
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
      nGrok: 'http://2ca1b7de.ngrok.io',
    };
  },
  methods: {
    getBuckets() {
      // get all buckets for user/project
      axios.get(`${this.nGrok}/api/buckets`)
        .then((response) => {
          console.log(response);
          this.options = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getBucketObject(name) {
      // lists files and folders in the bucket
      axios.get(`${this.nGrok}/api/objects/${name}`)
        .then((response) => {
          let objectList = '';
          objectList = response.data.files;
          this.sortFiles(objectList);
        })
        .catch((error) => {
          console.log(error, 'BucketObjects error line 79');
        });
    },
    sortFiles(objectList) {
      const prefixList = [];
      objectList.forEach((file) => {
        // Breaks off the prefix
        const stringSplit = file.split('/')[0];
        // push it to temp array
        prefixList.push(stringSplit);
      });
      // let find those duplicates
      this.findDuplicates(prefixList);
      // string split the files as well to file list array
    },
    findDuplicates(data) {
      // Sort out all duplications
      // push remaining folders to folderList array
      const result = [];
      data.forEach((element, index) => {
      // Find if there is a duplicate or not
        if (data.indexOf(element, index + 1) > -1) {
        // Find if the element is already in the result array or not
          if (result.indexOf(element) === -1) {
            // pa pa push it real good ....... to the results array
            result.push(element);
          }
        }
      });
      // make it accessable for display
      this.folderList = result;
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
</style>
