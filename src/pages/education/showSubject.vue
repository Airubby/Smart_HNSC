<template>
  <div class="dialog-wrapper" v-show="centerDialogVisible">
    <div class="dialog-center">
      <slot name="title">
        <div class="dialog-title">
          <span>错题查看</span>
          <el-button type="text" icon="el-icon-close" class="closeBtn" @click="close"></el-button>
        </div>
      </slot>
      <slot name="content">
        <div class="dialog-content">
          <div class="title"><i class="line"></i>{{dataObj.type}}</div>
            <div class="conbox">
              <div>{{index}}、{{dataObj.title}}</div>
              <div class="list">
                <el-checkbox-group v-model="currentAnswer">
                  <p v-for="inItem in dataObj.answers">
                  <el-checkbox :disabled="disabled" :class="{'acheck':correct && $tool.arrayContains(inItem.no,dataObj.correctList)}" :label="inItem.no" :value="inItem.no" :key="inItem.no">{{inItem.answer}}</el-checkbox>
                  </p>
                </el-checkbox-group>
              </div>
              <div class="answer" v-if="answerList[0]&&answerList[0].outcome==false">
                答案解析：<em>{{dataObj.corrects}}</em><span>{{dataObj.analyze}}</span>
              </div>
            </div>
        </div>
      </slot>
      <slot name="footer">
        <div class="dialog-footer">
          <el-button type="primary" @click="save">确定</el-button>
          <el-button type="primary" @click="close">关闭</el-button>
        </div>
      </slot>
    </div>
  </div>
</template>
<script>
import * as API from '@/api/edu';
import VShow from "@/pages/education/showSubject";
export default {
  name: 'VQuestions',
  props:["isDialog","data","index"],
  components:{
    VShow
  },
  created () {
    this.centerDialogVisible=this.isDialog;
    console.log(this.data)
  },
  mounted() {
    this.getEducationSubject();
  },
  data() {
    return {
      centerDialogVisible:false,
      correct:false,
      disabled:false,
      dataObj:{},
      answerList:[], //答题记录
      currentAnswer:[], 
    }
  },
  methods:{
    //获取题库详情
    getEducationSubject(){
      API.getEducationSubject({subject_id:this.data}).then(res=> {
        console.log(res)
        if(res.code==200) {
          this.dataObj=res.data;
        }else{
          this.$message.warning(res.msg);
        }
      })
    },
    //保存
    submitExam(){
      if(this.answerList.length==0){
        if(JSON.stringify(this.currentAnswer)==JSON.stringify(this.dataObj.correctList)){ //答对
          this.answerList.push({subject_id:this.dataObj.id,outcome:true,selected:this.currentAnswer});
        }else{
          this.answerList.push({subject_id:this.dataObj.id,outcome:false,selected:this.currentAnswer});
        }
      }
      API.submitExam(this.answerList).then(res=> {
        this.sureClose=true;
        if(res.code==200) {
          this.centerDialogVisible=false;
          this.$message.success(res.msg);
        }else{
          this.$message.warning(res.msg);
        }
      })
    },
    save(){
      this.correct=true;
      this.disabled=true;
      this.currentAnswer=this.dataObj.correctList;
      // if(this.answerList.length==0){
      //   if(JSON.stringify(this.currentAnswer)==JSON.stringify(this.dataObj.correctList)){ //答对
      //     this.answerList.push({subject_id:this.dataObj.id,outcome:true,selected:this.currentAnswer});
      //     this.submitExam();
      //   }else{
      //     this.answerList.push({subject_id:this.dataObj.id,outcome:false,selected:this.currentAnswer});
      //     this.correct=false;
      //     this.disabled=false;
      //   }
      // }
    },
    close(){
      this.centerDialogVisible=false;
    },
  },
  watch:{
    centerDialogVisible(value){
      this.$emit('update:isDialog', value)
    },
    currentAnswer(value){
      if(!this.correct&&this.currentAnswer.length>1){
        if(this.dataObj.type!="多选题"){
          this.currentAnswer=[value[value.length-1]];
        }
      }
    },
  },
    
}
</script>
<style lang="less" scoped>
@import "~@/assets/styles/mixin";
@import "~@/assets/styles/dialogForm";
  .dialog-wrapper{
    .dialog-center{
      .dialog-content{
        .conbox{
          .list{
            margin:10px 0;
          }
          .answer{
            em{
              font-style:normal;
              margin-right:10px;
            }
          }
        }
      }
    }
  } 
</style>