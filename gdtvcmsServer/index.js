/*
 * @Author: zfowed
 * @Date:   2017-09-27 15:54:52
 * @Last Modified by:   acer
 * @Last Modified time: 2017-12-13 16:06:16
 */

'use strict';

const heiner = require('./heiner');

heiner(__dirname, {}).then(app => {
	console.log('running')
});