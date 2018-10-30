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
                                <div>{{index+1}}、{{item.content}}</div>
                                <div class="list">
                                    <el-checkbox-group v-model="currentAnswer">
                                        <p v-for="inItem in item.list"><el-checkbox :label="inItem.id" :value="inItem.id" :key="inItem.id">{{inItem.item}}</el-checkbox></p>
                                    </el-checkbox-group>
                                </div>
                                <div class="answer" v-if="answerList[index]&&answerList[index].answer=='false'">
                                    答案解析：<em>{{item.answer}}</em><span>{{item.answerDetail}}</span>
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
            answerList:[],
            currentAnswer:[],
            finish:0,
            all:0,
            checkprogress:0,
            sureClose:false,
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
            API.submitExam({
                result:JSON.stringify(this.answerList)
            }).then(res=> {
                console.log(res)
                if(res.code==200) {
                    this.$message.sucess(res.msg);
                }else{
                    this.$message.warning(res.msg);
                }
            })
        },
        next(){
            //返回上一题...然后下一题的判断
            for(let i=0;i<this.answerList.length;i++){
                if(this.dataList[this.currentTitle+1]&&this.answerList[i].id==this.dataList[this.currentTitle+1].id){
                    this.currentAnswer=this.answerList[i].answerDetail;
                }
            }
            if(this.currentAnswer.length==0){
                if(this.finish+1==this.all){
                    this.$message.warning('请做完此题再提交');
                }else{
                    this.$message.warning('请做完此题再进行下一题');
                }
            }else{
                if(this.finish==this.all){
                    this.submitExam();
                    this.sureClose=true;
                    return;
                }
                let has=false;
                for(let i=0;i<this.answerList.length;i++){
                    if(this.answerList[i].id==this.dataList[this.currentTitle].id){
                        this.currentAnswer=this.answerList[i].answerDetail;
                        has=true;
                    }
                }
                if(JSON.stringify(this.currentAnswer)==JSON.stringify(this.dataList[this.currentTitle].answer)){
                    if(!has){
                        this.answerList.push({id:this.dataList[this.currentTitle].id,answer:'true',answerDetail:this.currentAnswer});
                    }
                    this.checkprogress+=1;
                    this.currentTitle+=1;
                    this.currentAnswer=[];
                }else{
                    if(!has){
                        this.answerList.push({id:this.dataList[this.currentTitle].id,answer:'false',answerDetail:this.currentAnswer})
                    }else{
                        this.checkprogress+=1;
                        this.currentTitle+=1;
                        this.currentAnswer=[];
                    }
                }
            }
            console.log(this.currentTitle)
            if(this.currentTitle+1==this.all){
                this.nextBtn="提交";
            }
        },
        back(){
            if(this.currentTitle!=0){
                this.currentTitle-=1;
                this.checkprogress-=1;
                for(let i=0;i<this.answerList.length;i++){
                    if(this.answerList[i].id==this.dataList[this.currentTitle].id){
                        this.currentAnswer=this.answerList[i].answerDetail;
                    }
                }
            }
            this.nextBtn="下一题";
        },
        close(){
            this.centerDialogVisible=false;
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
    .dialog-title{
        text-align:center;
    }
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
            .dialog-footer{
                
            }
        }
    } 
    .closeBtn {
        color:#fff;
    }
</style>