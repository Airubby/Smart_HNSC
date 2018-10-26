<template>
  <div>test
    <svg-icon icon-class="user"></svg-icon>

    <!-- 弹窗 -->
    <el-button type="text" @click="outerVisible = true">点击打开 Dialog</el-button>
    <v-dialog :isDialog.sync="outerVisible"></v-dialog>

    <!-- pdf -->
    <el-button type="text" @click="outerVisible2 = true">点击打开 pdf</el-button>
    <v-preview :isDialog.sync="outerVisible2"></v-preview>

    <!-- pdfs -->
    <div></div>
    <div></div>
    <div></div>
    <el-button type="text" @click="outerVisible3 = true">点击打开多个 pdfs</el-button>
    <multi-preview :isDialog.sync="outerVisible3" :data="pdfData"></multi-preview>

    <div></div>
    <div></div>
    <el-button type="text" @click="outerVisible4 = true">点击上传</el-button>
    <v-upload :isDialog.sync="outerVisible4" :data="pdfData"></v-upload>
  </div>

</template>
<script>
import VDialog from "./common/dialog";
import VPreview from "./common/pdf/pdfPreview";
import MultiPreview from "./common/pdf/multipdfPreview";
import VUpload from "./common/upload/upload";

export default {
  name: "tpl",
  components: {
    VDialog,
    VPreview,
    MultiPreview,
    VUpload
  },
  data() {
    return {
      outerVisible: false,
      outerVisible2: false,
      outerVisible3: false,
      outerVisible4: false,
      pdfData: [
        {
          name: "实施方案一",
          id: "1",
          link: ''
        },
        {
          name: "实施方案一（1）",
          id: "1",
          link: ''
        },
        {
          name: "实施方案二",
          id: "1",
        },
        {
          name: "实施方案三",
          id: "1",
        },
        {
          name: "实施方案四",
          id: "1",
        },
        {
          name: "实施方案五",
          id: "1",
        },
        {
          name: "实施方案六",
          id: "1",
        }
      ]
    };
  }
};
</script>
<style lang="less" scoped>
</style>

