<template>
  <UserLayout>
    <Breadcrumbs :items="breadcrumbs" />
    <div id="main-content">
      <div id="sections">
        <section id="product-images" class="section">
          <div class="block-info">
            <div class="heading-2">
              <h2>Hình ảnh sản phẩm</h2>
            </div>
            <div class="images">
              <div class="image-button" @click="$refs.images.click()">
                <v-icon>mdi-plus-circle</v-icon>
                <span>Thêm ảnh</span>
                <input
                  hidden
                  multiple
                  ref="images"
                  type="file"
                  accept="image/*"
                  :model-value="images"
                  @change="onChangeImages"
                />
              </div>
              <div class="images__list">
                <v-slide-group style="width: 100%; height: 100%">
                  <v-slide-group-item
                    v-for="(url, i) in image_urls"
                    :key="i"
                    style="width: 144px; height: 144px"
                  >
                    <div class="image__item">
                      <v-icon @click="deleteImage(i)" class="image__item--button-delete"
                        >mdi-close-circle</v-icon
                      >
                      <img :src="url" />
                    </div>
                  </v-slide-group-item>
                </v-slide-group>
              </div>
            </div>
          </div>
        </section>

        <section id="product-categories" class="section">
          <div class="block-info">
            <div class="heading-2">
              <h2>Danh mục sản phẩm</h2>
            </div>
            <div class="form-group">
              <span class="form-group__label">Danh mục cấp 1</span>
              <v-select
                class="form-group__select"
                variant="outlined"
                placeholder="Chọn danh mục sản phẩm"
              ></v-select>
            </div>
            <div class="form-group">
              <span class="form-group__label">Danh mục cấp 2</span>
              <v-select
                class="form-group__select"
                variant="outlined"
                placeholder="Chọn danh mục sản phẩm"
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
                class="form-group__input"
                variant="outlined"
                placeholder="Nhập tên sản phẩm"
              ></v-text-field>
            </div>
            <div class="form-group">
              <span class="form-group__label">Mô tả chi tiết sản phẩm</span>
              <v-textarea
                class="form-group__input input--textarea"
                variant="outlined"
                auto-grow
                placeholder="Nhập mô tả chi tiết sản phẩm"
              ></v-textarea>
            </div>
          </div>

          <div class="block-info">
            <v-row>
              <v-col cols="6">
                <div class="form-group">
                  <span class="form-group__label">Thương hiệu</span>
                  <v-text-field
                    class="form-group__input"
                    variant="outlined"
                    placeholder="Nhập thương hiệu"
                  ></v-text-field>
                </div>
              </v-col>
              <v-col cols="6">
                <div class="form-group">
                  <span class="form-group__label">Kho hàng</span>
                  <v-text-field
                    class="form-group__input"
                    variant="outlined"
                    placeholder="Nhập kho hàng"
                  ></v-text-field>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <div class="form-group">
                  <span class="form-group__label">Giá niêm yết</span>
                  <v-text-field
                    class="form-group__input"
                    variant="outlined"
                    placeholder="Giá niêm yết của sản phẩm"
                  ></v-text-field>
                </div>
              </v-col>
              <v-col cols="6">
                <div class="form-group">
                  <span class="form-group__label">Giá khuyến mại</span>
                  <v-text-field
                    class="form-group__input"
                    variant="outlined"
                    placeholder="Giá khuyến mại của sản phẩm"
                  ></v-text-field>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <div class="form-group">
                  <span class="form-group__label">Chi phí vận chuyển</span>
                  <v-text-field
                    class="form-group__input"
                    variant="outlined"
                    disabled
                    placeholder="Phí vận chuyển dựa theo cân nặng"
                  ></v-text-field>
                </div>
              </v-col>
            </v-row>
            <div class="form-group">
              <span class="form-group__label">Tình trạng</span>
              <v-select
                class="form-group__select"
                variant="outlined"
                placeholder="Chọn tình trạng sản phẩm"
              >
              </v-select>
            </div>
            <div class="checkbox-group">
              <input class="checkbox-group__checkbox" type="checkbox" id="order" />
              <label class="checkbox-group__label" for="order">Hàng đặt trước</label>
            </div>
            <div class="checkbox-group">
              <input
                class="checkbox-group__checkbox"
                type="checkbox"
                id="discount"
                v-model="buy_more_discount"
              />
              <label class="checkbox-group__label" for="discount"
                >Mua nhiều giảm giá</label
              >
            </div>

            <div id="discount-detail" v-if="buy_more_discount">
              <div class="table-headers">
                <span class="table-header__item">Số lượng tối thiểu</span>
                <span class="table-header__item">Số lượng tối đa</span>
                <span class="table-header__item">Giá sản phẩm</span>
              </div>
              <div class="table-rows" v-for="(item, i) in discount_intervals" :key="i">
                <div class="table-row__item">
                  <v-row>
                    <v-col cols="3">
                      <input
                        type="number"
                        class="table-row__item__input"
                        placeholder="Tối thiểu"
                        v-model="item.min"
                      />
                    </v-col>
                    <v-col cols="4">
                      <input
                        type="number"
                        class="table-row__item__input"
                        placeholder="Tối đa"
                        v-model="item.max"
                      />
                    </v-col>
                    <v-col cols="5">
                      <input
                        type="number"
                        class="table-row__item__input"
                        placeholder="Giá sản phẩm"
                        v-model="item.price"
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
                  ><v-icon>mdi-alert-circle</v-icon>Bạn được phép thêm tối đa 5
                  khoảng</span
                >
              </div>
            </div>
          </div>
        </section>

        <section id="shipment-info" class="section">
          <div class="block-info">
            <div class="heading-2"><h2>Thông tin kiện hàng</h2></div>
            <div class="form-group">
              <label class="form-group__label">Cân nặng</label>
              <v-text-field
                class="form-group__input"
                variant="outlined"
                placeholder="Cân nặng sản phẩm"
              ></v-text-field>
            </div>
            <div class="sub-group">
              <span class="sub-group__title">Kích cỡ đóng gói</span>
              <div class="form-group">
                <label class="form-group__label">Chiều rộng</label>
                <v-text-field
                  class="form-group__input"
                  variant="outlined"
                  placeholder="Chiều rộng"
                ></v-text-field>
              </div>
              <div class="form-group">
                <label class="form-group__label">Chiều cao</label>
                <v-text-field
                  class="form-group__input"
                  variant="outlined"
                  placeholder="Chiều cao"
                ></v-text-field>
              </div>
              <div class="form-group">
                <label class="form-group__label">Chiều dài</label>
                <v-text-field
                  class="form-group__input"
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
                v-model="classification"
              />
              <label class="checkbox-group__label" for="classification__checkbox"
                >Sản phẩm này có các phân loại và tùy chọn khác</label
              >
            </div>

            <div id="classification-detail" v-if="classification">
              <div
                class="classification--group"
                v-for="(group, i) in classification_groups"
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
                      <input
                        class="classification--group__input input-group-name"
                        v-model="group.name"
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
                    v-for="(item, j) in group.items"
                    :key="j"
                  >
                    <div class="classification--group__item-name">
                      <input
                        class="classification--group__input input-class-name"
                        v-model="item.name"
                      />
                    </div>
                    <div
                      class="classification--group__add-image"
                      @click="clickItem(i, j)"
                    >
                      <v-icon v-if="!item.image_url">mdi-plus-circle</v-icon>
                      <div v-else class="classification--group__item-image">
                        <img :src="item.image_url" />
                      </div>
                      <input
                        type="file"
                        :ref="'item[' + i + '][' + j + ']'"
                        accept="image/*"
                        hidden
                        :model-value="item.image"
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
          <div v-if="classification" id="product-variants-info" class="block-info">
            <div class="table-headers">
              <span class="table-header__item">Phân loại</span>
              <span class="table-header__item">Số lượng</span>
              <span class="table-header__item">Giá sản phẩm</span>
            </div>
            <div class="table-rows">
              <div class="table-row__item" v-for="(item, i) in itemsCombination" :key="i">
                <div class="table-row__title">
                  <span>{{ item.name }}</span>
                </div>
                <v-row v-for="(val, j) in item.items" :key="j">
                  <v-col cols="3">
                    <input
                      type="text"
                      class="table-row__item__input"
                      readonly
                      :value="val.name"
                    />
                  </v-col>
                  <v-col cols="4">
                    <input
                      type="number"
                      class="table-row__item__input"
                      placeholder="Số lượng"
                      v-model="val.quantity"
                    />
                  </v-col>
                  <v-col cols="5">
                    <input
                      type="number"
                      class="table-row__item__input"
                      placeholder="Giá sản phẩm"
                      v-model="val.price"
                    />
                  </v-col>
                </v-row>
              </div>
            </div>
          </div>
        </section>
        <div class="submit-btn">
          <button class="button-submit">Lưu</button>
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
  </UserLayout>
