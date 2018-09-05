/*
* @Author: zfowed
* @Date:   2017-09-27 16:50:35
* @Last Modified by:   acer
* @Last Modified time: 2017-12-19 22:02:26
*/

'use strict';

const path = require('path');
const buddy = require('co-body');
const forms = require('formidable');

module.exports = async (option, app) => {

    // const uploadDir = option.uploadDir;
    // const uploadDir = '/Mass/171208specialimgs'
    const uploadDir = path.join(app.appInfo.root, option.uploadDir);

    const formsOpts = {
        uploadDir: uploadDir,
    };

    const getCoBody = async ctx => {
        return new Promise(function (resolve, reject) {
            let bodyPromise = {};
            if (!option.strict || ["GET", "HEAD", "DELETE"].indexOf(ctx.method.toUpperCase()) === -1) {
                try {
                    if (option.json && ctx.is('json')) {
                        bodyPromise = buddy.json(ctx, {
                            encoding: option.encoding,
                            limit: option.jsonLimit
                        });
                    } else if (option.urlencoded && ctx.is('urlencoded')) {
                        bodyPromise = buddy.form(ctx, {
                            encoding: option.encoding,
                            limit: option.formLimit
                        });
                    } else if (option.text && ctx.is('text')) {
                        bodyPromise = buddy.text(ctx, {
                            encoding: option.encoding,
                            limit: option.textLimit
                        });
                    }

                    return resolve(bodyPromise);
                } catch (err) {
                    return resolve(bodyPromise);
                }
            }
            return resolve(bodyPromise);
        });
    };

    const getFormidable = async ctx => {
        return async function (isProcessFile) {

            if (!ctx.is('multipart/form-data')) {
                return { fields: {}, files: {}, filesList: [] };
            }

            return new Promise(function (resolve, reject) {
                let fields = {}, files = {}, filesList = [];

                const form = new forms.IncomingForm(formsOpts);

                form.on('field', function (field, value) {
                    if (fields[field]) {
                        if (Array.isArray(fields[field])) {
                            fields[field].push(value);
                        } else {
                            fields[field] = [fields[field], value];
                        }
                    } else {
                        fields[field] = value;
                    }
                }).on('fileBegin', function (name, file) {
                    if (!file.name) { file.path = path.join(uploadDir, 'not_file'); }
                }).on('file', function (field, file) {
                    if (file.name === '' && file.size === 0) { return files[field] = null; }
                    filesList.push(file);
                    if (files[field]) {
                        if (Array.isArray(files[field])) {
                            files[field].push(file);
                        } else {
                            files[field] = [files[field], file];
                        }
                    } else {
                        files[field] = file;
                    }
                }).on('error', function (err) {
                    return resolve({ fields: {}, files: {}, filesList: [] });
                }).on('end', function () {
                    return resolve({ fields, files, filesList });
                });

                form.onPart = function (part) {
                    if (!part.filename) {
                        form.handlePart(part);
                    } else if (isProcessFile) {
                        form.handlePart(part);
                    }
                }

                form.parse(ctx.req);
            });
        };
    };

    app.use(async function (ctx, next) {
        ctx.request.body = await getCoBody(ctx);
        ctx.request.getFormidable = await getFormidable(ctx);
        return next();
    });

    return null;
};