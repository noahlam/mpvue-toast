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
      textClass:null,
      icon:null,
      iconClass:null,
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
      'GET_TOAST_ICON': function (state) {
        return state.icon
      },
      'GET_TOAST_ICON_CLASS_NAME': function (state) {
        return state.iconClass
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
          icon:data.icon || '',
          iconClass:data.iconClass || '',
        }
        state = Object.assign(state, dt)
      }
    }
  })
  // 注册显示方法 $mptoast 到全局
  v.prototype.$mptoast = function (data, icon = '', duration = 1500, textClass = '',iconClass= '') {
    if (typeof data === 'string' || typeof data === 'number') {
      v.prototype.$toastStore.commit('showToast', {text: data, icon:icon, duration: duration, textClass: textClass, iconClass: iconClass})
    }
    if (typeof data === 'object') {
      v.prototype.$toastStore.commit('showToast', data)
    }
  }
}
