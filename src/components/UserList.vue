<template>
  <div class="user-list">
    <ul>
      <li v-for="user in users" :key="user.id" class="user-item">
        <div v-if="selectedUserId !== user.id" class="user-card">
          <img
            v-if="user.avatar"
            :src="user.avatar"
            alt="User avatar"
            class="avatar"
          />
          <div v-if="!user.avatar" class="avatar-placeholder">
            {{ userInitials(user) }}
          </div>
          <div class="user-content">
            <h3 @click="selectedUserId = user.id">
              {{ formatName(user.first_name, user.last_name) }}
            </h3>
            <p>{{ user.email }}</p>
          </div>
          <button @click.stop="deleteUser(user.id)" class="delete-button">
            Delete
          </button>
        </div>
        <UserDetails
          v-if="selectedUserId === user.id"
          :user="user"
          @close="selectedUserId = null"
          @update-field="handleUpdateField"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import UserDetails from "./UserDetails.vue";
import UserService from "../services/UserService";
import "./UserList.less";

export default {
  components: {
    UserDetails,
  },
  props: {
    users: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectedUserId: null,
    };
  },
  methods: {
    handleUpdateField({ field, id, value }) {
      this.$emit("update-field", { field, id, value });
    },
    userInitials(user) {
      return `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`;
    },
    formatName(firstName, lastName) {
      return (
        `${firstName || ""} ${lastName || ""}`.trim() || "No name provided"
      );
    },
    deleteUser(userId) {
      UserService.deleteUser(userId)
        .then(() => {
          this.$emit("user-deleted", userId);
        })
        .catch((error) => {
          console.error("Error deleting user", error);
        });
    },
  },
};
</script>
