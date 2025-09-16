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
import { Round } from "@models/race.model";

import ProgramList from "@components/Program/ProgramList.vue";
import RaceResultOverview from "@components/Result/RaceResultOverview.vue";
import { RootState } from "@store/index";
const store = useStore<RootState>();
const rounds = computed<Round[]>(
  () => store.getters["race/allRounds"] as Round[]
);
</script>

<style scoped lang="scss">
@use "@styles/variables.scss" as *;
@use "@styles/shared.scss" as *;
@use "@styles/mixins.scss" as *;

h3 {
  @extend .text-center;
  @extend .fs-2;
  @extend .mb-2;
  color: $dark;
}

.content {
  display: flex;
  gap: $spacing-sm;
  @extend .p-3;
  background-color: $light-bg;
  @extend .border-radius-md;
}

.program-list,
.result-table {
  flex: 1;
  min-width: 0; 
  @extend .p-3;
  background-color: $light-bg;
  @extend .border;
  @extend .border-radius-md;
}
</style>
