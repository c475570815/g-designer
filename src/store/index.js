import {createStore} from 'vuex'
import toolDetail from "@/common/toolDetail";

export default createStore({
    state: {
        //配置组件中的常量
        componentConstValue: {
            tagName: "componentTag",
            defaultContent: "defaultContent",
            defaultValue: "defaultValue"
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
        getComponentTagName(state) {
            return state.componentConstValue.tagName;
        },
        getDefaultContent(state) {
            return state.componentConstValue.defaultContent;
        },
        getDefaultValue(state) {
            return state.componentConstValue.defaultValue;
        }

    },
    // 处理数据的唯一途径，state的改变或赋值只能在这里
    mutations: {
        changeActiveEditComponentData(state, data) {
            debugger
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
