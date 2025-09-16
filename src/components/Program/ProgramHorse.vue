<template>
  <Table
    class="table"
    :headers="['id', 'name']"
    :rows="horses"
    idKey="id"
  ></Table>
</template>

<script setup lang="ts">
import Table from "@shared/Table.vue";
import { Horse } from "@models/horse.model";
defineProps<{ horses: Horse[] }>();
</script>

<style scoped lang="scss">
@use "@styles/shared.scss" as *;
@use "@styles/mixins.scss" as *;
.table {
  @include table;
  height: $list-height;
}
</style>
