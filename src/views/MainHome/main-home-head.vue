<template>
  <el-row :gutter="20">
    <el-col :span="5" class="logo">
      <el-icon color="#00afff" :size="40">
        <checked/>
      </el-icon>
      <span class="title-font">
      g-designer
    </span>
    </el-col>


    <el-col :span="5" :offset="14" class="button-group">
      <el-button type="primary" @click="createVueFile">生成模板文件</el-button>
    </el-col>
  </el-row>

</template>

<script>
import {exportVueFile} from "@/common/vueFileTool";
import {mapState} from "vuex";

export default {
  name: "main-home-head",
  props: {},
  components: {},
  data() {
    return {}
  },
  computed: mapState({
    activePanelId: 'activePanelId'
  }),
  methods: {
    createVueFile() {
      exportVueFile(this)
    }
  },
  mounted() {
  },
  created() {
  }
}
</script>

<style scoped>
.logo {
  display: flex !important;
  flex-direction: row;
  justify-content: flex-start;
  align-content: center;
  flex-wrap: nowrap;
  align-items: center;
}

.button-group {
  display: flex !important;
  flex-direction: row-reverse;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: flex-start;
  align-items: center;
}
</style>
