

import http from '@/service/http'

export default {
    getList: function (params) {
        return http.api('finance/billDiscountDaily/getList', params);
    },
    exportExcel: function (params) {
        return http.open('finance/billDiscountDaily/exportExcel', params);
    },
}