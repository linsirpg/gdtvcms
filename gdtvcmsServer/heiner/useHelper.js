/*
 * @Author: zfowed
 * @Date:   2017-09-27 15:54:52
 * @Last Modified by:   acer
 * @Last Modified time: 2017-12-13 15:01:28
 */

'use strict';

const path = require('path');
const fse = require('fs-extra');
const lodash = require('lodash');

const getPackage = require('./getPackage');
const getReaddir = require('./getReaddir');

const getHelperPackage = function (app, packageMark) {
    let container = {};
    for (const [key, mark] of Object.entries(packageMark)) {
        app.logger.info(`注册 Helper [${key}]`);
        container[key] = require(mark);
    }
    return container;
};

const getHelper = async function (app, dir, paths) {
    let container = {};
    const files = await getReaddir(dir);
    if (!files.length) { return undefined; }
    for (const file of files) {
        const key = lodash.camelCase(file.basename);
        const itemPaths = paths ? `${paths}.${key}` : key;
        if (file.isDirectory) {
            const pkg = await getPackage(path.join(file.path, 'index.js'));
            if (pkg) {
                app.logger.info(`注册 Helper [${itemPaths}]`);
                container[key] = pkg;
            } else {
                container[key] = await getHelper(app, file.path, itemPaths);
            }
        } else if (file.isFile) {
            app.logger.info(`注册 Helper [${itemPaths}]`);
            container[key] = await getPackage(file.path);
        }
    }
    return container;
};


module.exports = async function (app, packageMark, helperDirPath) {

    await fse.ensureDir(helperDirPath);
    const helperPackage = getHelperPackage(app, packageMark);
    const helper = await getHelper(app, helperDirPath);
    
    const merge = lodash.mergeWith(helper, helperPackage);

    app.helper = merge;
    app.context.helper = merge;
    
};