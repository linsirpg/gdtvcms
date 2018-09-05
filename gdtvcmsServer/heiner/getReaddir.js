/*
 * @Author: zfowed
 * @Date:   2017-09-27 15:54:52
 * @Last Modified by:   zfowed
 * @Last Modified time: 2017-10-28 00:05:13
 */

'use strict';

const fs = require('fs');
const path = require('path');
//获取文件夹下面的文件信息

module.exports = async function (dir) {
    const fileNameList = fs.readdirSync(dir);
    // fileNameList  [] 保存文件夹下面的文件 集合

    // console.log(fileNameList)
 

//     [ 'articleinfo',
//   'describe',
//   'home.js',
//   'presetproduct',
//   'productlist',
//   'public',
//   'server' ]
    let res = [];
    for (const fileName of fileNameList) {
        let fileData = {};
        fileData.path = path.join(dir, fileName);
        res.push(fileData);
        fileData.exists = fs.existsSync(fileData.path);
        if (!fileData.exists) { continue; }
        const stat = fs.statSync(fileData.path);
        fileData.extname = path.extname(fileName);
        fileData.basename = path.basename(fileName, fileData.extname);
        fileData.name = fileName;
        if (stat.isFile()) {
            fileData.isFile = true;
        } else if (stat.isDirectory()) {
            fileData.isDirectory = true;
        }
    }
    // console.log(res)

    //  res 保存文件夹下面的每个文件的详细信息 为一个对象 
//     [ { path: 'D:\\公司项目-新\\20170929001_gdtv_balance1\\balanceServer\\app\\router\\articleinfo.js',
//     exists: true,
//     extname: '.js',
//     basename: 'articleinfo',
//     name: 'articleinfo.js',
//     isFile: true },
//   { path: 'D:\\公司项目-新\\20170929001_gdtv_balance1\\balanceServer\\app\\router\\describe.js',
//     exists: true,
//     extname: '.js',
//     basename: 'describe',
//     name: 'describe.js',
//     isFile: true },
//   { path: 'D:\\公司项目-新\\20170929001_gdtv_balance1\\balanceServer\\app\\router\\index.js',
//     exists: true,
//     extname: '.js',
//     basename: 'index',
//     name: 'index.js',
//     isFile: true },
//   { path: 'D:\\公司项目-新\\20170929001_gdtv_balance1\\balanceServer\\app\\router\\presetproduct.js',
//     exists: true,
//     extname: '.js',
//     basename: 'presetproduct',
//     name: 'presetproduct.js',
//     isFile: true },
//   { path: 'D:\\公司项目-新\\20170929001_gdtv_balance1\\balanceServer\\app\\router\\productlist.js',
//     exists: true,
//     extname: '.js',
//     basename: 'productlist',
//     name: 'productlist.js',
//     isFile: true },
//   { path: 'D:\\公司项目-新\\20170929001_gdtv_balance1\\balanceServer\\app\\router\\public.js',
//     exists: true,
//     extname: '.js',
//     basename: 'public',
//     name: 'public.js',
//     isFile: true },
//   { path: 'D:\\公司项目-新\\20170929001_gdtv_balance1\\balanceServer\\app\\router\\server.js',
//     exists: true,
//     extname: '.js',
//     basename: 'server',
//     name: 'server.js',
//     isFile: true } ]

    return res; 
};