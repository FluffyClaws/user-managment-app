<template>
  <div id="app">
    <div class="container">
      <div class="header">
        <user-form @user-added="addUser" />
        <user-search v-model="searchQuery" />
      </div>
      <UserList
        :users="filteredUsers"
        @user-deleted="handleUserDeletion"
        @update-field="handleUserUpdate"
      />
    </div>
  </div>
</template>

<script>
import UserList from "@/components/UserList.vue";
import UserForm from "@/components/UserForm.vue";
import UserService from "@/services/UserService";
import UserSearch from "@/components/UserSearch.vue";
import "@/styles/global.less";

export default {
  name: "App",
  components: {
    UserList,
    UserForm,
    UserSearch,
  },
  data() {
    return {
      users: [],
      searchQuery: "",
    };
  },
  computed: {
    filteredUsers() {
      if (!this.searchQuery) {
        return this.users;
      }
      const searchLower = this.searchQuery.toLowerCase();
      return this.users.filter((user) =>
        `${user.first_name} ${user.last_name} ${user.email}`
          .toLowerCase()
          .includes(searchLower)
      );
    },
  },
  async mounted() {
    await this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await UserService.fetchUsers();
        this.users = response.data;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    handleInput(newValue) {
      this.searchQuery = newValue;
    },
    addUser(newUser) {
      this.users.unshift(newUser);
    },
    handleUserDeletion(userId) {
      this.users = this.users.filter((user) => user.id !== userId);
    },
    handleUserUpdate({ field, id, value }) {
      const userIndex = this.users.findIndex((user) => user.id === id);
      if (userIndex !== -1) {
        UserService.updateUser(id, { [field]: value })
          .then(() => {
            this.users[userIndex][field] = value;
          })
          .catch((error) => {
            console.error(`Error updating user ${field}:`, error);
          });
      }
    },
  },
};
</script>
