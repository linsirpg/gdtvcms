/*
* @Author: acer
* @Date:   2017-09-28 10:38:03
* @Last Modified by:   acer
* @Last Modified time: 2017-12-11 15:48:47
*/

import Vue from 'vue'
import moment from 'moment'

export default {
    install (Vue, options) {
        Vue.filter('dateFormat', function (value, format, d) {
        	const momentDate = moment(value).format(format);
            if (momentDate === 'Invalid date' && typeof d !== 'undefined') {
                return d;
            }
        	return momentDate;
        });

    }
}