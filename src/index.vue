<template>
  <view  style="" :class="textClass" v-if="show">
    <image :class="iconClass" :src="icon" v-if="icon"></image>
    {{text}}
  </view>
</template>

<script type="text/ecmascript-6">
  import icons from './icons'
  export default {
    data () {
      return {
        animateShow: false,
      }
    },
    computed:{
      show() {
        let delay = this.$toastStore.getters.GET_TOAST_DURATION
        let show = this.$toastStore.getters.GET_TOAST_SHOW
        this.animateShow = show
        if(show) {
          setTimeout(() => {
            this.animateShow = false
            setTimeout(() => {
              this.$toastStore.commit('hideToast')
              this.$toastStore.commit('callback')
              }, 350
            )
          }, delay - 350 )
        }
        return show
      },
      text() {
        return this.$toastStore.getters.GET_TOAST_TEXT
      },
      icon () {
        let icon = this.$toastStore.getters.GET_TOAST_ICON
        let iconNames = new Set(['success','error','info'])
        if (iconNames.has(icon)) {
          return icons[icon]
        }else {
          return false
        }
      },
      textClass() {
        let normalClass = this.$toastStore.getters.GET_TOAST_TEXT_CLASS_NAME  || '__toast_text__'
        let animatClass = this.animateShow ? ' enterAni' : ' fadeAni'
        return normalClass + animatClass
      },
      iconClass() {
        return this.$toastStore.getters.GET_TOAST_ICON_CLASS_NAME  || '__toast_image__'
      }
    },
  }
</script>

<style scoped>
  .__toast_image__{
    width: 75rpx;
    height: 75rpx;
    margin-bottom: 10rpx;
  }
  .__toast_text__{
    min-height: 60rpx;
    min-width: 150rpx;
    max-width: 50%;
    max-height: 50%;
    border-radius: 10rpx;
    z-index: 9999;
    position: fixed;
    font-size: 28rpx;
    color: #fff;
    top:50%;
    left: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transform: translate(-50%, -50%) ;
    background: rgba(0,0,0,.65);
    padding: 20rpx;
    opacity: 0;
  }
  .enterAni {
    animation:enter 0.35s;
    animation-fill-mode: forwards;
  }
  .fadeAni {
    animation:fadeout 0.35s;
  }
  @keyframes enter
  {
    from {opacity:0;}
    to {opacity:1;}
  }
  @keyframes fadeout
  {
    from {opacity:1;}
    to {opacity:0;}
  }
</style>
