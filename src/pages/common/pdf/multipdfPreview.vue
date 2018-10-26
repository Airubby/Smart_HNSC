<template>
  <div class="dialog-wrapper" v-show="centerDialogVisible">
    <div class="dialog-center">
      <slot name="title">
        <div class="dialog-title">
          <span>{{ diagTitle|empty('材料预览') }}</span>
          <el-button type="text" icon="el-icon-close" class="closeBtn" @click="centerDialogVisible = false"></el-button>
        </div>
      </slot>
      <slot name="content">
        <div class="dialog-content">
          <div class="leftList">
            <div class="list-item" v-for="(item, index) in Datalist" :key="index" @click="clickItem(index)" :class="{'list-item-active': currentIndex == index}">
              {{ item.name }}
              <img src="~@/assets/404_images/404.png" alt="">
            </div>
          </div>
          <div class="rightBox">
            {{ currentIndex }}
            <iframe class="previewStyle" src="http://its.kojyoui.cn:8888/Scripts/pdf.js/web/viewer.html?pdf_url=/Office2PDF/PreviewOfPDF?strFilePath=D:\test\201806010926172394_%E5%A4%AA%E6%9E%81%E9%A1%B9%E7%9B%AE%E7%AE%A1%E7%90%86%E4%BB%8B%E7%BB%8D.docx">
            </iframe>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MultiPreview',
  props: ["title", "data", "isDialog"],
  data() {
    return {
      centerDialogVisible: false,
      diagTitle: this.title,
      // diagContent: this.content,
      currentIndex: 0,
      Datalist: this.data
    };
  },
  watch: {
    isDialog(val) {
      this.centerDialogVisible = val;
    },
    centerDialogVisible(value) {
      // 设置监听，如果改变就更新isDialog
      this.$emit("update:isDialog", value);
    }
  },
  methods: {
    clickItem(value) {
      this.currentIndex = value;
    }
  }
};
</script>
<style lang="less" scoped>
.dialog-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  margin: 0;
  z-index: 2073;
  background-color: rgba(0, 0, 0, 0.5);
  .dialog-center {
    position: absolute;
    top: 10vh;
    bottom: 10vh;
    left: 10%;
    margin: 0 auto;
    background: #fff;
    border-radius: 2px;
    // box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    box-sizing: border-box;
    width: 80%;
    min-width: 460px;
    .leftList {
      float: left;
      width: 18%;
      height: 100%;
      overflow-y: auto;


       /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
      &::-webkit-scrollbar {
        width: 10px;
        height: 10px;
        background-color: #f5f5f5;
        // background-color: transparent;
      }

      /*定义滚动条轨道 内阴影+圆角*/
      &::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(108, 164, 231, 0.3);
        border-radius: 10px;
        background-color: #f5f5f5;
        // background-color: transparent;
      }

      /*定义滑块 内阴影+圆角*/
      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(108, 164, 231, 0.3);
        background-color: #555;
        // background-color: #ffffff;
      }
    }
    .rightBox {
      margin-left: 20%;
      height: 100%;
    }
    .list-item {
      padding: 10px;
      cursor: pointer;
      color: #333333;
      img {
        display: block;
        width: 80%;
        height: 40%;
      }
      &.list-item-active {
        border-left: 3px solid #6ca4e7;
      }
    }
  }
  .dialog-title {
    padding: 20px;
    padding-bottom: 10px;
    span {
      line-height: 24px;
      font-size: 18px;
      color: #333333;
    }
  }
  .dialog-content {
    padding: 20px 20px;
    color: #606266;
    font-size: 14px;
    height: calc(100% - 54px);
  }
  .previewStyle {
    width: 100%;
    height: 100%;
  }
}
.closeBtn {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 0;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 20px;
}
</style>
