<template>
  <el-card
      class="toolbox-card box-card component-design-form">
    <template #header>
      <div class="card-header">
        <span>组件属性</span>
      </div>
    </template>
    <el-form :model="formState.form" label-width="80px">
      <el-form-item label="id">
        <el-input v-model="componentId" disabled placeholder="Please input"/>
      </el-form-item>
      <component-design-item
          :ref="`${componentId}-${option.key}`"
          v-for="(option,index) in formOptions"
          :key="index"
          :value="formState.form[option.key]"
          :item-key="option.key"
          :param="option"
          @changeValue="changeFormValue"
      />
    </el-form>
  </el-card>

</template>

<script scoped>
import bus from "@/bus";
import formOption from "@/common/componentFormOption";
import ComponentDesignItem from "@/views/dsign/component-design-item";
import {reactive} from "vue";
import {cloneDeep, isEqual} from "lodash";
import {mapState} from "vuex";
import {designPropertyValueFormat} from "@/common/dataFormat";

export default {
  name: "component-design",
  props: {
    componentId: {required: true, type: String}
  },
  components: {ComponentDesignItem},
  data() {
    return {}
  },
  setup() {
    const formState = reactive({
      form: {}
    });
    return {
      formState // 导出响应式数组
    }
  },
  computed: {
    ...mapState({
      formOptions(state) {
        let res
        if (this.$common.isEmpty(formOption.tag[this.componentData.componentTag])) {
          //没有单独属性配置的组件
          res = [
            ...formOption.common
          ];
        } else {
          res = [
            ...formOption.common,
            ...formOption.tag[this.componentData.componentTag]
          ];
        }
        for (let option of res) {
          if (this.$common.isNotEmpty(option)) {
            let value = this.componentData[option.key];
            //按属性转换
            value = Object.keys(designPropertyValueFormat).includes(option.key)
                ? designPropertyValueFormat[option.key](value)
                : value
            this.formState.form[option.key] = this.$common.isEmpty(value) ? '' : value;
          }
        }
        return res;
      },
      componentData: state => state.activeEditComponentData.componentData,
      displayContainerId: state => state.activeEditComponentData.displayContainerId,
    })
  },
  methods: {
    changeFormValue(key, value) {
      if (!isEqual(this.formState.form[key], value)) {
        this.formState.form[key] = value;
        //更改全局active
        let componentData = cloneDeep(this.componentData);
        componentData[key] = value;
        this.$store.commit('changeActiveEditComponentData',
            {
              //当前编辑的组件id
              id: this.componentId,
              //当前编辑的组件所属展示主键
              displayContainerId: this.displayContainerId,
              //当前编辑的组件数据
              componentData: componentData,
            }
        );
        //通知更改展示
        bus.$emit(`changeComponent-${this.displayContainerId}`
            , {
              componentId: this.componentId,
              componentData: componentData
            })
      }

    }
  },
  mounted() {
  },
  created() {
  }
}
</script>

<style lang="less" scoped>

.component-design-form {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: center;
  align-content: center;

  span {
    margin: 10px;
  }

  .el-form {
    margin: 2vw 2vh;
  }
}

</style>
