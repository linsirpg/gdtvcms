

import http from '@/service/http'

export default {
    getList: function (params) {
        return http.api('finance/productTradeConfig/getList', params);
    },
    setFeeConfig: function (id, config) {
        return http.api('finance/productTradeConfig/setFeeConfig', { id, config });
    },
    setProductAlias: function (id, productAlias) {
        return http.api('finance/productTradeConfig/setProductAlias', { id, productAlias });
    },
    setDeptAlias: function (id, deptAlias) {
        return http.api('finance/productTradeConfig/setDeptAlias', { id, deptAlias });
    },
    setMemo: function (id, memo) {
        return http.api('finance/productTradeConfig/setMemo', { id, memo });
    },
    setStatus: function (idList, status) {
        return http.api('finance/productTradeConfig/setStatus', { idList, status });
    },
    sync: function (idList, status) {
        return http.api('finance/productTradeConfig/sync');
    }
}