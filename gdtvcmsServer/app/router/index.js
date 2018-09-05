/*
 * @Author: zfowed
 * @Date:   2017-09-27 15:54:52
 * @Last Modified by:   zfowed
 * @Last Modified time: 2017-10-28 00:05:13
 */

'use strict';


module.exports = async function (router, controller) {
    // console.log(controller)
    router.get('/', controller.home.home);
};