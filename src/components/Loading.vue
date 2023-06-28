<template>
  <v-overlay :model-value="overlay" class="align-center justify-center">
    <v-progress-circular color="primary" indeterminate size="64"></v-progress-circular>
  </v-overlay>
</template>

<script>
export default {
  props: {
    is_loading: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    overlay() {
        return this.is_loading;
    }
  },
};
</script>

<style scoped></style>
