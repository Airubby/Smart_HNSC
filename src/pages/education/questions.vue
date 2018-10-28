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
                            <el-form-item label="题目数量设置" prop="number">
                                <el-input v-model="ruleForm.number" type="number" size="small" style="width:100px;"></el-input>
                            </el-form-item>
                            <el-form-item label="单选" prop="radio">
                                <el-input v-model="ruleForm.radio" type="number" size="small" style="width:100px;"></el-input>
                            </el-form-item>
                            <el-form-item label="多选" prop="multiple">
                                <el-input v-model="ruleForm.multiple" type="number" size="small" style="width:100px;"></el-input>
                            </el-form-item>
                            <el-form-item label="判断" prop="decide">
                                <el-input v-model="ruleForm.decide" type="number" size="small" style="width:100px;"></el-input>
                            </el-form-item>
                        </div>
                    </el-form>
               </div>
            </slot>
            <slot name="footer">
                <div class="dialog-footer">
                    <el-button type="primary">确定</el-button>
                    <el-button type="primary">取消</el-button>
                </div>
            </slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'VQuestions',
    props:["isDialog","data"],
    components:{

    },
    created () {
       this.centerDialogVisible=this.isDialog;
    },
    mounted() {
        
    },
    data() {
        return {
            centerDialogVisible:false,
            type_data:[{id:'1',name:'单选'},{id:'2',name:'多选'},{id:'3',name:'判断'}],
            ruleForm: {
                number:'',
                radio:'',
                multiple:'',
                decide:'',
            },
            rules:{},
        }
    },
    methods:{
       
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