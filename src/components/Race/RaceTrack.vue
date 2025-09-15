<template>
  <div class="track">
    <div v-for="horse in horses" :key="horse.id" class="lane">
      <div
        class="horse"
        :style="{
          left: horse.progress + '%',
          background: horse.color,
        }"
      >
        {{ horse.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import { Horse } from "../../types/models/horse.model";

const store = useStore();
const horses = computed<Horse[]>(() => store.getters["race/raceHorses"]);
</script>

<style scoped>
.track {
  position: relative;
  width: 100%;
  height: 400px;
  border: 3px dashed #ff4500; /* Dashed orange border for race track */
  background: #f5f5f5; /* Slightly darker gray background */
  position: relative;
}

.lane {
  position: relative;
  height: 10%;
  border-bottom: 1px dashed #87ceeb; /* Sky blue dashed line */
}

.lane:last-child {
  border-bottom: none; /* Remove border for the last lane */
}

.horse {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  transition: left 0.1s linear;
  padding: 4px 8px; /* Adjusted padding */
  border-radius: 6px; /* Slightly more rounded */
  font-size: 20px; /* Larger font size */
  background: #ffebcd; /* Blanched almond background */
  border: 1px solid #cd853f; /* Peru border */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Subtle shadow for horses */
}

.track::after {
  content: "FINISH LINE";
  position: absolute;
  right: 15px;
  bottom: 15px;
  font-size: 20px; /* Slightly larger font */
  font-weight: bold;
  color: #ff4500; /* Orange text for finish line */
}
</style>
