import {createStore} from 'vuex'
import toolDetail from "@/common/toolDetail";
// import {toRaw} from "vue";

export default createStore({
    // 共同维护的一个状态，state里面可以是很多个全局状态
    state: {
        componentConstValue: {
            tagName: "componentTag",
            defaultContent: "defaultContent"
        },
        configToolData: toolDetail,
        toolGroupName: 'toolGroup',
        showToolArr: []
    },
    // 获取数据并渲染
    getters: {
        getConfigToolData(state) {
            return state.configToolData;
        },
        getToolGroupName(state) {
            return state.toolGroupName
        },
        getShowToolArr(state) {
            return state.showToolArr;
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
        addShowTool(state, data) {
            state.showToolArr.push(data);
        }
    },
    // 数据的异步操作
    actions: {},
    modules: {}
})
