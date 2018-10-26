<template>
  <div class="dialogContainer">
    <div class="dialogWrapper">
      <!-- <h3>{{ title }}</h3> -->
      <slot name="content"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'detail',
  data () {
    return {
      title: '舆情详情',
      dialogTableVisible: true
    }
  }
}
</script>
<style>
.dialogContainer {
  text-align: left;
  width: 100vw;
  background-color: rgba(0, 0, 0, .5);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
}
.dialogWrapper {
  /* // // #050f1c; */
  background-Color: #ccc;
  width: 80vw;
  height: 80vh;
  position: absolute;
  top: 10vh;
  left: 10vw;
}
</style>
