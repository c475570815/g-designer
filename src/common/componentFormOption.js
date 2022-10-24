export default {
    common: [
        {
            key: 'span',
            label: '表单栅格',
            code: {
                "componentTag": "el-input-number",
                "min": 1,
                "max": 24,
                "defaultValue": 4
            }
        }, {
            key: 'fieldName',
            label: '字段名',
            code: {
                "componentTag": "el-input",
                "placeholder": "请输入字段名称"
            }
        }, {
            key: 'style',
            label: '组件样式',
            code: {
                "valueFiledName": "value",
                "componentTag": "Codemirror",
                // "defaultValue": "{\n\n}",
                options: {
                    mode: "text/css", // 语言模式
                    theme: "idea", // 主题
                    lineNumbers: true, // 显示行号
                    smartIndent: true, // 智能缩进
                    indentUnit: 2, // 智能缩进单位为4个空格长度
                    foldGutter: true, // 启用行槽中的代码折叠
                    styleActiveLine: true, // 显示选中行的样式
                    autofocus: true,
                },
                // onCursorActivity: (codemirror) => {
                //     codemirror.showHint();
                // }
            }
        }
    ],
    tag: {
        'el-input': [
            {
                key: 'type',
                label: '输入类型',
                code: {
                    "componentTag": "el-input",
                    "placeholder": "请输入输入类型"
                }
            },
            {
                key: 'placeholder',
                label: '提示信息',
                code: {
                    "componentTag": "el-input",
                    "placeholder": "提示输入信息"
                }
            }
        ],
        'span': [
            {
                key: 'defaultContent',
                label: '显示值',
                code: {
                    "componentTag": "el-input",
                    "placeholder": "输入显示值",
                    "defaultContent": "标签"
                }
            }
        ],
        'el-button': [],
        'el-date-picker': []
    },
    valueFormat: {}
}
