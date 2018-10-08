<template>
  <transition name="fade">
    <router-view></router-view>
  </transition>
</template>

<script>
  export default {
  }
</script>
<style lang="scss">
  .btn-group{
    margin-bottom: 20px;
    span{
      margin: 0 10px;
    }
  }
  .common-form{
    min-width: 500px;
    max-width: 900px;
    width: 70%;
  }
  .form-title{
    height: 30px;
    border-bottom: 1px solid #ddd;
    margin-bottom: 25px;
    padding: 0 15px;
  }
  .highlight{
    color: #a94442;
    font-weight: bold;
  }
  .text-success{
    color: #17B3A3;
  }
  .text-danger{
    color: #f56c6c;
  }
  .el-table thead{
    color: #666;
  }
  .editor .w-e-menu{
    z-index: 0;
  }
</style>
