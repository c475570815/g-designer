import {isEmpty} from "lodash";
import common from "@/common/commonTool";

const cssRegExp = new RegExp("(?<=\{).*(?=})")

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
                //配置文件预制的
                res = toString(data);
                res = res.replaceAll("{", "{\n");
                res = res.replaceAll("}", "\n}");
                // res = res.replaceAll(";", ";\n");
                res = res.replaceAll("\"", "");
            } else if (typeof res === 'string' && res.indexOf("{") < 0) {
                //从dom同步过来的
                res = res.replaceAll(";", ";\n")
                res = `{\n${res}\n\n}`
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
                res = res.replaceAll("\n", "")
                res = cssRegExp.exec(res)[0]
            }
            return res;
        } catch (e) {
            return data;
        }
    }
}
