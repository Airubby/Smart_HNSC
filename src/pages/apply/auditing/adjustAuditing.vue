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
              <p>调整预算申请汇总</p>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="process-item" @click="clickItem(2)">
              <svg-icon v-if="status == 1" icon-class="yishangshenbaobiao_nor"></svg-icon>
              <svg-icon v-if="status == 2" icon-class="yishangshenbaobiao_stage"></svg-icon>
              <svg-icon v-if="status == 3" icon-class="yishangshenbaobiao_finished"></svg-icon>
              <p>调整预算申请查看</p>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="process-item" @click="clickItem(3)">
              <svg-icon v-if="status == 1" icon-class="yishangshenbaobiao_nor"></svg-icon>
              <svg-icon v-if="status == 2" icon-class="yishangshenbaobiao_stage"></svg-icon>
              <svg-icon v-if="status == 3" icon-class="yishangshenbaobiao_finished"></svg-icon>
              <p>调整预算安排建议</p>
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
        <el-button-group>
          <el-button type="text" @click="downloadTemp()">
            <i class="iconfont icon-mobanxiazai1"></i>模板下载</el-button>
          <el-button type="text" @click="upload()">
            <i class="iconfont icon-daoru"></i>导入</el-button>
          <el-button type="text" @click="submit()">
            <i class="iconfont icon-tijiao"></i>提交</el-button>
          <el-button type="text" @click="reback()">
            <i class="iconfont icon-chehui"></i>撤回</el-button>
          <el-button type="text" @click="submit()">
            <i class="iconfont icon-daochu"></i>导出</el-button>
          <el-button type="text" @click="downloadExcel()">
            <i class="iconfont icon-xiazai"></i>下载</el-button>
          <el-button type="text" @click="onPrint()">
            <i class="iconfont icon-dayin"></i>打印</el-button>
        </el-button-group>
        <div>
          <p class="fontStyle">单位：万元</p>
          <common-table :tableData="tableData" :columns="columns" @on-look="handleLook" @on-update="handleUpdate"></common-table>
        </div>
      </div>

      <div class="table-container" v-if="isTable == 2">
        <h3 class="title">{{ tableTitle|empty('签批表') }}</h3>
        <el-button-group>
          <el-button type="text" @click="upload()">
            <i class="iconfont icon-mobanxiazai1"></i>申报选择</el-button>
          <el-button type="text" @click="upload()">
            <i class="iconfont icon-shangchuan"></i>上传</el-button>
          <el-button type="text" @click="submit()">
            <i class="iconfont icon-tijiao"></i>提交</el-button>
          <el-button type="text" @click="reback()">
            <i class="iconfont icon-chehui"></i>撤回</el-button>
        </el-button-group>
        <div class="signlist">
          <!-- <select-clickcell-table :tableData="tableData2" :columns="columns2"
            @on-clicktext="handleLook"
          >
          <span slot="handle"></span>
          </select-clickcell-table>-->
        </div>

        <div class="btnGroup">
          <el-select v-model="value1" multiple placeholder="请选择">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button type="primary" @click="reback()">退回</el-button>
          <el-button type="primary" @click="upload()">调整预算安排建议上传</el-button>
        </div>
      </div>

      <div class="table-container" v-if="isTable == 3">
        <h3 class="title">{{ tableTitle|empty('支撑材料') }}</h3>
        <el-button-group>
          <el-button type="text" @click="downloadTemp()">
            <i class="iconfont icon-mobanxiazai1"></i>模板下载</el-button>
          <el-button type="text" @click="upload()">
            <i class="iconfont icon-daoru"></i>导入</el-button>
          <el-button type="text" @click="submit()">
            <i class="iconfont icon-tijiao"></i>提交</el-button>
          <el-button type="text" @click="reback()">
            <i class="iconfont icon-chehui"></i>撤回</el-button>
          <el-button type="text" @click="downloadpdf()">
            <i class="iconfont icon-xiazai"></i>下载</el-button>
          <el-button type="text" @click="onPrint()">
            <i class="iconfont icon-dayin"></i>打印</el-button>
        </el-button-group>
        <div class="signlist">
          <select-table :tableData="tableData5" :columns="columns5" @on-click-cell="onPreviewfile">
            <template slot-scope="scope" slot="actions">
              <el-button @click="handleClick(scope.row)"  style="color: #ffffff;" type="warning" size="mini" round>详情</el-button>
              <el-button @click="handleUpdate(scope.row)" style="color: #ffffff;"  type="primary" size="mini" round>上传</el-button>
            </template>
          </select-table>
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
  CommonTable,
  SelectTable,
  VCard,
  VDialog,
  VPreview,
  MultiPreview,
  VUpload} from './tmpl/auditing.js'
