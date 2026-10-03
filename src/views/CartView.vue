<template>
  <div class="cart-page">
    <div class="container mt-5 pt-4">
      
      <!-- Titre -->
      <div class="section-title">
        <h2>Mon Panier</h2>
        <div class="underline"></div>
      </div>

      <!-- Panier vide -->
      <div v-if="cartItems.length === 0" class="empty-cart text-center py-5">
        <i class="bi bi-cart-x display-1 text-muted"></i>
        <h3 class="mt-3">Votre panier est vide</h3>
        <p class="text-muted">Découvrez nos hoodies et ajoutez-les à votre panier</p>
        <router-link to="/catalogue" class="btn btn-primary btn-lg mt-3">
          <i class="bi bi-bag"></i> Voir le catalogue
        </router-link>
      </div>

      <!-- Panier avec articles -->
      <div v-else class="row">
        <!-- Liste des articles -->
        <div class="col-lg-8">
          <div class="cart-items">
            <div 
              v-for="item in cartItems" 
              :key="`${item.product.id}-${item.color}`"
              class="cart-item card mb-3"
            >
              <div class="card-body">
                <div class="row align-items-center">
                  
                  <!-- Image -->
                  <div class="col-md-2">
                    <img 
                      :src="getProductImage(item)" 
                      :alt="item.product.name"
                      class="cart-item-img"
                    >
                  </div>

                  <!-- Infos produit -->
                  <div class="col-md-4">
                    <h5 class="cart-item-title">{{ item.product.name }}</h5>
                    <p class="cart-item-color">
                      <span class="color-dot" :style="{ backgroundColor: getColorCode(item.color) }"></span>
                      {{ item.color }}
                    </p>
                    <p class="cart-item-price">{{ item.product.price }} TND</p>
                  </div>

                  <!-- Quantité -->
                  <div class="col-md-3">
                    <div class="quantity-controls d-flex align-items-center">
                      <button 
                        class="btn btn-outline-secondary btn-sm"
                        @click="decreaseQuantity(item)"
                        :disabled="item.quantity <= 1"
                      >
                        <i class="bi bi-dash"></i>
                      </button>
                      
                      <span class="quantity mx-3">{{ item.quantity }}</span>
                      
                      <button 
                        class="btn btn-outline-secondary btn-sm"
                        @click="increaseQuantity(item)"
                        :disabled="item.quantity >= item.product.stock"
                      >
                        <i class="bi bi-plus"></i>
                      </button>
                    </div>
                  </div>

                  <!-- Sous-total -->
                  <div class="col-md-2">
                    <p class="cart-item-subtotal fw-bold">
                      {{ (item.product.price * item.quantity) }} TND
                    </p>
                  </div>

                  <!-- Supprimer -->
                  <div class="col-md-1">
                    <button 
                      class="btn btn-danger btn-sm"
                      @click="removeItem(item)"
                      title="Supprimer"
                    >
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Résumé commande -->
        <div class="col-lg-4">
          <div class="order-summary card">
            <div class="card-header bg-primary text-white">
              <h5 class="mb-0">Résumé de la commande</h5>
            </div>
            <div class="card-body">
              
              <!-- Sous-total -->
              <div class="summary-row d-flex justify-content-between mb-2">
                <span>Sous-total ({{ totalItems }} articles):</span>
                <span>{{ subtotal }} TND</span>
              </div>

              <!-- Livraison -->
              <div class="summary-row d-flex justify-content-between mb-2">
                <span>Livraison:</span>
                <span>{{ deliveryCost }} TND</span>
              </div>

              <!-- Total -->
              <div class="summary-row d-flex justify-content-between mb-3 fw-bold fs-5">
                <span>Total:</span>
                <span class="text-primary">{{ total }} TND</span>
              </div>

              <!-- Bouton commander -->
              <router-link 
                to="/checkout" 
                class="btn btn-success w-100 btn-lg"
              >
                <i class="bi bi-credit-card"></i> Commander maintenant
              </router-link>

              <!-- Continuer shopping -->
              <router-link 
                to="/catalogue" 
                class="btn btn-outline-primary w-100 mt-2"
              >
                <i class="bi bi-bag"></i> Continuer mes achats
              </router-link>

              <!-- Vider panier -->
              <button 
                class="btn btn-outline-danger w-100 mt-2"
                @click="clearCart"
              >
                <i class="bi bi-trash"></i> Vider le panier
              </button>

            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "CartView",
  data() {
    return {
      deliveryCost: 7,
      // ✅ AJOUT: Variable pour forcer les mises à jour
      updateTrigger: 0
    };
  },
  computed: {
    // ✅ CORRECTION: Utiliser computed pour la réactivité
    cartItems() {
      // ✅ Force le re-calcul quand updateTrigger change
      this.updateTrigger;
      return this.$cart.getCartItems();
    },
    totalItems() {
      this.updateTrigger;
      return this.$cart.getTotalItems();
    },
    subtotal() {
      this.updateTrigger;
      return this.$cart.getCartItems().reduce((total, item) => {
        return total + (item.product.price * item.quantity);
      }, 0);
    },
    total() {
      return this.subtotal + this.deliveryCost;
    }
  },
  methods: {
    increaseQuantity(item) {
      if (item.quantity < item.product.stock) {
        item.quantity++;
        this.$cart.updateTotalItems();
        // ✅ FORCER la mise à jour de l'interface
        this.updateTrigger++;
      }
    },
    decreaseQuantity(item) {
      if (item.quantity > 1) {
        item.quantity--;
        this.$cart.updateTotalItems();
        // ✅ FORCER la mise à jour de l'interface
        this.updateTrigger++;
      }
    },
    removeItem(item) {
      if (confirm(`Supprimer ${item.product.name} (${item.color}) du panier ?`)) {
        this.$cart.removeItem(item.product.id, item.color);
        // ✅ FORCER la mise à jour de l'interface
        this.updateTrigger++;
      }
    },
    clearCart() {
      if (confirm("Vider tout le panier ?")) {
        this.$cart.clearCart();
        // ✅ FORCER la mise à jour de l'interface
        this.updateTrigger++;
      }
    },
    getProductImage(item) {
      const colorObj = item.product.colors.find(color => color.name === item.color);
      return colorObj ? colorObj.image : require('@/assets/logo.png');
    },
    getColorCode(colorName) {
      const colors = {
        'Bleu': '#1E90FF',
        'Bleu Foncé': '#000080', 
        'Rouge': '#FF4444',
        'Rouge Foncé': '#CC0000',
        'Vert': '#28a745',
        'Vert Forêt': '#228B22',
        'Noir': '#000000',
        'Gris': '#6c757d'
      };
      return colors[colorName] || '#666';
    }
  },
  // ✅ AJOUT: Surveiller les changements du panier
  watch: {
    '$cart.state.items': {
      handler() {
        this.updateTrigger++;
      },
      deep: true
    }
  }
};
</script>

<style scoped>
/* Gardez le même CSS */
.cart-page {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.section-title {
  text-align: center;
  margin-bottom: 3rem;
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

.empty-cart {
  background: white;
  border-radius: 15px;
  padding: 4rem 2rem;
}

.cart-item {
  border: none;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}

.cart-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.15);
}

.cart-item-img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

.cart-item-title {
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
}

.cart-item-color {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.color-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid #ddd;
}

.cart-item-price {
  color: #1E90FF;
  font-weight: 500;
  margin-bottom: 0;
}

.quantity-controls .btn {
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantity {
  font-weight: 600;
  font-size: 1.1rem;
  min-width: 30px;
  text-align: center;
}

.cart-item-subtotal {
  color: #1E90FF;
  font-size: 1.1rem;
}

.order-summary {
  border: none;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  position: sticky;
  top: 100px;
}

.summary-row {
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

.btn-success {
  background: linear-gradient(135deg, #28a745, #20c997);
  border: none;
  font-weight: 600;
  padding: 0.75rem;
}

.btn-success:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
}

@media (max-width: 768px) {
  .cart-item-img {
    width: 60px;
    height: 60px;
  }
  
  .section-title h2 {
    font-size: 2.5rem;
  }
}
</style>