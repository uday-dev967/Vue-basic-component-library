<script setup>
import { ref, useAttrs, computed } from 'vue';
import BasicInput from './BasicInput.vue';

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
const props = defineProps({
  label: {
    type: String,
    required: false,
    default: (props) => (props.multiple ? 'Upload your files' : 'Upload your file'),
  },
  maxFiles: { type: Number, required: false },
  maxSize: { type: Number, required: false },
  multiple: { type: Boolean, required: false, default: false }, // Whether multiple files can be selected
  modelValue: { type: [Object, Array], required: false }, // v-model binding value
  value: [Object, Array], // Alternative value prop
  chip: { type: Boolean, required: false, default: false },
  persistentDetails: { type: Boolean, required: false, default: true },
  accept: { type: String, required: false },
});

const attrs = useAttrs();
const fileInput = ref(null);
const fileInputComponent = ref(null);
const totalFileSizes = ref(0);
const isDragging = ref(false);
const isValidFile = (file) => file instanceof File && file.name && file.size;

// Computed property to generate validation rules based on props
const validationRules = computed(() => {
  const rules = [];

  if (props.maxFiles) {
    rules.push({
      rule: (value) => {
        if (!value) return true;
        const files = Array.isArray(value) ? value : [value];
        return files.length <= props.maxFiles;
      },
      message: `Maximum ${props.maxFiles} files allowed`,
    });
  }

  if (props.maxSize) {
    rules.push({
      rule: (value) => {
        const files = Array.isArray(value) ? value : [value];
        return calculateTotalSize(files) <= props.maxSize;
      },
      message: `Total file size must not exceed ${formatFileSize(props.maxSize)}`,
    });
  }

  if (props.accept) {
    rules.push({
      rule: (value) => {
        if (!value) return true;
        const files = Array.isArray(value) ? value : [value];
        const acceptedTypes = props.accept.split(',').map((type) => type.trim());

        return files.every((file) => {
          // Check file extension
          const fileExtension = `.${file.name.split('.').pop().toLowerCase()}`;
          // Check MIME type
          const fileType = file.type.toLowerCase();

          return acceptedTypes.some((type) => {
            // Handle MIME types (e.g., image/*, application/pdf)
            if (type.includes('*')) {
              const [category] = type.split('/');
              return fileType.startsWith(`${category}/`);
            }
            // Handle specific extensions
            return type.startsWith('.') ? type === fileExtension : type === fileType;
          });
        });
      },
      message: `Only ${props.accept} files are allowed`,
    });
  }

  return rules;
});

const sanitizeInitialValue = (val) => {
  // First check if value is null/undefined
  if (!val) return null;

  // Handle array case
  if (Array.isArray(val)) {
    const validFiles = val.filter(isValidFile);
    return validFiles.length ? validFiles : null;
  }

  // Handle single file case
  return isValidFile(val) ? val : null;
};

const internalValue = ref(sanitizeInitialValue(props.modelValue ?? props.value));

const triggerFileInput = () => {
  fileInput.value?.focus();
  fileInput.value?.click();
  if (!props.multiple || !props.chip) {
    internalValue.value = null;
    emit('update:modelValue', internalValue.value);
    emit('input', internalValue.value);
    validate();
    totalFileSizes.value = calculateTotalSize(internalValue.value);
    fileInputComponent.value?.setInternalValue(internalValue.value);
  }
};

const validate = () => {
  fileInputComponent.value.validate();
};

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 B';

  const units = ['B', 'kB', 'mB', 'gB', 'tB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));

  return `${(bytes / Math.pow(1024, i)).toFixed(i <= 1 ? i : 2)} ${units[i]}`;
};

const calculateTotalSize = (files) => {
  const fileArray = Array.isArray(files) ? files : [files];
  return fileArray.reduce((total, file) => total + (file?.size || 0), 0);
};

const updateFileValue = (files) => {
  const isMultipleInput = props.multiple;

  if (!isMultipleInput) {
    // Single file mode: assign the first file or null
    internalValue.value = files[0] || null;
  } else {
    // Multiple file mode
    // Ensure internalValue is an array
    if (!Array.isArray(internalValue.value)) {
      internalValue.value = [];
    }

    // Remove duplicates (by name, size, type)
    const newFiles = files.filter((newFile) => {
      return !internalValue.value.some(
        (existingFile) =>
          existingFile.name === newFile.name && existingFile.size === newFile.size && existingFile.type === newFile.type
      );
    });

    // Merge new files into internalValue
    internalValue.value = props.chip ? [...internalValue.value, ...newFiles] : newFiles;
  }

  // Common update logic
  emit('update:modelValue', internalValue.value);
  emit('input', internalValue.value);
  fileInputComponent.value?.setInternalValue(internalValue.value);
  totalFileSizes.value = calculateTotalSize(internalValue.value);
  validate();
};

