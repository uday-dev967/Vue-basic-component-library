<script setup>
import BasicInput from '@/components/sharedComponents/BasicInput.vue';
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
  <div class="test-components">
    <!-- :disabled='true' -->
    <!-- :readonly='true' -->
    <!-- <BasicInput
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
    </BasicInput> -->
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
    >
    </TextArea>
  </div>
</template>

<style lang="scss" scoped>
.test-components {
  width: 100%;
  height: 100%;
  border: 1px solid #f00;
  width: 30.75rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
