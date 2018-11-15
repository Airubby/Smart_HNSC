<template>
  <div class="dialog-wrapper" v-show="centerDialogVisible">
    <div class="dialog-center">
      <slot name="title">
        <div class="dialog-title answer-dialog">
          <el-button type="text" icon="el-icon-close" class="closeBtn" @click="close"></el-button>
          <div class="answerNumber">{{finish}}/{{dataList.length}}</div>
          <div style="height:6px;"><el-progress :show-text="false" :stroke-width="6" color="#FFED9A" :percentage="finish*100/all" v-if="finish!=0"></el-progress></div>
        </div>
      </slot>
      <slot name="content">
        <div class="dialog-content">
          <div v-for="(item,index) in dataList">
            <div v-if="index==currentTitle">
              <div class="title"><i class="line"></i>{{item.type}}</div>
              <div class="conbox">
                <div>{{index+1}}、{{item.title}}</div>
                  <div class="list">
                    <el-checkbox-group v-model="currentAnswer">
                      <p v-for="inItem in item.answers">
                      <el-checkbox :disabled="disabled" :class="{'acheck':correct && $tool.arrayContains(inItem.no,item.correctList)}" :label="inItem.no" :value="inItem.no" :key="inItem.no">{{inItem.answer}}</el-checkbox>
                      </p>
                    </el-checkbox-group>
                  </div>
                  <div class="answer" v-if="answerList[index]&&answerList[index].outcome==false">
                      答案解析：<em>{{item.corrects}}</em><span>{{item.analyze}}</span>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </slot>
      <slot name="footer">
        <div class="dialog-footer">
          <el-button type="primary" @click="next">{{nextBtn}}</el-button>
          <el-button type="primary" @click="back">{{backBtn}}</el-button>
          
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
  },
  mounted() {
    this.randomSubject();
  },
  data() {
    return {
      centerDialogVisible:false,
      nextBtn:"下一题",
      backBtn:"上一题",
      dataList:[],
      currentTitle:0,
      answerList:[], //答题记录
      currentAnswer:[], //当前答题
      finish:0, //完成
      all:0,  //所有
      checkprogress:0,  //进程
      sureClose:false,  
      correct:false,  //显示正确答案的不同颜色
      disabled:false,
    }
  },
  methods:{
    randomSubject(){
      API.randomSubject({}).then(res=> {
        console.log(res)
          
        if(res.code==200) {
          this.dataList=res.data;
          this.all=this.dataList.length;
          if(this.all==1){
            this.nextBtn="提交";
            this.backBtn="";
          }
        }else{
          this.$message.warning(res.msg);
        }
      })
    },
    submitExam(){
        
      API.submitExam(this.answerList).then(res=> {
        console.log(res)
        this.sureClose=true;
        if(res.code==200) {
          this.centerDialogVisible=false;
          this.$message.success(res.msg);
        }else{
          this.$message.warning(res.msg);
        }
      })
    },
    next(){
      //返回上一题...然后下一题的判断
      for(let i=0;i<this.answerList.length;i++){
        debugger
        if(this.answerList[i+1]&&this.dataList[this.currentTitle+1]&&this.answerList[i+1].subject_id==this.dataList[this.currentTitle+1].id){
          if(this.answerList[i+1].outcome){
            this.correct=false;
            this.currentAnswer=this.answerList[i+1].selected;
          }else{
            this.correct=true;
            this.currentAnswer=(this.dataList[this.currentTitle+1].correctList).concat(this.answerList[i+1].selected);
          }
          this.checkprogress+=1;
          this.currentTitle+=1;
          if(this.currentTitle+1==this.all){
            this.nextBtn="提交";
          }
          return;
        }else{
          this.disabled=false;
        }
      }
      if(this.currentAnswer.length==0){
        if(this.finish+1==this.all){
          this.$message.warning('请做完此题再提交');
        }else{
          this.$message.warning('请做完此题再进行下一题');
        }
      }else{
        let has=false; //是否是记录错题后再点击下一题
        if(this.answerList.length>0&&this.answerList[this.answerList.length-1].subject_id==this.dataList[this.currentTitle].id){
          has=true;
        }
        if(JSON.stringify(this.currentAnswer)==JSON.stringify(this.dataList[this.currentTitle].correctList)){ //答对
          if(!has){
            this.answerList.push({subject_id:this.dataList[this.currentTitle].id,outcome:true,selected:this.currentAnswer});
          }
          if(this.finish==this.all){
            this.submitExam();
            return;
          }else{
            this.checkprogress+=1;
            this.currentTitle+=1;
            this.currentAnswer=[];
          }
        }else{
          if(!has){
            this.answerList.push({subject_id:this.dataList[this.currentTitle].id,outcome:false,selected:this.currentAnswer});
            this.correct=true;
            this.disabled=true;
            this.currentAnswer=this.currentAnswer.concat(this.dataList[this.currentTitle].correctList);
          }else{
            if(this.finish==this.all){
              this.submitExam();
              return;
            }else{
              this.correct=false;
              this.disabled=false;
              this.checkprogress+=1;
              this.currentTitle+=1;
              this.currentAnswer=[];
            }
          }
        }
      }
      if(this.currentTitle+1==this.all){
        this.nextBtn="提交";
      }
    },
    back(){
      if(this.currentTitle!=0){
        this.currentTitle-=1;
        this.checkprogress-=1;
        this.finish-=1;
        this.disabled=true;
        for(let i=0;i<this.answerList.length;i++){
          if(this.answerList[i].subject_id==this.dataList[this.currentTitle].id){
            if(this.answerList[i].outcome){
              this.correct=false;
              this.currentAnswer=this.answerList[i].selected;
            }else{
              this.correct=true;
              this.currentAnswer=(this.dataList[this.currentTitle].correctList).concat(this.answerList[i].selected)
            }
          }
        }
      }
      this.nextBtn="下一题";
    },
    close(){
      //   this.centerDialogVisible=false;
      if(this.sureClose){
        this.centerDialogVisible=false;
      }else{  
        this.$message.warning('你还没答完题哦！');
      }
    },
  },
  watch:{
    centerDialogVisible(value){
      this.$emit('update:isDialog', value)
    },
    currentAnswer(value){
      console.log(value)
        
      if(value.length>0){
        if(!this.correct&&this.currentAnswer.length>1){
          if(this.dataList[this.currentTitle].type!="多选题"){
            this.currentAnswer=[value[value.length-1]];
          }
        }
        if(this.finish==this.checkprogress){
          this.finish+=1;
        }
      }else{
        if(this.finish!=this.checkprogress){
          this.finish-=1;
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
    .dialog-title{
      padding:94px 0 55px 0;
      .answerNumber{
        font-size: 18px;
        color: #fff;
        position: absolute;
        right: 20px;
        top: 65px;
      }
    }
    .dialog-center{
      width:944px;
      background:#fff url("~@/assets/images/answerTop.png") no-repeat;
      .dialog-content{
        padding: 0 34px;
        .conbox{
          line-height:30px;
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
  .closeBtn {
      color:#fff;
  }
</style>