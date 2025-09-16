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
import RaceResultList from "@components/Result/RaceResultList.vue";
import { RaceResult } from "@models/race.model";
import { RootState } from "@store/index";

const store = useStore<RootState>();
const results = computed(() => store.getters["race/results"] as RaceResult[]);
</script>
<style scoped lang="scss">
@use "@styles/shared.scss" as *;
@use "@styles/variables.scss" as *;
.results {
  @extend .mt-4;
}
.round-results {
  @extend .mb-4;
}
</style>
