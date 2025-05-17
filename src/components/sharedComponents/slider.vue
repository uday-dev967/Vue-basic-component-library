<script setup>
import { ref, computed, watch, onBeforeUnmount } from 'vue';

const emit = defineEmits(['update:modelValue', 'change']);

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
  value: {
    type: Number,
    default: 0,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  step: {
    type: Number,
    default: 0.1,
  },
  color: {
    type: String,
    default: 'black',
  },
  thumbColor: {
    type: String,
    default: 'black',
  },
  trackColor: {
    type: String,
    default: 'grey',
  },
  label: {
    type: String,
    default: 'asdf',
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  thumbLabel: {
    type: [String, Boolean],
    default: false,
    validator: (value) => ['always', true, false].includes(value),
  },
  thumbLabelClasses: {
    type: Array,
    default: () => [],
  },
  labelClasses: {
    type: Array,
    default: () => [],
  },
});

const track = ref(null);
const currentValue = ref(props.modelValue ?? props.value);
const isDragging = ref(false);
const isFocused = ref(false);
watch([() => props.modelValue, () => props.value], ([modelVal, val]) => {
  currentValue.value = modelVal ?? val;
});

function roundToStep(value, step) {
  const stepStr = step.toString();
  const decimals = stepStr.includes('.') ? stepStr.split('.')[1].length : 0;
  const multiplier = Math.pow(10, decimals);
  return Math.round(value * multiplier) / multiplier;
}

const fillPercent = computed(() => {
  const percent = ((currentValue.value - props.min) / (props.max - props.min)) * 100;
  return Math.min(100, Math.max(0, percent));
});

const displayValue = computed(() => {
  const stepStr = props.step.toString();
  const decimalPlaces = stepStr.includes('.') ? stepStr.split('.')[1].length : 0;
  return currentValue.value.toFixed(decimalPlaces);
});

const showThumbLabel = computed(() => {
  if (props.thumbLabel === 'always') return true;
  if (props.thumbLabel === true) return isDragging.value || isFocused.value;
  return false;
});

const updateValueFromPosition = (clientX) => {
  if (!track.value) return;
  const rect = track.value.getBoundingClientRect();
  let percent = (clientX - rect.left) / rect.width;
  percent = Math.max(0, Math.min(1, percent));
  let rawValue = props.min + percent * (props.max - props.min);
  const steppedValue = roundToStep(Math.round(rawValue / props.step) * props.step, props.step);
  if (steppedValue == currentValue.value) return;
  currentValue.value = steppedValue;
  emit('update:modelValue', steppedValue);
  emit('change', steppedValue);
};

const handleMouseMove = (e) => updateValueFromPosition(e.clientX);
const handleTouchMove = (e) => updateValueFromPosition(e.touches[0].clientX);

const stopDrag = () => {
  isDragging.value = false;
  window.removeEventListener('mousemove', handleMouseMove);
  window.removeEventListener('touchmove', handleTouchMove);
  window.removeEventListener('mouseup', stopDrag);
  window.removeEventListener('touchend', stopDrag);
};

const startDrag = (e) => {
  if (props.disabled || props.readonly) return;
  isDragging.value = true;

  if (e.type === 'mousedown') {
    updateValueFromPosition(e.clientX);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', stopDrag);
  } else if (e.type === 'touchstart') {
    updateValueFromPosition(e.touches[0].clientX);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', stopDrag);
  }
};

const onKeydown = (e) => {
  if (props.disabled || props.readonly) return;

  let newValue = currentValue.value;
  if (e.key === 'ArrowRight') {
    newValue = Math.min(props.max, currentValue.value + props.step);
  } else if (e.key === 'ArrowLeft') {
    newValue = Math.max(props.min, currentValue.value - props.step);
  } else {
    return;
  }

  const steppedValue = roundToStep(newValue, props.step);
  if (steppedValue !== currentValue.value) {
    currentValue.value = steppedValue;
    emit('update:modelValue', steppedValue);
    emit('change', steppedValue);
  }

  e.preventDefault(); // prevent scrolling
};

onBeforeUnmount(() => stopDrag());
</script>

<template>
  <div class="basic-slider-input-wrapper">
    <slot name="label">
      <label v-if="label" :class="labelClasses" class="slider-label">{{ label }}</label>
    </slot>
    <div
      class="slider-track"
      ref="track"
      tabindex="0"
      @mousedown="startDrag"
      @touchstart.prevent="startDrag"
      @keydown="onKeydown"
      :class="{ disabled, readonly }"
      :style="{ '--track-color': trackColor }"
      role="slider"
      :aria-valuemin="min"
      :aria-valuemax="max"
      :aria-valuenow="currentValue"
      :aria-disabled="disabled"
      :aria-readonly="readonly"
      @focus="isFocused = true"
      @blur="isFocused = false"
    >
      <div class="slider-filled" :style="{ width: fillPercent + '%', backgroundColor: color }" />
      <div
        class="slider-thumb"
        :style="{ left: fillPercent + '%', backgroundColor: thumbColor }"
        @mousedown.stop.prevent="startDrag"
        @touchstart.stop.prevent="startDrag"
      />
      <div v-show="showThumbLabel" class="thumb-label" :style="{ left: fillPercent + '%' }">
        {{ currentValue === 0 || currentValue === 100 ? currentValue : displayValue }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.basic-slider-input-wrapper {
  gap: 0.5rem;
  width: 100%;
  display: grid;
  grid-template-columns: max-content 1fr;
  align-items: center;

  .slider-label {
    font-size: 1rem;
    margin-right: 0.5rem;
  }

  .slider-track {
    position: relative;
    height: 0.375rem;
    background-color: var(--track-color, grey);
    border-radius: 0.25rem;
    cursor: pointer;
    user-select: none;
    outline: none;

    &:focus-visible {
      box-shadow: 0 0 0 0.25rem rgba(0, 0, 0, 0.1);
    }

    &.disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    &.readonly {
      pointer-events: none;
    }

    .slider-filled {
      position: absolute;
      height: 100%;
      border-radius: 0.25rem 0 0 0.25rem;
    }

    .slider-thumb {
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      cursor: grab;
      z-index: 2;
    }

    .thumb-label {
      position: absolute;
      top: -2.25rem;
      transform: translateX(-50%);
      background: #333;
      color: white;
      font-size: 0.75rem;
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      white-space: nowrap;

      &::before {
        content: '';
        position: absolute;
        left: calc(50% - 0.25rem);
        top: 100%;
        width: 0.5rem;
        height: 0.5rem;
        background: #333;
        transform: rotate(45deg) translate(-50%, -50%);
      }
    }
  }
}
</style>
