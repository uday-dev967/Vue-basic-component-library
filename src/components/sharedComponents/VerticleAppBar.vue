<script setup>
import { computed, ref } from 'vue';

const emit = defineEmits(['logoClick', 'closeClick', 'titleClick', 'update:modelValue', 'update:activeItem']);

const props = defineProps({
  width: {
    type: String,
    default: '20rem',
  },
  height: {
    type: String,
    default: '100%',
  },
  elevation: {
    type: Boolean,
    default: true,
  },
  floating: {
    type: Boolean,
    default: true,
  },
  sticky: {
    type: Boolean,
    default: true,
  },
  logo: {
    type: String,
    default: '',
  },
  roundedLogo: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  showCloseButton: {
    type: Boolean,
    default: true,
  },
  prependHeight: {
    type: String,
    default: '4rem',
  },
  navigationLogoSize: {
    type: String,
    default: '2.5rem',
  },
  logoSize: {
    type: String,
    default: '2.5rem',
  },
  titleColor: {
    type: String,
    default: '#111',
  },
  backgroundColor: {
    type: String,
    default: '#f2f2f2',
  },
  modelValue: {
    type: Boolean,
    default: true,
  },
  persistIconsOnHide: {
    type: Boolean,
    default: true,
  },
  expandOnHover: {
    type: Boolean,
    default: false,
  },
  expandOnClick: {
    type: Boolean,
    default: true,
  },
  overlay: {
    type: Boolean,
    default: true,
  },
  position: {
    type: String,
    default: 'left',
    validator: (value) => ['left', 'right'].includes(value),
  },
  transitionDuration: {
    type: String,
    default: '0.3s',
  },
  items: {
    type: Array,
    default: () => [],
  },
  activeItem: {
    type: String,
    default: '',
  },
  showChevron: {
    type: Boolean,
    default: true,
  },
  multiExpand: {
    type: Boolean,
    default: true,
  },
});

const expandedItems = ref([]);

const handleLogoClick = () => emit('logoClick');
const handleCloseClick = () => {
  emit('update:modelValue', false);
  emit('closeClick');
};
const handleTitleClick = () => emit('titleClick');
const handleExpandClick = () => {
  if (props.expandOnClick && !props.modelValue) emit('update:modelValue', true);
};

const positionStyles = computed(() => ({
  '--logo-size': props.logoSize,
  '--width': props.width,
  '--transition-duration': props.transitionDuration,
  '--navigation-logo-size': props.navigationLogoSize,
}));

const iterateItems = computed(() => {
  const items = [];

  const iterateFunction = (item, level, parentExpanded) => {
    // Show root items or children of expanded items only
    const isRoot = level === 0;
    const isVisible = isRoot || parentExpanded;

    if (isVisible) {
      items.push({ ...item, level });

      const isExpanded = checkExpandIncluded(item);
      if (item.children?.length > 0) {
        item.children.forEach((child) => {
          iterateFunction(child, level + 1, isExpanded);
        });
      }
    }
  };

  props.items.forEach((item) => {
    iterateFunction(item, 0, true);
  });

  return items;
});

const checkItemActive = (item) => {
  if (item.value === props.activeItem) return true;
  if (item.children?.length > 0) {
    return item.children.some((child) => checkItemActive(child));
  }
  return false;
};

const findParent = (items, targetValue) => {
  for (const item of items) {
    if (item.children?.some((child) => child.value === targetValue)) {
      return item;
    }
    if (item.children?.length > 0) {
      const found = findParent(item.children, targetValue);
      if (found) return found;
    }
  }
  return null;
};

const handleItemClick = (item) => {
  if (item.children?.length > 0) {
    const index = expandedItems.value.indexOf(item.value);
    const isExpanded = index !== -1;

    if (props.multiExpand) {
      if (isExpanded) {
        expandedItems.value.splice(index, 1); // collapse
      } else {
        expandedItems.value.push(item.value); // expand
      }
    } else {
      if (item?.level > 1) {
        const parentItem = findParent(props.items, item.value);

        if (parentItem) {
          expandedItems.value = isExpanded ? [] : [parentItem.value];
        }
      } else {
        expandedItems.value = isExpanded ? [] : [item.value];
      }
    }
  } else {
    emit('update:activeItem', item.value);
  }
};

