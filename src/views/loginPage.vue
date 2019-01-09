<template>
  <div class="loginPage">
     <h4>Please Login</h4>
     <login />
     <div class="spacing"></div>
     <h4>or Sign Up</h4>
     <signUp />
  </div>
</template>
<script>
import login from '@/components/login.vue';
import signUp from '@/components/signUp.vue';
export default {
  name: 'loginPage',
  components: {
    login,
    signUp,
  },
  data() {
    return {
    };
  },
  methods: {}
};
</script>
<style scoped lang="scss">
  .loginPage {
    margin-top: 6em;
  }
  .spacing {
    margin: 2em;
  }
</style>
