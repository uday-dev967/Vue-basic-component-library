<script setup>
import slider from '@/components/sharedComponents/slider.vue';

const handleChange = (value) => {
  console.log(value);
};
</script>

<template>
  <div class="basic-slider">
    <slider @change="handleChange"></slider>
  </div>
</template>

<style lang="scss" scoped>
.basic-slider {
  max-width: 800px;
  height: 100vh;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