// import SelectClickcellTable from "@/pages/apply/tmpl/selectClickcellTable";

// import CommonTable from "@/pages/common/table";
// import SelectTable from "@/pages/apply/tmpl/selectTable";
// import VCard from "@/pages/common/card";
// import VDialog from "@/pages/common/dialog";
// import VPreview from "@/pages/common/pdf/pdfPreview";
// import MultiPreview from "@/pages/common/pdf/multipdfPreview";
// import VUpload from "@/pages/common/upload/upload";
import * as API from '@/api/apply/apply';

export default {
  name: 'adjustAuditing',
  components: {
    CommonTable,
    VCard,
    VDialog,
    VPreview,
    MultiPreview,
    VUpload,
    SelectTable,
    // SelectClickcellTable
  },
  data() {
    return {
      columns: [
        {
          prop: 'date',
          label: '申报时间',
          width: '120'
        },
        {
          prop: "name",
          label: "申报命名",
        },
        {
          prop: "status",
          label: "状态",
          width: "120"
        }
      ],
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          budget: 500,
          description: "本次项目的立项依据是事实是谁事实上后",
          type: "专项类",
          status: "1",
          uploadState: "已上传"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          budget: 500,
          description: "本次项目的立项依据是事实是谁事实上后",
          type: "专项类",
          status: "1",
          uploadState: "未上传"
        }
      ],
      columns2: [
        {
          prop: 'date',
          label: '申报时间',
          width: '120'
        },
        {
          prop: "name",
          label: "申报命名"
        },
        {
          prop: "applyStatus",
          label: "申报表",
          cellclickable: true
        },
        {
          prop: "signStatus",
          label: "签批表",
          cellclickable: true
        },
        {
          prop: "fileStatus",
          label: "依据和支撑材料",
          cellclickable: true
        },
        {
          prop: "suggestStatus",
          label: "调整预算安排建议",
          cellclickable: true
        }
      ],
      tableData2: [
        {
          date: "2016-05-02",
          name: "王小虎",
          budget: 500,
          applyStatus: "已上传",
          fileStatus: "已上传",
          suggestStatus: "已上传",
          signStatus: "未上传"
        }
      ],
      columns5: [
        {
          prop: "proName",
          label: "预算项目名称",
          width: "200"
        },

        {
          prop: "files",
          label: "支撑材料"
        }
      ],
      tableData5: [
        {
          proName: '项目1',
          files: [
            {
              name: '材料1',
              id: 1 // link
            },
            {
              name: '材料2',
              id: 2 // link
            }
          ]
        },
        {
          proName: '项目2',
          files: [
            {
              name: '材料1',
              id: 3 // link
            },
            {
              name: '材料2',
              id: 4 // link
            }
          ]
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
        1: "调整预算申请汇总",
        2: "调整预算申请查看",
        3: "安排建议"
      },
      tableTitle: "调整预算申请汇总",
      value1: '',
      options1: [
        {
          value: "1",
          label: "单位1"
        },
        {
          value: "2",
          label: "单位2"
        },
        {
          value: "3",
          label: "单位3"
        },
        {
          value: "4",
          label: "单位4"
        }
      ],
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
      ],
      fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
    };
  },
  created(){
  },

  mounted(){

  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    // 查看
    handleLook(row){
      console.log(row)
      this.outerVisible3 = true
    },
    // 编辑
    handleUpdate(row){
      this.outerVisible4 = true
    },
    // 流程切换
    clickItem(val) {
      this.isTable = val;
      // 标题名字
      this.tableTitle = this.tableTitles[val];
    },
    // 下载
    downloadExcel() {},
    downloadpdf() {
      alert('下载')
    },
    downloadTemp() {},
    // 打印
    onPrint() {

    },
    // 导入
    upload() {
      this.outerVisible2 = true
    },
    submit() {
      this.isDialog = true;
    },
    onOk() {
      // 提交
      this.isDialog = false;
    },
    reback() {},
    // 预览pdf
    onPreview(){},
    onPreviewfile(value) {
      console.log(value)
      this.outerVisible5 = true
      this.pdfFileID = value
    }
  }
};
</script>
<style lang="less" scoped>
@import "~@/assets/styles/mixin";
@import "./tmpl/auditing.less";
</style>
