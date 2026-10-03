<template>
  <section class="products-section">
    <div class="section-title">
      <h2>Nos dernières créations</h2>
      <div class="underline"></div>
    </div>

    <div class="products-slider">
      <!-- Bouton précédent -->
      <button class="slider-nav slider-prev" @click="prevSlide" :disabled="currentSlide === 0">
        <i class="bi bi-arrow-left-circle"></i>
      </button>

      <!-- Conteneur produits -->
      <div class="products-wrapper">
        <div
          class="products-container"
          :style="{ transform: `translateX(-${currentSlide * slideWidth}px)` }"
          ref="container"
        >
          <div
            class="product-card"
            v-for="product in products"
            :key="product.id"
          >
            <div class="product-badge">{{ product.badge }}</div>
            <div class="product-image">
              <img :src="product.image" :alt="product.name" />
            </div>
            <div class="product-info">
              <h3>{{ product.name }}</h3>
              <p>{{ product.price }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Bouton suivant -->
      <button class="slider-nav slider-next" @click="nextSlide" :disabled="currentSlide >= maxSlide">
       <i class="bi bi-arrow-right-circle"></i>
      </button>
    </div>
  </section>
</template>

<script>
export default {
  name: "NewProducts",
  data() {
    return {
      currentSlide: 0,
      slidesToShow: 4,
      slideWidth: 0,
      products: [
        { id: 1, name: "Hoodie Bleu", price: "120 TND", badge: "Nouveau", image: require("@/assets/nv1.png") },
        { id: 2, name: "Hoodie Noir", price: "130 TND", badge: "Nouveau", image: require("@/assets/nv2.png") },
        { id: 3, name: "Hoodie marron", price: "125 TND", badge: "Nouveau", image: require("@/assets/nv3.png") },
        { id: 4, name: "Hoodie beige", price: "135 TND", badge: "Nouveau", image: require("@/assets/nv4.png") },
        { id: 5, name: "Hoodie rouge", price: "140 TND", badge: "Nouveau", image: require("@/assets/nv5.png") },
        { id: 6, name: "Hoodie vert", price: "145 TND", badge: "Nouveau", image: require("@/assets/nv6.png") },
      ],
    };
  },
  computed: {
    maxSlide() {
      return Math.max(0, this.products.length - this.slidesToShow);
    },
  },
  mounted() {
    const card = this.$refs.container.querySelector(".product-card");
    const style = getComputedStyle(card);
    const gap = parseInt(style.marginRight);
    this.slideWidth = card.offsetWidth + gap;
  },
  methods: {
    nextSlide() {
      if (this.currentSlide < this.maxSlide) this.currentSlide++;
    },
    prevSlide() {
      if (this.currentSlide > 0) this.currentSlide--;
    }
  }
};
</script>

<style scoped>
.products-section {
  margin-top: 45px;
  padding: 3rem 5%;
}

.section-title {
  text-align: center;
  margin-bottom: 2rem;
}

.section-title h2 {
  font-size: 3.2rem;
  color: #1E90FF;
  font-weight: bold;
}

.section-title .underline {
  width: 150px;
  height: 4px;
  background: #00BFFF;
  margin: 0.5rem auto;
  border-radius: 2px;
  margin-top: 25px;
  margin-bottom: 25px;
}

.products-slider {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
}

.products-wrapper {
  overflow: hidden;
  flex: 1;
}

.products-container {
  display: flex;
  gap: 2rem;
  transition: transform 0.5s ease;
}

.product-card {
  flex: 0 0 calc(25% - 1rem);
  background: white;
  border-radius: 12px;
  overflow: hidden;
  text-align: center;
  box-shadow: 0 5px 20px rgba(0,0,0,0.1);
  position: relative;
  transition: transform 0.3s, box-shadow 0.3s;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
}

.product-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #00BFFF;
  color: white;
  padding: 0.4rem 0.9rem;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 500;
}

.product-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.product-info h3 {
  margin: 0.5rem 0;
  font-size: 1.1rem;
  color: #333;
}

.product-info p {
  font-weight: bold;
  color: #1E90FF;
}

/* Boutons flèches visibles et pro */
.slider-nav {
  background: transparent;
  color: #1E90FF;
  font-size: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: color 0.3s, transform 0.3s;
  border: none;
  padding: 0;
}

.slider-nav:hover {
  color: #0077cc;
  transform: scale(1.2);
}

.slider-nav:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.slider-prev {
  margin-right: 0.5rem;
}

.slider-next {
  margin-left: 0.5rem;
}
</style>
