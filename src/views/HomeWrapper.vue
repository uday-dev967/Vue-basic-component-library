<script setup>
import DropdownWithTabIndex from '@/components/tasks/DropdownWithTabIndex.vue';
import VerticleAppBar from '@/components/sharedComponents/VerticleAppBar.vue';
import { ref } from 'vue';

const showAppBar = ref(true);
const activeItem = ref('settings');
</script>

<template>
  <div class="home-page-wrapper">
    <VerticleAppBar v-model="showAppBar" :active-item="activeItem" @update:active-item="activeItem = $event" />
    <button @click="showAppBar = !showAppBar" class="toggle-btn">{{ showAppBar ? 'Hide' : 'Show' }} App Bar</button>

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
