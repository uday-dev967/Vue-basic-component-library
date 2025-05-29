<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';

const emit = defineEmits(['cardClick']);

const props = defineProps({
  arrowsPosition: {
    type: String,
    default: 'bottom', // top, bottom, center, center-outside
  },
  showArrowsAlways: {
    type: Boolean,
    default: true,
  },
  showDots: {
    type: Boolean,
    default: true,
  },
  items: {
    type: Array,
    default: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
  },
  canSelectCard: {
    type: Boolean,
    default: true,
  },
  selectedCard: {
    type: Number,
    default: -1,
  },
  cardWidth: {
    type: Number,
    default: 20,
  },
});

const currentDot = ref(1);
const sliderContainer = ref(null);
const selectedCard = ref(props.selectedCard);
const disableNextBtn = ref(false);
const disablePrevBtn = ref(false);
const totalDots = ref(0);

const setDisablePrevBtn = () => {
  disablePrevBtn.value = currentDot.value === 1;
};

const setDisableNextBtn = () => {
  disableNextBtn.value = currentDot.value === totalDots.value;
};

const setTotalDots = () => {
  if (!sliderContainer.value) return 0;

  const containerWidth = sliderContainer.value.clientWidth;
  const totalWidth = sliderContainer.value.scrollWidth;

  // Calculate how many full container widths we can fit
  totalDots.value = Math.ceil(totalWidth / containerWidth);
};

// ..........................
const handleDotClick = (dot) => {
  currentDot.value = dot;
  sliderContainer.value.scrollLeft = (dot - 1) * sliderContainer.value.clientWidth;
  setDisablePrevBtn();
  setDisableNextBtn();
};

const handlePrevBtnClick = () => {
  if (disablePrevBtn.value) return;
  handleDotClick(currentDot.value - 1);
  setDisablePrevBtn();
  setDisableNextBtn();
};

const handleNextBtnClick = () => {
  if (disableNextBtn.value) return;
  handleDotClick(currentDot.value + 1);
  setDisablePrevBtn();
  setDisableNextBtn();
};

const handleCardClick = (i) => {
  emit('cardClick', props.items[i - 1]);
  const totalCards = props.items.length;

  if (props.canSelectCard) {
    selectedCard.value = i;
  }

  // Handle edge cases
  if (i === 1) {
    currentDot.value = 1;
    sliderContainer.value.scrollLeft = 0;
  } else if (i === totalCards) {
    currentDot.value = totalDots.value;
    const cardWidth = sliderContainer.value.scrollWidth / totalCards;
    const targetScroll = (totalCards - 1) * cardWidth - sliderContainer.value.clientWidth / 2 + cardWidth / 2;
    sliderContainer.value.scrollLeft = Math.max(0, targetScroll);
  } else {
    // Handle middle cases
    const cardsPerDot = Math.ceil(totalCards / totalDots.value);
    const targetDot = Math.ceil(i / cardsPerDot);
    currentDot.value = targetDot;
    const cardWidth = sliderContainer.value.scrollWidth / totalCards;
    const targetScroll = (i - 1) * cardWidth - sliderContainer.value.clientWidth / 2 + cardWidth / 2;

    sliderContainer.value.scrollLeft = Math.max(0, targetScroll);
  }

  setDisablePrevBtn();
  setDisableNextBtn();
};
const handleResize = () => {
  sliderContainer.value.scrollLeft = 0;
  currentDot.value = 1;
  setTotalDots();
  setDisablePrevBtn();
  setDisableNextBtn();
};

