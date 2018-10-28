<template>
  <div class="dashboard-container">
    <!-- <div class="test mb10">
      <div class="dashboard-text">name:{{ name }}</div>
      <div class="dashboard-text">auth:{{ auth }}</div>
      <div class="dashboard-text">roles:<p v-for="role in roles" :key="role">{{ role }}</p></div>
    </div> -->

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
        <el-row type="flex" class="row-bg">
          <el-col :span="6" v-for="(item, index) in topData" :key="index">
            <div class="process-item"  @click="clickItem(item.id)">
              <div class="svgBox" v-if="item.id == '1'">
                <svg-icon v-if="item.status == 1" icon-class="yishangshenbaobiao_nor"></svg-icon>
                <svg-icon v-if="item.status == 2" icon-class="yishangshenbaobiao_stage"></svg-icon>
                <svg-icon v-if="item.status == 3" icon-class="yishangshenbaobiao_finished"></svg-icon>
              </div>
              <div v-if="item.id == '2'">
                <svg-icon v-if="item.status == 1" icon-class="yishangqianpibiao-wuneirong"></svg-icon>
                <svg-icon v-if="item.status == 2" icon-class="yishangqianpibiao-zancun"></svg-icon>
                <svg-icon v-if="item.status == 3" icon-class="yishangqianpibiao_finished"></svg-icon>
              </div>
              <div v-if="item.id == '3'">
                <svg-icon v-if="item.status == 1" icon-class="ershangshenbao-wuneirong"></svg-icon>
                <svg-icon v-if="item.status == 2" icon-class="ershangshenbaozancun"></svg-icon>
                <svg-icon v-if="item.status == 3" icon-class="ershangshenbao-wancheng"></svg-icon>
              </div>
              <div v-if="item.id == '4'">
                <svg-icon v-if="item.status == 1" icon-class="ershangqianpiwuneirong"></svg-icon>
                <svg-icon v-if="item.status == 2" icon-class="ershangqianpi--zancun"></svg-icon>
                <svg-icon v-if="item.status == 3" icon-class="ershangqianpi--yiwancheng"></svg-icon>
              </div>
              <div v-if="item.id == '5'">
                <svg-icon v-if="item.status == 1" icon-class="zhichengwenjian-wuneirong"></svg-icon>
                <svg-icon v-if="item.status == 2" icon-class="zhichengwenjian"></svg-icon>
                <svg-icon v-if="item.status == 3" icon-class="zhichengwenjian-yiwancheng"></svg-icon>
              </div>
              <p>{{ item.title }}</p>
            </div>
            <!-- 连接线 -->
            <svg-icon icon-class="lianjietubiao" class="linkline"></svg-icon>
          </el-col>
        </el-row>
      </div>
    </div>

    <!-- introduction -->
    <div class="middle-box mb10">
      <el-row :gutter="20">
        <el-col :span="14">
          <v-card :title="cardtitle" :content="cardContent"></v-card>
        </el-col>
        <el-col :span="10">
          <v-card :title="cardtitle2">
            <ul slot="content">
              <li v-for="(item, index) in historyList" :key="index" class="history-item">
                <span class="dot"></span><span class="historyName">{{ item.name }}</span>
                {{ item.content }}
                <span class="historyTime">{{ item.createDate }}</span>
              </li>
            </ul>
          </v-card>
        </el-col>
      </el-row>
    </div>

    <!-- table -->
    <div class="bottom-box">
      <div class="table-container" v-if="isTable == 1 || isTable == 3">
        <h3 class="title">{{ tableTitle|empty('一上申报表') }}</h3>
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

      <div class="table-container" v-if="isTable == 2 || isTable == 4">
        <h3 class="title">{{ tableTitle|empty('签批表') }}</h3>
        <el-button-group>
          <el-button type="text" @click="upload()">
            <i class="iconfont icon-daoru"></i>导入</el-button>
          <el-button type="text" @click="submit()">
            <i class="iconfont icon-tijiao"></i>提交</el-button>
          <el-button type="text" @click="downloadExcel()">
            <i class="iconfont icon-xiazai"></i>下载</el-button>
          <el-button type="text" @click="onPrint()">
            <i class="iconfont icon-dayin"></i>打印</el-button>
        </el-button-group>
        <div class="signlist">
          <div class="signlist-item">
            <h3 class="pdfTit">已通过2018年第0018次党组会审议</h3>
            <div class="clearfix">
              <span class="imgPdf fl" @click="onPreview()">
                <svg-icon icon-class="PDFtubiao"></svg-icon>
              </span>
              <div>
                <p class="pdfname"  @click="onPreview()">xxx.pdf</p>
                <el-button type="text" @click="upload()">上传</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="table-container" v-if="isTable == 5">
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
          <!-- <el-button type="text" @click="submit()">
            <i class="iconfont icon-daochu"></i>导出</el-button> -->
          <el-button type="text" @click="downloadExcel()">
            <i class="iconfont icon-xiazai"></i>下载</el-button>
          <el-button type="text" @click="onPrint()">
            <i class="iconfont icon-dayin"></i>打印</el-button>
        </el-button-group>
        <div class="signlist">
          <select-table :tableData="tableData5" :columns="columns5" @on-click-cell="onPreviewfile" @on-look="handleLook" @on-update="handleUpdate"></select-table>
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
    <!-- 登录答题 -->
    <v-answer :isDialog.sync="answer" v-if="answer"></v-answer>
  </div>
