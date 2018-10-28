<template>
  <div class="dashboard-container">
      <div class="manageTop">
        <el-row :gutter="17" class="manageTopElrow">
          <el-col :span="8" class="manageTopElcol">
            <div class="manageTopBox learningTopBox">
              <h2>题目类型</h2>
              <el-row class="elrow">
                <el-col :span="8">
                  <div class="learningCheck" :class="{'active':radio}" @click="radio=!radio">
                    单选题
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="learningCheck" :class="{'active':multiple}" @click="multiple=!multiple">
                    多选题
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="learningCheck" :class="{'active':decide}" @click="decide=!decide">
                    判断题
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="16" class="manageTopElcol">
            <div class="manageTopBox learningTopBox">
              <h2>题目类别</h2>
              <div>
                <el-button type="primary" size="mini">所有<i class="el-icon-close el-icon--right"></i></el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="manageBody">
        <div class="manageBodyTitle">题库学习</div>
        <div class="manageBodyCon">
          <ul class="learningUl">
            <li>
              <div class="title">1.招标文件澄清或者修改的内容可能影响投标文件编制的，采购人或者采购代理机构应当在投标截止时间至少( )前，以书面形式通知所有获取招标文件的潜在投标人。</div>
              <div class="check">
                <p>A.答案A</p>
                <p>B.答案B</p>
                <p>C.答案C</p>
                <p>D.答案D</p>
              </div>
              <div class="answer">
                答案解析：<em>D</em><span>成都市财政局关于印发成都市政府采购项目档案管理办法的通知》（成财采〔2015〕169号)</span>
              </div>
            </li>
            <li>
              <div class="title">2.招标文件澄清或者修改的内容可能影响投标文件编制的，采购人或者采购代理机构应当在投标截止时间至少( )前，以书面形式通知所有获取招标文件的潜在投标人。</div>
              <div class="check">
                <p>A.答案A</p>
                <p>B.答案B</p>
                <p>C.答案C</p>
                <p>D.答案D</p>
              </div>
              <div class="answer">
                答案解析：<em>D</em><span>成都市财政局关于印发成都市政府采购项目档案管理办法的通知》（成财采〔2015〕169号)</span>
              </div>
            </li>
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
      currentPage:1,
      radio:true,
      multiple:false,
      decide:false,
      table_data:[
        
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
