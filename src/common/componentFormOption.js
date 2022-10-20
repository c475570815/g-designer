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
            key: 'componentStyle',
            label: '组件样式',
            code: {
                "componentTag": "el-input",
                "placeholder": "请输入组件样式",
                "rows": 2,
                "type": "textarea"
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
            }
        ],
        'span': [],
        'el-button': [],
        'el-date-picker': []
    }
}
