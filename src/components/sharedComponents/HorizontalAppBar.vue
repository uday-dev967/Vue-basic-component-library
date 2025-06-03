<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  logo: {
    type: String,
    default:
      'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiB2aWV3Qm94PSIwIDAgMjAwIDIwMCI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNlZWUiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjQ4IiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+TE9HTzwvdGV4dD48L3N2Zz4=',
  },
  roundLogo: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: '',
  },
  backgroundColor: {
    type: String,
    default: '#ffffff',
  },
  textColor: {
    type: String,
    default: '#444444',
  },
  height: {
    type: String,
    default: '4rem',
  },
  elevation: {
    type: Boolean,
    default: true,
  },
  position: {
    type: String,
    default: 'fixed', // static | relative | absolute | fixed | sticky
  },
  top: {
    type: [String, Number],
    default: '0rem',
  },
  zIndex: {
    type: [String, Number],
    default: 1000,
  },
});

const logo = ref(props.logo);

const topWithUnit = computed(() => (typeof props.top === 'number' ? `${props.top}rem` : props.top));

const positionClass = computed(() => {
  switch (props.position) {
    case 'fixed':
      return 'position-fixed';
    case 'sticky':
      return 'position-sticky';
    case 'absolute':
      return 'position-absolute';
    case 'relative':
      return 'position-relative';
    default:
      return 'position-static';
  }
});
</script>
<template>
  <div
    class="horizontal-app-bar"
    :class="positionClass"
    :style="{
      backgroundColor: backgroundColor,
      height: height,
      color: textColor,
      top: topWithUnit,
      zIndex: zIndex,
      boxShadow: elevation ? '0 0.125rem 0.25rem rgba(0,0,0,0.1)' : 'none',
    }"
    role="banner"
  >
    <slot name="left">
      <div class="left-container">
        <slot name="logo">
          <div
            v-if="logo"
            class="logo-container"
            :class="{ 'round-logo': roundLogo }"
            role="img"
            aria-label="Application logo"
          >
            <img :src="logo" alt="Logo" class="logo" />
          </div>
        </slot>
        <slot name="title">
          <div v-if="title" class="title">
            {{ title }}
          </div>
        </slot>
        <slot name="left-content"></slot>
      </div>
    </slot>

    <slot name="center">
      <div class="center-container">
        <slot name="center-content"></slot>
      </div>
    </slot>

    <slot name="right">
      <div class="right-container">
        <slot name="right-content"></slot>
      </div>
    </slot>
  </div>
</template>

<style scoped lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.horizontal-app-bar {
  display: grid;
  grid-template-columns: max-content 1fr max-content;
  align-items: center;
  padding: 0 1rem;
  width: 100%;
  transition: all 0.3s ease;

  .left-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    min-width: 0;

    .logo-container {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2.5rem;
      height: 2.5rem;
      cursor: pointer;
      overflow: hidden;
      transition: transform 0.2s ease;

      &:hover {
        transform: scale(1.05);
      }

      &.round-logo {
        border-radius: 50%;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }
    }

    .title {
      font-size: 1.25rem;
      font-weight: 600;
      letter-spacing: 0.0313rem;
      line-height: 1.4;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 18.75rem;
      transition: all 0.2s ease;
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }
    }
  }

  .center-container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 1rem;
  }

  .right-container {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
}

/* Position Utility Classes */
.position-fixed {
  position: fixed;
  left: 0;
  right: 0;
}
.position-sticky {
  position: sticky;
  left: 0;
  right: 0;
}
.position-absolute {
  position: absolute;
  left: 0;
  right: 0;
}
.position-relative {
  position: relative;
}
.position-static {
  position: static;
}
</style>
