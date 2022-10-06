<template>
  <div class="design-main">
    <el-tabs
        v-model="activeTabId"
        type="card"
        class="panel-tabs"
        editable
        @edit="tabsEdit"
    >
      <el-tab-pane
          v-for="item in tabArr"
          :key="item.id"
          :label="item.title"
          :name="item.id"
      >
        <design-panel :panel-id="item.id"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import designPanel from "@/views/dsign/design-panel";

export default {
  name: "main-home-main",
  props: {},
  components: {designPanel},
  data() {
    return {
      tabArr: [
        {
          id: "default",
          title: "默认面板"
        }
      ],
      activeTabId: 'default'
    }
  },
  methods: {
    tabsEdit() {
      let id = this.$common.getGuid();
      this.tabArr.push({
        id: id,
        title: `设计面板-${this.tabArr.length}`
      });
      this.activeTabId = id;
    }
  },
  mounted() {

  },
  created() {
  }
}
</script>

<style lang="less" scoped>
.design-main {
  .panel-tabs {
    .el-tab-pane {
      width: 100%;
      height: 80vh;
      overflow-y: auto;
    }
  }

}
</style>