const checkExpandIncluded = (item) => {
  if (expandedItems.value.includes(item.value)) return true;
  if (item.children?.length > 0) {
    return item.children.some((child) => checkExpandIncluded(child));
  }

  return false;
};
</script>

<template>
  <!-- Overlay element -->
  <div v-if="overlay && modelValue" class="overlay-backdrop" @click="handleCloseClick"></div>

  <div
    class="app-bar-wrapper"
    :style="{
      height: height,
      backgroundColor: backgroundColor,
      ...positionStyles,
    }"
    :class="{
      elevation: elevation,
      floating: floating,
      hidePanel: !modelValue,
      persistIconsOnHide: persistIconsOnHide,
      expandOnHover: expandOnHover,
      'position-left': position === 'left',
      'position-right': position === 'right',
      sticky: sticky,
    }"
    @click="handleExpandClick()"
  >
    <slot>
      <slot name="prepend">
        <div class="prepend" :style="{ height: prependHeight }">
          <slot name="logo" :handleLogoClick="handleLogoClick">
            <div
              v-if="logo"
              class="logo-wrapper"
              @click="handleLogoClick"
              :class="{ rounded: roundedLogo }"
              :style="{ width: logoSize, height: logoSize }"
            >
              <template v-if="logo.trim().startsWith('<svg')">
                <div class="logo-svg" v-html="logo"></div>
              </template>
              <template v-else>
                <img :src="logo" alt="logo" class="logo-image" />
              </template>
            </div>
          </slot>
          <slot name="title" :handleTitleClick="handleTitleClick">
            <div class="title" :style="{ color: titleColor }" @click="handleTitleClick">
              {{ title }}
            </div>
          </slot>
          <slot name="closeBtn" :handleCloseClick="handleCloseClick">
            <div v-if="showCloseButton" class="close-btn" @click.stop="handleCloseClick">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="close-icon">
                <path
                  fill="currentColor"
                  d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
                />
              </svg>
            </div>
          </slot>
        </div>
      </slot>

      <slot name="content">
        <div class="content">
          <div
            class="item"
            v-for="item in iterateItems"
            :key="item.label"
            :class="{
              active: checkItemActive(item),
              expanded: checkExpandIncluded(item),
              [`item-${item.level}`]: true,
            }"
            :style="{ marginLeft: item.level * 1.5 + 'rem' }"
            @click.stop="handleItemClick(item)"
          >
            <div v-if="item.icon" class="item-icon-wrapper">
              <template v-if="item.icon.trim().startsWith('<svg')">
                <div class="item-icon" v-html="item.icon"></div>
              </template>
              <template v-else>
                <img :src="item.icon" alt="icon" class="item-icon" />
              </template>
            </div>
            <div class="item-label">{{ item.label }}</div>
            <svg
              v-if="showChevron && item.children?.length > 0"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              class="chevron-icon"
            >
              <path fill="currentColor" d="M12 15.41L16.59 10L18 11.41L12 17.41L6 11.41L7.41 10z" />
            </svg>
          </div>
        </div>
      </slot>

      <slot name="append"> </slot>
    </slot>
  </div>
</template>

<style lang="scss" scoped>
*,
:after,
:before {
  box-sizing: border-box;
}

