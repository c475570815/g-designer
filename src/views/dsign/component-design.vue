<template>
  <div class="component-design-form">
    <el-form :model="form" label-width="120px">


    </el-form>
  </div>
</template>

<script scoped>
import bus from "@/bus";

export default {
  name: "component-design",
  props: {
    componentId: {required: true, type: String}
  },
  components: {},
  data() {
    return {
      //当前编辑的控件的数据
      editComponentData: {},
      //公共的属性
      commonFormOption: [
        {
          key: 'span',
          label: '表单栅格',
          code: {
            "componentTag": "el-input-number",
            "min": "1",
            "max": "24"
          }
        }, {
          key: 'fieldName',
          label: '字段名',
          code: {
            "componentTag": "el-input",
            "placeholder": "请输入字段名称"
          }
        }, {
          key: 'componentStyle',
          label: '组件样式',
          code: {
            "componentTag": "el-input",
            "placeholder": "请输入字段名称",
            "rows": "2",
            "type": "textarea"
          }
        }
      ],
      form: {
      }
    }
  },
  methods: {
    getComponentFormOption(tag) {

    }
  },
  mounted() {
  },
  created() {
    this.editComponentData = bus.$emit(`getComponentDataById-${this.componentId}`);
    this.getComponentFormOption(this.editComponentData.code.componentTag);
  }
}
</script>

<style lang="less" scoped>

.component-design-form {

}

</style>
