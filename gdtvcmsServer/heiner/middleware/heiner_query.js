/*
* @Author: zfowed
* @Date:   2017-09-27 16:44:15
* @Last Modified by:   zfowed
* @Last Modified time: 2017-10-28 00:05:16
*/

'use strict';

const koaQs = require('koa-qs')

module.exports = async (option, app) => {
    koaQs(app);
    return null;
};