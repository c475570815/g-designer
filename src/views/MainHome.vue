<template>
  <el-container>
    <el-header class="main-home-header">
      <mainHomeHead/>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <mainHomeAside/>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>

import mainHomeHead from "@/components/main-home/main-home-head";
import mainHomeAside from "@/components/main-home/main-home-aside";

export default {
  name: 'HomeView',
  components: {mainHomeHead, mainHomeAside}
}
</script>


<style lang="less">

.main-home-header {
  height: 70px;
  border-bottom: 1px solid #f1e8e8;
}


</style>