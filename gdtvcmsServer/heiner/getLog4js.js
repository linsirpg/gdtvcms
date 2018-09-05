/*
 * @Author: zfowed
 * @Date:   2017-09-27 15:54:52
 * @Last Modified by:   acer
 * @Last Modified time: 2017-12-19 22:01:40
 */

'use strict';

const path = require('path');
const log4js = require('log4js');

module.exports = async function (rootDirPath, config, mark) {

    log4js.configure({
        replaceConsole: true,
        appenders: {
            'console': {
                "type": "console"
            },
            'app': {
                type: config.type,
                filename: path.join(rootDirPath, config.dir, `./app/`),
                alwaysIncludePattern: true,
                compress: false,
                pattern: 'yyyy-MM-dd/hh_mm.log',
                encoding: 'utf-8',
            },
            'request': {
                type: config.type,
                filename: path.join(rootDirPath, config.dir, `./request/`),
                alwaysIncludePattern: true,
                compress: false,
                pattern: 'yyyy-MM-dd/hh_mm.log',
                encoding: 'utf-8',
            },
            'requestWarn': {
                type: config.type,
                filename: path.join(rootDirPath, config.dir, `./requestWarn/`),
                alwaysIncludePattern: true,
                compress: false,
                pattern: 'yyyy-MM-dd/hh_mm.log',
                encoding: 'utf-8',
            },
            'requestError': {
                type: config.type,
                filename: path.join(rootDirPath, config.dir, `./requestError/`),
                alwaysIncludePattern: true,
                compress: false,
                pattern: 'yyyy-MM-dd/hh_mm.log',
                encoding: 'utf-8',
            },
            'requestFatal': {
                type: config.type,
                filename: path.join(rootDirPath, config.dir, `./requestFatal/`),
                alwaysIncludePattern: true,
                compress: false,
                pattern: 'yyyy-MM-dd/hh_mm.log',
                encoding: 'utf-8',
            }
        },
        categories: {
            'default': {
                appenders: ['console'],
                level: 'trace'
            },
            'app': {
                appenders: ['app'],
                level: 'info'
            },
            'request': {
                appenders: ['request'],
                level: 'trace'
            },
            'requestWarn': {
                appenders: config.type === 'console' ? ['request'] : ['request', 'requestWarn'],
                level: 'warn'
            },
            'requestError': {
                appenders: config.type === 'console' ? ['request'] : ['request', 'requestError'],
                level: 'error'
            },
            'requestFatal': {
                appenders: config.type === 'console' ? ['request'] : ['request', 'requestFatal'],
                level: 'fatal'
            }
        }
    });


    const consoleLogger = log4js.getLogger();
    const appLogger = log4js.getLogger('app');
    const requestLogger = log4js.getLogger('request');
    const requestWarnLogger = log4js.getLogger('requestWarn');
    const requestErrorLogger = log4js.getLogger('requestError');
    const requestFatalLogger = log4js.getLogger('requestFatal');

    return {
        app: appLogger,
        console: consoleLogger,
        request: {
            trace: requestLogger.trace.bind(requestLogger),
            debug: requestLogger.debug.bind(requestLogger),
            info: requestLogger.info.bind(requestLogger),
            warn: requestWarnLogger.warn.bind(requestWarnLogger),
            error: requestErrorLogger.error.bind(requestErrorLogger),
            fatal: requestFatalLogger.fatal.bind(requestFatalLogger),
        }
    };
};