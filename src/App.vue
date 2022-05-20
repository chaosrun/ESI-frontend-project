<template>
  <div id="app">
    <div v-if="$route.name!=='login'">
      <Navbar v-on:toggle-menu="toggleMenu"/>
      <side-nav v-on:toggle-menu="toggleMenu" :menuOpen="menuOpen"/>    
    </div>
    <div class="px-5">
      <router-view />
    </div>
  </div>
</template>

<script>
import SideNav from './components/SideNav.vue';
import Navbar from './components/Navbar.vue';
export default {
  name: 'App',
  data: function() {
    return {
      menuOpen: false,
    }
  },
  components: {
    SideNav,
    Navbar,
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    }
  }
}
</script>

<style></style>
