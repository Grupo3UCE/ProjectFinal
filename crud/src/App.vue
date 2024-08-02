<template>
  <div id="app">
    <div id="nav">
      <NavigationMenu/>
    </div>
    <router-view />
  </div> 
</template>


<script>
import NavigationMenu from './components/layout/NavigationMenu.vue';

export default {
  components: {
    NavigationMenu
  }
};

</script>

<style lang="scss">
@import './scss/App.scss';
</style>