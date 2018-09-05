

import http from '@/service/http'

export default {
    getList: function (params) {
        return http.api('finance/productTrade/getList', params);
    },
    exportExcel: function (params) {
        return http.open('finance/productTrade/exportExcel', params);
    },
}