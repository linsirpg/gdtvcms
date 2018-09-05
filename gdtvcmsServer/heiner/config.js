
module.exports = {
    port: 3000,
    keys: ['cookie-secret-key'],
    middleware: {
        mark: ['heiner_static', 'heiner_query', 'heiner_body', 'heiner_view'],
        options: {
            heiner_static: {
                maxage: 86400000,
                hidden: false,
                index: "index.html",
                root: '/app/public',
                defer: false,
                gzip: true,
                extensions: false,
            },
            heiner_query: {
            },
            heiner_body: {
                patchNode: false,
                patchKoa: true,
                multipart: false,
                urlencoded: true,
                json: true,
                text: true,
                encoding: 'utf-8',
                jsonLimit: '1mb',
                formLimit: '56kb',
                formidable: {},
                textLimit: '56kb',
                strict: true,
                uploadDir: '/uploadFile'
            },
            heiner_view: {
                root: '/app/view',
                extension: 'pug',            /** {String} 默认视图文件后缀 */
                map: {                       /** {Object} 根据视图文件的后缀名调用不同的模板引擎 */
                    "pug": 'pug',
                }
            }
        }
    },
    database: {},
    session: {
        key: 'heiner:sess',
        aes_key: "heiner:sess",
        maxAge: 86400000,
        overwrite: true,
        httpOnly: true,
        signed: true,
    },
    helperPackage: {
        'moment': 'moment',
        'async': 'async',
        'lodash': 'lodash'
    },
    logger: {
        dir: '/logger',
        type: 'dateFile'
    }
};