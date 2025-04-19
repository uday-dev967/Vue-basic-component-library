<script setup>
import DropdownWithTabIndex from '@/components/tasks/DropdownWithTabIndex.vue';
</script>

<template>
  <div class="home-page-wrapper">
    <DropdownWithTabIndex />
  </div>
</template>

<style scoped lang="scss">
.home-page-wrapper {
  height: 100%;
  width: 100%;
  display: grid;
  overflow: hidden;
  place-content: center;
  background-color: $background-14;
}
</style>
