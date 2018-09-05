

import http from '@/service/http'

export default {
    getList: function (params) {
        return http.api('finance/billProductDaily/getList', params);
    },
    exportExcel: function (params) {
        return http.open('finance/billProductDaily/exportExcel', params);
    },
}