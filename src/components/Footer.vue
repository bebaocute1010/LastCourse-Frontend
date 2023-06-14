<template>
  <div id="footer">
    <div class="footer-contacts">
      <div class="container">
        <div class="footer-contacts-list">
          <div class="footer-contact__item">
            <div class="footer-contact__item-icon">
              <v-icon>mdi-map-marker</v-icon>
            </div>
            <div class="footer-contact__item-info">
              <p class="footer-contact__item-title">Địa chỉ</p>
              <p class="footer-contact__item-detail">
                64/420 Lạch Tray , Ngô Quyền, Hải Phòng
              </p>
            </div>
          </div>

          <div class="footer-contact__item">
            <div class="footer-contact__item-icon">
              <v-icon>mdi-phone-in-talk</v-icon>
            </div>
            <div class="footer-contact__item-info">
              <p class="footer-contact__item-title">Hotline</p>
              <p class="footer-contact__item-detail">+(84)07865437</p>
            </div>
          </div>

          <div class="footer-contact__item">
            <div class="footer-contact__item-icon">
              <v-icon>mdi-email</v-icon>
            </div>
            <div class="footer-contact__item-info">
              <p class="footer-contact__item-title">Email</p>
              <p class="footer-contact__item-detail">mclothing.support@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="container">
        <div class="footer__row">
          <div class="footer__block">
            <div class="footer__logo">
              <v-img contain src="src/assets/logo.svg"></v-img>
            </div>
            <p>
              Sàn thương mại điện tử uy tín, chất lượng. Tất cả các sản phẩm trên M
              Clothing đều được đăng bán bởi các nhà cung cấp, uy tín và đảm bảo chât
              lượng
            </p>

            <div class="footer__verified">
              <v-img contain src="src/assets/da-xac-minh.svg"></v-img>
            </div>
          </div>

          <div class="footer__block">
            <h3 class="footer-h3">CHĂM SÓC KHÁCH HÀNG</h3>
            <ul class="footer-list">
              <li class="footer-list__item" v-for="(item, i) in customers" :key="i">
                {{ item }}
              </li>
            </ul>
          </div>

          <div class="footer__block">
            <h3 class="footer-h3">VỀ M Clothing</h3>
            <ul class="footer-list">
              <li class="footer-list__item" v-for="(item, i) in about" :key="i">
                {{ item }}
              </li>
            </ul>
          </div>

          <div class="footer__block">
            <div class="footer__socials">
              <h3 class="footer-h3">KẾT NỐI VỚI CHÚNG TÔI</h3>
              <div class="footer-list-icon">
                <div class="footer-list-icon__item">
                  <v-img contain src="src/assets/icons/facebook.svg"></v-img>
                </div>
                <div class="footer-list-icon__item">
                  <v-img contain src="src/assets/icons/instagram.svg"></v-img>
                </div>
                <div class="footer-list-icon__item">
                  <v-img contain src="src/assets/icons/zalo.svg"></v-img>
                </div>
              </div>
            </div>
            <div class="footer__download">
              <h3 class="footer-h3">TẢI ỨNG DỤNG M Clothing MOBILE</h3>
              <div class="footer-list-icon">
                <div class="footer-list-icon__item">
                  <v-img contain src="src/assets/icons/download-apple-store.svg"></v-img>
                </div>
                <div class="footer-list-icon__item">
                  <v-img contain src="src/assets/icons/download-ch-play.svg"></v-img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-copyright">
      <p>© 2023 - Bản quyền của Công TY M Clothing - mclothing.vn</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      customers: [
        "Trung tâm trợ giúp",
        "Hướng dẫn mua hàng",
        "Hướng dẫn bán hàng",
        "Câu hỏi thường gặp",
        "Thanh toán",
        "Vận chuyển",
      ],
      about: [
        "Giới thiệu về M Clothing Việt Nam",
        "Chính sách và điều khoản",
        "Kênh người bán",
        "Bán hàng doanh nghiệp",
        "Đăng ký bán",
        "Chính sách bảo mật thông tin",
      ],
    };
  },
};
</script>

<style scoped>
.footer-copyright {
  padding: 15px;
  text-align: center;
}
.footer__verified {
  width: 107px;
  height: 40px;
}
.footer__socials {
  margin-bottom: 32px;
}
.footer__download .footer-list-icon__item {
  width: 96px;
  height: 32px;
}
.footer-list-icon__item {
  width: 28px;
  height: 28px;
}
.footer-list-icon {
  display: flex;
  column-gap: 16px;
}
.footer__logo {
  height: 75px;
  width: 75px;
}
.footer__block {
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  padding: 0;
  max-width: 25%;
}
.footer__row {
  display: flex;
  justify-content: space-between;
}
.footer__row {
  padding: 60px 0;
  border-bottom: 1px solid #d4d4d4;
}
.footer-contact__item-title {
  font-weight: 600;
}
.footer-contact__item-detail {
  font-size: 14px;
}
.footer-contact__item-icon {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #fbd2d3;
}
.footer-contact__item {
  display: flex;
  align-items: center;
  column-gap: 16px;
}
.footer-contacts-list {
  display: flex;
  justify-content: space-between;
}
.footer-contacts {
  padding: 35px;
  background: #ec1c24;
  color: #ffffff;
}
.footer-h3 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
  text-transform: uppercase;
}
#footer {
  color: #555555;
}
</style>
