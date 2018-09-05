/*
 * @Author: zfowed
 * @Date:   2017-09-27 15:54:52
 * @Last Modified by:   zfowed
 * @Last Modified time: 2017-10-28 00:05:13
 */

'use strict';

// 判断是否是 async 函数
const lodash = require('lodash');

const AsyncFunction = Object.getPrototypeOf(async function () { }).constructor;
module.exports = function (value) {
    // console.log(lodash.isFunction(value) && Object.getPrototypeOf(value).constructor === AsyncFunction)

    // 判断是否为  async 函数
    
    return lodash.isFunction(value) && Object.getPrototypeOf(value).constructor === AsyncFunction;
};