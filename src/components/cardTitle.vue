<template>
  <span class="title-box">
    <i class="iconfont icon-biankuang icon1"></i>
    <i class="iconfont icon-biankuang-copy-copy icon2"></i>
    <slot></slot>
  </span>
</template>
<script>
export default {
  name: 'cardTitle'
}
</script>

<style lang="less" scoped>
// 标题
.title-box {
  color: #ffffff;
  font-size: 20px;
  position: relative;
  padding: 0px 10px;

  i {
    position: absolute;
    font-size: 14px;
    line-height: 1;
    color: #00ffff;
    &.icon1 {
      left: 0;
      top: -11px;
    }
    &.icon2 {
      bottom: -10px;
      right: 0;
    }
  }
}
</style>
