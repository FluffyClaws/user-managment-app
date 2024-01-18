<template>
  <div class="user-form">
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <input
          id="name"
          v-model="name"
          type="text"
          required
          placeholder="Enter your name"
        />
        <span v-if="nameError">{{ nameError }}</span>
      </div>
      <div class="form-group">
        <input
          id="email"
          v-model="email"
          type="email"
          required
          placeholder="Enter your email"
        />
        <span v-if="emailError">{{ emailError }}</span>
      </div>
      <button type="submit">Add User</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      email: "",
      nameError: "",
      emailError: "",
    };
  },
  methods: {
    validateForm() {
      this.nameError = "";
      this.emailError = "";

      if (!this.name) {
        this.nameError = "Name is required";
      }
      if (!this.email.includes("@")) {
        this.emailError = "Email is invalid";
      }

      return this.nameError === "" && this.emailError === "";
    },
    submitForm() {
      if (!this.validateForm()) {
        return;
      }

      const splitName = this.name.split(" ");
      const userData = {
        first_name: splitName[0],
        last_name: splitName.slice(1).join(" ") || "",
        email: this.email,
      };

      axios
        .post("https://reqres.in/api/users", userData)
        .then((response) => {
          this.$emit("user-added", { ...response.data, ...userData });
          this.name = "";
          this.email = "";
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
