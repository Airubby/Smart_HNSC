<template>
  <div class="dialog-wrapper" v-show="centerDialogVisible">
    <div class="dialog-center">
      <slot name="title">
        <div class="dialog-title" v-if="diagTitle">
          <span>{{ diagTitle|empty('提示') }}</span>
          <el-button type="text" icon="el-icon-close" class="closeBtn" @click="centerDialogVisible = false"></el-button>
        </div>
      </slot>
      <slot name="content">
        <div class="dialog-content">
          <p>内容</p>
          <!--  -->
          <el-upload
            class="upload-demo"
            ref="upload"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :auto-upload="false">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div></div>
            <!-- <el-button slot="trigger" size="small" type="primary">选取文件</el-button> -->
            <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
        </div>
      </slot>
      <slot name="footer">
        <div class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitUpload">确 定</el-button>
        </div>
      </slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'VUpload',
  props: ["title", "data", 'isDialog'],
  data() {
    return {
      centerDialogVisible: false,
      diagTitle: this.title,
      diagContent: this.content,
      fileList: this.data
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
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
      this.centerDialogVisible = false;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
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
    position: relative;
    margin: 15vh auto 50px;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0,0,0,.3);
    box-sizing: border-box;
    width: 40%;
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
  }
  .dialog-footer {
    padding: 20px;
    padding-top: 10px;
    text-align: right;
    box-sizing: border-box;
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
