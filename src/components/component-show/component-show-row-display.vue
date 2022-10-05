<template>
  <el-row align="middle" class="row-display" :gutter="20">
    <draggable
        v-if="$common.isNotEmpty(dataArr)"
        :id="refId"
        v-model="dataArr"
        animation="300"
        :style="draggableStyle"
        :group="$store.getters.useComponentGroupName"
        item-key="id"
    >
      <template #item="{element,index}">
        <el-col :span="element.span">
          <ComponentShow :toolData="element.componentData" :index="index"/>
        </el-col>
      </template>
    </draggable>

    <draggable
        v-else
        :id="refId"
        v-model="emptyArr"
        animation="300"
        :style="emptyStyle"
        :group="$store.getters.useComponentGroupName"
        item-key="id"
    >
      <template #item="{element,index}">
        <div :span="element.span">
          <span>{{ element.text }}</span>
        </div>
      </template>
    </draggable>
  </el-row>
</template>


<script>
import ComponentShow from "@/components/component-show/component-show";
import draggable from "vuedraggable";
import bus from "@/bus";

export default {
  name: "component-show-row-display",
  props: {},
  components: {
    ComponentShow,
    draggable
  },
  data() {
    return {
      defaultSpan: 4,
      dataArr: [],
      refId: this.$common.getGuid(),
      draggableStyle: {},
      emptyArr: [{text: "拖动控件到这里呢 亲"}],
      emptyStyle: {}
    }
  },
  methods: {
    autoDisplay() {
      let spanCount = 24 / this.dataArr.length;
      for (let data of this.dataArr) {
        data.span = spanCount;
      }
    }
  },
  mounted() {
    this.draggableStyle = {
      height: this.$el.style.height,
      width: '100%',
      display: 'contents'
    }
    this.emptyStyle = {
      height: this.$el.style.height,
      width: '100%',
      'text-align': 'center'
    }
  },
  created() {
    //发布拖拽后的相应事件
    bus.$off(`addComponent${this.refId}`)
    bus.$on(`addComponent${this.refId}`, ({componentData, displayIndex}) => {

      this.dataArr.splice(displayIndex, 0, {
        id: this.$common.getGuid,
        span: this.defaultSpan,
        componentData: componentData
      });
    })
  }
}
</script>

<style lang="less" scoped>
.row-display {
  width: 100%;


}
</style>
