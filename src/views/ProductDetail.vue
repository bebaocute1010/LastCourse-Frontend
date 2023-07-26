<template>
  <div>
    <section id="product">
      <div class="container">
        <Breadcrumbs
          v-if="details"
          :items="details.breadcrumb"
          @clickBreadcrumb="handleClickBreadcrumb"
        ></Breadcrumbs>
        <div class="flex-box">
          <div id="product-images">
            <BannerSlides
              :height="480"
              :items="details?.images"
              style="width: 480px"
              :slide_model="slide_model"
              @updateSlideModel="updateSlideModel"
            ></BannerSlides>
            <div id="images__arrow">
              <p style="font-weight: 600">Hình ảnh sản phẩm</p>
              <div class="image__arrow-btn">
                <v-icon
                  class="btn-arrow-slide"
                  @click="slide_model = Math.max(slide_model - 1, 0)"
                >
                  mdi-chevron-left-circle
                </v-icon>
                <v-icon
                  class="btn-arrow-slide"
                  @click="
                    slide_model = Math.min(slide_model + 1, details.images.length - 1)
                  "
                >
                  mdi-chevron-right-circle
                </v-icon>
              </div>
            </div>
            <SlideImages
              :items="details?.images"
              :refe="'slideImageDetail'"
              img_width="87px"
              style="height: 87px"
              @clickItem="processItemClicked"
            >
            </SlideImages>
            <div id="shares">
              <p>Chia sẻ:</p>
              <router-link :to="{ name: 'coming-soon' }" class="share__social__image">
                <v-img contain src="/src/assets/icons/facebook.svg"></v-img>
              </router-link>

              <router-link :to="{ name: 'coming-soon' }" class="share__social__image">
                <v-img contain src="/src/assets/icons/messenger.svg"></v-img>
              </router-link>

              <router-link :to="{ name: 'coming-soon' }" class="share__social__image">
                <v-img contain src="/src/assets/icons/twiter.svg"></v-img>
              </router-link>

              <router-link :to="{ name: 'coming-soon' }" class="share__social__image">
                <v-img contain src="/src/assets/icons/share.svg"></v-img>
              </router-link>
            </div>
          </div>

          <div id="product-info">
            <p class="product__name">{{ details?.name ?? "..." }}</p>

            <div class="product__evaluates" v-if="details">
              <v-rating
                v-model="details.rating"
                class="icon-size-14"
                size="14"
                color="#FFB800"
                readonly
                half-increments
              ></v-rating>
              <p>{{ details.rating }}/5</p>
              <p class="product__evaluate__sold">
                Đã bán {{ prefixSymbolsNumber(details?.sold) }}
              </p>
            </div>

            <div
              id="product__variants"
              v-if="
                details &&
                ((details?.sizes.length > 0 && details.sizes[0].name != null) ||
                  (details?.colors.length > 0 && details.colors[0].name != null))
              "
            >
              <p class="product__variant__heading">Phân loại</p>
              <div
                class="product__variants__list"
                v-if="details?.colors.length && details.colors[0].name"
              >
                <p class="product__variants__list__name heading-text">Màu sắc</p>
                <div class="product__variants__list__items">
                  <div
                    :class="{
                      product__variant__item: true,
                      product__variant__item__active: i === color_active,
                    }"
                    v-for="(variant, i) in details.colors"
                    :key="i"
                    @click="chooseVariant(0, i)"
                  >
                    <div class="product__variant__img" v-if="variant.image">
                      <img :src="variant.image" />
                    </div>
                    <p class="product__variant__name">{{ variant.name }}</p>
                  </div>
                </div>
              </div>

              <div
                class="product__variants__list"
                v-if="details?.sizes.length && details.sizes[0].name != null"
              >
                <p class="product__variants__list__name heading-text">Kích thước</p>
                <div class="product__variants__list__items">
                  <div
                    :class="{
                      product__variant__item: true,
                      product__variant__item__active: i === size_active,
                    }"
                    v-for="(variant, i) in details?.sizes"
                    :key="i"
                    @click="chooseVariant(1, i)"
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
              <p class="heading-text">Số lượng:</p>
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
                  @click="
                    order_quantity = Math.min(order_quantity + 1, details.inventory)
                  "
                >
                  <v-icon>mdi-plus</v-icon>
                </div>
              </div>
            </div>

            <div id="inventory">
              <p class="heading-text">
                Tồn kho: <span>{{ this.getLocaleStringNumber(inventory) }}</span>
              </p>
              <p class="heading-text">
                Giá:
                <span v-if="details?.promotional_price == null">
                  {{ this.getLocaleStringNumber(price) }} đ</span
                >

                <span v-if="details?.promotional_price != null">
                  <strong class="default-price">
                    {{ this.getLocaleStringNumber(price) }} đ</strong
                  >
                  <strong class="promotional-price">
                    {{ this.getLocaleStringNumber(details.promotional_price) }} đ</strong
                  >
                </span>
              </p>
            </div>

            <div id="actions">
              <button id="btn-add-to-cart" @click="addToCart()">Thêm vào giỏ hàng</button>
              <button id="btn-buy-now" @click="addToCart(true)">Mua ngay</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="product-extend">
      <div class="container flex-box">
        <div id="product-extend-content" ref="extendContent">
          <div id="product-extend__heading" class="user-not-select">
            <div id="shop-info">
              <v-avatar id="shop__avatar"
                ><v-img cover :src="details?.shop.avatar"></v-img
              ></v-avatar>
              <div id="shop__name">
                <p>{{ details?.shop.name ?? "..." }}</p>
                <div id="shop__location">
                  <v-icon color="#0074BD">mdi-map-marker</v-icon>
                  <p>{{ details?.shop.locate ?? "..." }}</p>
                </div>
              </div>
            </div>

            <div id="shop-overall">
              <div class="shop-overall__item">
                <p class="shop-overall__item__quantiy">
                  {{ details?.shop.product_count ?? "..." }}
                </p>
                <p class="shop-overall__item__name">Sản phẩm</p>
              </div>

              <div class="shop-overall__item">
                <p class="shop-overall__item__quantiy">
                  {{ details?.shop.rating_count ?? "..." }}
                </p>
                <p class="shop-overall__item__name">Đánh giá</p>
              </div>

              <div class="shop-overall__item">
                <p class="shop-overall__item__quantiy">
                  {{ prefixSymbolsNumber(details?.shop.followers) }}
                </p>
                <p class="shop-overall__item__name">Follow</p>
              </div>

              <div>
                <router-link
                  id="btn-view-shop"
                  :to="
                    details?.shop.slug
                      ? { name: 'shop-profile', params: { slug: details.shop.slug } }
                      : '#'
                  "
                  >Xem shop</router-link
                >
              </div>
            </div>
          </div>

          <div id="product-extend__describe" class="product-extend__item">
            <p class="product-extend__item-heading">Mô tả sản phẩm</p>
            <div class="product-extend__item-body">
              <div class="product-extend__item__grid">
                <div class="__item__grid__titles">
                  <p>Danh mục</p>
                  <p>Kho</p>
                  <p>Địa chỉ gửi</p>
                </div>
                <div class="__item__grid__contents">
                  <p>{{ details?.category }}</p>
                  <p>{{ details?.inventory }}</p>
                  <p>{{ details?.address }}</p>
                </div>
              </div>
            </div>
          </div>

          <div id="product-extend__detail" class="product-extend__item">
            <p class="product-extend__item-heading">Chi tiết sản phẩm</p>
            <div class="product-extend__item-body">
              <p :class="{ 'collapse-content': !expand, 'expand-content': expand }">
                {{ details?.detail }}
              </p>
              <button class="btn-expand-content" @click="expand = !expand">
                {{ !expand ? "Mở rộng" : "Thu gọn" }}
                <v-icon>{{ !expand ? "mdi-chevron-right" : "mdi-chevron-up" }}</v-icon>
              </button>
            </div>
          </div>

          <div
            id="product-extend__evaluate"
            ref="extendContent1"
            class="product-extend__item"
          >
            <p class="product-extend__item-heading">Đánh giá sản phẩm</p>
            <div class="product-extend__item-body">
              <div class="__item__rating">
                <div class="__item__rating__heading user-not-select" v-if="details">
                  <p class="__rating-value">
                    <span>{{ details?.rating }}</span
                    >/5
                  </p>
                  <v-rating
                    v-model="details.rating"
                    half-increments
                    color="#FFB800"
                    size="24"
                    readonly
                  ></v-rating>
                  <div class="__item__rating__filters">
                    <div
                      :class="{
                        '__item__rating__filter-item': true,
                        '__item__rating__filter-item__active': rating_filter_select === 0,
                      }"
                      @click="rating_filter_select = 0"
                    >
                      <p>Tất cả</p>
                      <p class="____quantity">
                        ({{ prefixSymbolsNumber(details?.rating_count[0]) }})
                      </p>
                    </div>

                    <div
                      :class="{
                        '__item__rating__filter-item': true,
                        '__item__rating__filter-item__active': rating_filter_select === 5,
                      }"
                      @click="rating_filter_select = 5"
                    >
                      <v-rating
                        class="icon-size-14"
                        length="5"
                        color="#FFB800"
                        size="14"
                        readonly
                        model-value="5"
                      ></v-rating>
                      <p class="____quantity">
                        ({{ prefixSymbolsNumber(details?.rating_count[5]) }})
                      </p>
                    </div>

                    <div
                      :class="{
                        '__item__rating__filter-item': true,
                        '__item__rating__filter-item__active': rating_filter_select === 4,
                      }"
                      @click="rating_filter_select = 4"
                    >
                      <v-rating
                        class="icon-size-14"
                        length="4"
                        color="#FFB800"
                        model-value="4"
                        size="14"
                        readonly
                      ></v-rating>
                      <p class="____quantity">
                        ({{ prefixSymbolsNumber(details?.rating_count[4]) }})
                      </p>
                    </div>

                    <div
                      :class="{
                        '__item__rating__filter-item': true,
                        '__item__rating__filter-item__active': rating_filter_select === 3,
                      }"
                      @click="rating_filter_select = 3"
                    >
                      <v-rating
                        class="icon-size-14"
                        length="3"
                        model-value="3"
                        color="#FFB800"
                        size="14"
                        readonly
                      ></v-rating>
                      <p class="____quantity">
                        ({{ prefixSymbolsNumber(details?.rating_count[3]) }})
                      </p>
                    </div>

                    <div
                      :class="{
                        '__item__rating__filter-item': true,
                        '__item__rating__filter-item__active': rating_filter_select === 2,
                      }"
                      @click="rating_filter_select = 2"
                    >
                      <v-rating
                        class="icon-size-14"
                        length="2"
                        color="#FFB800"
                        model-value="2"
                        size="14"
                        readonly
                      ></v-rating>
                      <p class="____quantity">
                        ({{ prefixSymbolsNumber(details?.rating_count[2]) }})
                      </p>
                    </div>

                    <div
                      :class="{
                        '__item__rating__filter-item': true,
                        '__item__rating__filter-item__active': rating_filter_select === 1,
                      }"
                      @click="rating_filter_select = 1"
                    >
                      <v-rating
                        class="icon-size-14"
                        length="1"
                        model-value="1"
                        color="#FFB800"
                        size="14"
                        readonly
                      ></v-rating>
                      <p class="____quantity">
                        ({{ prefixSymbolsNumber(details?.rating_count[1]) }})
                      </p>
                    </div>
                  </div>
                </div>

                <div class="__item__rating__body" v-if="details?.comments.num_page > 0">
                  <div
                    class="__item__rating__comment"
                    v-for="comment in comments"
                    :key="comment.id"
                  >
                    <v-avatar>
                      <v-img cover :src="comment.user.avatar"></v-img>
                    </v-avatar>

                    <div class="__comment__body">
                      <p class="__comment__username">{{ comment.user.name }}</p>
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
                          :key="index"
                        >
                          <img :src="image" />

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
                <div class="rating-not-item" v-else>Không có đánh giá nào.</div>
              </div>
            </div>

            <v-pagination
              v-if="details?.comments.num_page > 1"
              v-model="page_active"
              :length="details?.comments.num_page"
              :total-visible="5"
              active-color="#EC1C24"
              @update:modelValue="getComments(page_active)"
            ></v-pagination>
          </div>
        </div>
        <div id="products-relate" ref="relateProducts">
          <p class="product-extend__item-heading">Sản phẩm tương tự</p>
          <product
            v-for="(item, i) in details?.relate_products"
            :key="i"
            :name="item.name"
            :image="item.image"
            :price="item.price"
            :sold="item.sold"
            :rate="item.rate"
            :slug="item.slug"
          >
          </product>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import BannerSlides from "../components/BannerSlides.vue";
