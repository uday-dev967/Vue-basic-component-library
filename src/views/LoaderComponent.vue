<script setup>
import Loader from '@/components/sharedComponents/Loader.vue';
</script>

<template>
  <div class="loader-component">
    <Loader />
  </div>
</template>

<style lang="scss" scoped>
.loader-component {
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
