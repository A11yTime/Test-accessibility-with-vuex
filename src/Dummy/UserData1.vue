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
        </div>
      </div>
    </div>
  </template>
  
  <script>
  // Import Vuex helpers
  import { mapState, mapActions } from 'vuex';
  
  export default {
    name: 'Users',
    computed: {
      ...mapState(['users', 'loading', 'error']),  // Map state to computed properties
    },
    methods: {
      ...mapActions(['fetchUsers']),  // Map actions to methods
    },
    mounted() {
      this.fetchUsers();  // Fetch users when the component is mounted
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
  
  /* Title styling with background */
  .title {
    font-size: 2.5rem;
    color: #fff; /* White text */
    margin-bottom: 20px;
    font-weight: bold;
    padding: 15px;
    background-color: #4caf50; /* Green background */
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    text-transform: uppercase;
    letter-spacing: 2px;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3); /* Light text shadow for emphasis */
  }
  
  /* Loading and error styling */
  .loading, .error {
    font-size: 1.2rem;
    font-weight: 500;
    margin: 20px 0;
  }
  
  /* Loading state */
  .loading {
    color: #ff9800;
  }
  
  /* Error state */
  .error {
    color: red;
  }
  
  /* User cards container */
  .user-cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    justify-items: center;
    padding: 0;
  }
  
  /* Each user card */
  .user-card {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 280px;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    padding: 15px;
    cursor: pointer;
  }
  
  /* User card hover effect */
  .user-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  
  /* User avatar styling */
  .user-avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 15px;
    border: 3px solid #4caf50;
  }
  
  /* User name styling */
  .user-name {
    font-size: 1.5rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 10px;
  }
  
  /* User email styling */
  .user-email {
    font-size: 1rem;
    color: #555;
    margin-bottom: 5px;
  }
  
  /* User company name styling */
  .user-company {
    font-size: 0.9rem;
    color: #777;
  }
  
  /* Responsive Design: Adjust for small screens */
  @media (max-width: 768px) {
    .user-cards {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
  
    .title {
      font-size: 2rem;
    }
  }
  </style>
  