<template>
  <div id="main-content">
    <div id="sections">
      <section id="product-images" class="section">
        <div class="block-info">
          <div class="heading-2">
            <h2>Hình ảnh sản phẩm</h2>
          </div>
          <div class="images user-not-select">
            <div class="image-button" @click="$refs.images.click()">
              <v-icon>mdi-plus-circle</v-icon>
              <span>Thêm ảnh</span>
              <input
                hidden
                multiple
                ref="images"
                type="file"
                accept="image/*"
                @change="onChangeImages"
              />
            </div>
            <SlideImages
              refe="slideImageProduct"
              :slide_show="4"
              @deleteImage="deleteImage"
              :items="image_urls"
              :img_width="'144px'"
              :show_delete="true"
              style="height: 144px"
            ></SlideImages>
          </div>
        </div>
      </section>

      <section id="product-categories" class="section">
        <div class="block-info">
          <div class="heading-2">
            <h2>Danh mục sản phẩm</h2>
          </div>
          <div class="form-group" v-for="(category, index) in categories" :key="index">
            <span class="form-group__label">Danh mục cấp {{ index + 1 }}</span>
            <v-select
              :items="category"
              v-model="categories_selected[index]"
              item-title="name"
              item-value="id"
              class="form-group__select"
              variant="outlined"
              placeholder="Chọn danh mục sản phẩm"
              @update:modelValue="getCategories(index, categories_selected[index])"
            ></v-select>
          </div>
        </div>
      </section>

      <section id="product-information" class="section">
        <div class="block-info">
          <div class="heading-2">
            <h2>Thông tin sản phẩm</h2>
          </div>
          <div class="form-group">
            <span class="form-group__label">Tên sản phẩm</span>
            <v-text-field
              v-model="product.name"
              class="form-group__input"
              variant="outlined"
              placeholder="Nhập tên sản phẩm"
            ></v-text-field>
          </div>
          <div class="form-group">
            <span class="form-group__label">Mô tả chi tiết sản phẩm</span>
            <v-textarea
              v-model="product.detail"
              class="form-group__input input--textarea"
              variant="outlined"
              auto-grow
              placeholder="Nhập mô tả chi tiết sản phẩm"
            ></v-textarea>
          </div>
        </div>

        <div class="block-info">
          <v-row>
            <v-col cols="6" class="v-col-custom-padding">
              <div class="form-group">
                <span class="form-group__label">Thương hiệu</span>
                <v-text-field
                  v-model="product.brand"
                  class="form-group__input"
                  variant="outlined"
                  placeholder="Nhập thương hiệu"
                ></v-text-field>
              </div>
            </v-col>

            <v-col cols="6" v-if="!product.is_variant" class="v-col-custom-padding">
              <div class="form-group">
                <span class="form-group__label">Số lượng</span>
                <v-text-field
                  type="text"
                  v-model="inventoryFormated"
                  class="form-group__input"
                  variant="outlined"
                  placeholder="Nhập số lượng"
                ></v-text-field>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6" class="v-col-custom-padding">
              <div class="form-group">
                <span class="form-group__label">Giá niêm yết</span>
                <v-text-field
                  v-model="priceFormated"
                  class="form-group__input"
                  variant="outlined"
                  placeholder="Giá niêm yết của sản phẩm"
                ></v-text-field>
              </div>
            </v-col>
            <v-col cols="6" class="v-col-custom-padding">
              <div class="form-group">
                <span class="form-group__label">Giá khuyến mại</span>
                <v-text-field
                  v-model="promotionalPriceFormated"
                  class="form-group__input"
                  variant="outlined"
                  placeholder="Giá khuyến mại của sản phẩm"
                ></v-text-field>
              </div>
            </v-col>
          </v-row>
          <div class="form-group">
            <span class="form-group__label">Tình trạng</span>
            <v-select
              v-model="product.condition_id"
              :items="conditions"
              item-title="name"
              item-value="id"
              class="form-group__select"
              variant="outlined"
              placeholder="Chọn tình trạng sản phẩm"
            >
            </v-select>
          </div>
          <div class="checkbox-group">
            <input
              class="checkbox-group__checkbox"
              type="checkbox"
              v-model="product.is_pre_order"
              id="order"
            />
            <label class="checkbox-group__label" for="order">Hàng đặt trước</label>
          </div>
          <div class="checkbox-group">
            <input
              class="checkbox-group__checkbox"
              type="checkbox"
              id="discount"
              v-model="product.is_buy_more_discount"
            />
            <label class="checkbox-group__label" for="discount">Mua nhiều giảm giá</label>
          </div>

          <div id="discount-detail" v-if="product.is_buy_more_discount">
            <div class="table-headers">
              <span class="table-header__item">Số lượng tối thiểu</span>
              <span class="table-header__item">Số lượng tối đa</span>
              <span class="table-header__item">Số tiền giảm giá</span>
            </div>
            <div
              class="table-rows"
              v-for="(item, i) in product.discount_ranges_min"
              :key="i"
            >
              <div class="table-row__item">
                <v-row>
                  <v-col cols="4">
                    <input
                      class="table-row__item__input"
                      placeholder="Tối thiểu"
                      pattern="[0-9]*"
                      inputmode="numeric"
                      :value="
                        numberFormated()(i, null, product.discount_ranges_min).get()
                      "
                      @input="
                        numberFormated()(i, null, product.discount_ranges_min).set(
                          $event.target.value
                        )
                      "
                    />
                  </v-col>
                  <v-col cols="4">
                    <input
                      class="table-row__item__input"
                      placeholder="Tối đa"
                      pattern="[0-9]*"
                      inputmode="numeric"
                      :value="
                        numberFormated()(i, null, product.discount_ranges_max).get()
                      "
                      @input="
                        numberFormated()(i, null, product.discount_ranges_max).set(
                          $event.target.value
                        )
                      "
                    />
                  </v-col>
                  <v-col cols="4">
                    <input
                      class="table-row__item__input"
                      placeholder="Số tiền giảm giá"
                      pattern="[0-9]*"
                      inputmode="numeric"
                      :value="
                        numberFormated()(i, null, product.discount_ranges_amount).get()
                      "
                      @input="
                        numberFormated()(i, null, product.discount_ranges_amount).set(
                          $event.target.value
                        )
                      "
                    />
                  </v-col>
                </v-row>
              </div>
            </div>
            <div class="table-footer">
              <button
                type="button"
                class="table__button-add-group"
                @click="addDiscountInterval"
              >
                + Thêm khoảng
              </button>
              <span class="table__note"
                ><v-icon>mdi-alert-circle</v-icon>Bạn được phép thêm tối đa 5 khoảng</span
              >
            </div>
          </div>
        </div>
      </section>

      <section id="shipment-info" class="section">
        <div class="block-info">
          <div class="heading-2"><h2>Thông tin kiện hàng</h2></div>
          <div class="form-group">
            <label class="form-group__label">Cân nặng (Kg):</label>
            <v-text-field
              pattern="[0-9]*"
              inputmode="numeric"
              v-model="product.weight"
              class="form-group__input"
              variant="outlined"
              type="number"
              placeholder="Cân nặng sản phẩm"
            ></v-text-field>
          </div>
          <div class="sub-group">
            <span class="sub-group__title">Kích cỡ đóng gói</span>
            <div class="form-group">
              <label class="form-group__label">Chiều rộng (cm):</label>
              <v-text-field
                pattern="[0-9]*"
                inputmode="numeric"
                v-model="product.width"
                class="form-group__input"
                variant="outlined"
                type="number"
                placeholder="Chiều rộng"
              ></v-text-field>
            </div>
            <div class="form-group">
              <label class="form-group__label">Chiều cao (cm):</label>
              <v-text-field
                pattern="[0-9]*"
                inputmode="numeric"
                v-model="product.height"
                class="form-group__input"
                variant="outlined"
                type="number"
                placeholder="Chiều cao"
              ></v-text-field>
            </div>
            <div class="form-group">
              <label class="form-group__label">Chiều dài (cm):</label>
              <v-text-field
                pattern="[0-9]*"
                inputmode="numeric"
                v-model="product.length"
                class="form-group__input"
                type="number"
                variant="outlined"
                placeholder="Chiều dài"
              ></v-text-field>
            </div>
          </div>
        </div>
      </section>

      <section id="classification" class="section">
        <div class="block-info">
          <div class="heading-2">
            <h2>Phân loại</h2>
          </div>
          <div class="checkbox-group">
            <input
              class="checkbox-group__checkbox"
              type="checkbox"
              id="classification__checkbox"
              v-model="product.is_variant"
            />
            <label class="checkbox-group__label" for="classification__checkbox"
              >Sản phẩm này có các phân loại và tùy chọn khác</label
            >
          </div>

          <div id="classification-detail" v-if="product.is_variant">
            <div
              class="classification--group"
              v-for="(item, i) in variantsCount"
              :key="i"
            >
              <label class="classification--group__label"
                >Tên nhóm phân loại {{ i + 1 }}</label
              >
              <div class="classification--group__title">
                <v-row>
                  <v-icon class="classification--group__absolute left-icon"
                    >mdi-forwardburger</v-icon
                  >
                  <v-col cols="12">
                    <v-select
                      clearable=""
                      variant="outlined"
                      placeholder="Chọn tên nhóm phân loại"
                      :items="group_variant_names"
                      item-title="name"
                      item-value="id"
                      v-model="group_variant_selected[i]"
                      @update:modelValue="checkDoubleSelectVariant(i)"
                    />
                  </v-col>
                  <v-icon
                    class="classification--group__delete-btn classification--group__absolute right-icon"
                    color="#E60A32"
                    @click="deleteGroup(i)"
                  >
                    mdi-minus-circle
                  </v-icon>
                </v-row>
              </div>
              <div class="classification--group__list">
                <label class="classification--group__label">Phân loại hàng</label>
                <div
                  class="classification--group__item"
                  v-for="(item, j) in product.variant_images[getIndexVariant(i)]"
                  :key="j"
                >
                  <div class="classification--group__item-name">
                    <input
                      class="classification--group__input input-class-name"
                      v-model="product.variant_names[getIndexVariant(i)][j]"
                    />
                  </div>
                  <div class="classification--group__add-image" @click="clickItem(i, j)">
                    <v-icon v-if="!item">mdi-plus-circle</v-icon>
                    <div v-else class="classification--group__item-image">
                      <img :src="getObjURL(item)" />
                    </div>
                    <input
                      type="file"
                      :ref="'item[' + i + '][' + j + ']'"
                      accept="image/*"
                      hidden
                      @change="(event) => changeImage(event, i, j)"
                    />
                  </div>
                  <v-icon
                    class="classification__delete-btn classification--group__absolute right-icon"
                    style="color: #ffd7de; top: 12px"
                    @click="deleteGroupItem(i, j)"
                  >
                    mdi-minus-circle
                  </v-icon>
                </div>
                <button
                  class="classification--group__item-btn-add"
                  @click="addGroupItem(i)"
                >
                  <v-icon>mdi-plus-circle-outline</v-icon>
                  <span>Thêm phân loại</span>
                </button>
              </div>
            </div>
            <div class="table-footer">
              <button type="button" class="table__button-add-group" @click="addGroup">
                + Thêm nhóm phân loại
              </button>
            </div>
          </div>
        </div>
        <div v-if="product.is_variant" id="product-variants-info" class="block-info">
          <div class="table-headers">
            <span class="table-header__item">Phân loại</span>
            <span class="table-header__item">Số lượng</span>
            <span class="table-header__item">Giá sản phẩm</span>
          </div>
          <div class="table-rows" v-if="itemsCombination">
            <div class="table-row__item" v-for="(item, i) in itemsCombination" :key="i">
              <div class="table-row__title">
                <span>{{ item.name }}</span>
              </div>
              <v-row v-for="(val, j) in item.items" :key="j">
                <v-col cols="4">
                  <input
                    type="text"
                    class="table-row__item__input"
                    readonly
                    :value="val.name"
                  />
                </v-col>
                <v-col cols="4">
                  <input
                    class="table-row__item__input"
                    placeholder="Số lượng"
                    pattern="[0-9]*"
                    inputmode="numeric"
                    :value="
                      numberFormated()(i, j, product.variants_item_quantity).get() ?? null
                    "
                    @input="
                      numberFormated()(i, j, product.variants_item_quantity).set(
                        $event.target.value
                      )
                    "
                  />
                </v-col>
                <v-col cols="4">
                  <input
                    pattern="[0-9]*"
                    inputmode="numeric"
                    class="table-row__item__input"
                    placeholder="Giá sản phẩm"
                    :value="numberFormated()(i, j, product.variants_item_price).get()"
                    @input="
                      numberFormated()(i, j, product.variants_item_price).set(
                        $event.target.value
                      )
                    "
                  />
                </v-col>
              </v-row>
            </div>
          </div>
        </div>
      </section>
      <div class="submit-btn">
        <button class="button-submit" @click="saveProduct()">Lưu</button>
      </div>
    </div>

    <div id="sections-links">
      <ul class="sections-list">
        <li class="section-item" v-for="(item, i) in sections" :key="i">
          <div class="section-item__block">
            <div
              :class="{
                'section-item__line': true,
                'section-item__line__active': activeSection === i,
              }"
            ></div>
            <a
              :href="item.id"
              :class="{ 'section-item__active': activeSection == i }"
              @click="handleLinkClick(i)"
              >{{ item.name }}</a
            >
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import UserLayout from "@/Layouts/UserLayout.vue";
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import TextFieldWithValidation from "@/components/TextFieldWithValidation.vue";
import Alert from "@/components/Alert.vue";
import SlideImages from "../../../components/SlideImages.vue";

