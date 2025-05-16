<script setup>
import { computed, ref, toRefs } from 'vue';

const emit = defineEmits(['update:modelValue', 'change']);

const props = defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
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
    default: '',
  },
  modelValue: {
    type: Array,
    required: false,
    default: () => [],
  },
  selected: {
    type: Array,
    required: false,
    default: () => [],
  },
  valueComparator: {
    type: Function,
    default: (a, b) => Array.isArray(a) && a.includes(b),
  },
  innerTickColor: {
    type: String,
    default: '#fff',
  },
  backgroundColor: {
    type: String,
    default: '#000',
  },
  labelColor: {
    type: String,
    default: '#000',
  },
  allItems: {
    type: Array,
    default: () => [],
  },
  valueKey: {
    type: String,
    default: '',
  },
});

const { disabled, readonly, modelValue, selected, valueComparator, value: inputValue } = toRefs(props);

const internalValue = computed(() => {
  let val = modelValue.value?.length ? modelValue.value : selected.value;
  return Array.isArray(val) ? val : [];
});

// Determine if this radio should be selected
const isChecked = computed(() => {
  if (!internalValue.value?.length) return false;
  if (inputValue.value === 'selectAll') {
    // Check if all items from allItems are present in internalValue
    if (internalValue.value?.length !== props.allItems?.length) return false;
    return props.allItems.every((item) => {
      const itemValue = props.valueKey ? item[props.valueKey] : item;
      return internalValue.value.includes(itemValue);
    });
  }
  return valueComparator.value(internalValue.value, inputValue.value);
});

// Handle click
function handleClick(event) {
  // Skip if disabled or readonly
  if (disabled.value || readonly.value) return;

  const isSelected = isChecked.value;
  const currentValues = Array.isArray(internalValue.value) ? internalValue.value : [];

  let newValue;
  if (inputValue.value === 'selectAll') {
    // If selectAll is clicked and not all items are selected, select all
    // Otherwise, empty the array
    if (currentValues.length < props.allItems.length) {
      if (props.valueKey) {
        newValue = props.allItems.map((item) => item[props.valueKey]);
      } else {
        newValue = [...props.allItems];
      }
    } else {
      newValue = [];
    }
  } else {
    // Normal checkbox behavior
    if (isSelected) {
      newValue = currentValues.filter((v) => v !== inputValue.value);
    } else {
      newValue = [...currentValues, inputValue.value];
    }
  }
  console.log(newValue, inputValue.value);
  emit('update:modelValue', newValue);
  emit('change', newValue, inputValue.value, event);
}
</script>

<template>
  <label class="checkbox-container" :class="[size, { disabled, readonly }]" :style="{ color: labelColor }">
    <input hidden type="checkbox" :value="inputValue" :checked="isChecked" :disabled="disabled" @click="handleClick" />
    <slot name="icon" :props="{ isChecked }">
      <div
        class="checkbox"
        :style="{
          borderColor: backgroundColor,
          '--background-checked-color': backgroundColor,
        }"
      >
        <div class="inner-tick" :style="{ borderColor: innerTickColor }"></div>
      </div>
    </slot>
    <slot name="label" :props="{ isChecked }">{{ label }}</slot>
  </label>
</template>

<style lang="scss" scoped>
.checkbox-container {
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
  color: #000;
  position: relative;

  input {
    display: none;

    &:checked + .checkbox {
      background-color: var(--background-checked-color, #000) !important;
      .inner-tick {
        visibility: visible;
        opacity: 1;
      }
    }
  }

  &.disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  &.readonly {
    pointer-events: none;
  }

  .checkbox {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0.0625rem solid;
    border-radius: 0.125rem;
    background-color: transparent;
    .inner-tick {
      border-bottom-right-radius: 0.0625rem;
      width: 33%;
      height: 80%;
      border-bottom: 0.125rem solid;
      border-right: 0.125rem solid;
      transform: rotate(45deg);
      visibility: hidden;
      opacity: 0;
    }

    &:hover {
      background-color: var(--background-checked-color, #000) !important;
    }

    &:active {
      opacity: 0.7;
    }
  }
  // Sizes
  &.xs {
    font-size: 0.625rem;
    .checkbox {
      width: 0.75rem;
      height: 0.75rem;
    }
  }
  &.sm {
    font-size: 0.75rem;
    .checkbox {
      width: 0.875rem;
      height: 0.875rem;
    }
  }
  &.md {
    font-size: 0.875rem;
    .checkbox {
      width: 1rem;
      height: 1rem;
    }
  }
  &.lg {
    font-size: 1rem;
    .checkbox {
      width: 1.125rem;
      height: 1.125rem;
    }
  }
  &.xl {
    font-size: 1.125rem;
    .checkbox {
      width: 1.25rem;
      height: 1.25rem;
    }
  }
}
</style>
