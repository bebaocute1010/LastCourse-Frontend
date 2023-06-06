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
        <template slot="prepend">
          <v-icon>mdi-success</v-icon>
        </template>
      </v-alert>
    </div>
  </v-overlay>
</template>

<script>

export default {
  name: "Alert",
  data() {
    return {
    }
  },
  methods: {
    onHide() {
      this.hideAlert()
    }
  }
}
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
  background: #EBF4EC !important;
  border: 1px solid #D7EAD9 !important;
  color: #28A138 !important;
}
.warning {
  background: #FDF0E3 !important;
  border: 1px solid #FAE2C7 !important;
  color: #E98305 !important;
}
.error {
  background: #FAEAEA !important;
  border: 1px solid #F4D2D2 !important;
  color: #E60A32 !important;
}
</style>