<template>
  <div class="catalogue">
    <div class="container mt-5 pt-4">
      
      <!-- Section Title  -->
      <div class="section-title">
        <h2>Notre Catalogue de Hoodies</h2>
        <div class="underline"></div>
      </div>
      
      <!-- Filtres -->
      <div class="row mb-4">
        <div class="col-md-4">
          <select class="form-select" v-model="selectedCategory">
            <option value="">Toutes les catégories</option>
            <option value="homme">Homme</option>
            <option value="femme">Femme</option>
            <option value="enfant">Enfant</option>
          </select>
        </div>
        <div class="col-md-4">
          <select class="form-select" v-model="selectedSize">
            <option value="">Toutes les tailles</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
        </div>
        <div class="col-md-4">
          <input 
            type="text" 
            class="form-control" 
            placeholder="Rechercher un hoodie..."
            v-model="searchQuery"
          >
        </div>
      </div>

      <!-- Produits avec le composant ProductCard -->
      <div class="row">
        <div 
          class="col-lg-3 col-md-4 col-sm-6 mb-4" 
          v-for="product in filteredProducts" 
          :key="product.id"
        >
          <ProductCard 
            :product="product"
            @color-changed="handleColorChange"
            @add-to-cart="handleAddToCart"
          />
        </div>
      </div>

      <!-- Message si aucun produit trouvé -->
      <div v-if="filteredProducts.length === 0" class="text-center py-5">
        <h4 class="text-muted">Aucun produit trouvé</h4>
        <p class="text-muted">Essayez de modifier vos filtres de recherche</p>
      </div> 
    </div>
  </div>
 <FooterSection></FooterSection>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue';
import FooterSection from '@/components/FooterSection.vue';
export default {
  name: "CatalogueView",
  components: {
    ProductCard,
    FooterSection
  },
  data() {
    return {
      selectedCategory: '',
      selectedSize: '',
      searchQuery: '',
      products: [
        {
          id: 1,
          name: "Hoodie homme",
          price: 120,
          stock: 5,
          category: "homme",
          size: ["S", "M", "L"],
          isNew: false,
          colors: [
            { 
              name: "vert", 
              code: "#006400",
              image: require("@/assets/hoodie1.png")
            },
            { 
              name: "gris", 
              code: "#808080",
              image: require("@/assets/hoodie2.png")
            }
          ]
        },
        {
          id: 2,
          name: "Hoodie homme",
          price: 125,
          stock: 1,
          category: "homme",
          size: ["S", "M","XL"],
          isNew: false,
          colors: [
            { 
              name: "vertolive", 
              code: "#556B2F",
              image: require("@/assets/hoodie3.png")
            },
            { 
              name: "gris Foncé", 
              code: "#404040",
              image: require("@/assets/hoodie4-removebg-preview.png")
            }
          ]
        },
        {
          id: 3,
          name: "Hoodie homme",
          price: 135,
          stock: 15,
          category: "homme",
          size: ["M", "L"],
          isNew: true,
          colors: [
            { 
              name: "Vert", 
              code: "#28a745",
              image: require("@/assets/hoodie5.png")
            },
            { 
              name: "Vert Forêt", 
              code: "#000000",
              image: require("@/assets/hoddie6.png")
            }
          ]
        },
        {
          id: 4,
          name: "Hoodie homme",
          price: 130,
          stock: 8,
          category: "homme",
          size: ["M", "L", "XL"],
          isNew: false,
          colors: [
            { 
              name: "beige", 
              code: "#FFE4C4",
              image: require("@/assets/hoodie7.png")
            },
            { 
              name: "marron", 
              code: "#A0522D",
              image: require("@/assets/hoodie8.png")
            }
          ]
        },
        {
          id: 5,
          name: "Hoodie enfant",
          price: 130,
          stock: 8,
          category: "enfant",
          size: ["S", "M", "L"],
          isNew: false,
          colors: [
            { 
              name: "marron", 
              code: "#A0522D",
              image: require("@/assets/hoodie9.png")
            },
            { 
              name: "noir", 
              code: "#000000",
              image: require("@/assets/hoodie10.png")
            }
          ]
        },
          {
          id: 6,
          name: "Hoodie femme",
          price: 130,
          stock: 8,
          category: "femme",
          size: ["S", "M", "L"],
          isNew: false,
          colors: [
            { 
              name: "gris", 
              code: "#A0522D",
              image: require("@/assets/hoodie12.png")
            },
            { 
              name: "maron", 
              code: "#808080",
              image: require("@/assets/hoodie11.png")
            }
          ]
        },
         {
          id: 7,
          name: "Hoodie femme",
          price: 130,
          stock: 8,
          category: "femme",
          size: ["S", "M", "L"],
          isNew: false,
          colors: [
            { 
              name: "rose", 
              code: "#FFC0CB",
              image: require("@/assets/hoodie13.png")
            },
            { 
              name: "bleu ciel", 
              code: "#87CEEB",
              image: require("@/assets/hoodie14.png")
            }
          ]
        },
         {
          id: 8,
          name: "Hoodie enfant",
          price: 130,
          stock: 8,
          category: "enfant",
          size: ["S", "M", "L"],
          isNew: false,
          colors: [
            { 
              name: "rouge brick", 
              code: "#B22222",
              image: require("@/assets/hoodie21.png")
            },
            { 
              name: "gris foncée", 
              code: "#484848",
              image: require("@/assets/hoodie22.png")
            }
          ]
        },

      ]
    };
  },
  computed: {
    filteredProducts() {
      return this.products.filter(product => {
        const matchesCategory = !this.selectedCategory || product.category === this.selectedCategory;
        const matchesSize = !this.selectedSize || product.size.includes(this.selectedSize);
        const matchesSearch = !this.searchQuery || 
          product.name.toLowerCase().includes(this.searchQuery.toLowerCase());
        
        return matchesCategory && matchesSize && matchesSearch;
      });
    }
  },
  methods: {
    handleColorChange(event) {
      console.log('Couleur changée:', event);
    },
    handleAddToCart(event) {
      console.log('Ajouter au panier:', event);
    }
  }
};
</script>

<style scoped>
.catalogue {
  min-height: 100vh;
  padding-bottom: 2rem;
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
</style>