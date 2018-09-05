/*
* @Author: zfowed
* @Date:   2017-09-27 16:46:37
* @Last Modified by:   zfowed
* @Last Modified time: 2017-10-28 00:05:17
*/

'use strict';

const koaViews = require('koa-views');
const path = require('path');

module.exports = async (option, app) => {
    return koaViews(path.join(app.appInfo.root, option.root), option);
};


// 模板引擎