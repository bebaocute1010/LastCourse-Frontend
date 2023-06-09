<template>
  <v-overlay v-model="alert.show">
    <div class="alert-container">
      <v-alert
        closable
        :title="alert.title"
        :type="alert.type"
        rounded="3"
        :class="'my-alert ' + alert.class_name"
        :text="alert.message"
        @click:close="onHide"
      >
      </v-alert>
    </div>
  </v-overlay>
</template>

<script>
export default {
  name: "Alert",
  data() {
    return {};
  },
  methods: {
    onHide() {
      this.hideAlert();
    },
  },
};
</script>

<style scoped>
v-overlay {
  display: flex;
}
.alert-container {
  width: 100vw;
}
.my-alert {
  width: 686px !important;
  height: 84px;
  margin: 84px auto 0;
}
.success {
  background: #ebf4ec !important;
  border: 1px solid #d7ead9 !important;
  color: #28a138 !important;
}
.warning {
  background: #fdf0e3 !important;
  border: 1px solid #fae2c7 !important;
  color: #e98305 !important;
}
.error {
  background: #faeaea !important;
  border: 1px solid #f4d2d2 !important;
  color: #e60a32 !important;
}
</style>
