/*
 * @Author: zfowed
 * @Date:   2017-09-27 15:54:52
 * @Last Modified by:   acer
 * @Last Modified time: 2017-12-13 16:00:34
 */

'use strict';

const path = require('path');
const fse = require('fs-extra');
const lodash = require('lodash');

const getPackage = require('./getPackage');
const getReaddir = require('./getReaddir');
const isClass = require('./isClass');
const isAsyncFunction = require('./isAsyncFunction');
const getErrorJson = require('./getErrorJson');


const runUseService = async function (app, key, useService) {
    try {
        let service = null;
        if (isAsyncFunction(useService)) {
            service = await useService(app);
        } else if (lodash.isFunction(useService)) {
            service = useService(app);
        }
        return service;
    } catch (error) {
        const errorInfo = getErrorJson(error);
        app.logger.fatal(`注册 Service [${key}] 错误 -> ${errorInfo}`);
        throw error;
    }
};

const getService = async function (app, dir, paths) {
    let container = {};
    const files = await getReaddir(dir);
    if (!files.length) { return undefined; }
    for (const file of files) {
        const key = lodash.camelCase(file.basename);
        const itemPaths = paths ? `${paths}.${key}` : key;



        if (file.isDirectory) {

            const useService = await getPackage(path.join(file.path, 'index.js'));
            if ( useService ) {
                app.logger.info(`注册 Service [${itemPaths}]`);
                const service = await runUseService(app, key, useService);
                if (lodash.isPlainObject(service) || isClass(service) || lodash.isFunction(service)) {
                    container[key] = service;
                }
            } else {
                container[key] = await getService(app, file.path, itemPaths);
            }

        } else if (file.isFile) {
            app.logger.info(`注册 Service [${itemPaths}]`);
            const useService = await getPackage(file.path);
            const service = await runUseService(app, key, useService);
            if (lodash.isPlainObject(service) || isClass(service) || lodash.isFunction(service)) {
                container[key] = service;
            }
        }
    }
    return container;
};


const getterServicePath = function (object, key, sources, self) {
    let cache = null;
    Object.defineProperty(object, key, {
        configurable: false,
        enumerable: true,
        get() {
            if (cache) { return cache; }
            let _cache;
            if (lodash.isPlainObject(sources)) {
                _cache = {};
                for (const [key, value] of Object.entries(sources)) {
                    getterServicePath(_cache, key, value, self);
                }
            } else if (isClass(sources)) {
                _cache = new sources(self);
                for (var prop of Object.getOwnPropertyNames(sources.prototype)) {
                    if (prop !== 'constructor' && lodash.isFunction(sources.prototype[prop])) {
                        _cache[prop] = sources.prototype[prop].bind(_cache);
                    }
                }
            } else if (lodash.isFunction(sources)) {
                _cache = sources.bind(self);
            } else {
                _cache = sources;
            }
            cache = _cache;
            return cache;
        }
    });
};

module.exports = async function (app, serviceDirPath) {

    await fse.ensureDir(serviceDirPath);

    app.Service = class Service {
        constructor(self) {
            Object.assign(this, self);
        }
    };

    const service = await getService(app, serviceDirPath);

    app.use((ctx, next) => {
        const self = {
            app: app,
            config: app.config,
            database: app.database,
            lodash: lodash,
            ctx: ctx,
            next: next,
            helper: app.helper
        };
        getterServicePath(ctx, 'service', service, self);
        self.service = ctx.service;
        return next();
    });

};