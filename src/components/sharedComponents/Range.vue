<script setup>
import { ref, computed, watch, onBeforeUnmount } from 'vue';

const emit = defineEmits(['update:modelValue', 'change']);

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [0, 0],
  },
  value: {
    type: Array,
    default: () => [0, 0],
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
    default: '',
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
const currentValues = ref(
  props.modelValue?.[0] === 0 && props.modelValue?.[1] === 0
    ? [props.value[0], props.value[1]]
    : [props.modelValue[0], props.modelValue[1]]
);
const isDragging = ref(false);
const isFocused = ref(false);
const activeThumb = ref(null); // 'min' or 'max'

watch([() => props.modelValue, () => props.value], ([modelVal, val]) => {
  currentValues.value = modelVal?.[0] === 0 && modelVal?.[1] === 0 ? [val[0], val[1]] : [modelVal[0], modelVal[1]];
});

function roundToStep(value, step) {
  const stepStr = step.toString();
  const decimals = stepStr.includes('.') ? stepStr.split('.')[1].length : 0;
  const multiplier = Math.pow(10, decimals);
  return Math.round(value * multiplier) / multiplier;
}

const fillPercent = computed(() => {
  const minPercent = ((currentValues.value[0] - props.min) / (props.max - props.min)) * 100;
  const maxPercent = ((currentValues.value[1] - props.min) / (props.max - props.min)) * 100;
  return {
    min: Math.min(100, Math.max(0, minPercent)),
    max: Math.min(100, Math.max(0, maxPercent)),
  };
});

const displayValues = computed(() => {
  const stepStr = props.step.toString();
  const decimalPlaces = stepStr.includes('.') ? stepStr.split('.')[1].length : 0;
  return currentValues.value.map((value) => value.toFixed(decimalPlaces));
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

  if (activeThumb.value === 'min') {
    if (steppedValue > currentValues.value[1]) return;
    if (steppedValue === currentValues.value[0]) return;
    currentValues.value[0] = steppedValue;
  } else {
    if (steppedValue < currentValues.value[0]) return;
    if (steppedValue === currentValues.value[1]) return;
    currentValues.value[1] = steppedValue;
  }

  emit('update:modelValue', [...currentValues.value]);
  emit('change', [...currentValues.value]);
};

const handleMouseMove = (e) => updateValueFromPosition(e.clientX);
const handleTouchMove = (e) => updateValueFromPosition(e.touches[0].clientX);

const stopDrag = () => {
  isDragging.value = false;
  activeThumb.value = null;
  window.removeEventListener('mousemove', handleMouseMove);
  window.removeEventListener('touchmove', handleTouchMove);
  window.removeEventListener('mouseup', stopDrag);
  window.removeEventListener('touchend', stopDrag);
};

const startDrag = (e, thumb) => {
  if (props.disabled || props.readonly) return;
  isDragging.value = true;
  activeThumb.value = thumb;

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

  const isMinThumb = document.activeElement === track.value;
  const isMaxThumb = document.activeElement === track.value;

  if (!isMinThumb && !isMaxThumb) return;

  const thumb = isMinThumb ? 'min' : 'max';
  const index = thumb === 'min' ? 0 : 1;
  let newValue = currentValues.value[index];

  if (e.key === 'ArrowRight') {
    newValue = Math.min(props.max, currentValues.value[index] + props.step);
  } else if (e.key === 'ArrowLeft') {
    newValue = Math.max(props.min, currentValues.value[index] - props.step);
  } else {
    return;
  }

  if (thumb === 'min' && newValue > currentValues.value[1]) return;
  if (thumb === 'max' && newValue < currentValues.value[0]) return;

  const steppedValue = roundToStep(newValue, props.step);
  if (steppedValue !== currentValues.value[index]) {
    currentValues.value[index] = steppedValue;
    emit('update:modelValue', [...currentValues.value]);
    emit('change', [...currentValues.value]);
  }

  e.preventDefault();
};

const handleTrackClick = (e) => {
  if (props.disabled || props.readonly) return;

  const rect = track.value.getBoundingClientRect();
  const clickX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
  const percent = (clickX - rect.left) / rect.width;
  const clickedValue = props.min + percent * (props.max - props.min);
  const steppedValue = roundToStep(Math.round(clickedValue / props.step) * props.step, props.step);

  const midpoint = (currentValues.value[0] + currentValues.value[1]) / 2;

  if (steppedValue <= midpoint) {
    if (steppedValue !== currentValues.value[0]) {
      currentValues.value[0] = steppedValue;
      emit('update:modelValue', [...currentValues.value]);
      emit('change', [...currentValues.value]);
    }
  } else {
    if (steppedValue !== currentValues.value[1]) {
      currentValues.value[1] = steppedValue;
      emit('update:modelValue', [...currentValues.value]);
      emit('change', [...currentValues.value]);
    }
  }
};

onBeforeUnmount(() => stopDrag());
</script>

<template>
  <div class="basic-slider-input-wrapper" :class="{ 'has-label': label }">
    <slot name="label">
      <label :class="labelClasses" class="slider-label">{{ label }}</label>
    </slot>
    <div
      class="slider-track"
      ref="track"
      tabindex="0"
      @mousedown="handleTrackClick"
      @touchstart.prevent="handleTrackClick"
      @keydown="onKeydown"
      :class="{ disabled, readonly }"
      :style="{ '--track-color': trackColor }"
      role="slider"
      :aria-valuemin="min"
      :aria-valuemax="max"
      :aria-valuenow="currentValues[0]"
      :aria-disabled="disabled"
      :aria-readonly="readonly"
      @focus="isFocused = true"
      @blur="isFocused = false"
    >
      <div
        class="slider-filled"
        :style="{
          left: fillPercent.min + '%',
          width: fillPercent.max - fillPercent.min + '%',
          backgroundColor: color,
        }"
      />
      <div
        class="slider-thumb min-thumb"
        :style="{ left: fillPercent.min + '%', backgroundColor: thumbColor }"
        @mousedown.stop.prevent="startDrag($event, 'min')"
        @touchstart.stop.prevent="startDrag($event, 'min')"
      />
      <div
        class="slider-thumb max-thumb"
        :style="{ left: fillPercent.max + '%', backgroundColor: thumbColor }"
        @mousedown.stop.prevent="startDrag($event, 'max')"
        @touchstart.stop.prevent="startDrag($event, 'max')"
      />
      <div v-show="showThumbLabel" class="thumb-label min-label" :style="{ left: fillPercent.min + '%' }">
        {{ displayValues[0] }}
      </div>
      <div v-show="showThumbLabel" class="thumb-label max-label" :style="{ left: fillPercent.max + '%' }">
        {{ displayValues[1] }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.basic-slider-input-wrapper {
  width: 100%;
  display: grid;
  grid-template-columns: max-content 1fr;
  align-items: center;

  &.has-label {
    gap: 1rem;
  }

  .slider-label {
    font-size: 1rem;
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
      border-radius: 0.25rem;
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
      transform: translateX(-50%);
      background: #333;
      color: white;
      font-size: 0.75rem;
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      white-space: nowrap;
      bottom: 0;
      margin-bottom: 1rem;

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
