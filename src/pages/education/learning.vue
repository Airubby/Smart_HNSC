<template>
  <div class="dashboard-container">
      <div class="manageTop">
        <el-row :gutter="17" class="manageTopElrow">
          <el-col :span="8" class="manageTopElcol">
            <div class="manageTopBox learningTopBox">
              <h2>题目类型</h2>
              <el-row class="elrow">
                <el-col :span="8">
                  <div class="learningCheck" :class="{'active':type.radio}" @click="type.radio=!type.radio">
                    单选题
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="learningCheck" :class="{'active':type.multiple}" @click="type.multiple=!type.multiple">
                    多选题
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="learningCheck" :class="{'active':type.decide}" @click="type.decide=!type.decide">
                    判断题
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="16" class="manageTopElcol">
            <div class="manageTopBox learningTopBox">
              <h2>题目类别</h2>
              <div class="classifyBtn">
                <el-checkbox-group v-model="classiFY" size="small">
                  <el-checkbox :label="item.key" :key="item.key" size="mini" border v-for="item in classify">{{item.value}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="manageBody">
        <div class="manageBodyTitle">题库学习</div>
        <div class="manageBodyCon" v-loading="loading">
          <ul class="learningUl">
            <li v-for="(item,index) in listData">
              <div class="title">{{(table_params.page_index-1)*table_params.page_size+1+index}}、{{item.title}}</div>
              <div class="check">
                <p v-for="inItem in item.answers">{{inItem.no}}、{{inItem.answer}}</p>
              </div>
              <div class="answer">
                答案解析：<em>{{item.corrects}}</em><span>{{item.analyze}}</span>
              </div>
            </li>
          </ul>
          <div class="learningPagination" v-if="listData.length>0">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="table_params.page_index"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="table_params.page_size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import * as API from '@/api/edu';

export default {
  name: "manage",
  components: {
  },
  data() {
    return {
      total:0,
      type:{
        radio:false,
        multiple:false,
        decide:false,
      },
      classify:[],
      classiFY:[],
      listData:[],
      table_params:{
        page_size:10,
        page_index:1,
      },
      loading:false,
      
    };
  },
  created(){
  },
  watch: {
    type:{
      handler:function(val){
        this.table_params.page_size=10;
        this.table_params.page_index=1;
        this.learningEducationSubject()
      },
      deep: true
    },
    classiFY:{
      handler:function(val){
        console.log(val)
        this.table_params.page_size=10;
        this.table_params.page_index=1;
        this.learningEducationSubject()
      },
      deep: true
    }
  },
  mounted(){
    this.educationClassify();
  },
  methods: {
    //题目类别获取
    educationClassify(){
      API.educationClassify({}).then(res=> {
        console.log(res)
        if(res.code==200) {
          this.classify=res.data;
        }else{
          this.$message.warning(res.msg);
        }
        this.learningEducationSubject();
      })
    },
    //列表
    learningEducationSubject(){
      this.loading=true;
      let params=this.table_params;
      params.classify=this.classiFY;
      let type=[]
      if(this.type.radio){
        type.push("单选题");
      }
      if(this.type.multiple){
        type.push("多选题");
      }
      if(this.type.decide){
        type.push("判断题");
      }
      params.type=type;
      console.log(params)
      API.learningEducationSubject(params).then(res=> {
        console.log(res)
        if(res.code==200) {
          this.listData=res.data;
          this.total=res.pagingInfo.recordCount;
        }else{
          this.$message.warning(res.msg);
        }
        this.loading=false;
      })
    },
    handleSizeChange(val) {
      this.table_params.page_size=val;
      this.learningEducationSubject();
    },
    handleCurrentChange(val) {
      this.table_params.page_index=val;
      this.learningEducationSubject();
    },
    change(index){
      console.log(this._classify[index]);
      if(this.classify[index].active==undefined||this.classify[index].active==false){
        this.classify[index].active=true;
      }
      console.log(this.classify)
    }
  }
};
</script>
<style lang="less" scoped>
@import "~@/assets/styles/mixin";
@import "~@/pages/education/tmpl/education";
.classifyBtn .active{
  color: #fff;
  background-color: #409EFF;
  border-color: #409EFF;
}
</style>
