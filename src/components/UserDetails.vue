<template>
  <div v-if="user" class="modal">
    <img
      v-if="user.avatar"
      :src="user.avatar"
      alt="User avatar"
      class="avatar"
    />
    <div v-else class="avatar-placeholder"></div>

    <h3>{{ formatName(user.first_name, user.last_name) }}</h3>
    <p>{{ user.email }}</p>
    <div class="user-detail">
      <strong>Phone: </strong>
      <span v-if="!editingPhone">{{ user.phone || "Not provided" }}</span>
      <input
        v-else
        v-model="editablePhone"
        type="text"
        class="editable-input"
      />
      <button v-if="!editingPhone" @click="editPhone">Edit</button>
      <button v-else @click="savePhone">Save</button>
    </div>

    <div class="user-detail">
      <strong>Address: </strong>
      <span v-if="!editingAddress">{{ user.address || "Not provided" }}</span>
      <input
        v-else
        v-model="editableAddress"
        type="text"
        class="editable-input"
      />
      <button v-if="!editingAddress" @click="editAddress">Edit</button>
      <button v-else @click="saveAddress">Save</button>
    </div>
    <button @click="close">Close</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    user: Object,
  },
  data() {
    return {
      editingPhone: false,
      editingAddress: false,
      editablePhone: this.user ? this.user.phone : "",
      editableAddress: this.user ? this.user.address : "",
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    editPhone() {
      this.editingPhone = true;
      this.editablePhone = this.user.phone;
    },
    editAddress() {
      this.editingAddress = true;
      this.editableAddress = this.user.address;
    },
    savePhone() {
      axios
        .put(`https://reqres.in/api/users/${this.user.id}`, {
          phone: this.editablePhone,
        })
        .then(() => {
          this.editingPhone = false;
          this.$emit("update-phone", {
            id: this.user.id,
            phone: this.editablePhone,
          });
        })
        .catch((error) => console.error("Error updating phone", error));
    },
    saveAddress() {
      axios
        .put(`https://reqres.in/api/users/${this.user.id}`, {
          address: this.editableAddress,
        })
        .then(() => {
          this.editingAddress = false;
          this.$emit("update-address", {
            id: this.user.id,
            address: this.editableAddress,
          });
        })
        .catch((error) => console.error("Error updating address", error));
    },
    formatName(firstName, lastName) {
      return (
        `${firstName || ""} ${lastName || ""}`.trim() || "No name provided"
      );
    },
  },
};
</script>
