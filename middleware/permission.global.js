import { useStorage } from 'vue3-storage';

export default defineNuxtRouteMiddleware( async (to, from) => {
  const store = useStorage();
  const user = store.getStorageSync('user');

  // if (to.path !== '/auth/login') {
  //   if (!user.token) {
  //     return navigateTo('/auth/login')
  //   }
  // } else if (user.token && user.token?.length > 0) {
  //   return navigateTo('/');
  // }
});