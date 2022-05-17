<template>
  <el-container>
    <el-header class="main-home-header">
      <mainHomeHead/>
    </el-header>
    <el-container>
      <el-aside width="230px">
        <mainHomeAside/>
      </el-aside>
      <el-main>
        <mainHomeMain/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

import mainHomeHead from "@/components/main-home/main-home-head";
import mainHomeAside from "@/components/main-home/main-home-aside";
import mainHomeMain from "@/components/main-home/main-home-main";

export default {
  name: 'HomeView',
  components: {mainHomeHead, mainHomeAside, mainHomeMain}
}
</script>


<style lang="less">

.main-home-header {
  height: 70px;
  border-bottom: 1px solid #f1e8e8;
}


</style>
