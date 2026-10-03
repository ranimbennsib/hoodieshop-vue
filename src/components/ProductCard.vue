<template>
  <div 
    class="product-card" 
    :class="{ 'out-of-stock': product.stock === 0 }"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <!-- Image du produit -->
    <div class="product-image">
      <img 
        :src="currentImage" 
        :alt="product.name"
        class="product-img"
      />
      <!-- Badge "Out of Stock" -->
      <div v-if="product.stock === 0" class="out-of-stock-overlay">
        <span>Rupture de Stock</span>
      </div>
      <!-- Badge "Nouveau" -->
      <div v-else-if="product.isNew" class="new-badge">Nouveau</div>
      <!-- Badge stock faible -->
      <div v-else-if="product.stock < 5" class="low-stock-badge">
        Plus que {{ product.stock }}
      </div>
    </div>

    <!-- Informations du produit -->
    <div class="product-info">
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-price">{{ product.price }} TND</p>
      <p class="product-stock" :class="{ 'low-stock': product.stock > 0 && product.stock < 10 }">
        Stock: {{ product.stock }}
      </p>
    </div>

    <!-- Cercles de couleur -->
    <div class="color-options">
      <button
        v-for="color in product.colors"
        :key="color.name"
        class="color-circle"
        :style="{ backgroundColor: color.code }"
        @click="changeColor(color)"
        :class="{ active: currentColor.name === color.name }"
        :title="color.name"
        :disabled="product.stock === 0"
      ></button>
    </div>

    <!-- Boutons d'action -->
    <div class="product-actions">
      <button 
        class="btn btn-primary add-to-cart"
        @click="addToCart"
        :disabled="product.stock === 0"
      >
        <i class="bi bi-cart-plus"></i> 
        {{ product.stock === 0 ? 'Rupture' : 'Ajouter' }}
      </button>
     
    </div>

    <!-- Message de confirmation -->
    <div v-if="showAddedMessage" class="added-message">
      ✓ Ajouté au panier !
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isHovered: false,
      currentColor: this.product.colors[0],
      showAddedMessage: false
    };
  },
  computed: {
    currentImage() {
      return this.currentColor.image;
    }
  },
  methods: {
    changeColor(color) {
      if (this.product.stock > 0) {
        this.currentColor = color;
        this.$emit('color-changed', {
          productId: this.product.id,
          color: color.name
        });
      }
    },
    addToCart() {
      if (this.product.stock > 0) {
        this.$cart.addItem(this.product, this.currentColor.name);
        // affiche la confirmation 
        this.showAddedMessage = true;
        setTimeout(() => {
          this.showAddedMessage = false;
        }, 2000);
        //donner les nv info a son parent"catalogueview"
        this.$emit('add-to-cart', {
          product: this.product,
          selectedColor: this.currentColor.name
        });
      }
    }
  },
  mounted() {
    this.currentColor = this.product.colors[0];
  }
};
</script>

<style scoped>
.product-card {
  background: white;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  border: 2px solid transparent;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  border-color: #1E90FF;
}

.product-image {
  position: relative;
  margin-bottom: 1rem;
  border-radius: 8px;
  overflow: hidden;
}

.product-img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.product-card:hover .product-img {
  transform: scale(1.05);
}

.out-of-stock-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

.out-of-stock-overlay span {
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  background: #ff4444;
  padding: 0.5rem 1rem;
  border-radius: 20px;
}

.new-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #00BFFF;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: bold;
}

.low-stock-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background: #ffc107;
  color: #000;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: bold;
}

.product-info {
  text-align: center;
  margin-bottom: 1rem;
}

.product-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
}

.product-price {
  font-size: 1.3rem;
  font-weight: bold;
  color: #1E90FF;
  margin-bottom: 0.3rem;
}

.product-stock {
  font-size: 0.9rem;
  color: #28a745;
  margin-bottom: 0;
}

.low-stock {
  color: #ffc107;
  font-weight: bold;
}

.color-options {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.color-circle {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 2px solid #ddd;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.color-circle:hover {
  transform: scale(1.2);
  border-color: #1E90FF;
}

.color-circle.active {
  border-color: #1E90FF;
  transform: scale(1.1);
}

.color-circle.active::after {
  content: '✓';
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.8rem;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
}

.color-circle:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.color-circle:disabled:hover {
  transform: none;
  border-color: #ddd;
}

.product-actions {
  display: flex;
  gap: 0.5rem;
}

.product-actions .btn {
  flex: 1;
  padding: 0.5rem;
  font-size: 0.9rem;
}

.add-to-cart:disabled {
  background-color: #6c757d;
  border-color: #6c757d;
  cursor: not-allowed;
}

.added-message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(40, 167, 69, 0.95);
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: bold;
  z-index: 10;
  animation: fadeInOut 2s ease-in-out;
}

@keyframes fadeInOut {
  0%, 100% { opacity: 0; }
  20%, 80% { opacity: 1; }
}

.out-of-stock {
  opacity: 0.7;
}

.out-of-stock .product-actions .btn {
  pointer-events: none;
}
</style>