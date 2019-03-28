const isArray = function (obj) {
    if (Array.isArray) {
        return Array.isArray(obj)
    } else {
        return Object.prototype.toString.call(obj) === '[object Array]'
    }
}
const copy = function (message) {
    // #ifndef H5
    uni.setClipboardData({
        data:message,
        success(res) {
            uni.showToast({
                icon: 'none',
                title: '复制成功'
            });
        }
    })
    // #endif
    // #ifdef H5
    // 多年以\n分隔
    let input = document.createElement("textarea");
    input.readOnly = "readOnly"
    input.value = message;
    document.body.appendChild(input);
    input.select();
    input.setSelectionRange(0, input.value.length);
    document.execCommand('Copy');
    document.body.removeChild(input);
    uni.showToast({
        icon: 'none',
        title: '复制成功'
    });

    // #endif
}
// 导航
const navigate = {
    // navigateTo
    ngt(url){
        uni.navigateTo({
            url: url
        });
    },
    // navigateRelunch
    ngr(url){
        uni.reLaunch({
            url:url
        })
    }
}
// 图片
const pic = {
    // urls为图片url，如果为 字符串类型，只接收一个参数，如果为数组，可指定第二个参数
    pvi(urls,url){
        let param = {
        }
        if(typeof urls == 'string'){
            param.urls = [urls]
        }else{
            param.urls = urls
            if(url){
                param.current = url
            }
        }

        uni.previewImage(param)
    }
}
const message = {
    success (msg) {
        uni.showToast({
            title: msg,
            icon: 'none'
        })
    },
    error (msg) {
        uni.showToast({
            title: msg,
            icon: 'none'
        })
    }
}
const genderIcon = function (gender) {
    if ('female' == gender) {
        return 'icon-nv'
    } else if ('male' == gender) {
        return 'icon-nan'
    }
}
const date = {
    dateFomat:function (dateStr) {
        if (dateStr) {
            return dateStr.substring(0, 10)
        }
        return ''
    },
    dateFomatWeek:function (dateStr) {
        var arr = ['活动时间:','','','']
        var weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

        if (dateStr) {
            arr[1] = dateStr.substring(0, 10)
            var myDate = new Date(Date.parse(arr[1].replace(/-/g, "/")));
            arr[2] = weekDay[myDate.getDay()]
            arr[3] = dateStr.substring(11, 16)
            return arr.join(" ")
        }
        return ''
    },
    nowDate(){
        let date = new Date()
        let y = date.getFullYear();
        let m = "0"+(date.getMonth()+1);
        let d = "0"+date.getDate();
        let r = y + "-" + m.substring(m.length-2,m.length) + "-" + d.substring(d.length-2,d.length);

        return r;
    }
}

export default {
    isArray: isArray,
    copy: copy,
    n: navigate,
    pic: pic,
    message: message,
    date: date,
    genderIcon: genderIcon


}
