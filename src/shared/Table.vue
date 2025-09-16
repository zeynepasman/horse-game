<template>
  <div class="table-container scrollable">
    <table class="table">
      <thead>
        <tr>
          <th v-for="header in headers" :key="header">{{ header.toUpperCase() }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in rows" :key="index">
          <td v-for="header in headers" :key="header">{{ row[header] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { TableProps } from "@models/table-model";
import { Horse } from "@models/horse.model";

defineProps<TableProps<Horse>>();
</script>

<style scoped lang="scss">
@use "@styles/shared.scss" as *;
@use "@styles/variables.scss" as *;

.table-container {
  @extend .mb-3;
  @extend .scroll-y; 
  @extend .border; 
}

.table {
  @extend .border;
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  @extend .p-2;
  @extend .border;
}

th {
  background: $light;
  @extend .text-left;
}
</style>
