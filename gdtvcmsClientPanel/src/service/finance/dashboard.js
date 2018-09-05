

import http from '@/service/http'

export default {
    billDaily: function () {
        return http.api('finance/dashboard/billDaily');
    },
}