// src/store.js
import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state() {
    return {
      users: [],
      loading: false,
      error: null,
    };
  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    setError(state, error) {
      state.error = error;
    },
  },
  actions: {
    async fetchUsers({ commit }) {
      commit('setLoading', true);  // Start loading

      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        commit('setUsers', response.data);  // Commit the fetched data
      } catch (error) {
        commit('setError', error.message);  // Commit any error that occurred
      } finally {
        commit('setLoading', false);  // End loading
      }
    },
  },
  getters: {
    allUsers(state) {
      return state.users;
    },
    isLoading(state) {
      return state.loading;
    },
    errorMessage(state) {
      return state.error;
    },
  },
});

export default store;
