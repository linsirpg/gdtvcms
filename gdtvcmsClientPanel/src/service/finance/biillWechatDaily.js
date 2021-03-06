

import http from '@/service/http'

export default {
    getList: function (params) {
        return http.api('finance/biillWechatDaily/getList', params);
    },
    exportExcel: function (params) {
        return http.open('finance/biillWechatDaily/exportExcel', params);
    },
}