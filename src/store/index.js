import {createStore} from 'vuex'
import toolDetail from "@/common/toolDetail";
import formOption from "@/common/componentFormOption";

export default createStore({
    state: {
        //配置组件中的常量
        componentConstValueKeyName: {
            //标签名称
            tagName: "componentTag",
            //默认子内容
            defaultContentName: "defaultContent",
            //默认value
            defaultValueName: "defaultValue",
            //是否是模块
            isComponentName: "isComponentTag",
            //布局属性
            spanName: "span",
            //单独指定值字段名称
            valueFiledName: "valueFiledName"
        },
        //配置组件数据
        configToolData: toolDetail,
        // 布局组件 的draggable 组件的group名称
        displayComponentGroupName: 'displayGroup',
        // 布局组件 的draggable 组件的group名称
        useComponentGroupName: 'useGroup',
        activeEditComponentData: {
            //当前编辑的组件id
            id: '',
            //当前编辑的组件所属展示主键
            displayContainerId: '',
            //当前编辑的组件数据
            componentData: {},
        },
    },
    // 获取数据并渲染
    getters: {
        getActiveEditComponentData(state) {
            return state.activeEditComponentData;
        },
        getConfigToolData(state) {
            return state.configToolData;
        },
        displayComponentGroupName(state) {
            return state.displayComponentGroupName
        },
        useComponentGroupName(state) {
            return state.useComponentGroupName
        },
        getComponentConstValueKeyName(state) {
            return state.componentConstValueKeyName
        }
    },
    // 处理数据的唯一途径，state的改变或赋值只能在这里
    mutations: {
        changeActiveEditComponentData(state, data) {
            state.activeEditComponentData = data;
        },
        setActiveEditComponentDataEmpty(state) {
            state.activeEditComponentData = {id: '', displayContainerId: '', componentData: undefined};
        }
    },
// 数据的异步操作
    actions: {}
    ,
    modules: {}
})