export default {
  name: "AddProducts",
  components: { Alert, TextFieldWithValidation, Breadcrumbs, UserLayout, SlideImages },
  data() {
    return {
      sections: [
        {
          name: "Hình ảnh sản phẩm",
          id: "#product-images",
        },
        {
          name: "Danh mục sản phẩm",
          id: "#product-categories",
        },
        {
          name: "Thông tin sản phẩm",
          id: "#product-information",
        },
        {
          name: "Thông tin kiện hàng",
          id: "#shipment-info",
        },
        {
          name: "Phân loại",
          id: "#classification",
        },
      ],
      variant_groups_count: 1,
      image_urls: [],
      activeSection: null,
      isLinkClicked: false,
      categories: [],
      categories_selected: [],
      conditions: [],
      selected_cat_lv1: null,
      selected_cat_lv2: null,
      group_variant_names: [
        { id: 0, name: "Màu sắc" },
        { id: 1, name: "Kích thước" },
      ],
      group_variant_selected: [],
      group_variant_previous_selected: [],
      product: {
        images: [],
        cat_id: null,
        condition_id: null,
        is_variant: false,
        is_buy_more_discount: false,
        is_pre_order: false,
        name: null,
        detail: null,
        brand: null,
        price: null,
        promotional_price: null,
        inventory: 0,
        weight: null,
        length: null,
        width: null,
        height: null,
        variant_names: [[null], [null]],
        variant_images: [[null]],
        variants_item_quantity: [[null]],
        variants_item_price: [[null]],
        discount_ranges_min: [null],
        discount_ranges_max: [null],
        discount_ranges_amount: [null],
      },
      product_edit_id: null,
      checkFile: null,
    };
  },
  computed: {
    promotionalPriceFormated: {
      get() {
        if (this.product.promotional_price) {
          return this.product.promotional_price.toLocaleString();
        }
        return null;
      },
      set(value) {
        const parsed_value = parseInt(value.replace(/,/g, ""));
        if (!isNaN(parsed_value)) {
          this.product.promotional_price = parsed_value == 0 ? null : parsed_value;
        }
      },
    },
    priceFormated: {
      get() {
        if (this.product.price) {
          return this.product.price.toLocaleString();
        }
        return null;
      },
      set(value) {
        const parsed_value = parseInt(value.replace(/,/g, ""));
        if (!isNaN(parsed_value)) {
          this.product.price = parsed_value;
        }
      },
    },
    inventoryFormated: {
      get() {
        if (this.product.inventory) {
          return this.product.inventory.toLocaleString();
        }
        return null;
      },
      set(value) {
        const parsed_value = parseInt(value.replace(/,/g, ""));
        if (!isNaN(parsed_value)) {
          this.product.inventory = parsed_value;
        }
      },
    },
    variantsCount() {
      return Array.from({ length: this.variant_groups_count }, (_, index) => index);
    },
    itemsCombination() {
      let l = this.variant_groups_count;
      let big_rs = [];
      let rs = [];
      if (l == 1) {
        let index = this.group_variant_selected[0];
        if (this.product.variant_names[index]?.length == 0) {
          big_rs.push({
            name: this.group_variant_names[index]?.name ?? "...",
            item: [],
          });
        } else {
          rs = this.product.variant_names[index]?.map((item) => ({
            name: item ?? "...",
          }));
          big_rs.push({
            name: this.group_variant_names[index]?.name ?? "...",
            items: rs,
          });
        }
      } else if (l == 2) {
        for (let i = 0; i < this.product.variant_names[0].length; i++) {
          rs = [];
          for (let j = 0; j < this.product.variant_names[1].length; j++) {
            rs.push({
              name:
                (this.product.variant_names[0][i] ?? "?") +
                "/" +
                (this.product.variant_names[1][j] ?? "?"),
            });
          }
          big_rs.push({
            name: this.product.variant_names[0][i] ?? "...",
            items: rs,
          });
        }
      }
      return big_rs;
    },
  },
  async created() {
    await this.getConditions();
    if (this.$route.name == "edit-product") {
      this.product_edit_id = this.$route.params.id;
      this.setWindowTitle("Sửa sản phẩm");
      await this.getProductEdit();
    } else {
      this.setWindowTitle("Thêm sản phẩm");
      await this.getCategories();
    }
  },
  watch: {
    $route(to, from) {
      if (to.name == "add-product") {
        this.resetProduct();
      } else if ((to.name = "edit-product")) {
        this.getProductEdit();
      }
    },
  },
  methods: {
    numberFormated() {
      return function (i, j, array) {
        return {
          get() {
            try {
              if (j != null ? array[i][j] != null : array[i] != null) {
                return j != null
                  ? array[i][j].toLocaleString()
                  : array[i].toLocaleString();
              }
            } catch (error) {
              console.log(error);
            }
            return null;
          },
          set(value) {
            const parsed_value = parseInt(value.replace(/,/g, ""));
            if (!isNaN(parsed_value)) {
              if (j != null) {
                array[i][j] = parsed_value;
              } else {
                array[i] = parsed_value;
              }
            }
          },
        };
      };
    },
    resetProduct() {
      this.product.images = [];
      this.product.cat_id = null;
      this.product.condition_id = null;
      this.product.is_variant = false;
      this.product.is_buy_more_discount = false;
      this.product.is_pre_order = false;
      this.product.name = null;
      this.product.detail = null;
      this.product.brand = null;
      this.product.price = null;
      this.product.promotional_price = null;
      this.product.inventory = 0;
      this.product.weight = null;
      this.product.length = null;
      this.product.width = null;
      this.product.height = null;
      this.product.variant_names = [[null], [null]];
      this.product.variant_images = [[null]];
      this.product.variants_item_quantity = [[null]];
      this.product.variants_item_price = [[null]];
      this.product.discount_ranges_min = [null];
      this.product.discount_ranges_max = [null];
      this.product.discount_ranges_amount = [null];
    },
    async getProductEdit() {
      this.startLoad();
      try {
        const response = await axios.get(`shop/get-product?id=${this.product_edit_id}`);
        this.image_urls = Array.from(Object.values({ ...response.data.data.images }));
        this.categories = Array.from(Object.values({ ...response.data.data.categories }));
        this.categories_selected = Array.from(
          Object.values({ ...response.data.data.categories_selected })
        );
        this.product = { ...response.data.data };
        if (
          this.product.variant_names[0].length > 0 &&
          this.product.variant_names[0][0] != null
        ) {
          this.group_variant_previous_selected[0] = this.group_variant_selected[0] = 0;
          this.variant_groups_count = 1;
        }
        if (
          this.product.variant_names[1].length > 0 &&
          this.product.variant_names[1][0] != null
        ) {
          this.variant_groups_count = 2;
          this.group_variant_previous_selected[1] = this.group_variant_selected[1] = 1;
        }
      } catch (error) {
        console.log(error);
      }
      this.finishLoad();
    },
    appendArrayToFormData(key, arr, form_data = new FormData()) {
      arr.forEach((item, index) => {
        if (item != null) {
          form_data.append(`${key}[${index}]`, item);
        }
      });
    },
    getFormData(obj, form_data = new FormData()) {
      for (let key in obj) {
        if (
          [
            "images",
            "discount_ranges_min",
            "discount_ranges_max",
            "discount_ranges_amount",
          ].includes(key)
        ) {
          this.appendArrayToFormData(key, obj[key], form_data);
        } else if (
          [
            "variant_names",
            "variant_images",
            "variants_item_images",
            "variants_item_quantity",
            "variants_item_price",
          ].includes(key)
        ) {
          for (let i in obj[key]) {
            this.appendArrayToFormData(`${key}[${i}]`, obj[key][i], form_data);
          }
        } else if (["is_variant", "is_buy_more_discount", "is_pre_order"].includes(key)) {
          if (obj[key] != null) {
            form_data.append(key, obj[key] ? 1 : 0);
          }
        } else if (key == "inventory") {
          if (!this.product.is_variant && obj[key] != null) {
            form_data.append(key, obj[key]);
          }
        } else {
          if (obj[key] != null) {
            form_data.append(key, obj[key]);
          }
        }
      }
      return form_data;
    },
    async saveProduct() {
      let url = "product/create";
      this.product.cat_id = this.categories_selected[this.categories_selected.length - 1];
      let form_data = this.getFormData(this.product);
      if (this.product_edit_id !== null) {
        url = "product/update";
        form_data.append("id", this.product_edit_id);
      }
      try {
        const response = await axios.post(url, form_data);
        this.showAlert(
          response.data.title,
          response.data.message,
          "success",
          "all-products"
        );
      } catch (error) {
        console.log(error);
        this.showAlert(
          error.response.data.title,
          error.response.data.message,
          "error",
          null
        );
      }
    },
    async getConditions() {
      try {
        const response = await axios.get("get/conditions");
        this.conditions = response.data.data;
      } catch (error) {}
    },
    async getCategories(index, parent_id = null) {
      try {
        this.startLoad();
        let url = "get/category/categories";
        if (parent_id) {
          url += `?parent_id=${parent_id}`;
        }
        const response = await axios.get(url);
        this.categories.splice(index + 1);
        this.categories_selected.splice(index + 1);
        if (response.data.data?.length > 0) {
          this.categories.push(response.data.data);
        }
        this.finishLoad();
      } catch (error) {}
    },
    getIndexVariant(selected_index) {
      return this.group_variant_selected[selected_index] ?? selected_index;
    },
    swapArray(array_1, array_2) {
      const temp = [...array_1];
      array_1.length = 0;
      array_1.push(...array_2);
      array_2.length = 0;
      array_2.push(...temp);
    },
    checkDoubleSelectVariant(index) {
      if (
        this.group_variant_selected.length == 2 &&
        this.group_variant_selected[0] == this.group_variant_selected[1]
      ) {
        this.group_variant_selected[index] = null;
        this.group_variant_previous_selected[index] = null;
        this.showAlert(
          "Lỗi",
          "Không thể chọn 2 nhóm phân loại trùng nhau",
          "error",
          null
        );
        return;
      }
      if (
        this.group_variant_previous_selected[index] != null &&
        this.group_variant_previous_selected[index] != null &&
        this.group_variant_selected[index] != this.group_variant_previous_selected[index]
      ) {
        this.swapArray(
          this.product.variant_names[index],
          this.product.variant_names[1 - index]
        );
        this.swapArray(
          this.product.variant_images[index],
          this.product.variant_images[1 - index]
        );
        // this.swapArray(
        //   this.product.variants_item_price[index],
        //   this.product.variants_item_price[1 - index]
        // );
        // this.swapArray(
        //   this.product.variants_item_quantity[index],
        //   this.product.variants_item_quantity[1 - index]
        // );
      }
      this.group_variant_previous_selected[index] = this.group_variant_selected[index];
    },
    handleLinkClick(index) {
      this.isLinkClicked = true;
      this.activeSection = index;
      setTimeout(() => {
        this.isLinkClicked = false;
      }, 100);
    },
    combination(arr1, arr2) {
      let results = [];
      for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
          let value = arr1[i] + "/" + arr2[j];
          results.push(value);
        }
      }
      return results;
    },
    onChangeImages(e) {
      let files = e.target.files;
      let fileArray = Array.from(files);
      this.product.images = this.product.images.concat(fileArray);
      for (let i = 0; i < files.length; i++) {
        this.image_urls.push(URL.createObjectURL(files[i]));
      }
    },
    getObjURL(file) {
      if (typeof file == "string") {
        return file;
      }
      return URL.createObjectURL(file) ?? "#";
    },
    changeImage(event, i, j) {
      let file = event.target.files[0];
      this.product.variant_images[this.getIndexVariant(i)][j] = file;
    },
    removeFileFromList(fileList, indexToRemove) {
      const files = Array.from(fileList);
      files.splice(indexToRemove, 1);
      const newFileList = new FileList(files);
      return newFileList;
    },
    deleteImage(i) {
      this.product.images.splice(i, 1);
      this.image_urls.splice(i, 1);
    },
    addDiscountInterval() {
      if (this.product.discount_ranges_min.length < 5) {
        this.product.discount_ranges_min.push(null);
        this.product.discount_ranges_max.push(null);
        this.product.discount_ranges_amount.push(null);
        return;
      }
      this.showAlert("Thất bại", "Bạn đã thêm tối đa khoảng ", "error", null);
    },
    addGroup() {
      if (this.variant_groups_count >= 2) {
        this.showAlert("Thất bại", "Đã đạt giới hạn", "error", null);
        return;
      }
      if (this.product.variant_images.length < 2) {
        this.product.variant_images.push([null]);
      }
      this.variant_groups_count += 1;
    },
    addGroupItem(i) {
      if (i == 1) {
        this.product.variants_item_price.forEach((item) => {
          item.push(null);
        });
        this.product.variants_item_quantity.forEach((item) => {
          item.push(null);
        });
      } else {
        this.product.variants_item_price.push([null]);
        this.product.variants_item_quantity.push([null]);
      }
      this.product.variant_names[i].push(null);
      this.product.variant_images[i].push(null);
    },
    clickItem(i, j) {
      const ref = this.$refs["item[" + i + "][" + j + "]"];
      ref[0].click();
    },
    deleteGroup(i) {
      this.group_variant_selected[i] = null;
      this.product.variant_names[i] = [null];
      this.product.variant_images[i] = [null];
      this.product.variants_item_price[i] = [null];
      this.product.variants_item_quantity[i] = [null];
      this.variant_groups_count -= 1;
    },
    deleteGroupItem(i, j) {
      this.product.variant_names[i].splice(j, 1);
      this.product.variant_images[i].splice(j, 1);
      this.product.variants_item_price[i].splice(j, 1);
      this.product.variants_item_quantity[i].splice(j, 1);
    },
  },
};
</script>

