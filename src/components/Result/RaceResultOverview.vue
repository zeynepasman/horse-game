<template>
  <div class="results">
    <h4>Results</h4>
    <div v-for="(result, idx) in results" :key="idx" class="round-results">
      <h4>Round {{ result.roundIndex }}</h4>
      <RaceResultList :placements="result.placements" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import RaceResultList from "./RaceResultList.vue"; 

const store = useStore();
const results = computed(() => store.getters["race/results"]);
</script>
<style scoped lang="scss">

.results {
  margin-top: 18px;
}
.round-results {
  margin-bottom: 16px;
}
</style>
