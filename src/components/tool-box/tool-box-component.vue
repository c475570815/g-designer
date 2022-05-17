<template>
    <el-button   type="primary" size="small" :icon="$common.isEmpty(toolData.iconName)?'folder':toolData.iconName">
      {{ toolData.name }}
    </el-button>
</template>

<script>
export default {
  name: "tool-box-component",
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
