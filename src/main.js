import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

const app = createApp(App);

// Store global pour le panier - VERSION CORRIGÉE
app.config.globalProperties.$cart = {
  state: {
    items: [],
    totalItems: 0
  },
  
  addItem(product, selectedColor) {
    const existingItem = this.state.items.find(item => 
      item.product.id === product.id && item.color === selectedColor
    );
    
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.state.items.push({
        product: { ...product },
        color: selectedColor,
        quantity: 1
      });
    }
    
    if (product.stock > 0) {
      product.stock--;
    }
    
    this.updateTotalItems();
  },
  
  updateTotalItems() {
    this.state.totalItems = this.state.items.reduce((total, item) => 
      total + item.quantity, 0
    );
  },
  
  getTotalItems() {
    return this.state.totalItems;
  },
  
  removeItem(productId, color) {
    this.state.items = this.state.items.filter(item => 
      !(item.product.id === productId && item.color === color)
    );
    this.updateTotalItems();
  },
  
  clearCart() {
    this.state.items = [];
    this.updateTotalItems();
  },
  
  getCartItems() {
    return this.state.items;
  }
};

app.use(store).use(router).mount("#app");