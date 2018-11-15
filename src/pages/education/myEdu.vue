<template>
  <div class="dashboard-container">
    <div class="manageTop">
      <el-row :gutter="17" class="manageTopElrow">
        <el-col :span="8" class="manageTopElcol">
          <div class="manageTopBox eduReferenceBg">
            <p class="number">{{numberData.count}}</p>
            <p>已答题次数</p>
          </div>
        </el-col>
        <el-col :span="8" class="manageTopElcol">
          <div class="manageTopBox eduAnswerBg">
            <p class="number">{{numberData.amount}}</p>
            <p>已答题数量</p>
          </div>
        </el-col>
        <el-col :span="8" class="manageTopElcol">
          <div class="manageTopBox eduTemplateBg">
            <p class="number numberColor">{{numberData.accuracy}}</p>
            <p>正确率</p>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="manageBody">
      <div class="manageBodyTitle">错题查看</div>
      <div class="manageBodyCon" v-loading="loading">
        <ul class="myEduUl">
          <template v-for="(item,index) in listData">
          <li @click="show(item,index)">{{(table_params.page_index-1)*table_params.page_size+1+index}}、{{item.subject.title}}<span>{{item.wrong_Count}}次</span></li>
          </template>
        </ul>
        <div class="learningPagination">
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
    <!-- 错题答题 -->
    <v-show :isDialog.sync="show_info" :data="subject_id" :index="index" v-if="show_info"></v-show>
  </div>
</template>
<script>
import * as API from '@/api/edu';
import VShow from "@/pages/education/showSubject";
export default {
  name: "manage",
  components: {
    VShow
  },
  data() {
    return {
      loading:false,
      total:0,
      numberData:{
        "count": 0,
        "amount": 0,
        "accuracy": "100%"
      },
      listData:[],
      table_params:{
        page_size:10,
        page_index:1,
      },
      show_info:false,
      subject_id:'',
      index:'',
    };
  },
  created(){
  },
  watch: {
    
  },
  mounted(){
    this.getExamNumber();
    this.getExamCount();
    this.getExamRightRate();
    this.searchWrongExam();
  },
  methods: {
    //答题次数
    getExamNumber(){
      API.getExamNumber({}).then(res=> {
        console.log(res)
        if(res.code==200) {
          this.numberData.count=res.data;
        }else{
          this.$message.warning(res.msg);
        }
      })
    },
    //答题数量
    getExamCount(){
      API.getExamCount({}).then(res=> {
        console.log(res)
        if(res.code==200) {
          this.numberData.amount=res.data;
        }else{
          this.$message.warning(res.msg);
        }
      })
    },
    //答题正确率
    getExamRightRate(){
      API.getExamRightRate({}).then(res=> {
        console.log(res)
        if(res.code==200) {
          this.numberData.accuracy=res.data;
        }else{
          this.$message.warning(res.msg);
        }
      })
    },
    //列表
    searchWrongExam(){
      this.loading=true;
      API.searchWrongExam(this.table_params).then(res=> {
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
      this.searchWrongExam();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.table_params.page_index=val;
      this.searchWrongExam();
      console.log(`当前页: ${val}`);
    },
    show(item,index){
      console.log(item)
      this.show_info=true;
      this.subject_id=item.subject_ID;
      this.index=(this.table_params.page_index-1)*this.table_params.page_size+1+index;
    },
  }
};
</script>
<style lang="less" scoped>
@import "~@/assets/styles/mixin";
@import "~@/pages/education/tmpl/education";
</style>
