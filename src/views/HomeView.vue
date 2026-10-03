<template> 
  <div class="home">
  

    <!-- Hero section directement dans le home -->
    <section v-if="showHero" class="hero d-flex align-items-center justify-content-center text-center">
      <div class="overlay"></div>
      <div class="container hero-content">
        <h1>{{ heroTitle }}</h1>
        <p>{{ heroSubtitle }}</p>
        <router-link class="btn hero-btn" :to="heroButtonLink">{{ heroButtonText }}</router-link>
      </div>
    </section>

    <!-- Section Nouveautés via composant -->
    <NewProducts />
    <StatSection></StatSection>
    <ReviewSection></ReviewSection>
    <FooterSection></FooterSection>
  </div>
</template>

<script>
import FooterSection from "@/components/FooterSection.vue";

import NewProducts from "@/components/NewProducts.vue"; 
import ReviewSection from "@/components/ReviewSection.vue";
import StatSection from "@/components/StatSection.vue";
export default {
  name: "HomeView",
  components: {  NewProducts , StatSection, ReviewSection,FooterSection},  
  data() {
    return {
      // Hero dynamique simple
      showHero: true,
      heroTitle: "Bienvenue sur HoodieShop",
      heroSubtitle: "Découvrez nos hoodies confortables et stylés",
      heroButtonText: "Voir le catalogue",
      heroButtonLink: "/catalogue"
    };
  }
};
</script>

<style scoped>
.hero {
  position: relative;
  height: 80vh;
  background: url('@/assets/herosection.jpg') no-repeat center/cover;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.4);
}

.hero-content {
  position: relative;
  z-index: 2;
}

.hero h1 {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.hero-btn {
  padding: 0.8rem 2rem;
  border-radius: 30px;
  background-color: #00BFFF;
  color: white;
  font-weight: bolder;
  text-decoration: none;
}

.hero-btn:hover {
  background-color: #1E90FF;
}
</style>
