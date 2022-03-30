<template>
  <div class="header">
    <ul class="header-button-left">
      <li>Cancel</li>
    </ul>
    <ul class="header-button-right">
      <li v-if="step == 1" @click="step++">Next</li>
      <li v-if="step == 2" @click="publish">발행</li>
    </ul>
    <img src="./assets/logo.png" class="logo" />
  </div>

  <!-- (1) npm install vuex@next로 설치, (2) store.js에 데이터저장. (3) main.js에 등록, (4)아래처럼 사용 -->
  <!-- (Vuex국룰) 컴포넌트 안에서 직접 수정하기 금지 
  1. 미리 store.js에 수정방법을 정의해 두고, 2. 그 방법을 컴포넌트에서 소환해서 수정해야 함 -->
  <h4>안녕 {{ $store.state.age }}</h4>
  <!-- <button @click="$store.commit('증가', 10)">버턴</button> -->

  <!-- mapMutations을 사용하면 더 간단하게 '증가'함수를 호출하는게 가능 -->
  <button @click="증가(10)">버턴</button>

  <!-- (1) store의 actions를 실행하기 위함.  -->
  <p>{{ $store.state.more }}</p>
  <button @click="$store.dispatch('getData')">더보기버턴</button>

  <p>{{name}} {{likes}}</p>


  <Container @write="작성한글=$event" :이미지="이미지" :step="step" :게시물="게시물" />


  <button @click="more">더보기</button>


  <!-- computed vs methods 차이, computed함수 호출시에는 ()없이 -->
  <!-- <p>{{now2}} {{카운터}}</p>
  <button @click="카운터++">버턴</button> -->


  <div class="footer">
    <ul class="footer-button-plus">
      <!-- <input @change="upload" accept="image/*" multiple type="file" id="file" class="inputfile" /> -->
      <input @change="upload" type="file" id="file" class="inputfile" />
      <label for="file" class="input-plus">+</label>
    </ul>
  </div>

  <!-- <div v-if="step==0">내용0</div>
<div v-if="step==1">내용1</div>
<div v-if="step==2">내용2</div>
<button @click="step=0">버턴0</button>
<button @click="step=1">버턴1</button>
<button @click="step=2">버턴2</button> -->
</template>



<script>
import Container from "./components/Container.vue";
import postdata from "./assets/postdata.js";

import axios from "axios";
axios.post();

// 아래 두 명령을 사용 시 $store.state...대시 편리하게
// store에 있는 변수, 함수를 갖다 사용하는 것이 편리함 
import {mapState, mapMutations} from 'vuex'

// WebApp을 만들려면 (PWA되려면) 2가지가 필요
// manifest.json, service-worker.js
// (1) vue add pwa, 설치 잘되면 registerServiceWorker.js라는게 src밑에 생김
// (2) npm run build, dist라는 폴더가 생김, 밑에 manifest.json(앱정보담는 파일), 
//   service-worker.js(인터넷없어도 사용가능토록: 웹구동에 필요한 html css, img하드에 저장)

export default {
  name: "App",
  data() {
    return {
      게시물: postdata,
      더보기: 0,
      step: 3,
      이미지: "",
      작성한글: '',
      선택한필터: '',
      카운터: 0,
    };
  },
  mounted () {  //emitter로 발사된것 수신은 mounted로 하는게 일반적
    this.emitter.on('박스클릭함', (a)=>{
      this.선택한필터 = a;
      console.log(a)
    });
  },
  components: {
    Container: Container,
  },

  // methods vs computed
  // computed는 처음 실행하고 값을 간직함(함수라기 보다는 계산된 결과 저장공간 역할).
  // methods는 사용할 때마다 실행됨.
  // 실제로는 store에 있는 state꺼내쓸 때도 사용함. 
  computed : {
    name() {
      return this.$store.state.name;
    },
    ...mapState(['name', 'age', 'likes']),
    ...mapState({내이름: 'name', })
    // now2() {
    //   return new Date();
    // },
  },

  methods: {  // mapActions도 가능함
    ...mapMutations(['setMore', '좋아요', '증가']),

    // now() {
    //   return new Date();
    // },
    publish() {
      var 내게시물 = {
        name: "Kim Hyun",
        userImage: "https://placeimg.com/100/100/arch",
        postImage: this.이미지,
        likes: 36,
        date: "May 15",
        liked: false,
        content: this.작성한글,
        filter: this.선택한필터,
      };
      this.게시물.unshift(내게시물);
      this.step = 0;
    },
    upload(e) {
      let 파일 = e.target.files;
      console.log(파일[0], 파일[0].type);
      let url = URL.createObjectURL(파일[0]);
      console.log(url);
      this.이미지 = url;
      this.step++;
    },
    more() {
      // axios.post('URL', {name: 'Kim'}).then().catch(); // 데이터 전달해서 저장(성공,실패)
      axios
        .get(`https://codingapple1.github.io/vue/more${this.더보기}.json`)
        .then((결과) => {
          console.log(결과.data);
          this.게시물.push(결과.data);
          this.더보기++;
        });
    },
  },
};
</script>



<style>
body {
  margin: 0;
}
ul {
  padding: 5px;
  list-style-type: none;
}
.logo {
  width: 22px;
  margin: auto;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 13px;
}
.header {
  width: 100%;
  height: 40px;
  background-color: white;
  padding-bottom: 8px;
  position: sticky;
  top: 0;
}
.header-button-left {
  color: skyblue;
  float: left;
  width: 50px;
  padding-left: 20px;
  cursor: pointer;
  margin-top: 10px;
}
.header-button-right {
  color: skyblue;
  float: right;
  width: 50px;
  cursor: pointer;
  margin-top: 10px;
}
.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: white;
}
.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  padding-top: 12px;
}
.sample-box {
  width: 100%;
  height: 600px;
  background-color: bisque;
}
.inputfile {
  display: none;
}
.input-plus {
  cursor: pointer;
}
#app {
  box-sizing: border-box;
  font-family: "consolas";
  margin-top: 60px;
  width: 100%;
  max-width: 460px;
  margin: auto;
  position: relative;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}
</style>
