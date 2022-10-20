<template>
  <div>
    <draggable
        class="drawing-board"
        v-if="isDataArrEmpty"
        :id="panelId"
        v-model="toolList"
        item-key="name"
        :group="displayComponentGroupName">
      <template #item="{element,index}">
        <component-show
            :tool-data="element.componentData"
            :index="index"
            @deleteComponent="deleteComponent"/>
      </template>
    </draggable>

    <draggable
        v-else
        :id="panelId"
        v-model="emptyArr"
        animation="300"
        :group="displayComponentGroupName"
        item-key="id"
    >
      <template #item="{element,index}">
        <div class="empty-container">
          <div>{{ element.text }}</div>
        </div>
      </template>
    </draggable>

  </div>
</template>

<script>
import draggable from 'vuedraggable'
import componentShow from "@/components/component-show/component-show";
import bus from "@/bus";
import {mapState} from "vuex";

export default {
  name: "design-panel",
  props: {
    panelId: {type: String, required: true}
  },
  components: {componentShow, draggable},
  data() {
    return {
      toolList: [],
      emptyArr: [{text: "拖动布局控件到这里呢 亲"}]
    }
  },
  computed: {
    // 计算属性的 getter
    isDataArrEmpty: function () {
      // `this` 指向 vm 实例
      return this.$common.isNotEmpty(this.toolList);
    },
    ...mapState({
      displayComponentGroupName: state => state.displayComponentGroupName
    })
  },
  methods: {
    deleteComponent(idArr) {
      for (let id of idArr) {
        let deleteIndex = this.toolList.findIndex(item => item.componentData.code.id === id);
        if (deleteIndex === -1) {
          continue;
        }
        this.toolList.splice(deleteIndex, 1)
      }
    }
  },
  mounted() {
  },
  created() {
    //发布拖拽后的相应事件
    bus.$off(`addShowComponent${this.panelId}`)
    bus.$on(`addShowComponent${this.panelId}`, ({componentData, displayIndex}) => {
      componentData.code.id = this.$common.getGuid();
      this.toolList.splice(displayIndex, 0, {
        id: this.$common.getGuid(),
        componentData: componentData
      });
    })
  }
}
</script>

<style lang="less" scoped>

</style>
