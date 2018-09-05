/*
 * @Author: zfowed
 * @Date:   2017-09-27 15:54:52
 * @Last Modified by:   acer
 * @Last Modified time: 2017-12-13 14:04:31
 */

'use strict';


const uid = require('uid');
const path = require('path');

const Koa = require('koa');

const getPackage = require('./getPackage');
const getAppInfo = require('./getAppInfo');
const getConfig = require('./getConfig');
const getLog4js = require('./getLog4js');

const getController = require('./getController');

const useDatabase = require('./useDatabase');
const useSession = require('./useSession');
const useHelper = require('./useHelper');
const useService = require('./useService');
const useMiddleware = require('./useMiddleware');
const useRouter = require('./useRouter');

const argv = require('yargs').argv;

const init = async function (rootDirPath, pathConfig) {

    const app = new Koa();

    const env = process.env.NODE_ENV || argv.NODE_ENV || 'dev'


    function getClientIp(req) {
        return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    };




    app.use(async function (ctx, next) {
        ctx.state.requestMark = uid(8);
        ctx.state.requestTime = new Date();
        ctx.state.requestIp = getClientIp(ctx.req);
        ctx.logger = app.log4js.request;
        await next();
        const consumption = new Date() - ctx.state.requestTime;
        const nowDate = new Date()
        console.log(ctx.request.body)
        ctx.logger.trace(`${global.LoginName} ${ctx.state.requestIp} ${nowDate} ${ctx.method} ${ctx.url} ${ctx.status} ${consumption}ms ${JSON.stringify(ctx.request.body)}`);
        
    });


    app.on('error', (err, ctx) => {
        const consumption = new Date() - ctx.state.requestTime;
        ctx.logger.error(`${ctx.state.requestMark} ${ctx.state.requestIp} ${ctx.method} ${ctx.url} ${ctx.status} ${consumption}ms`, err);
    });

    const appDirPath = path.join(rootDirPath, pathConfig.app || './app');
    app.appInfo = await getAppInfo(rootDirPath, pathConfig.app || appDirPath);

    const configDirPath = path.join(rootDirPath, pathConfig.config || './config');
    app.config = await getConfig(configDirPath, env);

    const log4js = await getLog4js(rootDirPath, app.config.logger);

    app.log4js = log4js;
    app.logger = log4js.app;
    app.logger.info(`正在启动项目 模式: ${env}`);

    app.keys = app.config.keys;

    const databaseDirPath = path.join(appDirPath, './database');
    await useDatabase(app, databaseDirPath, app.config.database);

    await useSession(app, app.config.session);

    const helperDirPath = path.join(appDirPath, './helper');
    await useHelper(app, app.config.helperPackage, helperDirPath);

    const serviceDirPath = path.join(appDirPath, './service');
    await useService(app, serviceDirPath);

    const middlewareDirPath = path.join(appDirPath, './middleware');
    await useMiddleware(app, middlewareDirPath, app.config.middleware);

    const defaultMiddlewareDirPath = path.join(__dirname, './middleware');
    await useMiddleware(app, defaultMiddlewareDirPath, app.config.middleware);

    const controllerDirPath = path.join(appDirPath, './controller');
    const controller = await getController(app, controllerDirPath);
    const routerDirPath = path.join(appDirPath, './router');
    await useRouter(app, routerDirPath, controller);

    app.listen(app.config.port);
    app.logger.info(`启动项目成功 端口：${app.config.port}`)


    return app;

};

module.exports = async function (rootDirPath, pathConfig) {
    try {
        const app = await init(rootDirPath, pathConfig);
        return app;
    } catch (error) {
        app.logger.info(`启动项目失败`);
        return Promise.reject(new Error(`启动项目失败`));
    }
};