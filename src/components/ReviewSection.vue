<template>
  
    <div class="section-title">
      <h2>Avis de nos clients</h2>
      <div class="underline"></div>
    </div>
<section class="reviews-section">
    <div class="reviews-wrapper">
      <div 
        class="reviews-track" 
        :style="{ transform: `translateX(-${currentSlide}px)` , transition: isTransition ? 'transform 0.02s linear' : 'none' }"
        ref="track"
      >
        <div class="review-card" v-for="(review, index) in duplicatedReviews" :key="index">
          <img class="review-photo" :src="review.photo" :alt="review.author" />
          <div class="review-stars">
            <i class="bi bi-star-fill" v-for="n in review.rating" :key="n"></i>
            <i class="bi bi-star" v-for="n in (5 - review.rating)" :key="n"></i>
          </div>
          <p class="review-text">"{{ review.text }}"</p>
          <div class="review-author">{{ review.author }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ReviewsSection",
  data() {
    return {
      reviews: [
        { author: "Alicia", text: "Service impeccable !", rating: 5, photo: require('@/assets/client1.jpeg') },
        { author: "Mohamed", text: "Très satisfait !", rating: 4, photo: require('@/assets/client2.jpeg') },
        { author: "Sofia", text: "J'adore !", rating: 5, photo: require('@/assets/client3.jpeg') },
        
      ],
      currentSlide: 0,
      trackWidth: 0,
      cardWidth: 0,
      interval: null,
      isTransition: true,
    };
  },
  computed: {
    duplicatedReviews() {
      return [...this.reviews, ...this.reviews]; // duplication pour effet infini
    },
  },
  mounted() {
    this.$nextTick(() => {
      const card = this.$refs.track.querySelector(".review-card");
      const style = getComputedStyle(card);
      const gap = parseInt(style.marginRight);
      this.cardWidth = card.offsetWidth + gap;
      this.trackWidth = this.cardWidth * this.reviews.length;
      this.startAutoScroll();
    });
    window.addEventListener("resize", this.updateWidth);
  },
  beforeUnmount() {
    clearInterval(this.interval);
    window.removeEventListener("resize", this.updateWidth);
  },
  methods: {
    startAutoScroll() {
      this.interval = setInterval(() => {
        this.currentSlide += 1; // glissement continu
        if (this.currentSlide >= this.trackWidth) {
          this.isTransition = false;  // désactive transition pour reset
          this.currentSlide = 0;
          this.$nextTick(() => this.isTransition = true); // réactive transition
        }
      }, 16); 
    },
    updateWidth() {
      const card = this.$refs.track.querySelector(".review-card");
      const style = getComputedStyle(card);
      const gap = parseInt(style.marginRight);
      this.cardWidth = card.offsetWidth + gap;
      this.trackWidth = this.cardWidth * this.reviews.length;
    },
  },
};
</script>

<style scoped>
.reviews-section {
  padding: 5rem 5%;
 /* background-color: #87CEFA;*/
  border-radius: 15px;
}

.section-title {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title h2 {
  font-size: 3rem;
  color: #1E90FF;
  font-weight: bold;
}

.section-title .underline {
  width: 150px;
  height: 4px;
  background: #00BFFF;
  margin: 0.5rem auto;
  border-radius: 2px;
  margin-top: 15px;
}

/*.reviews-wrapper {
  overflow: hidden;
}*/

.reviews-track {
  display: flex;
  gap: 16px;
}

.review-card {
  flex: 0 0 300px;
  background: white;
  border-radius: 12px;
  padding: 2rem 1rem;
  box-shadow: 0 5px 20px rgba(0,0,0,0.1);
  text-align: center;
  position: relative;
}

.review-photo {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
  border: 2px solid #1E90FF;
}

.review-stars {
  color: #FFD700;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.review-text {
  font-size: 1rem;
  color: #333;
  margin-bottom: 1.5rem;
}

.review-author {
  background-color: #1E90FF;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  display: inline-block;
  box-shadow: 0 3px 6px rgba(0,0,0,0.1);
}
</style>
