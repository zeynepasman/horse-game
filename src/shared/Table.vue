<template>
  <div class="table-responsive">
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
@use "@styles/mixins.scss" as *;
@use "@styles/variables.scss" as *;
.table-responsive {
  display: block;
  width: 100%;
  max-width: 100%;
  overflow-x: auto; /* Enable horizontal scrolling for small screens */
  -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
  @include border($border-color);
  @extend .scroll-y;
}

.table {
  @include table;
}
</style>
