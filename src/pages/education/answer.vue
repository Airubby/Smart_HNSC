<template>
    <div class="dialog-wrapper" v-show="centerDialogVisible">
        <div class="dialog-center">
            <slot name="title">
                <div class="dialog-title">
                <span></span>
                <el-button type="text" icon="el-icon-close" class="closeBtn" @click="centerDialogVisible = false"></el-button>
                </div>
            </slot>
            <slot name="content">
                <div class="dialog-content">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <div>
                            <div class="title"><i class="line"></i>单选题</div>
                            <div class="conbox">
                                
                            </div>
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
       getLoginTitle(){
        API.getLoginTitle({}).then(res=> {
            if(res.data) {
            this.answer=true;
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