const handleInput = (e) => {
  const files = Array.from(e.target.files);
  updateFileValue(files);
};

const handleDrop = (e) => {
  e.preventDefault();
  isDragging.value = false;
  const files = Array.from(e.dataTransfer.files);
  updateFileValue(files);
};

const handleRemoveFile = (file) => {
  if (!props.multiple) {
    internalValue.value = null;
  } else {
    internalValue.value = internalValue.value.filter((f) => f !== file);
  }
  emit('update:modelValue', internalValue.value);
  emit('input', internalValue.value);
  validate();
  fileInputComponent.value?.setInternalValue(internalValue.value);
  totalFileSizes.value = calculateTotalSize(internalValue.value);
};

const handleClearClick = () => {
  internalValue.value = null;
  emit('update:modelValue', internalValue.value);
  emit('input', internalValue.value);
  validate();
  fileInputComponent.value?.setInternalValue(internalValue.value);
  totalFileSizes.value = calculateTotalSize(internalValue.value);
};

const handleDragEnter = (e) => {
  e.preventDefault();
  isDragging.value = true;
};

const handleDragOver = (e) => {
  e.preventDefault();
  isDragging.value = true;
};

const handleDragLeave = (e) => {
  e.preventDefault();
  isDragging.value = false;
};

const handlePaste = (e) => {
  const items = e.clipboardData?.items;
  if (!items) return;

  const files = [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item.kind === 'file') {
      const file = item.getAsFile();
      if (file) {
        files.push(file);
      }
    }
  }

  if (files.length > 0) {
    updateFileValue(files);
  }
};
</script>

