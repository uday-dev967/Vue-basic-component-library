<script setup>
import { reactive, computed, ref } from 'vue';
const elementIdList = [
  {id: "body"},
  {id: "containing-dom-page-wrapper"},
  {id: "scroll-dom-wrapper"},
  {id: "app"},

]

// List of buttons with styleId, elementId, and label
const stylesButtonsList = reactive([
  // { id: 1, styleId: 'gridLayout', elementId: 'body', label: 'Grid Layout' },
  { id: 2, styleId: 'flexColumn', elementId: 'body', label: 'Flex Column Layout' },
  { id: 3, styleId: 'hiddenOverflow', elementId: 'body', label: 'Hidden Overflow' },
  { id: 4, styleId: 'fullSize', elementId: 'body', label: 'Full Size (100%)' },
  { id: 5, styleId: 'fullViewportHeight', elementId: 'body', label: 'Full Viewport Height' },
  { id: 6, styleId: 'height50rem', elementId: 'body', label: 'Height 50rem' }
]);

// List of styles, referenced by styleId
const stylesList = reactive([
  // { id: 'gridLayout', styles: { display: 'grid' } },
  { id: 'flexColumn', styles: { display: 'flex', flexDirection: 'column' } },
  { id: 'hiddenOverflow', styles: { overflow: 'hidden' } },
  { id: 'fullSize', styles: { height: '100%', width: '100%' } },
  { id: 'fullViewportHeight', styles: { height: '100vh', width: '100%' } },
  { id: 'height50rem', styles: { height: '50rem', width: '100%' } }
]);

// Store applied styles to manage toggle behavior
const appliedStyles = reactive({});
const activeStylesButton = reactive({});
const itemsList = ref([])
const elementsData = computed(() => {
  const parentElement = getElementDimensions('containing-dom-page-wrapper');
  const scrollElement = getElementDimensions('scroll-dom-wrapper');
  const bodyElement = getElementDimensions('body');
  const appElement = getElementDimensions('app');
  return [bodyElement, appElement, parentElement, scrollElement]
})

// Function to toggle styles when a button is clicked
function toggleStyles(button, elementId) {
  const {id, styleId} = button
  const styleObj = stylesList.find(style => style.id === styleId);
  if (styleObj) {
    const element = document.querySelector(elementId);
    if (element) {
      if (appliedStyles[styleId]) {
        // If already applied, remove the styles
        Object.keys(styleObj.styles).forEach(prop => {
          element.style[prop] = '';
        });
        delete appliedStyles[styleId];
        delete activeStylesButton[id];
      } else {
        // Apply the styles
        Object.assign(element.style, styleObj.styles);
        appliedStyles[styleId] = true;
        activeStylesButton[id] = id
      }
    } else {
      console.error(`Element with id '${elementId}' not found.`);
    }
  } else {
    console.error(`Style with id '${styleId}' not found.`);
  }
}


function getElementDimensions(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    const elementRect = element.getBoundingClientRect();
    const computedStyles = getComputedStyle(element);

    return {
      key: elementId,
      height: elementRect.height,
      width: elementRect.width,
      display: computedStyles.display,
      overflowX: computedStyles.overflowX,
      overflowY: computedStyles.overflowY
    };
  }
  return {};
}

function onAddItemClick() {
  itemsList.value = [...itemsList.value,`ITEM ${itemsList.value.length+1}`]
}

</script>

<template>
  <div class="scroll-dom-wrapper" id="scroll-dom-wrapper">
    <div class="scroll-container">
      <div v-for="item in itemsList" :key="item" class="item">
        {{ item }}
      </div>
    </div>
    <div class="dom-data-wrapper">
      <div class="style-buttons-wrapper">
        <div v-for="element in elementIdList" :key="element.id" class="">
          <div class="">{{ element.id }}</div>
          <div class="button-list-wrapper">
            <div v-for="button in stylesButtonsList" :key="button.id" class="secondary-button" :class="{'active-button': (activeStylesButton[button.id] === button.id && element.id === button.elementId) }" @click="toggleStyles(button, element.id)">{{ button.label }}</div>
          </div>
        </div>
        <div class=""></div>
      </div>
      <div class="primary-button" @click="onAddItemClick">add item</div>
      <div class="data-list-wrapper">
        <div v-for="elementData in elementsData" :key="elementData.key" class="data-wrapper">
          <div class="">Element name: {{ elementData.key }}</div>
          <dvi class="">height: elementData.height</dvi>
          <dvi class="">width: elementData.width</dvi>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.scroll-dom-wrapper {
  display: grid;
  grid-template-columns: 40% 1fr;
  gap: 1rem;
  width: 100%;
  padding: 1rem;
  .scroll-container {
    width: 100%;
    .item {
      width: 100%;
      height: 100px;
      border: 1px solid $border-1;
      background: $background-1;
      box-shadow: 0px 1px 30px 0px rgba(0, 0, 0, 0.02);
    }
  }
  .dom-data-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .style-buttons-wrapper {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      .button-list-wrapper {
        display: flex;
        gap: 0.5rem;
        .active-button {
          color: $color-4;
          border: 1px solid $color-4;
        }
      }
    }
    .data-list-wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.5rem;
      .data-wrapper {}
    }
  }
  &.scroll-container-1 {
    display: flex;
    height: 100%;
    width: 100%;
  }
  &.scroll-container-2 {
    height: 100vh;
    width: 100%
  }
  &.scroll-container-3 {
    height: 50rem;
  }
}
</style>
