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
                            <el-form-item label="题目类别" prop="classify">
                                <el-select v-model="ruleForm.classify" placeholder="请选择题目类别" size="small" style="width:100%">
                                    <el-option
                                    v-for="item in type_data"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="正确答案" prop="corrects">
                                <el-checkbox-group v-model="ruleForm.corrects">
                                    <p><el-checkbox label="A" value="A" key="A">答案A</el-checkbox></p>
                                    <p><el-checkbox label="B" value="B" key="B">答案B</el-checkbox></p>
                                    <p v-if="ruleForm.type!='3'"><el-checkbox label="C" value="C" key="C">答案C</el-checkbox></p>
                                    <p v-if="ruleForm.type!='3'"><el-checkbox label="D" value="D" key="D">答案D</el-checkbox></p>
                                     
                                </el-checkbox-group>
                            </el-form-item>
                            <el-form-item label="题目解析" prop="analyze">
                                <el-input v-model="ruleForm.analyze" placeholder="请输入主管处室" size="small"></el-input>
                            </el-form-item>
                            <el-form-item label="政策法规" prop="legislation_id">
                                <el-input v-model="ruleForm.legislation_id" placeholder="请输入政策法规" size="small"></el-input>
                            </el-form-item>
                        </div>
                        <div class="title"><i class="line"></i>题目详情</div>
                        <div class="conbox">
                            <el-form-item label="题目内容" prop="title">
                                <el-input v-model="ruleForm.title" type="textarea" placeholder="请输入题目内容" class="area" style="height:100px;"></el-input>
                            </el-form-item>
                            <el-form-item label="A" prop="a">
                                <el-input v-model="ruleForm.a" placeholder="请输入文字" size="small"></el-input>
                            </el-form-item>
                            <el-form-item label="B" prop="b">
                                <el-input v-model="ruleForm.b" placeholder="请输入文字" size="small"></el-input>
                            </el-form-item>
                            <div v-if="ruleForm.type!='3'">
                            <el-form-item label="C" prop="c">
                                <el-input v-model="ruleForm.c" placeholder="请输入文字" size="small"></el-input>
                            </el-form-item>
                            <el-form-item label="D" prop="d">
                                <el-input v-model="ruleForm.d" placeholder="请输入文字" size="small"></el-input>
                            </el-form-item>
                            </div>
                        </div>
                    </el-form>
               </div>
            </slot>
            <slot name="footer">
                <div class="dialog-footer">
                    <el-button type="primary" @click="moreSave">继续添加</el-button>
                    <el-button type="primary" @click="save">保存</el-button>
                </div>
            </slot>
        </div>
    </div>
</template>
<script>
import * as API from '@/api/edu';
export default {
    name: 'VReference',
    props:["isDialog","data"],
    components:{

    },
    created () {
       this.centerDialogVisible=this.isDialog;
       this.ruleForm.subject_id=this.data;
       console.log(this.data)
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
                subject_id:'',
                type: '',
                classify:'',
                corrects:[],
                analyze:'',
                legislation_id:'',
                title:'',
                a:'',
                b:'',
                c:'',
                d:'',
            },
            rules:{
                type: [
                    { required: true, message: '请选择题目类型', trigger: 'change' },
                ],
                corrects: [
                    { required: true, message: '请选择题目答案', trigger: 'change' },
                ],
                title: [
                    { required: true, message: '请输入题目内容', trigger: 'blur' },
                ],
                a: [
                    { required: true, message: '请输入A答案内容', trigger: 'blur' },
                ],
                b: [
                    { required: true, message: '请输入B答案内容', trigger: 'blur' },
                ],
                c: [
                    { required: true, message: '请输入C答案内容', trigger: 'blur' },
                ],
                d: [
                    { required: true, message: '请输入D答案内容', trigger: 'blur' },
                ],

            },
        }
    },
    methods:{
       //新增编辑题库
        getExamCount(){
            API.getExamCount(this.ruleForm).then(res=> {
                console.log(res)
                if(res.code==200) {
                    this.$message.success(res.msg);
                }else{
                    this.$message.warning(res.msg);
                }
            })
        },
        //获取题库详情
        getEducationSubject(){
            API.getEducationSubject({subject_id:this.subject_id}).then(res=> {
                console.log(res)
                if(res.code==200) {
                    this.ruleForm=res.data;
                }else{
                    this.$message.warning(res.msg);
                }
            })
        },
        moreSave(){

        },
        save(){

        },
    },
    watch:{
        centerDialogVisible(value){
            this.$emit('update:isDialog', value)
            console.log(value)
        },
        'ruleForm.corrects':function(val){
            if(this.ruleForm.type!='2'&&val.length>1){
                this.ruleForm.corrects=[];
                this.ruleForm.corrects.push(val[val.length-1]);
            }
        },
        'ruleForm.subject_id':function(val){
            this.getEducationSubject();
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