<template>
  <div>
    <h1>Horse Racing Game</h1>
    <Button @click="generateProgram" :disabled="simulationInProgress"
      >Generate Program</Button
    >
    <Button @click="startSimulation" :disabled="simulationInProgress">
      Start
    </Button>

    <div class="layout">
      <!-- Left: All Horses -->
      <div class="left">
        <HorseList />
      </div>

      <!-- Middle: Race Track -->
      <div class="middle">
        <RaceTrack />
      </div>

      <!-- Right: Program -->
      <div class="right">
        <RaceOverview />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted, ref } from "vue";
import { useStore } from "vuex";
import HorseList from "@components/Horse/HorseList.vue";
import RaceTrack from "@components/Race/RaceTrack.vue";
import RaceOverview from "@components/Race/RaceOverview.vue";
import Button from "@shared/Button.vue"; // Added import for Button
import { RootState } from "@store/index";

const store = useStore<RootState>();
const currentRoundIndex = ref<number>(0);
const simulationInProgress = ref<boolean>(false);
let intervalId: ReturnType<typeof setInterval> | null = null;

function startSimulation(): void {
  store.commit("race/clearResults");
  if (simulationInProgress.value) {
    console.warn("Simulation already in progress. Ignoring duplicate call.");
    return;
  }

  const rounds = store.getters["race/allRounds"];
  if (!rounds || rounds.length === 0) {
    return;
  }
  if (currentRoundIndex.value >= rounds.length) {
    currentRoundIndex.value = 0;
  }

  simulationInProgress.value = true;
  runCurrentRound();
}

function runCurrentRound(): void {
  const rounds = store.getters["race/allRounds"];
  if (currentRoundIndex.value >= rounds.length) {
    stopSimulation();
    return;
  }
  store.dispatch("race/startRound", currentRoundIndex.value);

  intervalId = setInterval(() => {
    store.dispatch("race/simulateRace");

    if (!store.getters["race/raceInProgress"]) {
      clearInterval(intervalId!);
      intervalId = null;

      currentRoundIndex.value++;
      runCurrentRound();
    }
  }, 100);
}

function stopSimulation(): void {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
  simulationInProgress.value = false;
}

onUnmounted((): void => {
  stopSimulation();
});

const generateProgram = (): void => {
  store.dispatch("race/startProgram");
  store.commit("race/clearResults");
  currentRoundIndex.value = 0;
};
</script>

<style scoped lang="scss">
@use "@styles/shared.scss" as *;
@use "@styles/variables.scss" as *;
@use "@styles/mixins.scss" as *;
.layout {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: $spacing-lg;
  @extend .mt-4;
}

.left {
  @include border($border-color);
  @extend .p-4;
  @extend .scroll-y;
  height: $panel-height;
}

.right {
  @include border($border-color);
  @extend .p-4;
  @extend .scroll-y;
  height: $panel-height;
}

h1 {
  @extend .text-center;
  color: $title-color;
  @extend .fs-6;
}

button {
  @include button-base;
}

button:disabled {
  @include button-disabled;
}
</style>
