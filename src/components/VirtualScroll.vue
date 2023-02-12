<template>
  <div
    ref="container"
    class="container"
    @scroll="handleScroll"
    :style="{ height: `${totalHeight}px` }"
  >
    <div
      :style="{
        width: '100%',
        height: `${virtualScroll.spaceBefore}px`,
      }"
    />
    <slot name="default" v-bind="{ items: virtualScroll.items }" />
    <div :style="{ width: '100%', height: `${virtualScroll.spaceAfter}px` }" />
  </div>
</template>

<script>
export default {
  name: "virtual-scroll",
  props: {
    totalHeight: { type: Number, required: true },
    defaultHeight: { type: Number, required: true },
    data: { type: Array, required: true },
    extraItems: { type: Number, required: false, default: 20 },
  },
  data() {
    return {
      heights: [],
      scrollTop: 0,
      numberOfItems: false,
    };
  },
  computed: {
    virtualScroll() {
      const { spaceBefore, firstItemIndex } = this.calculateSpaceBefore();
      const { items, lastItemIndex } = this.calculateItems(
        firstItemIndex,
        spaceBefore
      );
      const spaceAfter = this.calculateSpaceAfter(lastItemIndex);

      return {
        spaceBefore,
        items,
        spaceAfter,
      };
    },
  },
  methods: {
    reset() {
      this.heights = [];
      this.scrollTop = 0;
      this.numberOfItems = false;
      this.$refs.container.scrollTop = 0;
    },
    calculateSpaceBefore() {
      const { scrollTop, heights, defaultHeight } = this;
      let firstItemIndex = 0;
      let spaceBefore = 0;
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const itemHeight = heights[firstItemIndex] || defaultHeight;
        if (spaceBefore + itemHeight > scrollTop) {
          break;
        }
        firstItemIndex += 1;
        spaceBefore += itemHeight;
      }
      return { spaceBefore, firstItemIndex };
    },
    calculateItems(firstItemIndex, paddingTop) {
      const { data, heights, defaultHeight, totalHeight, scrollTop } = this;

      const items = [];
      let heightAcc = paddingTop;
      let lastItemIndex = firstItemIndex;
      for (
        ;
        heightAcc - scrollTop < totalHeight && lastItemIndex < data.length;
        lastItemIndex += 1
      ) {
        items.push(data[lastItemIndex]);
        heightAcc += heights[lastItemIndex] || defaultHeight;
      }
      // const extraItems = 20;
      // for (let i = 0; i < extraItems; i += 1) {
      //   const item = data[lastItemIndex];
      //   if (item === undefined) break;
      //   items.push(item);
      //   lastItemIndex += 1;
      //   heightAcc += heights[lastItemIndex] || defaultHeight;
      // }
      return {
        lastItemIndex,
        items,
      };
    },
    calculateSpaceAfter(lastItemIndex) {
      const { data, heights, defaultHeight } = this;

      return data
        .slice(lastItemIndex)
        .map((x, i) => heights[i + lastItemIndex] || defaultHeight)
        .reduce((a, b) => a + b, 0);
    },
    handleScroll(event) {
      this.scrollTop = event.target.scrollTop;
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  overflow: auto;
  // temp
  border: 1px solid red;
}
</style>
