<template>
  <v-dialog id="dialog" v-model="show" @close="result(false)">
    <v-card>
      <v-card-title class="dialog__title">{{ title }}</v-card-title>
      <v-card-text class="dialog__text">{{ text }}</v-card-text>
      <v-card-actions id="dialog__buttons-group">
        <v-card-item>
          <button id="dialog__button-cancel" block @click="result(false)">Cancel</button>
        </v-card-item>
        <v-card-item>
          <button id="dialog__button-ok" block @click="result(true)">OK</button>
        </v-card-item>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DialogDelete",
  computed: {
    show() {
      return this.dialog;
    },
  },
  props: {
    dialog: {
      type: Boolean,
      required: true,
      value: false,
    },
    title: {
      type: String,
      required: true,
      value: "",
    },
    text: {
      type: String,
      required: false,
      value: "",
    },
  },
  methods: {
    result(value) {
      this.$emit("result", value)
    }
  }
};
</script>

<style scoped>
#dialog {
  max-width: 340px;
  padding: 20px;
}
.dialog__title {
  font-weight: 500;
  font-size: 16px;
}
.dialog__text {
  color: #6F6F6F;
}
#dialog__buttons-group {
  justify-content: center;
  column-gap: 32px;
  font-weight: 700;
}
#dialog__button-ok {
  color: #EC1C24;
}
#dialog__button-cancel {
  color: #8F8F8F;
}
</style>
