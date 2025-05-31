<template>
  <div class="basic-chip" :class="{ 'with-close': closable }">
    <div v-if="$slots.prepend" class="chip-prepend">
      <slot name="prepend" v-bind:chip="chip"></slot>
    </div>
    
    <div class="chip-content">
      <slot v-bind:chip>{{ displayText }}</slot>
    </div>

    <div v-if="$slots.append" class="chip-append">
      <slot name="append" v-bind:chip></slot>
    </div>

    <slot name="close" v-bind:chip>
      <button
        v-if="closable"
        class="chip-close"
        @click="$emit('onDeleteChip', chipValue)"
        aria-label="Remove chip"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </slot>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  chip: {
    type: [Object, String],
    required: true
  },
  textKey: {
    type: String,
    default: 'text'
  },
  valueKey: {
    type: String,
    default: 'value'
  },
  closable: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['onDeleteChip'])

const displayText = computed(() => {
  if (typeof props.chip === 'string') {
    return props.chip
  }
  return props.chip[props.textKey] || ''
})

const chipValue = computed(() => {
  if (typeof props.chip === 'string') {
    return props.chip
  }
  return props.chip[props.valueKey] || props.chip
})
</script>

<style scoped>
.basic-chip {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  background-color: #e0e0e0;
  border-radius: 16px;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: rgba(0, 0, 0, 0.87);
  transition: background-color 0.2s ease;
}

.basic-chip:hover {
  background-color: #d5d5d5;
}

.chip-prepend {
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
}

.chip-content {
  display: flex;
  align-items: center;
}

.chip-append {
  margin-left: 0.5rem;
  display: flex;
  align-items: center;
}

.chip-close {
  margin-left: 0.5rem;
  padding: 0.25rem;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(0, 0, 0, 0.54);
  border-radius: 50%;
  transition: background-color 0.2s ease;
}

.chip-close:hover {
  background-color: rgba(0, 0, 0, 0.08);
}

.with-close {
  padding-right: 0.5rem;
}
</style> 