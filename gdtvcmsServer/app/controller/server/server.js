'use strict';
var path = require('path');
var Http = require('http');
var  md5=require("md5")  
var fs = require('fs');
const uuidv4 = require('uuid/v4');
var images = require("images");
var querystring = require("querystring")
var request = require('request')
var fs = require('fs');
module.exports = app => {
    var moment = require('moment');
    const CmsSpecialActivity = app.database.cms.models['cms_special_activity'];
    const cmsProductRef = app.database.cms.models['cms_product_ref'];
    const userInfo = app.database.cms.models['user_info'];
    return class ServerController extends app.Controller {
        // CMS.$sequelize
        //分页 获取专题数据
        async GetSpecialSubjectPagination(ctx) {
            var Tit = '%' + ctx.query.title + '%'
            if (ctx.query.Status == 2) {
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
                        STATUS: ctx.query.Status
                    },
                    'order': [
                        ['RECID', 'DESC'],
                    ],
                    limit: Number(ctx.query.limit),
                    offset: Number(ctx.query.offset),

                }
            }
            return CmsSpecialActivity.findAndCountAll(param).then(function (result) {
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
                // console.log(obj)
                ctx.body = obj
            })
        }

        // 获取单条专题数据
        async GetSpecialSubject(ctx) {
            return CmsSpecialActivity.findById(ctx.query.RECID)
                .then(function (res) {
                    return ctx.body = res
                })
        }
        // 获取code的对应商品
        async GetCodeGoods(ctx) {

            return cmsProductRef.findAll({
                    'where': {
                        RELATION_CODE: ctx.query.code
                    }
                })
                .then(function (res) {
                    return ctx.body = res
                })
        }

        // 分页获取code对应的商品
        async GetCodeGoodsPagination(ctx) {
           
            var Tit = '%' + ctx.query.title + '%'

            if (ctx.query.Status == 2) {
                if(isNaN(ctx.query.title)){
                    var param = {
                        'where': {
                            TITLE: {
                                $like: Tit
                            },
                            RELATION_CODE: ctx.query.code
                        },
                        'order': [
                            ['SORT'],
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
                            RELATION_CODE: ctx.query.code
                        },
                        'order': [
                            ['SORT'],
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
                            STATUS: ctx.query.Status,
                            RELATION_CODE: ctx.query.code
                        },
                        'order': [
                            ['SORT'],
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
                            STATUS: ctx.query.Status,
                            RELATION_CODE: ctx.query.code
                        },
                        'order': [
                            ['SORT'],
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
        //通过标题名查询专题
        async GetByTitle(ctx) {
            var Tit = '%' + ctx.query.title + '%'
            if (ctx.query.Status == 2) {
                var param = {
                    'where': {
                        TITLE: {
                            $like: Tit
                        }
                    },
                    'order': [
                        ['RECID', 'DESC'],
                    ]
                }
            } else {
                var param = {
                    'where': {
                        TITLE: {
                            $like: Tit
                        },
                        STATUS: ctx.query.Status
                    },
                    'order': [
                        ['RECID', 'DESC'],
                    ]
                }
            }
            return CmsSpecialActivity.findAll(param)
                .then(function (res) {
                    return ctx.body = res
                })
        }
        //通过订单标题查询商品
        async GetByNum(ctx) {
            var NUM = '%' + ctx.query.Num + '%'
            var CODE = ctx.query.code
            if (ctx.query.Status == 2) {
                var param = {
                    'where': {
                        TITLE: {
                            $like: NUM
                        },
                        RELATION_CODE: CODE
                    }
                }
            } else {
                var param = {
                    'where': {
                        TITLE: {
                            $like: NUM
                        },
                        RELATION_CODE: CODE,
                        STATUS: ctx.query.Status
                    }
                }
            }

            return cmsProductRef.findAll(param)
                .then(function (res) {
                    return ctx.body = res
                })
        }
        // 本地图片上传接口
        async file(ctx) {
         
            if(ctx.request.origin == 'http://localhost:3000' || ctx.request.origin == 'http://192.168.3.32:3000'){
                var Img = {
                    "FileId": 0,
                    "FilePath": "",
                    "FileName": null,
                    "FileExt": "",
                    "SplitList": null,
                    "ServerUrl": ""
                }
                const {
                    fields,
                    files,
                    filesList
                } = await ctx.request.getFormidable(true);
                var OldPath = files.file.path;
                var myDate = new Date()
                var FName =
                myDate.getFullYear() +
                addZero(String(myDate.getMonth() + 1)) +
                addZero(String(myDate.getDate()));
                var FN = path.join(__dirname, '../../public/images/' + FName);
                // var FN =  'E:/wwwroot/GdtvCms/images/' + FName;
                function addZero(num) {
                    if (num < 10) {
                      return 0 + num;
                    } else {
                      return num;
                    }
                  }
                // Img.ServerUrl = app.appInfo.ServerUrl
                // Img.ServerUrl = ctx.request.origin
                Img.ServerUrl = "http://192.168.0.7:3000"
                Img.FilePath = "/images/" + FName + '/' + path.parse(OldPath).name + path.extname(files.file.name);
                // console.log(path.extname(files.file.name).split('.')[1])
                Img.FileExt = path.extname(files.file.name).split('.')[1]
                var newpath = FN + '\\' + path.parse(OldPath).name + path.extname(files.file.name)
                fs.readdir(FN, function (err, files) {
                    if (err) {
                        fs.mkdir(FN, function (err) {
                            if (err) {} else {
                                fs.rename(OldPath, newpath, function (err) {
                                    fs.unlink(OldPath,function(err){
                                    })
                                    images(newpath).save(newpath + '.thumb.' + Img.FileExt,{quality:50})
                                });
                            }
                        });
                    } else {
                        fs.rename(OldPath, newpath, function (err) {
                            if (!err) {
                                fs.unlink(OldPath,function(err){
                                })
                                images(newpath).save(newpath + '.thumb.' + Img.FileExt,{quality:50})
                                
                            }
                        });
                    }
                })
                return ctx.body = Img;
            }else{
                var Img = {
                    "FileId": 0,
                    "FilePath": "",
                    "FileName": null,
                    "FileExt": "",
                    "SplitList": null,
                    "ServerUrl": app.appInfo.ServerUrl
                }
                const {
                    fields,
                    files,
                    filesList
                } = await ctx.request.getFormidable(true);


                // appInfo.ServerUrl = "http://gdtvimg.weixinmvp.com"

                var OldPath = files.file.path;
                var serverUrl = app.appInfo.ServerUrl
                var appid =  'gdtvimg';
                var  appsecrect = 'z4dkxG82hK';
                var kind = "img";
                if(ctx.request.url.split("file")[1]){
                    var config = {"Thumbnail":{"Width":"500","Auto":true,"Height":"500"},"UploadDir":"cms_product"}
                }else{
                    var config = {"Thumbnail":{"Auto":true,"Width":"750"},"UploadDir":"cms_specialSubject"}
                }
                var cfgStr = JSON.stringify(config);
                var encypStr = appid + "#" + kind + "#" + cfgStr + "#" + appsecrect;
                var sign = md5(encypStr);
                sign = sign.toUpperCase()
                var postURL = serverUrl + "/Post.aspx?appid=" + appid + "&kind=" + kind +
                    "&cfg=" + encodeURIComponent(cfgStr) + "&sign=" + sign;
                var formData = {
                    my_field: 'my_value',
                    my_file: fs.createReadStream(OldPath),
                    custom_file: {
                      value:  fs.createReadStream(OldPath),
                      options: {
                        filename: OldPath +'.jpg',
                        contentType: ['image/jpeg','image/jpg','image/png']
                      }
                    }
                  };
                  const myFirstPromise = new Promise((resolve, reject) => {
                    request.post({url:postURL, formData: formData},function optionalCallback(err, httpResponse, body){
                        if(err){
                            reject('失败')
                        }else{
                            for(var attr in JSON.parse(body).file){
                                        Img[attr] = JSON.parse(body).file[attr]
                                    }
                                    fs.unlink(OldPath,function(err){
                                    })
                            resolve(Img)
                        }
                    })
                  });
                  return myFirstPromise.then(function(res){
                    return ctx.body =  res
                  })
            }
        }
        //  服务器图片上传接口
        // async Sfile(ctx) {
        //     var Img = {
        //         "FileId": 0,
        //         "FilePath": "",
        //         "FileName": null,
        //         "FileExt": "",
        //         "SplitList": null,
        //         "ServerUrl": app.appInfo.ServerUrl
        //         // "ServerUrl": "http://192.168.3.138:8007"
        //     }
        //     const {
        //         fields,
        //         files,
        //         filesList
        //     } = await ctx.request.getFormidable(true);
        //     console.log()
        //     var OldPath = files.file.path;
        //     var serverUrl = "http://192.168.3.138:8007/post.aspx"
        //     var appid =  'gdtvimg';
        //     var  appsecrect = 'z4dkxG82hK';
        //     var kind = "img";
        //     if(ctx.request.url.split("file")[1]){
        //         var config = {"Thumbnail":{"Width":"500","Auto":true,"Height":"500"},"UploadDir":"cms_product"}
        //     }else{
        //         var config = {"Thumbnail":{"Auto":true},"UploadDir":"cms_specialSubject"}
        //     }
        //     var cfgStr = JSON.stringify(config);
        //     var encypStr = appid + "#" + kind + "#" + cfgStr + "#" + appsecrect;
        //     var sign = md5(encypStr);
        //     sign = sign.toUpperCase()
        //     var postURL = serverUrl + "/Post.aspx?appid=" + appid + "&kind=" + kind +
        //         "&cfg=" + encodeURIComponent(cfgStr) + "&sign=" + sign;
        //     var formData = {
        //         my_field: 'my_value',
        //         my_file: fs.createReadStream(OldPath),
        //         custom_file: {
        //           value:  fs.createReadStream(OldPath),
        //           options: {
        //             filename: OldPath +'.jpg',
        //             contentType: ['image/jpeg','image/jpg','image/png']
        //           }
        //         }
        //       };
        //       const myFirstPromise = new Promise((resolve, reject) => {
        //         request.post({url:postURL, formData: formData},function optionalCallback(err, httpResponse, body){
        //             if(err){
        //                 reject('失败')
        //             }else{
        //                 for(var attr in JSON.parse(body).file){
        //                             Img[attr] = JSON.parse(body).file[attr]
        //                         }
        //                 resolve(Img)
        //             }
        //         })
        //       });
        //       return myFirstPromise.then(function(res){
        //         return ctx.body =  res
        //       })
        // }
        // 添加单条商品
        async addOne(ctx) {
            var param = ctx.request.body.param
            return cmsProductRef.create(param).then(function (res) {
                return ctx.body = res
            })
        }
        // 修改单条商品
        async update(ctx) {
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
        //删除单条商品
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
        // 修改楼层   
        async FloorUpdate(ctx) {
            var Id = ctx.request.body.RECID;
            var param = {
                navigationConfig: ctx.request.body.param
            }
            return CmsSpecialActivity.update(param, {
                'where': {
                    'RECID': Id
                }
            }).then(function (res) {
                return ctx.body = '修改成功'
            })
        }
        async LimitUpdate(ctx) {
            var Id = ctx.request.body.RECID;
            console.log(ctx.request.body)
            var param = ctx.request.body.param
            return CmsSpecialActivity.update(param, {
                'where': {
                    'RECID': Id
                }
            }).then(function (res) {
                return ctx.body = '修改成功'
            })
        }
        //获取Uuid
        async UuId(ctx) {
            return ctx.body = uuidv4()
        }
        // 修改专题  
        async UpdateSpecialSubject(ctx) {
            var Id = ctx.request.body.RECID;
            var param = ctx.request.body.param
            if(param.startTime){
                param.startTime =  moment(param.startTime).add(8, "hours").format()
            }
            if(param.endTime){
                param.endTime =  moment(param.endTime).add(8, "hours").format()
            }
            return CmsSpecialActivity.update(param, {
                'where': {
                    'RECID': Id
                }
            }).then(function (res) {
                return ctx.body = res
            })
        }
        async status(ctx) {
            var status = ctx.query.status
            var Id = ctx.query.Id
            var param = {
                'status': status
            }
            return CmsSpecialActivity.update(param, {
                'where': {
                    'recid': Id
                }
            }).then(function (res) {
                return ctx.body = res
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
        // 添加专题
        async creatSpecialSubject(ctx) {
            var param = ctx.request.body.param
            return CmsSpecialActivity.create(param).then(function (res) {
                return ctx.body = res
            })
        }
        // 删除专题
        async DestroySpecialSubject(ctx) {
            return CmsSpecialActivity.destroy({
                'where': {
                    'RECID': ctx.query.RECID
                }
            }).then(function (res) {
                return ctx.body = '删除成功'
            });
        }
        // 删除专题对应的商品
        async deleteGoods(ctx) {
            var arr = ctx.query.CodeArr.split(']')[0].split('[')[1].split(',')
            var codeArr = []
            for (var i = 0; i < arr.length; i++) {
                codeArr.push(arr[i].split('\"')[1])
            }
            return cmsProductRef.destroy({
                'where': {
                    'RELATION_CODE': {
                        $in: codeArr
                    }
                }
            }).then(function (res) {
                return ctx.body = '删除成功';
            });
        }
        // 删除单个楼层对应的code
        async DelFloorCode(ctx) {
            return cmsProductRef.destroy({
                'where': {
                    'RELATION_CODE': ctx.query.GoodCode
                }
            }).then(function (res) {
                return ctx.body = '删除成功';
            });
        }
        // 用户登录
        async login(ctx) {
            return userInfo.findOne({
                where: {
                    'USER_ACCOUNT': ctx.request.body.username
                }
            }).then(function (res) {
                if (res) {
                    if (res.dataValues.password == ctx.request.body.password) {
                        var obj = {
                            code: 0,
                            mess: "登录成功",
                            name: res.dataValues.userAccount
                        }
                        ctx.cookies.set('admin', res.dataValues.userAccount, {
                            maxAge: 2 * 24 * 3600 * 1000
                        })
                        global.LoginName = res.dataValues.userAccount
                        return ctx.body = obj
                    } else {
                        var obj = {
                            code: 1,
                            mess: "登录失败，密码错误"
                        }
                        return ctx.body = obj

                    }
                } else {
                    var obj = {
                        code: 2,
                        mess: "登录失败,用户名不存在"
                    }
                    return ctx.body = obj
                }
                // if(res.length>0 && res)
            })
        }
        // 获取cookies
        async getCookie(ctx) {
            var attr = ctx.cookies.get('admin')
            return userInfo.findOne({
                where: {
                    'USER_ACCOUNT': attr
                }
            }).then(function (res) {
                if (res) {
                global.LoginName = res.userAccount
                    return ctx.body = {
                        Code: 1,
                        name: attr
                    }

                    
                } else {
                    return ctx.body = {
                        Code: 2
                    }
                }
            })
        }
        async logout(ctx) {
            ctx.cookies.set('admin', '', {
                maxAge: 0
            })
            return ctx.body = 'ok'
        }

        async ExcelDownLoad(ctx) {

    var exlBuf = fs.readFileSync(ctx.app.appInfo.baseDir+'/public/template/spectialTemplate.xlsx');
        }
    };
};


