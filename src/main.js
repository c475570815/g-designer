import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElIcons from '@element-plus/icons-vue'
import commonTool from "@/common/commonTool";
import axios from "@/axios";

const app = createApp(App)


//加载所有图标为全局组件
for (const name in ElIcons) {
    app.component(name, ElIcons[name])
}

//全局引用
app.use(ElementPlus)
app.use(store)
app.use(router)
app.mount('#app')

//全局变量
app.config.globalProperties.$common = commonTool
app.config.globalProperties.$axios = axios;

//配置文件读取
$axios.get('static/toolDetail.json').then((res) => {
    let apiUrl = res.data.apiUrl;
    console.log('apiUrl ' + apiUrl);
    axios.defaults.baseURL = apiUrl;
}).catch(err => {
    console.log("apiUrl " + err);
})