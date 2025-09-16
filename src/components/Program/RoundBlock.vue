<template>
  <div class="round-block">
    <h4>Round {{ round.roundIndex }} — {{ round.distance }}m</h4>
    <ProgramHorse :horses="round.horses" />
  </div>
</template>

<script setup lang="ts">
import { Round } from "@models/race.model";
import ProgramHorse from "@components/Program/ProgramHorse.vue";

defineProps<{ round: Round }>();
</script>

<style scoped lang="scss">
@use "@styles/shared.scss" as *;

.round-block {
  @extend .mb-3;
}
</style>
