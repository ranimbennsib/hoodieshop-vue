<template>
  <div class="checkout-page">
    <div class="container mt-5 pt-4">
      
      <!-- Titre -->
      <div class="section-title">
        <h2>Finaliser la commande</h2>
        <div class="underline"></div>
      </div>

      <!-- Panier vide -->
      <div v-if="$cart.getCartItems().length === 0" class="empty-cart text-center py-5">
        <i class="bi bi-cart-x display-1 text-muted"></i>
        <h3 class="mt-3">Votre panier est vide</h3>
        <p class="text-muted">Ajoutez des articles avant de passer commande</p>
        <router-link to="/catalogue" class="btn btn-primary btn-lg mt-3">
          <i class="bi bi-bag"></i> Voir le catalogue
        </router-link>
      </div>

      <!-- Formulaire de commande -->
      <div v-else class="row">
        <!-- Informations client -->
        <div class="col-lg-8">
          <div class="card mb-4">
            <div class="card-header bg-primary text-white">
              <h5 class="mb-0">Informations personnelles</h5>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label">Prénom *</label>
                  <input type="text" class="form-control" v-model="customer.firstName" required>
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">Nom *</label>
                  <input type="text" class="form-control" v-model="customer.lastName" required>
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">Email *</label>
                  <input type="email" class="form-control" v-model="customer.email" required>
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">Téléphone</label>
                  <input type="tel" class="form-control" v-model="customer.phone">
                </div>
                <div class="col-12 mb-3">
                  <label class="form-label">Adresse *</label>
                  <input type="text" class="form-control" v-model="customer.address" required>
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">Ville *</label>
                  <input type="text" class="form-control" v-model="customer.city" required>
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">Code postal *</label>
                  <input type="text" class="form-control" v-model="customer.zipCode" required>
                </div>
              </div>
            </div>
          </div>

          <!-- Options de livraison -->
          <div class="card mb-4">
            <div class="card-header bg-primary text-white">
              <h5 class="mb-0">Mode de livraison</h5>
            </div>
            <div class="card-body">
              <div class="delivery-options">
                <div 
                  v-for="option in deliveryOptions" 
                  :key="option.id"
                  class="delivery-option card mb-2"
                  :class="{ 'selected': selectedDelivery.id === option.id }"
                  @click="selectedDelivery = option"
                >
                  <div class="card-body">
                    <div class="form-check">
                      <input 
                        class="form-check-input" 
                        type="radio" 
                        :id="option.id"
                        :value="option"
                        v-model="selectedDelivery"
                      >
                      <label class="form-check-label w-100" :for="option.id">
                        <div class="d-flex justify-content-between align-items-center">
                          <div>
                            <h6 class="mb-1">{{ option.name }}</h6>
                            <p class="mb-0 text-muted small">{{ option.description }}</p>
                          </div>
                          <span class="fw-bold">{{ option.price === 0 ? 'Gratuit' : option.price + ' TND' }}</span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Récapitulatif -->
        <div class="col-lg-4">
          <div class="card order-summary">
            <div class="card-header bg-primary text-white">
              <h5 class="mb-0">Récapitulatif</h5>
            </div>
            <div class="card-body">
              
              <!-- Articles -->
              <div class="order-items mb-3">
                <div 
                  v-for="item in $cart.getCartItems()" 
                  :key="`${item.product.id}-${item.color}`"
                  class="order-item d-flex align-items-center mb-2 pb-2 border-bottom"
                >
                  <img 
                    :src="getProductImage(item)" 
                    :alt="item.product.name"
                    class="order-item-img me-3"
                  >
                  <div class="flex-grow-1">
                    <h6 class="mb-1">{{ item.product.name }}</h6>
                    <p class="mb-1 small text-muted">Couleur: {{ item.color }}</p>
                    <p class="mb-0 small">Quantité: {{ item.quantity }}</p>
                  </div>
                  <span class="fw-bold">{{ (item.product.price * item.quantity) }} TND</span>
                </div>
              </div>

              <!-- Total -->
              <div class="summary-total">
                <div class="d-flex justify-content-between mb-2">
                  <span>Sous-total:</span>
                  <span>{{ subtotal }} TND</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>Livraison:</span>
                  <span>{{ selectedDelivery.price || 0 }} TND</span>
                </div>
                <div class="d-flex justify-content-between mb-3 fw-bold fs-5 border-top pt-2">
                  <span>Total:</span>
                  <span class="text-primary">{{ total }} TND</span>
                </div>
              </div>

              <!-- Bouton de confirmation -->
              <button 
                class="btn btn-success w-100 btn-lg"
                @click="processOrder"
              >
                <i class="bi bi-credit-card"></i> Confirmer la commande
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
  name: "CheckoutView",
  data() {
    return {
      customer: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        zipCode: ''
      },
      deliveryOptions: [
        {
          id: 'standard',
          name: 'Livraison standard',
          description: 'Délai: 3-5 jours ouvrables',
          price: 7
        },
        {
          id: 'express',
          name: 'Livraison express',
          description: 'Délai: 24-48 heures',
          price: 15
        },
        {
          id: 'point-relais',
          name: 'Point relais',
          description: 'Retrait en magasin partenaire',
          price: 0
        }
      ],
      selectedDelivery: {},
      // ✅ AJOUT: Variable pour forcer les mises à jour
      updateTrigger: 0
    };
  },
  computed: {
    subtotal() {
      this.updateTrigger;
      return this.$cart.getCartItems().reduce((total, item) => {
        return total + (item.product.price * item.quantity);
      }, 0);
    },
    total() {
      return this.subtotal + (this.selectedDelivery.price || 0);
    }
  },
  mounted() {
    this.selectedDelivery = this.deliveryOptions[0];
  },
  methods: {
    getProductImage(item) {
      const colorObj = item.product.colors.find(color => color.name === item.color);
      return colorObj ? colorObj.image : require('@/assets/logo.png');
    },
    processOrder() {
      // Validation
      if (!this.customer.firstName || !this.customer.email || !this.customer.address) {
        alert('Veuillez remplir tous les champs obligatoires (*)');
        return;
      }
      
      // Simulation de commande
      const orderData = {
        customer: this.customer,
        delivery: this.selectedDelivery,
        items: this.$cart.getCartItems(),
        total: this.total,
        orderId: 'CMD-' + Date.now(),
        orderDate: new Date().toLocaleDateString('fr-FR')
      };
      
      // Sauvegarder la commande
      localStorage.setItem('lastOrder', JSON.stringify(orderData));
      
      // Afficher confirmation
      alert(`✅ Commande confirmée !\n\nNuméro: ${orderData.orderId}\nTotal: ${this.total} TND\n\nMerci pour votre achat ${this.customer.firstName} !`);
      
      // Vider le panier et rediriger
      this.$cart.clearCart();
      this.$router.push('/');
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
.checkout-page {
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

.delivery-option {
  cursor: pointer;
  transition: all 0.3s;
  border: 2px solid transparent;
}

.delivery-option.selected {
  border-color: #1E90FF;
  background-color: #f0f8ff;
}

.delivery-option:hover {
  border-color: #1E90FF;
}

.order-item-img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 6px;
}

.order-summary {
  position: sticky;
  top: 100px;
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

.empty-cart {
  background: white;
  border-radius: 15px;
  padding: 4rem 2rem;
}

.form-label {
  font-weight: 500;
  color: #333;
}

.form-control {
  border-radius: 8px;
  border: 1px solid #ddd;
  padding: 0.75rem;
}

.form-control:focus {
  border-color: #1E90FF;
  box-shadow: 0 0 0 0.2rem rgba(30, 144, 255, 0.25);
}

.card {
  border: none;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.card-header {
  border-radius: 12px 12px 0 0 !important;
}

@media (max-width: 768px) {
  .section-title h2 {
    font-size: 2.5rem;
  }
  
  .order-summary {
    position: static;
    margin-top: 2rem;
  }
}
</style>