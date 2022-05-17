export default [
    {
        "id": "1",
        "typeName": "表单组件",
        "toolArr": [
            {
                "id": "1-1",
                "name": "单行输入",
                "iconName": "folder",
                "code": {
                    "componentTag": "el-input",
                    "type": "password",
                    "placeholder": "请输入文本",
                }
            },
            {
                "id": "1-2",
                "name": "按钮",
                "iconName": "folder",
                "code": {
                    "componentTag": "el-button",
                    "type": "primary",
                    "defaultContent":"按钮"
                }
            }
        ],
        "iconName": "folder"
    },
    {
        "id": "2",
        "typeName": "选择型组件",
        "toolArr": []
    },
    {
        "id": "3",
        "typeName": "布局组件",
        "toolArr": [
            {
                "id": "3-1",
                "name": "行布局",
                "iconName": "folder",
                "displayType":0,
                "code": {
                    "componentTag": "el-row",
                    //行间距
                    "gutter": 0,
                }
            },
        ]
    }
]
