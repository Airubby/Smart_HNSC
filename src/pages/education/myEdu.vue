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
        <div class="manageBodyTitle">我的答题</div>
        <div class="manageBodyCon">
          <ul class="myEduUl">
            <li>1.招标文件澄清或者修改的内容可能影响投标文件编制的，采购人或者采购代理机构应当在投标截止时间至少( )前，以书面形式通知所有获取招标文件的潜在投标人。<span>99次</span></li>
            <li>1.招标文件澄清或者修改的内容可能影响投标文件编制的，采购人或者采购代理机构应当在投标截止时间至少( )前，以书面形式通知所有获取招标文件的潜在投标人。<span>99次</span></li>
            <li>1.招标文件澄清或者修改的内容可能影响投标文件编制的，采购人或者采购代理机构应当在投标截止时间至少( )前，以书面形式通知所有获取招标文件的潜在投标人。<span>99次</span></li>
            <li>1.招标文件澄清或者修改的内容可能影响投标文件编制的，采购人或者采购代理机构应当在投标截止时间至少( )前，以书面形式通知所有获取招标文件的潜在投标人。<span>99次</span></li>
          </ul>
          <div class="learningPagination">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="2">
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
      numberData:{
        "count": 0,
        "amount": 0,
        "accuracy": "100%"
      },
      listData:[],
      currentPage:1,
      table_data:[
        {content:'xia'}
      ],
      table_columns:[
        { prop: 'content', label: '题目内容',minWidth:10},
        { prop: 'type', label: '问题类型',minWidth:10},
        { prop: 'label', label: '问题标签',minWidth:10},
        { prop: 'result', label: '正确答案',minWidth:10},
        { prop: 'errorRate', label: '错误率',minWidth:10},
      ],
    };
  },
  created(){
  },
  watch: {
    
  },
  mounted(){
    this.getExamNumber();
    this.getMyEduTitle();
  },
  methods: {
    //答题次数
    getExamNumber(){
      API.getExamNumber({}).then(res=> {
        console.log(res)
        if(res.code==200) {
          this.numberData=res.data;
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
          this.numberData=res.data;
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
          this.numberData=res.data;
        }else{
          this.$message.warning(res.msg);
        }
      })
    },
    getMyEduTitle(){
      API.getMyEduTitle({}).then(res=> {
        console.log(res)
        if(res.code==200) {
          this.listData=res.data;
        }else{
          this.$message.warning(res.msg);
        }
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>
<style lang="less" scoped>
@import "~@/assets/styles/mixin";
@import "~@/pages/education/tmpl/education";
</style>
