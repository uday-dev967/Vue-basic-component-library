<script setup>
import DropdownWithTabIndex from '@/components/tasks/DropdownWithTabIndex.vue';
import BasicChip from '../components/sharedComponents/BasicChip.vue';

const handleDelete = () => {
  console.log('handleDelete');
};
</script>

<template>
  <div class="home-page-wrapper">
    <DropdownWithTabIndex />
    <div class="chip-container">

      <BasicChip 
        chip="Simple Chip"
        :closable="true"
        @onDeleteChip="handleDelete"
      >
        <template #prepend>
          u
        </template>
        <template #append="chip">{{ chip }}</template>
      </BasicChip>
      <BasicChip 
        :chip="{ id: 1, text: 'User Chip', value: 'user-1' }"
        textKey="text"
        valueKey="value"
        :closable="true"
        @onDeleteChip="handleDelete"
      >
        <template #append="chip">{{ chip }}</template>
        <template #close>del</template>
      </BasicChip>
    </div>
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
