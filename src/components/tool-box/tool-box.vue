<template>
  <div v-for="(item,index) in  toolDataDetail" :key="index">
    <el-card
        class="toolbox-card box-card"
        v-if="boxIsEmpty(item)"
    >
      <template #header>
        <div class="card-header">
          <span>{{ item.typeName }}</span>
        </div>
      </template>
      <draggable
          v-model="item.toolArr"
          animation="300"
          :group="{ name: (item.id==='3'?displayComponentGroupName:useComponentGroupName), pull: 'clone', put: false }"
          :clone="cloneComponent"
          :force-fallback=true
          ghost-class="ghost-class"
          :sort="false"
          @end="onEnd"
          item-key="name">
        <template #item="{element,index}" class="tool-container">
          <div class="tool-item" :style="{margin:'5px'}">
            <toolComponent :tool-data="element"/>
          </div>
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
import {cloneDeep} from "lodash";
import {mapState} from "vuex";

export default {
  name: "tool-box",
  props: {},
  components: {toolComponent, draggable},
  data() {
    return {
      activeToolData: {}
    }
  },
  computed: {
    ...mapState({
      toolDataDetail: state => state.configToolData,
      displayComponentGroupName: state => state.displayComponentGroupName,
      useComponentGroupName: state => state.useComponentGroupName
    })
  },
  methods: {
    boxIsEmpty(item) {
      return this.$common.isNotEmpty(item) && this.$common.isNotEmpty(item.toolArr)
    },
    cloneComponent(origin) {
      this.activeToolData = cloneDeep(origin);
    },
    onEnd(obj) {
      if (obj.from !== obj.to) {
        //添加布局组件
        if (this.$common.isDisplayGroup(this.activeToolData)) {
          bus.$emit(`addShowComponent${obj.to.id}`, {
            "componentData": this.activeToolData,
            "displayIndex": obj.newDraggableIndex
          })
        } else {
          bus.$emit(`addComponent-${obj.to.id}`, {
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

<style lang="less" scoped>

.toolbox-card {
  margin: 10px;

  .ghost-class {

  }

  .tool-item {
    display: inline-block;
    line-height: 40px;
  }
}
</style>
