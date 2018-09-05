/*
 * @Author: zfowed
 * @Date:   2017-09-27 15:54:52
 * @Last Modified by:   acer
 * @Last Modified time: 2017-12-05 10:16:18
 */

'use strict';

const fse = require('fs-extra');
const lodash = require('lodash');

const getPackage = require('./getPackage');
const getReaddir = require('./getReaddir');
const isClass = require('./isClass');
const isAsyncFunction = require('./isAsyncFunction');
const getErrorJson = require('./getErrorJson');


const getController = async function (app, dir, paths, self) {
    let container = {};
    const files = await getReaddir(dir);
    // 读取文件夹 获取所有文件的详细信息
    // console.log(files)

    // 如果为空文件夹 则  return 返回Undefine  结束函数
    if (!files.length) { return undefined; }

    for (const file of files) {

        const key = lodash.camelCase(file.basename); // 返回驼峰写法的字符串。
        // console.log(key)
        const itemPaths = paths ? `${paths}.${key}` : key;
        if (file.isDirectory) {
            // 如果为文件夹  则自调用 再次读取文件夹下面的文件信息
            container[key] = await getController(app, file.path, itemPaths, self);
        } else if (file.isFile) {
            app.logger.info(`注册 Controller [${itemPaths}]`);

            // console.log(file.path)

            const useController = await getPackage(file.path);
            //  读取文件夹下面的模块
            let controller = null;
            try {
                if (isAsyncFunction(useController)) {
                    controller = await useController(app);
                } else if (lodash.isFunction(useController)) {
                    controller = useController(app);
                }
            } catch (error) {
                const errorInfo = getErrorJson(error);
                app.logger.fatal(`注册 Controller [${key}] 错误 -> ${errorInfo}`);
                throw error;
            }
            // console.log(Object.getOwnPropertyNames(controller.prototype)) 获取原型下面的方法


            if (isClass(controller)) {
                container[key] = new controller(self);
                for (var prop of Object.getOwnPropertyNames(controller.prototype)) {
                    // console.log(prop)
                    //  console.log(controller.prototype[prop])
                    
                    if (prop !== 'constructor' && lodash.isFunction(controller.prototype[prop])) {
                        container[key][prop] = controller.prototype[prop].bind(container[key]);
                        // console.log(controller.prototype[prop].bind(container[key]))
                    }
                }
            } else if (lodash.isFunction(controller)) {
                container[key] = controller.bind(self);
            }
        }
    }
    // container 为一个对象 对象controller文件夹下 每个文件对象的方法
    return container;
};



module.exports = async function (app, controllerDirPath) {

    await fse.ensureDir(controllerDirPath);

    app.Controller = class Controller {
        constructor(self) {
            Object.assign(this, self);
        }
    };

    return getController(app, controllerDirPath, '', {
        app: app,
        config: app.config,
        database: app.database,
        // service: app.service,
        lodash: lodash,
        helper: app.helper,
    });

};