const {defineConfig} = require('@vue/cli-service')
const path = require('path');
module.exports = defineConfig({
    transpileDependencies: true,
    pluginOptions: {
        "style-resources-loader": {
            preProcessor: "less",
            patterns: [
                // 存放less变量文件的路径
                path.resolve(__dirname, "./src/less/main.less")
            ]
        }
    }, css: {
        loaderOptions: {
            less: {
                lessOptions: {
                    modifyVars: {
                        'primary-color': '#ec6800'
                    },
                    javascriptEnabled: true,
                },
            },
        },
    }
})
