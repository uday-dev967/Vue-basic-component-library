<script setup>
import BasicInput from './BasicInput.vue';
</script>

<template>
  <div class="file-input-container">
    <BasicInput />
  </div>
</template>

<style lang="scss" scoped>
.file-input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 31.25rem;
  margin: auto;
}
</style>
