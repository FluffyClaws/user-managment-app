<template>
  <div id="app">
    <user-form @user-added="fetchUsers"></user-form>
    <user-list></user-list>
  </div>
</template>

<script>
import UserList from "./components/UserList.vue";
import UserForm from "./components/UserForm.vue";

export default {
  name: "App",
  components: {
    UserList,
    UserForm,
  },
  methods: {
    fetchUsers() {
      this.$refs.userList.fetchUsers();
    },
  },
};
</script>
