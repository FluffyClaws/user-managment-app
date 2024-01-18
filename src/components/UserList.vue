<template>
  <div>
    <input type="text" v-model="searchQuery" placeholder="Search users..." />
    <ul>
      <li v-for="user in filteredUsers" :key="user.id">
        <img
          v-if="user.avatar"
          :src="user.avatar"
          alt="User avatar"
          class="avatar"
        />
        <span v-else class="avatar-placeholder"></span>
        <a @click.prevent="showDetails(user)">
          {{ formatName(user.first_name, user.last_name) }}
          <span v-if="!user.first_name && !user.last_name"
            >No name provided</span
          >
        </a>
        - {{ user.email }}
        <button @click="deleteUser(user.id)">Delete</button>
      </li>
    </ul>
    <user-details
      v-if="currentUser"
      :user="currentUser"
      @close="selectedUserId = null"
      @update-phone="$emit('update-phone', $event)"
      @update-address="$emit('update-address', $event)"
    ></user-details>
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

<style>
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>
