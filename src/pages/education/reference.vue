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
                            <el-form-item label="正确答案" prop="result">
                                <el-checkbox-group v-model="ruleForm.result">
                                    <p><el-checkbox label="A" value="A" key="A">答案A</el-checkbox></p>
                                    <p><el-checkbox label="B" value="B" key="B">答案B</el-checkbox></p>
                                    <p v-if="ruleForm.type!='3'"><el-checkbox label="C" value="C" key="C">答案C</el-checkbox></p>
                                    <p v-if="ruleForm.type!='3'"><el-checkbox label="D" value="D" key="D">答案D</el-checkbox></p>
                                     
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
                            <div v-if="ruleForm.type!='3'">
                            <el-form-item label="C" prop="C">
                                <el-input v-model="ruleForm.C" placeholder="请输入文字" size="small"></el-input>
                            </el-form-item>
                            <el-form-item label="D" prop="D">
                                <el-input v-model="ruleForm.D" placeholder="请输入文字" size="small"></el-input>
                            </el-form-item>
                            </div>
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
            // <p v-for="inItem in result_data"><el-checkbox :label="inItem.id" :value="inItem.id" :key="inItem.id">{{inItem.item}}</el-checkbox></p>   
            // result_data:[{id:'A',item:'答案A'},{id:'B',item:'答案B'},{id:'C',item:'答案C'},{id:'D',item:'答案D'}],
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
            rules:{
                type: [
                    { required: true, message: '请选择题目类型', trigger: 'change' },
                ],
                result: [
                    { required: true, message: '请选择题目答案', trigger: 'change' },
                ],
                content: [
                    { required: true, message: '请输入题目内容', trigger: 'blur' },
                ],
                A: [
                    { required: true, message: '请输入A答案内容', trigger: 'blur' },
                ],
                B: [
                    { required: true, message: '请输入B答案内容', trigger: 'blur' },
                ],
                C: [
                    { required: true, message: '请输入C答案内容', trigger: 'blur' },
                ],
                D: [
                    { required: true, message: '请输入D答案内容', trigger: 'blur' },
                ],

            },
        }
    },
    methods:{
       
    },
    watch:{
        centerDialogVisible(value){
            this.$emit('update:isDialog', value)
        },
        'ruleForm.result':function(val){
            if(this.ruleForm.type!='2'&&val.length>1){
                this.ruleForm.result=[];
                this.ruleForm.result.push(val[val.length-1]);
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
            padding:30px;
        }
        .dialog-center{
            width:944px;
            .dialog-footer{
                
            }
        }
    } 
</style>