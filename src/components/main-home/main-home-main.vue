<template>
  <div>
    <draggable class="drawing-board" :list="drawingList" :animation="340" :group="$store.getters.getToolGroupName">
      <!--      <draggable-item-->
      <!--          v-for="(item, index) in drawingList"-->
      <!--          :key="item.renderKey"-->
      <!--          :drawing-list="drawingList"-->
      <!--          :current-item="item"-->
      <!--          :index="index"-->
      <!--          :active-id="activeId"-->
      <!--          :form-conf="formConf"-->
      <!--          @activeItem="activeFormItem"-->
      <!--          @copyItem="drawingItemCopy"-->
      <!--          @deleteItem="drawingItemDelete"-->
      <!--      />-->
    </draggable>
    <div v-show="!drawingList.length" class="empty-info">
      从左侧拖入或点选组件进行表单设计
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: "main-home-main",
  props: {},
  components: {draggable},
  data() {
    return {
      drawingList: []
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