<template>
  <BasicInput
    ref="fileInputComponent"
    class="file-input-wrapper"
    v-bind="attrs"
    :label="label"
    :value="internalValue"
    :rules="validationRules"
    :persistentDetails="persistentDetails"
    :class="{ 'is-dragging': isDragging }"
    @change="(e) => emit('change', e)"
    @focus="(e) => emit('focus', e)"
    @blur="(e) => emit('blur', e)"
    @keydown="(e) => emit('keydown', e)"
    @keyup="(e) => emit('keyup', e)"
    @keypress="(e) => emit('keypress', e)"
    @click="(e) => emit('click', e)"
    @dblclick="(e) => emit('dblclick', e)"
    @mousedown="(e) => emit('mousedown', e)"
    @mouseup="(e) => emit('mouseup', e)"
    @mouseenter="(e) => emit('mouseenter', e)"
    @mouseleave="(e) => emit('mouseleave', e)"
    @copy="(e) => emit('copy', e)"
    @cut="(e) => emit('cut', e)"
    @paste="(e) => emit('paste', e)"
    @compositionstart="(e) => emit('compositionstart', e)"
    @compositionupdate="(e) => emit('compositionupdate', e)"
    @compositionend="(e) => emit('compositionend', e)"
    @dragenter="(e) => emit('dragenter', e)"
    @dragover="(e) => emit('dragover', e)"
    @dragleave="(e) => emit('dragleave', e)"
    @drop="(e) => emit('drop', e)"
    @prepend:click="triggerFileInput"
    @prependInner:click="triggerFileInput"
    @clear:click="handleClearClick"
    @append:click="(e) => emit('append:click', e)"
    @appendInner:click="(e) => emit('appendInner:click', e)"
    @validate="(e) => emit('validate', e)"
    @parent:dragenter="handleDragEnter"
    @parent:dragover="handleDragOver"
    @parent:dragleave="handleDragLeave"
    @parent:drop="handleDrop"
    @parent:paste="handlePaste"
  >
    <template #input-field="{ props: { readonly, disabled, attrs, triggerEvent, validate } }">
      <input
        ref="fileInput"
        type="file"
        v-bind="attrs"
        :readonly="readonly"
        :disabled="disabled"
        :multiple="multiple"
        :accept="accept"
        @input="handleInput"
        @change="triggerEvent('change', $event)"
        @focus="triggerEvent('focus', $event)"
        @blur="triggerEvent('blur', $event)"
        @keydown="triggerEvent('keydown', $event)"
        @keyup="triggerEvent('keyup', $event)"
        @keypress="triggerEvent('keypress', $event)"
        @click="triggerEvent('click', $event)"
        @dblclick="triggerEvent('dblclick', $event)"
        @mousedown="triggerEvent('mousedown', $event)"
        @mouseup="triggerEvent('mouseup', $event)"
        @mouseenter="triggerEvent('mouseenter', $event)"
        @mouseleave="triggerEvent('mouseleave', $event)"
        @compositionstart="triggerEvent('compositionstart', $event)"
        @compositionupdate="triggerEvent('compositionupdate', $event)"
        @compositionend="triggerEvent('compositionend', $event)"
        @dragenter="triggerEvent('dragenter', $event)"
        @dragover="triggerEvent('dragover', $event)"
        @dragleave="triggerEvent('dragleave', $event)"
        @drop="triggerEvent('drop', $event)"
      />
      <div
        class="file-input-placeholder"
        v-if="!(multiple ? internalValue?.length > 0 : internalValue)"
        @click="triggerFileInput"
      ></div>
      <div v-else class="file-input-selected-files" @click="triggerFileInput">
        <template v-if="chip">
          <template v-if="multiple">
            <div class="file-chip" v-for="file in internalValue" :key="file.name" @click.stop>
              <span class="file-name">{{ file.name }}</span>
              <button class="remove-btn" @click.stop="handleRemoveFile(file)">&times;</button>
            </div>
          </template>
          <div v-else class="file-chip" @click.stop>
            <span class="file-name">{{ internalValue?.name }} ({{ formatFileSize(internalValue?.size) }})</span>
            <button class="remove-btn" @click.stop="handleRemoveFile(internalValue)">&times;</button>
          </div>
        </template>
        <template v-else>
          <template v-if="multiple">
            {{ internalValue?.map((file) => file.name)?.join(', ') }}
          </template>
          <template v-else> {{ internalValue?.name }} ({{ formatFileSize(internalValue?.size) }}) </template>
        </template>
      </div>
    </template>
    <template #prepend="{ props }">
      <slot name="prepend" :props="props">
        <svg
          @click="props?.click?.()"
          class="prepend-svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          role="img"
          aria-hidden="true"
        >
          <path
            d="M16.5,6V17.5A4,4 0 0,1 12.5,21.5A4,4 0 0,1 8.5,17.5V5A2.5,2.5 0 0,1 11,2.5A2.5,2.5 0 0,1 13.5,5V15.5A1,1 0 0,1 12.5,16.5A1,1 0 0,1 11.5,15.5V6H10V15.5A2.5,2.5 0 0,0 12.5,18A2.5,2.5 0 0,0 15,15.5V5A4,4 0 0,0 11,1A4,4 0 0,0 7,5V17.5A5.5,5.5 0 0,0 12.5,23A5.5,5.5 0 0,0 18,17.5V6H16.5Z"
          ></path>
        </svg>
      </slot>
    </template>
    <template #prepend-inner="{ props }">
      <slot name="prepend-inner" :props="{ props }">
        <svg
          @click="props?.click?.()"
          class="prepend-inner-svg"
          width="64"
          height="64"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          fill="#000000"
        >
          <path
            d="M20,8 C18.896,8 18,7.104 18,6 L18,2 L24,8 L20,8 Z M18,0 L18,0.028 C17.872,0.028 4,0 4,0 C1.791,0 0,1.791 0,4 L0,28 C0,30.209 1.791,32 4,32 L22,32 C24.209,32 26,30.209 26,28 L26,10 L26,8 L18,0 Z"
          />
        </svg>
      </slot>
    </template>
    <template #append-inner="{ props }">
      <slot name="append-inner" :props="props">
        <svg
          class="append-inner-svg"
          @click="props?.click?.()"
          xmlns="http://www.w3.org/2000/svg"
          fill="#000000"
          width="64px"
          height="64px"
          viewBox="0 0 24 24"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier"><path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"></path></g>
        </svg>
      </slot>
    </template>
    <template #append="{ props }">
      <slot name="append" :props="props">
        <svg
          class="append-svg"
          @click="props?.click?.()"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          role="img"
          aria-hidden="true"
        >
          <path
            d="M16.5,6V17.5A4,4 0 0,1 12.5,21.5A4,4 0 0,1 8.5,17.5V5A2.5,2.5 0 0,1 11,2.5A2.5,2.5 0 0,1 13.5,5V15.5A1,1 0 0,1 12.5,16.5A1,1 0 0,1 11.5,15.5V6H10V15.5A2.5,2.5 0 0,0 12.5,18A2.5,2.5 0 0,0 15,15.5V5A4,4 0 0,0 11,1A4,4 0 0,0 7,5V17.5A5.5,5.5 0 0,0 12.5,23A5.5,5.5 0 0,0 18,17.5V6H16.5Z"
          ></path>
        </svg>
      </slot>
    </template>
    <template #details-right-content="{ props: { hint, error, errorMessage, persistentDetails, focused } }">
      <div class="details-right-content" :class="{ persistentDetails, focused }">
        <span v-if="internalValue?.length > 0">{{ internalValue?.length }} files</span>
        <span v-if="totalFileSizes > 0">({{ formatFileSize(totalFileSizes) }} in total) </span>
      </div>
    </template>
  </BasicInput>
</template>

