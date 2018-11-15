<template>
  <div class="dialog-wrapper" v-show="centerDialogVisible">
    <div class="dialog-center">
      <slot name="title">
        <div class="dialog-title">
        <span>政策法规</span>
        <el-button type="text" icon="el-icon-close" class="closeBtn" @click="centerDialogVisible = false"></el-button>
        </div>
      </slot>
      <slot name="content">
        <div class="dialog-content">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-search-table-pagination  
              :url="$uploadPath+'/api/Education/SearchLegislation'"
              class="manageBodyConTable"
              :headers="headers"
              :page-sizes="[10,20,50,100]"
              list-field="data"
              total-field="pagingInfo.recordCount" 
              page-index-key="page_index"
              page-size-key="page_size"
              @selection-change="handleSelectionChange"
              :formOptions="table_forms"
              border :data="table_data" :columns="table_columns" ref="thisRef">   
              <el-table-column slot="prepend" type="selection"></el-table-column> 
              <el-table-column slot="prepend" type="index" label="序号" width="50px" ></el-table-column>  
              <template slot-scope="scope" slot="preview-classify">
                <div v-if="scope.row.classify&&scope.row.classify.value">
                  {{scope.row.classify.value}}
                </div>
              </template>
            </el-search-table-pagination>
          </el-form>
        </div>
      </slot>
      <slot name="footer">
        <div class="dialog-footer">
          <el-button type="primary" @click="save">确定</el-button>
          <el-button type="primary" @click="centerDialogVisible=false">取消</el-button>
        </div>
      </slot>
    </div>
  </div>
</template>
<script>
import * as API from '@/api/edu';
export default {
  name: 'VQuestions',
  props:["isDialog","data"],
  components:{

  },
  created () {
    this.centerDialogVisible=this.isDialog;
    var _token = localStorage.getItem("token");
    if (_token) {
      headers["token"] = _token;
    }
  },
  mounted() {
    
  },
  data() {
    return {
      centerDialogVisible:false,
      headers:{"token":'88888888'},
      ruleForm: {},
      rules:{},
      table_data:[
      ],
      table_forms: {
        inline: true,
        size:'small',
        submitBtnText: '搜索',
        forms: [
          { prop: 'search_text', placeholder:'关键字' },
        ]
      },
      table_columns:[
        { prop: 'title', label: '政策法规名称',minWidth:20},
        { prop: 'content', label: '政策法规内容',minWidth:40},
        { prop: 'classify', label: '主题类别',minWidth:10,slotName:'preview-classify'},
      ],
      table_params:{
        page_size:10,
        page_index:1,
      },
      multipleSelection:[],
    }
  },
  methods:{
    handleSelectionChange(val){
      this.multipleSelection=[];
      if(val.length>1){
        this.$message.warning("请选择一条信息");
        return;
      }
      this.multipleSelection=val;
    },
    save(){
      if(this.multipleSelection.length!=1){
        this.$message.warning("请选择一条信息");
      }else{
        this.centerDialogVisible=false;
        this.$parent.info_Data=this.multipleSelection;
      }
    },
  },
  watch:{
    centerDialogVisible(value){
      this.$emit('update:isDialog', value)
    },
  },
    
}
</script>
<style lang="less" scoped>
@import "~@/assets/styles/mixin";
@import "~@/assets/styles/dialogForm";
</style>