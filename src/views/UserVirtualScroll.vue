<template>
  <div class="container">
    <VirtualScroll :totalHeight="400" :defaultHeight="30" :data="MOCK_DATA">
      <template #default="{ items }">
        <div
          v-for="(item, index) in items"
          :style="{ height: `30px` }"
          :key="index"
        >
          {{ item }}
        </div>
      </template>
    </VirtualScroll>
    <br />
    <!-- <RecycleScroller
      class="scroller"
      :items="MOCK_DATA"
      :item-size="30"
      key-field="id"
      v-slot="{ item }"
    >
      <div class="item">
        {{ item }}
      </div>
    </RecycleScroller> -->
  </div>
</template>

<script>
import VirtualScroll from "@/components/VirtualScroll.vue";
// import { RecycleScroller } from "vue-virtual-scroller";
// import "vue-virtual-scroller/dist/vue-virtual-scroller.css";

export default {
  name: "user-virtual-scroll",
  components: {
    VirtualScroll,
    // RecycleScroller,
  },
  data() {
    return {
      MOCK_DATA: Array(20000)
        .fill(null)
        .map(() => (Math.random() * 10000).toFixed(8)),
    };
  },
};
</script>
<style>
.container {
  overflow: hidden;
  height: 80vh;
  border: 5px gray solid;
}

.scroller {
  height: 400px;
}
.item {
  height: 30px;
}
</style>
