<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useCommonUtilities } from '@/composables/useCommonUtilities';

const Tasks = [
  { name: 'Containing Dom Height', value: '/containing-dom-height' },
  { name: 'Containing Img Width Height', value: '/image-contain' },
];
const isOpen = ref(false);
const searchVal = ref('');
const { goToRoute } = useCommonUtilities();
let tasksDropdownContainer = ref(null);
let tasksDropdown = ref(null);

const handleBlur = (e) => {
  isOpen.value = false;
  // checkDropdownOutsideClick(e);
};
const handleItemClick = (e, val) => {
  console.log(e.target)
  isOpen.value = false;
  goToRoute(val);
};

const searchResult = computed(() => {
  const searchTerms = searchVal.value.toLowerCase().split(' ');
  return  searchVal.value
    ? Tasks.filter((task) =>
        searchTerms.every((term) => task.name.toLowerCase().includes(term) || task.value.toLowerCase().includes(term))
      )
    : Tasks;
});

// function checkDropdownOutsideClick({ target }) {
//   console.log('contain', tasksDropdownContainer.value.contains(target));
//   console.log('target', target);
//   if (!tasksDropdownContainer.value.contains(target)) {
//     isOpen.value = false;
//   }
// }

function checkDropdownOutsideClick({ relatedTarget }) {
  console.log('equal node', tasksDropdown.value?.isEqualNode(relatedTarget));
  console.log('contain', tasksDropdown.value?.contains(relatedTarget));
  console.log('target', relatedTarget);

  if (tasksDropdown.value?.contains(relatedTarget) || tasksDropdown.value.isEqualNode(relatedTarget)) {
    return;
  }
  isOpen.value = false;
}
</script>

