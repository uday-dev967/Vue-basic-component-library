<script setup>
import { computed } from 'vue';

const props = defineProps({
  absolute: {
    type: Boolean,
    default: false,
  },
  bgColor: {
    type: String,
    default: '#e0e0e0',
  },
  color: {
    type: String,
    default: '#000',
  },
  height: {
    type: Number,
    default: 4,
  },
  indeterminate: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  rounded: {
    type: Boolean,
    default: false,
  },
});

const percentage = computed(() => Math.min(100, Math.max(0, (props.modelValue / props.max) * 100)));
</script>

<template>
  <div
    class="linear-progress-container"
    :class="{
      absolute,
      rounded,
      indeterminate,
    }"
    :style="{
      height: `${height}px`,
      backgroundColor: bgColor,
    }"
  >
    <div
      class="linear-progress-bar"
      :class="{ 'indeterminate-bar': indeterminate }"
      :style="{
        width: indeterminate ? '40%' : percentage + '%',
        backgroundColor: color,
      }"
    />
  </div>
</template>

<style scoped lang="scss">
.linear-progress-container {
  width: 100%;
  position: relative;
  overflow: hidden;

  &.absolute {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
  }

  &.rounded {
    border-radius: 6.25rem;

    .linear-progress-bar {
      border-radius: 6.25rem;
    }
  }

  .linear-progress-bar {
    height: 100%;
    transition: width 0.3s ease;

    &.indeterminate-bar {
      position: absolute;
      left: -40%;
      animation: linear-indeterminate 1.2s infinite ease-in-out;
    }
  }

  &.indeterminate .linear-progress-bar {
    transition: none;
  }
}

@keyframes linear-indeterminate {
  0% {
    left: -40%;
    width: 40%;
  }
  50% {
    left: 20%;
    width: 60%;
  }
  100% {
    left: 100%;
    width: 80%;
  }
}
</style>
