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
  },
  data() {
    return {
      scrollTop: 0,
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
    calculateSpaceBefore() {
      const { scrollTop, defaultHeight } = this;
      let firstItemIndex = 0;
      let spaceBefore = 0;
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const itemHeight = defaultHeight;
        if (spaceBefore + itemHeight > scrollTop) {
          break;
        }
        firstItemIndex += 1;
        spaceBefore += itemHeight;
      }
      return {
        spaceBefore,
        firstItemIndex,
      };
    },
    calculateItems(firstItemIndex, paddingTop) {
      const { data, defaultHeight, totalHeight, scrollTop } = this;

      const items = [];
      let heightAcc = paddingTop;
      let lastItemIndex = firstItemIndex;
      for (
        ;
        heightAcc - scrollTop < totalHeight && lastItemIndex < data.length;
        lastItemIndex += 1
      ) {
        items.push(data[lastItemIndex]);
        heightAcc += defaultHeight;
      }

      return {
        lastItemIndex,
        items,
      };
    },
    calculateSpaceAfter(lastItemIndex) {
      const { data, defaultHeight } = this;

      return data
        .slice(lastItemIndex)
        .map(() => defaultHeight)
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
