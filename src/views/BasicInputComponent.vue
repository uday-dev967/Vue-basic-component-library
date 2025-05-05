<script setup>
import BasicInput from '@/components/sharedComponents/BasicInput.vue';

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
  <div class="basic-input-component-wrapper">
    <!-- :disabled='true' -->
    <!-- :readonly='true' -->
    <BasicInput
      type="url"
      :prepend="true"
      :prependInner="true"
      label="Label"
      placeholder="Placeholder"
      :append="true"
      :appendInner="true"
      :clearable="false"
      :loading="false"
      :rules="[]"
      hint="This is a hint."
      :persistentDetails="true"
      :hideSpinButtons="false"
      @prepend:click="prependClicked"
      @prependInner:click="prependInnerClicked"
      @focus="handleInputFocus"
      @blur="handleInputBlur"
      @appendInner:click="handleAppendInnerClick"
      @append:click="handleAppendClick"
    >
    </BasicInput>
  </div>
</template>

<style lang="scss" scoped>
.basic-input-component-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 31.25rem;
  height: 100%;
  margin: auto;
}
</style>
