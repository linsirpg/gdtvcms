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
const Sequelize = require('sequelize');

const getPackage = require('./getPackage');
const getReaddir = require('./getReaddir');
const getErrorJson = require('./getErrorJson');
const isAsyncFunction = require('./isAsyncFunction');


const Op = Sequelize.Op;
const operatorsAliases = {
    $eq: Op.eq,
    $ne: Op.ne,
    $gte: Op.gte,
    $gt: Op.gt,
    $lte: Op.lte,
    $lt: Op.lt,
    $not: Op.not,
    $in: Op.in,
    $notIn: Op.notIn,
    $is: Op.is,
    $like: Op.like,
    $notLike: Op.notLike,
    $iLike: Op.iLike,
    $notILike: Op.notILike,
    $regexp: Op.regexp,
    $notRegexp: Op.notRegexp,
    $iRegexp: Op.iRegexp,
    $notIRegexp: Op.notIRegexp,
    $between: Op.between,
    $notBetween: Op.notBetween,
    $overlap: Op.overlap,
    $contains: Op.contains,
    $contained: Op.contained,
    $adjacent: Op.adjacent,
    $strictLeft: Op.strictLeft,
    $strictRight: Op.strictRight,
    $noExtendRight: Op.noExtendRight,
    $noExtendLeft: Op.noExtendLeft,
    $and: Op.and,
    $or: Op.or,
    $any: Op.any,
    $all: Op.all,
    $values: Op.values,
    $col: Op.col
};

const createDatabase = async function (app, databaseDirPath, option) {
    // 确保文件夹存在
    await fse.ensureDir(databaseDirPath);

    option = lodash.mergeWith({
        database: 'core',
        username: null,
        password: null,
        options: {
            dialect: 'sqlite',
            logging: null,
            define: {
                createdAt: false,
                updatedAt: false
            },
        }
    }, option);


    if (option.options.dialect === 'sqlite') {
        option.options.storage = path.join(databaseDirPath, 'sqlite.db');
    }

    option.options.operatorsAliases = operatorsAliases;

    const sequelize = new Sequelize(
        option.database,
        option.username,
        option.password,
        option.options
    );


    try {
        app.logger.info(`连接数据库 [${option.options.dialect} -h ${option.options.host} -u ${option.username} -D ${option.database}]`);
        // await sequelize.authenticate();
        // await sequelize.sync();
    } catch (error) {
        const errorInfo = getErrorJson(error);
        app.logger.fatal(`连接数据库出错 ${errorInfo}`);
        throw error;
    }

    const container = { $Sequelize: Sequelize, $sequelize: sequelize, models: {} };

    const databaseModelDirPath = path.join(databaseDirPath, 'models');
    await fse.ensureDir(databaseModelDirPath);
    const modelFiles = await getReaddir(databaseModelDirPath);
    for (const modelFile of modelFiles) {
        if (modelFile.isFile) {
            let key = lodash.camelCase(modelFile.basename);
            const importInit = await getPackage(modelFile.path);
            container.models[modelFile.basename] = sequelize.import(key, importInit);
        }
    }

    const databaseIndex = await getPackage(path.join(databaseDirPath, '/index.js'))

    if (isAsyncFunction(databaseIndex)) {
        await databaseIndex(container);
    } else if (lodash.isFunction(databaseIndex)) {
        databaseIndex(container);
    }

    return container;
};


module.exports = async function (app, databaseDirPath, options) {

    let database = { $Sequelize: Sequelize };

    for (const [key, option] of Object.entries(options)) {
        if (!option) { continue; }
        database[key] = await createDatabase(app, path.join(databaseDirPath, key), option);
    }

    app.database = database;
    app.context.database = database;

};