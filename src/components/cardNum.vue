<template>
  <span><i v-for="(item, index) in numArr" :key="index" :style="{fontSize: fontSize + 'px'}" :class="['iconfont', 'colorful', 'icon-zhuanhuan'+ item]"></i></span>
</template>
<script>
export default {
  name: 'cardNum',
  props: ['num', 'fontSize'],
  data () {
    return {
    }
  },
  computed: {
    numArr () {
      if (!this.num) {
        return [0, 0, 0]
      } else {
        return this.num.split('')
      }
    }
  }
}
</script>
<style scoped>
.iconfont {
  font-size: 38px;
  color: #00ffff;
}
</style>