import Breadcrumbs from "../components/Breadcrumbs.vue";
import Product from "../components/Product.vue";
import SlideImages from "../components/SlideImages.vue";
import DefaultLayout from "../Layouts/DefaultLayout.vue";
export default {
  components: { DefaultLayout, BannerSlides, SlideImages, Product, Breadcrumbs },
  name: "ProductDetail",
  data() {
    return {
      rating_filter: null,
      slide_model: 0,
      color_active: null,
      size_active: null,
      inventory: "...",
      price: "...",
      page_active: 1,
      rating_filter_select: 0,
      expand: false,
      order_quantity: 1,
      comments: [],
      details: null,
      product_variant_id: null,
    };
  },
  watch: {
    $route(to, from) {
      if (to.name == "product-detail" && to.params.slug !== from.params.slug) {
        this.getProductDetails();
      }
    },
    rating_filter_select() {
      this.page_active = 1;
      this.getComments(this.page_active);
    },
  },
  created() {
    this.setWindowTitle("Chi tiết sản phẩm");
    this.getProductDetails();
  },
  methods: {
    ...mapActions(["setCartProductsSelected"]),
    handleClickBreadcrumb(item) {
      if (item.id !== -1) {
        this.$router.push({
          name: "products-category",
          query: { name: item.name, id: item.id },
        });
      }
    },
    updateSlideModel(value) {
      this.slide_model = value;
    },
    processItemClicked(index) {
      this.slide_model = index;
    },
    async addToCart(buy_now = false) {
      if (this.details.is_variant && this.product_variant_id === null) {
        this.showAlert("Cảnh báo", "Vui lòng chọn phân loại hàng", "warning", null);
        return;
      }
      this.startLoad();
      try {
        const response = await axios.post("cart/create", {
          product_id: this.details.id,
          product_variant_id: this.product_variant_id,
          quantity: this.order_quantity,
        });
        this.setCartProductsSelected([response.data.id]);
        this.showAlert(
          response.data.title,
          response.data.message,
          "success",
          buy_now ? "payment" : null
        );
      } catch (error) {
        this.showAlert(
          error.response.data.title,
          error.response.data.message,
          "error",
          null
        );
        this.setCartProductsSelected([]);
        console.log(error);
      }
      this.finishLoad();
    },
    async chooseVariant(type, index) {
      this.startLoad();
      const slug = this.$route.params.slug;
      if (type == 0) {
        this.color_active = this.color_active != index ? index : null;
      } else if (type == 1) {
        this.size_active = this.size_active != index ? index : null;
      }
      let url = `product/variant-quantity/${slug}`;
      let color =
        this.color_active !== null ? this.details.colors[this.color_active].name : null;
      let size =
        this.size_active !== null ? this.details.sizes[this.size_active].name : null;
      try {
        const response = await axios.post(url, {
          color: color,
          size: size,
        });
        this.inventory = response.data.inventory;
        this.product_variant_id = response.data?.product_variant_id ?? null;
        this.details.promotional_price = response.data.promotional_price;
        this.price = response.data?.price ?? this.price;
      } catch (error) {
        console.log(error);
      }
      this.finishLoad();
    },
    async getComments(page) {
      this.startLoad();
      const slug = this.$route.params.slug;
      const response = await axios.get(
        `product/comments/${slug}?page=${page}${
          this.rating_filter_select != 0 ? "&rating=" + this.rating_filter_select : ""
        }`
      );
      this.comments = response.data.data;
      this.details.comments.num_page = Math.ceil(
        this.details.rating_count[this.rating_filter_select] / 6
      );
      this.finishLoad();
    },
    async getProductDetails() {
      this.startLoad();
      try {
        const slug = this.$route.params.slug;
        const response = await axios.get("product/details/" + slug);
        this.details = response.data.data;
        this.comments = this.details.comments.comments;
        this.inventory = this.details.inventory;
        this.price = this.details.price;
      } catch (error) {
        this.showAlert(
          error.response.data.title,
          error.response.data.message,
          "error",
          "home"
        );
      }
      this.finishLoad();
    },
  },
};
</script>

