<template>
  <div>
    <h3>All Horses ({{ horses.length }})</h3>
    <div class="grid">
      <Table
        :headers="['id', 'name', 'condition', 'color']"
        :rows="horses"
        idKey="id"
      ></Table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { Horse } from "@models/horse.model";
import Table from "@shared/Table.vue";
import { RootState } from "@store/index";
const store = useStore<RootState>();

onMounted(() => {
  if (!store.getters["horse/allHorses"]?.length) {
    store.dispatch("horse/initHorses");
  }
});

const horses = computed<Horse[]>(
  () => store.getters["horse/allHorses"] as Horse[]
);
</script>

<style scoped></style>
