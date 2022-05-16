<script>


import {render, h, resolveComponent} from "vue";

export default {
  name: "component-show",
  props: {
    toolData: {type: Object, require: true}
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
      if (outPutKeyArr.indexOf(keys[i]) <= 0) {
        param[keys[i]] = tagData[keys[i]];
      }
    }
    let defaultContent = this.$common.isEmpty(tagData[defaultContentTag]) ? "" : tagData[defaultContentTag]
    return h(resolveComponent(tagData[componentTag]), param, [defaultContent])
  }
}
</script>

<style scoped>

</style>
