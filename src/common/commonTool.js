import {toRaw} from "vue";


const isEmpty = (checkObject) => {
    if (checkObject === undefined
        || checkObject === null) {
        return true
    } else if (typeof checkObject === 'object' && Object.keys(checkObject).length === 0) {
        return true
    } else if (typeof checkObject === 'string' && checkObject === '') {
        return true
    } else if ((checkObject instanceof Array) && checkObject.length === 0) {
        return true
    }
    return false
}
const isNotEmpty = (checkObject) => {
    return !isEmpty(checkObject);
}

/**
 * 对象深拷贝
 * @param obj
 * @returns {*[]|*|RegExp|Date}
 */
const deepClone = (obj) => {
    const _toString = Object.prototype.toString

    // null, undefined, non-object, function
    if (!obj || typeof obj !== 'object') {
        return obj
    }

    // DOM Node
    if (obj.nodeType && 'cloneNode' in obj) {
        return obj.cloneNode(true)
    }

    // Date
    if (_toString.call(obj) === '[object Date]') {
        return new Date(obj.getTime())
    }

    // RegExp
    if (_toString.call(obj) === '[object RegExp]') {
        const flags = []
        if (obj.global) {
            flags.push('g')
        }
        if (obj.multiline) {
            flags.push('m')
        }
        if (obj.ignoreCase) {
            flags.push('i')
        }

        return new RegExp(obj.source, flags.join(''))
    }

    const result = Array.isArray(obj) ? [] : obj.constructor ? new obj.constructor() : {}

    for (const key in obj) {
        result[key] = deepClone(obj[key])
    }

    return result
}

/**
 * 生成guid
 * @returns {string}
 */
const getGuid = () => {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
};
/**
 * 通过配置的组件数据判断是否是 布局组件
 * @param item
 * @returns {boolean}  true表示是 布局组件
 */
const isDisplayGroup = (item) => {
    return  item.type === 'display';
}


export default {
    isEmpty,
    isNotEmpty,
    deepClone,
    getGuid,
    isDisplayGroup
}
