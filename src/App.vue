<template>
  <div>
    <!-- Appel de la navbar -->
    <Navbar />

    <!-- Affichage des pages selon le router -->
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  name: "App",
  components: {
    Navbar
  }
}
</script>
