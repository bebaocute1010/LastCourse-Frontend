<template>
  <div
    class="user-not-select slide-group-container"
    :ref="refe"
    @mousedown="startDrag"
    @mousemove="handleDrag"
    @mouseup="endDrag"
    @mouseleave="endDrag"
    @touchstart="startDrag"
    @touchmove="handleDrag"
    @touchend="endDrag"
  >
    <v-slide-group v-model="currentSlide" show-arrows="false" class="slide-group">
      <v-slide-group-item v-for="(item, i) in items" :key="i">
        <div class="image__item">
          <v-icon
            v-if="show_delete"
            @click="deleteImage(i)"
            class="image__item--button-delete"
            >mdi-close-circle</v-icon
          >
          <img :src="item.url ?? item" :style="{ width: img_width ?? '100%' }" />
        </div>
      </v-slide-group-item>
    </v-slide-group>
  </div>
</template>

<script>
export default {
  name: "SlideImages",
  props: {
    items: {
      type: Array,
      required: true,
    },
    refe: {
      type: String,
      required: true,
    },
    show_delete: {
      type: Boolean,
      required: false,
      default: false,
    },
    img_width: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      currentSlide: 0,
      startX: 0,
      currentX: 0,
      isDragging: false,
    };
  },
  methods: {
    deleteImage(i) {
      this.$emit("deleteImage", i);
    },
    startDrag(event) {
      this.isDragging = true;
      this.startX = this.getClientX(event);
    },
    handleDrag(event) {
      if (!this.isDragging) return;
      this.currentX = this.getClientX(event);
      const container = this.$refs[this.refe];
      const containerWidth = container.offsetWidth;
      const dragDistance = this.currentX - this.startX;
      container.scrollLeft -= dragDistance;
      this.startX = this.currentX;
    },
    endDrag() {
      this.isDragging = false;
    },
    getClientX(event) {
      return event.type.startsWith("touch") ? event.touches[0].clientX : event.clientX;
    },
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
  },
};
</script>

<style scoped>
.image__item {
  position: relative;
}
img {
  object-fit: cover;
  height: 100%;
  border-radius: 8px;
  pointer-events: none;
}
.slide-group {
  display: inline-flex;
  width: max-content;
  cursor: pointer;
  height: 100%;
}
.slide-group-container {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
}
.image__item--button-delete {
  position: absolute;
  top: 0;
  right: 0;
  color: #595959;
}
</style>
