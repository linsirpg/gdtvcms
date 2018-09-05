/*
 * @Author: zfowed
 * @Date:   2017-09-27 15:54:52
 * @Last Modified by:   zfowed
 * @Last Modified time: 2017-10-28 00:05:13
 */

'use strict';

module.exports = function (error) {
    // 转为  字符串格式的对象
    return JSON.stringify({
        name: error.name,
        message: error.message,
        stack: error.stack
    })
};