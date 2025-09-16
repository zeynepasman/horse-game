<template>
  <div>
    <h4>Program</h4>
    <div v-for="round in rounds" :key="round.roundIndex">
      <RoundBlock :round="round" />
    </div>
  </div>
</template>

<script setup lang="ts">
import RoundBlock from "@components/Program/RoundBlock.vue";
import { Round } from "@models/race.model";
defineProps<{ rounds: Round[] }>();
</script>

<style scoped lang="scss">
@use "@styles/variables.scss" as *;
</style>
