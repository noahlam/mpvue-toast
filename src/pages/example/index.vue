<template>
  <div>
    <button @tap="showToast"> show mptoast</button>
    <mptoast />
  </div>
</template>

<script>
import mptoast from '@/components/mptoast'

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
      this.$mptoast('我是弹窗内容222')
    },
  }
}
</script>