.overlay-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.app-bar-wrapper {
  height: 100%;
  width: 100%;
  background-color: #f2f2f2;
  display: grid;
  grid-template-rows: max-content 1fr max-content;
  transition: all var(--transition-duration) ease;
  opacity: 1;
  position: relative;
  z-index: 1000;
  width: var(--width);

  &.elevation {
    box-shadow: 0 0 0.625rem 0 rgba(0, 0, 0, 0.1);
  }

  &.floating {
    position: absolute;
    top: 0;
    bottom: 0;
  }

  &.position-left {
    left: 0;
    right: auto;
  }

  &.position-right {
    left: auto;
    right: 0;
  }

  &.hidePanel {
    &:not(.persistIconsOnHide) {
      opacity: 0;
      width: 0 !important;
      overflow: hidden;
      visibility: hidden;
    }
    &.persistIconsOnHide {
      width: calc(max(var(--logo-size), var(--navigation-logo-size)) + 2rem) !important;
      overflow: hidden;
      place-content: center;

      .prepend {
        grid-template-columns: 1fr;
        gap: 0;

        .logo-wrapper {
          margin: auto;
        }

        .title {
          display: none;
        }

        .close-btn {
          display: none;
        }
      }
      .item {
        gap: 0;
        grid-template-columns: 1fr;
        width: max-content;

        &:not(.item-0) {
          display: none;
        }
        .item-label {
          display: none;
        }

        .chevron-icon {
          display: none;
        }
      }
    }
  }

  &.expandOnHover {
    &:hover {
      width: var(--width) !important;
      place-content: initial;

      .prepend {
        grid-template-columns: 1fr max-content;
        gap: 0.625rem;

        &:has(.logo-wrapper) {
          grid-template-columns: max-content 1fr max-content;
        }

        .logo-wrapper {
          margin: initial;
        }

        .title {
          display: initial;
        }

        .close-btn {
          display: initial;
        }
      }
      .item {
        grid-template-columns: max-content 1fr max-content;
        gap: 0.5rem;
        width: initial;

        &:not(.item-0) {
          display: initial;
        }
        .item-label {
          display: initial;
        }

        .chevron-icon {
          display: initial;
        }
      }
    }
  }

  &.sticky {
    position: fixed;
    top: 0;
  }

  .prepend {
    display: grid;
    grid-template-columns: 1fr max-content;
    align-items: center;
    justify-content: space-between;
    gap: 0.625rem;
    padding: 0.5rem;
    border-bottom: 0.0625rem solid rgba(0, 0, 0, 0.1);
    background-color: inherit;

    &:has(.logo-wrapper) {
      grid-template-columns: max-content 1fr max-content;
    }

    .logo-wrapper {
      cursor: pointer;
      overflow: hidden;
      transition: transform 0.2s ease;
      border-radius: 0.25rem;

      &:hover {
        transform: scale(1.05);
      }

      &.rounded {
        border-radius: 50%;
      }

      .logo-image {
        height: 100%;
        width: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }

      .logo-svg {
        height: 100%;
        width: 100%;
        transition: transform 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
          transform: scale(1.05);
        }

        svg {
          height: 100%;
          width: 100%;
        }
      }
    }

    .title {
      font-size: 1.25rem;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;
      transition: opacity 0.2s ease;
      padding: 0 0.5rem;

      &:hover {
        opacity: 0.8;
      }
    }

    .close-btn {
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s ease;

      &:hover {
        background-color: rgba(0, 0, 0, 0.05);
      }

      .close-icon {
        transition: transform 0.2s ease;
      }

      &:hover .close-icon {
        transform: rotate(90deg);
      }
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.5rem;

    .item {
      display: grid;
      grid-template-columns: max-content 1fr max-content;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem;
      border-radius: 0.25rem;
      background-color: #f2f2f2;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background-color: #e0e0e0c5;
      }

      &:active {
        background-color: #d0d0d0;
        transform: scale(0.98);
      }

      &.active {
        background-color: #00000010;
      }

      .item-icon-wrapper {
        height: var(--navigation-logo-size);
        width: var(--navigation-logo-size);
        display: flex;
        align-items: center;
        justify-content: center;

        svg {
          height: 100%;
          width: 100%;
          flex-shrink: 0;
        }

        img {
          height: 100%;
          width: 100%;
          object-fit: cover;
          flex-shrink: 0;
        }
      }

      .item-label {
        font-size: 1rem;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .chevron-icon {
        height: 1.5rem;
        width: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.2s ease;
      }

      &.expanded {
        .chevron-icon {
          transform: rotate(180deg);
        }
      }
    }
  }
}
</style>
