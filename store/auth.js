import {
  createStore
} from '@harlem/core';

const STATE = {
  token: ''
};

export const {
  state,
  getter,
  mutation,
  ...store
} = createStore('user', STATE);

export const token = getter('token', state => {
  return state.token
});

export const setToken = mutation('set-token', (state, payload) => {
  state.token = payload;
});