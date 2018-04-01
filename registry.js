// 注册
import Vuex from 'vuex'

export default function registry(v) {
  v.use(Vuex)
  // 挂在store到全局（this）
  v.prototype.$toastStore = new Vuex.Store({
    state: {
      show:false,
      text:'提示',
      duration: 1500,
      modalStyles:null,
      modalClass:null,
      textStyles:null,
      textClass:null
    },
    getters:{
      'GET_TOAST_SHOW': function (state) {
        return state.show
      },
      'GET_TOAST_TEXT': function (state) {
        return state.text
      },
      'GET_TOAST_DURATION': function (state) {
        return state.duration
      },
      'GET_TOAST_TEXT_CLASS_NAME': function (state) {
        return state.textClass
      },
    },
    mutations: {
      hideToast(state) {
        state.show = false
      },
      showToast(state, data) {
        if (state.show) return
        data.duration = data.duration || 1500
        let dt = {
          show: true,
          text: data.text || '提示',
          duration: data.duration + 700,
          textClass: data.textClass || '',
        }
        state = Object.assign(state, dt)
      }
    }
  })
  // 注册显示方法 $mptoast 到全局
  v.prototype.$mptoast = function (data, duration = 1500, textClass = '') {
    if (typeof data === 'string' || typeof data === 'number') {
      v.prototype.$toastStore.commit('showToast', {text: data, duration: duration, textClass: textClass})
    }
    if (typeof data === 'object') {
      v.prototype.$toastStore.commit('showToast', data)
    }
  }
}
