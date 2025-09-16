<template>
  <Table class="table" :headers="headers" :rows="placements" idKey="id" />
</template>

<script setup lang="ts">
import Table from "@shared/Table.vue";
import { Horse } from "@models/horse.model";

const headers: (keyof Horse)[] = ["id", "name"];

defineProps<{ placements: Horse[] }>();
</script>
<style scoped lang="scss">
@use "@styles/shared.scss" as *;
@use "@styles/mixins.scss" as *;

.table {
  @include table;
  height: $list-height;
  @extend .scroll-y; 
}
</style>
