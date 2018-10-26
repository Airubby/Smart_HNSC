<template>
  <div class="navWrapper">
    <el-row type="flex" class="row-bg" justify="space-around">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <template v-for="item in navList">
            <el-menu-item :index="item.value" :key="item.value">
              <!-- {{item.title}} -->
              <router-link :to="'/'+ item.path">{{item.title}}</router-link>
            </el-menu-item>
          </template>

      </el-menu>
    </el-row>
  </div>
</template>
<script>
export default {
  data(){
    return {
      activeIndex: '1',
      navList: [
        {
          title: '系统管理',
          value: '1',
          path: 'system'
        },
        {
          title: '通知公告',
          value: '2',
          path: 'notice'
        },
        {
          title: '政策法规',
          value: '3',
          path: 'rules'
        },
        {
          title: '预算申报管理',
          value: '4',
          path: 'apply'
        },
        {
          title: '预算执行管理',
          value: '5',
          path: 'excute'
        },
        {
          title: '采购管理',
          value: '6',
          path: 'purchase'
        },
        {
          title: '合同管理',
          value: '7',
          path: 'contract'
        },
        {
          title: '一项一档管理',
          value: '8',
          path: 'profile'
        },
        {
          title: '教育培训',
          value: '9',
          path: 'edu'
        },
        {
          title: '统计分析',
          value: '10',
          path: 'analysis'
        }
      ]
    }
  },
  methods: {
    handleSelect(index){
      console.log(index)
      this.$emit('on-select', index)
    }
  }
}
</script>
<style lang="less" scoped>
@import "../../../assets/styles/mixin.less";
.navWrapper {
  .wh(100%, 50px);
  padding: 4px 0;
  // position: relative;
  background: #ffffff;
  .box-shadow(0px 2px 3px 0px rgba(0,0,0,0.11));
}
</style>
