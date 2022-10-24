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
    //获取约定的标签名称
    let {
        tagName,
        defaultContentName,
        defaultValueName,
        isComponentName,
        valueFiledName
    } = store.getters.getComponentConstValueKeyName
    //取值
    let componentTag = tagData[tagName];
    let isComponent = isEmpty(tagData[isComponentName]) ? true : tagData[isComponentName];
    let defaultContent = isEmpty(tagData[defaultContentName]) ? "" : tagData[defaultContentName];
    let defaultValue = isEmpty(tagData[defaultValueName]) ? "" : tagData[defaultValueName];
    let valueFiled = isEmpty(tagData[valueFiledName]) ? "modelValue" : tagData[valueFiledName];
    //排除特殊约定的组件属性,剩下为组件自身属性
    let outPutKeyArr = Object.values(store.getters.getComponentConstValueKeyName)
    let keys = Object.keys(tagData);
    let param = {}
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        if (outPutKeyArr.indexOf(key) < 0) {
            param[key] = tagData[key];
        }
    }
    return {param, componentTag, defaultContent, defaultValue, isComponent, valueFiled};
}

export default {
    isEmpty,
    isNotEmpty,
    getGuid,
    isDisplayGroup,
    handleConfigComponentData
}
