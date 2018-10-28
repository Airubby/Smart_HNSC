<template>
    <div class="dialog-wrapper" v-show="centerDialogVisible">
        <div class="dialog-center">
            <slot name="title">
                <div class="dialog-title">
                <span>手工录入</span>
                <el-button type="text" icon="el-icon-close" class="closeBtn" @click="centerDialogVisible = false"></el-button>
                </div>
            </slot>
            <slot name="content">
               <div class="dialog-content">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <div class="title"><i class="line"></i>题目信息</div>
                        <div class="conbox">
                            <el-form-item label="题目类型" prop="type">
                                <el-select v-model="ruleForm.type" placeholder="请选择题目类型" size="small" style="width:100%">
                                    <el-option
                                    v-for="item in type_data"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="题目类别" prop="category">
                                <el-select v-model="ruleForm.category" placeholder="请选择题目类别" size="small" style="width:100%">
                                    <el-option
                                    v-for="item in type_data"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="题目类别" prop="result">
                                <el-checkbox-group v-model="ruleForm.result">
                                    <el-checkbox label="答案A" value="A"></el-checkbox>
                                    <el-checkbox label="答案B" value="B"></el-checkbox>
                                    <el-checkbox label="答案C" value="C"></el-checkbox>
                                    <el-checkbox label="答案D" value="D"></el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                            <el-form-item label="题目解析" prop="analysis">
                                <el-input v-model="ruleForm.analysis" placeholder="请输入主管处室" size="small"></el-input>
                            </el-form-item>
                            <el-form-item label="政策法规" prop="statute">
                                <el-input v-model="ruleForm.statute" placeholder="请输入政策法规" size="small"></el-input>
                            </el-form-item>
                        </div>
                        <div class="title"><i class="line"></i>题目详情</div>
                        <div class="conbox">
                            <el-form-item label="题目内容" prop="content">
                                <el-input v-model="ruleForm.content" type="textarea" placeholder="请输入题目内容" class="area" style="height:100px;"></el-input>
                            </el-form-item>
                            <el-form-item label="A" prop="A">
                                <el-input v-model="ruleForm.A" placeholder="请输入文字" size="small"></el-input>
                            </el-form-item>
                            <el-form-item label="B" prop="B">
                                <el-input v-model="ruleForm.B" placeholder="请输入文字" size="small"></el-input>
                            </el-form-item>
                            <el-form-item label="C" prop="C">
                                <el-input v-model="ruleForm.C" placeholder="请输入文字" size="small"></el-input>
                            </el-form-item>
                            <el-form-item label="D" prop="D">
                                <el-input v-model="ruleForm.D" placeholder="请输入文字" size="small"></el-input>
                            </el-form-item>
                        </div>
                    </el-form>
               </div>
            </slot>
            <slot name="footer">
                <div class="dialog-footer">
                    <el-button type="primary">继续添加</el-button>
                    <el-button type="primary">保存</el-button>
                </div>
            </slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'VReference',
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
                type: '',
                category:'',
                result:[],
                analysis:'',
                statute:'',
                content:'',
                A:'',
                B:'',
                C:'',
                D:'',
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
            .dialog-footer{
                
            }
        }
    } 
</style>