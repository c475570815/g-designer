import {isEmpty} from "lodash";
import common from "@/common/commonTool";

const toString = (value) => {
    return JSON.stringify(value);
}

/**
 * 按标签转换
 * @type {{"el-input": (function(*): string)}}
 */
export const tagValueFormat = {
    "el-input": toString
}

/**
 * 按属性转换
 * @type {{}}
 */
export const propertyValueFormat = {
    "style": (data) => {
        let res = data;
        if (common.isEmpty(data)) {
            res = "";
        } else if (typeof data === 'object') {
            let keyArr = Object.keys(data)
            let valueArr = Object.values(data)
            res = "";
            for (let i = 0; i < keyArr.length; i++) {
                let key = keyArr[i];
                let value = valueArr[i];
                res = res.concat(`${key}:${value};`)
            }
        }
        return res;
    }
}
