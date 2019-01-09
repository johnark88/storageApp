<template>
  <div class="Upload">
     <font-awesome-icon :icon="['fas', 'file-upload']" size="lg" />
     <UploadComp />
  </div>
</template>
<script>
import UploadComp from '@/components/UploadComp.vue';
export default {
  name: 'Upload',
  components: {
    UploadComp
  },
  data() {
    return {
    };
  },
};
</script>
<style scoped lang="scss">

</style>
