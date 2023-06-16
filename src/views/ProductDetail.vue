<template>
  <DefaultLayout>
    <section id="product">
      <div class="container">
        <div id="product-images">
          <BannerSlides :height="480" :items="items" style="width: 480px"></BannerSlides>
          <div id="images__arrow">
            <p style="font-weight: 600">Hình ảnh sản phẩm</p>
            <div class="image__arrow-btn">
              <v-icon> mdi-chevron-left-circle </v-icon>
              <v-icon> mdi-chevron-right-circle </v-icon>
            </div>
          </div>
          <SlideImages
            :items="items"
            :ref="'slideImageDetail'"
            img_width="87px"
            style="height: 87px"
          >
          </SlideImages>
          <div id="shares">
            <p>Chia sẻ:</p>
            <div class="share__social__image">
              <v-img contain src="src/assets/icons/facebook.svg"></v-img>
            </div>

            <div class="share__social__image">
              <v-img contain src="src/assets/icons/messenger.svg"></v-img>
            </div>

            <div class="share__social__image">
              <v-img contain src="src/assets/icons/twiter.svg"></v-img>
            </div>

            <div class="share__social__image">
              <v-img contain src="src/assets/icons/share.svg"></v-img>
            </div>
          </div>
        </div>

        <div id="product-info">
          <p class="product__name">
            Tai Nghe Không Dây Bluetooth Chụp Tai Mèo Wireless HXZ Đèn LED Cao Cấp - DT075
          </p>

          <div class="product__evaluates">
            <v-rating
              v-model="rating"
              class="icon-size-14"
              size="14"
              color="#FFB800"
              readonly
              half-increments
            ></v-rating>
            <p>{{ rating }}/5</p>
            <p class="product__evaluate__sold">Đã bán {{ formatNumber(sold) }}</p>
          </div>

          <div id="product__variants">
            <p class="product__variant__headding">Phân loại</p>
            <div class="product__variants__list" v-for="list in variants" :key="list.id">
              <p class="product__variants__list__name headding-text">{{ list.name }}</p>
              <div class="product__variants__list__items">
                <div
                  class="product__variant__item"
                  v-for="variant in list.items"
                  :key="variant.id"
                >
                  <div class="product__variant__img" v-if="variant.image">
                    <img :src="variant.image" />
                  </div>
                  <p class="product__variant__name">{{ variant.name }}</p>
                </div>
              </div>
            </div>
          </div>

          <div id="quantity-order">
            <p class="headding-text">Số lượng:</p>
            <div>
              <div
                class="quantity-order__button user-not-select"
                @click="order_quantity = Math.max(order_quantity - 1, 1)"
              >
                <v-icon>mdi-minus</v-icon>
              </div>
              <input
                type="number"
                class="quantity-order__input"
                v-model="order_quantity"
              />
              <div
                class="quantity-order__button user-not-select"
                @click="order_quantity = Math.min(order_quantity + 1, inventory)"
              >
                <v-icon>mdi-plus</v-icon>
              </div>
            </div>
          </div>

          <div id="inventory">
            <p class="headding-text">
              Tồn kho: <span>{{ formatNumber(inventory) }}</span>
            </p>
          </div>

          <div id="actions">
            <button id="btn-add-to-cart">Thêm vào giỏ hàng</button>
            <button id="btn-buy-now">Mua ngay</button>
          </div>
        </div>
      </div>
    </section>

    <section id="product-extend">
      <div class="container">
        <div id="product-extend-content" ref="extendContent">
          <div id="product-extend__headding" class="user-not-select">
            <div id="shop-info">
              <v-avatar id="shop__avatar"
                ><v-img
                  cover
                  src="https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
                ></v-img
              ></v-avatar>
              <div id="shop__name">
                <p>Shop thời trang nam nữ</p>
                <div id="shop__location">
                  <v-icon color="#0074BD">mdi-map-marker</v-icon>
                  <p>Hà Nội</p>
                </div>
              </div>
            </div>

            <div id="shop-overall">
              <div class="shop-overall__item">
                <p class="shop-overall__item__quantiy">379</p>
                <p class="shop-overall__item__name">Sản phẩm</p>
              </div>

              <div class="shop-overall__item">
                <p class="shop-overall__item__quantiy">4.7</p>
                <p class="shop-overall__item__name">Đánh giá</p>
              </div>

              <div class="shop-overall__item">
                <p class="shop-overall__item__quantiy">1.5k</p>
                <p class="shop-overall__item__name">Follow</p>
              </div>

              <div>
                <button id="btn-view-shop">Xem shop</button>
              </div>
            </div>
          </div>

          <div id="product-extend__describe" class="product-extend__item">
            <p class="product-extend__item-headding">Mô tả sản phẩm</p>
            <div class="product-extend__item-body">
              <div class="product-extend__item__grid">
                <div class="__item__grid__titles">
                  <p>Danh mục</p>
                  <p>Kho</p>
                  <p>Địa chỉ gửi</p>
                </div>
                <div class="__item__grid__contents">
                  <p>Thời trang nữ</p>
                  <p>125489</p>
                  <p>124 Hàng kênh, Hồng Bàng, Hải Phòng</p>
                </div>
              </div>
            </div>
          </div>

          <div id="product-extend__detail" class="product-extend__item">
            <p class="product-extend__item-headding">Chi tiết sản phẩm</p>
            <div class="product-extend__item-body">
              <p :class="{ 'collapse-content': !expand, 'expand-content': expand }">
                - Tên sản phẩm: Bộ Ba Lỗ Bé Trai, Bé Gái Minky Mom Vải Thun Lạnh Basic
                Nhiều Màu, Bộ Quần Áo Cho Bé 3 Lỗ Mặc Hè Thoáng Mát MKM3LO2109 <br />
                Chất liệu: cotton thun lạnh <br />
                - Tên sản phẩm: Bộ Ba Lỗ Bé Trai, Bé Gái Minky Mom Vải Thun Lạnh Basic
                Nhiều Màu, Bộ Quần Áo Cho Bé 3 Lỗ Mặc Hè Thoáng Mát MKM3LO2109 <br />
                Chất liệu: cotton thun lạnh <br />
              </p>
              <button class="btn-expand-content" @click="expand = !expand">
                {{ !expand ? "Mở rộng" : "Thu gọn" }}
                <v-icon>{{ !expand ? "mdi-chevron-right" : "mdi-chevron-up" }}</v-icon>
              </button>
            </div>
          </div>

          <div id="product-extend__evaluate" class="product-extend__item">
            <p class="product-extend__item-headding">Đánh giá sản phẩm</p>
            <div class="product-extend__item-body">
              <div class="__item__rating">
                <div class="__item__rating__headding user-not-select">
                  <p class="__rating-value">
                    <span>{{ rating }}</span
                    >/5
                  </p>
                  <v-rating
                    v-model="rating"
                    half-increments
                    color="#FFB800"
                    size="24"
                    readonly
                  ></v-rating>
                  <div class="__item__rating__filters">
                    <div
                      :class="{
                        '__item__rating__filter-item': true,
                        '.__item__rating__filter-item__active':
                          rating_filter_select === 0,
                      }"
                    >
                      <p>Tất cả</p>
                      <p class="____quantity">({{ formatNumber(1234) }})</p>
                    </div>

                    <div
                      :class="{
                        '__item__rating__filter-item': true,
                        '.__item__rating__filter-item__active':
                          rating_filter_select === 5,
                      }"
                    >
                      <v-rating
                        class="icon-size-14"
                        length="5"
                        color="#FFB800"
                        size="14"
                        readonly
                        model-value="5"
                      ></v-rating>
                      <p class="____quantity">({{ formatNumber(1234) }})</p>
                    </div>

                    <div
                      :class="{
                        '__item__rating__filter-item': true,
                        '.__item__rating__filter-item__active':
                          rating_filter_select === 4,
                      }"
                    >
                      <v-rating
                        class="icon-size-14"
                        length="4"
                        color="#FFB800"
                        model-value="4"
                        size="14"
                        readonly
                      ></v-rating>
                      <p class="____quantity">({{ formatNumber(1234) }})</p>
                    </div>

                    <div
                      :class="{
                        '__item__rating__filter-item': true,
                        '.__item__rating__filter-item__active':
                          rating_filter_select === 3,
                      }"
                    >
                      <v-rating
                        class="icon-size-14"
                        length="3"
                        model-value="3"
                        color="#FFB800"
                        size="14"
                        readonly
                      ></v-rating>
                      <p class="____quantity">({{ formatNumber(1234) }})</p>
                    </div>

                    <div
                      :class="{
                        '__item__rating__filter-item': true,
                        '.__item__rating__filter-item__active':
                          rating_filter_select === 2,
                      }"
                    >
                      <v-rating
                        class="icon-size-14"
                        length="2"
                        color="#FFB800"
                        model-value="2"
                        size="14"
                        readonly
                      ></v-rating>
                      <p class="____quantity">({{ formatNumber(1234) }})</p>
                    </div>

                    <div
                      :class="{
                        '__item__rating__filter-item': true,
                        '.__item__rating__filter-item__active':
                          rating_filter_select === 1,
                      }"
                    >
                      <v-rating
                        class="icon-size-14"
                        length="1"
                        model-value="1"
                        color="#FFB800"
                        size="14"
                        readonly
                      ></v-rating>
                      <p class="____quantity">({{ formatNumber(1234) }})</p>
                    </div>
                  </div>
                </div>

                <div class="__item__rating__body">
                  <div
                    class="__item__rating__comment"
                    v-for="comment in comments"
                    :key="comment.id"
                  >
                    <v-avatar>
                      <v-img cover :src="comment.user.avatar"></v-img>
                    </v-avatar>

                    <div class="__comment__body">
                      <p class="__comment__username">{{ comment.user.username }}</p>
                      <v-rating
                        v-model="comment.rating"
                        readonly
                        class="icon-size-14"
                        color="#FFB800"
                        size="14"
                      ></v-rating>
                      <p class="__comment__content">{{ comment.content }}</p>
                      <div class="__comment__images">
                        <div
                          class="__comment__image__item"
                          v-for="(image, index) in comment.images.slice(0, 3)"
                          :key="image.id"
                        >
                          <img :src="image.url" />

                          <div
                            v-if="index === 2 && comment.images.length > 3"
                            class="__comment__image__last-item"
                          >
                            <span>+{{ comment.images.length - 3 }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <v-pagination
              :length="15"
              :total-visible="5"
              active-color="#EC1C24"
            ></v-pagination>
          </div>
        </div>
        <div id="products-relate" ref="relateProducts">
          <p class="product-extend__item-headding">Sản phẩm tương tự</p>
          <product
            v-for="item in products_relate"
            :key="item.id"
            :name="item.name"
            :image="item.image"
            :price="item.price"
            :sold="item.sold"
            :rate="item.rate"
          >
          </product>
        </div>
      </div>
    </section>
  </DefaultLayout>
</template>

<script>
import BannerSlides from "../components/BannerSlides.vue";
import Product from "../components/Product.vue";
import SlideImages from "../components/SlideImages.vue";
import DefaultLayout from "../Layouts/DefaultLayout.vue";
export default {
  components: { DefaultLayout, BannerSlides, SlideImages, Product },
  name: "ProductDetail",
  data() {
    return {
      rating_filter_select: 1,
      expand: false,
      order_quantity: 1,
      rating: 3.6,
      sold: 1234,
      inventory: 123,
      items: [
        {
          url: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
        },
        {
          url: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
        },
        {
          url: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
        },
        {
          url: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
        },
      ],
      variants: [
        {
          id: 1,
          name: "Màu sắc",
          items: [
            {
              id: 1,
              name: "Đỏ mận",
              image: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
            },
            {
              id: 2,
              name: "Đỏ mận",
              image: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
            },
            {
              id: 3,
              name: "Đỏ mận",
              image: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
            },
            {
              id: 4,
              name: "Đỏ mận",
              image: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
            },
            {
              id: 5,
              name: "Đỏ mận",
              image: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
            },
            {
              id: 6,
              name: "Đỏ mận",
              image: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
            },
          ],
        },
        {
          id: 2,
          name: "Kích thước",
          items: [
            {
              id: 1,
              name: "Size S",
            },
            {
              id: 2,
              name: "Size S",
            },
            {
              id: 3,
              name: "Size S",
            },
            {
              id: 4,
              name: "Size S",
            },
          ],
        },
      ],
      comments: [
        {
          id: 1,
          user: {
            avatar: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
            username: "Trần Hồng",
          },
          rating: 5,
          content:
            "Giao hàng nhanh, chất vải đẹp. Chất mát, mịn. Lần sau sẽ ủng hộ shop tiếp. Chúc shop buôn may bán đắt.",
          images: [
            {
              id: 1,
              url: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
            },
            {
              id: 2,
              url: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
            },
            {
              id: 3,
              url: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
            },
            {
              id: 4,
              url: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
            },
          ],
        },
        {
          id: 2,
          user: {
            avatar: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
            username: "Trần Hồng",
          },
          rating: 5,
          content:
            "Giao hàng nhanh, chất vải đẹp. Chất mát, mịn. Lần sau sẽ ủng hộ shop tiếp. Chúc shop buôn may bán đắt.",
          images: [
            {
              id: 1,
              url: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
            },
            {
              id: 2,
              url: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
            },
            {
              id: 3,
              url: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
            },
            {
              id: 4,
              url: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
            },
          ],
        },
        {
          id: 3,
          user: {
            avatar: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
            username: "Trần Hồng",
          },
          rating: 5,
          content:
            "Giao hàng nhanh, chất vải đẹp. Chất mát, mịn. Lần sau sẽ ủng hộ shop tiếp. Chúc shop buôn may bán đắt.",
          images: [
            {
              id: 1,
              url: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
            },
            {
              id: 2,
              url: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
            },
            {
              id: 3,
              url: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
            },
            {
              id: 4,
              url: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
            },
          ],
        },
        {
          id: 4,
          user: {
            avatar: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
            username: "Trần Hồng",
          },
          rating: 5,
          content:
            "Giao hàng nhanh, chất vải đẹp. Chất mát, mịn. Lần sau sẽ ủng hộ shop tiếp. Chúc shop buôn may bán đắt.",
          images: [
            {
              id: 1,
              url: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
            },
            {
              id: 2,
              url: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
            },
            {
              id: 3,
              url: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
            },
            {
              id: 4,
              url: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
            },
          ],
        },
        {
          id: 5,
          user: {
            avatar: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
            username: "Trần Hồng",
          },
          rating: 5,
          content:
            "Giao hàng nhanh, chất vải đẹp. Chất mát, mịn. Lần sau sẽ ủng hộ shop tiếp. Chúc shop buôn may bán đắt.",
          images: [
            {
              id: 1,
              url: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
            },
            {
              id: 2,
              url: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
            },
            {
              id: 3,
              url: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
            },
          ],
        },
        {
          id: 6,
          user: {
            avatar: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
            username: "Trần Hồng",
          },
          rating: 5,
          content:
            "Giao hàng nhanh, chất vải đẹp. Chất mát, mịn. Lần sau sẽ ủng hộ shop tiếp. Chúc shop buôn may bán đắt.",
          images: [
            {
              id: 1,
              url: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
            },
            {
              id: 2,
              url: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
            },
            {
              id: 3,
              url: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
            },
            {
              id: 4,
              url: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
            },
          ],
        },
        {
          id: 7,
          user: {
            avatar: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
            username: "Trần Hồng",
          },
          rating: 5,
          content:
            "Giao hàng nhanh, chất vải đẹp. Chất mát, mịn. Lần sau sẽ ủng hộ shop tiếp. Chúc shop buôn may bán đắt.",
          images: [
            {
              id: 1,
              url: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
            },
            {
              id: 2,
              url: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
            },
            {
              id: 3,
              url: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
            },
            {
              id: 4,
              url: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
            },
          ],
        },
      ],
      products_relate: [
        {
          id: 1,
          image:
            "https://i.pinimg.com/736x/31/27/8a/31278a62a26ffd7d8408b9e41a8c1afc.jpg",
          name: "Áo phông nữ uzzlang chất siêu đẹp",
          price: 123000,
          sold: 1200,
        },
        {
          id: 2,
          image:
            "https://i.pinimg.com/736x/31/27/8a/31278a62a26ffd7d8408b9e41a8c1afc.jpg",
          name: "Áo phông nữ uzzlang chất siêu đẹp",
          price: 123000,
          sold: 1200,
        },
        {
          id: 3,
          image:
            "https://i.pinimg.com/736x/31/27/8a/31278a62a26ffd7d8408b9e41a8c1afc.jpg",
          name: "Áo phông nữ uzzlang chất siêu đẹp",
          price: 123000,
          sold: 200,
        },
        {
          id: 4,
          image:
            "https://i.pinimg.com/736x/31/27/8a/31278a62a26ffd7d8408b9e41a8c1afc.jpg",
          name: "Áo phông nữ uzzlang chất siêu đẹp",
          price: 123000,
          sold: 200,
        },
        {
          id: 5,
          image:
            "https://i.pinimg.com/736x/31/27/8a/31278a62a26ffd7d8408b9e41a8c1afc.jpg",
          name: "Áo phông nữ uzzlang chất siêu đẹp",
          price: 123000,
          sold: 200,
        },
        {
          id: 6,
          image:
            "https://i.pinimg.com/736x/31/27/8a/31278a62a26ffd7d8408b9e41a8c1afc.jpg",
          name: "Áo phông nữ uzzlang chất siêu đẹp",
          price: 123000,
          rate: 5,
        },
        {
          id: 7,
          image:
            "https://i.pinimg.com/736x/31/27/8a/31278a62a26ffd7d8408b9e41a8c1afc.jpg",
          name: "Áo phông nữ uzzlang chất siêu đẹp",
          price: 123000,
          rate: 5,
        },
        {
          id: 8,
          image:
            "https://i.pinimg.com/736x/31/27/8a/31278a62a26ffd7d8408b9e41a8c1afc.jpg",
          name: "Áo phông nữ uzzlang chất siêu đẹp",
          price: 123000,
          sold: 200,
        },
        {
          id: 9,
          image:
            "https://i.pinimg.com/736x/31/27/8a/31278a62a26ffd7d8408b9e41a8c1afc.jpg",
          name: "Áo phông nữ uzzlang chất siêu đẹp",
          price: 123000,
          sold: 200,
        },
        {
          id: 10,
          image:
            "https://i.pinimg.com/736x/31/27/8a/31278a62a26ffd7d8408b9e41a8c1afc.jpg",
          name: "Áo phông nữ uzzlang chất siêu đẹp",
          price: 123000,
          sold: 200,
        },
        {
          id: 11,
          image:
            "https://i.pinimg.com/736x/31/27/8a/31278a62a26ffd7d8408b9e41a8c1afc.jpg",
          name: "Áo phông nữ uzzlang chất siêu đẹp",
          price: 123000,
          sold: 200,
        },
        {
          id: 12,
          image:
            "https://i.pinimg.com/736x/31/27/8a/31278a62a26ffd7d8408b9e41a8c1afc.jpg",
          name: "Áo phông nữ uzzlang chất siêu đẹp",
          price: 123000,
          sold: 200,
        },
      ],
    };
  },
  mounted() {
    this.setMaxHeight();
    window.addEventListener("resize", this.setMaxHeight);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.setMaxHeight);
  },
  methods: {
    formatNumber(number) {
      if (number >= 1000) {
        const suffixes = ["", "k", "M", "B", "T"];
        const suffixIndex = Math.floor(Math.log10(number) / 3);
        const formattedNumber = (number / Math.pow(1000, suffixIndex))
          .toFixed(1)
          .replace(".", ",");
        return formattedNumber + suffixes[suffixIndex];
      }

      return number.toString();
    },
    setMaxHeight() {
      const extendContentHeight = this.$refs.extendContent.offsetHeight;
      this.$refs.relateProducts.style.maxHeight = extendContentHeight + "px";
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  column-gap: 16px;
}
#products-relate .product-extend__item-headding {
  margin: 0;
}

#product-extend-content {
  display: flex;
  flex-direction: column;
  row-gap: 22px;
}
#products-relate {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  padding: 16px;
  width: 266px;
  background: #ffffff;
  overflow-y: scroll;
  overflow-x: hidden;
}
.__comment__image__last-item {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: #00000080;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
}
.__comment__image__item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.__comment__image__item {
  position: relative;
  width: 87px;
  height: 87px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
}
.__comment__images {
  display: flex;
  column-gap: 8px;
}
.__comment__username {
  font-weight: 600;
}
.__comment__body {
  display: flex;
  flex-direction: column;
  row-gap: 8px;
}
.__item__rating__comment {
  display: flex;
  column-gap: 12px;
}
.__item__rating__body {
  padding-top: 24px;
  display: flex;
  flex-direction: column;
  row-gap: 16px;
}
.__item__rating__filter-item__active {
  color: #ec1c24;
  border: 1px solid #ec1c24;
}
.__item__rating__filter-item {
  display: flex;
  align-items: center;
  column-gap: 12px;
  background: #ffffff;
  padding: 12px;
  border-radius: 100px;
  cursor: pointer;
}
.__item__rating__filters {
  column-gap: 8px;
  display: flex;
  align-items: center;
}
.__rating-value span {
  font-size: 36px;
  line-height: 32px;
  color: #ec1c24;
}
.__rating-value {
  font-size: 24px;
  line-height: 28px;
  font-weight: 600;
  color: #8f8f8f;
}
.__item__rating__headding {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 12px;
}
.btn-expand-content {
  color: #0074bd;
  font-weight: 600;
  margin-top: 16px;
}
.expand-content {
  height: auto;
  white-space: pre-line;
}
.collapse-content {
  height: 4.5em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.__item__grid__titles {
  color: #6f6f6f;
}
.product-extend__item__grid {
  display: flex;
  column-gap: 28px;
}
.product-extend__item-headding::before {
  content: "•";
  padding-right: 8px;
}
.product-extend__item-headding {
  color: #0074bd;
  font-weight: 600;
  margin-bottom: 16px;
}
.product-extend__item {
  padding: 16px;
  border-radius: 8px;
  background: #f0f2f5;
}
#btn-view-shop {
  padding: 10px 16px;
  border: 1px solid #0074bd;
  border-radius: 100px;
  color: #0074bd;
}
.shop-overall__item__name {
  font-size: 14px;
}
.shop-overall__item__quantiy {
  font-weight: 700;
  color: #0074bd;
}
.shop-overall__item {
  text-align: center;
}
#shop-overall {
  display: flex;
  column-gap: 32px;
  align-items: center;
}
#product-extend__headding {
  display: flex;
  justify-content: space-between;
}
#shop__location {
  display: flex;
  align-items: center;
  column-gap: 8px;
  font-size: 12px;
  font-weight: 400;
}
#shop__name p:first-child {
  font-weight: 600;
}
#shop-info {
  display: flex;
  column-gap: 15px;
}
#product-extend-content {
  background: #ffffff;
  margin-top: 16px;
  padding: 17px 19px;
}
#btn-buy-now {
  background: #ec1c24;
  color: #ffffff;
}
#btn-add-to-cart {
  background: #fbd2d3;
  color: #ec1c24;
}
#actions button {
  padding: 12px 24px;
  border-radius: 100px;
}
#actions {
  display: flex;
  column-gap: 18px;
}
#inventory span {
  color: #ec1c24;
  padding-left: 27px;
}
.quantity-order__input {
  border-radius: 2px;
  width: 46px;
  border: 1px solid #8f8f8f;
  text-align: center;
}
.quantity-order__button i {
  font-size: 11px;
}
.quantity-order__button {
  border-radius: 2px;
  display: flex;
  align-items: center;
  padding: 12px;
  background: #c7e9ff;
  border: 1px solid #0074bd;
}
#quantity-order div {
  display: flex;
  column-gap: 4px;
}
#quantity-order {
  column-gap: 26px;
  display: flex;
  align-items: center;
}
.product__variants__list__items {
  display: flex;
  column-gap: 10px;
  row-gap: 10px;
  flex-wrap: wrap;
}
.product__variant__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.product__variant__img {
  width: 16px;
  height: 16px;
}
.product__variant__item {
  padding: 6px 12px;
  column-gap: 10px;
  display: flex;
  background: #f0f2f5;
  border-radius: 20px;
  cursor: pointer;
}
.headding-text {
  font-weight: 600;
}
.product__variants__list__name {
  margin: 10px 0;
}
.product__variant__headding::before {
  content: "•";
  padding-right: 8px;
}
.product__variant__headding {
  font-weight: 600;
  color: #0074bd;
}
.product__evaluate__sold {
  padding-left: 12px;
}
.product__evaluates p {
  font-size: 14px;
}
.product__evaluates {
  display: flex;
  column-gap: 10px;
  align-items: center;
}
.product__name {
  font-size: 18px;
  line-height: 28px;
}
#product-info {
  background: #ffffff;
  padding: 16px;
  display: flex;
  flex-direction: column;
  row-gap: 18px;
}
.share__social__image {
  width: 24px;
  height: 24px;
}
#shares {
  display: flex;
  column-gap: 16px;
  align-items: center;
}
.image__arrow-btn {
  display: flex;
  column-gap: 30px;
  color: #d4d4d4;
}
#images__arrow {
  display: flex;
  justify-content: space-between;
}
#product-images {
  background: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 10px;
  row-gap: 20px;
}
</style>
