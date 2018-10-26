<template>
  <div class="dashboard-container">

    <!-- top -->
    <div class="top-box mb10 clearfix">
      <div class="top-left fl">
        {{ value }}
        <el-select v-model="value" placeholder="请选择" class="selectInput">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="top-right">
        <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="6">
            <div class="process-item" @click="clickItem(1)">
              <svg-icon v-if="status == 1" icon-class="yishangshenbaobiao_nor"></svg-icon>
              <svg-icon v-if="status == 2" icon-class="yishangshenbaobiao_stage"></svg-icon>
              <svg-icon v-if="status == 3" icon-class="yishangshenbaobiao_finished"></svg-icon>
              <p>一上申报</p>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="process-item" @click="clickItem(2)">
              <svg-icon v-if="status == 1" icon-class="yishangshenbaobiao_nor"></svg-icon>
              <svg-icon v-if="status == 2" icon-class="yishangshenbaobiao_stage"></svg-icon>
              <svg-icon v-if="status == 3" icon-class="yishangshenbaobiao_finished"></svg-icon>
              <p>二上申报</p>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <!-- introduction -->
    <div class="middle-box mb10">
      <el-row :gutter="20">
        <el-col :span="14">
          <v-card :title="cardtitle" :content="cardcontent">
            <div slot="left-content" class="imgBox"><img src="~@/assets/404_images/404.png" alt=""></div>
          </v-card>
        </el-col>
        <el-col :span="10">
          <v-card :title="cardtitle2">
            <ul slot="content">
              <li v-for="(item, index) in historyList" :key="index" class="history-item">
                <span class="dot"></span><span class="historyName">{{ item.username }}</span> {{ item.todos }}
              </li>
            </ul>
          </v-card>
        </el-col>
      </el-row>
    </div>

    <!-- table -->
    <div class="bottom-box">{{isTable}}
      <div class="table-container" v-if="isTable == 1">
        <h3 class="title">{{ tableTitle|empty('申报表') }}</h3>
        <div>
          <p class="fontStyle">单位：万元</p>
          <common-table :tableData="tableData" :columns="columns" @on-look="handleLook" @on-update="handleUpdate"></common-table>
        </div>
        <div class="btnGroup">
          <el-button type="primary" @click="submit()">审核提交</el-button>
        </div>
      </div>

      <div class="table-container" v-if="isTable == 2">
        <h3 class="title">{{ tableTitle|empty('签批表') }}</h3>
        <div>
          <p class="fontStyle">单位：万元</p>
          <common-table :tableData="tableData" :columns="columns" @on-look="handleLook" @on-update="handleUpdate"></common-table>
        </div>
        <div class="btnGroup">
          <el-button type="primary" @click="submit()">审核提交</el-button>
        </div>
      </div>

    </div>

    <!-- 弹窗组件 -->
    <v-dialog :isDialog.sync="isDialog">
      <div class="diagContent" slot="content">
        <p><span>项目总预算合计</span> <span><em>1300</em>万元</span></p>
        <p><span>2018年度项目预算合计</span> <span><em>1300</em>万元</span></p>
      </div>
      <div class="dialog-footer" slot="footer">
        <el-button @click="isDialog = false">取 消</el-button>
        <el-button type="primary" @click="onOk()">确 定</el-button>
      </div>
    </v-dialog>
    <!-- 单个预览 -->
    <v-preview :isDialog.sync="outerVisible5" :content="pdfFileID"></v-preview>
    <!-- 多个预览 -->
    <multi-preview :isDialog.sync="outerVisible3" :data="pdfData"></multi-preview>
    <!-- 导入 -->
    <v-upload :isDialog.sync="outerVisible2"></v-upload>
    <!-- 编辑 -->
    <v-upload :isDialog.sync="outerVisible4" :data="fileList"></v-upload>
  </div>
</template>
<script>
import {
  // CollectTable,
  CommonTable,
  SelectTable,
  VCard,
  VDialog,
  VPreview,
  MultiPreview,
  VUpload} from './tmpl/auditing.js'

import * as API from "@/api/apply/apply";

