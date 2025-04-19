<script setup></script>

<template>
  <div class="image-contain-wrapper">
    <div class="img-container flex-center">
      <img src="https://picsum.photos/1200/1600" alt="" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.image-contain-wrapper {
  height: 100%;
  width: 100%;
  display: grid;
  place-items: center;
  overflow: hidden;
  background-color: $background-14;

  .img-container {
    border: 3px solid $color-15;
    width: 90%;
    height: 90%;
    overflow: auto;

    img {
      //   display: block;

      //   width: 100%;
      //   height: 100%;
      //   width: auto;
      //   height: auto;

      //   object-fit: contain;
      //   object-fit: cover;
      //   object-fit: fill;

      //   max-width: 100%;
      //   max-height: 100%;
    }
  }
}
</style>
