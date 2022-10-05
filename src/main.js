import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElIcons from '@element-plus/icons-vue'
import commonTool from "@/common/commonTool";
import axios from "@/axios";
import 'dayjs/locale/zh-cn' //中文
import locale from 'element-plus/lib/locale/lang/zh-cn' //中文


//布局型主键
import componentShowRowDisplay from "@/components/component-show/component-show-row-display";

const displayComponentItem = [componentShowRowDisplay];


const app = createApp(App)


//加载所有图标为全局组件
for (const name in ElIcons) {
    app.component(name, ElIcons[name])
}

//全局引用
app.use(ElementPlus,{locale})
app.use(store)
app.use(router)
displayComponentItem.forEach((item) => {
    app.component(item.name, item);
})
app.mount('#app')

//全局变量
app.config.globalProperties.$common = commonTool
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$store = store;
