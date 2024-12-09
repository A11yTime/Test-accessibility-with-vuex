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
        
        <!-- Delete Button -->
        <button @click="deleteUser(user.id)" class="delete-btn">Delete</button>
        
        <!-- Edit Button to open form for updating user -->
        <button @click="editUser(user)" class="edit-btn">Edit</button>
      </div>
    </div>

    <!-- Add New Users Button -->
    <button @click="addUsersManually" class="add-users-btn">Add New Users</button>

    <!-- Update User Form (appears when editing a user) -->
    <div v-if="editingUser" class="edit-form">
      <h2>Edit User</h2>
      <form @submit.prevent="updateUser">
        <label for="name">Name:</label>
        <input v-model="editingUser.name" type="text" id="name" required />

        <label for="email">Email:</label>
        <input v-model="editingUser.email" type="email" id="email" required />

        <label for="company">Company:</label>
        <input v-model="editingUser.company.name" type="text" id="company" required />

        <button type="submit" class="submit-btn">Update User</button>
        <button type="button" @click="cancelEdit" class="cancel-btn">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Users',
  computed: {
    ...mapState(['users', 'loading', 'error']),
  },
  data() {
    return {
      editingUser: null, // This will hold the user currently being edited
    };
  },
  methods: {
    ...mapActions(['fetchUsers', 'addMoreUsers', 'deleteUser', 'updateUser']),
    
    // Manually add new users
    addUsersManually() {
      const newUsers = [
        { id: 11, name: 'New User 1', email: 'newuser1@example.com', company: { name: 'New Company 1' } },
        { id: 12, name: 'New User 2', email: 'newuser2@example.com', company: { name: 'New Company 2' } },
      ];
      this.addMoreUsers(newUsers);
    },

    // Delete a user by id
    deleteUser(userId) {
      this.deleteUser(userId);
    },

    // Start editing a user
    editUser(user) {
      this.editingUser = { ...user };  // Make a copy of the user to edit
    },

    // Update the user
    updateUser() {
      this.updateUser(this.editingUser); // Dispatch the update action
      this.editingUser = null; // Reset editing state
    },

    // Cancel editing
    cancelEdit() {
      this.editingUser = null; // Reset editing state without saving changes
    },
  },
  mounted() {
    this.fetchUsers();
  },
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

/* Edit user form styling */
.edit-form {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

.edit-form input {
  margin-bottom: 10px;
  padding: 8px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.submit-btn, .cancel-btn {
  background-color: #4caf50;
  color: white;
  font-size: 1rem;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.submit-btn:hover, .cancel-btn:hover {
  background-color: #45a049;
}
</style>
