import {createStore} from 'vuex'
import toolDetail from "@/common/toolDetail";

export default createStore({
    state: {
        //配置组件中的常量
        componentConstValue: {
            tagName: "componentTag",
            defaultContent: "defaultContent"
        },
        //配置组件数据
        configToolData: toolDetail,
        // 布局组件 的draggable 组件的group名称
        displayComponentGroupName: 'displayGroup',
        // 布局组件 的draggable 组件的group名称
        useComponentGroupName: 'useGroup',
    },
    // 获取数据并渲染
    getters: {
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
        }

    },
    // 处理数据的唯一途径，state的改变或赋值只能在这里
    mutations: {
    },
    // 数据的异步操作
    actions: {},
    modules: {}
})
