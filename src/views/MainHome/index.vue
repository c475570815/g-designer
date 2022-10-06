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
<!--      <div style="width: 300px">-->
<!--        <ComponentDesign :component-id=""/>-->
<!--      </div>-->
    </el-container>
  </el-container>
</template>

<script>

import mainHomeHead from "@/views/MainHome/main-home-head";
import mainHomeAside from "@/views/MainHome/main-home-aside";
import mainHomeMain from "@/views/MainHome/main-home-main";
import ComponentDesign from "@/views/dsign/component-design";

export default {
  name: 'HomeView',
  components: {ComponentDesign, mainHomeHead, mainHomeAside, mainHomeMain}
}
</script>


<style lang="less">

.main-home-header {
  height: 6vh !important;
  border-bottom: 1px solid #f1e8e8;
}

.el-aside {
  height: 90vh;
}


</style>
