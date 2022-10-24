<template>
  <div>
    <draggable
        class="drawing-board"
        v-if="isDataArrEmpty"
        :ref="`panel-${panelId}`"
        :id="panelId"
        v-model="componentDataArr"
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
        :ref="`panel-${panelId}`"
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
import {cloneDeep} from "lodash";
import {computed, reactive} from "vue";

export default {
  name: "design-panel",
  props: {
    panelId: {type: String, required: true}
  },
  components: {componentShow, draggable},
  data() {
    return {
      emptyArr: [{text: "拖动布局控件到这里呢 亲"}]
    }
  },
  // setup(props) {
  //   const componentDataArr = reactive(computed(() => this.$store.state.panelData[props.panelId]))
  //   return {
  //     componentDataArr
  //   }
  // },
  computed: {
    componentDataArr: function () {
      return this.$store.state.panelData[this.$props.panelId]
    },
    // 计算属性的 getter
    isDataArrEmpty: function () {
      // `this` 指向 vm 实例
      return this.$common.isNotEmpty(this.componentDataArr);
    },
    ...mapState({
      displayComponentGroupName: state => state.displayComponentGroupName

    })
  },
  methods: {
    getComponentIndexById(id) {
      let index = this.componentDataArr.findIndex(item => item.componentData.code.id === id);
      if (index === -1) {
        throw new TypeError("错误的组件id")
      }
      return index
    },
    alertComponentDataArr(tmpArr) {
      this.$store.commit('changePanelDataById',
          {
            id: this.panelId,
            data: tmpArr
          }
      )
    },
    deleteComponent(idArr) {
      let tmpArr = cloneDeep(this.componentDataArr);
      for (let id of idArr) {
        let deleteIndex = this.getComponentIndexById(id);
        if (deleteIndex === -1) {
          continue;
        }
        tmpArr.splice(deleteIndex, 1)
      }
      this.alertComponentDataArr(tmpArr)
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
      let tmpArr = cloneDeep(this.componentDataArr);
      tmpArr.splice(displayIndex, 0, newShowComponent);
      this.alertComponentDataArr(tmpArr)
      //修改布局型组件属性
      bus.$off(`changeComponent-${newShowComponent.id}`)
      bus.$on(`changeComponent-${newShowComponent.id}`, ({componentId, componentData}) => {
        let changeIndex = this.getComponentIndexById(componentId);
        //格式化属性值
        let keyArr = Object.keys(componentData);
        for (let i = 0; i < keyArr.length; i++) {
          let key = keyArr[i]
          componentData[key] = Object.keys(domPropertyValueFormat).includes(key)
              ? domPropertyValueFormat[key](componentData[key])
              : componentData[key]
        }
        let tmpArr = cloneDeep(this.componentDataArr);
        tmpArr[changeIndex].span = componentData.span;
        tmpArr[changeIndex].componentData.code = componentData;
        this.alertComponentDataArr(tmpArr);
      })
    })
  }
}
</script>

<style lang="less" scoped>

</style>
