<template>
  <div class="contact-page">
    <div class="container mt-5 pt-4">
      
      <!-- En-tête style HoodieShop -->
      <div class="section-title">
        <h2>Contactez-nous</h2>
        <div class="underline"></div>
        <p class="lead">Notre équipe vous répond dans les plus brefs délais</p>
      </div>

      <div class="row justify-content-center">
        <!-- Carte formulaire luxe -->
        <div class="col-lg-8 col-xl-6">
          <div class="luxury-card">
            <div class="card-header text-center py-4">
              <h5 class="mb-0 fw-normal">Envoyez-nous un message</h5>
            </div>
            
            <div class="card-body p-4">
              <form @submit.prevent="submitForm">
                <div class="row g-3">
                  <div class="col-md-6">
                    <div class="form-floating">
                      <input 
                        type="text" 
                        class="form-control" 
                        id="firstName" 
                        v-model="form.firstName" 
                        required
                        placeholder=" "
                      >
                      <label for="firstName">Prénom *</label>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-floating">
                      <input 
                        type="text" 
                        class="form-control" 
                        id="lastName" 
                        v-model="form.lastName" 
                        required
                        placeholder=" "
                      >
                      <label for="lastName">Nom *</label>
                    </div>
                  </div>
                </div>

                <div class="form-floating mt-3">
                  <input 
                    type="email" 
                    class="form-control" 
                    id="email" 
                    v-model="form.email" 
                    required
                    placeholder=" "
                  >
                  <label for="email">Email *</label>
                </div>

                <div class="form-floating mt-3">
                  <select class="form-select" id="subject" v-model="form.subject" required>
                    <option value="" disabled selected></option>
                    <option value="question">Question produit</option>
                    <option value="commande">Suivi de commande</option>
                    <option value="livraison">Livraison</option>
                    <option value="retour">Retour & Échange</option>
                    <option value="autre">Autre demande</option>
                  </select>
                  <label for="subject">Sujet *</label>
                </div>

                <div class="form-floating mt-3">
                  <textarea 
                    class="form-control" 
                    id="message" 
                    style="height: 120px" 
                    v-model="form.message" 
                    required
                    placeholder=" "
                  ></textarea>
                  <label for="message">Message *</label>
                </div>

                <button 
                  type="submit" 
                  class="btn btn-primary w-100 mt-4 py-3"
                  :class="{ 'btn-luxury-disabled': !formValid }"
                  :disabled="!formValid"
                >
                  <span v-if="!formValid">Remplissez le formulaire</span>
                  <span v-else>Envoyer le message</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- Informations contact discrètes -->
      <div class="row mt-5 pt-5">
        <div class="col-12">
          <div class="luxury-contact-info">
            <div class="row g-4">
              <div class="col-md-3 text-center">
                <div class="luxury-contact-item">
                  <div class="icon-wrapper">
                    <i class="bi bi-telephone"></i>
                  </div>
                  <h6 class="mt-3 fw-semibold">Téléphone</h6>
                  <p class="text-muted small">+216 70 123 456</p>
                  <p class="text-muted small">Lun-Ven • 9h-18h</p>
                </div>
              </div>
              <div class="col-md-3 text-center">
                <div class="luxury-contact-item">
                  <div class="icon-wrapper">
                    <i class="bi bi-envelope"></i>
                  </div>
                  <h6 class="mt-3 fw-semibold">Email</h6>
                  <p class="text-muted small">contact@hoodieshop.tn</p>
                  <p class="text-muted small">Réponse sous 24h</p>
                </div>
              </div>
              <div class="col-md-3 text-center">
                <div class="luxury-contact-item">
                  <div class="icon-wrapper">
                    <i class="bi bi-geo-alt"></i>
                  </div>
                  <h6 class="mt-3 fw-semibold">Showroom</h6>
                  <p class="text-muted small">Lac 1, Tunis</p>
                  <p class="text-muted small">Sur rendez-vous</p>
                </div>
              </div>
              <div class="col-md-3 text-center">
                <div class="luxury-contact-item">
                  <div class="icon-wrapper">
                    <i class="bi bi-clock"></i>
                  </div>
                  <h6 class="mt-3 fw-semibold">Service Client</h6>
                  <p class="text-muted small">7j/7</p>
                  <p class="text-muted small">9h-20h</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "ContactView",
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
      }
    };
  },
  computed: {
    formValid() {
      return this.form.firstName && 
             this.form.lastName && 
             this.form.email && 
             this.form.subject && 
             this.form.message;
    }
  },
  methods: {
    submitForm() {
      console.log('Message envoyé:', this.form);
      
      // Notification élégante
      alert(`Merci ${this.form.firstName}. Votre message a été envoyé avec succès.`);
      
      // Reset
      this.form = {
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
      };
    }
  }
};
</script>

