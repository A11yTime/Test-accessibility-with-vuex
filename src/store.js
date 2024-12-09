import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state() {
    return {
      users: [],     // Store the list of users
      loading: false, // Store loading state
      error: null,    // Store any error message
    };
  },
  mutations: {
    // Set the list of users
    setUsers(state, users) {
      state.users = users;
    },
    // Add a list of users
    addUsers(state, newUsers) {
      state.users.push(...newUsers);
    },
    // Add a single user to the state
    addUser(state, newUser) {
      state.users.push(newUser);
    },
    // Remove a user from the state by ID
    removeUser(state, userId) {
      state.users = state.users.filter(user => user.id !== userId);
    },
    // Update an existing user's information
    updateUser(state, updatedUser) {
      const index = state.users.findIndex(user => user.id === updatedUser.id);
      if (index !== -1) {
        state.users[index] = updatedUser;
      }
    },
    // Set the loading state (used during fetch operations)
    setLoading(state, loading) {
      state.loading = loading;
    },
    // Set any error message
    setError(state, error) {
      state.error = error;
    },
  },
  actions: {
    // Fetch all users from the API
    async fetchUsers({ commit }) {
      commit('setLoading', true);
      try {
        const response = await axios.get('/api/users'); // Make the API request to fetch users
        commit('setUsers', response.data); // Store the fetched users in state
      } catch (error) {
        commit('setError', error.message); // In case of error, set the error message
      } finally {
        commit('setLoading', false); // Turn off loading state
      }
    },

    // Add new users to the API and state
    async addMoreUsers({ commit }, newUsers) {
      commit('setLoading', true);
      try {
        // API request to add users
        const response = await axios.post('/api/users', newUsers); // Assume this returns the newly created user(s)
        commit('addUsers', response.data); // Assuming response.data contains the added user(s)
      } catch (error) {
        commit('setError', error.message); // Handle error
      } finally {
        commit('setLoading', false); // Turn off loading state
      }
    },

    // Add a single user to the API and state
    async addUser({ commit }, newUser) {
      commit('setLoading', true);
      try {
        const response = await axios.post('/api/users', newUser); // API request to add user
        commit('addUser', response.data); // Add the new user to the state
      } catch (error) {
        commit('setError', error.message); // Handle error
      } finally {
        commit('setLoading', false); // Turn off loading state
      }
    },

    // Delete a user by ID
    async deleteUser({ commit }, userId) {
      commit('setLoading', true);
      try {
        await axios.delete(`/api/users/${userId}`); // API request to delete user
        commit('removeUser', userId); // Remove the user from the state
      } catch (error) {
        commit('setError', error.message); // Handle error
      } finally {
        commit('setLoading', false); // Turn off loading state
      }
    },

    // Update an existing user
    async updateUser({ commit }, updatedUser) {
      commit('setLoading', true);
      try {
        const response = await axios.put(`/api/users/${updatedUser.id}`, updatedUser); // API request to update user
        commit('updateUser', response.data); // Update the user in the state
      } catch (error) {
        commit('setError', error.message); // Handle error
      } finally {
        commit('setLoading', false); // Turn off loading state
      }
    },
  },
  getters: {
    // Get the list of all users
    allUsers(state) {
      return state.users;
    },

    // Get the loading state
    isLoading(state) {
      return state.loading;
    },

    // Get the error message
    errorMessage(state) {
      return state.error;
    },
  },
});

export default store;
