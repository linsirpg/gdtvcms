/*
 * @Author: zfowed
 * @Date:   2017-09-27 15:54:52
 * @Last Modified by:   zfowed
 * @Last Modified time: 2017-10-28 00:05:13
 */

'use strict';

const fs = require('fs');

module.exports = async function (filePath) {
    return new Promise((resolve, reject) => {
        return fs.exists(filePath, exists => {
        	// 测试给定的路径是否存在
            if (!exists) { return resolve(null); }
            return fs.stat(filePath, (err, stats) => {
                if (!stats.isFile()) { return resolve(null); }
                // 获取文件信息
                return resolve(require(filePath));
                // 返回 请求文件后 文件 exports 出的数据
            });
        });
    });
};