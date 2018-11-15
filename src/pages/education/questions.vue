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
          <el-button type="primary" @click="saveParameter('ruleForm')">确定</el-button>
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
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback();
      } else {
        var re = /^[+]{0,1}(\d+)$/;
    　　if (!re.test(value)) { 
    　　　　callback("必须为大于等于0的整数数字");
    　　}else{
            callback();
        } 
      }
    };
    return {
      centerDialogVisible:false,
      ruleForm: {
        count:'',
        single:'',
        multiple:'',
        judgment:'',
      },
      rules:{
        count: [
          { validator: validatePass,trigger: 'blur' },
        ],
        single: [
          { validator: validatePass, trigger: 'blur' },
        ],
        multiple: [
          { validator: validatePass, trigger: 'blur' },
        ],
        judgment: [
          { validator: validatePass, trigger: 'blur' },
        ],
      },
    }
  },
  methods:{
    getParameter(){
      API.getEducationAnswerParameter({}).then(res=> {
        if(res.code==200) {
          this.ruleForm=res.data;
        }else{
          this.$message.warning(res.msg);
        }
      })
    },
    submitParameter(){
      API.saveEducationAnswerParameter(this.ruleForm).then(res=> {
        if(res.code==200) {
          this.centerDialogVisible=false;
          this.$message.success(res.msg);
        }else{
          this.$message.warning(res.msg);
        }
      })
    },
    saveParameter(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm)
          let all=0;
          all+=this.ruleForm.single?parseInt(this.ruleForm.single):0;
          all+=this.ruleForm.multiple?parseInt(this.ruleForm.multiple):0;
          all+=this.ruleForm.judgment?parseInt(this.ruleForm.judgment):0;
          if(parseInt(this.ruleForm.count)==all){
            this.submitParameter();
          }else{
            this.$confirm('题目总数和各项数之和不等，是否将题目总数设置为 '+all+' ?', '确认信息', {
              distinguishCancelAndClose: true,
              cancelButtonText: '取消',
              confirmButtonText: '确定'
            })
            .then(() => {
              this.ruleForm.count=all;
              this.submitParameter();
            })
          }
        }
      });
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
</style>