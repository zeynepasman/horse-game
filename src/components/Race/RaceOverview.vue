<template>
    <div class="content">
      <div class="program-list">
        <ProgramList :rounds="rounds" />
      </div>
      <div class="result-table">
        <RaceResultOverview />
      </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import { Round } from "../../types/models/race.model";

import ProgramList from "../Program/ProgramList.vue";
import RaceResultOverview from "../Result/RaceResultOverview.vue";
const store = useStore();
const rounds = computed<Round[]>(() => store.getters["race/allRounds"] as Round[]);
</script>

<style scoped lang="scss">
@use "../../shared/shared.scss" as *;

h3 {
  text-align: center;
  font-size: 20px;
  margin-bottom: 12px;
  color: #333; /* Darker color for better readability */
}

.content {
  display: flex;      /* side-by-side alignment */
  gap: 20px;          /* Increased spacing between sections */
  padding: 16px;      /* Added padding around the content */
  background-color: #f9f9f9; /* Light background for contrast */
  border: 1px solid #ddd; /* Subtle border for structure */
  border-radius: 8px; /* Rounded corners for a polished look */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
}

.program-list,
.result-table {
  flex: 1;            /* Equal width */
  min-width: 0;       /* Prevent overflow */
  padding: 12px;      /* Added padding inside sections */
  background-color: #fff; /* White background for clarity */
  border: 1px solid #ccc; /* Border for separation */
  border-radius: 6px; /* Rounded corners */
}
</style>
