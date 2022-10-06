<script>


import {render, h, resolveComponent} from "vue";

import commonTool from "@/common/commonTool";
import bus from "@/bus";

export default {
  name: "component-show",
  data() {
    return {
      editingClass: 'choose-component',
    }
  },
  methods: {
    /**
     * 控件编辑
     * @param componentId
     */
    editComponentClick(componentId) {
      console.log(document.getElementById(`${componentId}`));
      let clickDom = document.getElementById(componentId);
      if (clickDom.classList.contains('el-row')) {
        //选中了一个行布局
      } else {
        let containerDom = document.getElementById(`div-${componentId}`)
        if (containerDom.className.indexOf(this.editingClass) === -1) {
          containerDom.className += ` ${this.editingClass}`
        } else {
          containerDom.className = containerDom.className.replaceAll(` ${this.editingClass}`, '')
        }
      }
    },
    /**
     * 控件删除
     * @param clickDom
     * @param componentId
     */
    deleteComponent(clickDom, componentId) {
      let containerDom = document.getElementById(`div-${componentId}`);
      if (containerDom.parentNode.classList.contains('el-col')) {
        //行布局
        containerDom.parentNode.parentNode.removeChild(containerDom.parentNode);
      } else {
        //删除自己的容器
        containerDom.parentNode.removeChild(containerDom);
      }
      this.$emit('deleteComponent', [componentId]);
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
      let componentNode = h(resolveComponent(tagData[componentTag]), {
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
          [componentNode,
            h(resolveComponent('el-icon'),
                {
                  class: 'delete',
                  id: `delete-${tagData.id}`,
                  color: '#409EFF',
                  onClick: (event) => {
                    this.deleteComponent(event.currentTarget, tagData.id);
                    event.stopPropagation();
                  }
                },
                [h(resolveComponent('DeleteFilled'), {}, [])])]
      )
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
      return h(resolveComponent(tagData[componentTag]), {
        onClick: (event) => {
          this.editComponentClick(tagData.id)
          event.stopPropagation();
        },
        class: 'display-component',
        ...param
      }, [h(resolveComponent('el-icon'),
          {
            class: 'delete',
            id: `delete-${tagData.id}`,
            color: '#409EFF',
            onClick: (event) => {
              this.deleteComponent(event.currentTarget, tagData.id);
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
    let defaultContent = this.$common.isEmpty(tagData[defaultContentTag]) ? "" : tagData[defaultContentTag]
    switch (this.toolData.type) {
      case "display":
        //布局类型组件
        return this.createDisplayComponent(tagData, componentTag, param);
      case "use":
        //使用类型
        return this.createUseComponent(tagData, componentTag, param, defaultContent);
    }
  }, created() {
    //根据id获取组件数据
    bus.$off(`getComponentDataById-${this.toolData.code.id}`)
    bus.$on(`getComponentDataById-${this.toolData.code.id}`, () => {
      return this.$common.deepClone(this.toolData);
    })
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
