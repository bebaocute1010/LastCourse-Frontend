<template>
  <v-dialog v-model="dialogVisible">
    <v-card class="dialog-card">
      <div class="dialog-close-btn">
        <v-icon  @click="closeDialog">mdi-close</v-icon>
      </div>
      <div class="dialog-title">
        Điều khoản và chính sách
      </div>
      <v-card-text class="dialog-content">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magnis arcu aliquet risus purus nisl luctus viverra.
          Feugiat nulla ornare aliquam hac venenatis at purus. Nulla pulvinar blandit mauris urna est a dignissim hac
          eu. Accumsan facilisi neque ac sapien tellus in consectetur. Ultricies non, risus commodo placerat ipsum
          molestie commodo. Suscipit in elit eu consectetur sed imperdiet convallis. Id ac velit nunc egestas felis.
          Egestas adipiscing purus mauris morbi rutrum faucibus lobortis lectus arcu. Id aliquam enim et orci .
        </p>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magnis arcu aliquet risus purus nisl luctus viverra.
        Feugiat nulla ornare aliquam hac venenatis at purus. Nulla pulvinar blandit mauris urna est a dignissim hac eu.
        Accumsan facilisi neque ac sapien tellus in consectetur. Ultricies non, risus commodo placerat ipsum molestie
        commodo. Suscipit in elit eu consectetur sed imperdiet convallis. Id ac velit nunc egestas felis. Egestas
        adipiscing purus mauris morbi rutrum faucibus lobortis lectus arcu. Id aliquam enim et orci quisque.
        </p>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DialogRules",
  data() {
    return {}
  },
  props: {
    dialog_visible: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    dialogVisible() {
      return this.dialog_visible ? this.dialog_visible : false
    }
  },
  methods: {
    closeDialog() {
      this.$emit('updateDialogVisible', false)
    }
  }
}
</script>

<style scoped>
.dialog-card {
  width: 560px;
  height: 565px;
  margin: auto;
  padding: 20px;
}
.dialog-close-btn {
  display: flex;
  flex-direction: row-reverse;
}
.dialog-title {
  font-size: 18px;
  font-weight: 700;
  width: 100%;
  text-align: center;
  margin-bottom: 27px;
}
.dialog-content {
  padding: 0 10px !important;
  text-align: justify;
}
</style>