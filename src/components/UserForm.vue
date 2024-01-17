<template>
  <form @submit.prevent="submitForm">
    <div>
      <label for="firstName">First Name:</label>
      <input id="firstName" v-model="firstName" type="text" required />
    </div>
    <div>
      <label for="lastName">Last Name:</label>
      <input id="lastName" v-model="lastName" type="text" required />
    </div>
    <div>
      <label for="email">Email:</label>
      <input id="email" v-model="email" type="email" required />
    </div>
    <button type="submit">Add User</button>
  </form>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
    };
  },
  methods: {
    submitForm() {
      const userData = {
        first_name: this.firstName,
        last_name: this.lastName,
        email: this.email,
      };
      axios
        .post("https://reqres.in/api/users", userData)
        .then((response) => {
          console.log(response.data);
          this.firstName = "";
          this.lastName = "";
          this.email = "";
          this.$emit("user-added");
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
