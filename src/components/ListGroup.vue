<template>
  <v-list-group
    class="feature-item sub-feature-list"
    :prepend-icon="prepend_icon"
    :value="value"
  >
    <template v-slot:activator="{ props }">
      <v-list-item v-bind="props" :title="title"></v-list-item>
    </template>

    <v-list-item
      class="sub-feature__item"
      v-for="(item, i) in items"
      :key="i"
      :title="item.title"
      :prepend-icon="icon"
      :value="item.title"
      :to="{name: item.to}"
    ></v-list-item>
  </v-list-group>
</template>

<script>
export default {
  name: "ListGroup",
  props: {
    value: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: false,
    },
    items: {
      type: Array,
      required: false,
    },
    prepend_icon: {
      type: String,
    },
  },
  methods: {
  },
};
</script>

<style scoped>
.menu-title {
  font-weight: 600 !important;
}
.v-list-item--active > .v-list-item__overlay,
.v-list-item[aria-haspopup="menu"][aria-expanded="true"] > .v-list-item__overlay {
  opacity: 0 !important;
}
.sub-feature__item {
}
</style>
