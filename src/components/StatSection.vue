<template>
 
    <div class="section-title">
      <h2>Notre impact en chiffres</h2>
      <div class="underline"></div>
    </div>
 <section class="stats-section" ref="statsSection">
    <div class="stats-container">
      <div class="stat-box" v-for="(stat, index) in stats" :key="index">
        <div class="stat-number">{{ stat.current }}</div>
        <div class="stat-label">{{ stat.label }}</div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "StatsSection",
  data() {
    return {
      stats: [
        { label: "Clients satisfaits", target: 1250, current: 0 },
        { label: "Créations uniques", target: 340, current: 0 },
        { label: "Récompenses", target: 28, current: 0 },
        { label: "Ans d'expertise", target: 15, current: 0 },
      ],
      speed: 200,
    };
  },
  mounted() {
    this.setupCounters();
  },
  methods: {
    animateCounter(stat) {
      const increment = stat.target / this.speed;
      if (stat.current < stat.target) {
        stat.current = Math.ceil(stat.current + increment);
        setTimeout(() => this.animateCounter(stat), 50);
      } else {
        stat.current = stat.target;
      }
    },
    setupCounters() {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            this.stats.forEach((stat) => this.animateCounter(stat));
            observer.unobserve(this.$refs.statsSection);
          }
        },
        { threshold: 0.5 }
      );

      observer.observe(this.$refs.statsSection);
    },
  },
};
</script>

<style scoped>
.stats-section {
  background-color: #87CEFA; /* bleu clair */
  padding: 5rem 5%;
  margin: 6rem 0;
  position: relative;
  border-radius: 15px;
}

.section-title {
  margin-top: 50px;
  text-align: center;
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
}

.stats-container {
  display: flex;
  justify-content: space-around;
  max-width: 1200px;
  margin: 0 auto;
  flex-wrap: wrap;
}

.stat-box {
  text-align: center;
  padding: 1rem 2rem;
  margin-bottom: 2rem;
}

.stat-number {
  font-size: 3.5rem;
  font-weight: 700;
  color: white; /* nombres en blanc pour bien ressortir */
  margin-bottom: 0.5rem;
  font-family: 'Playfair Display', serif;
}

.stat-label {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.85); /* légèrement transparent */
}
</style>
