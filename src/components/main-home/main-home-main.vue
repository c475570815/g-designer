<template>
  <draggable class="drawing-board"
             v-model="toolList"
             item-key="name"
             :group="$store.getters.getToolGroupName">
    <template #item="{element,index}">
      <component-show
          :tool-data="element"
          :index="index"/>
    </template>
  </draggable>
<!--  <div v-show="$common.isEmpty(toolList)" class="empty-info">-->
<!--    从左侧拖入或点选组件进行表单设计-->
<!--  </div>-->
</template>

<script>
import draggable from 'vuedraggable'
import componentShow from "@/components/component-show/component-show";

export default {
  name: "main-home-main",
  props: {},
  components: {componentShow, draggable},
  data() {
    return {
      toolList: this.$store.getters.getShowToolArr
    }
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