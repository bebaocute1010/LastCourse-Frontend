<template>
  <DefaultLayout @search="search">
    <div id="search-scr">
      <div class="container screen-body">
        <div id="filters">
          <div class="filter-item">
            <h3 class="filter-item-heading">DANH MỤC SẢN PHẨM</h3>
            <div class="filter-item-body">
              <v-list class="filter-item__list">
                <v-list-item
                  class="filter-item__list__item"
                  v-for="(item, i) in filterCats"
                  :key="i"
                  :title="item"
                >
                  <template v-slot:prepend="{ isActive }">
                    <v-list-item-action start>
                      <v-checkbox-btn
                        color="#EC1C24"
                        :model-value="isActive"
                      ></v-checkbox-btn>
                    </v-list-item-action>
                  </template>
                </v-list-item>
              </v-list>
            </div>
            <div class="filter-footer">
              <button
                v-if="!more_filter_cats"
                id="btn-more-cats"
                @click="more_filter_cats = true"
              >
                Thêm
              </button>
              <button v-else id="btn-less-cats" @click="more_filter_cats = false">
                Bớt
              </button>
            </div>
          </div>

          <div class="filter-item">
            <h3 class="filter-item-heading">KHOẢNG GIÁ</h3>
            <div id="filter-range-price" class="filter-item-body">
              <input
                class="filter-range-price__input"
                type="number"
                v-model="filter_price_min"
              />
              <v-icon>mdi-minus</v-icon>
              <input
                class="filter-range-price__input"
                type="number"
                v-model="filter_price_max"
              />
            </div>

            <div class="btn-center">
              <button @click="getResultsSearch">Áp dụng</button>
            </div>
          </div>

          <div class="filter-item">
            <h3 class="filter-item-heading">ĐÁNH GIÁ</h3>
            <div id="filter-rating" class="filter-item-body">
              <v-rating
                v-model="filter_rating"
                bg-color="orange-lighten-1"
                color="#FFB800"
                size="26"
                @update:modelValue="getResultsSearch"
              ></v-rating>

              <div class="rating-values" v-if="filter_rating">
                <span>
                  {{ filter_rating < 5 ? "Từ " + filter_rating + " sao" : "5 sao" }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div id="results-filter">
          <div class="results__title" v-if="search_keyword">
            <p>Kết quả tìm kiếm cho ‘ {{ search_keyword }} ‘</p>
          </div>

          <div class="results__filter-options">
            <ul class="results__filter-options__list">
              <li
                :class="{
                  'results__filter-option__item': true,
                  active: filter_option_selected === i,
                }"
                v-for="(item, i) in filter_options"
                :key="i"
                @click="filter_option_selected = i"
              >
                <span>{{ item }}</span>
              </li>
              <li
                :class="{
                  'results__filter-option__item': true,
                  active: filter_option_selected === 3,
                }"
                @click="
                  {
                    if (filter_option_selected === 3) {
                      sort_desc_price = !sort_desc_price;
                      getResultsSearch();
                    } else {
                      filter_option_selected = 3;
                    }
                  }
                "
              >
                <span>Giá</span>
                <v-icon>{{
                  sort_desc_price ? "mdi-chevron-down" : "mdi-chevron-up"
                }}</v-icon>
              </li>
            </ul>
          </div>

          <div class="products-grid">
            <div class="producst-grid__grid">
              <div
                class="products-grid__item"
                v-for="(item, i) in products_grid"
                :key="i"
              >
                <Product
                  width="100%"
                  height="100%"
                  :image="item.image"
                  :name="item.name"
                  :price="item.price"
                  :sold="item?.sold"
                  :rate="item?.rate"
                  :slug="item?.slug"
                  imageW="200px"
                  imageH="200px"
                ></Product>
              </div>
            </div>

            <div class="paginate-bar">
              <v-pagination
                v-model="page_active"
                :length="num_page"
                total-visible="6"
                active-color="#EC1C24"
                @update:modelValue="getResultsSearch()"
              ></v-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script>
