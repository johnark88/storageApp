<template>
  <div class="aboutModal">
    <b-button @click="showModal" class="aboutButton">  About </b-button>
    <b-modal ref="myModalRef" hide-footer title="About Storage Containers">
      <div class="text-center">
        <p> This is your storage! <br>
          Containers hold objects <br>
          Objects are folders and files. <br>
          Click get containers to begin!
        </p>
      </div>
      <!-- <b-button class="homeButton" @click="hideModal">Close Me</b-button> -->
    </b-modal>
  </div>
</template>
<script>
export default {
  name: 'aboutModal',
  data() {
    return {

    };
  },
  methods: {
    showModal() {
      this.$refs.myModalRef.show();
    },
    hideModal() {
      this.$refs.myModalRef.hide();
    },
  },
};
</script>
<style scoped lang="scss">
  .homeButton {
    background-color: $colorBlue;
    border-color: $colorBlue;
  }
  .aboutButton {
    background-color: transparent;
    margin-bottom: -14px;
    border: none;
    color: $colorDark;
  &:hover {
    color: $colorAqua;
  }
}
</style>