</template>
<script>
import CommonTable from "@/pages/common/table";
import SelectTable from "@/pages/apply/tmpl/selectTable";
import VCard from "@/pages/common/card";
import VDialog from "@/pages/common/dialog";
import VPreview from "@/pages/common/pdf/pdfPreview";
import MultiPreview from "@/pages/common/pdf/multipdfPreview";
import VUpload from "@/pages/common/upload/upload";
import VAnswer from "@/pages/education/answer";
import * as API from '@/api/apply/apply';
import * as eduAPI from '@/api/edu';

export default {
  name: "dashboard",
  components: {
    CommonTable,
    VCard,
    VDialog,
    VPreview,
    MultiPreview,
    VUpload,
    SelectTable,
    VAnswer
  },
  data() {
    return {
      answer:false,
      name: "Test",
      auth: "1",
      roles: [
        "二级单位操作人员",
        "二级单位审核人员",
        "局机关操作人员",
        "局机关分管员"
      ],
      columns: [
        {
          prop: "name",
          label: "项目名称",
          width: "120"
        },
        {
          prop: "budget",
          label: "项目预算总金额（万元）",
          width: "180"
        },
        {
          prop: "currBudget",
          label: '其中：2019年预算金额（万元）',
          width: "230"
        },
        {
          prop: "descr",
          label: "立项依据",
          width: "300"
        },
        {
          prop: "date",
          label: "项目完成时限",
          width: "150"
        },
        {
          prop: "type",
          label: "项目属性",
          // width: "100"
        },
        {
          prop: "status",
          label: "是否有实施方案",
          width: "120"
        },
        {
          prop: "uploadState",
          label: "绩效目标表",
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
      columns5: [
        {
          prop: "proName",
          label: "预算项目名称",
          width: "200"
        },

        {
          prop: "files",
          label: "支撑材料",
          // width: "300",
          // render: (row, column, $index) => {
          //   console.log('????????????????????')
          //   console.log(row)
          //   debugger
          //   var vm = this;
          //   let children = [];
          //   row.files &&
          //     row.files.forEach((file) => {
          //       children.push(nameLink(vm, h, file));
          //     });
          //   return h("div", children);
          // }
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
      cardtitle2: "历史操作记录",
      cardContent: '',
      historyList: [],
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
      value: new Date().getFullYear(),
      tmplData: {
        1: {
          title: '一上申报表',
          descr: `各处室与直属各单位按照年初预算申报工作要求，组织开展预算工作，预算申报分一上和二上两个环节。
一上时，各处室、直属单位进行年度预算初步核算后，按要求填报一上申报表并排序，完成后报分管局领导或单位负责人审批，审批通过后上报申报表。
二上时，各处室、直属单位对申报预算事项深入核算，填报二上申报表，完成后报分管局领导或单位负责人审批，审批通过后上报申报表，整理审批件和支撑材料并存档。`,
        },
        2: {
          title: '一上签批表',
          descr: '一上签批表222'
        },
        3: {
          title: '二上申报表',
          descr: '二上申报表33'
        },
        4: {
          title: '二上签批表',
          descr: '二上签批表44'
        },
        5: {
          title: '支撑材料依据',
          descr: '支撑材料依据55'
        }
        // 1: "一上申报表",
        // 2: "一上签批表",
        // 3: "二上申报表",
        // 4: "二上签批表",
        // 5: "支撑材料依据"
      },
      topData: [],
      tableTitle: "",
      isTable: 1,
      status: 2,
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
  watch: {
    value(nval, oval){
      if(nval !== oval){
        this.getStatusData();
        this.getHistoryList();
      }
    }
  },
  mounted(){
    this.getStatusData();
    this.getHistoryList();
    this.getEducationStatus();
    this.cardContent = this.tmplData[1].descr
    this.tableTitle = this.tmplData[1].title
  },
  methods: {
    getEducationStatus(){
      eduAPI.getEducationStatus({}).then(res=> {
        if(res.data) {
          this.answer=true;
        }
      })
    },
    getStatusData(){
      this.topData = []
      API.getCostApplyYearStatus({
        year: this.value
      }).then(res=> {
        if(res.data && res.data.length) {
          res.data.forEach(item => {
            this.topData.push({
              id: item.id,
              status: item.status,
              title: this.tmplData[item.id].title,
              // descr: this.descr[item.id].descr,
            })
          })
          console.log('topData----------')
          console.log(this.topData)
        }
      })
    },
    getHistoryList(){
      API.getCostApplyHistoryList({
        year: this.value,
        id: this.isTable
      }).then(res=> {
        if(res.data && res.data.length) {
          this.historyList = res.data
        }
      })
    },
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
      // 阶段说明
      this.cardContent = this.tmplData[val].descr;
      // 表格标题名字
      this.tableTitle = this.tmplData[val].title;
      // 历史记录
      this.getHistoryList();
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
@import "../../assets/styles/mixin";
@import "~@/pages/apply/tmpl/apply.less";
</style>
