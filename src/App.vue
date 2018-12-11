<template>
  <div id="app">
    <div id="nav">
      
      <navigation />
    </div>
    <router-view/>
  </div>
</template>
<script>
import navigation from '@/components/navigation'
export default {
  name: 'App',
  components: {
    navigation,
  },
  data() {
    return {
    
    }
  }
}
</script>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
