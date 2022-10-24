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
    <el-dialog v-model="addTabVisible" title="新增面板">
      <el-form v-model="newPanelForm" label-width="120px">
        <el-form-item label="面板名称">
          <el-input v-model="newPanelForm.name"/>
        </el-form-item>
        <el-row class="panel-button-group">
          <el-button type="primary" @click="addTab">确认</el-button>
          <el-button>取消</el-button>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import designPanel from "@/views/dsign/design-panel";
import {isEqual} from "lodash";
import {mapState} from "vuex";

export default {
  name: "main-home-main",
  props: {},
  components: {designPanel},
  data() {
    return {
      newPanelForm: {
        name: ""
      },
      addTabVisible: false,
      tabArr: [
        {
          id: "default",
          title: "默认面板"
        }
      ],
      activeTabId: 'default'
    }
  },
  watch: {
    activeTabId(newValue, oldValue) {
      this.$store.commit('setActivePanelId', newValue);
    }
  },
  methods: {
    addTab() {
      let id = this.$common.getGuid();
      this.tabArr.push({
        id: id,
        title: this.newPanelForm.name
      });
      this.activeTabId = id;
      this.$store.commit('addPanelData', id);
      this.addTabVisible = false;
    },
    tabsEdit(targetId, action) {
      if (isEqual(action, "add")) {
        this.addTabVisible = true;
      } else if (isEqual(action, "remove")) {
        let removeIndex = -1;
        let activeId = -1;
        for (let i = 0; i < this.tabArr.length; i++) {
          let tab = this.tabArr[i];
          if (isEqual(tab.id, targetId)) {
            removeIndex = i;
            activeId = this.$common.isEmpty(this.tabArr[i + 1]) ? (this.tabArr[i - 1].id) : (this.tabArr[i + 1].id);
          }
        }
        this.activeTabId = activeId;
        this.tabArr = this.tabArr.filter((tab) => {
          return !isEqual(tab.id, targetId);
        })
      }
    }
  },
  mounted() {

  },
  created() {
    this.$store.commit('addPanelData', 'default');
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

  .panel-button-group {
    flex-direction: row;
    align-items: center;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: center;

    .el-button {
      display: flex;
    }
  }

}


</style>
