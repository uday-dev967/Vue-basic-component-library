<script setup>
import { ref } from 'vue';
import Switch from '@/components/sharedComponents/Switch.vue';

const switchValue = ref(false);

const handleSwitchChange = (newValue) => {
    console.log('Switch value changed:', newValue);
    switchValue.value = newValue;
};
</script>

<template>
    <div class="switch-component">
        <Switch 
            v-model="switchValue"
            @change="handleSwitchChange"
            label="Toggle Switch"
            size="xs"
        />
        <Switch 
            v-model="switchValue"
            @change="handleSwitchChange"
            label="Toggle Switch"
            size="sm"
        />
        <Switch 
            v-model="switchValue"
            @change="handleSwitchChange"
            label="Toggle Switch"
            size="md"
        />
        <Switch 
            v-model="switchValue"
            @change="handleSwitchChange"
            label="Toggle Switch"
            size="lg"
        />
        <Switch 
            v-model="switchValue"
            @change="handleSwitchChange"
            label="Toggle Switch"
            size="xl"
            inset
        />
  
    </div>
</template>

<style lang="scss" scoped>
.switch-component {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    gap: 1rem;
}
</style>
