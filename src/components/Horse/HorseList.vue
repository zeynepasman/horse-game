<template>
  <div>
    <h3>All Horses ({{ horses.length }})</h3>
    <div class="grid">
      <Table
        :headers="['id', 'name', 'condition', 'color']"
        :rows="horses"
        idKey="id"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { Horse } from "../../types/models/horse.model";
import Table from "../../shared/Table.vue";
const store = useStore();

onMounted(() => {
  if (!store.getters["horses/allHorses"]?.length) {
    store.dispatch("horses/initHorses");
  }
});

const horses = computed<Horse[]>(
  () => store.getters["horses/allHorses"] as Horse[]
);
</script>

<style scoped></style>
