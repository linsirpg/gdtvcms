

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
                host: '192.168.0.32',
                dialect: 'mysql',
            }
        },
        gdtvStat: {
            database: 'gdtvshop_stat',
            username: 'root',
            password: '123456',
            options: {
                host: '192.168.0.32',
                dialect: 'mysql',
            }
        }
    }

}