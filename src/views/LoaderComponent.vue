<script setup>
import Loader from '@/components/sharedComponents/Loader.vue';
import { ref } from 'vue';

const activeLoader = ref('default');

const loaders = {
  default: {
    title: 'Default Loader',
    description: 'Default loader with standard size and colors',
    props: {},
  },
  customSize: {
    title: 'Custom Size and Width',
    description: 'Larger loader with thicker stroke',
    props: {
      size: 60,
      width: 6,
    },
  },
  customColors: {
    title: 'Custom Colors',
    description: 'Green loader with light background',
    props: {
      fillColor: '#4CAF50',
      emptyColor: '#E8F5E9',
      bgColor: 'rgba(255, 255, 255, 0.9)',
    },
  },
  customImage: {
    title: 'Custom Image Loader',
    description: 'Custom image as loader',
    props: {
      src: 'https://cdn-icons-png.flaticon.com/512/2942/2942789.png',
      size: 50,
      bgColor: 'rgba(255, 255, 255, 0.9)',
    },
  },
  multiple: {
    title: 'Multiple Loaders',
    description: 'Different sized loaders with different colors',
    isMultiple: true,
    loaders: [
      { size: 30, fillColor: '#FF5722' },
      { size: 40, fillColor: '#9C27B0' },
      { size: 50, fillColor: '#3F51B5' },
    ],
  },
  globalLoader: {
    title: 'Global Loader',
    description: 'Global loader that covers the entire screen',
    props: {
      fillColor: '#2196F3',
      emptyColor: '#E3F2FD',
      isLocalLoader: false,
    },
  },
};
</script>

<template>
  <div class="loader-component">
    <h1>Loader Component Examples</h1>

    <div class="loader-controls">
      <button
        v-for="(loader, key) in loaders"
        :key="key"
        :class="{ active: activeLoader === key }"
        @click="activeLoader = key"
      >
        {{ loader.title }}
      </button>
    </div>

    <div class="example-section">
      <h2>{{ loaders[activeLoader].title }}</h2>
      <div class="loader-container">
        <template v-if="loaders[activeLoader].isMultiple">
          <div class="multiple-loaders">
            <Loader v-for="(loader, index) in loaders[activeLoader].loaders" :key="index" v-bind="loader" />
          </div>
        </template>
        <Loader v-else v-bind="loaders[activeLoader].props" />
      </div>
      <div class="description">{{ loaders[activeLoader].description }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loader-component {
  max-width: 800px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 2rem;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h1 {
    color: #333;
    margin-bottom: 1rem;
  }

  .loader-controls {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
    width: 100%;
    margin-bottom: 1rem;

    button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      background-color: #fff;
      color: #666;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

      &:hover {
        background-color: #f0f0f0;
      }

      &.active {
        background-color: #2196f3;
        color: white;
      }
    }
  }

  .example-section {
    width: 100%;
    padding: 1.5rem;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

    h2 {
      color: #666;
      font-size: 1.2rem;
      margin-bottom: 1rem;
    }

    .description {
      margin-top: 0.5rem;
      font-size: 0.9rem;
      color: #666;
    }
  }

  .loader-container {
    min-height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .multiple-loaders {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: center;
  }
}
</style>
