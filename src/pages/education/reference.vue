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
          <el-form :model="ruleForm" :rules="rules" ref="formInfo" label-width="100px" class="demo-ruleForm">
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
                  v-for="item in classify_data"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="正确答案" prop="corrects">
                <el-checkbox-group v-model="ruleForm.corrects">
                  <p><el-checkbox label="A" value="A" key="A">答案A</el-checkbox></p>
                  <p><el-checkbox label="B" value="B" key="B">答案B</el-checkbox></p>
                  <p v-if="ruleForm.type!='判断题'"><el-checkbox label="C" value="C" key="C">答案C</el-checkbox></p>
                  <p v-if="ruleForm.type!='判断题'"><el-checkbox label="D" value="D" key="D">答案D</el-checkbox></p>
                    
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="题目解析" prop="analyze">
                <el-input v-model="ruleForm.analyze" placeholder="请输入主管处室" size="small"></el-input>
              </el-form-item>
              <el-form-item label="政策法规" prop="legislation_name">
                <el-input v-model="ruleForm.legislation_name" placeholder="请输入政策法规" readonly size="small" @focus="getLegislation"></el-input>
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
              <div v-if="ruleForm.type!='判断题'">
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
        <div class="dialog-footer" v-if="!data">
          <el-button type="primary" @click="moreSave('formInfo')">继续添加</el-button>
          <el-button type="primary" @click="save('formInfo')">保存</el-button>
        </div>
        <div class="dialog-footer" v-if="data">
          <el-button type="primary" @click="save('formInfo')">确定</el-button>
          <el-button type="primary" @click="centerDialogVisible=false">取消</el-button>
        </div>
      </slot>
    </div>
    <!-- 随机答题 -->
    <v-legislation :isDialog.sync="e_info" :infoData="info_Data" v-if="e_info"></v-legislation>
  </div>
</template>
<script>
import * as API from '@/api/edu';
import VLegislation from "@/pages/education/legislationList";
export default {
    name: 'VReference',
    props:["isDialog","data"],
    components:{
      VLegislation
    },
    created () {
      this.centerDialogVisible=this.isDialog;
      this.ruleForm.id=this.data;
      console.log(this.data)
    },
    mounted() {
      this.educationClassify();
      this.legislationType();
    },
    data() {
      return {
        centerDialogVisible:false,
        type_data:[{id:'单选题',name:'单选题'},{id:'多选题',name:'多选题'},{id:'判断题',name:'判断题'}],
        // <p v-for="inItem in result_data"><el-checkbox :label="inItem.id" :value="inItem.id" :key="inItem.id">{{inItem.item}}</el-checkbox></p>   
        // result_data:[{id:'A',item:'答案A'},{id:'B',item:'答案B'},{id:'C',item:'答案C'},{id:'D',item:'答案D'}],
        classify_data:[],
        ruleForm: {
          id:'',
          type: '',
          classify:'',
          corrects:[],
          analyze:'',
          legislation_id:'',
          legislation_name:'',
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
        e_info:false,
        info_Data:[],
      }
    },
    methods:{
      //题目类别获取
      educationClassify(){
        API.educationClassify({}).then(res=> {
          console.log(res)
          if(res.code==200) {
            this.classify_data=res.data;
          }else{
            this.$message.warning(res.msg);
          }
        })
      },
      //政策法规获取
      legislationType(){
        API.legislationType({}).then(res=> {
          console.log(res)
          if(res.code==200) {

          }else{
            this.$message.warning(res.msg);
          }
        })
      },
      //新增编辑题库
      updateAdd(save){
        this.ruleForm.corrects=this.ruleForm.corrects.sort();
        console.log(this.ruleForm.corrects)
        API.updateEducationSubject(this.ruleForm).then(res=> {
          console.log(res)
          if(res.code==200) {
            this.$message.success(res.msg);
            if(save=="true"){
              this.centerDialogVisible=false;
              this.$parent.$refs['thisRef'].searchHandler(false);
            }else{
              this.$refs['formInfo'].resetFields();
            }
          }else{
            this.$message.warning(res.msg);
          }
        })
      },
      //获取题库详情
      getEducationSubject(){
        API.getEducationSubject({subject_id:this.data}).then(res=> {
          console.log(res)
          if(res.code==200) {
            this.ruleForm.type=res.data.type;
            this.ruleForm.classify=res.data.classify_Key;
            this.ruleForm.corrects=res.data.correctList;
            this.ruleForm.analyze=res.data.analyze;
            this.ruleForm.legislation_id=res.data.legislation&&res.data.legislation.id?res.data.legislation.id:"";
            this.ruleForm.legislation_name=res.data.legislation&&res.data.legislation.title?res.data.legislation.title:"";
            this.ruleForm.title=res.data.title;
            for(var i=0;i<res.data.answers.length;i++){
              if(res.data.answers[i].no=="A"){
                this.ruleForm.a=res.data.answers[i].answer;
              }else if(res.data.answers[i].no=="B"){
                this.ruleForm.b=res.data.answers[i].answer;
              }else if(res.data.answers[i].no=="C"){
                this.ruleForm.c=res.data.answers[i].answer;
              }else if(res.data.answers[i].no=="D"){
                this.ruleForm.d=res.data.answers[i].answer;
              }
            }
          }else{
            this.$message.warning(res.msg);
          }
        })
      },
      moreSave(formName){
        this.$refs[formName].validate((valid) => {
          if(valid){
            this.updateAdd();
          }
        })
        
      },
      save(formName){
        this.$refs[formName].validate((valid) => {
          if(valid){
            this.updateAdd("true");
          }
        })
        
      },
      getLegislation(){
        this.e_info=true;
      },
    },
    watch:{
      centerDialogVisible(value){
        this.$emit('update:isDialog', value)
        console.log(value)
      },
      'ruleForm.corrects':function(val){
        if(this.ruleForm.type!='多选题'&&val.length>1){
          this.ruleForm.corrects=[val[val.length-1]];
        }
      },
      'ruleForm.id':function(val){
        this.getEducationSubject();
      },
      info_Data:{
        handler:function(val){
          console.log(val)
          this.ruleForm.legislation_id=val[0].id;
          this.ruleForm.legislation_name=val[0].title;
        },
        deep: true
      }
    },
    
}
</script>
<style lang="less" scoped>
@import "~@/assets/styles/mixin";
@import "~@/assets/styles/dialogForm";
</style>