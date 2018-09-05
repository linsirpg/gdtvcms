/*
 * @Author: zfowed
 * @Date:   2017-09-27 15:54:52
 * @Last Modified by:   zfowed
 * @Last Modified time: 2017-10-28 00:05:13
 */

'use strict';

const path = require('path');
const getPackage = require('./getPackage');

// 整个app 的基本信息
module.exports = async function (rootDirPath, appDirPath) {
    let appInfo = {};
    appInfo.pkg = await getPackage(path.join(rootDirPath, './package.json'));
    appInfo.name = appInfo.pkg ? appInfo.pkg.name : null;
    appInfo.baseDir = appDirPath;
    appInfo.root = rootDirPath;
    appInfo.ServerUrl = "https://dvcms.weixinmvp.com"
    // appInfo.ServerUrl = "http://mhimg.orz3.top"
    appInfo.appid = 'gdtvtest'
    return appInfo;
};

