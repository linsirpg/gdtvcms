'use strict';
module.exports = app => {
    const cmsProductRef = app.database.cms.models['cms_product_ref'];
    const cmsArticleInfo = app.database.cms.models['cms_article_info'];
    return class ArticleInfoController extends app.Controller {
        async GetSArticleInfo(ctx) {
            var Tit = '%' + ctx.query.title + '%'
            if (ctx.query.status == 2) {
                var param = {
                    'where': {
                        TITLE: {
                            $like: Tit
                        }
                    },
                    'order': [
                        ['RECID', 'DESC'],
                    ],
                    limit: Number(ctx.query.limit),
                    offset: Number(ctx.query.offset),
                }
            } else {
                var param = {
                    'where': {
                        TITLE: {
                            $like: Tit
                        },
                        STATUS: ctx.query.status
                    },
                    'order': [
                        ['RECID', 'DESC'],
                    ],
                    limit: Number(ctx.query.limit),
                    offset: Number(ctx.query.offset),

                }
            }
            return cmsArticleInfo.findAndCountAll(param).then(function (result) {
                return ctx.body = result
            })
        }
        async GetByTitle(ctx) {
            var Tit = '%' + ctx.query.title + '%'
            return cmsArticleInfo.findAll({
                    'where': {
                        TITLE: {
                            $like: Tit
                        }
                    }
                })
                .then(function (res) {
                    return ctx.body = res
                })
        }
        async status(ctx) {
            var status = ctx.query.status
            var Id = ctx.query.Id
            var param = {
                'status': status
            }
            return cmsArticleInfo.update(param, {
                'where': {
                    'recid': Id
                }
            }).then(function (res) {
                return ctx.body = res
            })
        }


        async ProductStatus(ctx) {
            var status = ctx.query.status
            var Id = ctx.query.Id
            var param = {
                'status': status
            }
            return cmsProductRef.update(param, {
                'where': {
                    'recid': Id
                }
            }).then(function (res) {
                return ctx.body = res
            })
        }

        // 删除
        async DestroyArticleInfo(ctx) {
            return cmsArticleInfo.destroy({
                'where': {
                    'recid': ctx.query.RECID
                }
            }).then(function (res) {
                return ctx.body = res;
            });
        }
        //获取单条
        async GetOneSArticleInfo(ctx) {
            return cmsArticleInfo.findById(ctx.query.RECID)
                .then(function (res) {
                    return ctx.body = res
                })
        }
        async GetCmsProductRef(ctx) {
            var Tit = '%' + ctx.query.title + '%';
            if (ctx.query.status == 2) {
                if(isNaN(ctx.query.title)){
                    var param = {
                        'where': {
                            TITLE: {
                                $like: Tit
                            },
                            'RELATION_CODE': ctx.query.Code
                        },
                        'order': [
                            ['RECID', 'DESC'],
                        ],
                        limit: Number(ctx.query.limit),
                        offset: Number(ctx.query.offset),
                    }
                }else{
                    var param = {
                        'where': {
                            PRODUCT_NO: {
                                $like: Tit
                            },
                            'RELATION_CODE': ctx.query.Code
                        },
                        'order': [
                            ['RECID', 'DESC'],
                        ],
                        limit: Number(ctx.query.limit),
                        offset: Number(ctx.query.offset),
                    }
                }
            } else {
                if(isNaN(ctx.query.title)){
                    var param = {
                        'where': {
                            TITLE: {
                                $like: Tit
                            },
                            STATUS: ctx.query.status,
                            'RELATION_CODE': ctx.query.Code
                        },
                        'order': [
                            ['RECID', 'DESC'],
                        ],
                        limit: Number(ctx.query.limit),
                        offset: Number(ctx.query.offset),
                    }
                }else{
                    var param = {
                        'where': {
                            PRODUCT_NO: {
                                $like: Tit
                            },
                            STATUS: ctx.query.status,
                            'RELATION_CODE': ctx.query.Code
                        },
                        'order': [
                            ['RECID', 'DESC'],
                        ],
                        limit: Number(ctx.query.limit),
                        offset: Number(ctx.query.offset),
                    }
                }
            }
            return cmsProductRef.findAndCountAll(param).then(function (result) {
                ctx.body = result
            })
        }
        async deleteOne(ctx) {
            var Id = ctx.query.RECID
            return cmsProductRef.destroy({
                'where': {
                    'RECID': Id
                }
            }).then(function (res) {
                return ctx.body = '删除成功';
            });
        }
        async addOne(ctx) {
            var param = ctx.request.body.param;
            return cmsProductRef.create(param).then(function (res) {
                return ctx.body = res
            })
        }
        async update(ctx) {
            // console.log(ctx.request.body)
            var Id = ctx.request.body.RECID;
            var param = ctx.request.body.param
            return cmsProductRef.update(param, {
                'where': {
                    'RECID': Id
                }
            }).then(function (res) {
                return ctx.body = '修改成功'
            })
        }
        async Goodstatus(ctx) {
            var status = ctx.query.status
            var Id = ctx.query.Id
            var param = {
                'status': status
            }
            return cmsProductRef.update(param, {
                'where': {
                    'recid': Id
                }
            }).then(function (res) {
                return ctx.body = res
            })
        }
        async UpdateArtical(ctx) {
            var Id = ctx.request.body.RECID;
            var param = ctx.request.body.param
            return cmsArticleInfo.update(param, {
                'where': {
                    'RECID': Id
                }
            }).then(function (res) {
                return ctx.body = res
            })
        }
        async creat(ctx) {
            var param = ctx.request.body.param
            return cmsArticleInfo.create(param).then(function (res) {
                return ctx.body = res
            })
        }

        async DelCode(ctx) {
            return cmsProductRef.destroy({
                'where': {
                    'RELATION_CODE': ctx.query.GoodCode
                }
            }).then(function (res) {
                return ctx.body = '删除成功';
            });
        }

    };
};