<style scoped>
.contact-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
}

/* Titre style HoodieShop */
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

.section-title .lead {
  color: #6c757d;
  font-size: 1.2rem;
  font-weight: 300;
}

/* Carte luxe */
.luxury-card {
  background: white;
  border-radius: 16px;
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.08),
    0 0 0 1px rgba(0, 0, 0, 0.02);
  border: none;
  overflow: hidden;
}

.card-header {
  background: #fafafa;
  border-bottom: 1px solid #f0f0f0;
  padding: 2rem 2rem 1rem;
}

.card-body {
  padding: 2rem;
}

/* Form floating labels */
.form-floating {
  position: relative;
}

.form-floating > .form-control,
.form-floating > .form-select {
  height: calc(3.5rem + 2px);
  line-height: 1.25;
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  background: #fcfcfc;
  transition: all 0.2s ease;
}

.form-floating > label {
  color: #6b7280;
  font-weight: 400;
  padding: 1rem 0.75rem;
}

.form-floating > .form-control:focus,
.form-floating > .form-select:focus {
  border-color: #1E90FF;
  box-shadow: 0 0 0 2px rgba(30, 144, 255, 0.1);
  background: white;
}

.form-floating > .form-control:focus ~ label,
.form-floating > .form-control:not(:placeholder-shown) ~ label {
  color: #1E90FF;
  transform: scale(0.85) translateY(-0.5rem) translateX(0.15rem);
}

/* Bouton bleu HoodieShop */
.btn-primary {
  background: linear-gradient(135deg, #1E90FF, #00BFFF);
  border: none;
  border-radius: 8px;
  font-weight: 500;
  padding: 1rem 2rem;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
}

.btn-primary:hover:not(:disabled) {
  background: linear-gradient(135deg, #1C86EE, #009ACD);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(30, 144, 255, 0.3);
}

.btn-luxury-disabled {
  background: #d1d5db;
  color: #9ca3af;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

/* Informations contact avec bleu */
.luxury-contact-info {
  padding: 3rem 0 1rem;
}

.luxury-contact-item {
  padding: 1.5rem 1rem;
  transition: transform 0.3s ease;
}

.luxury-contact-item:hover {
  transform: translateY(-5px);
}

.icon-wrapper {
  width: 60px;
  height: 60px;
  background: #f8f9fa;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  transition: all 0.3s ease;
}

.luxury-contact-item:hover .icon-wrapper {
  background: linear-gradient(135deg, #1E90FF, #00BFFF);
}

.luxury-contact-item:hover .icon-wrapper i {
  color: white;
}

.icon-wrapper i {
  font-size: 1.25rem;
  color: #1E90FF;
  transition: all 0.3s ease;
}

.luxury-contact-item h6 {
  color: #1E90FF;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

/* Responsive */
@media (max-width: 768px) {
  .luxury-card {
    margin: 0 1rem;
  }
  
  .card-body {
    padding: 1.5rem;
  }
  
  .section-title h2 {
    font-size: 2.5rem;
  }
  
  .luxury-contact-item {
    padding: 1rem 0.5rem;
  }
}

/* Animations subtiles */
.form-control, .form-select {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>