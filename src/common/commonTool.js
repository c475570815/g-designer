import store from "@/store";


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
    return item.type === 'display';
}

const handleConfigComponentData = (tagData) => {
    let componentTagName = store.getters.getComponentTagName;
    let componentTag = tagData[componentTagName];
    let defaultContentTag = store.getters.getDefaultContent;
    let defaultValueTag = store.getters.getDefaultValue;
    let outPutKeyArr = [componentTagName, defaultContentTag, defaultValueTag]
    let keys = Object.keys(tagData);
    let param = {}
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        if (outPutKeyArr.indexOf(key) < 0) {
            param[key] = tagData[key];
        }
    }
    let defaultContent = isEmpty(tagData[defaultContentTag]) ? "" : tagData[defaultContentTag];
    let defaultValue = isEmpty(tagData[defaultValueTag]) ? "" : tagData[defaultValueTag];
    return {param, componentTag, defaultContent, defaultValue};
}

export default {
    isEmpty,
    isNotEmpty,
    getGuid,
    isDisplayGroup,
    handleConfigComponentData
}
