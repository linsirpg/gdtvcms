'use strict';
module.exports = app => {
    const cmsPresetProduct = app.database.cms.models['cms_preset_product'];
    return class PresetController extends app.Controller {
        async GetpresetProduct(ctx) {
            var Tit = '%' + ctx.query.title + '%'
            var Kind = '%' + ctx.query.kind + '%'
            if (ctx.query.status == 2) {
                var param = {
                    'where': {
                        title: {
                            $like: Tit,
                        },
                        kind:{
                            $like: Kind,
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
                        title: {
                            $like: Tit,
                        },
                        kind:{
                            $like: Kind,
                        },
                        status: ctx.query.status,
                    },
                    'order': [
                        ['RECID', 'DESC'],
                    ],
                    limit: Number(ctx.query.limit),
                    offset: Number(ctx.query.offset),

                }
            }
            return cmsPresetProduct.findAndCountAll(param).then(function (result) {
                ctx.body = result
            })
        }
        async DestroyPreset(ctx) {
            return cmsPresetProduct.destroy({
                'where': {
                    'recid': ctx.query.RECID
                }
            }).then(function (res) {
                return ctx.body = res;
            });
        }
    };
};