import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    themeColor:'#409EFF', // 默认主题色
}

export default new Vuex.Store({
    state,
    mutations:{

      // 主题色更新
      themeColorChange(state,val) {
        state.themeColor = val;
      },
    }
})
