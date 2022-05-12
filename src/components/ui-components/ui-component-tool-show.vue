<template>
  <div >
    <el-button type="primary" size="small" :icon="$common.isEmpty(toolData.iconName)?'folder':toolData.iconName">
      {{ toolData.name }}
    </el-button>
  </div>
</template>

<script>
export default {
  name: "ui-component-tool-show",
  props: {
    toolData: {type: Object, require: true}
  },
  components: {},
  data() {
    return {}
  },
  methods: {},
  mounted() {
  },
  created() {
  }
}
</script>

<style scoped>

</style>