<template>
  <div class="container">
    <v-row class="content">
      <v-col class="banner" cols="7">
        <div class="banner-img">
          <v-img src="/src/assets/banner.svg"></v-img>
        </div>

        <div class="bottom-content">
          <p class="h1-text">
            Sản phẩm chất lượng
          </p>
          <p>Tất cả các sản phẩm trên M Clothing đều dược đăng bán bởi các nhà cung cấp, uy tín và đảm bảo chât lượng</p>
        </div>
      </v-col>

      <v-col cols="5">
        <div class="right-content">
          <div class="logo">
            <v-img src="/src/assets/logo.svg"/>
          </div>
          <main>
            <slot></slot>
          </main>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "AccountLayout"
}
</script>

<style>
.container {
  margin: 4% auto 0;
  max-width: 1200px;
  padding: 0 15px;
}
.content {
}
.h1-text {
  font-weight: 700;
  color: red;
}
.banner {
  width: 100%;
}
.banner-img {
  width: 80%;
  margin: 0 10%;
  height: auto;
}
.bottom-content {
  padding: 0 6rem;
  text-align: center;
}
.right-content {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.logo {
  width: 40%;
  height: auto;
  margin-top: 10%;
}
.form-content {
  text-align: center;
}
.form-heading {
}
.form-heading-title {
  font-weight: 600;
  font-size: 1.5rem;
}
.form-heading-subtitle {
}
.form-check-box {
  font-size: 14px;
}
.another-action {
  font-weight: 600;
  color: #EE273C;
  text-decoration: none;
}
.base-button {
  color: #FFFFFF !important;
  width: 278px !important;
  height: 44px !important;
  padding: 11px 21px !important;
  border-radius: 100px !important;
}
/*Custom vuetify*/

.v-input__control {
  border-radius: 100px;
}
</style>