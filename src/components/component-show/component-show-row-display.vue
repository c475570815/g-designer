<template>
  <el-row align="middle" class="row-display" :gutter="20">
    <draggable
        v-if="isDataArrEmpty"
        :id="rowId"
        v-model="dataArr"
        animation="300"
        :style="draggableStyle"
        :group="useComponentGroupName"
        item-key="id"
    >
      <template #item="{element,index}">
        <el-col :span="element.span">
          <ComponentShow
              :tool-data="element.componentData"
              :index="index"
              :display-container-id="rowId"
              @deleteComponent="deleteComponent"/>
        </el-col>
      </template>
    </draggable>

    <draggable
        v-else
        :id="rowId"
        v-model="emptyArr"
        animation="300"
        :group="useComponentGroupName"
        item-key="id"
    >
      <template #item="{element,index}">
        <div class="empty-container">
          <div>{{ element.text }}</div>
        </div>
      </template>
    </draggable>
  </el-row>
</template>


<script>
import ComponentShow from "@/components/component-show/component-show";
import draggable from "vuedraggable";
import bus from "@/bus";
import {mapState} from "vuex";
import {domPropertyValueFormat} from "@/common/dataFormat";

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
      rowId: this.$common.getGuid(),
      draggableStyle: {},
      emptyArr: [{text: "拖动控件到这里呢 亲"}]
    }
  },
  methods: {
    deleteComponent(idArr) {
      for (let id of idArr) {
        let deleteIndex = this.dataArr.findIndex(item => item.componentData.code.id === id);
        if (deleteIndex === -1) {
          continue;
        }
        this.dataArr.splice(deleteIndex, 1)
      }
    }
  },
  computed: {
    // 计算属性的 getter
    isDataArrEmpty: function () {
      // `this` 指向 vm 实例
      return this.$common.isNotEmpty(this.dataArr);
    },
    ...mapState({
      useComponentGroupName: state => state.useComponentGroupName
    })
  },
  mounted() {
    this.draggableStyle = {
      height: this.$el.style.height,
      width: '100%',
      display: 'contents'
    }
  },
  created() {
    //发布拖拽后的相应事件
    bus.$off(`addComponent-${this.rowId}`)
    bus.$on(`addComponent-${this.rowId}`, ({componentData, displayIndex}) => {
      componentData.code.id = this.$common.getGuid();
      this.dataArr.splice(displayIndex, 0, {
        span: this.defaultSpan,
        componentData: componentData
      });
    })

    bus.$off(`changeComponent-${this.rowId}`)
    bus.$on(`changeComponent-${this.rowId}`, ({componentId, componentData}) => {
      let changeIndex = this.dataArr.findIndex((data) => {
        return data.componentData.code.id === componentId;
      });
      if (changeIndex === -1) {
        console.error("错误的组件id");
      }
      this.dataArr[changeIndex].span = componentData.span;
      // //格式化属性值
      // let keyArr = Object.keys(componentData);
      // for (let i = 0; i < keyArr.length; i++) {
      //   let key = keyArr[i]
      //   componentData[key] = Object.keys(domPropertyValueFormat).includes(key)
      //       ? domPropertyValueFormat[key](componentData[key])
      //       : componentData[key]
      // }
      this.dataArr[changeIndex].componentData.code = componentData;
    })

  }
}
</script>

<style lang="less" scoped>
.row-display {
  width: 100%;
}
</style>
