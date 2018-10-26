<template>
  <!-- <scroll-bar></scroll-bar> -->

    <el-menu mode="vertical" unique-opened :default-active="$route.path"  active-text-color="#6CA4E7">
       <sidebar-item :routes="data"></sidebar-item>
    </el-menu>

</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

import { menuRouters } from '@/router'

export default {
  data() {
    return {
      menus: []
    }
  },
  props: ['data'],
  components: { SidebarItem },
  computed: {
    // ...mapGetters([
    //   'addRouters'
    // ]),
    routes() {
      // return this.$router.options.routes
    },
  },
  mounted() {
    // var addRouters = menuRouters
    // var addRouters = ApplyManageRouters
    // this.menus = JSON.parse(localStorage.getItem('addRouters'))
    // console.log(addRouters)
    // this.menus = this.data
  }
}
</script>
