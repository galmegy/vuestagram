<template>
  <div style="padding: 10px">
    <h4>팔로워</h4>
    <input placeholder="?" @input="search($event.target.value)"/>
    <!-- [오류노트]: v-for를 위에 붙여서 루프 실행이 안됨 -->
    <!-- post-header같은 layout design은 공유되므로 여기서 사용 가능 -->
    <div class="post-header" v-for="(a, i) in follower" :key="i">
      <!-- [오류 노르]: :style인데 :을 빼먹어 제대로 실행이 안됨 -->
      <div class="profile" :style="`background-image:url(${a.image})`"></div>
      <span class="profile-name">{{ a.name }}</span>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, toRefs, watch, computed } from "vue";
import axios from "axios";
import { useStore } from 'vuex';

export default {
  name: "mypage-item", //항상 괄호필요
  props: {
    one: Number,
    two: Number,
  },
  setup(props) {
    // Composition API라고 부르고, 앞의 방식은 Options API라 부름
    // 
    // 상위에서 여기로 변수 넘겨서 setup내에서 사용하기를 원할 때는
    // 아래처럼 toRefs를 통해 추출
    let { one, two } = toRefs(props);
    console.log(one.value, two.value);

    // 변수를 감시하고 싶을 때는
    watch(one, ()=>{
        console.log(one.value); // one이 변경시 실행할 코드
    })

    // vuex변수를 가져올 때 사용. mapState등은 사용 불가
    let store = useStore();
    console.log(store.state.name);
    


    //component를 만들기 전에 이것부터 실행해 주세요 의미
    // setup안에 데이터생성/조작, methods, computed, watch만들수 있고
    // hook도 걸수 있고, 거의 모든 기능개발을 한 곳에서 가능
    let follower = ref([]); // data생성 방법(ref안에 넣음. 값 공유 개념).
    let followerOriginal = ref([]);    

    onMounted(() => {
      // Mouted되고 나서 ajax요청.
      // ajax요청으로 데이터 가져와서 여기에 저장할 거임
      // axis만 탁 치면 위에 import는 자동으로 됨
      // 여기서 실행하면 created hook과 비슷
      // [오류노트] 경로를 정확하게.
      axios.get("/follower.json").then((a) => {
        follower.value = a.data;
        followerOriginal.value = [...a.data];
      });
    });


    // filter사용법: [1,2,3].filter((a)=>{ return a == 2 }) 
    function search(검색어){
      let newFollower = followerOriginal.value.filter((a)=>{
        return a.name.indexOf(검색어) != -1
      });
      follower.value = [...newFollower]
    }

    // 연산 결과를 저장할 때는 
    let result = computed( ()=>{
        return follower.value.length;
    } )
    console.log(result.value);

    return { follower, search };
  },
  data() {
    return {};
  },
};
</script>

// style옆에 scoped라고 붙이면 style은 점염안되므로 여기서만 사용가능함. 막짜도 됨
<style>
</style>