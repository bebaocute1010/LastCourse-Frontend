<template>
  <div id="search-scr">
    <div class="container screen-body">
      <div id="filters">
        <div class="filter-item">
          <h3 class="filter-item-heading">DANH MỤC SẢN PHẨM</h3>
          <div class="filter-item-body">
            <v-list class="filter-item__list">
              <div class="checkbox-group" v-if="page_type != 1">
                <v-list-item
                  class="filter-item__list__item"
                  v-for="(item, i) in filterCats"
                  :key="i"
                >
                  <template v-slot:prepend="{ isActive }">
                    <v-list-item-action start>
                      <v-checkbox-btn
                        color="#EC1C24"
                        :model-value="isActive"
                        :ref="`checkboxCatsFilter[${i}]`"
                        :label="item.name"
                        v-model="filter_cats_selected[i]"
                        @update:modelValue="getResultsSearch"
                      ></v-checkbox-btn>
                    </v-list-item-action>
                  </template>
                </v-list-item>
              </div>

              <v-radio-group
                v-else
                v-model="filters_search_result.filter_cats[0]"
                @update:modelValue="
                  updateValueRadio(filters_search_result.filter_cats[0])
                "
              >
                <v-radio
                  class="category-radio-btn"
                  v-for="(item, i) in filter_cats"
                  :key="i"
                  color="#EC1C24"
                  :label="item.name"
                  :value="item.id"
                ></v-radio>
              </v-radio-group>
            </v-list>
          </div>
          <div class="filter-footer" v-if="page_type != 1">
            <button
              v-if="!more_filter_cats"
              class="btn-show-cats"
              @click="more_filter_cats = true"
            >
              Thêm
            </button>
            <button v-else class="btn-show-cats" @click="more_filter_cats = false">
              Bớt
            </button>
          </div>
        </div>

        <div class="filter-item">
          <h3 class="filter-item-heading">KHOẢNG GIÁ</h3>
          <div id="filter-range-price" class="filter-item-body">
            <input class="filter-range-price__input" v-model="priceMinFormated" />
            <v-icon>mdi-minus</v-icon>
            <input class="filter-range-price__input" v-model="priceMaxFormated" />
          </div>

          <div class="btn-center">
            <button @click="getResultsSearch">Áp dụng</button>
          </div>
        </div>

        <div class="filter-item">
          <h3 class="filter-item-heading">ĐÁNH GIÁ</h3>
          <div id="filter-rating" class="filter-item-body">
            <v-rating
              v-model="filters_search_result.filter_rating"
              bg-color="orange-lighten-1"
              color="#FFB800"
              size="26"
              hover
              @update:modelValue="getResultsSearch"
            ></v-rating>

            <div class="rating-values" v-if="filters_search_result.filter_rating">
              <span>
                {{
                  filters_search_result.filter_rating < 5
                    ? "Từ " + filters_search_result.filter_rating + " sao"
                    : "5 sao"
                }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div id="results-filter">
        <div class="results__title" v-if="getTitleResults() != null">
          <p>
            {{ getTitleResults() }}
          </p>
        </div>

        <div class="results__filter-options" v-if="page_type == 0 || page_type == 1">
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
                    filters_search_result.sort_desc_price = !filters_search_result.sort_desc_price;
                    getResultsSearch();
                  } else {
                    filter_option_selected = 3;
                  }
                }
              "
            >
              <span>Giá</span>
              <v-icon>{{
                filters_search_result.sort_desc_price
                  ? "mdi-chevron-down"
                  : "mdi-chevron-up"
              }}</v-icon>
            </li>
          </ul>
        </div>

        <div class="products-grid">
          <div class="producst-grid__grid">
            <div class="products-grid__item" v-for="(item, i) in products_grid" :key="i">
              <Product
                width="100%"
                height="100%"
                :image="item.image"
                :name="item.name"
                :price="item.price"
                :sold="item?.sold"
                :rate="item?.rate"
                :slug="item?.slug"
                image_w="184px"
                image_h="184px"
              ></Product>
            </div>
          </div>

          <div class="paginate-bar" v-if="num_page > 1">
            <v-pagination
              v-model="filters_search_result.page"
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
</template>

<script>
import Product from "../components/Product.vue";
import ProductsGrid from "../components/ProductsGrid.vue";
import DefaultLayout from "../Layouts/DefaultLayout.vue";

