<template>
  <!-- <div :class="필터 + ' filter-item'" :style="`background-image:url(${이미지})`"></div> -->
  <div @click="fire" :class="필터" class="filter-item" :style="`background-image:url(${이미지})`">
      <slot></slot>
      <!-- <button @click="fire">버턴</button> -->
  </div>
</template>

<script>
export default {
  name: "filter-box",
  methods: {
      fire() {  // 멀리있는 comp에 데이터 보낼때
          this.emitter.emit('박스클릭함', this.필터)
      }
  },
  props: {
    이미지: String,
    필터: String,
  },
};
</script>

<style>
.filter-item {
  width: 100px;
  height: 100px;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color: white;
  background-size: cover;
  background-position: center;
}
</style>