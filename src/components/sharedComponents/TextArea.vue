<script setup>
import BasicInput from './BasicInput.vue'; // Import the basic input component
// Import necessary Vue features
import { ref, useAttrs, onMounted, watch, nextTick, computed } from 'vue';

// Define emitted events for the component
const emit = defineEmits([
  'prepend:click', // Event emitted when the prepend button is clicked
  'prependInner:click', // Event emitted when the inner prepend button is clicked
  'clear:click', // Event emitted when the clear button is clicked
  'append:click', // Event emitted when the append button is clicked
  'appendInner:click', // Event emitted when the inner append button is clicked
  'update:modelValue', // Event for v-model binding
  'validate', // Event emitted for validation results
  // Form events
  'focus', // Event emitted on input focus
  'blur', // Event emitted on input blur
  'input', // Event emitted on input change
  'change', // Event emitted on input change
  // Keyboard events
  'keydown', // Event emitted on key down
  'keyup', // Event emitted on key up
  'keypress', // Event emitted on key press
  // Mouse events
  'click', // Event emitted on mouse click
  'dblclick', // Event emitted on double click
  'mousedown', // Event emitted on mouse down
  'mouseup', // Event emitted on mouse up
  'mouseenter', // Event emitted on mouse enter
  'mouseleave', // Event emitted on mouse leave
  // Clipboard events
  'copy', // Event emitted on copy action
  'cut', // Event emitted on cut action
  'paste', // Event emitted on paste action
  // Composition events for languages with complex input
  'compositionstart', // Event emitted when composition starts
  'compositionupdate', // Event emitted during composition
  'compositionend', // Event emitted when composition ends
  // Drag events
  'dragenter', // Event emitted when dragging enters the component
  'dragover', // Event emitted when dragging over the component
  'dragleave', // Event emitted when dragging leaves the component
  'drop', // Event emitted when an item is dropped
]);

// Define component props
const props = defineProps({
  rows: { type: Number, required: false, default: 3 },
  noResize: { type: Boolean, required: false },
  autoGrow: { type: Boolean, required: false, default: false },
  maxlength: { type: Number, required: false },
  minRows: { type: Number, required: false, default: 1 },
  counter: { type: Boolean, required: false, default: false },
});

// Use attributes passed to the component
const attrs = useAttrs();

const textareaRef = ref(null);

function autoResize() {
  if (props.autoGrow && textareaRef.value) {
    textareaRef.value.style.height = 'auto';
    textareaRef.value.style.height = textareaRef.value.scrollHeight + 'px';
  }
}
</script>

<template>
  <BasicInput
    class="default-text-area-wrapper"
    v-bind="attrs"
    @input="$emit('input', $event)"
    @change="$emit('change', $event)"
    @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)"
    @keydown="$emit('keydown', $event)"
    @click="$emit('click', $event)"
    @dblclick="$emit('dblclick', $event)"
    @mousedown="$emit('mousedown', $event)"
    @mouseup="$emit('mouseup', $event)"
    @mouseenter="$emit('mouseenter', $event)"
    @mouseleave="$emit('mouseleave', $event)"
    @keyup="$emit('keyup', $event)"
    @keypress="$emit('keypress', $event)"
    @copy="$emit('copy', $event)"
    @cut="$emit('cut', $event)"
    @paste="$emit('paste', $event)"
    @compositionstart="$emit('compositionstart', $event)"
    @compositionupdate="$emit('compositionupdate', $event)"
    @compositionend="$emit('compositionend', $event)"
    @dragenter="$emit('dragenter', $event)"
    @dragover="$emit('dragover', $event)"
    @dragleave="$emit('dragleave', $event)"
    @drop="$emit('drop', $event)"
  >
    <!-- Forward all other slots -->
    <template v-for="(_, slotName) in $slots" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps" />
    </template>

    <template
      #input-field="{ props: { internalType, readonly, disabled, placeholder, attrs, internalValue, triggerEvent } }"
    >
      <textarea
        ref="textareaRef"
        class="text-area-field"
        :class="{ 'no-resize': noResize }"
        name=""
        id=""
        :type="internalType"
        :readonly="readonly"
        :disabled="disabled"
        :placeholder="placeholder"
        :rows="rows || minRows"
        :maxlength="maxlength"
        v-bind="attrs"
        :value="internalValue"
        @input="
          (e) => {
            triggerEvent('input', e);
            autoResize();
          }
        "
        @change="triggerEvent('change', $event)"
        @focus="triggerEvent('focus', $event)"
        @blur="triggerEvent('blur', $event)"
        @keydown="triggerEvent('keydown', $event)"
        @click="triggerEvent('click', $event)"
        @dblclick="triggerEvent('dblclick', $event)"
        @mousedown="triggerEvent('mousedown', $event)"
        @mouseup="triggerEvent('mouseup', $event)"
        @mouseenter="triggerEvent('mouseenter', $event)"
        @mouseleave="triggerEvent('mouseleave', $event)"
        @keyup="triggerEvent('keyup', $event)"
        @keypress="triggerEvent('keypress', $event)"
        @copy="triggerEvent('copy', $event)"
        @cut="triggerEvent('cut', $event)"
        @paste="triggerEvent('paste', $event)"
        @compositionstart="triggerEvent('compositionstart', $event)"
        @compositionupdate="triggerEvent('compositionupdate', $event)"
        @compositionend="triggerEvent('compositionend', $event)"
        @dragenter="triggerEvent('dragenter', $event)"
        @dragover="triggerEvent('dragover', $event)"
        @dragleave="triggerEvent('dragleave', $event)"
        @drop="triggerEvent('drop', $event)"
      ></textarea>
    </template>

    <template
      #details-right-content="{ props: { internalValue, hint, error, errorMessage, persistentDetails, focused } }"
    >
      <span v-show="counter" class="char-counter" :class="{ persistentDetails, focused }">
        {{ internalValue?.length }}
        <template v-if="maxlength"> / {{ maxlength }} </template>
      </span>
    </template>
  </BasicInput>
