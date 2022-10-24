<script>
import {render, h, resolveComponent, ref} from "vue";
import {cloneDeep} from "lodash";


import Codemirror from "codemirror-editor-vue3";
// language
import "../../common/codeMirrorSetting"

export default {
  name: "component-design-item",
  props: {
    param: {type: Object, required: true},
    value: {required: true},
    itemKey: {type: String, required: true},
  },
  components: {
    Codemirror
  },
  data() {
    return {}
  },
  methods: {},
  render(createElement, context) {
    let tagData = cloneDeep(this.param.code);
    let {
      param,
      componentTag,
      defaultContent,
      defaultValue,
      isComponent,
      valueFiled
    } = this.$common.handleConfigComponentData(tagData);
    if (this.$common.isEmpty(this.value) && this.$common.isNotEmpty(defaultValue)) {
      this.$emit('changeValue', this.itemKey, defaultValue);
      //不使用非默认值render
      return;
    }
    let componentProps = {
      ...param
    }
    componentProps[valueFiled] = this.value;
    componentProps[`onUpdate:${valueFiled}`] = (value) => {
      this.$emit('changeValue', this.itemKey, value)
    };
    let componentNode = h((isComponent ? resolveComponent(componentTag) : componentTag),
        componentProps,
        () => [defaultContent]);
    return h(resolveComponent('el-form-item'), {
      label: this.param.label
    }, () => [componentNode]);
  },
  created() {
  }
}
</script>

<style scoped>

</style>
