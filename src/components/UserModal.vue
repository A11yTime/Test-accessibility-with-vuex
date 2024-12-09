<template>
  <div
    v-if="isVisible"
    :key="isVisible"
    class="modal-overlay"
    @click.self="closeModal"
    role="dialog"
    aria-labelledby="modal-title"
    aria-hidden="false"
    tabindex="-1"
  >
    <div class="modal-content" ref="modalContent">
      <h2 id="modal-title">{{ editingUser ? 'Edit User' : 'Add New User' }}</h2>

      <!-- User Form -->
      <form @submit.prevent="handleSubmit">
        <label for="name">Name:</label>
        <input v-model="user.name" type="text" id="name" required ref="nameInput" />

        <label for="email">Email:</label>
        <input v-model="user.email" type="email" id="email" required />

        <label for="company">Company:</label>
        <input v-model="user.company" type="text" id="company" required />

        <button type="submit">{{ editingUser ? 'Update' : 'Add' }} User</button>
        <button type="button" @click="closeModal">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import focusTrapMixin from './../mixins/focusTrapMixin';

export default {
  props: {
    isVisible: Boolean,
    editingUser: Object,
  },
  mixins: [focusTrapMixin], // Import the focus trap mixin
  data() {
    return {
      user: {
        name: '',
        email: '',
        company: '',
      },
    };
  },
  watch: {
    // Watch for changes in the editingUser prop to populate the form
    editingUser(newUser) {
      if (newUser) {
        this.user = { ...newUser }; // Pre-fill form with the user data
        this.$nextTick(() => {
          this.focusTrap(this.$refs.modalContent); // Trigger focus trap after modal update
        });
      }
    },
  },
  methods: {
    // Close the modal and emit the 'close' event
    closeModal() {
      this.$emit('close');
    },
    // Handle form submission (either add or update)
    handleSubmit() {
      // Emit action to store based on whether we're editing or adding a user
      if (this.editingUser) {
        this.updateUser(this.user); // Call the updateUser action
      } else {
        this.addUser(this.user); // Call the addUser action
      }
      this.closeModal();
    },
    // Map Vuex actions directly to methods
    ...mapActions(['addUser', 'updateUser']),
  },
  mounted() {
    if (this.isVisible) {
      this.$nextTick(() => {
        this.focusTrap(this.$refs.modalContent); // Ensure focus trap is activated when modal is shown
        this.$refs.nameInput.focus(); // Set focus to the first input field
      });
    }
  },
  updated() {
    if (this.isVisible) {
      this.$nextTick(() => {
        this.focusTrap(this.$refs.modalContent); // Reapply focus trap when modal visibility changes
      });
    }
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  position: relative;
  background: white;
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
  max-width: 500px;
  z-index: 1001;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

label {
  display: block;
  font-weight: bold;
  color: #333;  /* Ensure label text is visible */
  font-size: 14px;
  margin-bottom: 8px;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

button {
  padding: 10px 15px;
  border: none;
  background-color: #007BFF;
  color: white;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}

button:hover {
  background-color: #0056b3;
}
</style>