<style lang="scss" scoped>
.file-input-wrapper {
  .prepend-svg {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  .prepend-inner-svg {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  .append-inner-svg {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  .append-svg {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  .file-picker-opener {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  .file-input-placeholder {
    padding: 1rem 0;
    cursor: pointer;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
    min-height: 3.25rem;
  }

  .file-input-selected-files {
    padding: 1rem 0;
    cursor: pointer;
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;

    .file-chip {
      align-items: center;
      gap: 0.5rem;
      padding: 0.25rem 0.75rem;
      background-color: #f1f1f1;
      border-radius: 624.9375rem;
      font-size: 0.875rem;
      color: #333;
      border: 0.0625rem solid #ccc;

      .file-name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 150px;
      }

      .remove-btn {
        background: none;
        border: none;
        font-size: 1rem;
        line-height: 1;
        cursor: pointer;
        color: #666;
        transition: color 0.2s;

        &:hover {
          color: #333;
        }
      }
    }
  }

  input {
    position: relative; /* Relative positioning */
    z-index: 1; /* Layering */
    background: transparent; /* Transparent background */
    padding: 0; /* No padding */
    margin: 0; /* No margin */
    border: none; /* No border */
    outline: 0; /* No outline */
    padding: 1rem 0; /* Padding */
    width: 100%; /* Full width */
    cursor: pointer;
    width: 0;
    height: 0;
    opacity: 0;
    position: absolute;
    &:focus {
      outline: none; /* No outline on focus */
    }
  }

  .details-right-content {
    display: flex;
    // align-items: center;
    gap: 0.5rem;
    color: #666;
    font-weight: 300;
    font-size: 0.75rem;
    flex-shrink: 0;

    opacity: 0; /* Hidden by default */
    visibility: hidden; /* Hidden by default */
    min-height: 0.875rem; /* Minimum height */
    min-width: 0.0625rem; /* Minimum width */
    position: relative; /* Relative positioning */
    transform: translateY(-100%); /* Move up */
    transition: all 0.2s ease-in-out; /* Smooth transition */
    span {
      white-space: nowrap;
    }

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
.file-input-wrapper {
  &.is-dragging {
    .input-wrapper {
      border-color: #000000;
    }
  }
  &.basic-input-wrapper {
    &.readonly {
      input {
        pointer-events: none;
      }
    }

    /* Input wrapper styles */
    .input-wrapper {
      grid-template-areas: 'prepend-inner field clear append-inner'; /* Define grid areas */

      /* Input field wrapper styles */
      .input-field-wrapper {
        /* Label styles */
        &:has(.label.floating) {
          .file-input-placeholder {
            opacity: 0;
          }
        }
        .label {
          &.has-inner-prepend {
            &.floating {
              animation: float-diagonal 0.2s ease forwards; /* Animation for floating */
              font-size: 0.625rem; /* Smaller font size */
              height: max-content; /* Adjust height */
              transform: translateY(-50%); /* Center vertically */
              left: 0.625rem; /* Left position */
              background: white; /* Background color */
              padding: 0 0.25rem; /* Padding */
            }
            &.un-floating {
              animation: reverse-float-diagonal 0.2s ease forwards; /* Animation for un-floating */
              font-size: 0.875rem; /* Normal font size */
              height: 100%; /* Full height */
              left: calc(0.625rem + 0.375rem + 1.5rem); /* Adjust left position */
              top: 50%; /* Center vertically */
              transform: translateY(-50%); /* Center vertically */
              padding: 0; /* No padding */
            }
          }

          /* Keyframes for floating animation */
          @keyframes float-diagonal {
            0% {
              left: calc(0.625rem + 0.375rem + 1.5rem); /* Start position */
              top: 40%; /* Start vertical position */
            }
            100% {
              left: 0.625rem; /* End position */
              top: 0; /* End vertical position */
            }
          }

          /* Keyframes for reverse floating animation */
          @keyframes reverse-float-diagonal {
            0% {
              left: calc(0.625rem + 0.375rem); /* Start position */
              top: 0%; /* Start vertical position */
            }
            100% {
              left: calc(0.625rem + 0.375rem + 1.5rem); /* End position */
              top: 50%; /* End vertical position */
            }
          }

          /* Input field styles */
          &:has(.label) {
            .input-field {
              &:not(:focus) {
                &::placeholder {
                  width: 0; /* Hide placeholder when not focused */
                }
              }
            }
          }

          /* Clear button styles */
          &:has(.clear-wrapper) {
            input:focus {
              visibility: visible;
              width: calc(100% - 2rem); /* Adjust width when focused */
            }
          }

          /* Show clear button when focused */
          &:focus-within {
            &:has(.has-value) {
              input {
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
      }
    }

    .details-wrapper {
      align-items: initial;
    }
  }
}
</style>
