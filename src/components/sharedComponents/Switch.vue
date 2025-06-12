<script setup>
import { computed, ref } from 'vue';

const emit = defineEmits(['update:modelValue', 'change']);
const props = defineProps({
  modelValue: {
    type: Boolean,
  },
  value: {
    type: Boolean,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  bgColor: {
    type: String,
    default: 'grey',
  },
  activeBgColor: {
    type: String,
    default: 'blue',
  },
  sliderColor: {
    type: String,
    default: (props) => props.inset ? 'grey' : 'white',
  },
  activeSliderColor: {
    type: String,
    default: (props) => props.inset ? 'grey' : 'white',
  },
  size: {
    type: String,
    default: 'xl', //xs, sm, md, lg, xl
  },
  label: {
    type: String,
    default: 'label',
  },
  labelPosition: {
    type: String,
    default: 'right', //left, right
  },
  inset: {
    type: Boolean,
    default: false,
  },
});

const internalValue = ref(props.modelValue || props.value || false);
const handleSwitchChange = () => {
  if (props.readonly || props.disabled) return;
  const newValue = !internalValue.value;

  internalValue.value = newValue;
  if (props.modelValue !== undefined) {
    emit('update:modelValue', newValue);
  }
  emit('change', newValue);
};
</script>

<template>
  <label
    class="switch-container"
    :class="{ disabled: disabled, readonly: readonly, checked: internalValue, [size]: true, inset: inset }"
    @click.prevent="handleSwitchChange"
  >
    <slot name="left-label" v-if="label && labelPosition === 'left'">
      {{ label }}
    </slot>
    <input type="checkbox" :checked="internalValue" hidden :readonly="readonly" :disabled="disabled" />
    <span class="switch-slider" :style="{ '--bg-color': bgColor, '--active-bg-color': activeBgColor }">
      <span
        class="switch-slider-dot"
        :style="{ '--slider-color': sliderColor, '--active-slider-color': activeSliderColor }"
      ></span>
    </span>
    <slot name="right-label" v-if="label && labelPosition === 'right'">
      {{ label }}
    </slot>
  </label>
</template>

<style lang="scss" scoped>
.switch-container {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;

  *,
  ::before *,
  ::after * {
    box-sizing: border-box;
  }

  input {
    display: none;

    &:checked + .switch-slider {
      background-color: var(--active-bg-color);

      .switch-slider-dot {
        background-color: var(--active-slider-color);
        transform: translateX(-100%);
        margin: 0;
      }
    }
  }

  .switch-slider {
    position: relative;
    width: 4rem;
    height: 2rem;
    background-color: var(--bg-color);
    border-radius: 1rem;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    cursor: pointer;

    .switch-slider-dot {
      position: absolute;
      left: 0;
      border-radius: 50%;
      transition: all 0.3s ease;
      background-color: var(--slider-color);
      transform: translateX(0);
    }
  }

  &.inset {
    input + .switch-slider .switch-slider-dot {
      transform: translateX(-50%);
      left: 0;
      margin: 0;
    }

    input:checked + .switch-slider .switch-slider-dot {
      left: calc(100%);
      margin: 0;
    }
  }

  // Size variations
  &.xs {
    font-size: 0.75rem;
    .switch-slider {
      width: 2.5rem;
      height: 1.25rem;

      .switch-slider-dot {
        width: 1rem;
        height: 1rem;
        margin: 0 0.1875rem;
      }
    }

    input:checked + .switch-slider .switch-slider-dot {
      left: calc(100% - 0.1875rem);
    }

    &.inset {
      .switch-slider {
        width: 1.75rem;
        height: 0.75rem;
        margin-right: 0.5rem;

        .switch-slider-dot {
          width: 1rem;
          height: 1rem;
          margin: 0 0.1875rem;
          box-shadow:
            0px 2px 1px -1px rgba(0, 0, 0, 0.2),
            0px 1px 1px 0px rgba(0, 0, 0, 0.14),
            0px 1px 3px 0px rgba(0, 0, 0, 0.12);
        }
      }
    }
  }

  &.sm {
    font-size: 0.875rem;
    .switch-slider {
      width: 3rem;
      height: 1.5rem;

      .switch-slider-dot {
        width: 1.25rem;
        height: 1.25rem;
        margin: 0 0.1875rem;
      }
    }

    input:checked + .switch-slider .switch-slider-dot {
      left: calc(100% - 0.1875rem);
    }

    &.inset {
      .switch-slider {
        width: 1.875rem;
        height: 0.875rem;
        margin-right: 0.5rem;

        .switch-slider-dot {
          width: 1.125rem;
          height: 1.125rem;
          margin: 0 0.1875rem;
          box-shadow:
            0px 2px 1px -1px rgba(0, 0, 0, 0.2),
            0px 1px 1px 0px rgba(0, 0, 0, 0.14),
            0px 1px 3px 0px rgba(0, 0, 0, 0.12);
        }
      }
    }
  }

  &.md {
    font-size: 1rem;
    .switch-slider {
      width: 4rem;
      height: 2rem;

      .switch-slider-dot {
        width: 1.5rem;
        height: 1.5rem;
        margin: 0 0.25rem;
      }
    }

    input:checked + .switch-slider .switch-slider-dot {
      left: calc(100% - 0.25rem);
    }

    &.inset {
      .switch-slider {
        width: 2.25rem;
        height: 1rem;
        margin-right: 0.625rem;

        .switch-slider-dot {
          width: 1.25rem;
          height: 1.25rem;
          margin: 0 0.25rem;
          box-shadow:
            0px 2px 1px -1px rgba(0, 0, 0, 0.2),
            0px 1px 1px 0px rgba(0, 0, 0, 0.14),
            0px 1px 3px 0px rgba(0, 0, 0, 0.12);
        }
      }
    }
  }

  &.lg {
    font-size: 1.125rem;
    .switch-slider {
      width: 5rem;
      height: 2.5rem;
      border-radius: 1.25rem;

      .switch-slider-dot {
        width: 2rem;
        height: 2rem;
        margin: 0 0.375rem;
      }
    }

    input:checked + .switch-slider .switch-slider-dot {
      left: calc(100% - 0.375rem);
    }

    &.inset {
      .switch-slider {
        width: 2.5rem;
        height: 1rem;
        margin-right: 0.625rem;

        .switch-slider-dot {
          width: 1.5rem;
          height: 1.5rem;
          margin: 0 0.375rem;
          box-shadow:
            0px 2px 1px -1px rgba(0, 0, 0, 0.2),
            0px 1px 1px 0px rgba(0, 0, 0, 0.14),
            0px 1px 3px 0px rgba(0, 0, 0, 0.12);
        }
      }
    }
  }

  &.xl {
    font-size: 1.25rem;
    .switch-slider {
      width: 6rem;
      height: 3rem;
      border-radius: 1.5rem;

      .switch-slider-dot {
        width: 2.5rem;
        height: 2.5rem;
        margin: 0 0.375rem;
      }
    }

    input:checked + .switch-slider .switch-slider-dot {
      left: calc(100% - 0.375rem);
    }

    &.inset {
      .switch-slider {
        width: 3rem;
        height: 1.25rem;
        margin-right: 0.625rem;

        .switch-slider-dot {
          width: 1.75rem;
          height: 1.75rem;
          margin: 0 0.375rem;
          box-shadow:
            0px 2px 1px -1px rgba(0, 0, 0, 0.2),
            0px 1px 1px 0px rgba(0, 0, 0, 0.14),
            0px 1px 3px 0px rgba(0, 0, 0, 0.12);
        }
      }
    }
  }

  &.disabled {
    opacity: 0.6;
    pointer-events: none;
  }

  &.readonly {
    pointer-events: none;
  }
}
</style>
