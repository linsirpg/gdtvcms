/*
 * @Author: zfowed
 * @Date:   2017-09-27 15:54:52
 * @Last Modified by:   zfowed
 * @Last Modified time: 2017-10-28 00:05:13
 */


// 判断是否为构造函数

'use strict';

const lodash = require('lodash');

module.exports = function (value) {
    // console.log(value)
    if (!lodash.isFunction(value)) {
    	// lodash.isFunction   检查 value 是否是 Function 对象。 
    	// 如果 value 是一个函数，那么返回 true，否则返回 false。
        return false;
    }
    const valueString = lodash.trim(value.toString());
    // 从string字符串中移除后面的 空格 或 指定的字符
    // console.log(lodash.startsWith(valueString, 'class'))
    if (!lodash.startsWith(valueString, 'class')) {
    	// 检查字符串 valueString 是否以 class 开头。
        return false;
    }
    // 判断是否是一个构造函数
    return true;
};