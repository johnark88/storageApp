<template>
  <div class="navigation">
    <b-nav tabs>
      <b-nav-item>Active</b-nav-item>
      <b-nav-item>Link</b-nav-item>
      <b-nav-item>Another Link</b-nav-item>
      <b-nav-item>Disabled</b-nav-item>
    </b-nav>
  </div>
</template>

<script>
// import aboutModal from '@/components/aboutModal'
// import createBucket from '@/components/createBucket'
export default {
  name: 'navigation',
  components: {
    // aboutModal,
    // createBucket,
  },
  data() {
    return {
    
    }
  }
}
</script>
<style scoped lang="scss">
  #nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>