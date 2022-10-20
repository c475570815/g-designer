<script>
import {render, h, resolveComponent} from "vue";
import {cloneDeep} from "lodash";
import {mapState} from "vuex";

export default {
  name: "component-show",
  data() {
    return {
      editingClass: 'choose-component',
      componentData: {},
    }
  },
  computed: {
    ...mapState({
      activeEditComponentDataId: state => state.activeEditComponentData.id,
    })
  },
  methods: {
    /**
     * 控件编辑
     * @param componentId
     */
    editComponentClick(componentId) {
      let clickDom = document.getElementById(componentId);
      let containerDom = document.getElementById(`div-${componentId}`)
      if (containerDom.className.indexOf(this.editingClass) === -1) {
        //清除其他组件选中样式
        for (let i = 0; i < document.getElementsByClassName(this.editingClass).length; i++) {
          let classDom = document.getElementsByClassName(this.editingClass)[i]
          this.clearEditingClass(classDom);
        }
        this.$store.commit('changeActiveEditComponentData', {
          //当前编辑的组件id
          id: componentId,
          //当前编辑的组件所属展示主键
          displayContainerId: this.displayContainerId,
          //当前编辑的组件数据
          componentData: this.componentData,
        });
        //设置编辑组件class
        containerDom.className += ` ${this.editingClass}`
      } else {
        this.$store.commit('setActiveEditComponentDataEmpty')
        this.clearEditingClass(containerDom)
      }
    },
    /**
     * 清空编辑class
     * @param dom
     */
    clearEditingClass(dom) {
      dom.className = dom.className.replaceAll(` ${this.editingClass}`, '')
    },

    /**
     * 控件删除
     * @param clickDom
     * @param componentId
     */
    deleteComponent(clickDom, componentId) {
      let containerDom = document.getElementById(`div-${componentId}`);
      containerDom.parentNode.removeChild(containerDom);
      this.$emit('deleteComponent', [componentId]);
      if (this.activeEditComponentDataId === componentId) {
        this.$store.commit('setActiveEditComponentDataEmpty')
      }
    },
    /**
     * 创建使用控件
     * @param tagData
     * @param componentTag
     * @param param
     * @param defaultContent
     * @returns {VNode}
     */
    createUseComponent(tagData, componentTag, param, defaultContent) {
      //主要生成的组件
      let componentNode = h(resolveComponent(componentTag), {
        class: 'component-default',
        ...param
      }, {default: () => defaultContent})
      //组件容器和右上角的删除图标
      return h('div', {
            onClick: (event) => {
              this.editComponentClick(tagData.id)
              event.stopPropagation();
            },
            class: 'component-container',
            id: `div-${tagData.id}`
          },
          {default: () => [componentNode, this.createDeleteIcon(tagData)]}
      )
    },
    /**
     * 创建右上角的删除按钮
     * @param tagData
     * @returns {VNode}
     */
    createDeleteIcon(tagData) {
      return h(resolveComponent('el-icon'),
          {
            class: 'delete',
            id: `delete-${tagData.id}`,
            color: '#409EFF',
            onClick: (event) => {
              this.deleteComponent(event.currentTarget, tagData.id);
              event.stopPropagation();
            }
          },
          () => [h(resolveComponent('DeleteFilled'), {}, () => [])])
    },
    /**
     * 创建展示控件
     * @param tagData
     * @param componentTag
     * @param param
     * @returns {VNode}
     */
    createDisplayComponent(tagData, componentTag, param) {
      //主要生成的组件
      return h('div', {
            // onClick: (event) => {
            //   this.editComponentClick(tagData.id)
            //   event.stopPropagation();
            // },
            class: 'display-component-container',
            id: `div-${tagData.id}`
          },
          {
            default: () => [h(resolveComponent(componentTag), {
              // onClick: (event) => {
              //   this.editComponentClick(tagData.id)
              //   event.stopPropagation();
              // },
              ...param
            }, () => [this.createDeleteIcon(tagData)]), this.createDeleteIcon(tagData)]
          }
      )
    }
  },
  props: {
    toolData: {type: Object, require: true},
    displayContainerId: {type: String, require: true}
  },
  render(createElement, context) {
    debugger
    this.componentData = cloneDeep(this.toolData.code);
    let {param, componentTag, defaultContent} = this.$common.handleConfigComponentData(this.componentData);
    switch (this.toolData.type) {
      case "display":
        //布局类型组件
        return this.createDisplayComponent(this.componentData, componentTag, param);
      case "use":
        //使用类型
        return this.createUseComponent(this.componentData, componentTag, param, defaultContent);
    }
  }
}
</script>

<style lang="less" scoped>
.choose-component {
  background-color: #d0c7ed;
}

.component-default {
  height: auto;
  width: auto;
}

.display-component-container {
  position: relative;
  border: 1px dashed #409EFF;
  margin-top: 9px;
  margin-right: 9px;
  padding-left: 5px;
}

.component-container {
  position: relative;
  border: 1px dashed #409EFF;
  padding: 5px;
  margin-left: 5px;
  margin-right: 5px;
}

.delete {
  background-color: #d0c7ed;
  width: 20px;
  height: 20px;
  border-radius: 60%;
  position: absolute;
  top: -10px;
  right: -10px;
}
</style>
