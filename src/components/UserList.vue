<template>
  <div class="user-list">
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search users..."
      class="search-input"
    />
    <ul>
      <li v-for="user in filteredUsers" :key="user.id" class="user-item">
        <!-- Render user card -->
        <div v-if="selectedUserId !== user.id" class="user-card">
          <img
            v-if="user.avatar"
            :src="user.avatar"
            alt="User avatar"
            class="avatar"
          />
          <div v-if="!user.avatar" class="avatar-placeholder">
            {{ user.first_name.charAt(0) }}{{ user.last_name.charAt(0) }}
          </div>
          <div class="user-content">
            <!-- Click on the user's name to show details -->
            <h3 @click="showDetails(user)">
              {{ formatName(user.first_name, user.last_name) }}
            </h3>
            <p>{{ user.email }}</p>
          </div>
          <button @click.stop="deleteUser(user.id)" class="delete-button">
            Delete
          </button>
        </div>
        <!-- Render user details if the user is selected -->
        <user-details v-else :user="user" @close="selectedUserId = null" />
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import UserDetails from "./UserDetails.vue";

export default {
  props: {
    users: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      searchQuery: "",
      selectedUserId: null,
    };
  },
  methods: {
    capitalize(str) {
      return str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
    },

    formatName(firstName, lastName) {
      const first = this.capitalize(firstName);
      const last = this.capitalize(lastName);
      return first || last ? `${first} ${last}`.trim() : "No name provided";
    },
    deleteUser(userId) {
      axios
        .delete(`https://reqres.in/api/users/${userId}`)
        .then(() => {
          this.$emit("user-deleted", userId);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    showDetails(user) {
      this.selectedUserId = user.id;
    },
  },
  computed: {
    currentUser() {
      return this.selectedUserId
        ? this.users.find((user) => user.id === this.selectedUserId)
        : null;
    },
    filteredUsers() {
      const searchLower = this.searchQuery.trim().toLowerCase();

      return this.users.filter((user) => {
        const firstName = user.first_name ? user.first_name.toLowerCase() : "";
        const lastName = user.last_name ? user.last_name.toLowerCase() : "";
        const email = user.email ? user.email.toLowerCase() : "";
        return (
          firstName.includes(searchLower) ||
          lastName.includes(searchLower) ||
          email.includes(searchLower)
        );
      });
    },
  },

  components: {
    UserDetails,
  },
};
</script>
