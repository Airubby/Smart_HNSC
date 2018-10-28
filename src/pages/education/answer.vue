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
                    <el-button type="primary" @click="back">上一题</el-button>
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
        this.getLoginTitle();
    },
    data() {
        return {
            centerDialogVisible:false,
            nextBtn:"下一题",
            dataList:[],
            currentTitle:0,
            answerList:[],
            currentAnswer:[],
            finish:0,
            all:0,
            checkprogress:0
        }
    },
    methods:{
        getLoginTitle(){
            API.getLoginTitle({}).then(res=> {
                console.log(res)
                if(res.data) {
                    this.dataList=res.data;
                    this.all=this.dataList.length;
                }
            })
        },
        next(){
            if(this.currentAnswer.length==0){
                this.$message.warning('请做完此题再进行下一题');
            }else{
                this.checkprogress+=1;
                this.currentTitle+=1;
                this.currentAnswer=[];
            }
        },
        back(){
            this.currentTitle-=1;
        },
        close(){
            if(this.finish!=this.all){
                this.$message.warning('你还没答完题哦！');
            }else{  
                this.centerDialogVisible=false;
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
        }
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