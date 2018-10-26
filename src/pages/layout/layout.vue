<template>
  <div class="layout">
    <div class="layout-header">
      <common-header :userName="userName" @logout="quit"></common-header>
      <navbar :currActive="defaultActive" @on-select="onChange"></navbar>
    </div>
    <div class="layout-main">
      <div class="layout-left">
        <sidebar class="sidebar-container" :data="leftMenuList"></sidebar>
      </div>
      <div class="layout-container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import CommonHeader from "./components/header";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/navBar";
import {
  applyManageRouters,
  excuteManageRouters,
  purchaseManageRouters,
  contractManageRouters,
  profileManageRouters,
  eduManageRouters,
  analysisManageRouters,
  systemManageRouters,
  noticeManageRouters,
  rulesManageRouters } from "@/router";
// import * as API from "@/api/login";
// import tool from "../assets/js/formatDate";

export default {
  name: "Layout",
  data() {
    return {
      userName: "",
      time: "",
      leftMenuList: [],
      defaultActive: '', // 当前激活菜单的 index
    };
  },
  created() {
    this.userName = localStorage.getItem("userName");
    // if(localStorage.getItem('token')){
    //   this.getmenuData();
    // }
    // this.$store.commit("getAuthMenulist");
  },
  watch: {
    $route(to) {
      console.log(to)
      this.defaultActive = this.$route.name
      localStorage.setItem('defaultActive', this.$route.name)
      // this.$store.commit("setCurrentPageName", to.name);
      // let pathArr = this.$route.matched.filter(item => {
      //   return item.meta;
      // });
      // this.$store.commit("updateOpenNames", pathArr[0].name);
    }
  },
  methods: {
    onChange(val) {
      var menus = {
        "1": systemManageRouters,
        "2": noticeManageRouters,
        "3": rulesManageRouters,
        "4": applyManageRouters,
        "5": excuteManageRouters,
        "6": purchaseManageRouters,
        "7": contractManageRouters,
        "8": profileManageRouters,
        "9": eduManageRouters,
        "10": analysisManageRouters
      };

      this.leftMenuList = menus[val];
      localStorage.setItem('openedVal', val)
    },
    // getmenuData() {
    //   // 动态菜单
    //   API.getMenuList({
    //     userId: localStorage.getItem("userId"),
    //     userType: "2",
    //     partyschoolId: localStorage.getItem("partyschoolId")
    //   })
    //     .then(res => {
    //       if (res.result && res.result.length) {
    //         var data = res.result;
    //         this.$store.commit("getAuthMenulist", data);
    //       }
    //     })
    //     .catch(() => {
    //       this.$store.commit("getAuthMenulist");
    //     });
    // },
    quit() {
      //localStorage.clear()
      localStorage.removeItem("token");

      if (!localStorage.getItem("remberPass")) {
        localStorage.removeItem("userId");
        localStorage.removeItem("userPass");
      }
      this.$router.push("/");
    }
  },
  components: {
    CommonHeader,
    Sidebar,
    Navbar
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/styles/mixin";

.layout {
  width: 100%;
  height: 100%;
  position: relative;
  background: @bgColor;
  &-header {
    width: 100%;
    // height: 163px;
  }
  &-main {
    margin-top: 2px;
    min-height: calc(100vh - 138px);
    position: relative;
    .layout-left {
      position: absolute;
      left: 0;
      bottom: 0;
      top: 0;
      overflow-y: auto;
      width: 210px;
      // margin-right: 15px;
      z-index: 2;
      background-color: #ffffff;
      padding: 10px 10px;
      box-sizing: border-box;
    }
    .layout-container {
      width: calc(100% - 225px);
      padding: 10px 10px 40px 0;
      position: absolute;
      top: 0;
      left: 225px;
      bottom: 0;
      overflow-y: scroll;
      overflow-x: hidden;
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
}
.bread-box {
  margin-bottom: 15px;
  background-color: @white;
  height: 40px;
  line-height: 40px;
  text-align: left;
  .border-radius(5px);
  padding-left: 100px;
  position: relative;
  font-size: 14px;
  .currNav {
    position: absolute;
    left: 15px;
    top: 0;
    color: @fontColor;
    // i {
    //   margin-right: 10px;
    // }
  }
  .currTime {
    position: absolute;
    right: 20px;
    top: 0;
    color: @grayWhite;
  }
}
</style>
