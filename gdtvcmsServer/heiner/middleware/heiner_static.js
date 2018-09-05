/*
* @Author: zfowed
* @Date:   2017-09-27 16:39:11
* @Last Modified by:   zfowed
* @Last Modified time: 2017-10-28 00:05:17
*/

'use strict';

const fs = require('fs');
const path = require('path');

const url = require('url');
const koaStatic = require('koa-static');


const readRangeHeader = function (range, totalLength) {

    if (range == null || range.length == 0)
        return null;

    var array = range.split(/bytes=([0-9]*)-([0-9]*)/);
    var start = parseInt(array[1]);
    var end = parseInt(array[2]);

    if (isNaN(start)) {
        start = 0;
    }
    if (isNaN(end)) {
        end = totalLength - 1;
    }

    return [start, end];
};

module.exports = async (option, app) => {
    // console.log(option)
    const rootDir = path.join(app.appInfo.root, option.root);
    
    const staticService = koaStatic(rootDir, option);
    // app.use(staticService);


    app.use(async (ctx, next) => {

        let exist = true;

        await staticService(ctx, async _ => {
            exist = false;
        });

        if (!exist) { return next(); }

        const rangeHeader = ctx.get('range');
        if (!rangeHeader) { return; }

        const filename = ctx.body.path;
        const stat = fs.statSync(filename);
        const [start, end] = readRangeHeader(rangeHeader, stat.size);

        if (start >= stat.size || end >= stat.size) {
            ctx.set('Content-Range', 'bytes */');
            ctx.status = 416;
            return;
        }

        ctx.set('Content-Range', `bytes ${start}-${end}/${stat.size}`);
        ctx.set('Content-Length', start === end ? 0 : (end - start + 1));
        ctx.set('Accept-Ranges', 'bytes');
        ctx.set('Cache-Control', 'no-cache');

        ctx.status = 206;

        ctx.body = fs.createReadStream(filename, {
            start: start,
            end: end
        });

    });

    return null;
};


