export default [
    {
        "id": "1",
        "typeName": "表单组件",
        "toolArr": [
            {
                "id": "1-1",
                "name": "单行输入",
                "type": "use",
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
                "type": "use",
                "iconName": "folder",
                "code": {
                    "componentTag": "el-button",
                    "type": "primary",
                    "defaultContent": "按钮"
                }
            },
            {
                "id": "1-3",
                "name": "时间选择器",
                "type": "use",
                "iconName": "folder",
                "code": {
                    "componentTag": "el-date-picker",
                    "type": "daterange",
                    "range-separator":"至",
                    "start-placeholder":"开始时间",
                    "end-placeholder":"结束时间",
                    "style": {
                        width: "250px"
                    }
                }
            },
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
                "type": "display",
                "iconName": "folder",
                "code": {
                    "componentTag": "component-show-row-display",
                    //行间距
                    "gutter": 0,
                    "style": {
                        height: "70px"
                    }
                }
            },
        ]
    }
]
