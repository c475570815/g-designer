<script>


import {render, createElementVNode} from "vue";

export default {
  name: "component-show",
  props: {
    toolData: {type: Object, require: true}
  },
  components: {
    render
  },
  render() {
    let tagData = this.$common.deepClone(this.toolData.code);
    let componentTag=this.$store.getters.getComponentTagName;
    let keys = Object.keys(tagData);
    let param = {}
    for (let i = 0; i < keys.length; i++) {
      if (this.$store.getters.getComponentTagName !== keys[i]) {
        param[keys[i]] = tagData[keys[i]];
      }
    }
    return createElementVNode(tagData.componentTag, param, [])
  }
}
</script>

<style scoped>

</style>