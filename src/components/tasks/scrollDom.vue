<script setup>
import { reactive, computed, ref, onMounted, nextTick } from 'vue';
const itemsList = ref([])
let elementsData = ref([])

function onAddItemClick() {
  itemsList.value = [...itemsList.value,`ITEM ${itemsList.value.length+1}`]
  nextTick(() => {
    const parentElement = getElementDimensions('containing-dom-page-wrapper');
    const scrollParentElement = getElementDimensions('scroll-dom-wrapper');
    const bodyElement = getElementDimensions('body');
    const appElement = getElementDimensions('app');
    const scrollElement = getElementDimensions('scroll-container');
    const leftContainerElement = getElementDimensions('left-container');

    bodyElement['background']=''
    appElement['background']='background-light-pink'
    parentElement['background']='background-light-blue'
    scrollParentElement['background']='background-light-gray'
    leftContainerElement['background']='background-light-purple'
    scrollElement['background']='background-light-orange'
    elementsData.value = [bodyElement, appElement, parentElement, scrollParentElement, scrollElement, leftContainerElement, ]
    // elementsData.value = [parentElement, scrollParentElement, scrollElement, ]
    // elementsData.value = [ scrollParentElement, scrollElement ]
  })
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
</script>

<template>
  <div class="scroll-dom-wrapper" id="scroll-dom-wrapper">
    <!-- <div class="left-container" id="left-container"> -->
      <div class="scroll-container" id="scroll-container">
        <div v-for="item in itemsList" :key="item" class="item">
          {{ item }}
        </div>
      </div>
    <!-- </div> -->
    <div class="right-container">
      <div class="primary-button" @click="onAddItemClick">add item</div>
      <div class="data-list-wrapper">
        <div v-for="elementData in elementsData" :key="elementData.key" :class="['data-wrapper', elementData.background]" >
          <div class="head">{{ elementData.key }}</div>
          <div class="data">height: <span>{{elementData.height}}</span></div>
          <div class="data">width: <span>{{elementData.width}}</span></div>
          <div class="data">overflowX: <span>{{elementData.overflowX}}</span></div>
          <div class="data">overflowY: <span>{{elementData.overflowY}}</span></div>
        </div>
      </div>
    </div>
    <!-- <div class="extra-block">
      EXTRA BLOCK
    </div> -->
  </div>
</template>

<style scoped lang="scss">
.scroll-dom-wrapper {
  display: grid;
  grid-template-columns: 40% 1fr;
  gap: 1rem;
  width: 100%;
  padding: 1rem;
  background: $background-7 !important;
  // height: 100%;
  .left-container {
    height: 100%;
    width: 100%;
    padding: 1rem;
    background: $background-15 !important;
  }
  .scroll-container {
    width: 100%;
    border: 2px solid $color-11;
    padding: 1rem;
    background: $background-16 !important;
    // height: 100%;
    // overflow: auto;
    .item {
      width: 100%;
      height: 100px;
      border: 1px solid $border-1;
      background: $background-1;
      box-shadow: 0px 1px 30px 0px rgba(0, 0, 0, 0.02);
      margin-bottom: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 30px;
      border-radius: 0.5rem;
    }
  }
  .data-list-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-top: 1rem;
    .data-wrapper {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      border: 1px solid $border-1;
      background: $background-1;
      border-radius: 1rem;
      box-shadow: 0px 1px 30px 0px rgba(0, 0, 0, 0.02);
      padding: 0.75rem;
      border: 1px solid $border-4;
      .data {
        font-size: 1rem;
        span {
          font-size: 1rem;
          color: $color-4;
        }
      }
      .head {
        margin-bottom: 0.75rem;
        font-size: 1.25rem;
        text-align: center;
        color: $color-10;
      }
    }
  }
  .extra-block {
    grid-column: 1/-1;
    width: 100%;
    border: 2px solid $color-11;
    padding: 1rem;
    height: 500px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3rem;
  }
}
</style>

<style lang="scss">
#app {
  background: $background-12 !important;
  padding: 1rem;
}
</style>
