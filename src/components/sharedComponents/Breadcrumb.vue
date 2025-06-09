<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
  items: {
    type: Array,
    default: () => [
      {
        label: 'Home',
        to: '/test-page',
        disabled: false,
      },
      {
        label: 'Dashboard',
        to: '/dashboard',
        disabled: true,
      },
    ],
  },
  separator: {
    type: String,
    default: '/',
  },
  gap: {
    type: String,
    default: '0.5rem',
  },
});

const handleClick = (item) => {
  if (!item.disabled && item.to) {
    router.push(item.to);
  }
};
</script>

<template>
  <div class="breadcrumb-container" :style="{ gap: gap }">
    <div v-for="(item, index) in items" :key="index" class="breadcrumb-item" :style="{ gap: gap }">
      <span class="label" :class="{ disabled: item.disabled }" @click="handleClick(item)">
        {{ item.label }}
      </span>
      <slot v-if="index < items.length - 1" name="separator">
        <span class="breadcrumb-separator">{{ separator }}</span>
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.breadcrumb-container {
  display: flex;
  align-items: center;
  width: 100%;

  .breadcrumb-item {
    display: flex;
    align-items: center;

    .label {
      cursor: pointer;
      transition: color 0.3s ease;
      font-size: 0.875rem;
      font-weight: 500;
      user-select: none;

      &.disabled {
        cursor: default;
        color: #888;
        opacity: 0.8;
        pointer-events: none;
      }

      &:not(.disabled):hover {
        color: #000;
      }
    }

    .breadcrumb-separator {
      margin: 0 0.25rem;
      color: #999;
    }
  }
}
</style>
