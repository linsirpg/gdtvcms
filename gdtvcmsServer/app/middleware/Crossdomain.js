module.exports = options => (ctx, next) => {
    ctx.set("Access-Control-Allow-Origin", ctx.headers.origin || '*');
    ctx.set("Access-Control-Allow-Headers", "X-Requested-With");
    ctx.set("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    ctx.set('Access-Control-Allow-Credentials', true);
    ctx.set("X-Powered-By", ' 3.2.1');
    ctx.set("Content-Type", "application/json;charset=utf-8");
    return next();
};
