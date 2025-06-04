<script setup>
import { computed } from 'vue';

const props = defineProps({
  bgColor: {
    type: String,
    default: '#ddd',
  },
  color: {
    type: String,
    default: '#000',
  },
  indeterminate: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: Number,
    default: 0,
  },
  rotate: {
    type: Number,
    default: 0,
  },
  size: {
    type: Number,
    default: 100,
  },
  width: {
    type: Number,
    default: 4,
  },
  showValue: {
    type: Boolean,
    default: false,
  },
  round: {
    type: Boolean,
    default: false,
  },
});

const radius = computed(() => 50 - props.width / 2);
const circumference = computed(() => 2 * Math.PI * radius.value);

const strokeDashoffset = computed(() => {
  return circumference.value * (1 - props.modelValue / 100);
});

const valueFontSize = computed(() => `${Math.min(props.size * 0.25, 24)}px`);
</script>

<template>
  <div
    class="circular-progress"
    :style="{
      width: `${size}px`,
      height: `${size}px`,
      '--circumference': circumference + 'px',
    }"
  >
    <svg class="circular-progress-svg" :width="size" :height="size" viewBox="0 0 100 100">
      <circle
        class="circular-progress-background"
        cx="50"
        cy="50"
        fill="none"
        :r="radius"
        :stroke-width="width"
        :stroke="bgColor"
        stroke-linecap="butt"
      />
      <g
        :transform="`rotate(${rotate - 90}, 50, 50)`"
        :class="{ 'circular-progress-indeterminate-group': indeterminate }"
      >
        <circle
          class="circular-progress-circle"
          :class="{ 'circular-progress-indeterminate': indeterminate }"
          cx="50"
          cy="50"
          fill="none"
          :r="radius"
          :stroke-width="width"
          :stroke="color"
          :stroke-dasharray="`${circumference} ${circumference}`"
          :stroke-dashoffset="strokeDashoffset"
          :stroke-linecap="round ? 'round' : 'butt'"
        />
      </g>
    </svg>
    <div v-if="showValue && !indeterminate" class="circular-progress-value" :style="{ fontSize: valueFontSize }">
      {{ Math.round(modelValue) }}%
    </div>
  </div>
</template>

<style scoped lang="scss">
.circular-progress {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  .circular-progress-svg {
    display: block;
  }

  .circular-progress-background {
    fill: none;
  }

  .circular-progress-indeterminate-group {
    animation: rotate-indeterminate 0.75s linear infinite;
    transform-origin: 50% 50%;

    .circular-progress-circle {
      fill: none;
      transition: stroke-dashoffset 0.3s ease;

      &.circular-progress-indeterminate {
        stroke-linecap: round;
        animation: dash-animation 1.5s linear infinite;
      }
    }
  }

  .circular-progress-value {
    position: absolute;
    font-weight: 500;
    color: v-bind(color);
    line-height: 1;
  }
}

@keyframes dash-animation {
  0% {
    stroke-dasharray: calc(var(--circumference) * 0.95), var(--circumference);
    stroke-dashoffset: 0;
  }
  30% {
    stroke-dasharray: calc(var(--circumference) * 0.01), var(--circumference);
    stroke-dashoffset: calc(var(--circumference) * -1);
  }
  50% {
    stroke-dasharray: calc(var(--circumference) * 0.01), var(--circumference);
    stroke-dashoffset: calc(var(--circumference) * -1);
  }
  70% {
    stroke-dasharray: calc(var(--circumference) * 0.95), var(--circumference);
    stroke-dashoffset: calc(var(--circumference) * -2);
  }
  100% {
    stroke-dasharray: calc(var(--circumference) * 0.95), var(--circumference);
    stroke-dashoffset: calc(var(--circumference) * -2);
  }
}

@keyframes rotate-indeterminate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