import Product from "../components/Product.vue";
import ProductsGrid from "../components/ProductsGrid.vue";
import DefaultLayout from "../Layouts/DefaultLayout.vue";

export default {
  name: "Search",
  components: { DefaultLayout, Product, ProductsGrid },
  computed: {
    filterCats() {
      if (!this.more_filter_cats) {
        return this.filter_cats.filter((item, i) => i < 7);
      }
      return this.filter_cats;
    },
  },
  watch: {
    filter_option_selected() {
      if (this.filter_option_selected === 0) {
        this.sort_desc_price = this.sort_newest = this.sort_sell = null;
      } else if (this.filter_option_selected === 1) {
        this.sort_newest = true;
        this.sort_desc_price = this.sort_sell = null;
      } else if (this.filter_option_selected === 2) {
        this.sort_sell = true;
        this.sort_desc_price = this.sort_newest = null;
      } else if (this.filter_option_selected === 3) {
        this.sort_desc_price = false;
        this.sort_sell = this.sort_newest = null;
      }
      this.getResultsSearch();
    },
  },
  data() {
    return {
      page_active: 1,
      num_page: 1,
      filter_rating: null,
      more_filter_cats: false,
      filter_option_selected: 0,
      filter_options: ["Liên quan", "Mới nhất", "Bán chạy"],
      filter_cats: [],
      filter_price_min: null,
      filter_price_max: null,
      sort_desc_price: null,
      sort_newest: null,
      sort_sell: null,
      products_grid: [],
      search_keyword: "",
    };
  },
  created() {
    this.getResultsSearch();
  },
  methods: {
    async getResultsSearch() {
      this.startLoad();
      const response = await axios.post("get/search-products", {
        search: this.search_keyword,
        page: this.page_active,
        filter_cats: this.filter_cats,
        filter_price_min: this.filter_price_min,
        filter_price_max: this.filter_price_max,
        filter_rating: this.filter_rating,
        sort_newest: this.sort_newest,
        sort_sell: this.sort_sell,
        sort_desc_price: this.sort_desc_price,
      });
      this.products_grid = response.data.data.products;
      this.num_page = response.data.data.num_page;
      this.finishLoad();
    },
    search(value) {
      this.search_keyword = value;
      this.getResultsSearch();
    },
  },
};
</script>

<style scoped>
.paginate-bar {
  padding-bottom: 40px;
}
.results__filter-options {
  border-bottom: 2px solid #c4c4c4;
  padding: 0 25px;
}
.results__title {
  padding: 12px 25px 9px;
  border-bottom: 2px solid #c4c4c4;
}
#results-filter {
  background-color: #ffffff;
}
#filter-rating {
  display: flex;
  column-gap: 12px;
  align-items: center;
  color: #555555;
}
.btn-center button:hover {
  background: #8f1111;
}
.btn-center button {
  padding: 8px 22px;
  background: #ec1c24;
  color: #ffffff;
  border-radius: 4px;
}
.btn-center {
  display: flex;
  justify-content: center;
  padding: 30px 0 14px;
}
.filter-range-price__input {
  height: 31px;
  width: 109px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #c4c4c4;
  text-align: right;
}
#filter-range-price {
  display: flex;
  align-items: center;
  column-gap: 5px;
}
.active {
  color: #0172cb;
  box-shadow: 0px 4px 0px 0px blue;
  outline-offset: -3px;
}
.results__filter-option__item {
  padding: 12px 0 16px;
  list-style: none;
  cursor: pointer;
  user-select: none;
}
.results__filter-options__list {
  display: flex;
  column-gap: 36px;
}
.filter-item {
  background: #ffffff;
  padding: 16px;
  border-bottom: 2px solid #e5e5e5;
  border-right: 2px solid #e5e5e5;
}
#filters {
  display: flex;
  flex-direction: column;
  position: sticky;
  position: -webkit-sticky;
  height: 100%;
}
.producst-grid__grid {
  display: grid;
  gap: 13px;
  grid-template-columns: auto auto auto auto;
  padding: 25px;
}
.screen-body {
  display: flex;
}
</style>
