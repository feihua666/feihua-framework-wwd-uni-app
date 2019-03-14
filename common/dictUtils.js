import store from '../store'
import config from '@/common/config.js'

const _getDictByType = function(type){
    let storeDicts = store.state.dicts
    let temp = storeDicts[type]
    let exclude = config.dictExcludeValue[type]
    if( exclude && temp){
        let _temp = []
        for(let i = 0;i < temp.length;i++) {
            let dict = temp[i]
            let exist = false
            for(let j=0;j < exclude.length;j++){
                if(dict.value == exclude[j]){
                    exist = true
                    break
                }
            }
            if(!exist){
                _temp.push(dict)
            }
        }
        temp = _temp
    }
    return temp
}
const _getLabelByValue = function (type,value,defaultValue) {
    let r = null
    let storeDicts = _getDictByType(type)
    if(storeDicts){
        for(let i = 0;i < storeDicts.length;i++){
            let dict = storeDicts[i]
            if(dict.value == value){
                r = dict.name
                break
            }
        }
    }
    if(!r && defaultValue){
        r = defaultValue
    }
    return r || ''
}
const _getLabelsByValues = function (type,value) {
    let r = []
    let storeDicts = _getDictByType(type)
    let valueArray = value.split(',')
    if(storeDicts){

        for(let i = 0;i < storeDicts.length;i++){
            let dict = storeDicts[i]
            for(let j=0;j<valueArray.length;j++){
                let _value = valueArray[j]
                if(dict.value == _value){
                    r.push(dict.name)
                    break
                }
            }
        }
    }

    return r.join(',')
}

export default {
    // 获取单个字典文本
    getLabelByValue:_getLabelByValue,
    // 获取多个值字典文本，多个value请以逗号分隔
    getLabelsByValues:_getLabelsByValues,
    // 获取字典数组
    getDictByType:_getDictByType

}
