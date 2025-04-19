<script setup>
import scrollDom from "../components/tasks/scrollDom.vue"

const homeElement = document.getElementById('containing-dom-page-wrapper')


</script>

<template>
  <div class="containing-dom-page-wrapper" id="containing-dom-page-wrapper">
    <scrollDom />
  </div>
</template>

<style scoped lang="scss">
.containing-dom-page-wrapper {
  // height: 100%;
  padding: 1rem;
  width: 100%;
  background: $background-8 !important;
}
</style>