<template>
  <div ref="tasksDropdown" class="dropdown-component-wrapper" :class="{ 'is-open': isOpen }" tabindex="-1" @blur="handleBlur">
    <div class="header" @click.stop="isOpen = !isOpen">
      <div class="header-title">Frontend Demo Tasks</div>
      <!-- <input
        :style="{ position: 'absolute', top: '0', left: 0, bottom: 0, borderRadius: '100px', padding: '10px' }"
        type="text"
        @click.stop
        @blur="handleBlur"
      /> -->
      <div class="toggle-icon iwpar">
        <svg
          width="20px"
          height="24px"
          viewBox="0 0 20 20"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          fill="#ffffff"
          stroke="#ffffff"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke="#ffffffffCCCCCC"
            stroke-width="0.24"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <title>arrow_down [#ffffffff360]</title>
            <desc>Created with Sketch.</desc>
            <defs></defs>
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="Dribbble-Light-Preview" transform="translate(-140.000000, -6599.000000)" fill="#ffffffff">
                <g id="icons" transform="translate(56.000000, 160.000000)">
                  <path
                    d="M103.707257,6450.11258 C104.097581,6449.72125 104.097581,6449.0877 103.707257,6448.69736 C103.316933,6448.30603 102.685027,6448.30603 102.295701,6448.69736 L95.8578462,6455.14292 C95.5433906,6455.4582 94.9983342,6455.235 94.9983342,6454.78962 L94.9983342,6439.98385 C94.9983342,6439.43137 94.5590946,6439 94.0080486,6439 L94.0040555,6439 C93.4530095,6439 93.0017907,6439.43137 93.0017907,6439.98385 L93.0017907,6454.78962 C93.0017907,6455.235 92.4717084,6455.4582 92.1572528,6455.14292 L85.7004312,6448.66634 C85.3111053,6448.275 84.6811958,6448.275 84.2908715,6448.66634 L84.2918698,6448.66634 C83.9025438,6449.05667 83.9025438,6449.69022 84.2928681,6450.08156 L92.6034803,6458.41374 L92.6034803,6458.41374 C93.3831305,6459.19542 94.6479408,6459.19542 95.427591,6458.41374 C95.6072799,6458.23259 103.887944,6449.93143 103.707257,6450.11258"
                    id="arrow_down-[#ffffffff360]"
                  ></path>
                </g>
              </g>
            </g>
          </g>
        </svg>
      </div>
    </div>
    <div class="dropdown-items-container" ref="tasksDropdownContainer">
      <div class="search-wrapper">
        <input class="strip-input-default-styles" type="text" placeholder="Search task..." v-model="searchVal" @blur="handleBlur"/>
      </div>

      <div class="item-list" v-if="searchResult?.length">
        <div class="items" v-for="task in searchResult" :key="task.value" @click.stop="handleItemClick($event,task.value)">
          <div class="task">{{ task.name }}</div>
          <svg
            fill="#000000"
            height="20px"
            width="20px"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 24 24"
            xml:space="preserve"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <polygon
                points="12,7 13,7 13,9 15,9 15,11 3,11 3,13 15,13 15,15 13,15 13,17 12,17 12,19 15,19 15,17 17,17 17,15 19,15 19,14 20,14 20,13 21,13 21,11 20,11 20,10 19,10 19,9 17,9 17,7 15,7 15,5 12,5 "
              ></polygon>
            </g>
          </svg>
        </div>
      </div>
      <div class="no-result" v-else>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          shape-rendering="geometricPrecision"
          text-rendering="geometricPrecision"
          image-rendering="optimizeQuality"
          fill-rule="evenodd"
          clip-rule="evenodd"
          viewBox="0 0 424 511.51"
        >
          <path
            fill-rule="nonzero"
            d="M174.43 443.27H21.31C9.54 443.27 0 433.73 0 421.97V21.3C0 9.51 9.52 0 21.31 0h200.94c3.64 0 6.97 1.66 9.15 4.36l104.84 102.09c5.64 5.64 8.62 10.07 8.62 11.43l-.02 135.35c-7.59-3.2-15.53-5.72-23.76-7.49l-.01-113.62h-98.82c-6.64 0-11.94-5.41-11.94-11.95V23.69H23.8v395.78h140.26c2.7 8.32 6.18 16.28 10.37 23.8zm118.07-169.1c28.59 0 54.48 11.59 73.22 30.33 18.75 18.74 30.33 44.63 30.33 73.23 0 20.92-6.2 40.39-16.87 56.68L424 483.26l-30.9 28.25-43.23-47.56c-16.42 10.95-36.15 17.34-57.37 17.34-28.6 0-54.49-11.6-73.22-30.34-18.75-18.74-30.34-44.63-30.34-73.22 0-28.6 11.59-54.49 30.33-73.23 18.74-18.74 44.63-30.33 73.23-30.33zm59.62 43.93c-15.25-15.26-36.33-24.7-59.62-24.7s-44.37 9.44-59.62 24.7c-15.26 15.26-24.7 36.34-24.7 59.63 0 23.28 9.44 44.37 24.7 59.62 15.25 15.26 36.33 24.69 59.62 24.69s44.37-9.43 59.62-24.69c15.26-15.26 24.7-36.34 24.7-59.62 0-23.29-9.44-44.37-24.7-59.63zm-36.35 21.39 14.49 14.57-23.37 23.67 23.39 23.69-14.53 14.49-23.25-23.54-23.27 23.58-14.49-14.57 23.36-23.67-23.38-23.69 14.53-14.49 23.24 23.54 23.28-23.58z"
          />
        </svg>

        <div class="no-result-text">Tasks not found.</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dropdown-component-wrapper {
  display: flex;
  flex-direction: column;
  width: 20rem;
  background: transparent;
  max-height: 25.75rem;
  gap: 1.25rem;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1.25rem;
    border-radius: 12.5rem;
    background-color: $background-13;
    color: $color-white;
    position: relative;
    cursor: pointer;

    &-title {
      text-align: center;
      font-size: 1rem;
      font-style: normal;
      font-weight: 400;
      line-height: 150%; /* 36px */
      font-family: $roboto-font;
    }
    .toggle-icon {
      cursor: pointer;
      width: 1.25rem;
      height: 1.5rem;
      transform: rotate(180deg);
      transition: transform 0.3s;
    }
  }

  .dropdown-items-container {
    display: none;
    flex-direction: column;
    gap: 0.75rem;
    padding: 0.75rem 0 0 1.25rem;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
    border-radius: 10px;
    background-color: $background-white;
    flex-grow: 1;
    overflow: hidden;
  }

  .search-wrapper {
    border-bottom: 0.0156rem dotted rgba($border-5, 0.3);
    color: $color-15;
    padding: 0.3125rem 0 0.75rem 0;
    margin-right: 1.25rem;
    display: flex;
    align-items: center;
    gap: 2rem;

    .search-text {
      color: $color-15;
      font-family: $roboto-font;
      font-size: 1.125rem;
      background: transparent;
      flex-grow: 1;
    }

    input {
      color: $color-15;
      font-family: $roboto-font;
      font-size: 1.125rem;
      background: transparent;
      flex-grow: 1;
    }

    svg {
      width: 1.25rem;
      height: 1.25rem;
      cursor: pointer;
    }
  }

  .item-list {
    display: flex;
    flex-direction: column;
    overflow: auto;
    flex-grow: 1;
    padding-right: 1.25rem;
    margin-bottom: 0.25rem;
    min-height: 12.5rem;
    & > :last-child {
      margin-bottom: 0.5rem;
    }

    .items {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.75rem 0 0.75rem 0;
      gap: 1.25rem;
      cursor: pointer;

      .task {
        font-size: 1rem;
        font-style: normal;
        font-weight: 400;
        line-height: 150%; /* 36px */
        font-family: $roboto-font;
        flex-grow: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-transform: ca;
      }
      &:not(:last-child) {
        border-bottom: 0.0156rem solid rgba($border-5, 0.1);
      }
    }
  }

  .no-result {
    height: 12.5rem;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 0.25rem;
    margin-right: 1.25rem;

    svg {
      width: 3.125rem;
    }

    .no-result-text {
      text-align: center;
      font-size: 1.5rem;
      font-style: normal;
      font-weight: 500;
      line-height: 150%; /* 36px */
      font-family: $roboto-font;
    }
  }

  &.is-open {
    .header {
      .toggle-icon {
        transform: rotate(0deg);
      }
    }
    .dropdown-items-container {
      display: flex;
    }
  }
}
</style>
