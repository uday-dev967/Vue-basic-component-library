<script setup>
import SliderGroup from '@/components/sharedComponents/SliderGroup.vue';
</script>

<template>
  <div class="slider-group">
    <SliderGroup />
  </div>
</template>

<style lang="scss" scoped>
.slider-group {
  width: 90vw;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
