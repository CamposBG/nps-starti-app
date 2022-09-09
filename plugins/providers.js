import { defineNuxtPlugin, useState } from '#app'
import Harlem from '@harlem/core'

export default defineNuxtPlugin((nuxtApp) => {
  if (useState('beforeEach').value === undefined) {
    useState('beforeEach', () => 'ok');

      nuxtApp.$router.options.scrollBehavior = () => ({
        left: 0,
        top: 0
      });

      nuxtApp.vueApp.use(Harlem);

      nuxtApp.$router.beforeEach(async (to, from, next) => {
        next();
      })
  }
});