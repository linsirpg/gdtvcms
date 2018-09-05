/*
 * @Author: zfowed
 * @Date:   2017-09-27 15:54:52
 * @Last Modified by:   zfowed
 * @Last Modified time: 2017-10-28 00:05:13
 */

'use strict';

const path = require('path');

const fse = require('fs-extra');
const lodash = require('lodash');

const getPackage = require('./getPackage');
const isAsyncFunction = require('./isAsyncFunction');
const getErrorJson = require('./getErrorJson');



module.exports = async function (app, middlewareDirPath, { mark, options }) {

    // 确保文件夹存在

    await fse.ensureDir(middlewareDirPath);
    for (const key of mark) {
        // console.log(mark)
        const useMiddleware = await getPackage(path.join(middlewareDirPath, `${key}.js`));
        let middleware = null;
        app.logger.info(`注册 Middleware [${key}]`);
        try {
            if (isAsyncFunction(useMiddleware)) {
                middleware = await useMiddleware(options[key], app);
            } else if (lodash.isFunction(useMiddleware)) {
                middleware = useMiddleware(options[key], app);
            }
        } catch (error) {
            const errorInfo = getErrorJson(error);
            app.logger.fatal(`注册 Middleware [${key}] 错误 -> ${errorInfo}`);
            throw error;
        }
        if (lodash.isFunction(middleware)) {
            app.use(middleware);
        }
    }

};