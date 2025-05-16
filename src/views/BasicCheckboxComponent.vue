<script setup>
import { ref } from 'vue';
import Checkbox from '@/components/sharedComponents/Checkbox.vue';

const selectedItems = ref([]);

const allItems = ref([
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
]);

function handleChange(value, inputValue, event) {
  console.log(value, inputValue, event);
  selectedItems.value = value;
}
</script>

<template>
  <div class="basic-checkbox-wrapper">
    <!-- Basic v-model usage -->
    <div class="checkbox-group">
      <h3>Basic Checkboxes</h3>
      <Checkbox
        v-model="selectedItems"
        size="sm"
        value="selectAll"
        label="Select All"
        :allItems="allItems"
        valueKey="id"
        innerTickColor="red"
        backgroundColor="green"
        labelColor="blue"
      />
      <Checkbox
        :selected="selectedItems"
        size="md"
        value="selectAll"
        label="Select All"
        :allItems="allItems"
        valueKey="id"
        @change="handleChange"
        innerTickColor="white"
        backgroundColor="blue"
        labelColor="teal"
      />
      <Checkbox
        size="lg"
        :selected="selectedItems"
        :value="allItems[0].id"
        label="Item 1"
        @change="handleChange"
        innerTickColor="teal"
        backgroundColor="red"
        labelColor="green"
      />
      <Checkbox
        size="xl"
        v-model="selectedItems"
        :value="allItems[1].id"
        label="Item 2"
        innerTickColor="red"
        backgroundColor="pink"
        labelColor="teal"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.basic-checkbox-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  min-height: 100vh;
  width: 100%;

  .checkbox-group {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    border: 1px solid #eee;
    border-radius: 0.5rem;

    h3 {
      margin: 0 0 1rem 0;
    }
  }
}
</style>
