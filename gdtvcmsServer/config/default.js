

module.exports = {
    keys: 'cookie-secret-default-key',
    logger: {
        dir: '/logger'
    },
    middleware: {
        mark: ['Crossdomain'], // 使用中间件
        options: {
        }
    },
    database: {
         cms:{
             database: 'gdtv_cms',
            username: 'root',
            password: '123456',
            options: {
                define: {  charset: 'utf8' },
                // host: 'localhost',
                host: '192.168.0.32',
                dialect: 'mysql',
            }
        },
        gdtvStat: {
            database: 'gdtvshop_stat',
            username: 'gdtvstatrd',
            password: 'stat1019@#$',
            options: {
                host: 'gdtvshop1.weixinmvp.com',
                dialect: 'mysql',
            }
        },        
        // cms:{
        //      database: 'gdtv_cms',
        //     username: 'gdtv_cms',
        //     password: 'zlan2017',
        //     options: {
        //         host: '114.215.183.168',
        //         define: {  charset: 'utf8' },
        //         dialect: 'mysql',
        //     }
        // }
        // 现在的 
        // cms:{
        //     database: 'gdtv_cms',
        //    username: 'gdtv_cms',
        //    password: 'eSE1yAQChnde9ZHz',
        //    options: {
        //        define: {  charset: 'utf8' },
        //     //    host: '192.168.0.101',
        //        host: 'gdtvcmsdb.mysql.rds.aliyuncs.com',
        //        dialect: 'mysql',
        //    }
    //    },       
    //     cms:{
    //         database: 'gdtv_cms',
    //        username: 'root',
    //        password: '4WC2SkVH9qR320MX',
    //        options: {
    //            define: {  charset: 'utf8' },
    //            host: '39.108.137.240',
    //            // host: '127.0.0.1',
    //            dialect: 'mysql',
    //        }
    //    },       
    }

}