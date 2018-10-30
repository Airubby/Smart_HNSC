<template>
    <div class="dialog-wrapper" v-show="centerDialogVisible">
        <div class="dialog-center">
            <slot name="title">
                <div class="dialog-title">
                <span>随机答题</span>
                <el-button type="text" icon="el-icon-close" class="closeBtn" @click="centerDialogVisible = false"></el-button>
                </div>
            </slot>
            <slot name="content">
               <div class="dialog-content">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <div class="title"><i class="line"></i>随机答题<span>(建议不超过30题)</span></div>
                        <div class="conbox">
                            <el-form-item label="题目数量设置" prop="count">
                                <el-input v-model="ruleForm.count" type="number" size="small" style="width:100px;"></el-input>
                            </el-form-item>
                            <el-form-item label="单选" prop="single">
                                <el-input v-model="ruleForm.single" type="number" size="small" style="width:100px;"></el-input>
                            </el-form-item>
                            <el-form-item label="多选" prop="multiple">
                                <el-input v-model="ruleForm.multiple" type="number" size="small" style="width:100px;"></el-input>
                            </el-form-item>
                            <el-form-item label="判断" prop="judgment">
                                <el-input v-model="ruleForm.judgment" type="number" size="small" style="width:100px;"></el-input>
                            </el-form-item>
                        </div>
                    </el-form>
               </div>
            </slot>
            <slot name="footer">
                <div class="dialog-footer">
                    <el-button type="primary" @click="saveParameter">确定</el-button>
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
    },
    mounted() {
        this.getParameter();
    },
    data() {
        return {
            centerDialogVisible:false,
            ruleForm: {
                count:'',
                single:'',
                multiple:'',
                judgment:'',
            },
            rules:{},
        }
    },
    methods:{
       getParameter:function(){
            API.getEducationAnswerParameter({}).then(res=> {
                if(res.code==200) {
                    this.ruleForm=res.data;
                }else{
                    this.$message.warning(res.msg);
                }
            })
        },
        saveParameter:function(){
            this.centerDialogVisible=false;
            API.saveEducationAnswerParameter(this.ruleForm).then(res=> {
                if(res.code==200) {
                    this.$message.success(res.msg);
                }else{
                    this.$message.warning(res.msg);
                }
            })
        },
    },
    watch:{
        centerDialogVisible(value){
            this.$emit('update:isDialog', value)
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
            padding:30px;
        }
        .dialog-center{
            width:944px;
            .dialog-content{
                padding: 0 34px;
            }
            .dialog-footer{
                
            }
        }
    } 
</style>