<template>
  <div class="headerWrapper">
    <div class="rightBor">
      <div class="userName clear">
        <span class="fl">
          <svg-icon icon-class="morentouxiang"></svg-icon>
        </span>
        <span class="fl">{{userName}} <i style="margin-left: 10px">|</i></span>
        <span class="logoutBtn" @click="quit">退出</span>

        <!-- <span class="left" @click="show">{{userName}}</span>
        <div class="about" v-show="showOn" v-on:mouseleave="hide">
          <div @click="reset">修改密码</div>
          <div @click="quit">退出</div>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CommonHeader',
  props: {
    userName: {
      type: String,
      default: '--'
    }
  },
  data() {
    return {
      showOn: false,
    };
  },
  mounted() {
  },
  methods: {
    show () {
      this.showOn = !this.showOn
    },
    hide () {
      this.showOn = !this.showOn
    },
    reset () {
       this.$router.push('/')
    },
    quit  () {
      // API.postQuit({
      //   userId: this.userId
      // }).then((res) => {
      //   // console.log(res)
      //   localStorage.clear()
      //   this.$router.push('/') // persission判断token
      // })

      // this.$router.push('/')
      this.$emit('logout')
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../assets/styles/mixin.less";

.headerWrapper {
  .wh(100%, 88px);
  position: relative;
  background: @mainColor;
  background: url("~@/assets/images/headBg.png") no-repeat;
  background-size: cover;
  .leftBor{
    .wh(301px,43px);
    position: absolute;
    left: 38px;
    top: 24px;
  }
  .rightBor {
    position: absolute;
    right: 50px;
    top: 24px;
    .userName {
      display: inline-block;
      height: 40px;
      position: relative;
      .logoutBtn {
        cursor: pointer;
      }
      span{
        display: inline-block;
        font-size: 18px;
        line-height: 40px;
        letter-spacing: 0px;
        color: @white;
        margin-right: 10px;
        // border-bottom: 1px solid @white;
        &:first-child {
          .wh(40px, 40px);
          background-color: #ffffff;
          .border-radius(50%);
          .svg-icon {
            .wh(100%, 100%);
          }
        }
      }
      .about{
        .wh(94px,80px);
        z-index: 999;
        padding: 10px 0;
        background-color: @white;
        box-sizing: border-box;
        position: absolute;
        right: 0;
        top: 41px;
        .box-shadow( 0px 2px 8px 0px #bbbbbb);
        // .brs(0 0 3px 3px);
        div{
          .wh(94px,30px);
          font-size: 13px;
          line-height: 30px;
          text-indent: 15px;
          color: #999999;
          &:hover{
            background-color: @grayWhite;
          }
        }
      }
    }
  }
}

</style>
