<template>
  <div>
    <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      placeholder="Search users..."
      class="search-input"
    />
  </div>
</template>

<script>
import "./UserSearch.less";
export default {
  props: {
    modelValue: String,
  },
};
</script>
