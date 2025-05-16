<script setup>
import Radio from '@/components/sharedComponents/Radio.vue';
import { ref } from 'vue';

const selectedValue = ref([]);
const handleChange = (data) => {
  selectedValue.value = data;
};
</script>

<template>
  <div class="radio-demo">
    <!-- readonly,disabled -->
    <Radio size="lg" :toggle="true" :multiple="true" label="Test a" value="test_a" v-model="selectedValue"> </Radio>
    <Radio
      size="lg"
      :toggle="true"
      :multiple="true"
      label="Test b"
      value="test_b"
      :selected="selectedValue"
      @change="handleChange"
    >
    </Radio>
  </div>
</template>

<style lang="scss" scoped>
.radio-demo {
  max-width: 800px;
  height: 100vh;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
</style>
