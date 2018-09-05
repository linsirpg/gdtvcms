/**
 * @Author: Acer
 * @Date: 2017-12-19 15:35:47
 * @Last Modified by: Acer
 * @Last Modified time: 2018-01-05 15:36:06
 */



'use strict';


module.exports = app => {
    return class HomeController extends app.Controller {
        home(ctx) {
            return ctx.redirect('/admin');
        }
    };
};