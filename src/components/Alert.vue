<template>
  <v-overlay v-model="show_overplay">
    <div class="alert-container">
      <v-alert
          closable
          :title="alert.title"
          :type="alert.type"
          rounded="3"
          class="alert-success"
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
import { mapGetters, mapActions } from 'vuex'

export default {
  name: "Alert",
  computed: {
    ...mapGetters([
        "alert",
    ])
  },
  data() {
    return {
      show_overplay: false
    }
  },
  methods: {
    ...mapActions([
        "hideAlert",
    ]),
    onHide() {
      this.hideAlert()
      this.show_overplay = false
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
.alert-success {
  width: 686px;
  height: 84px;
  margin: 84px auto 0;
  background: #EBF4EC !important;
  border: 1px solid #D7EAD9 !important;
  color: #28A138 !important;
}
</style>