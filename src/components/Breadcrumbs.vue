<template>
  <v-breadcrumbs id="breadcrumbs">
    <v-breadcrumbs-item>
      <router-link :to="{ name: 'home' }">M-Clothing</router-link></v-breadcrumbs-item
    >
    <v-breadcrumbs-divider>
      <v-icon>mdi-chevron-right</v-icon>
    </v-breadcrumbs-divider>
    <template v-for="(item, index) in items" :key="index">
      <v-breadcrumbs-item @click="handleBreadcrumbClick(item)">
        {{ item.name }}
      </v-breadcrumbs-item>
      <v-breadcrumbs-divider :key="index + 1" v-if="index !== items.length - 1">
        <v-icon>mdi-chevron-right</v-icon>
      </v-breadcrumbs-divider>
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
  methods: {
    handleBreadcrumbClick(item) {
      this.$emit("clickBreadcrumb", item);
    },
  },
};
</script>

<style scoped>
#breadcrumbs {
  padding: 0 0 24px;
}
#breadcrumbs .v-breadcrumbs-item {
  color: #2a2a2a;
}
#breadcrumbs .v-breadcrumbs-item:last-child {
  height: 1.5em;
  width: 40%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-align: left;
}

#breadcrumbs .v-breadcrumbs-item:not(:last-child):hover,
a:hover {
  cursor: pointer;
  color: #e60a32;
}
#breadcrumbs .v-breadcrumbs-item .v-breadcrumbs-item--disabled {
  opacity: 1;
}
</style>
