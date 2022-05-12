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

export default {
    isEmpty,
    isNotEmpty
}