<script>


import {render, h, resolveComponent} from "vue";

import commonTool from "@/common/commonTool";

export default {
  name: "component-show",
  data() {
    return {
      editingClass: 'choose-component',
    }
  },
  methods: {
    editComponentClick(componentId) {
      let clickDom = document.getElementById(`div-${componentId}`)
      if (clickDom.className.indexOf(this.editingClass) === -1) {
        clickDom.className += ` ${this.editingClass}`
      } else {
        clickDom.className = clickDom.className.replaceAll(` ${this.editingClass}`, '')
      }
    },
    deleteComponent(clickDom, componentId) {
      let containerDom = document.getElementById(`div-${componentId}`);
      if (containerDom.parentNode.classList.contains('el-col')) {
        //行布局
        containerDom.parentNode.parentNode.removeChild(containerDom.parentNode);
      } else {
        //删除自己的容器
        containerDom.parentNode.removeChild(containerDom);
      }
    },
    createUseComponent(tagData, componentTag, param, componentId, defaultContent) {
      //主要生成的组件
      let componentNode = h(resolveComponent(tagData[componentTag]), {
        onClick: (event) => {
          this.editComponentClick(componentId)
          event.stopPropagation();
        },
        class: 'component-default',
        id: componentId,
        ...param
      }, {default: () => defaultContent})
      //组件容器和右上角的删除图标
      return h('div', {
            class: 'component-container',
            id: `div-${componentId}`
          },
          [componentNode,
            h(resolveComponent('el-icon'),
                {
                  class: 'delete',
                  id: `delete-${componentId}`,
                  color: '#409EFF',
                  onClick: (event) => {
                    this.deleteComponent(event.currentTarget, componentId);
                    event.stopPropagation();
                  }
                },
                [h(resolveComponent('DeleteFilled'), {}, [])])]
      )
    },
    createDisplayComponent(tagData, componentTag, param, componentId) {
      //主要生成的组件
      return h(resolveComponent(tagData[componentTag]), {
        onClick: (event) => {
          this.editComponentClick(componentId)
          event.stopPropagation();
        },
        class: 'display-component',
        id: componentId,
        ...param
      }, [h(resolveComponent('el-icon'),
          {
            class: 'delete',
            id: `delete-${componentId}`,
            color: '#409EFF',
            onClick: (event) => {
              this.deleteComponent(event.currentTarget, componentId);
              event.stopPropagation();
            }
          },
          [h(resolveComponent('DeleteFilled'), {}, [])])])
    }
  },
  props: {
    toolData: {type: Object, require: true},
  },
  components: {
    render
  },
  render(createElement, context) {
    let tagData = this.$common.deepClone(this.toolData.code);
    let componentTag = this.$store.getters.getComponentTagName;
    let defaultContentTag = this.$store.getters.getDefaultContent;
    let outPutKeyArr = [componentTag, defaultContentTag]
    let keys = Object.keys(tagData);
    let param = {}
    for (let i = 0; i < keys.length; i++) {
      if (outPutKeyArr.indexOf(keys[i]) < 0) {
        param[keys[i]] = tagData[keys[i]];
      }
    }
    let componentId = commonTool.getGuid();
    let defaultContent = this.$common.isEmpty(tagData[defaultContentTag]) ? "" : tagData[defaultContentTag]
    switch (this.toolData.type) {
      case "display":
        //布局类型组件
        return this.createDisplayComponent(tagData, componentTag, param, componentId);
      case "use":
        //使用类型
        return this.createUseComponent(tagData, componentTag, param, componentId, defaultContent);
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

.display-component {
  position: relative;
  border: 1px dashed #409EFF;
  padding: 5px;
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
