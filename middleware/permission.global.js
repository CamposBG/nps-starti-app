import {
  state,
  setToken
} from '../store/auth';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const nuxtApp = useNuxtApp();

  const token = state.token;

  if (to.path !== '/auth/login') {
    if (!token || token.length === 0) {
      return navigateTo('/auth/login')
    }
  } else if (token && token.length > 0) {
    return navigateTo('/');
  }
}) 