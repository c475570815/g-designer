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
            :display-container-id="element.id"
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
import {domPropertyValueFormat} from "@/common/dataFormat";

export default {
  name: "design-panel",
  props: {
    panelId: {type: String, required: true}
  },
  components: {componentShow, draggable},
  data() {
    return {
      toolList: [],
      // toolList: [{
      //   "id": "9482e867-a94b-542a-6cc5-45a2b64cc8da",
      //   "componentData": {
      //     "id": "3-1",
      //     "name": "行布局",
      //     "type": "display",
      //     "iconName": "folder",
      //     "code": {
      //       "componentTag": "component-show-row-display",
      //       "gutter": 0,
      //       "style": {"height": "70px"},
      //       "id": "fdade588-2030-74ad-7df0-4a272e036197"
      //     }
      //   }
      // }],
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
      let newShowComponent = {
        id: this.$common.getGuid(),
        componentData: componentData
      }
      this.toolList.splice(displayIndex, 0, newShowComponent);

      //修改布局型组件属性
      bus.$off(`changeComponent-${newShowComponent.id}`)
      bus.$on(`changeComponent-${newShowComponent.id}`, ({componentId, componentData}) => {
        let changeIndex = this.toolList.findIndex((data) => {
          return data.componentData.code.id === componentId;
        });
        if (changeIndex === -1) {
          console.error("错误的组件id");
        }
        //格式化属性值
        // let keyArr = Object.keys(componentData);
        // for (let i = 0; i < keyArr.length; i++) {
        //   let key = keyArr[i]
        //   componentData[key] = Object.keys(domPropertyValueFormat).includes(key)
        //       ? domPropertyValueFormat[key](componentData[key])
        //       : componentData[key]
        // }
        this.toolList[changeIndex].span = componentData.span;
        this.toolList[changeIndex].componentData.code = componentData;
      })
    })
  }
}
</script>

<style lang="less" scoped>

</style>
