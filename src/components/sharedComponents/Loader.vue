<script setup>
const props = defineProps({
  size: {
    type: Number,
    default: 40,
  },
  width: {
    type: Number,
    default: 4,
  },
  bgColor: {
    type: String,
    default: 'rgba(255, 255, 255, 0.75)',
  },
  fillColor: {
    type: String,
    default: '#000',
  },
  emptyColor: {
    type: String,
    default: '#e0e0e0',
  },
  isLocalLoader: {
    type: Boolean,
    default: true,
  },
  src: {
    type: String,
    default: '',
  },
});
</script>

<template>
  <div
    class="loader-wrapper"
    :class="{ 'local-loader': isLocalLoader }"
    :style="{
      backgroundColor: bgColor,
      '--loader-fill-color': fillColor,
      '--loader-empty-color': emptyColor,
    }"
  >
    <slot>
      <img
        v-if="src"
        :src="src"
        alt="loader"
        class="custom-loader-img"
        :style="{
          width: size + 'px',
          height: size + 'px',
        }"
      />
      <svg v-else class="indeterminate-loader" :width="size" :height="size" viewBox="25 25 50 50">
        <circle class="track" cx="50" cy="50" r="20" fill="none" :stroke-width="width" />
        <circle class="arc" cx="50" cy="50" r="20" fill="none" :stroke-width="width" stroke-linecap="round" />
      </svg>
    </slot>
  </div>
</template>

<style scoped lang="scss">
*,
*::after,
*::before {
  box-sizing: border-box;
}

.loader-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: all;
  user-select: none;
  cursor: default;
  --loader-fill-color: #000;
  --loader-empty-color: #e0e0e0;

  &.local-loader {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .indeterminate-loader {
    animation: rotate 2s linear infinite;

    .track {
      stroke: var(--loader-empty-color);
    }

    .arc {
      stroke: var(--loader-fill-color);
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
      animation: dash 1.5s ease-in-out infinite;
    }
  }

  .custom-loader-img {
    display: block;
  }
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
}
</style>