export default {
  name: "Search",
  components: { DefaultLayout, Product, ProductsGrid },
  computed: {
    priceMinFormated: {
      get() {
        if (this.filters_search_result.filter_price_min) {
          return this.filters_search_result.filter_price_min.toLocaleString();
        }
        return null;
      },
      set(value) {
        const parsed_value = parseInt(value.replace(/,/g, ""));
        if (!isNaN(parsed_value)) {
          if (parsed_value == 0) {
            this.filters_search_result.filter_price_min = null;
          } else {
            this.filters_search_result.filter_price_min = parsed_value;
          }
        }
      },
    },
    priceMaxFormated: {
      get() {
        if (this.filters_search_result.filter_price_max) {
          return this.filters_search_result.filter_price_max.toLocaleString();
        }
        return null;
      },
      set(value) {
        const parsed_value = parseInt(value.replace(/,/g, ""));
        if (!isNaN(parsed_value)) {
          if (parsed_value == 0) {
            this.filters_search_result.filter_price_max = null;
          } else {
            this.filters_search_result.filter_price_max = parsed_value;
          }
        }
      },
    },
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
        this.filters_search_result.sort_desc_price = this.filters_search_result.sort_newest = this.filters_search_result.sort_sell = null;
      } else if (this.filter_option_selected === 1) {
        this.filters_search_result.sort_newest = true;
        this.filters_search_result.sort_desc_price = this.filters_search_result.sort_sell = null;
      } else if (this.filter_option_selected === 2) {
        this.filters_search_result.sort_sell = true;
        this.filters_search_result.sort_desc_price = this.filters_search_result.sort_newest = null;
      } else if (this.filter_option_selected === 3) {
        this.filters_search_result.sort_desc_price = false;
        this.filters_search_result.sort_sell = this.filters_search_result.sort_newest = null;
      }
      this.getResultsSearch();
    },
    $route() {
      this.handleUpdateCategoryValue(this.$route.query?.id);
      this.processPageType();
    },
  },
  data() {
    return {
      radio_selected: 0,
      page_type: 0,
      num_page: 1,
      more_filter_cats: false,
      filter_option_selected: 0,
      filter_options: ["Liên quan", "Mới nhất", "Bán chạy"],
      filter_cats: [],
      filter_cats_selected: [],
      filters_search_result: {
        search: "",
        page: 1,
        filter_cats: [],
        filter_price_min: null,
        filter_price_max: null,
        filter_rating: null,
        sort_desc_price: null,
        sort_newest: null,
        sort_sell: null,
        type: null,
      },
      products_grid: [],
    };
  },
  created() {
    this.processPageType();
    this.$eventBus.on("search", (keywords) => {
      this.filters_search_result.search = keywords;
      this.getResultsSearch();
    });
  },
  methods: {
    updateValueRadio(cat_id) {
      const category = this.filter_cats.find(({ id }) => id == cat_id);
      this.$router.push({
        name: "products-category",
        query: {
          name: category.name,
          id: category.id,
        },
      });
    },
    handleUpdateCategoryValue(cat_id) {
      if (this.page_type == 1) {
        this.filters_search_result.filter_cats[0] = parseInt(cat_id);
      }
    },
    async processPageType() {
      this.startLoad();
      await this.setTypePage();
      if (!this.filter_cats?.length) {
        await this.getCategories();
      }
      this.handleUpdateCategoryValue(this.$route.query.id);
      await this.getResultsSearch();
      this.finishLoad();
    },
    async getCategories() {
      const response = await axios.get("get/category/all");
      this.filter_cats = response.data.data;
    },
    async setTypePage() {
      this.page_type = 0;
      let window_title = "M Clothing";
      if (this.$route.name == "search") {
        window_title = "Tìm kiếm sản phẩm";
        if (this.$route.query.search) {
          this.filters_search_result.search = this.$route.query.search;
        }
      } else if (this.$route.name == "products-category") {
        this.page_type = 1;
        window_title = "Sản phẩm danh mục";
        this.filters_search_result.search = "";
      } else if (this.$route.name == "featured-products") {
        this.page_type = 2;
        window_title = "Sản phẩm nổi bật";
      } else if (this.$route.name == "top-selling-products") {
        this.page_type = 3;
        window_title = "Sản phẩm bán chạy";
      }
      this.filters_search_result.type = this.page_type;
      this.setWindowTitle(window_title);
    },
    getTitleResults() {
      switch (this.page_type) {
        case 0:
          return this.filters_search_result.search
            ? `Kết quả tìm kiếm cho ‘ ${this.filters_search_result.search} ‘`
            : null;
        case 1:
          return `Sản phẩm danh mục: ${this.$route.query.name}`;
        case 2:
          return "Sản phẩm nổi bật";
        case 3:
          return "Sản phẩm bán chạy";
        default:
          return null;
      }
    },
    async getResultsSearch() {
      this.startLoad();
      const form_data = new FormData();
      if (this.page_type != 1) {
        this.filters_search_result.filter_cats.length = 0;
        this.filter_cats_selected.forEach((item, index) => {
          if (item) {
            this.filters_search_result.filter_cats.push(this.filter_cats[index].id);
          }
        });
      }
      for (let key in this.filters_search_result) {
        if (key == "filter_cats" && this.filters_search_result[key].length > 0) {
          if (this.page_type == 1) {
            form_data.append(`filter_cats[0]`, this.filters_search_result[key][0]);
          } else {
            for (let k in this.filters_search_result.filter_cats) {
              form_data.append(`filter_cats[${k}]`, this.filters_search_result[key][k]);
            }
          }
        } else if (this.filters_search_result[key] !== null) {
          form_data.append(key, this.filters_search_result[key]);
        }
      }
      try {
        const response = await axios.post("get/search-products", form_data);
        this.products_grid = response.data.data.products;
        this.num_page = response.data.data.num_page;
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
    search(value) {
      this.filters_search_result.search = value;
      this.filter_cats_selected.length = 0;
      this.getResultsSearch();
    },
  },
};
</script>

<style scoped>
.btn-show-cats:hover {
  color: #ec1c24;
}
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
  width: 100%;
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
  width: 100%;
}

.filter-item:first-child {
  max-height: 795px;
  overflow: scroll;
}
.filter-item:last-child {
  border-bottom: unset;
}
#filters {
  display: flex;
  max-width: 286px;
  flex-direction: column;
}
.producst-grid__grid {
  display: grid;
  gap: 13px;
  grid-template-columns: repeat(4, 1fr);
  padding: 25px;
}
.products-grid__item {
  max-width: 200px;
}
.screen-body {
  display: flex;
}
</style>
