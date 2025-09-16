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
  <h3 class="round-info">Round {{ currentRound + 1 }}</h3>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import { Horse } from "@models/horse.model";
import { RootState } from "@store/index";

const store = useStore<RootState>();
const horses = computed<Horse[]>(() => store.getters["race/raceHorses"]);
const currentRound = computed<number>(() => store.state.race.currentRound); 
</script>

<style scoped lang="scss">
@use "@styles/mixins.scss" as *;
@use "@styles/variables.scss" as *;
@use "@styles/shared.scss" as *;

.track {
  position: relative;
  width: 100%;
  height: $panel-height;
  @include dashed-border($primary);
  background: $light-bg;
}

.round-info {
  @extend .text-center;
  font-weight: bold;
  color: $dark;
  @extend .mb-3;
}

.lane {
  position: relative;
  height: 9%;
  @include dashed-border-bottom($primary);
}

.horse {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  transition: left 0.1s linear;
  @extend .p-2;
  @extend .border-radius-md;
  @include border($dark);
}

.track::after {
  content: "FINISH LINE";
  position: absolute;
  right: $spacing-md;
  bottom: $spacing-md;
  color: $danger;
}
</style>
