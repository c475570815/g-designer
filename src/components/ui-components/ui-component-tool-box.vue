<template>
  <el-card class="box-card" v-for="(item,index) in toolDataDetail" :key="index"
           v-if="$common.isNotEmpty(toolDataDetail)">
    <span class="components-title">{{ item.typeName }}</span>
    <uiComponentToolShow v-for="(toolData,i) in item.toolArr" :key="i" :tool-data="toolData"
                         v-if="$common.isNotEmpty(item.toolArr)"/>
  </el-card>
</template>

<script>
import toolData from '../../../public/static/toolDetail.json';
import uiComponentToolShow from "@/components/ui-components/ui-component-tool-show";

export default {
  name: "ui-component-tool-box",
  props: {},
  components: {uiComponentToolShow},
  data() {
    return {
      toolDataDetail: []
    }
  },
  methods: {},
  mounted() {
  },
  created() {
    this.toolDataDetail = toolData;
    debugger
  }
}
</script>

<style scoped>

</style>