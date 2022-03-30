import axios from 'axios';
import { createStore } from 'vuex'

// 컴포넌트 사이에서 데이터 공유 시에 주로 사용
// 자체 컴포넌트에서만 사용시는 vuex에 저장할 필요 없음. 
const store = createStore({
  state(){
    return {
      name: 'kim',
      age: 20,
      likes: 30,
      좋아요눌렀니: false,
      more: {}, //서버에서 더보기게시물을 가져와서 여기 저장
    }
  },
  mutations: {  // 목적은 오로지 상태(state) 변경
      setMore(state, data) {
        state.more = data
      },
      좋아요(state) {
        if(state.좋아요눌렀니==false) {
            state.likes++;
            state.좋아요눌렀니=true;
        } else {
            state.likes--;
            state.좋아요눌렀니=false;
        }
      },
      증가(state, data) {
        state.age += data;
      },
      이름변경(state) {
        state.name = 'park'
      }
  },
  actions : {  // ajax요청 시 (외부 api호출: 서버등으로 데이터 요청)
    getData(context) {  // context는 store임
        axios.get('https://codingapple1.github.io/vue/more0.json').then((a)=>{
            console.log(a);
            context.commit('setMore', a.data);
        }) 
    }
  }
})

export default store;


// 1. component가 action일으킴(ex. 버턴 글릭)
// 2. action에서는 외부 api호출 후 그 결과를 이용해서 mutation(변이) 일으킴(외부 api없으면 생략).
// 3. mutation에서는 action결과 받아 state(상태) 변경. -> (vue.js, devtools로 추적, 확인 가능)
// 4. mutation으로 변경된 상태는 다시 component에 바인딩되어 화면에 갱신됨


