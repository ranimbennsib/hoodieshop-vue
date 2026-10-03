<template>
  <footer class="footer">
    <div class="footer-grid">

      <!-- Col 1 -->
      <div class="footer-col">
        <a href="#" class="footer-logo">HoodieShop</a>
        <p class="footer-about">
         Depuis 2024, nous créons des vêtements personnalisés qui touchent le cœur et marquent 
         les esprits. Chaque pièce est conçue avec passion et savoir-faire.
        </p>

        <div class="social-links">
          <a href="#" class="social-link"><i class="bi bi-facebook"></i></a>
          <a href="#" class="social-link"><i class="bi bi-instagram"></i></a>
          <a href="#" class="social-link"><i class="bi bi-pinterest"></i></a>
          <a href="#" class="social-link"><i class="bi bi-linkedin"></i></a>
        </div>
      </div>

      <!-- Col 2 -->
      <div class="footer-col">
        <h3>Boutique</h3>
        <ul class="footer-links">
          <li><a href="#">Nouveautés</a></li>
          <li><a href="#">Best-sellers</a></li>
          <li><a href="#">Pour elle</a></li>
          <li><a href="#">Pour lui</a></li>
          <li><a href="#">Idées cadeaux</a></li>
        </ul>
      </div>

      <!-- Col 3 -->
      <div class="footer-col">
        <h3>Service client</h3>
        <ul class="footer-links">
          <li><a href="#">Contactez-nous</a></li>
          <li><a href="#">Livraison & retours</a></li>
          <li><a href="#">FAQ</a></li>
          <li><a href="#">Guide des tailles</a></li>
          <li><a href="#">Confidentialité</a></li>
        </ul>
      </div>

      <!-- Col 4 -->
      <div class="footer-col">
        <h3>Entreprise</h3>
        <ul class="footer-links">
          <li><a href="#">Notre histoire</a></li>
          <li><a href="#">Carrières</a></li>
          <li><a href="#">Presse</a></li>
          <li><a href="#">Cadeaux d'affaires</a></li>
          <li><a href="#">Blog</a></li>
        </ul>
      </div>

    </div>

    <div class="footer-bottom">
      <p>© 2025 Élégance Cadeaux — Tous droits réservés.</p>
    </div>
  </footer>
</template>

<style scoped>

.footer {
  background: #e6f4ff;          
  color: #002b5b;             
  padding: 5rem 5% 2rem;
  margin-top: 3rem;
}

/* Grid Layout */
.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 3rem;
  max-width: 1200px;
  margin: auto;
}

.footer-col h3 {
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 0.6rem;
  color: #003865;
  font-weight: 600;
}

.footer-col h3::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 45px;
  height: 3px;
  background: #4FC3F7;
  border-radius: 2px;
}

.footer-logo {
  font-size: 2rem;
  font-weight: 800;
  color: #003865;
  margin-bottom: 1rem;
  display: block;
  text-decoration: none;
}

.footer-about {
  line-height: 1.7;
  opacity: 0.8;
  margin-bottom: 1.5rem;
}

/* Social Icons */
.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: white;
  border: 1px solid #b3d9ff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #003865;
  font-size: 1.2rem;
  transition: 0.3s ease;
  text-decoration: none;
}

.social-link:hover {
  background: #4FC3F7;
  color: white;
  transform: translateY(-4px);
}

/* Links */
.footer-links {
  list-style: none;
  padding: 0;
}

.footer-links li {
  margin-bottom: 0.8rem;
}

.footer-links a {
  color: #003865;
  text-decoration: none;
  opacity: 0.8;
  transition: 0.3s ease;
}

.footer-links a:hover {
  opacity: 1;
  padding-left: 5px;
  color: #4FC3F7;
}

/* Bottom bar */
.footer-bottom {
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #b9dfff;
  color: #003865;
  opacity: 0.8;
  font-size: 0.95rem;
}
</style>
