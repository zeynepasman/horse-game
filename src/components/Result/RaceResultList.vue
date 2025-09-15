<template>
  <div>
    <Table :headers="headers" :rows="placements" idKey="id" />
  </div>
</template>

<script setup lang="ts">
import { Horse } from '@/types';
import Table from  '@/shared/Table.vue';
const headers = ["id", "name"];

defineProps<{
  placements: Horse[];
}>();
</script>
