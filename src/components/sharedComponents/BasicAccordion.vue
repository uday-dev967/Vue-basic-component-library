<template>
  <div class="accordion-container">
    <div class="accordion-header" @click="toggleAccordion">
      <div class="accordion-name">{{ accordionTextRef }}</div>
      <div class="accordion-drop-icon" :class="{ 'isOpen': isOpen }">
        <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M0.167367 0.504188C0.390524 0.276382 0.752333 0.276382 0.975489 0.504188L4 3.59171L7.02451 0.504188C7.24767 0.276382 7.60948 0.276382 7.83263 0.504188C8.05579 0.731993 8.05579 1.10134 7.83263 1.32915L4.40406 4.82915C4.1809 5.05695 3.8191 5.05695 3.59594 4.82915L0.167367 1.32915C-0.0557894 1.10134 -0.0557894 0.731994 0.167367 0.504188Z" fill="#E9BEB3"/>
        </svg>
      </div>
    </div>
    <div v-show="isOpen" class="accordion-content-wrapper">
      <slot name="accordionContent"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  accordionTextRef: {
    type: String,
    required: false,
    default: "",
  },
  isTextRefI18: {
    type: Boolean,
    required: false,
    default: false,
  }
});

const isOpen = ref(true);

const toggleAccordion = () => {
  isOpen.value = !isOpen.value;
};
</script>

<style lang="scss" scoped>
.accordion-container{
  .accordion-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    .accordion-name{
      color: gold;
      font-size: .625rem;
    }
    .accordion-drop-icon{
      display: flex;
      justify-content: center;
      align-items: center;
      transform: rotate(0deg);
    }
    .isOpen {
      transform: rotate(180deg);
    }

  }
}
</style>