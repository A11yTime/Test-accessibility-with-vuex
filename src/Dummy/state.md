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
    addUsers(state, newUsers) {
      state.users.push(...newUsers);
    },
    removeUser(state, userId) {
      state.users = state.users.filter(user => user.id !== userId);
    },
    updateUser(state, updatedUser) {
      const index = state.users.findIndex(user => user.id === updatedUser.id);
      if (index !== -1) {
        // Update the user in the users array
        state.users[index] = updatedUser;
      }
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
      commit('setLoading', true);
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        commit('setUsers', response.data);
      } catch (error) {
        commit('setError', error.message);
      } finally {
        commit('setLoading', false);
      }
    },

    addMoreUsers({ commit }, newUsers) {
      commit('addUsers', newUsers);
    },

    deleteUser({ commit }, userId) {
      commit('removeUser', userId);
    },

    updateUser({ commit }, updatedUser) {
      commit('updateUser', updatedUser);  // Commit the mutation to update the user
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
