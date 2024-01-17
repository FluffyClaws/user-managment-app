<template>
  <div>
    <input type="text" v-model="searchQuery" placeholder="Search users..." />
    <ul>
      <li v-for="user in filteredUsers" :key="user.id">
        {{ user.first_name }} {{ user.last_name }} - {{ user.email }}
        <button @click="deleteUser(user.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      users: [],
      searchQuery: "",
    };
  },
  created() {
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
    deleteUser(userId) {
      axios
        .delete(`https://reqres.in/api/users/${userId}`)
        .then(() => {
          this.users = this.users.filter((user) => user.id !== userId);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  computed: {
    filteredUsers() {
      return this.users.filter(
        (user) =>
          user.first_name
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          user.last_name
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
};
</script>
