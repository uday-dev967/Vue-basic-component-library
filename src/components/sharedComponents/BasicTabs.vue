<script setup>
import { toRefs } from "vue";
const props = defineProps({
  tabItems: {
    type: Array,
    required: false,
    default: () => [],
  },
  selected: {
    type: [Array, String],
    required: false,
    default: null,
  },
  multiple: {
    type: Boolean,
    required: false,
    default: false,
  },
  isLabeli18String: {
    type: Boolean,
    required: false,
    default: true,
  },
});

const { tabItems, selected, multiple } = toRefs(props);
const emit = defineEmits(["item:clicked"]);

function handleTabItemClick(item) {
  emit("item:clicked", item);
}
</script>

<template>
  <div class="basic-tabs-wrapper">
    <div class="overflow-container">
      <div
        v-for="item of tabItems"
        :key="item.value"
        class="tab"
        :class="{
          selected: multiple
            ? selected.includes(item.value)
            : selected === item.value,
        }"
        @click="handleTabItemClick(item)"
      >
        <slot name="tab-icon" :item="item">
          <template v-if="isLabeli18String && item.name">
            {{ $t(item.name) }}
          </template>
          <template v-else-if="item.name">
            {{ item.name }}
          </template>
          <div class="icon" v-else-if="item.icon" v-html="item.icon"></div>
        </slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.basic-tabs-wrapper {
  display: flex;
  position: relative;
  overflow-x: hidden;
  width: 100%;

  .overflow-container {
    display: flex;
    align-items: center;
    justify-content: start;
    overflow-x: auto;
    gap: 0.5rem;

    &:has(.icon) {
      width: max-content;
      gap: 0rem;
      border-radius: 0.25rem;
    }
  }

  .tab {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 0.75rem;
    border-radius: 0.25rem;
    border: 0.0625rem solid black;
    background: white;
    color: black;
    font-size: 0.8125rem;
    font-weight: 500;
    min-width: 3.375rem;
    height: 2rem;
    transition: all 0.3s ease;
    text-transform: capitalize;

    &:hover,
    &.selected {
      color: white;
      border-color: black;
      background: white;
    }

    &:has(.icon) {
      padding: 0 0.5rem;
      border: none;
      border-radius: 0;
      min-width: unset;

      .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 1.25rem;
        height: 1.25rem;
      }
    }
  }
}
</style>