<style scoped>
.rating-not-item {
  padding: 16px 0;
  width: 100%;
  text-align: center;
}
#product-extend {
  height: 2097px;
}
.flex-box {
  display: flex;
  column-gap: 16px;
  max-height: 100%;
}
#products-relate .product-extend__item-heading {
  margin: 0;
}

#product-extend-content {
  display: flex;
  flex-direction: column;
  row-gap: 22px;
  width: 1212px;
}
#products-relate {
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  row-gap: 16px;
  padding: 16px;
  width: 244px;
  background: #ffffff;
  overflow-y: scroll;
  overflow-x: hidden;
  overflow: -moz-scrollbars-none;
}
#products-relate::-webkit-scrollbar {
  width: 0 !important;
  display: none;
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
.__comment__content {
  height: 3em;
  overflow: hidden;
  text-overflow: ellipsis;
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
.__item__rating__filter-item {
  display: flex;
  align-items: center;
  border: 1px solid #ffffff;
  column-gap: 12px;
  background: #ffffff;
  padding: 12px;
  border-radius: 100px;
  cursor: pointer;
}

.__item__rating__filter-item__active {
  color: #ec1c24;
  border: 1px solid #ec1c24;
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
.__item__rating__heading {
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
#product-extend__evaluate {
  height: 100%;
}
.product-extend__item__grid {
  display: flex;
  column-gap: 28px;
}
.product-extend__item-heading::before {
  content: "•";
  padding-right: 8px;
}
.product-extend__item-heading {
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
#btn-view-shop:hover {
  background: #0074bd;
  color: #ffffff;
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
#product-extend__heading {
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
#btn-buy-now:hover {
  background: #6c0d10;
  color: #ffffff;
}
#btn-buy-now {
  background: #ec1c24;
  color: #ffffff;
}
#btn-add-to-cart:hover {
  background: #ff1a1e;
  color: #ede4e4;
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
  width: 66px;
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
  border: 1px solid #f0f2f5;
  min-width: 60px;
  align-items: center;
  justify-content: center;
}
.product__variant__item__active {
  border: 1px solid #0074bd;
}
.heading-text {
  font-weight: 600;
}
.product__variants__list__name {
  margin: 10px 0;
}
.product__variant__heading::before {
  content: "•";
  padding-right: 8px;
}
.product__variant__heading {
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
  width: 100%;
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
.btn-arrow-slide:hover {
  color: red;
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

.default-price {
  color: black;
  font-weight: 400;
  font-size: 14px;
  text-decoration: line-through;
  margin-right: 16px;
  line-height: -0.5;
}
</style>
