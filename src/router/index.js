import { createRouter, createWebHashHistory } from 'vue-router';
import HomeWrapper from '../views/HomeWrapper.vue';
import LoginWrapper from '../views/LoginWrapper.vue';
import ContainingDomHeight from '../views/ContainingDomHeight.vue';
import ImageContain from '../views/ImageContain.vue';
import TableComponent from '../views/TableComponent.vue';
import BasicInputComponent from '../views/BasicInputComponent.vue';
import BasicTextAreaComponent from '../views/BasicTextAreaComponent.vue';
import FileInputComponent from '../views/FileInputComponent.vue';
import TestComponents from '../views/TestComponents.vue';
import BasicRadioComponent from '../views/BasicRadioComponent.vue';

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeWrapper,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginWrapper,
    },
    {
      path: '/containing-dom-height',
      name: 'ContainingDomHeight',
      component: ContainingDomHeight,
    },
    {
      path: '/image-contain',
      name: 'ImageContain',
      component: ImageContain,
    },
    {
      path: '/table-component',
      name: 'TableComponent',
      component: TableComponent,
    },
    {
      path: '/test-components',
      name: 'TestComponents',
      component: TestComponents,
    },
    {
      path: '/basic-input-component',
      name: 'BasicInputComponent',
      component: BasicInputComponent,
    },
    {
      path: '/text-area-component',
      name: 'TextAreaComponent',
      component: BasicTextAreaComponent,
    },
    {
      path: '/file-input-component',
      name: 'FileInputComponent',
      component: FileInputComponent,
    },
    {
      path: '/basic-radio-component',
      name: 'BasicRadioComponent',
      component: BasicRadioComponent,
    },
  ],
});

export default router;
