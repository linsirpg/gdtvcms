

import axios from 'axios'
import qs from 'qs'

import { Notification } from 'element-ui';

const api = function (mark, params) {
    return new Promise(function (resolve, reject) {
        return axios({
            method: 'post',
            url: `/api/${mark}`,
            data: params || {},
            withCredentials: true,
        }).then(function (res) {
            if (res.data && res.data.code === 200) {
                return resolve(res.data);
            }
            return reject(res.data);
        }, function (err) {
            const code = err.response.status;
            const msg = err.response.statusText;
            const date = err.response.data;
            Notification.error({
                title: `${code}: ${msg}`,
                message: date
            });
            return reject({ code, msg, date });
        })
    });
};

const open = function (mark, params) {
    const url = `/api/${mark}`;
    const qsStr = qs.stringify(params || {});

    const markIsQs = mark.indexOf('?') < 0 ? '?' : '';

    return window.open(url + markIsQs + qsStr);

};


export default { api, open }
