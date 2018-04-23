/**
 * 只允许录入汉字限制。
 * @returns
 */
var onlyNum = function() {
    if(event.shiftKey) {
        event.returnValue=false;
        return;
    }
    if(!(event.keyCode==46)&&!(event.keyCode==8)&&!(event.keyCode==37)&&!(event.keyCode==39))
        if(!((event.keyCode>=48&&event.keyCode<=57)||(event.keyCode>=96&&event.keyCode<=105)))
            event.returnValue=false;
};

/**
 * 截取字符串。
 * @param str 源串。
 * @param expectLen 截取长度（非拉丁语系的字符占两位）
 * @returns
 */
var substr = function(str, expectLen) {
    var len1Sum = 0;
    var len2Sum = 0;
    var okLen = 0;
    for(var i = 0; i < expectLen; i++) {
        if (str.charCodeAt(i) > 255) {
            len2Sum += 2;
        } else {
            len1Sum += 1;
        }
        okLen += 1;
        if (len2Sum + len1Sum == expectLen) {
            return (str.substring(0, okLen));
            break;
        }
        if (len2Sum + len1Sum > expectLen) {
            return (str.substring(0,okLen - 1)); 
            break;
        }
    }
};

/**
 * 实现字符串的格式化输出。
 * @param str 模板字符串。
 * @returns 格式化字符串。
 */
var format = function(str){
    if (arguments.length == 0) {
        return null;
    }
    var args = Array.prototype.slice.call(arguments, 1);
    return str.replace(/\{(\d+)\}/g, function(m, i){
        return args[i];
    });
};