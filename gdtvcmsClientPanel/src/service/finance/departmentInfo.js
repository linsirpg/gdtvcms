

import http from '@/service/http'


let allListCache = null;
let resolveList = [];


const recursive = function (currentPage, list) {
    list = list || [];
    currentPage = currentPage || 1;
    return new Promise((resolve, reject) => {
        return http.api('finance/departmentInfo/getList', {
            pageSize: 200,
            currentPage: currentPage
        }).then(res => {
            list.push.apply(list, res.data.list);
            if (res.data.pageCount > currentPage) {
                return recursive(currentPage + 1, list).then(res => {
                    return resolve(list);
                }, reject);
            }
            allListCache = list;
            return resolve(list);
        }, reject);
    });
};

const getAll = function () {
    return new Promise((resolve, reject) => {
        if (allListCache === null) {
            allListCache = true;
        } else if (allListCache === true) {
            return resolveList.push(resolve);
        } else {
            return resolve(allListCache);
        }
        return recursive().then(list=>{
            for (let index = 0; index < resolveList.length; index++) {
                resolveList[index](list);
            }
            resolveList = [];
            return resolve(list);
        }, reject);
    });
};

const search = function (dept) {
    if (!dept || typeof dept !== 'string') { Promise.resolve(dept); }
    return new Promise((resolve, reject) => {
        return getAll().then(list => {
            return resolve(list.filter(item => {
                return item.DEPT_NAME.toLowerCase().indexOf(dept.toLowerCase()) > -1 || item.DEPT_CODE.toLowerCase().indexOf(dept.toLowerCase()) > -1;
            }));
        });
    });
};

const find = function (dept) {
    return new Promise((resolve, reject) => {
        if (!dept || typeof dept !== 'string') { return resolve(null); }
        return getAll().then(list => {
            return resolve(list.find(item => {
                return item.DEPT_NAME.toLowerCase().indexOf(dept.toLowerCase()) > -1 || item.DEPT_CODE.toLowerCase().indexOf(dept.toLowerCase()) > -1;
            }));
        });
    });
};

const map = function (arr, dept, key) {
    return new Promise((resolve, reject) => {
        return Promise.all(arr.map(item=>find(item[dept]))).then(deptList=>{
            arr.forEach((item, index) =>{
                item[key || 'DEPT_DATA'] = deptList[index];
            });
            return resolve(arr);
        });
    })
};

export default { getAll, search, find, map }