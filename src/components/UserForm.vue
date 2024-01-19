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
        <span v-if="errors.name">{{ errors.name }}</span>
      </div>
      <div class="form-group">
        <input
          id="email"
          v-model="email"
          type="email"
          required
          placeholder="Enter your email"
        />
        <span v-if="errors.email">{{ errors.email }}</span>
      </div>
      <button type="submit">Add User</button>
    </form>
  </div>
</template>

<script>
import UserService from "../services/UserService";
import "./UserForm.less";

export default {
  data() {
    return {
      name: "",
      email: "",
      errors: {},
    };
  },
  methods: {
    validateForm() {
      this.errors = {};

      if (!this.name) {
        this.errors.name = "Name is required";
      }
      if (!this.email.includes("@")) {
        this.errors.email = "Email is invalid";
      }

      return Object.keys(this.errors).length === 0;
    },
    async submitForm() {
      if (!this.validateForm()) {
        return;
      }

      const splitName = this.name.split(" ");
      const userData = {
        first_name: splitName[0],
        last_name: splitName.slice(1).join(" ") || "",
        email: this.email,
      };

      try {
        const addedUser = await UserService.addUser(userData);
        this.$emit("user-added", addedUser);
        this.name = "";
        this.email = "";
      } catch (error) {
        console.error("Error adding user", error);
      }
    },
  },
};
</script>
