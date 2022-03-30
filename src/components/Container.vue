<template>
  <div>
    <div v-if="step == 0">
      <Post :게시물="게시물[i]" v-for="(a, i) in 게시물" :key="i" />
    </div>

    <div v-if="step == 1">
      <!-- 필터선택페이지---- 문자중간에 변수를 넣고 싶을땐 back-tic기호 사용 -->
      <div
        :class = "선택한필터"
        class="upload-image"
        :style="`background-image:url(${이미지})`"
      ></div>
      <div class="filters">
         <FilterBox :이미지="이미지" :필터="필터" v-for="필터 in 필터들" :key="필터">
             <!-- props하고 차이점은 html내용물을 데이터바인딩하고 싶을떄 사용하는게 slot, props는 속성안에 바로 할때 사용 -->
             {{필터}}
         </FilterBox>
        <!-- <div class="filter-1"></div> -->
      </div>
    </div>

    <div v-if="step == 2">
      <!-- 글작성페이지 -->
      <div
        :class = "선택한필터"
        class="upload-image"
        :style="`background-image:url(${이미지})`"
      ></div>
      <div class="write">
        <textarea
          @input="$emit('write', $event.target.value)"
          class="write-box"
        >write!</textarea>
      </div>
    </div>

  <div v-if="step==3">
    <MyPage :one="1" :two="2" />
  </div>

  </div>

</template>

<script>
import Post from "./Post.vue";
import FilterBox from "./FilterBox.vue";
import MyPage from "./MyPage.vue";


export default {
  name: "container-item",
  data () {
      return {
        필터들: [ "aden", "_1977", "brannan", "brooklyn", "clarendon", "earlybird", "gingham", "hudson", 
                "inkwell", "kelvin", "lark", "lofi", "maven", "mayfair", "moon", "nashville", "perpetua", 
                "reyes", "rise", "slumber", "stinson", "toaster", "valencia", "walden", "willow", "xpro2"],    
        선택한필터: '',
      }
  },
  props: {
    게시물: Array,
    step: Number,
    이미지: String,
  },
  components: {
    Post: Post,
    FilterBox: FilterBox,
    MyPage: MyPage,
  },
  mounted () {  //emitter로 발사된것 수신은 mounted로 하는게 일반적
    this.emitter.on('박스클릭함', (a)=>{
      this.선택한필터 = a;
      console.log(a)
    });
  },

};
</script>


<style>
.upload-image {
  width: 100%;
  height: 450px;
  background: cornflowerblue;
  background-size: cover;
}
.filters {
  overflow-x: scroll;
  white-space: nowrap;
}
.filter-1 {
  width: 100px;
  height: 100px;
  background-color: cornflowerblue;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color: white;
  background-size: cover;
}
.filters::-webkit-scrollbar {
  height: 5px;
}
.filters::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.filters::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}
.filters::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.write-box {
  border: none;
  width: 90%;
  height: 100px;
  padding: 15px;
  margin: auto;
  display: block;
  outline: none;
}
</style>