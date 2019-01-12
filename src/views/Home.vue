<template>
  <div class="home">
    <landingPage />
    <p>Home</p>
  </div>
</template>

<script>
// @ is an alias to /src
import landingPage from '@/components/landingPage.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'home',
  components: {
    landingPage,
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
    //     this.$route.query.redirect;
    //   } else {
    //     this.userStatus = true;
    //   }
    // }
  }
};
</script>
<style scoped lang="scss">
  .siteHeader {
    margin-top: 4em;
    h4 {
      margin-top: 1em;
    }
  }
  .siteSignIn {
    margin-top: 1em;
  }
  .signButtons {
    margin-left: 5em;
  }
</style>