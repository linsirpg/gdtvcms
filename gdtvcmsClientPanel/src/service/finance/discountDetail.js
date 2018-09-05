

import http from '@/service/http'

export default {
    getList: function (params) {
        return http.api('finance/discountDetail/getList', params);
    },
    exportExcel: function (params) {
        return http.open('finance/discountDetail/exportExcel', params);
    },
}