<style scoped>
#main-content {
  display: flex;
  column-gap: 50px;
  margin: 40px 0;
}
#sections {
  width: 65%;
  max-width: 780px;
}
.block-info {
  margin-bottom: 16px;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 20px 33px;
}

.images {
  padding: 7px 0;
  display: flex;
  column-gap: 16px;
}
.image-button:hover {
  background: #0172cb;
  color: #ffffff;
}
.image-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #0172cb;
  border-radius: 8px;
  width: 144px;
  height: 144px;
  color: #0172cb;
  justify-content: center;
}

.image-button span {
  width: 144px;
  text-align: center;
}

.image-button .v-field__field.v-field__input {
  display: none !important;
}

.heading-2 {
  margin-bottom: 15px;
  line-height: 1.6rem;
}

.sub-group__title {
  font-weight: 700;
}

.checkbox-group {
  display: flex;
  align-items: center;
  margin-top: 22px;
}

#discount-detail {
  margin-top: 22px;
}

.checkbox-group__checkbox {
  width: 24px;
  height: 24px;
  border: #0172cb;
  border-radius: 5px;
  accent-color: #0172cb;
}

.checkbox-group__label {
  margin-left: 14px;
}

.table-headers {
  width: 100%;
  padding: 9px 7px;
  background-color: #bfe6ff;
  color: #0172cb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.table-row__item__input {
  padding: 12px 17px;
  border: #c4c4c4 1px solid;
  border-radius: 8px;
  max-width: 100%;
}
.table-row__item {
  margin-bottom: 8px;
}

