<script setup>
import FileInput from '@/components/sharedComponents/FileInput.vue';
import { ref } from 'vue';
const files = ref(null);
const handleInput = (e) => {
  console.log(e);
  files.value = e;
};
const handlePrependClick = (e) => {
  console.log('prepend click');
};
const handlePrependInnerClick = (e) => {
  console.log('prepend inner click');
};
const handleAppendClick = (e) => {
  console.log('append click');
};
const handleAppendInnerClick = (e) => {
  console.log('append inner click');
};
</script>

<template>
  <div class="file-input-demo">
    <FileInput
      label="Upload Files"
      :value="files"
      :prepend="true"
      :prepend-inner="true"
      :append="true"
      :append-inner="true"
      :maxFiles="2"
      :accept="'.png, .jpg, .jpeg'"
      :maxSize="10485760"
      :chip="true"
      :multiple="true"
      @input="handleInput"
      @append:click="handleAppendClick"
      @appendInner:click="handleAppendInnerClick"
    >
    </FileInput>
  </div>
</template>

<style lang="scss" scoped>
.file-input-demo {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}
</style>