onMounted(() => {
  handleResize();

  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <div class="slider-group-container" :class="{ [arrowsPosition]: true, 'show-arrows-always': showArrowsAlways }">
    <div v-if="arrowsPosition === 'top'" class="slider-group-arrows slider-group-arrows-top">
      <slot name="prev-slider-btn" :disabled="disablePrevBtn" :handlePrevBtnClick="handlePrevBtnClick">
        <svg
          class="prev-slider-btn"
          :class="{ disabled: disablePrevBtn }"
          @click="handlePrevBtnClick"
          width="64px"
          height="64px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M16.1795 3.26875C15.7889 2.87823 15.1558 2.87823 14.7652 3.26875L8.12078 9.91322C6.94952 11.0845 6.94916 12.9833 8.11996 14.155L14.6903 20.7304C15.0808 21.121 15.714 21.121 16.1045 20.7304C16.495 20.3399 16.495 19.7067 16.1045 19.3162L9.53246 12.7442C9.14194 12.3536 9.14194 11.7205 9.53246 11.33L16.1795 4.68297C16.57 4.29244 16.57 3.65928 16.1795 3.26875Z"
              fill="#0F0F0F"
            ></path>
          </g>
        </svg>
      </slot>
      <slot v-if="showDots" name="dots">
        <div class="slider-group-dots">
          <template v-for="dot in totalDots" :key="dot">
            <slot :dot="dot" :current-dot="currentDot" :handleDotClick="handleDotClick">
              <div
                class="slider-group-dot"
                :class="{ active: currentDot === dot }"
                @click.stop="handleDotClick(dot)"
              ></div>
            </slot>
          </template>
        </div>
      </slot>
      <slot name="next-slider-btn" :disabled="disableNextBtn" :handleNextBtnClick="handleNextBtnClick">
        <svg
          class="next-slider-btn"
          :class="{ disabled: disableNextBtn }"
          @click="handleNextBtnClick"
          width="64px"
          height="64px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M7.82051 3.26875C8.21103 2.87823 8.84419 2.87823 9.23472 3.26875L15.8792 9.91322C17.0505 11.0845 17.0508 12.9833 15.8801 14.155L9.30966 20.7304C8.91914 21.121 8.28598 21.121 7.89546 20.7304C7.50493 20.3399 7.50493 19.7067 7.89546 19.3162L14.4675 12.7442C14.858 12.3536 14.858 11.7205 14.4675 11.33L7.82051 4.68297C7.43 4.29244 7.43 3.65928 7.82051 3.26875Z"
              fill="#0F0F0F"
            ></path>
          </g>
        </svg>
      </slot>
    </div>
    <div v-else-if="arrowsPosition === 'center'" class="slider-group-arrows slider-group-arrows-center">
      <slot name="prev-slider-btn" :disabled="disablePrevBtn" :handlePrevBtnClick="handlePrevBtnClick">
        <svg
          class="prev-slider-btn"
          :class="{ disabled: disablePrevBtn }"
          @click="handlePrevBtnClick"
          width="64px"
          height="64px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M16.1795 3.26875C15.7889 2.87823 15.1558 2.87823 14.7652 3.26875L8.12078 9.91322C6.94952 11.0845 6.94916 12.9833 8.11996 14.155L14.6903 20.7304C15.0808 21.121 15.714 21.121 16.1045 20.7304C16.495 20.3399 16.495 19.7067 16.1045 19.3162L9.53246 12.7442C9.14194 12.3536 9.14194 11.7205 9.53246 11.33L16.1795 4.68297C16.57 4.29244 16.57 3.65928 16.1795 3.26875Z"
              fill="#0F0F0F"
            ></path>
          </g>
        </svg>
      </slot>
      <slot name="next-slider-btn" :disabled="disableNextBtn" :handleNextBtnClick="handleNextBtnClick">
        <svg
          class="next-slider-btn"
          :class="{ disabled: disableNextBtn }"
          @click="handleNextBtnClick"
          width="64px"
          height="64px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M7.82051 3.26875C8.21103 2.87823 8.84419 2.87823 9.23472 3.26875L15.8792 9.91322C17.0505 11.0845 17.0508 12.9833 15.8801 14.155L9.30966 20.7304C8.91914 21.121 8.28598 21.121 7.89546 20.7304C7.50493 20.3399 7.50493 19.7067 7.89546 19.3162L14.4675 12.7442C14.858 12.3536 14.858 11.7205 14.4675 11.33L7.82051 4.68297C7.43 4.29244 7.43 3.65928 7.82051 3.26875Z"
              fill="#0F0F0F"
            ></path>
          </g>
        </svg>
      </slot>
    </div>
    <slot
      v-else-if="arrowsPosition === 'center-outside'"
      name="prev-slider-btn"
      :disabled="disablePrevBtn"
      :handlePrevBtnClick="handlePrevBtnClick"
    >
      <svg
        class="prev-slider-btn"
        :class="{ disabled: disablePrevBtn }"
        @click="handlePrevBtnClick"
        width="64px"
        height="64px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path
            d="M16.1795 3.26875C15.7889 2.87823 15.1558 2.87823 14.7652 3.26875L8.12078 9.91322C6.94952 11.0845 6.94916 12.9833 8.11996 14.155L14.6903 20.7304C15.0808 21.121 15.714 21.121 16.1045 20.7304C16.495 20.3399 16.495 19.7067 16.1045 19.3162L9.53246 12.7442C9.14194 12.3536 9.14194 11.7205 9.53246 11.33L16.1795 4.68297C16.57 4.29244 16.57 3.65928 16.1795 3.26875Z"
            fill="#0F0F0F"
          ></path>
        </g>
      </svg>
    </slot>
    <!--  this section is for the slider items -->
    <div class="slider-group-items" ref="sliderContainer">
      <template v-for="(item, i) in items" :key="i">
        <slot
          name="card"
          :item="item"
          :handleCardClick="(...e) => handleCardClick(i + 1, ...e)"
          :selectedCard="selectedCard === i + 1"
        >
          <div
            class="card"
            :class="{ selected: selectedCard === i + 1, canSelectCard: canSelectCard }"
            @click="handleCardClick(i + 1)"
            :style="{ width: `${cardWidth}rem` }"
          >
            <slot name="card-content" :item="item">
              {{ i + 1 }}
            </slot>
          </div>
        </slot>
      </template>
    </div>
    <!--  end of slider items -->
    <div v-if="arrowsPosition === 'bottom'" class="slider-group-arrows slider-group-arrows-bottom">
      <slot name="prev-slider-btn" :disabled="disablePrevBtn" :handlePrevBtnClick="handlePrevBtnClick">
        <svg
          class="prev-slider-btn"
          :class="{ disabled: disablePrevBtn }"
          @click="handlePrevBtnClick"
          width="64px"
          height="64px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M16.1795 3.26875C15.7889 2.87823 15.1558 2.87823 14.7652 3.26875L8.12078 9.91322C6.94952 11.0845 6.94916 12.9833 8.11996 14.155L14.6903 20.7304C15.0808 21.121 15.714 21.121 16.1045 20.7304C16.495 20.3399 16.495 19.7067 16.1045 19.3162L9.53246 12.7442C9.14194 12.3536 9.14194 11.7205 9.53246 11.33L16.1795 4.68297C16.57 4.29244 16.57 3.65928 16.1795 3.26875Z"
              fill="#0F0F0F"
            ></path>
          </g>
        </svg>
      </slot>
      <slot v-if="showDots" name="dots">
        <div class="slider-group-dots">
          <template v-for="dot in totalDots" :key="dot">
            <slot :dot="dot" :current-dot="currentDot" :handleDotClick="handleDotClick">
              <div
                class="slider-group-dot"
                :class="{ active: currentDot === dot }"
                @click.stop="handleDotClick(dot)"
              ></div>
            </slot>
          </template>
        </div>
      </slot>
      <slot name="next-slider-btn" :disabled="disableNextBtn" :handleNextBtnClick="handleNextBtnClick">
        <svg
          class="next-slider-btn"
          :class="{ disabled: disableNextBtn }"
          @click="handleNextBtnClick"
          width="64px"
          height="64px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M7.82051 3.26875C8.21103 2.87823 8.84419 2.87823 9.23472 3.26875L15.8792 9.91322C17.0505 11.0845 17.0508 12.9833 15.8801 14.155L9.30966 20.7304C8.91914 21.121 8.28598 21.121 7.89546 20.7304C7.50493 20.3399 7.50493 19.7067 7.89546 19.3162L14.4675 12.7442C14.858 12.3536 14.858 11.7205 14.4675 11.33L7.82051 4.68297C7.43 4.29244 7.43 3.65928 7.82051 3.26875Z"
              fill="#0F0F0F"
            ></path>
          </g>
        </svg>
      </slot>
    </div>
    <slot
      v-else-if="arrowsPosition === 'center-outside'"
      name="next-slider-btn"
      :disabled="disableNextBtn"
      :handleNextBtnClick="handleNextBtnClick"
    >
      <svg
        class="next-slider-btn"
        :class="{ disabled: disableNextBtn }"
        @click="handleNextBtnClick"
        width="64px"
        height="64px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path
            d="M7.82051 3.26875C8.21103 2.87823 8.84419 2.87823 9.23472 3.26875L15.8792 9.91322C17.0505 11.0845 17.0508 12.9833 15.8801 14.155L9.30966 20.7304C8.91914 21.121 8.28598 21.121 7.89546 20.7304C7.50493 20.3399 7.50493 19.7067 7.89546 19.3162L14.4675 12.7442C14.858 12.3536 14.858 11.7205 14.4675 11.33L7.82051 4.68297C7.43 4.29244 7.43 3.65928 7.82051 3.26875Z"
            fill="#0F0F0F"
          ></path>
        </g>
      </svg>
    </slot>
  </div>
</template>

<style lang="scss" scoped>
.slider-group-container {
  width: 100%;
  height: 100%;
  display: grid;
  justify-content: center;
  padding: 0.25rem;
  overflow: hidden;
  position: relative;

  .disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  &.show-arrows-always {
    .slider-group-arrows {
      visibility: visible;
      opacity: 1;
    }
  }
  &:has(.slider-group-items:hover) {
    .slider-group-arrows {
      visibility: visible;
      opacity: 1;
    }
  }

  &:has(.prev-slider-btn:hover) {
    .slider-group-arrows {
      visibility: visible;
      opacity: 1;
    }
  }

  &:has(.next-slider-btn:hover) {
    .slider-group-arrows {
      visibility: visible;
      opacity: 1;
    }
  }

  &:has(.slider-group-dots:hover) {
    .slider-group-arrows {
      visibility: visible;
      opacity: 1;
    }
  }

  &.top {
    grid-template-rows: max-content 1fr;
    gap: 0.5rem;
  }

  &.bottom {
    grid-template-rows: 1fr max-content;
    gap: 0.5rem;
  }

  &.center {
    grid-template-rows: 1fr;

    .slider-group-arrows {
      position: absolute;
      left: 1rem;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
      justify-content: space-between;
      z-index: 1;

      .prev-slider-btn {
        pointer-events: all;
      }

      .next-slider-btn {
        pointer-events: all;
      }
    }
  }

  &.center-outside {
    grid-template-rows: 1fr;
    grid-template-columns: max-content 1fr max-content;
    align-items: center;

    .prev-slider-btn {
      cursor: pointer;
      width: 2rem;
      height: 2rem;
      flex-shrink: 0;
    }

    .next-slider-btn {
      cursor: pointer;
      width: 2rem;
      height: 2rem;
      flex-shrink: 0;
    }

    .slider-group-items {
      height: 100%;
    }
  }

  .slider-group-arrows {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    max-width: 100%;
    overflow: hidden;
    transition: all 0.3s ease;
    visibility: hidden;
    opacity: 0;

    .prev-slider-btn {
      cursor: pointer;
      width: 2rem;
      height: 2rem;
      flex-shrink: 0;
    }

    .slider-group-dots {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      max-width: calc(100% - 4rem);
      height: 100%;
      overflow-x: auto;

      .slider-group-dot {
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        background-color: #666;
        transition: all 0.3s ease;
        cursor: pointer;
        flex-shrink: 0;

        &:hover {
          background-color: #0f0f0f;
        }

        &.active {
          background-color: #0f0f0f;
        }
      }
    }

    .next-slider-btn {
      cursor: pointer;
      width: 2rem;
      height: 2rem;
      flex-shrink: 0;
    }
  }

  .slider-group-items {
    display: grid;
    grid-auto-flow: column;
    gap: 1rem;
    width: 100%;
    overflow: hidden;
    scroll-behavior: smooth;

    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari and Opera */
    }

    .card {
      height: 100%;
      min-height: 20rem;
      aspect-ratio: 3/4;
      border: 0.125rem solid transparent;
      border-radius: 0.5rem;
      transition: all 0.3s ease;
      background: #fff;
      box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: 500;
      color: #666;
      transform: scale(0.95);
      pointer-events: none;

      &:hover {
        transform: scale(0.97);
        box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.15);
      }

      &.selected {
        border-color: #0f0f0f;
        background: #f8f8f8;
        color: #0f0f0f;
      }

      &.canSelectCard {
        cursor: pointer;
        pointer-events: all;
      }
    }
  }
}
</style>
