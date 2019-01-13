<template>
  <div class="loginPage">
     <b-container>
      <b-row class="justify-content-center siteHeader">
        <h4>Sign In below </h4>
      </b-row>
      </b-container>
      <login />
  </div>
</template>
<script>
import login from '@/components/login.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'loginPage',
  components: {
    login,
  },
  data() {
    return {
      userStatus: false,
    };
  },
  computed: {
    ...mapGetters(['user']),
  },
  watch: {
    // user(auth) {
    //   if(!auth){
    //     this.$route.push('/');
    //   } else {
    //     this.userStatus = true;
    //   }
    // }
  }
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
