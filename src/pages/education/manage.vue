<template>
  <div class="dashboard-container" v-loading="loading">
      <div class="manageTop">
        <el-row :gutter="17" class="manageTopElrow">
          <el-col :span="8" class="manageTopElcol">
            <div class="manageTopBox eduReferenceBg">
              <el-upload
              ref="upload"
              :limit="1"
              :headers="config"
              :action="$uploadPath+'/api/Education/ImportEducationSubject'"
              :on-success="onSuccess"
              :before-upload="beforeUpload"
              :on-error="onError"
              :on-change="onchange"
              :show-file-list="false"
              :file-list="fileList"
              :auto-upload="false">
              <svg-icon icon-class="diannao-copy-copy" class="manageTopimg"></svg-icon>
              <h2>EXCEL导入</h2>
              </el-upload>
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
            <el-button type="primary" size="small" class="delete" @click="remove">删除</el-button>
          </div>
          <el-search-table-pagination  
            :url="$uploadPath+'/api/Education/SearchEducationSubject'"
            class="manageBodyConTable"
            :headers="headers"
            :page-sizes="[10,20,50,100]"
            list-field="data"
            total-field="pagingInfo.recordCount" 
            page-index-key="page_index"
            page-size-key="page_size"
            @selection-change="handleSelectionChange"
            border :data="table_data" :columns="table_columns" ref="thisRef">   
            <el-table-column slot="prepend" type="selection"></el-table-column> 
            <el-table-column slot="prepend" type="index" label="序号" width="50px" ></el-table-column>  
            <template slot-scope="scope" slot="preview-classify">
              <div v-if="scope.row.classify&&scope.row.classify.value">
                {{scope.row.classify.value}}
              </div>
            </template>
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
  created(){
    var _token = localStorage.getItem("token");
    if (_token) {
      headers["token"] = _token;
    }
  },
  data() {
    return {
      loading:false,
      reference_info:false,
      subject_id:'',
      questions_info:false,
      headers:{"token":'88888888'},
      table_data:[
      ],
      table_columns:[
        { prop: 'title', label: '题目内容',minWidth:70},
        { prop: 'type', label: '问题类型',minWidth:10},
        { prop: 'classify', label: '问题类别',minWidth:10,slotName:'preview-classify'},
        { prop: 'corrects', label: '正确答案',minWidth:10},
        { prop: 'handle', label: '操作',width:90,slotName:'preview-handle'},
      ],
      table_params:{
        page_size:10,
        page_index:1,
      },
      fileList:[],
      config:{
          headers:{
            'Content-Type': 'multipart/form-data',
          },
          "token":'88888888'
      },
      multipleSelection:[],

    };
  },
  watch: {
    
  },
  mounted(){
    
  },
  methods: {
    handleSelectionChange(val){
      this.multipleSelection=[];
      for(var i=0;i<val.length;i++){
        this.multipleSelection.push(val[i].id)
      }
    },
    add(){
      this.subject_id="";
      this.reference_info=true;
      console.log(this.reference_info)
    },
    edit(row){
      console.log(row)
      this.subject_id=row.id;
      this.reference_info=true;
      console.log(this.subject_id)
    },
    remove(row){
      var ids=[];
      if(row!=undefined&&row.id!=undefined){
        ids.push(row.id)
      }else{
        if(this.multipleSelection.length>0){
          ids=this.multipleSelection;
        }else{
          this.$message.warning("请勾选需要删除的项");
          return;
        }
      }
      this.$confirm("确定删除?", '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type:'warning',
        }).then(() => {
        API.delEducationSubject(ids).then(res=> {
            if(res.code==200) {
              this.$message.success(res.msg);
              this.$refs['thisRef'].searchHandler(false);
            }else{
              this.$message.warning(res.msg);
            }
        })
      });
    },
    onSuccess(res, file, fileList){
      this.fileList=[];
      this.loading=false;
      if(res.code==200){
        this.$message.success(res.msg);
        this.$refs['thisRef'].searchHandler(false);
      }else{
        this.$message.warning(res.msg);
      }
    },
    onError(err, file, fileList){
      this.fileList=[];
      this.$message.warning(err);
      this.loading=false;
    },
    onchange(file,fileList){
      var fileArry=file.name.split(".");
      var fileType=fileArry[fileArry.length-1];
      if(fileType=="xlsx"||fileType=="xls"||fileType=="XLSX"||fileType=="XLS"){
        this.$refs.upload.submit();
      }else{
        this.$message.error("文件格式只能为xls或xlsx");
      }
    },
    beforeUpload(file,fileList){
      this.loading=true;
    }
    
  }
};
</script>
<style lang="less" scoped>
@import "~@/assets/styles/mixin";
@import "~@/pages/education/tmpl/education";
</style>
