"use strict";
var path = require("path");
var fs = require("fs");
var xlsx = require("node-xlsx");
const uuidv4 = require("uuid/v4");
module.exports = app => {
  const cmsPresetProduct = app.database.cms.models["cms_preset_product"];
  const CmsSpecialActivity = app.database.cms.models["cms_special_activity"];

  const cmsProductInfo = app.database.cms.models["cms_product_info"];
  
  const cmsProductRef = app.database.cms.models["cms_product_ref"];

  const shopCategory = app.database.cms.models["shop_category"];

  const shopProductInfo = app.database.cms.models["shop_product_info"];

  const cmsAdvertInfo = app.database.cms.models["cms_advert_info"];

  return class PresetController extends app.Controller {
    async Upcatecategory(ctx) {}
    // 专场Excel创建接口
    async Excel(ctx) {

      ////////////////  修改分类接口//////////////////////////////
      // console.log(11);
      // var param1 = {
      //   title: null,
      //   kind: "specialactivity"
      // };
      // var LcArr = [];
      // var GoodArr = [];
      // var Img = null;
      // var updataArr = [];
      // const { fields, files, filesList } = await ctx.request.getFormidable(
      //   true
      // );
      // var OldPath = files.file.path;
      // var myDate = new Date();
      // var FName =
      //   myDate.getFullYear() +
      //   addZero(String(myDate.getMonth() + 1)) +
      //   addZero(String(myDate.getDate()));
      // function addZero(num) {
      //   if (num < 10) {
      //     return 0 + num;
      //   } else {
      //     return num;
      //   }
      // }
      // var FN = path.join(__dirname, "../../public/excel/" + FName);
      // var newpath =
      //   FN + "\\" + path.parse(OldPath).name + path.extname(files.file.name);
      // fs.readdir(FN, function(err, files) {
      //   if (err) {
      //     fs.mkdir(FN, function(err) {
      //       if (err) {
      //       } else {
      //         fs.rename(OldPath, newpath, function(err) {
      //           if (!err) {
      //             for (var z = 0; z < xlsx.parse(newpath).length; z++) {
      //               var Obj = xlsx.parse(newpath)[z];
      //               for (var i = 0; i < Obj.data.lengt; i++) {
      //                 console.log(Obj.data[i]);
      //               }
      //             }
      //           }
      //         });
      //       }
      //     });
      //   } else {
      //     fs.rename(OldPath, newpath, function(err) {
      //       if (!err) {
      //         var Mess = null;
      //         var idArr = [];
      //         var ProArr = [];
      //         var arr = [];
      //         for (var z = 0; z < xlsx.parse(newpath).length; z++) {
      //           var Obj = xlsx.parse(newpath)[z];
      //           console.log(Obj.data.length);
      //           for (var i = 0; i < Obj.data.length; i++) {
      //             if (!Obj.data[i][0].length) {
      //               // console.log(Obj.data[i][0])
      //               idArr.push(Obj.data[i][0]);
      //               if (arr.length > 0) {
      //                 ProArr.push(arr);
      //                 arr = [];
      //               }
      //             } else {
      //               // console.log(Obj.data[i][0])
      //               arr.push(Obj.data[i][0]);
      //               // console.log(Obj.data[i][0])
      //             }
      //           }
      //           ProArr.push(arr);
      //           // console.log(ProArr)
      //           // console.log(idArr)
      //           // for (var j = 0; j < idArr.length; j++) {
      //             // var Result = new Promise((resolve,reject)=>{
      //             //   shopCategory.findById(idArr[j]).then(function(res){
      //             //     if(res){
      //             //       resolve(res.dataValues)
      //             //     }else{
      //             //       reject(res.dataValues)
      //             //     }
      //             //   })
      //             // })
      //             // Result.then(function(res){
      //             //   console.log(res)
      //             //   console.log(ProArr[j])
      //             // })
      //           // }
      //           // console.log(idArr.length)
      //           // console.log(ProArr.length)
      //           function factorical(num) {
      //             if (num >= idArr.length) {
      //               return 1;
      //             } else {
      //               var Result = new Promise((resolve, reject) => {
      //                 shopCategory.findById(idArr[num]).then(function(res) {
      //                   if (res) {
      //                     resolve(res.dataValues);
      //                   } else {
      //                     reject(res.dataValues);
      //                   }
      //                 });
      //               });
      //               Result.then(function(res) {
      //                var param = {}
      //                param.typeId = res.id
      //                param.typePrefix = res.prefix
      //                 // console.log(ProArr[num]);
      //                 for(var m = 0 ; m < ProArr[num].length;m++){
      //                   // console.log(res.prefix,res.id);
      //                   // console.log(ProArr[num][m])
      //                   shopProductInfo.update(param,{
      //                     where:{productNo:ProArr[num][m]}
      //                   }).then(function(){
      //                     console.log('ok')
      //                   })
      //                 }
      //                 num = num + 1 
      //                 factorical(num)
      //               });
      //             }
      //           }
      //           factorical(0);
      //         }
      //       }
      //     });
      //   }
      // });


      //专场导入接口
      var param1 = {
        title: null,
        kind: "specialactivity"
      };
      var LcArr = [];
      var GoodArr = [];
      var Img = null;

      const { fields, files, filesList } = await ctx.request.getFormidable(
        true
      );
      var OldPath = files.file.path;
      var myDate = new Date();
      var FName =
        myDate.getFullYear() +
        addZero(String(myDate.getMonth() + 1)) +
        addZero(String(myDate.getDate()));
      function addZero(num) {
        if (num < 10) {

          return 0 + num;
        } else {
          return num;
        }
      }
      var FN = path.join(__dirname, "../../public/excel/" + FName);
      var newpath =
        FN + "\\" + path.parse(OldPath).name + path.extname(files.file.name);
      fs.readdir(FN, function(err, files) {
        if (err) {
          fs.mkdir(FN, function(err) {
            if (err) {
            } else {
              fs.rename(OldPath, newpath, function(err) {
                if (!err) {
                  var CODE = null;
                  for (var z = 0; z < xlsx.parse(newpath).length; z++) {
                    var Obj = xlsx.parse(newpath)[z];
                    var LcArr = [];
                    var GoodArr = [];
                    param1.title = Obj.name;
                  var KeyName = null;

                    for (var i = 0; i < Obj.data.length; i++) {
                      if(Obj.data[i].length == 5 && isNaN(Obj.data[i][0]) ){
                        KeyName = Obj.data[i];

                      }
                      if(Obj.data[i].length == 2 && isNaN(Obj.data[i][0])){
                        CODE = uuidv4().split("-").join("");
                        var LCOBJ = {};
                        LCOBJ.Title = Obj.data[i][0];
                        LCOBJ.TempId = Obj.data[i][1];
                        LCOBJ.Code = CODE
                        LCOBJ.Image = [];
                        LcArr.push(LCOBJ)
                      }
                      if(isNaN(Obj.data[i][0])){
                      }else{
                          var OBJ = {};
                          for (var j = 0; j < KeyName.length; j++) {
                            if (Obj.data[i][j]) {
                              OBJ[KeyName[j]] = Obj.data[i][j];
                            }
                          }
                          OBJ.relationCode = CODE
                          OBJ.relationKind = "specialactivity"
                          OBJ.status = 1
                          if(!OBJ.url){
                            OBJ.url = "https://gdtvshop.weixinmvp.com/Wap/Shop/ProductDetail.aspx?no="+OBJ.productNo
                          }
                          if(!OBJ.sort){
                            OBJ.sort = 99
                          }
                        GoodArr.push(OBJ);
                      }
                    }
                    param1.navigationConfig = JSON.stringify(LcArr);
                    param1.createDate = new Date();
                    param1.updateDate = new Date();
                    param1.thumbnailUrl = "[]";
                    param1.startTime = new Date();
                    param1.endTime = new Date().setFullYear(
                      param1.startTime.getFullYear() + 1
                    );
                    param1.status = "0";
                    CmsSpecialActivity.create(param1).then(function(res) {});
                    cmsProductRef.bulkCreate(GoodArr).then(function(res) {});
                  }
                }
              });
            }
          });
        } else {
          fs.rename(OldPath, newpath, function(err) {
            if (!err) {
              var CODE = null;
              for (var z = 0; z < xlsx.parse(newpath).length; z++) {
                var Obj = xlsx.parse(newpath)[z];
                var LcArr = [];
                var GoodArr = [];
                param1.title = Obj.name;
              var KeyName = null;

                for (var i = 0; i < Obj.data.length; i++) {
                  if(Obj.data[i].length == 5 && isNaN(Obj.data[i][0]) ){
                    KeyName = Obj.data[i];

                  }
                  if(Obj.data[i].length == 2 && isNaN(Obj.data[i][0])){
                    CODE = uuidv4().split("-").join("");
                    var LCOBJ = {};
                    LCOBJ.Title = Obj.data[i][0];
                    LCOBJ.TempId = Obj.data[i][1];
                    LCOBJ.Code = CODE
                    LCOBJ.Image = [];
                    LcArr.push(LCOBJ)
                  }
                  if(isNaN(Obj.data[i][0])){
                  }else{
                      var OBJ = {};
                      for (var j = 0; j < KeyName.length; j++) {
                        if (Obj.data[i][j]) {
                          OBJ[KeyName[j]] = Obj.data[i][j];
                        }
                      }
                      OBJ.relationCode = CODE
                      OBJ.relationKind = "specialactivity"
                      OBJ.status = 1
                      if(!OBJ.url){
                        OBJ.url = "https://gdtvshop.weixinmvp.com/Wap/Shop/ProductDetail.aspx?no="+OBJ.productNo
                      }
                      if(!OBJ.sort){
                        OBJ.sort = 99
                      }
                    GoodArr.push(OBJ);
                  }
                }
                param1.navigationConfig = JSON.stringify(LcArr);
                param1.createDate = new Date();
                param1.updateDate = new Date();
                param1.thumbnailUrl = "[]";
                param1.startTime = new Date();
                param1.endTime = new Date().setFullYear(
                  param1.startTime.getFullYear() + 1
                );
                param1.status = "0";
                CmsSpecialActivity.create(param1).then(function(res) {});
                cmsProductRef.bulkCreate(GoodArr).then(function(res) {});
              }
            }
          });
        }
      });
      return (ctx.body = "ok");
    }

    async presetExcel(ctx) {
      var Img = null;
      const { fields, files, filesList } = await ctx.request.getFormidable(
        true
      );
      var OldPath = files.file.path;
      var myDate = new Date();
      var FName =
        myDate.getFullYear() +
        addZero(String(myDate.getMonth() + 1)) +
        addZero(String(myDate.getDate()));
      function addZero(num) {
        if (num < 10) {
          return 0 + num;
        } else {
          return num;
        }
      }
      var FN = path.join(__dirname, "../../public/excel/" + FName);
      var newpath =
        FN + "\\" + path.parse(OldPath).name + path.extname(files.file.name);
      fs.readdir(FN, function(err, files) {
        if (err) {
          fs.mkdir(FN, function(err) {
            if (err) {
            } else {
              fs.rename(OldPath, newpath, function(err) {
                if (!err) {
                  var PresetArr = [];
                  Img = xlsx.parse(newpath)[0].data;
                  for (var i = 0; i < Img.length; i++) {
                    var PresetObj = {};
                    if (Img[i].length > 0 && i > 0) {
                      for (var j = 0; j < Img[i].length; j++) {
                        if (Img[i][j]) {
                          if (
                            Img[0][j] == "startTime" ||
                            Img[0][j] == "endTime"
                          ) {
                            var now = new Date(1900, 0, Img[i][j]);
                            PresetObj[Img[0][j]] = now.setHours(
                              now.getHours() - 16
                            );
                          } else {
                            PresetObj[Img[0][j]] = Img[i][j];
                          }
                        }
                      }
                      PresetArr.push(PresetObj);
                    }
                  }
                  cmsPresetProduct.bulkCreate(PresetArr).then(function(res) {});
                }
              });
            }
          });
        } else {
          fs.rename(OldPath, newpath, function(err) {
            if (!err) {
              var PresetArr = [];
              Img = xlsx.parse(newpath)[0].data;
              for (var i = 0; i < Img.length; i++) {
                var PresetObj = {};
                if (Img[i].length > 0 && i > 0) {
                  for (var j = 0; j < Img[i].length; j++) {
                    if (Img[i][j]) {
                      if (Img[0][j] == "startTime" || Img[0][j] == "endTime") {
                        var now = new Date(1900, 0, Img[i][j]);
                        PresetObj[Img[0][j]] = now.setHours(
                          now.getHours() - 16
                        );
                      } else {
                        PresetObj[Img[0][j]] = Img[i][j];
                      }
                    }
                  }
                  PresetArr.push(PresetObj);
                }
              }
              cmsPresetProduct.bulkCreate(PresetArr).then(function(res) {});
            }
          });
        }
      });
      return (ctx.body = "ok");
    }
    // addProduct
    async addProduct (ctx){
      var KindName = [];
      var KindProduct = [];
      var productList = [];

      var KindProductNoRepeat = [];
      
      var Img = null;
      const { fields, files, filesList } = await ctx.request.getFormidable(
        true
      );
      var OldPath = files.file.path;
      var myDate = new Date();
      var FName =
        myDate.getFullYear() +
        addZero(String(myDate.getMonth() + 1)) +
        addZero(String(myDate.getDate()));
      function addZero(num) {
        if (num < 10) {

          return 0 + num;
        } else {
          return num;
        }
      }
      var FN = path.join(__dirname, "../../public/excel/" + FName);
      var newpath =
        FN + "\\" + path.parse(OldPath).name + path.extname(files.file.name);
        fs.readdir(FN, function(err, files) {
          if (err) {
            fs.mkdir(FN, function(err) {
              if (err) {
              } else {
                fs.rename(OldPath, newpath, function(err) {
                  if (!err) {
                    var PresetArr = [];
                    var obj = []
                    for(let i = 0 ; i < xlsx.parse(newpath).length; i++){
                      Img = xlsx.parse(newpath)[i]
                      KindName.push(Img.name)
                      for(let j = 0 ; j < Img.data.length ; j++){
                          if(Img.data[j][0]){
                            obj.push(Img.data[j])
                          }
                      }
                      KindProduct.push(obj)
    
                    }
                  }
                });
              }
            });
          } else {
            fs.rename(OldPath, newpath, function(err) {
              if (!err) {
                var PresetArr = [];
                for(var i = 0 ; i < xlsx.parse(newpath).length; i++){
                var obj = []
                  Img = xlsx.parse(newpath)[i]
                  KindName.push(Img.name)
                  for(var j = 0 ; j < Img.data.length ; j++){
                      if(Img.data[j][0]){
                        obj.push(Img.data[j][0])
                      }
                  }
                  KindProduct.push(obj)

                }
                
                var aaa = async function(){
                  for(let q = 0 ; q < KindName.length;q++){
                    var finsharr = [];
                    for(let l = 0 ; l < KindProduct[q].length;l++){
                     await cmsAdvertInfo.findAll({where:{"advertCode":KindName[q],"productNo":KindProduct[q][l]}}).then(function(res){
                        // console.log(res)
                        if(res.length == 0){
                          finsharr.push(KindProduct[q][l])
                        }
                      })

                    }
                    KindProductNoRepeat.push(finsharr)

                  }

                  for(let a = 0 ; a < KindName.length ; a ++){
                    
                    for(let p = 0 ; p < KindProductNoRepeat[a].length; p ++){
                      var ProductObj = {
                        "advertCode":"",
                        "title":"",
                        "describe":"",
                        "productNo":"",
                        "url":"",
                        "sort":'99',
                        'kind':"PRODUCT",
                        'navigationConfig':"[]",
                        "param1":"",
                        "status":"1"
                      }
                     await cmsProductInfo.findOne({where:{productNo:KindProductNoRepeat[a][p]}}).then(function(res){
                       if(res){
                        ProductObj.advertCode = KindName[a]
                       
                        ProductObj.productNo = res.productNo
    
                        ProductObj.title = res.productName
    
                        ProductObj.describe = res.shortDesc
    
                        ProductObj.url =  "https://gdtvshop.weixinmvp.com/wap/shop/productdetail.aspx?no=" + res.productNo;
                        ProductObj.param1 = res.salePrice
                        productList.push(ProductObj)
                       }else{
                        //  console.log(KindProductNoRepeat[a][p],121)
                       }
                      })
                    }
                  }

                  cmsAdvertInfo.bulkCreate(productList).then(function(res) {
                  });
                  
                }
              
                aaa()
              }
            });
          }
        });
      return 'ok';
    }


    async addAdverProduct (ctx) {

      var KindName = [];
      var KindProduct = [];
      var productList = [];

      var KindProductNoRepeat = [];
      
      var Img = null;
      const { fields, files, filesList } = await ctx.request.getFormidable(
        true
      );
      var OldPath = files.file.path;
      var myDate = new Date();
      var FName =
        myDate.getFullYear() +
        addZero(String(myDate.getMonth() + 1)) +
        addZero(String(myDate.getDate()));
      function addZero(num) {
        if (num < 10) {

          return 0 + num;
        } else {
          return num;
        }
      }
      var FN = path.join(__dirname, "../../public/excel/" + FName);
      var newpath =
        FN + "\\" + path.parse(OldPath).name + path.extname(files.file.name);
        fs.readdir(FN, function(err, files) {
          if (err) {
            fs.mkdir(FN, function(err) {
              if (err) {
              } else {
                fs.rename(OldPath, newpath, function(err) {
                  if (!err) {
                    var PresetArr = [];
                    for(var i = 0 ; i < xlsx.parse(newpath).length; i++){
                    var obj = {}
                      Img = xlsx.parse(newpath)[i]
                      KindName.push(Img.name)
                      var Array1 = []
                      for(var j = 1 ; j < Img.data.length ; j++){
                        obj = {}
                          Img.data[j].map(function(item, index){
                            obj[Img.data[0][index]] = item
                          })
                          if(!obj.sort){
                            obj.sort = '99'
                          }
                          if(!obj.url){
                            obj.url = "https://gdtvshop.weixinmvp.com/wap/shop/productdetail.aspx?no=" + obj.productNo;
                          }  
                          if(!obj.status){
                            obj.status = "1"
                          }           
                          Array1.push(obj)            
                      }
                      KindProduct.push(Array1)
                    }
                    var aaa = async function(){
                      for(let q = 0 ; q < KindName.length;q++){
                        var finsharr = [];
                        for(let l = 0 ; l < KindProduct[q].length;l++){
                         await cmsAdvertInfo.findAll({where:{"advertCode":KindName[q],"productNo":KindProduct[q][l].productNo}}).then(function(res){
                            if(res.length == 0){
                              finsharr.push(KindProduct[q][l])
                            }
                          })
    
                        }
                        KindProductNoRepeat.push(finsharr)
    
                      }
                      for(let a = 0 ; a < KindName.length ; a ++){
                        
                        for(let p = 0 ; p < KindProductNoRepeat[a].length; p ++){
                          var ProductObj = {
                            "advertCode":"",
                            "title":"",
                            "describe":"",
                            "productNo":"",
                            "url":"",
                            "sort":'99',
                            'kind':"PRODUCT",
                            'navigationConfig':"[]",
                            "param1":"",
                            "status":"1"
                          }
                         await cmsProductInfo.findOne({where:{productNo:KindProductNoRepeat[a][p].productNo}}).then(function(res){
                           if(res){
                            ProductObj.productNo = res.productNo
                              ProductObj.advertCode = KindName[a]
                             if(KindProductNoRepeat[a][p].title){
                              ProductObj.title = KindProductNoRepeat[a][p].title
                             }else{
                              ProductObj.title = res.productName
                             }
                             if(KindProductNoRepeat[a][p].describe){
                              ProductObj.describe = KindProductNoRepeat[a][p].describe
                             }else{
                              ProductObj.describe = res.shortDesc
                             }  
                             if(KindProductNoRepeat[a][p].sort){
                              ProductObj.sort = KindProductNoRepeat[a][p].sort
                             }   
                             if(KindProductNoRepeat[a][p].status){
                              ProductObj.status = KindProductNoRepeat[a][p].status
                             }
                             if(KindProductNoRepeat[a][p].url){
                              ProductObj.url = KindProductNoRepeat[a][p].url
                             }else{
                              ProductObj.url =  "https://gdtvshop.weixinmvp.com/wap/shop/productdetail.aspx?no=" + res.productNo;
                             }                                                
                            
                            ProductObj.param1 = res.salePrice
                            productList.push(ProductObj)
                           }
                          })
                        }
                      }
    
                      cmsAdvertInfo.bulkCreate(productList).then(function(res) {
                      });
                    }
                    aaa()

                  }
                });
              }
            });
          } else {
            fs.rename(OldPath, newpath, function(err) {
              if (!err) {
                var PresetArr = [];
                for(var i = 0 ; i < xlsx.parse(newpath).length; i++){
                var obj = {}
                  Img = xlsx.parse(newpath)[i]
                  KindName.push(Img.name)
                  var Array1 = []
                  for(var j = 1 ; j < Img.data.length ; j++){
                    obj = {}
                      Img.data[j].map(function(item, index){
                        obj[Img.data[0][index]] = item
                      })
                      if(!obj.sort){
                        obj.sort = '99'
                      }
                      if(!obj.url){
                        obj.url = "https://gdtvshop.weixinmvp.com/wap/shop/productdetail.aspx?no=" + obj.productNo;
                      }  
                      if(!obj.status){
                        obj.status = "1"
                      }           
                      Array1.push(obj)            
                  }
                  KindProduct.push(Array1)
                }
                var aaa = async function(){
                  for(let q = 0 ; q < KindName.length;q++){
                    var finsharr = [];
                    for(let l = 0 ; l < KindProduct[q].length;l++){
                     await cmsAdvertInfo.findAll({where:{"advertCode":KindName[q],"productNo":KindProduct[q][l].productNo}}).then(function(res){
                        if(res.length == 0){
                          finsharr.push(KindProduct[q][l])
                        }
                      })

                    }
                    KindProductNoRepeat.push(finsharr)

                  }
                  for(let a = 0 ; a < KindName.length ; a ++){
                    
                    for(let p = 0 ; p < KindProductNoRepeat[a].length; p ++){
                      var ProductObj = {
                        "advertCode":"",
                        "title":"",
                        "describe":"",
                        "productNo":"",
                        "url":"",
                        "sort":'99',
                        'kind':"PRODUCT",
                        'navigationConfig':"[]",
                        "param1":"",
                        "status":"1"
                      }
                     await cmsProductInfo.findOne({where:{productNo:KindProductNoRepeat[a][p].productNo}}).then(function(res){
                       if(res){
                        ProductObj.productNo = res.productNo
                          ProductObj.advertCode = KindName[a]
                         if(KindProductNoRepeat[a][p].title){
                          ProductObj.title = KindProductNoRepeat[a][p].title
                         }else{
                          ProductObj.title = res.productName
                         }
                         if(KindProductNoRepeat[a][p].describe){
                          ProductObj.describe = KindProductNoRepeat[a][p].describe
                         }else{
                          ProductObj.describe = res.shortDesc
                         }  
                         if(KindProductNoRepeat[a][p].sort){
                          ProductObj.sort = KindProductNoRepeat[a][p].sort
                         }   
                         if(KindProductNoRepeat[a][p].status){
                          ProductObj.status = KindProductNoRepeat[a][p].status
                         }
                         if(KindProductNoRepeat[a][p].url){
                          ProductObj.url = KindProductNoRepeat[a][p].url
                         }else{
                          ProductObj.url =  "https://gdtvshop.weixinmvp.com/wap/shop/productdetail.aspx?no=" + res.productNo;
                         }                                                
                        
                        ProductObj.param1 = res.salePrice
                        productList.push(ProductObj)
                       }
                      })
                    }
                  }

                  cmsAdvertInfo.bulkCreate(productList).then(function(res) {
                  });
                }
                aaa()
              }
            });
          }
        });
        return (ctx.body = "ok");
    }
    async updateProduct (ctx){
      var KindName = [];
      var KindProduct = [];
      var productList = [];

      var KindProductNoRepeat = [];
      
      var Img = null;
      const { fields, files, filesList } = await ctx.request.getFormidable(
        true
      );
      var OldPath = files.file.path;
      var myDate = new Date();
      var FName =
        myDate.getFullYear() +
        addZero(String(myDate.getMonth() + 1)) +
        addZero(String(myDate.getDate()));
      function addZero(num) {
        if (num < 10) {

          return 0 + num;
        } else {
          return num;
        }
      }
      var FN = path.join(__dirname, "../../public/excel/" + FName);
      var newpath =
        FN + "\\" + path.parse(OldPath).name + path.extname(files.file.name);
        fs.readdir(FN, function(err, files) {
          if (err) {
            fs.mkdir(FN, function(err) {
              if (err) {
              } else {
                fs.rename(OldPath, newpath, function(err) {
                  if (!err) {
                    var PresetArr = [];
                    var obj = []
                    for(let i = 0 ; i < xlsx.parse(newpath).length; i++){
                      Img = xlsx.parse(newpath)[i]
                      KindName.push(Img.name)
                      for(let j = 0 ; j < Img.data.length ; j++){
                          if(Img.data[j][0]){
                            obj.push(Img.data[j])
                          }
                      }
                      KindProduct.push(obj)
    
                    }
                  }
                });
              }
            });
          } else {
            fs.rename(OldPath, newpath, function(err) {
              if (!err) {
                var PresetArr = [];
                for(var i = 0 ; i < xlsx.parse(newpath).length; i++){
                var obj = []
                  Img = xlsx.parse(newpath)[i]
                  KindName.push(Img.name)
                  for(var j = 0 ; j < Img.data.length ; j++){
                    
                    var productObj = {
                    };
                      if(Img.data[j][0]){
                        productObj.productNo = Img.data[j][0]
                      }
                      if(Img.data[j][1]){
                        productObj.title = Img.data[j][1]
                      }
                      if(Img.data[j][2]){
                        productObj.describe = Img.data[j][2]
                      }
                      if(Img.data[j][0]){
                        obj.push(productObj)
                      }
                    
                  }
                  KindProduct.push(obj)
                }

              var asyncUpdate = async function(){
                  for(let p = 0 ; p < KindName.length; p ++){
                    for(let u = 0 ; u < KindProduct[p].length; u ++){

                        
                        await cmsAdvertInfo.update(KindProduct[p][u],{where:{productNo:KindProduct[p][u].productNo,advertCode:KindName[p]}}).then(function(res){
                        })
                    }

                  }
              };
              asyncUpdate();
              }
            });
          }
        });
      return 'ok';
    }



























    // UpdateProductRef  修改productRef 表的对应编码的描述
    async UpdateProductRef(ctx) {
      const { fields, files, filesList } = await ctx.request.getFormidable(
        true
      );
      var GoodsArr = [];
      var Img = [];
      var OldPath = files.file.path;
      var myDate = new Date();
      var FName =
        myDate.getFullYear() +
        addZero(String(myDate.getMonth() + 1)) +
        addZero(String(myDate.getDate()));
      function addZero(num) {
        if (num < 10) {
          return 0 + num;
        } else {
          return num;
        }
      }
      var FN = path.join(__dirname, "../../public/excel/" + FName);
      var newpath =
        FN + "\\" + path.parse(OldPath).name + path.extname(files.file.name);
      fs.readdir(FN, function(err, files) {
        if (err) {
          fs.mkdir(FN, function(err) {
            if (err) {
            } else {
              fs.rename(OldPath, newpath, function(err) {
                if (!err) {
                  Img = xlsx.parse(newpath)[0].data;

                  var KeyName = Img[0];
                  for (var i = 1; i < Img.length; i++) {
                    var obj = {};
                    var NOW = Img[i];
                    for (var j = 0; j < KeyName.length; j++) {
                      if (Img[i][j]) {
                        obj[KeyName[j]] = Img[i][j];
                      }
                    }
                    GoodsArr.push(obj);
                  }
                  for (var i = 0; i < GoodsArr.length; i++) {
                    cmsProductRef
                      .update(GoodsArr[i], {
                        where: { productNo: GoodsArr[i].productNo }
                      })
                      .then(function(res) {});
                  }
                }
              });
            }
          });
        } else {
          fs.rename(OldPath, newpath, function(err) {
            if (!err) {
              Img = xlsx.parse(newpath)[0].data;

              var KeyName = Img[0];
              for (var i = 1; i < Img.length; i++) {
                var obj = {};
                var NOW = Img[i];
                for (var j = 0; j < KeyName.length; j++) {
                  if (Img[i][j]) {
                    obj[KeyName[j]] = Img[i][j];
                  }
                }
                GoodsArr.push(obj);
              }
              for (var i = 0; i < GoodsArr.length; i++) {
                cmsProductRef
                  .update(GoodsArr[i], {
                    where: { productNo: GoodsArr[i].productNo }
                  })
                  .then(function(res) {});
              }
            }
          });
        }
      });
      return (ctx.body = "ok");
    }
  };
};
