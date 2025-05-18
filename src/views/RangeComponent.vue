<script setup>
import Range from '@/components/sharedComponents/Range.vue';
import { ref } from 'vue';

const range1 = ref([20, 80]);
const range2 = ref([0, 50]);
const range3 = ref([30, 60]);
const range4 = ref([10, 90]);
const range5 = ref([25, 75]);

const handleChange = (value) => {
  console.log('Range value changed:', value);
};
</script>

<template>
  <div class="range-component">
    <h1>Range Component Examples</h1>

    <div class="example-section">
      <h2>Basic Range</h2>
      <Range v-model="range1" label="Basic Range" @change="handleChange" />
      <div class="value-display">Current values: {{ range1 }}</div>
    </div>

    <div class="example-section">
      <h2>Custom Colors</h2>
      <Range
        v-model="range2"
        label="Custom Colors"
        color="#4CAF50"
        thumbColor="#2196F3"
        trackColor="#E0E0E0"
        @change="handleChange"
      />
      <div class="value-display">Current values: {{ range2 }}</div>
    </div>

    <div class="example-section">
      <h2>Different Step Size</h2>
      <Range v-model="range3" label="Step Size: 5" :step="5" :min="0" :max="100" @change="handleChange" />
      <div class="value-display">Current values: {{ range3 }}</div>
    </div>

    <div class="example-section">
      <h2>Always Show Labels</h2>
      <Range v-model="range4" label="Always Show Labels" thumbLabel="always" @change="handleChange" />
      <div class="value-display">Current values: {{ range4 }}</div>
    </div>

    <div class="example-section">
      <h2>Disabled State</h2>
      <Range v-model="range5" label="Disabled Range" :disabled="true" @change="handleChange" />
      <div class="value-display">Current values: {{ range5 }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.range-component {
  max-width: 800px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 2rem;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h1 {
    color: #333;
    margin-bottom: 1rem;
  }

  .example-section {
    width: 100%;
    padding: 1.5rem;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

    h2 {
      color: #666;
      font-size: 1.2rem;
      margin-bottom: 1rem;
    }

    .value-display {
      margin-top: 0.5rem;
      font-size: 0.9rem;
      color: #666;
    }
  }
}
</style>