</template>

<script>
import UserLayout from "@/Layouts/UserLayout.vue";
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import TextFieldWithValidation from "@/components/TextFieldWithValidation.vue";
import listGroup from "@/components/ListGroup.vue";
import Alert from "@/components/Alert.vue";

export default {
  name: "AddProducts",
  components: { Alert, TextFieldWithValidation, Breadcrumbs, UserLayout },
  data() {
    return {
      breadcrumbs: [
        {
          title: "Quản lý sản phẩm",
        },
        {
          title: "Thêm sản phẩm",
        },
      ],
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
      classification: false,
      buy_more_discount: false,
      discount_intervals: [
        {
          min: "",
          max: "",
          price: "",
        },
      ],
      classification_groups: [
        {
          name: "",
          items: [
            {
              name: "",
              image: "",
              image_url: "",
            },
          ],
        },
      ],
      images: [],
      image_urls: [],
      activeSection: null,
      isLinkClicked: false,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  computed: {
    itemsCombination() {
      let l = this.classification_groups.length;
      let big_rs = [];
      let rs = [];
      if (l < 2) {
        rs = this.classification_groups[0].items;
        big_rs.push({
          name: this.classification_groups[0].name,
          items: rs,
        });
      } else if (l == 2) {
        for (let i = 0; i < this.classification_groups[0].items.length; i++) {
          rs = [];
          for (let j = 0; j < this.classification_groups[1].items.length; j++) {
            rs.push({
              name:
                this.classification_groups[0].items[i].name +
                "/" +
                this.classification_groups[1].items[j].name,
            });
          }
          big_rs.push({
            name: this.classification_groups[0].items[i].name,
            items: rs,
          });
        }
      } else {
        rs = this.combination(
          this.classification_groups[l - 2].items,
          this.classification_groups[l - 1].items
        );
        let index = l - 3;
        while (index >= 1) {
          rs = this.combination(this.classification_groups[index], rs);
          index--;
        }
        for (let i = 0; i < this.classification_groups[0].items.length; i++) {
          let mrs = [];
          for (let j = 0; j < rs.length; j++) {
            mrs.push({
              name: this.classification_groups[0].items[i] + "/" + rs[j],
            });
          }
          big_rs.push({
            name: this.classification_groups[0].items[i].name,
            items: mrs,
          });
        }
      }

      return big_rs;
    },
  },
  methods: {
    handleLinkClick(index) {
      this.isLinkClicked = true;
      this.activeSection = index;
      setTimeout(() => {
        this.isLinkClicked = false;
      }, 100);
    },
    handleScroll() {
      if (this.isLinkClicked) {
        return;
      }
      const sectionElements = document.getElementsByClassName("section");
      const scrollPosition = window.scrollY || window.pageYOffset;

      let activeSectionIndex = null;
      for (let i = 0; i < sectionElements.length; i++) {
        const sectionElement = sectionElements[i];
        const sectionOffset = sectionElement.offsetTop;
        const sectionHeight = sectionElement.offsetHeight;

        if (
          scrollPosition >= sectionOffset &&
          scrollPosition < sectionOffset + sectionHeight
        ) {
          activeSectionIndex = i;
          break;
        }
      }

      this.activeSection = activeSectionIndex;
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
      for (let i = 0; i < files.length; i++) {
        this.image_urls.push(URL.createObjectURL(files[i]));
      }
    },
    changeImage(event, i, j) {
      let file = event.target.files[0];
      if (file) {
        this.classification_groups[i].items[j].image_url = URL.createObjectURL(file);
      }
    },
    deleteImage(i) {
      this.images.splice(i, 1);
      this.image_urls.splice(i, 1);
    },
    addDiscountInterval() {
      if (this.discount_intervals.length < 5) {
        this.discount_intervals.push({ min: "", max: "", price: "" });
        return;
      }
      this.showAlert("Thất bại", "Bạn đã thêm tối đa khoảng ", "error", null);
    },
    addGroup() {
      if (this.classification_groups.length >= 2) {
        this.showAlert("Thất bại", "Đã đạt giới hạn", "error", null);
        return;
      }
      this.classification_groups.push({
        name: "",
        items: [
          {
            name: "",
            image: "",
            image_url: "",
          },
        ],
      });
    },
    addGroupItem(i) {
      this.classification_groups[i].items.push({
        name: "",
        image: "",
        image_url: "",
      });
    },
    clickItem(i, j) {
      const ref = this.$refs["item[" + i + "][" + j + "]"];
      ref[0].click();
    },
    deleteGroup(i) {
      this.classification_groups.splice(i, 1);
    },
    deleteGroupItem(i, j) {
      this.classification_groups[i].items.splice(j, 1);
    },
  },
};
</script>

<style scoped>
#main-content {
  display: flex;
  column-gap: 50px;
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

.block-info .v-col {
  padding: 0;
}
.block-info .v-col:first-child {
  padding-right: 30px;
}
.images {
  padding: 7px 0;
  display: flex;
}

.images__list {
  width: 77%;
  height: 144px;
  padding-left: 15px;
}

.image__item {
  padding: 0 8px;
  position: relative;
}

.image__item img {
  width: 144px;
  height: 144px;
  object-fit: cover;
  border-radius: 8px;
}

.image__item--button-delete {
  position: absolute;
  top: 0;
  right: 0;
  color: #595959;
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
  top: 24px;
  left: -37px;
}

.right-icon {
  top: 24px;
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
