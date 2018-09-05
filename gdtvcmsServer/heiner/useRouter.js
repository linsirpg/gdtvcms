/*
 * @Author: zfowed
 * @Date:   2017-09-27 15:54:52
 * @Last Modified by:   acer
 * @Last Modified time: 2017-12-05 18:05:26
 */

'use strict';

const path = require('path');

const Router = require('koa-router');
const fse = require('fs-extra');
const lodash = require('lodash');

const getPackage = require('./getPackage');
const getReaddir = require('./getReaddir');
const isAsyncFunction = require('./isAsyncFunction');
const getErrorJson = require('./getErrorJson');



module.exports = async function (app, routerDirPath, controller) {

    // 确保文件夹存在
    await fse.ensureDir(routerDirPath);

    const self = {
        app: app,
        config: app.config,
        database: app.database,
        lodash: app.helper.lodash,
        helper: app.helper
    };

    const files = await getReaddir(routerDirPath);
    // console.log(files) // 获取 router文件夹下面的所有文件
    if (!files.length) { return undefined; }  // 如果为空 就返回 undefined 停止函数的执行
    for (const file of files) {
        if (file.isFile && file.extname === '.js') {
            const useMiddleware = await getPackage(file.path);
            // console.log(useMiddleware)
            const key = file.basename
            app.logger.info(`注册 Router [${key}]`);
            let router;
            let itemController = null;
            if (key === 'index') {
                itemController = controller;
                router = new Router();
            } else {
                itemController = controller[key];
                router = new Router({
                    prefix: `/${key}`
                });
            }
            try {
                if (isAsyncFunction(useMiddleware)) {
                    await useMiddleware.call(self, router, itemController);
                } else if (lodash.isFunction(useMiddleware)) {
                    useMiddleware.call(self, router, itemController);
                }
            } catch (error) {
                const errorInfo = getErrorJson(error);
                app.logger.fatal(`注册 Router [${key}] 错误 -> ${errorInfo}`);
                throw error;
            }
            app.use(router.routes());
        }
    }


};