<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column
        type="index"
        label="序号" width="50"></el-table-column>
    <template v-for="(item, index) in columns">
      <!-- 可自定义 -->
      <slot name="content"></slot>
      <el-table-column v-if="item.prop == 'files'"
        :prop="item.prop"
        :key="index"
        :label="item.label" :width="item.width">
        <template slot-scope="scope">
          <a style="margin-left: 10px;display: block;" href="javascript:void(0)" v-for="file in scope.row.files" :key="file.id"
            @click="clickItem(file)">
            {{ file.name }}
          </a>
        </template>
      </el-table-column>
      <el-table-column v-else
        :prop="item.prop"
        :key="index"
        :label="item.label" :width="item.width"></el-table-column>
    </template>

    <el-table-column fixed="right" label="操作" width="200">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="primary" round size="mini">查看</el-button>
        <el-button @click="handleUpdate(scope.row)" type="warning" round size="mini">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: () => {
        return [
          {
            date: '2016-05-03',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          }, {
            date: '2016-05-02',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          }
        ]
      }
    },
    columns: {
      type: Array,
      default: () => {
        return [
          {
            prop: 'date',
            label: '日期',
            width: '120'
          },
          {
            prop: 'name',
            label: '姓名',
            width: '120'
          },
          {
            prop: 'province',
            label: '省份',
            width: '120'
          }, {
            prop: 'address',
            label: '地址',
            width: '300'
          }
        ]
      }
    }
  },
  methods:{
    handleClick(row){
      this.$emit('on-look', row)
    },
    handleUpdate(row){
      this.$emit('on-update', row)
    }
  }
}
</script>
<style lang="less" scoped>
.el-table thead {
  color: #6081A8;
}
</style>
