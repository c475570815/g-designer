<template>
  <div v-for="(item,index) in  toolDataDetail" :key="index">
    <el-card
        class="toolbox-card box-card"
        v-if="$common.isNotEmpty(item)&&$common.isNotEmpty(item.toolArr)"
    >
      <template #header>
        <div class="card-header">
          <span>{{ item.typeName }}</span>
        </div>
      </template>


      <draggable
          v-model="item.toolArr"
          animation="300"
          :group="{ name: item.id==='3'?$store.getters.displayComponentGroupName:$store.getters.useComponentGroupName, pull: 'clone', put: false }"
          :clone="cloneComponent"
          :force-fallback=true
          ghost-class="ghost-class"
          :sort="false"
          @end="onEnd"
          item-key="name">
        <template #item="{element,index}">
          <el-col :span="12" :style="{margin:'5px'}">
            <toolComponent :tool-data="element"/>
          </el-col>
        </template>
      </draggable>
    </el-card>
  </div>

</template>

<script>
import toolComponent from "@/components/tool-box/tool-box-component";
import draggable from 'vuedraggable'
import {toRaw} from "vue";
import bus from "@/bus";

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
        //添加布局组件
        if (this.$common.isDisplayGroup(this.activeToolData)) {
          this.$store.commit('addShowTool', this.activeToolData);
        } else {

          bus.$emit(`addComponent${obj.to.id}`, {
            "componentData": this.activeToolData,
            "displayIndex": obj.newDraggableIndex
          });
        }
      }
    },
  },
  mounted() {
  },
  created() {
  }
}
</script>

<style scoped>

.toolbox-card {
  margin: 10px;

.ghost-class {
  background-color: red !important;
}
}
</style>
