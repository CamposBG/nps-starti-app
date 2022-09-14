import Vue3Storage, { StorageType } from 'vue3-storage';
import mitt from 'mitt';
import Harlem from '@harlem/core'
import { Vue3ProgressPlugin } from '@marcoschulte/vue3-progress';
import { defineNuxtPlugin, useState } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  if (useState('beforeEach').value === undefined) {
    useState('beforeEach', () => 'ok');

      nuxtApp.$router.options.scrollBehavior = () => ({
        left: 0,
        top: 0
      });

    nuxtApp.provide('bus', mitt());


    nuxtApp.vueApp.use(Vue3Storage, { namespace: 'nps_', storage: StorageType.Local });
    nuxtApp.vueApp.use(Vue3ProgressPlugin);
    nuxtApp.vueApp.use(Harlem);

    nuxtApp.$router.beforeEach(async (to, from, next) => {
      next();
    })
  }
});