<template>
  <div v-if="user" class="modal">
    <img
      v-if="user.avatar"
      :src="user.avatar"
      alt="User avatar"
      class="avatar"
    />
    <div v-else class="avatar-placeholder"></div>

    <h3>{{ formattedName }}</h3>
    <p>{{ user.email }}</p>

    <div class="user-detail">
      <strong>Phone: </strong>
      <template v-if="editingField === 'phone'">
        <input v-model="editableValue" type="text" class="editable-input" />
        <button @click="saveField('phone')">Save</button>
      </template>
      <template v-else>
        <span>{{ formattedPhone }}</span>
        <button @click="editField('phone')">Edit</button>
      </template>
    </div>

    <div class="user-detail">
      <strong>Address: </strong>
      <template v-if="editingField === 'address'">
        <input v-model="editableValue" type="text" class="editable-input" />
        <button @click="saveField('address')">Save</button>
      </template>
      <template v-else>
        <span>{{ formattedAddress }}</span>
        <button @click="editField('address')">Edit</button>
      </template>
    </div>
    <button @click="close">Close</button>
  </div>
</template>

<script>
import axios from "axios";
import "./UserDetails.less";

export default {
  props: {
    user: Object,
  },
  emits: ["update-field", "close"],

  data() {
    return {
      editingField: null,
      editableValue: "",
    };
  },
  computed: {
    formattedName() {
      return (
        `${this.user.first_name || ""} ${this.user.last_name || ""}`.trim() ||
        "No name provided"
      );
    },
    formattedPhone() {
      return this.user.phone || "Not provided";
    },
    formattedAddress() {
      return this.user.address || "Not provided";
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    editField(field) {
      this.editingField = field;
      this.editableValue = this.user[field] || "";
    },
    async saveField(field) {
      try {
        await axios.put(`https://reqres.in/api/users/${this.user.id}`, {
          [field]: this.editableValue,
        });
        this.$emit("update-field", {
          field,
          id: this.user.id,
          value: this.editableValue,
        });
        this.editingField = null;
      } catch (error) {
        console.error(`Error updating ${field}`, error);
      }
    },
  },
  watch: {
    user: {
      handler(newValue) {
        if (newValue) {
          this.editableValue = newValue[this.editingField] || "";
        }
      },
      deep: true,
    },
  },
};
</script>
