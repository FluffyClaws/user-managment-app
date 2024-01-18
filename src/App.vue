<template>
  <div id="app">
    <user-form @user-added="addUser"></user-form>
    <user-list
      :users="users"
      @user-deleted="handleUserDeletion"
      @update-phone="handlePhoneUpdate"
      @update-address="handleAddressUpdate"
    ></user-list>
  </div>
</template>

<script>
import UserList from "./components/UserList.vue";
import UserForm from "./components/UserForm.vue";
import axios from "axios";

export default {
  name: "App",
  components: {
    UserList,
    UserForm,
  },
  data() {
    return {
      users: [],
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      axios
        .get("https://reqres.in/api/users")
        .then((response) => {
          this.users = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    addUser(newUser) {
      this.users.unshift(newUser);
    },
    handleUserDeletion(userId) {
      this.users = this.users.filter((user) => user.id !== userId);
    },
    handlePhoneUpdate({ id, phone }) {
      const userIndex = this.users.findIndex((user) => user.id === id);
      if (userIndex !== -1) {
        const updatedUser = { ...this.users[userIndex], phone };
        this.users.splice(userIndex, 1, updatedUser);
      }
    },
    handleAddressUpdate({ id, address }) {
      const userIndex = this.users.findIndex((user) => user.id === id);
      if (userIndex !== -1) {
        const updatedUser = { ...this.users[userIndex], address };
        this.users.splice(userIndex, 1, updatedUser);
      }
    },
  },
};
</script>
