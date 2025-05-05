<script setup>
import TextArea from '@/components/sharedComponents/TextArea.vue';

const prependClicked = (e) => {
  console.log('prependClicked');
};

const prependInnerClicked = (e) => {
  console.log('prependInnerClicked');
};

const handleInputFocus = (e) => {
  console.log('handleInputFocus', e);
};

const handleInputBlur = (e) => {
  console.log('handleInputBlur', e);
};

const handleAppendInnerClick = (e) => {
  console.log('handleAppendInnerClick');
};

const handleAppendClick = (e) => {
  console.log('handleAppendClick');
};
</script>

<template>
  <div class="basic-text-area-component-wrapper">
    <TextArea
      label="Label"
      placeholder="Placeholder"
      :clearable="false"
      :hideSpinButtons="false"
      @prepend:click="prependClicked"
      @prependInner:click="prependInnerClicked"
      @focus="handleInputFocus"
      @blur="handleInputBlur"
      @appendInner:click="handleAppendInnerClick"
      @append:click="handleAppendClick"
      :counter="true"
      :maxRows="5"
    />
  </div>
</template>

<style lang="scss" scoped>
.basic-text-area-component-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 31.25rem;
  height: 100%;
  margin: auto;
  align-items: center;
  justify-content: center;
}
</style>
