<script>
import {render, h, resolveComponent, ref} from "vue";
import {cloneDeep} from "lodash";

export default {
  name: "component-design-item",
  props: {
    param: {type: Object, required: true},
    value: {required: true},
    itemKey: {type: String, required: true},
  },
  components: {},
  data() {
    return {}
  },
  methods: {},
  render(createElement, context) {
    let tagData = cloneDeep(this.param.code);
    let {param, componentTag, defaultContent, defaultValue} = this.$common.handleConfigComponentData(tagData);
    if (this.$common.isEmpty(this.value) && this.$common.isNotEmpty(defaultValue)){
      this.$emit('changeValue', this.itemKey, defaultValue);
      //不使用非默认值render
      return ;
    }
    let componentNode = h(resolveComponent(componentTag),
        {
          modelValue: this.value,
          'onUpdate:modelValue': (value) => this.$emit('changeValue', this.itemKey, value),
          ...param
        },
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
