<template>
  <div class="navigation">
    <b-navbar toggleable  class="mainNavBar">
        <b-navbar-toggle target="nav_text_collapse"></b-navbar-toggle>
        <b-navbar-brand>Storage App</b-navbar-brand>
        <b-collapse is-nav id="nav_text_collapse">
          <b-nav-text>Your storage needs </b-nav-text>
          <b-navbar-nav >
            <b-nav-item><router-link to="/">Home</router-link></b-nav-item>
            <b-nav-item><router-link to="/upload">Upload</router-link></b-nav-item>
            <b-nav-item><router-link to="/user-files">See Files</router-link></b-nav-item>
            <!-- <b-nav-item><router-link to="/">Home</router-link></b-nav-item>
            <b-nav-item><router-link to="/">Home</router-link></b-nav-item> -->
            <about-modal />
            <b-nav-item-dropdown text="User" right>
              <b-dropdown-item href="#">Account</b-dropdown-item>
              <b-dropdown-item href="#">Settings</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
        <b-nav-item v-show="!userStatus"> <router-link to="/login">Login/Sign Up</router-link> </b-nav-item>
        <b-nav-item v-show="userStatus"> <signOut /> </b-nav-item>
    </b-navbar>
  </div>
</template>

<script>
import aboutModal from '@/components/aboutModal.vue';
import login from '@/components/login.vue'
import signOut from '@/components/signOut.vue'
import { mapGetters } from 'vuex';

export default {
  name: 'navigation',
  components: {
    aboutModal,
    login,
    signOut,
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
    user(auth) {
      if(!auth){
        this.$route.query.redirect;
      } else {
        this.userStatus = true;
      }
    }
  }
};
</script>
<style lang="scss">
a {
  color: $colorDark;
  &:hover {
    text-decoration: none;
    color: $colorAqua;
  }
}
.navbar-light .navbar-brand {
  color: $colorDark;
  font-weight: 500;
}
.navbar-light .navbar-text {
  color: $colorDark;
}
.navbar-light .navbar-nav .nav-link {
  color: $colorDark;
}
.mainNavBar{
  margin-bottom: 25px;
  background-color: $colorWhite;
}
.navbar-nav {
  margin-left: 70px;
}
.nav-item {
  list-style: none;
}


@media (max-width: 599px) {
 .navbar-nav {
    margin-left: 0px;
  }
}
</style>
