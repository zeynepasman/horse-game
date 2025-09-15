<template>
  <button class="shared-btn" :type="type" @click="$emit('click')">
      <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
defineProps<{
  type?: "button" | "submit" | "reset";
}>();
</script>

<style scoped lang="scss">
@use "./shared.scss" as *;
.shared-btn {
  @include btn;
}
</style>
