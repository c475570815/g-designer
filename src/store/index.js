import {createStore} from 'vuex'
import toolDetail from "@/common/toolDetail";
// import {toRaw} from "vue";

export default createStore({
    // 共同维护的一个状态，state里面可以是很多个全局状态
    state: {
        toolData: toolDetail,
        toolGroupName: 'toolGroup',
    },
    // 获取数据并渲染
    getters: {
        getToolData(state) {
            return state.toolData;
        },
        getToolGroupName(state) {
            return state.toolGroupName
        }

    },
    // 处理数据的唯一途径，state的改变或赋值只能在这里
    mutations: {},
    // 数据的异步操作
    actions: {},
    modules: {}
})
