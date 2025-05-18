<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
  size: {
    type: Number,
    default: 40,
  },
  width: {
    type: Number,
    default: 4,
  },
  color: {
    type: String,
    default: '#000',
  },
  bgColor: {
    type: String,
    default: 'grey',
  },
  indeterminate: {
    type: Boolean,
    default: false,
  },
  rotate: {
    type: Number,
    default: 0,
  },
});

const circumference = computed(() => {
  const radius = (props.size - props.width) / 2;
  return 2 * Math.PI * radius;
});

const strokeDashoffset = computed(() => {
  if (props.indeterminate) return 0;
  const progress = props.modelValue / 100;
  return circumference.value * (1 - progress);
});
</script>

<template>
  <div
    class="loader-wrapper"
    :style="{
      width: `${size}px`,
      height: `${size}px`,
    }"
  >
    <svg
      class="loader"
      :class="{ indeterminate: indeterminate }"
      :style="{
        transform: `rotate(${rotate}deg)`,
      }"
      viewBox="0 0 100 100"
    >
      <circle
        class="loader-background"
        cx="50"
        cy="50"
        :r="(size - width) / 2"
        :stroke-width="width"
        :style="{
          stroke: bgColor,
        }"
      />
      <circle
        class="loader-progress"
        cx="50"
        cy="50"
        :r="(size - width) / 2"
        :stroke-width="width"
        :style="{
          stroke: color,
          strokeDasharray: circumference,
          strokeDashoffset: strokeDashoffset,
        }"
      />
    </svg>
  </div>
</template>

<style lang="scss" scoped>
.loader-wrapper {
  position: relative;
  display: inline-block;
}

.loader {
  width: 100%;
  height: 100%;
  transform-origin: center;
  animation: rotate 2s linear infinite;

  &.indeterminate {
    .loader-progress {
      animation: dash 1.5s ease-in-out infinite;
    }
  }
}

.loader-background {
  fill: none;
  opacity: 0.2;
}

.loader-progress {
  fill: none;
  stroke-linecap: round;
  transition: stroke-dashoffset 0.3s ease;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}
</style>
