<template>
  <div class="grid-content">
    <slot name="title">
      <h3 class="title" slot><i class="iconfont icon-biaotiyangshi"></i>{{ title }}</h3>
    </slot>
    <i v-if="isShow == true" class="iconfont icon-shang moreBtn" @click="onClick()"></i>
    <i v-else  class="iconfont icon-shang moreBtn" :class="{'rotation': !isShow }" @click="onClick()"></i>
    <el-row v-show="isShow == true" class="grid-content2">
      <slot name="content">
        <el-col><div class="content">{{ content }}</div></el-col>
      </slot>
    </el-row>
  </div>
</template>
<script>
export default {
  props: ['title', 'content'],
  data(){
    return {
      isShow: true
    }
  },
  methods: {
    onClick(){
      this.isShow = !this.isShow
    }
  }
}
</script>
<style lang="less" scoped>
div.grid-content {
    position: relative;
    width: 100%;
    // height: 161px;
    background: #ffffff;
    -webkit-box-shadow: 0px 2px 3px 0px rgba(0,0,0,0.11);
    -ms-box-shadow: 0px 2px 3px 0px rgba(0,0,0,0.11);
    -moz-box-shadow: 0px 2px 3px 0px rgba(0,0,0,0.11);
    box-shadow: 0px 2px 3px 0px rgba(0,0,0,0.11);
    .grid-content2, .title {
      padding: 0 15px;
    }
    .title {
      line-height: 40px;
      i {
        color:#599EF0;
        font-size: 16px;
        margin-right: 5px;
      }
    }
    .iconfont {
      -webkit-transition: all 0.3s;
      -moz-transition:    all 0.3s;
      -ms-transition:     all 0.3s;
      -o-transition:      all 0.3s;
      transition:         all 0.3s;
      &.rotation {
        -webkit-transform: rotate(180deg);
        -moz-transform:    rotate(180deg);
        -ms-transform:     rotate(180deg);
        -o-transform:      rotate(180deg);
        transform:      rotate(180deg);
      }
    }
    .grid-content2 {
      min-height: 160px;
    }
    .content {
      word-break: break-all;
    }
    .moreBtn {
      position: absolute;
      color: #999;
      right: 10px;
      top:10px;
      font-size: 14px;
      cursor: pointer;
    }
  }
</style>
