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
  </div>
</template>

<script>
import VirtualScroll from "@/components/VirtualScroll.vue";

export default {
  name: "user-virtual-scroll",
  components: {
    VirtualScroll,
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
</style>
