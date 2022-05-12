<template>
  <draggable
      :list="toolDataDetail"
      :group="{ name: $store.getters.getToolGroupName, pull: 'clone', put: false }"
      :clone="cloneComponent"
      draggable=".components-item"
      :sort="false"
      @end="onEnd"
  >
    <div v-for="(item,index) in toolDataDetail">
      <el-card class="box-card"
               v-if="$common.isNotEmpty(item)&&$common.isNotEmpty(item.toolArr)"
               :key="index">
        <span class="components-title">{{ item.typeName }}</span>
        <uiComponentToolShow v-for="(toolData,i) in item.toolArr" :key="i" :tool-data="toolData"/>
      </el-card>
    </div>
  </draggable>
</template>

<script>
import uiComponentToolShow from "@/components/ui-components/ui-component-tool-show";
import draggable from 'vuedraggable'

export default {
  name: "ui-component-tool-box",
  props: {},
  components: {uiComponentToolShow, draggable},
  data() {
    return {
      toolDataDetail: this.$store.getters.getToolData
    }
  },
  methods: {
    cloneComponent(origin){

    },
    onEnd(obj){

    }

  },
  mounted() {
  },
  created() {
  }
}
</script>

<style scoped>

</style>