<template>
  <div class="cosmic-bg" aria-hidden="true">
    <!-- Stars -->
    <div class="star star-1" />
    <div class="star star-2" />
    <div class="star star-3" />
    <div class="star star-4" />
    <div class="star star-5" />
    <div class="star star-6" />
    <div class="star star-7" />
    <div class="star star-8" />
    <div class="star star-9" />
    <div class="star star-10" />
    <div class="star star-11" />
    <div class="star star-12" />
    <div class="star star-13" />
    <div class="star star-14" />
    <div class="star star-15" />
    <div class="star star-16" />
    <div class="star star-17" />
    <div class="star star-18" />
    <div class="star star-19" />
    <div class="star star-20" />

    <!-- Nebula blurs -->
    <div class="nebula nebula-purple" />
    <div class="nebula nebula-blue" />

    <!-- Hero beam -->
    <div class="beam" />
    <div class="beam-glow" />

    <!-- Grid overlay -->
    <div class="grid-overlay" />
  </div>
</template>

<style scoped>
.cosmic-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.grid-overlay {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(58, 130, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(58, 130, 255, 0.03) 1px, transparent 1px);
  background-size: 80px 80px;
  mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent);
}

.beam {
  position: absolute;
  top: -5%;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 60%;
  background: linear-gradient(to bottom, rgba(139, 92, 246, 0.6), rgba(58, 130, 255, 0.1), transparent);
}

.beam-glow {
  position: absolute;
  top: -5%;
  left: 50%;
  transform: translateX(-50%);
  width: 400px;
  height: 50%;
  background: radial-gradient(ellipse at 50% 0%, rgba(139, 92, 246, 0.08), rgba(58, 130, 255, 0.04) 40%, transparent 70%);
}

.star {
  position: absolute;
  border-radius: 9999px;
  background: #E2E8F0;
  animation: twinkle var(--dur, 3s) ease-in-out infinite alternate;
  animation-delay: var(--del, 0s);
}

.nebula {
  position: absolute;
  border-radius: 9999px;
  filter: blur(100px);
}

.nebula-purple {
  width: 700px;
  height: 500px;
  background: #8B5CF6;
  opacity: 0.035;
  top: -5%;
  left: -15%;
}

.nebula-blue {
  width: 600px;
  height: 600px;
  background: #3A82FF;
  opacity: 0.03;
  bottom: 5%;
  right: -15%;
}

.star-1  { width: 2px; height: 2px; top: 6%;  left: 14%;  --dur: 3.2s; --del: 0s; }
.star-2  { width: 1px; height: 1px; top: 9%;  left: 42%;  --dur: 4.1s; --del: 0.8s; }
.star-3  { width: 2px; height: 2px; top: 14%; left: 76%;  --dur: 3.6s; --del: 0.3s; }
.star-4  { width: 1px; height: 1px; top: 18%; left: 28%;  --dur: 5.2s; --del: 1.5s; }
.star-5  { width: 3px; height: 3px; top: 22%; left: 90%;  --dur: 2.8s; --del: 0.2s; }
.star-6  { width: 1px; height: 1px; top: 30%; left: 58%;  --dur: 4.5s; --del: 1.2s; }
.star-7  { width: 2px; height: 2px; top: 35%; left: 6%;   --dur: 3.4s; --del: 0.6s; }
.star-8  { width: 1px; height: 1px; top: 40%; left: 35%;  --dur: 5.0s; --del: 2.0s; }
.star-9  { width: 2px; height: 2px; top: 44%; left: 68%;  --dur: 3.8s; --del: 0.15s; }
.star-10 { width: 1px; height: 1px; top: 50%; left: 82%;  --dur: 4.3s; --del: 1.0s; }
.star-11 { width: 2px; height: 2px; top: 55%; left: 20%;  --dur: 3.1s; --del: 0.45s; }
.star-12 { width: 1px; height: 1px; top: 60%; left: 50%;  --dur: 4.8s; --del: 1.7s; }
.star-13 { width: 3px; height: 3px; top: 64%; left: 74%;  --dur: 2.9s; --del: 0.1s; }
.star-14 { width: 1px; height: 1px; top: 70%; left: 32%;  --dur: 5.3s; --del: 2.2s; }
.star-15 { width: 2px; height: 2px; top: 75%; left: 93%;  --dur: 3.5s; --del: 0.35s; }
.star-16 { width: 1px; height: 1px; top: 78%; left: 8%;   --dur: 4.6s; --del: 1.4s; }
.star-17 { width: 2px; height: 2px; top: 82%; left: 44%;  --dur: 3.3s; --del: 0.7s; }
.star-18 { width: 1px; height: 1px; top: 86%; left: 62%;  --dur: 5.1s; --del: 2.1s; }
.star-19 { width: 2px; height: 2px; top: 90%; left: 16%;  --dur: 3.7s; --del: 0.25s; }
.star-20 { width: 1px; height: 1px; top: 94%; left: 85%;  --dur: 4.4s; --del: 1.6s; }

@keyframes twinkle {
  0% { opacity: 0.15; transform: scale(1); }
  100% { opacity: 0.9; transform: scale(1.4); }
}

@media (prefers-reduced-motion: reduce) {
  .star { animation: none; opacity: 0.4; }
}
</style>
