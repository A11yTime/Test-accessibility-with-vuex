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
  
      <!-- Add/Edit User Form -->
      <div v-if="isAddingUser" class="add-user-form">
        <h2>{{ editingUser ? 'Edit User' : 'Add New User' }}</h2>
        <form @submit.prevent="editingUser ? submitEdit() : submitForm">
          <label for="name">Name:</label>
          <input v-model="name" type="text" id="name" required />
  
          <label for="email">Email:</label>
          <input v-model="email" type="email" id="email" required />
  
          <label for="company">Company:</label>
          <input v-model="company" type="text" id="company" required />
  
          <button type="submit" class="submit-btn">{{ editingUser ? 'Update User' : 'Add User' }}</button>
          <button type="button" @click="editingUser ? cancelEdit() : cancelForm()" class="cancel-btn">Cancel</button>
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
  
      // Computed properties for form binding
      name: {
        get() {
          return this.editingUser ? this.editingUser.name : this.newUser.name;
        },
        set(value) {
          if (this.editingUser) {
            this.editingUser.name = value;
          } else {
            this.newUser.name = value;
          }
        }
      },
      email: {
        get() {
          return this.editingUser ? this.editingUser.email : this.newUser.email;
        },
        set(value) {
          if (this.editingUser) {
            this.editingUser.email = value;
          } else {
            this.newUser.email = value;
          }
        }
      },
      company: {
        get() {
          return this.editingUser ? this.editingUser.company : this.newUser.company;
        },
        set(value) {
          if (this.editingUser) {
            this.editingUser.company = value;
          } else {
            this.newUser.company = value;
          }
        }
      }
    },
    data() {
      return {
        newUser: {
          name: '',
          email: '',
          company: '',
        },
        editingUser: null, // User being edited
        isAddingUser: false, // To toggle form visibility
      };
    },
    methods: {
      ...mapActions(['fetchUsers', 'addMoreUsers', 'deleteUser', 'updateUser']),
      
      toggleForm() {
        this.isAddingUser = !this.isAddingUser;
        if (!this.isAddingUser) {
          this.cancelForm();
        }
      },
      
      submitForm() {
        if (this.newUser.name && this.newUser.email && this.newUser.company) {
          const newUser = {
            id: Date.now(), // Temporary ID for new user
            name: this.newUser.name,
            email: this.newUser.email,
            company: { name: this.newUser.company },
          };
          
          this.addMoreUsers([newUser]);
          
          // Reset form fields
          this.newUser.name = '';
          this.newUser.email = '';
          this.newUser.company = '';
          this.isAddingUser = false;
        } else {
          alert("Please fill in all fields.");
        }
      },
      
      submitEdit() {
        if (this.editingUser) {
          this.updateUser(this.editingUser);
          this.cancelEdit();
        }
      },
      
      cancelForm() {
        this.newUser.name = '';
        this.newUser.email = '';
        this.newUser.company = '';
        this.isAddingUser = false;
      },
  
      cancelEdit() {
        this.editingUser = null;
        this.isAddingUser = false;
      },
  
      deleteUser(userId) {
        this.deleteUser(userId);
      },
  
      editUser(user) {
        this.editingUser = { ...user };
        this.isAddingUser = true;
      }
    },
    mounted() {
      this.fetchUsers();
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
  
  /* Add New User Form */
  .add-user-form {
    margin-top: 30px;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .add-user-form form {
    max-width: 400px;
    margin: 0 auto;
    text-align: left;
  }
  
  .add-user-form input {
    margin-bottom: 10px;
    padding: 8px;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .submit-btn {
    background-color: #4caf50;
    color: white;
    font-size: 1rem;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
  }
  
  .submit-btn:hover {
    background-color: #45a049;
  }
  
  .cancel-btn {
    background-color: #e53935;
    color: white;
    font-size: 1rem;
    padding: 8px 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
  }
  
  .cancel-btn:hover {
    background-color: #c62828;
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
  