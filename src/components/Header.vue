<template>
  <div id="header">
    <div class="container header">
      <div class="header-images" :to="{ name: 'home' }">
        <router-link :to="{ name: 'home' }">
          <img class="header-image__item" src="/src/assets/logo.svg" />
          <img class="header-image__item" src="/src/assets/con-ho.svg" />
        </router-link>
      </div>
      <div class="header-search">
        <div class="header-search__box">
          <input
            class="header-search__input"
            placeholder="Tìm kiếm"
            v-model="search_text"
            @input="startSearch"
          />
          <v-btn class="header-search__icon" icon><v-icon>mdi-magnify</v-icon></v-btn>
        </div>

        <div class="header-search__results" v-if="search_rs?.length > 0">
          <v-list>
            <v-list-item v-for="(item, i) in search_rs" :key="i">
              <span>{{ item }}</span>
            </v-list-item>
          </v-list>
        </div>
      </div>

      <div class="header-buttons" v-if="!logined">
        <v-btn class="header-button__item" :to="{ name: 'login' }">Đăng nhập</v-btn>
      </div>

      <div v-else class="user-info">
        <p class="user__name">Savian Nguyễn</p>
        <v-avatar class="user__avatar">
          <v-img src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
        </v-avatar>
        <v-icon color="#EC1C24">mdi-menu-down</v-icon>
      </div>
    </div>
  </div>
</template>

<script>
import SystemBar from "@/components/SystemBar.vue";

export default {
  name: "Header",
  components: { SystemBar },
  data() {
    return {
      search_text: "",
      timer: null,
    };
  },
  computed: {
    logined() {
      return localStorage.getItem("logined");
    },
  },
  props: {
    search_rs: {
      type: Array,
      required: false,
    },
  },
  methods: {
    startSearch() {
      clearTimeout(this.timer);
      this.timer = setTimeout(this.search, 200);
    },
    search() {
      this.$emit("search", this.search_text.trim());
    },
  },
};
</script>

<style scoped>
.user__name {
  font-weight: 600;
}
.user-info {
  display: flex;
  align-items: center;
  column-gap: 13px;
}
.header-search__results {
  position: absolute;
  width: 100%;
  top: 80%;
  z-index: 2;
}
.container {
  max-width: 1175px;
  margin: auto;
}
#header {
  height: 109px;
  background-color: #fbd2d3;
}
.header {
  display: flex;
  justify-content: space-between;
  max-height: 100%;
}
.header-images {
  width: 25%;
  padding: 25px 0;
  display: flex;
}
.header-image__item {
  max-width: 50%;
  max-height: 100%;
}
.header-search {
  display: flex;
  position: relative;
}
.header-search__box {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.header-search__input {
  background-color: #f1f1f1;
  width: 570px;
  max-width: 100%;
  height: 48px;
  padding: 12px 24px;
  border-radius: 100px;
  border: 1px solid #ec1c24;
}
.header-search__input:focus-visible {
  border: 1px solid #ec1c24;
}
.header-search__icon {
  position: absolute;
  right: 12px;
  max-height: 34px;
  max-width: 34px;
  background-color: #ec1c24;
  color: white;
}
.header-buttons {
  width: 25%;
  display: flex;
  align-items: center;
  justify-content: right;
}
.header-button__item {
  background-color: #ec1c24;
  color: white;
  text-transform: none;
  border-radius: 8px;
}
</style>
