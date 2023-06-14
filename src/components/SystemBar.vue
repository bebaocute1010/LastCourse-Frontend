<template>
  <div id="system-bar">
    <div class="container">
      <ul class="system-bar--menu">
        <li class="system-bar__item right-border">
          <a href="#">Thương gia và thị trường </a>
        </li>
        <li class="system-bar__item right-border">
          <a href="#">Tải ứng dụng </a>
        </li>
        <li class="system-bar__item">
          <a href="#">Kênh người bán </a>
        </li>
      </ul>

      <ul class="system-bar--menu">
        <a href="#">
          <li class="system-bar__item">
            <v-icon>mdi-chat-question</v-icon>
            Hỗ trợ
          </li>
        </a>
        <li class="system-bar__item" id="menu-languages">
          <v-icon>mdi-web</v-icon>
          Tiếng Việt
          <v-icon>mdi-menu-down</v-icon>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "SystemBar",
};
</script>

<style scoped>
ul li {
  list-style: none;
}

a {
  text-decoration: none;
  color: #ffffff;
}

#system-bar {
  width: 100vw;
  height: 32px;
  background-color: #ec1c24;
  font-size: 14px;
  font-weight: 400;
}
.container {
  width: 100%;
  height: 100%;
  max-width: 1175px;
  display: flex;
  margin: auto;
  justify-content: space-between;
  align-items: center;
}

.system-bar--menu {
  display: flex;
}

.system-bar__item {
  color: white;
  padding: 0 8px;
}
.right-border:first-child {
  padding-left: 0;
}

.right-border {
  border-right: 1px solid white;
}
#menu-languages {
  cursor: pointer;
  padding-right: 0;
}
</style>
