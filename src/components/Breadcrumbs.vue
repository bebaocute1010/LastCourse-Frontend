<template>
  <v-breadcrumbs id="breadcrumbs" :items="items">
    <template v-slot:divider>
      <v-icon icon="mdi-chevron-right"></v-icon>
    </template>
  </v-breadcrumbs>
</template>

<script>
export default {
  name: "Breadcrumbs",
  props: {
    items: {
      type: Array,
      required: false,
    },
  },
};
</script>

<style scoped>
#breadcrumbs {
  padding: 16px 0;
}
#breadcrumbs .v-breadcrumbs-item {
  color: #2a2a2a;
  pointer-events: none;
}
#breadcrumbs .v-breadcrumbs-item .v-breadcrumbs-item--disabled {
  opacity: 1;
}
</style>
