<template>
  <div class="dialog-wrapper" v-show="centerDialogVisible">
    <div class="dialog-center">
      <slot name="title">
        <div class="dialog-title">
          <span>{{ diagTitle|empty('预览') }}</span>{{content}}
          <el-button type="text" icon="el-icon-close" class="closeBtn" @click="centerDialogVisible = false"></el-button>
        </div>
      </slot>
      <slot name="content">
        <div class="dialog-content">
          <!-- link -->
          <iframe class="previewStyle" src="http://its.kojyoui.cn:8888/Scripts/pdf.js/web/viewer.html?pdf_url=/Office2PDF/PreviewOfPDF?strFilePath=D:\test\201806010926172394_%E5%A4%AA%E6%9E%81%E9%A1%B9%E7%9B%AE%E7%AE%A1%E7%90%86%E4%BB%8B%E7%BB%8D.docx">
          </iframe>
        </div>
      </slot>
      <!-- <slot name="footer">
        <div class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
        </div>
      </slot> -->
    </div>
  </div>
</template>
<script>
export default {
  name: 'VPreview',
  props: ["title", "content", 'isDialog'],
  data() {
    return {
      centerDialogVisible: false,
      diagTitle: this.title,
      // diagContent: this.content,
    };
  },
  watch: {
    isDialog(val){
      this.centerDialogVisible = val
    },
    centerDialogVisible(value){
      // 设置监听，如果改变就更新isDialog
      this.$emit('update:isDialog', value)
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
  background-color: rgba(0,0,0,.5);
  .dialog-center {
    position: absolute;
    top: 10vh;
    bottom: 10vh;
    left: 20%;
    margin: 0 auto;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0,0,0,.3);
    box-sizing: border-box;
    width: 60%;
    // max-width: 1000px;
    min-width: 460px;
  }
  .dialog-title {
    padding: 20px;
    padding-bottom: 10px;
    span {
      line-height: 24px;
      font-size: 18px;
      color: #666666;
    }
  }
  .dialog-content {
    padding: 30px 20px;
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
  font-size: 16px;
}
</style>
