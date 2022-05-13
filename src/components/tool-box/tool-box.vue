<template>
  <div v-for="(item,index) in  toolDataDetail" :key="index">
    <el-card class="box-card"
             v-if="$common.isNotEmpty(item)&&$common.isNotEmpty(item.toolArr)"
    >
      <span class="components-title">{{ item.typeName }}</span>
      <draggable
          v-model="item.toolArr"
          animation="300"
          :group="{ name: $store.getters.getToolGroupName, pull: 'clone', put: false }"
          :clone="cloneComponent"
          :sort="false"
          @end="onEnd"
          item-key="name">
        <template #item="{element,index}">
          <toolComponent :tool-data="element"/>
        </template>
      </draggable>
    </el-card>
  </div>

</template>

<script>
import toolComponent from "@/components/tool-box/tool-box-component";
import draggable from 'vuedraggable'
import {toRaw} from "vue";

export default {
  name: "tool-box",
  props: {},
  components: {toolComponent, draggable},
  data() {
    return {
      toolDataDetail: this.$store.getters.getConfigToolData,
      activeToolData: {}
    }
  },
  methods: {
    cloneComponent(origin) {
      this.activeToolData = this.$common.deepClone(origin);
    },
    onEnd(obj) {
      if (obj.from !== obj.to) {
        this.$store.commit('addShowTool', this.activeToolData);
      }
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