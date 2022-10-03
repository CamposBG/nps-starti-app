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
  // ...store
} = createStore('user', STATE, {
  allowOverwrite: true
});

export const token = getter('token', state => {
  return state.token
});

export const setToken = mutation<string>('setToken', (state, payload: string) => {
  console.log({payload})
  state.token = payload;
});