<template>
  <div>
    <button @tap="showToast"> show mptoast</button>
    <mptoast />
  </div>
</template>

<script>
import mptoast from '__ROOT__/index'

export default {
  // 这里我个人的建议是把 components放在第一个,这样能比较有效的避免import的时候，忘了注册
  components: {
    mptoast
  },
  data () {
    return {}
  },

  methods: {
    showToast () {
      this.$mptoast('我是弹窗内容',1500,'success')
      // this.$mptoast('我是弹窗内容',5000,'info','abcabc','iconClass')
      // this.$mptoast({text: '我是弹窗内容', duration: 5000, icon:'info', textClass: 'abcabc', iconClass: 'iconClass'})
    },
  }
}
</script>

<style>
  .abcabc{
    background: red;
    color: green;
  }
  .iconClass{
    background: aqua;
    width: 500rpx;
  }
</style>
