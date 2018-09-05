/*
* @Author: acer
* @Date:   2017-12-04 12:02:47
* @Last Modified by:   acer
* @Last Modified time: 2017-12-11 16:21:34
*/


import http from '@/service/http'

export default {
	addTask: params => http.api('updateDatabase/addTask', params),
	getStatus: _ => http.api('updateDatabase/checkStatus'),
}