</template>

<style lang="scss" scoped>
.default-text-area-wrapper {
  //   height: 100%;
  textarea {
    position: relative; /* Relative positioning */
    z-index: 1; /* Layering */
    background: transparent; /* Transparent background */
    margin: 0.875rem 0 0 0; /* No margin */
    border: none; /* No border */
    outline: 0; /* No outline */
    padding: 0 0; /* Padding */
    width: 100%; /* Full width */
    resize: vertical; /* Allow vertical resizing */
    min-height: 1.5rem;

    &::-webkit-scrollbar {
      width: initial;
      height: initial;
    }

    &::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    &::-webkit-scrollbar-thumb {
      background: #888;
      cursor: default;
      &:hover {
        background: #555;
      }
    }

    &.no-resize {
      resize: none; /* Only disable resize if noResize is true */
    }

    &:focus {
      outline: none; /* No outline on focus */
    }
  }
  .char-counter {
    opacity: 0; /* Hidden by default */
    visibility: hidden; /* Hidden by default */
    font-size: 0.75rem; /* Font size */
    min-height: 0.875rem; /* Minimum height */
    min-width: 0.0625rem; /* Minimum width */
    position: relative; /* Relative positioning */
    transform: translateY(-100%); /* Move up */
    transition: all 0.2s ease-in-out; /* Smooth transition */

    &.focused,
    &.persistentDetails {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
  }
}
</style>

<style lang="scss">
.default-text-area-wrapper {
  &.basic-input-wrapper {
    grid-template-areas:
      'prepend control append'
      'a messages b'; /* Define grid areas */
    align-items: initial;

    &.readonly {
      textarea {
        pointer-events: none;
      }
    }

    /* Prepend button styles */
    .prepend-wrapper {
      margin-top: 0.75rem;
    }

    /* Input wrapper styles */
    .input-wrapper {
      align-items: initial;
      grid-template-areas: 'prepend-inner field clear append-inner'; /* Define grid areas */

      .prepend-inner-wrapper {
        margin-top: 0.625rem;
      }

      /* Input field wrapper styles */
      .input-field-wrapper {
        align-items: initial;
        overflow: hidden;
        /* Label styles */
        .label {
          height: 2.625rem;

          &.has-inner-prepend {
            &.floating {
              animation: float-diagonal 0.2s ease forwards; /* Animation for floating */
            }
            &.un-floating {
              animation: reverse-float-diagonal 0.2s ease forwards; /* Animation for un-floating */
              height: 2.625rem; /* Full height */
              top: 1.375rem; /* End vertical position */
            }
          }

          /* Keyframes for floating animation */
          @keyframes float-diagonal {
            0% {
              left: calc(0.625rem + 0.375rem + 1.5rem); /* Start position */
              top: 2.125rem; /* End vertical position */
            }
            100% {
              left: 0.625rem; /* End position */
              top: 0; /* End vertical position */
            }
          }

          @keyframes reverse-float-diagonal {
            0% {
              left: calc(0.625rem + 0.375rem); /* Start position */
              top: 0%; /* Start vertical position */
            }
            100% {
              left: calc(0.625rem + 0.375rem + 1.5rem); /* End position */
              top: 1.375rem; /* End vertical position */
            }
          }
        }

        /* Input field styles */
        &:has(.label) {
          .text-area-field {
            &:not(:focus) {
              &::placeholder {
                visibility: hidden;
              }
            }
          }
        }

        /* Clear button styles */
        &:has(.clear-wrapper) {
          textarea:focus {
            visibility: visible;
            width: calc(100% - 2rem); /* Adjust width when focused */
          }
        }

        /* Clear button wrapper styles */
        .clear-wrapper {
          margin-top: 0.625rem;
        }

        /* Show clear button when focused */
        &:focus-within {
          &:has(.has-value) {
            textarea {
              width: calc(100% - 2rem); /* Adjust width when focused */
            }
            .clear-wrapper {
              opacity: 1; /* Show clear button */
              right: 2.5rem; /* Adjust right position */
              visibility: visible; /* Make visible */
            }
          }
        }
      }

      /* Append inner button styles */
      .append-inner-wrapper {
        margin-top: 0.625rem;
      }
    }

    /* Append button styles */
    .append-wrapper {
      margin-top: 0.75rem;
    }
  }
}
</style>
