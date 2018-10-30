<template>
  <div class="dashboard-container">
      <div class="manageTop">
        <el-row :gutter="17" class="manageTopElrow">
          <el-col :span="8" class="manageTopElcol">
            <div class="manageTopBox eduReferenceBg">
              <svg-icon icon-class="diannao-copy-copy" class="manageTopimg"></svg-icon>
              <h2>EXCEL导入</h2>
            </div>
          </el-col>
          <el-col :span="8" class="manageTopElcol">
            <div class="manageTopBox eduAnswerBg" @click="questions_info=true">
              <svg-icon icon-class="suijidati1" class="manageTopimg"></svg-icon>
              <h2>随机答题</h2>
            </div>
          </el-col>
          <el-col :span="8" class="manageTopElcol">
            <div class="manageTopBox eduTemplateBg">
              <svg-icon icon-class="shitimobanxiazai1" class="manageTopimg"></svg-icon>
              <h2>试题模板下载</h2>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="manageBody">
        <div class="manageBodyTitle">题库管理</div>
        <div class="manageBodyCon">
          <div class="manageBodyConBtn">
            <el-button type="primary" size="mini" class="add" @click="add">添加</el-button>
            <!--
            <el-button type="primary" size="mini" class="edit" @click="eidt">修改</el-button>
            <el-button type="primary" size="small" class="delete" @click="remove">删除</el-button>
            -->
          </div>
          <el-search-table-pagination  type="local"
              class="manageBodyConTable"
              border :data="table_data" :columns="table_columns" ref="thisRef">   
              <el-table-column slot="prepend" type="selection"></el-table-column> 
              <el-table-column slot="prepend" type="index" label="序号" width="60px"></el-table-column>   
              <template slot-scope="scope" slot="preview-handle">
                  <div>
                      <a href="javascript:;" class="loncom_color" @click="edit (scope.row)">编辑</a> 
                      <em>|</em>
                      <a href="javascript:;" class="loncom_color" @click="remove (scope.row)">删除</a> 
                  </div>
              </template>
          </el-search-table-pagination>
        </div>
      </div>
      <!-- 手工录入 -->
      <v-reference :isDialog.sync="reference_info" :data="subject_id" v-if="reference_info"></v-reference>
      <!-- 随机答题 -->
      <v-questions :isDialog.sync="questions_info" v-if="questions_info"></v-questions>
  </div>
</template>
<script>
import VReference from "@/pages/education/reference";
import VQuestions from "@/pages/education/questions";
import * as API from '@/api/edu';

export default {
  name: "manage",
  components: {
    VReference,
    VQuestions
  },
  data() {
    return {
      reference_info:false,
      subject_id:'',
      questions_info:false,
      table_data:[
        {subject_id:'1',content:'xia'}
      ],
      table_columns:[
        { prop: 'content', label: '题目内容',minWidth:10},
        { prop: 'type', label: '问题类型',minWidth:10},
        { prop: 'label', label: '问题标签',minWidth:10},
        { prop: 'result', label: '正确答案',minWidth:10},
        { prop: 'errorRate', label: '错误率',minWidth:10},
        { prop: 'handle', label: '操作',width:90,slotName:'preview-handle'},
      ],
    };
  },
  created(){
  },
  watch: {
    
  },
  mounted(){
    
  },
  methods: {
    add(){
      this.subject_id="";
      this.reference_info=true;
      console.log(this.reference_info)
    },
    edit(row){
      console.log(row)
      this.subject_id=row.subject_id;
      this.reference_info=true;
    },
    remove(row){

    },
    
  }
};
</script>
<style lang="less" scoped>
@import "~@/assets/styles/mixin";
@import "~@/pages/education/tmpl/education";
</style>
