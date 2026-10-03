<template>
  <nav class="navbar navbar-expand-lg fixed-top shadow-sm" style="background: linear-gradient(90deg, #1E90FF, #00BFFF);">
    <div class="container">
      <!-- Logo -->
      <router-link class="navbar-brand fw-bold text-white d-flex align-items-center" to="/">
        <img src="@/assets/logo.png" alt="Logo" height="45" class="me-2">
        HoodieShop
      </router-link>

      <!-- Bouton hamburger responsive -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Liens de navigation -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto align-items-lg-center">
          <li class="nav-item mx-2">
            <router-link
              class="nav-link text-white fw-semibold"
              :class="{ active: $route.path === '/' }"
              to="/"
            >
              Home
            </router-link>
          </li>
          <li class="nav-item mx-2">
            <router-link
              class="nav-link text-white fw-semibold"
              :class="{ active: $route.path === '/catalogue' }"
              to="/catalogue"
            >
              Catalogue
            </router-link>
          </li>
          <li class="nav-item mx-2">
            <router-link
              class="nav-link text-white fw-semibold"
              :class="{ active: $route.path === '/contact' }"
              to="/contact"
            >
              Contact
            </router-link>
          </li>

          <!-- Bouton panier avec compteur dynamique -->
          <li class="nav-item mx-2 position-relative">
            <router-link class="btn btn-outline-light fw-bold d-flex align-items-center" to="/cart" style="border-radius: 20px;">
              <i class="bi bi-cart2 me-1"></i> Panier
              <!-- Cercle du compteur dynamique -->
              <span class="cart-badge" v-if="totalItems >= 0">{{ totalItems}}</span>
            
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      totalItems: 0
    };
  },
  mounted() {
    this.updateCartCount();
    setInterval(() => {
      this.updateCartCount();
    }, 100);
  },
  methods: {
    updateCartCount() {
      this.totalItems = this.$cart.getTotalItems();
    }
  }
};
</script>

<style scoped>
.navbar-nav .nav-link {
  transition: color 0.3s, border-bottom 0.3s;
  padding-bottom: 5px;
}
.navbar-nav .nav-link:hover {
  color: #ffe4b5; 
}

.navbar-nav .nav-link.active {
  border-bottom: 3px solid #fff;
}

.btn-outline-light {
  transition: background-color 0.3s, color 0.3s;
  border-radius: 20px;
  position: relative;
  padding-right: 2rem;
}
.btn-outline-light:hover {
  background-color: white;
  color: #1E90FF;
}

.cart-badge {
  position: absolute;
  top: -8px;
  right: 5px;
  background-color: #ff4444;
  color: white;
  font-size: 0.8rem;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  border: 2px solid white;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

body {
  padding-top: 80px;
}
</style>