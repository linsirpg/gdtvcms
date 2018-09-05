/*
 * @Author: zfowed
 * @Date:   2017-09-27 15:54:52
 * @Last Modified by:   acer
 * @Last Modified time: 2017-12-07 17:29:07
 */

'use strict';

const path = require('path');
const lodash = require('lodash');
const defaultConfig = require('./config');
const getPackage = require('./getPackage');

module.exports = async function (configDirPath, env) {
    let config = lodash.mergeWith({ env }, defaultConfig);
    const configDefault = await getPackage(path.join(configDirPath, './default.js'));
    const configActive = await getPackage(path.join(configDirPath, `./${env}.js`));
    if (typeof configDefault === 'object') {
        config = lodash.mergeWith(config, configDefault, function (objValue, srcValue) {
            if (lodash.isArray(objValue)) {
                return lodash.difference(objValue, srcValue).concat(srcValue);
            }
        });
    }
    if (typeof configActive === 'object') {
        config = lodash.mergeWith(config, configActive, function (objValue, srcValue) {
            if (lodash.isArray(objValue)) {
                return lodash.difference(objValue, srcValue).concat(srcValue);
            }
        });
    }

    return config;
};