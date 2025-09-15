<template>
 <Table :headers="['id', 'name']" :rows="horses" idKey="id" />
</template>

<script setup lang="ts">
import { Horse } from "@/types";
import Table from "@/shared/Table.vue";
defineProps<{ horses: Horse[] }>();
</script>

<style scoped lang="scss">
</style>
