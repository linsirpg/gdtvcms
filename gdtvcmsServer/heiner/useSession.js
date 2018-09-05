/*
 * @Author: zfowed
 * @Date:   2017-09-27 15:54:52
 * @Last Modified by:   acer
 * @Last Modified time: 2017-12-11 17:23:27
 */

'use strict';

const crypto = require('crypto');

const koaSession = require('koa-session');

module.exports = async function (app, option) {
    
	const aes = {
		encrypt(key, buf) {
			var encrypted = "";
			var cip = crypto.createCipher('aes-128-cbc', key);
			encrypted += cip.update(buf, 'utf8', 'hex');
			encrypted += cip.final('hex');

			return encrypted;
		},
		decrypt(key, encrypted) {
			var decrypted = "";
			var decipher = crypto.createDecipher('aes-128-cbc', key);
			decrypted += decipher.update(encrypted, 'hex', 'utf8');
			decrypted += decipher.final('utf8');
			return decrypted
		}
	};

	const aesKey = option.aes_key;

    app.use(koaSession(Object.assign({
		encode (body) {
			body = JSON.stringify(body);
			return aes.encrypt(aesKey, body);
		},
		decode (string) {
			const body = aes.decrypt(aesKey, string);
			const json = JSON.parse(body);
			return json;
		}
    }, option), app));

};

