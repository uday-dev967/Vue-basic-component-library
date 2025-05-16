<script setup>
import { computed, ref, toRefs } from 'vue';

const emit = defineEmits(['update:modelValue', 'change']);

const props = defineProps({
  size: {
    type: String,
    default: 'sm', // xs, sm, md, lg, xl
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  toggle: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: '',
  },
  value: {
    type: [String, Number, Boolean],
    required: true,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: [String, Number, Boolean, Array],
    required: false,
    default: (props) => (props.multiple ? [] : ''),
    validator: (value, props) => {
      if (props.multiple) {
        return Array.isArray(value);
      }
      return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean';
    },
  },
  selected: {
    type: [String, Number, Boolean, Array],
    required: false,
    default: (props) => (props.multiple ? [] : ''),
    validator: (value, props) => {
      if (props.multiple) {
        return Array.isArray(value);
      }
      return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean';
    },
  },
  valueComparator: {
    type: Function,
    default: (a, b, multiple) => {
      if (multiple) return Array.isArray(a) && a.includes(b);
      return a === b;
    },
  },
  color: {
    type: String,
    default: 'green',
  },
  labelColor: {
    type: String,
    default: '#000',
  },
});

const {
  size,
  disabled,
  readonly,
  label,
  modelValue,
  selected,
  valueComparator,
  multiple,
  value: inputValue,
  toggle,
} = toRefs(props);

const internalValue = computed(() => {
  let val = modelValue.value || selected.value;
  if (multiple.value) {
    val = modelValue.value?.length ? modelValue.value : selected.value;
  }
  return multiple.value ? (Array.isArray(val) ? val : []) : val || '';
});

// Determine if this radio should be selected
const isChecked = computed(() => {
  if (internalValue.value === '' && inputValue.value === '') return false;
  return valueComparator.value(internalValue.value, inputValue.value, multiple.value);
});

// Handle click
function handleClick(event) {
  // Skip if disabled or readonly
  if (disabled.value || readonly.value) return;

  // Handle multiple selection mode
  if (multiple.value) {
    const isSelected = isChecked.value;
    const currentValues = Array.isArray(internalValue.value) ? internalValue.value : [];

    let newValue;
    if (isSelected) {
      // Only allow removing all options if toggle is true
      if (toggle.value || currentValues.length > 1) {
        newValue = currentValues.filter((v) => v !== inputValue.value);
      } else {
        // Keep the current value if it's the only one and toggle is false
        newValue = currentValues;
      }
    } else {
      newValue = [...currentValues, inputValue.value];
    }

    emit('update:modelValue', newValue);
    emit('change', newValue, inputValue.value, event);
  }
  // Handle single selection mode
  else {
    const isSelected = isChecked.value;
    const newValue = toggle.value && isSelected ? '' : inputValue.value;
    emit('update:modelValue', newValue);
    emit('change', newValue, inputValue.value, event);
    console.log(newValue);
  }
}
</script>

<template>
  <label class="radio-container" :class="[size, { disabled, readonly }]" :style="{ color: labelColor }">
    <input hidden type="radio" :value="inputValue" :checked="isChecked" :disabled="disabled" @click="handleClick" />
    <slot name="icon" :props="{ isChecked }">
      <div class="radio" :style="{ borderColor: color }">
        <div class="inner-circle" :style="{ backgroundColor: color }"></div>
      </div>
    </slot>
    <slot name="label" :props="{ isChecked }">{{ label }}</slot>
  </label>
</template>

<style scoped lang="scss">
.radio-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
  color: #000;
  position: relative;

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  input {
    display: none;

    &:checked + .radio .inner-circle {
      transform: translate(-50%, -50%) scale(1);
    }
  }

  &.disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  &.readonly {
    pointer-events: none;
  }

  .radio {
    position: relative;
    display: inline-block;
    border: 0.0625rem solid;
    border-radius: 50%;

    .inner-circle {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 60%;
      height: 60%;
      border-radius: 50%;
      transform: translate(-50%, -50%) scale(0);
      transition: transform 0.2s ease-in-out;
    }

    &:hover .inner-circle {
      transform: translate(-50%, -50%) scale(1);
    }

    &:active {
      opacity: 0.7;
    }
  }

  // Sizes
  &.xs {
    font-size: 0.625rem;
    .radio {
      width: 0.75rem;
      height: 0.75rem;
    }
  }
  &.sm {
    font-size: 0.75rem;
    .radio {
      width: 0.875rem;
      height: 0.875rem;
    }
  }
  &.md {
    font-size: 0.875rem;
    .radio {
      width: 1rem;
      height: 1rem;
    }
  }
  &.lg {
    font-size: 1rem;
    .radio {
      width: 1.125rem;
      height: 1.125rem;
    }
  }
  &.xl {
    font-size: 1.125rem;
    .radio {
      width: 1.25rem;
      height: 1.25rem;
    }
  }
}
</style>
