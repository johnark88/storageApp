<template>
  <div class="home">
    <landingPage />
    <b-container>
      <b-row class="justify-content-center siteHeader">
        <h2>Welcome to the storage app. Taking care of all your image storage needs</h2>
        
        <h4>Sign up or Login below </h4>
      </b-row>
      </b-container>
        <div v-if="showSignUp">
          <signUp />
        </div>
        <div v-if="showSignIn"> 
          <login />
        </div>
  </div>
</template>

<script>
// @ is an alias to /src
import landingPage from '@/components/landingPage.vue';
import signUp from '@/components/signUp.vue';
import login from '@/components/login.vue';

export default {
  name: 'home',
  components: {
    landingPage,
    login,
    signUp,
  },
  data() {
    return {
      showSignIn: true,
      showSignUp: true,
    };
  },
    // showSignIn(oldVal, newVal) {
    //   console.log(oldVal, newVal)
    //   this.showSignUp = false;
    // },
    // showSignUp(oldVal, newVal) {
    //   console.log(oldVal, newVal , 'sign up')
    //   this.showSignIn = false;
    // }
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