
module.exports = app => {
    var moment = require('moment');
  const cmsAdvertPosition = app.database.cms.models["cms_advert_position"];
  
  const cmsAdvertInfo = app.database.cms.models["cms_advert_info"];

  return class advertPositionController extends app.Controller {
        async getKind(ctx){
            var param = {
                where:{
                    advertCode:ctx.query.advertCode
                }
            }
            return cmsAdvertPosition.findAndCountAll(param).then(function (result) {
                return ctx.body = result
            })
        }
        async advertPosition(ctx) {
            var Tit = '%' + ctx.query.title + '%'
            if (ctx.query.status == 2) {
                var param = {
                    'where': {
                        TITLE: {
                            $like: Tit
                            
                        }
                    },
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
                    limit: Number(ctx.query.limit),
                    offset: Number(ctx.query.offset),

                }
            }
            return cmsAdvertPosition.findAndCountAll(param).then(function (result) {
                return ctx.body = result
            })
        }
        async ShopHomePosition(ctx) {
            console.log(111)
            var Tit = '%' + ctx.query.title + '%'
            if (ctx.query.status == 2) {
                var param = {
                    'where': {
                        memo: {
                            $like: Tit
                        }
                    },
                    limit: Number(ctx.query.limit),
                    offset: Number(ctx.query.offset),
                }
            } else {
                var param = {
                    'where': {
                        memo: {
                            $like: Tit
                        },
                        STATUS: ctx.query.status
                    },
                    limit: Number(ctx.query.limit),
                    offset: Number(ctx.query.offset),

                }
            }
            console.log(param)
            return cmsAdvertPosition.findAndCountAll(param).then(function (result) {
                return ctx.body = result
            })
        }
        async status(ctx) {
            var status = ctx.query.status
            var Id = ctx.query.Id
            var param = {
                'status': status
            }
            return cmsAdvertPosition.update(param, {
                'where': {
                    'recid': Id
                }
            }).then(function (res) {
                return ctx.body = res
            })
        }
        async GetCmsProductRef(ctx) {
            var Tit = '%' + ctx.query.title + '%';
            if (ctx.query.status == 2) {
                if(isNaN(ctx.query.title)){
                    var param = {
                        'where': {
                            title: {
                                $like: Tit
                            },
                            'advertCode': ctx.query.Code
                        },
                        'order': [
                            ['sort'],
                        ],
                        limit: Number(ctx.query.limit),
                        offset: Number(ctx.query.offset),
                    }
                
                }else{
                    if(ctx.query.title > 10){
                        var param = {
                            'where': {
                                productNo: {
                                    $like: Tit
                                },
                                'advertCode': ctx.query.Code
                            },
                            'order': [
                                ['sort'],
                            ],
                            limit: Number(ctx.query.limit),
                            offset: Number(ctx.query.offset),
                        }                        
                    }else{
                        var param = {
                            'where': {
                                'advertCode': ctx.query.Code
                            },
                            'order': [
                                ['sort'],
                            ],
                            limit: Number(ctx.query.limit),
                            offset: Number(ctx.query.offset),
                        }                        
                    }
                }
            } else {
                if(isNaN(ctx.query.title)){
                    var param = {
                        'where': {
                            title: {
                                $like: Tit
                            },
                            status: ctx.query.status,
                            'advertCode': ctx.query.Code
                        },
                        'order': [
                            ['sort'],
                        ],
                        limit: Number(ctx.query.limit),
                        offset: Number(ctx.query.offset),
                    }
                }else{
                    if(ctx.query.title > 10){

                        var param = {
                            'where': {
                                productNo: {
                                    $like: Tit
                                },
                                status: ctx.query.status,
                                'advertCode': ctx.query.Code
                            },
                            'order': [
                                ['sort'],
                            ],
                            limit: Number(ctx.query.limit),
                            offset: Number(ctx.query.offset),
                        }                        
                    }else{
                        var param = {
                            'where': {
                                status: ctx.query.status,
                                'advertCode': ctx.query.Code
                            },
                            'order': [
                                ['sort'],
                            ],
                            limit: Number(ctx.query.limit),
                            offset: Number(ctx.query.offset),
                        }                        
                    }

                }
            }
            return cmsAdvertInfo.findAndCountAll(param).then(function (result) {
                var obj = {
                    count:'',
                    rows:[],
                }
                obj.count = result.count
                result.rows.map(function(res,index){
                    obj.rows.push(res.dataValues)
                    obj.rows[index].timeRange = [moment(obj.rows[index].startTime).utc().format("YYYY-MM-DD HH:mm:ss"), moment(obj.rows[index].endTime).utc().format("YYYY-MM-DD HH:mm:ss")]
                    obj.rows[index].startTime = moment(res.dataValues.startTime).utc().format("YYYY-MM-DD HH:mm:ss")
                    obj.rows[index].endTime = moment(res.dataValues.endTime).utc().format("YYYY-MM-DD HH:mm:ss")

                })
                ctx.body = obj
            })
        }
        async Goodstatus(ctx) {
            var status = ctx.query.status
            var Id = ctx.query.Id
            var param = {
                'status': status
            }
            return cmsAdvertInfo.update(param, {
                'where': {
                    'recid': Id
                }
            }).then(function (res) {
                return ctx.body = res
            })
        }      
        async update(ctx) {
            var Id = ctx.request.body.RECID;
            var param = ctx.request.body.param
            if(param.startTime){
                param.startTime =  moment(param.startTime).add(8, "hours").format()
            }
            if(param.endTime){
                param.endTime =  moment(param.endTime).add(8, "hours").format()
            }
            for (var attr  in param)
                {
                   if(param[attr]){
                    delete param.param1;
                   }
                }
            return cmsAdvertInfo.update(param, {
                'where': {
                    'recid': Id
                }
            }).then(function (res) {
                return ctx.body = '修改成功'
            })
        } 
        async addOne(ctx) {
            var param = ctx.request.body.param;
            if(param.startTime){
                param.startTime =  moment(param.startTime).add(8, "hours").format()
            }
            if(param.endTime){
                param.endTime =  moment(param.endTime).add(8, "hours").format()
            }
            return cmsAdvertInfo.create(param).then(function (res) {
                return ctx.body = res
            })
        }
        async deleteOne(ctx) {
            var Id = ctx.query.RECID
            return cmsAdvertInfo.destroy({
                'where': {
                    'recid': Id
                }
            }).then(function (res) {
                return ctx.body = '删除成功';
            });
        }
    }
  };
