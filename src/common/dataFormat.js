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
export const designPropertyValueFormat = {
    style: (data) => {
        try {
            let res = data;
            if (common.isEmpty(data)) {
                res = "";
            } else if (typeof data === 'object') {
                res = toString(data);
                // res = res.replaceAll("{", "{\n");
                // res = res.replaceAll("}", "\n}");
                // res = res.replaceAll(";", ";\n");


                res = res.replaceAll("{", "");
                res = res.replaceAll("}", "");
                res = res.replaceAll("\"", "");
            } else if (typeof res === 'string' && res.indexOf("{") < 0) {
                // res = `{\n${res}\n}`
            }
            return res;
        } catch (e) {
            return data;
        }
    }
}
export const domPropertyValueFormat = {
    style: (data) => {
        try {
            let res = data;
            if (common.isEmpty(data)) {
                res = "";
            } else if (typeof res === 'string' && res.indexOf(":") > 0) {
                res = res.replaceAll("{", "")
                res = res.replaceAll("}", "")
                res = res.replaceAll("\n", "")
                res = res.replaceAll("\"", "")
            }
            return res;
        } catch (e) {
            return data;
        }
    }
}
