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
import HorseList from "./components/Horse/HorseList.vue";
import RaceTrack from "./components/Race/RaceTrack.vue";
import RaceOverview from "./components/Race/RaceOverview.vue";
import { RaceState } from "./types";

const store = useStore<RaceState>();
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

<style scoped>
.layout {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 15px;
  /* Adjusted gap for consistency */
  margin-top: 25px;
  /* Slightly increased margin */
}

.left {
  border: 1px solid #ccc;
  /* Softer border color */
  padding: 15px;
  /* Increased padding */
  background: #fff8dc;
  /* Light golden background */
}

.right {
  border: 1px solid #ccc;
  padding: 15px;
  background: #f0fff0;
  /* Light mint green background */
}

h1 {
  text-align: center;
  color: #b22222;
  /* Firebrick red for title */
  font-size: 28px;
  /* Larger font size for title */
}

Button {
  margin: 12px;
  background-color: #ffd700;
  /* Gold button background */
  border: 1px solid #b8860b;
  /* Dark golden border */
  padding: 12px 25px;
  /* Adjusted padding */
  font-size: 18px;
  /* Larger font size */
  cursor: pointer;
  border-radius: 5px;
  /* Rounded corners */
}

Button:disabled {
  background-color: #dcdcdc;
  /* Light gray background for disabled buttons */
  cursor: not-allowed;
  border: 1px solid #a9a9a9;
  /* Darker gray border for disabled buttons */
}
</style>