export default {
  name: "audtingCheck",
  components: {
    CommonTable,
    VCard,
    VDialog,
    VPreview,
    MultiPreview,
    VUpload,
    SelectTable
  },
  data() {
    return {
      columns: [
        {
          prop: "name",
          label: "申报名称",
          width: "120"
        },
        {
          prop: "applyStatus",
          label: "申报表",
          width: "180"
        },
        {
          prop: "replyStatus",
          label: "签批",
          width: "230"
        },
        {
          prop: "files",
          label: "依据和支撑材料",
          width: "300"
        },
        {
          prop: "status",
          label: "审核状态",
          width: "120"
        }
      ],
      tableData: [
        {
          date: "2016-05-03",
          name: "20180824-调整预算申报",
          applyStatus: '已上传',
          replyStatus: "已上传",
          files: [
            {
              name: '材料1',
              id: 1 // link
            },
            {
              name: '材料2',
              id: 2 // link
            }
          ],
          status: "1",
        },
        {
          date: "2016-05-02",
          name: "调整预算申报",
          applyStatus: '已上传',
          replyStatus: "已上传",
          files: [
            {
              name: '材料1',
              id: 3 // link
            },
            {
              name: '材料2',
              id: 4 // link
            }
          ],
          status: "1",
        }
      ],

      cardtitle: "阶段工作说明",
      cardcontent:
        "各处室与直属各单位按照年初预算申报工作要求，组织开展预算工作，预算申报分一上和二上两个环节。一上时，各处室、直属单位进行年度预算初步核算后，按要求填报一上申报表并排序，..",
      cardtitle2: "历史操作记录",
      historyList: [
        {
          username: "机关处",
          todos: "上传申报表"
        },
        {
          username: "财务处",
          todos: "批复申报表"
        },
        {
          username: "机关处",
          todos: "审核申报表"
        }
      ],
      options: [
        {
          value: "2019",
          label: "2019年"
        },
        {
          value: "2018",
          label: "2018年"
        },
        {
          value: "2017",
          label: "2017年"
        },
        {
          value: "2016",
          label: "2016年"
        },
        {
          value: "2015",
          label: "2015年"
        }
      ],
      value: "2018",
      tableTitles: {
        1: "调整预算审核"
      },
      tableTitle: "调整预算审核",
      isTable: 1,
      status: 1,
      isDialog: false,
      outerVisible2: false,
      outerVisible3: false,
      outerVisible4: false,
      outerVisible5: false,
      pdfFileID: null,
      pdfData: [
        {
          name: "实施方案一",
          id: "1",
          link: ""
        },
        {
          name: "实施方案一（1）",
          id: "1",
          link: ""
        },
        {
          name: "实施方案二",
          id: "1"
        },
        {
          name: "实施方案三",
          id: "1"
        },
        {
          name: "实施方案四",
          id: "1"
        },
        {
          name: "实施方案五",
          id: "1"
        },
        {
          name: "实施方案六",
          id: "1"
        }
      ],
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ]
    };
  },
  created() {},

  mounted() {
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    // 查看
    handleLook(row) {
      console.log(row);
      this.outerVisible3 = true;
    },
    // 编辑
    handleUpdate(row) {
      this.outerVisible4 = true;
    },
    // 流程切换
    clickItem(val) {
      this.isTable = val;
      // 标题名字
      this.tableTitle = this.tableTitles[val];
    },

    submit() {
      this.isDialog = true;
    },
    onOk() {
      // 提交
      this.isDialog = false;
    },
    // 预览pdf
    onPreviewfile(value) {
      console.log(value);
      this.outerVisible5 = true;
      this.pdfFileID = value;
    }
  }
};
</script>
<style lang="less" scoped>
@import "~@/assets/styles/mixin";
@import "./tmpl/auditing.less";

@lightBlue: #638fc5;
@mainblue: #6ca4e7;

// 弹窗
.diagContent {
  padding: 50px;
  line-height: 50px;
  p {
    font-size: 18px;
    color: #333333;
    span:nth-child(1) {
      display: inline-block;
      width: 60%;
    }
    span:nth-child(2) {
      width: 30%;
      display: inline-block;
      text-align: right;
      font-size: 12px;
    }
    em {
      font-style: normal;
      color: #599ef0;
      font-size: 32px;
    }
  }
}

</style>
