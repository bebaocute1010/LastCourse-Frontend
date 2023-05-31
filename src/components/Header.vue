<template>
  <v-app-bar height="109" color="#FBD2D3" flat>
    <div class="container">
        <div class="header-images">
          <img class="header-image__item" src="/src/assets/logo.svg">
          <img class="header-image__item" src="/src/assets/con-ho.svg">
        </div>
        <div class="header-search">
          <input class="header-search__input" placeholder="Tìm kiếm">
          <v-btn class="header-search__icon" icon><v-icon>mdi-magnify</v-icon></v-btn>
        </div>
        <div class="header-buttons">
          <v-btn class="header-button__item">Đăng nhập</v-btn>
        </div>
    </div>
  </v-app-bar>
</template>

<script>
import SystemBar from "@/components/SystemBar.vue";

export default {
  name: "Header",
  components: {SystemBar}
}
</script>

<style scoped>
.container {
  max-width: 1240px;
  display: flex;
  margin: auto;
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
  align-items: center;
  justify-content: center;
  width: 50%;
  position: relative;
}
.header-search__input {
  background-color: white;
  width: 570px;
  max-width: 100%;
  height: 48px;
  padding: 12px 24px;
  border-radius: 100px ;
  border: 1px solid #EC1C24;
}
.header-search__input:focus-visible {
  border: 1px solid #EC1C24;
}
.header-search__icon {
  position: absolute;
  right: 6%;
  max-height: 34px;
  max-width: 34px;
  background-color: #EC1C24;
  color: white;
}
.header-buttons {
  width: 25%;
  display: flex;
  align-items: center;
  justify-content: right;
}
.header-button__item {
  background-color: #EC1C24;
  color: white;
  text-transform: none;
  border-radius: 8px;
}

</style>