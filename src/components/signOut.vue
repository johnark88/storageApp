<template>
  <div class="signOut">
    <b-btn id="signOut" @click="signOut">Sign Out</b-btn>
    <!--  @TODO change sign out to login again on sign out -->
  </div>
</template>
<script>
export default {
  name: 'signOut',
  data() {
    return {
      
    }
  },
  methods: {
    async signOut() {
      await this.$auth.logout();
       this.$router.push('/');
    }
  }
}
</script>
<style scoped lang="scss">
#signOut {
  background-color: $colorBlue;
  border: $colorBlue;
  &:hover {
    background-color: $hoverBlue;
  }
} 
</style>
