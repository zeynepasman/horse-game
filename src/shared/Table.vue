<template>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th v-for="header in headers" :key="header">{{ header.toUpperCase() }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in rows" :key="row[idKey]">
          <td v-for="header in headers" :key="header">{{ row[header] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  headers: string[];
  rows: Record<string, any>[];
  idKey?: string;
}>();

const idKey = props.idKey ?? "id";
</script>

<style scoped>
.table-container {
  margin: 20px 0;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background: #f5f5f5;
  text-align: left;
}
</style>
