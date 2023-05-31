<template>
  <v-system-bar window color="#EC1C24">
    <div class="container">
      <ul class="system-bar--menu">
        <a href="#">
          <li class="system-bar__item right-border">Thương gia và thị trường</li>
        </a>
        <a href="#">
          <li class="system-bar__item right-border">Tải ứng dụng</li>
        </a>
        <a href="#">
          <li class="system-bar__item">Kênh người bán</li>
        </a>
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
  </v-system-bar>
</template>

<script>
export default {
  name: "SystemBar"
}
</script>

<style scoped>
ul li {
  list-style: none;
}

a {
  text-decoration: none;
}

.v-system-bar .v-icon {
  opacity: 1;
}

.container {
  width: 100%;
  max-width: 1240px;
  display: flex;
  margin: auto;
  justify-content: space-between;
}

.system-bar--menu {
  display: flex;
}

.system-bar__item {
  color: white;
  padding: 0 8px;
}

.right-border {
  border-right: 1px solid white;
}
#menu-languages {
  cursor: pointer;
}
</style>