.table-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 26px;
}

.table__button-add-group {
  padding: 9px;
  text-align: center;
  border: 1px #0074bd dashed;
  color: #0074bd;
  margin-bottom: 17px;
  width: 348px;
}

.table__note {
  color: #0074bd;
}

.table__note i {
  margin-right: 8px;
}

#classification-detail {
  padding: 0 38px;
}

.classification--group {
  padding: 29px 0;
  border-bottom: 1px #d4d4d4 solid;
}

.classification--group__title {
  position: relative;
}

.classification--group__list {
  margin-top: 17px;
}

.classification--group__input {
  width: 100%;
  height: 48px;
  border: 1px solid #c4c4c4;
  border-radius: 8px;
  padding: 13px 16px;
}

.classification--group__item {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.classification--group__item-name {
  width: 90%;
}

.classification--group__add-image {
  width: 44px;
  height: 44px;
  border: 1px solid #0172cb;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0172cb;
  margin-left: 16px;
  overflow: hidden;
}

.classification--group__item-image {
  width: 100%;
  height: 100%;
}

.classification--group__item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.classification--group__item-btn-add {
  margin-top: 27px;
  display: flex;
  color: #ec1c24;
  width: 180px;
  height: 46px;
  justify-content: space-between;
  padding: 12px;
}

.classification--group__absolute {
  position: absolute;
}

.left-icon {
  top: 28%;
  left: -37px;
}

.right-icon {
  top: 28%;
  right: -37px;
}

#product-variants-info {
  max-height: 500px;
  overflow-y: scroll;
}
.table-row__title {
  font-weight: 600;
  margin-bottom: 14px;
}
.submit-btn {
  display: flex;
  justify-content: flex-end;
}
.button-submit:hover {
  background-color: #01395d;
}
.button-submit {
  width: 197px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0074bd;
  color: #ffffff;
  border-radius: 100px;
}
#sections-links {
  position: sticky;
  height: 100vh;
  position: -webkit-sticky;
  top: 0;
}
.section-item {
  list-style: none;
}
a {
  color: black;
}
.section-item__block a {
  text-decoration: none;
  padding: 0 20px;
  height: 40px;
  display: flex;
  align-items: center;
}
.section-item__block {
  display: flex;
}
.section-item__line {
  width: 6px;
  height: 40px;
  background-color: #dfdcdc;
}
.section-item:first-child .section-item__line {
  border-top-left-radius: 100px;
  border-top-right-radius: 100px;
}
.section-item:last-child .section-item__line {
  border-bottom-left-radius: 100px;
  border-bottom-right-radius: 100px;
}
.section-item__active {
  color: #ec1c24;
}
.section-item__line__active {
  border-radius: 100px;
  background-color: red;
}
</style>
