<template>
  <div class="fileDisplay">
     <fileDisplayComp />
     <h2>File Display</h2>
  </div>
</template>
<script>
import fileDisplayComp from '@/components/fileDisplayComp.vue';
export default {
  name: 'fileDisplay',
  components: {
    fileDisplayComp
  },
  data() {
    return {
    };
  },
};
</script>
<style scoped lang="scss">

</style>
