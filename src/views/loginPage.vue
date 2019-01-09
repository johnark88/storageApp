<template>
  <div class="loginPage">
     <h4>Please Login</h4>
     <login />
  </div>
</template>
<script>
import login from '@/components/login.vue';
export default {
  name: 'loginPage',
  components: {
    login
  },
  data() {
    return {
    };
  },
  methods: {}
};
</script>
<style scoped lang="scss">

</style>
