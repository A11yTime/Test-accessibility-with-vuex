<template>
  <div class="users-container">
    <h1 class="title">Users List</h1>

    <!-- Loading State -->
    <div v-if="loading" class="loading">
      <p>Loading...</p>
    </div>

    <!-- Error Message -->
    <div v-if="error" class="error">
      <p>Error: {{ error }}</p>
    </div>

    <!-- Displaying Users -->
    <div v-if="!loading && !error" class="user-cards">
      <div class="user-card" v-for="user in users" :key="user.id">
        <img :src="'https://i.pravatar.cc/150?img=' + (user.id % 70)" alt="User Avatar" class="user-avatar" />
        <div class="user-info">
          <h2 class="user-name">{{ user.name }}</h2>
          <p class="user-email">{{ user.email }}</p>
          <p class="user-company">{{ user.company.name }}</p> 
        </div>

        <button @click="deleteUser(user.id)" class="delete-btn">Delete</button>
        <button @click="editUser(user)" class="edit-btn">Edit</button>
      </div>
    </div>

    <!-- Toggle Button for Adding a New User -->
    <button @click="toggleForm" class="add-users-btn">Add New User</button>

    <!-- Modal for Add/Edit User -->
    <UserModal
      :isVisible="isAddingUser"
      :editingUser="editingUser"
      @add-user="addUser"
      @update-user="updateUser"
      @close="cancelForm"
    /> 
  </div>
</template>

<script>
import UserModal from './UserModal.vue';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Users',
  components: {
    UserModal,
  },
  computed: {
    ...mapState(['users', 'loading', 'error']),
  },
  data() {
    return {
      editingUser: null, // User being edited
      isAddingUser: false, // To toggle form visibility
    };
  },
  methods: {
    ...mapActions(['fetchUsers', 'addMoreUsers', 'deleteUser', 'updateUser']),
    
    // Toggle the modal for adding or editing a user
    toggleForm() {
      this.isAddingUser = !this.isAddingUser;
      if (!this.isAddingUser) {
        this.cancelForm();
      }
    },

    // Add a new user (called when the form is submitted)
    addUser(newUser) {
      const userToAdd = {
        id: Date.now(), // Temporary ID for new user (for demo purpose)
        name: newUser.name,
        email: newUser.email,
        company: { name: newUser.company },
      };
      this.addMoreUsers([userToAdd]); // Call Vuex action to add user
    },

    // Update an existing user
    updateUser(updatedUser) {
      this.updateUser(updatedUser); // Call Vuex action to update user
      this.cancelForm();
    },
    
    // Close the modal and reset form state
    cancelForm() {
      this.editingUser = null;
      this.isAddingUser = false;
    },

    // Delete a user by ID
    deleteUser(userId) {
      this.$store.dispatch('deleteUser', userId); // Call Vuex action to delete user
    },

    // Set the user to be edited
    editUser(user) {
      this.editingUser = { ...user };
      this.isAddingUser = true; // Open the modal for editing
    },
  },
  mounted() {
    this.fetchUsers(); // Fetch users when the component is mounted
  }
};
</script>

<style scoped>
/* General container styling */
.users-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

/* Title styling */
.title {
  font-size: 2.5rem;
  color: #fff;
  margin-bottom: 20px;
  font-weight: bold;
  padding: 15px;
  background-color: #4caf50;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* Button to delete user */
.delete-btn, .edit-btn {
  background-color: #e53935;
  color: white;
  font-size: 1rem;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s;
}

.delete-btn:hover, .edit-btn:hover {
  background-color: #c62828;
}

/* Button to add users */
.add-users-btn {
  background-color: #4caf50;
  color: white;
  font-size: 1.2rem;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s;
}

.add-users-btn:hover {
  background-color: #45a049;
}

/* Styling for user cards */
.user-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
  margin-top: 30px;
}

.user-card {
  width: 280px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.user-avatar {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
}

.user-info {
  margin-top: 10px;
}

.user-name {
  font-size: 1.5rem;
  font-weight: bold;
}

.user-email {
  font-size: 1rem;
  color: #555;
}

.user-company {
  font-size: 1rem;
  color: #777;
}
</style>
