<template>
  <!-- pagination -->
  <div class="pagination-container">
    <el-pagination background @current-change="dealChange" :current-page.sync="currPage" layout="prev, pager, next, total"
      :page-size="10" :total="total">
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: 'pagination',
  props: ['total', 'page'],
  data () {
    return {
      currPage: this.page
    }
  },
  methods: {
    // 父子组件的双向数据绑定,所以在子组件是不允许修改父组件的属性的，控制台会报如下错误:
    // [Vue warn]: Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders.
    // Instead, use a data or computed property based on the prop's value. Prop being mutated: "page"
    // 解决办法
    // 在子组件data中定义一个父组件传递过来的副本,再把该副本利用this.$emit("","")给传回去，父组件利用自定义事件接受该值
    dealChange () {
      this.$emit('change', this.currPage)
    }
  }
}
</script>
