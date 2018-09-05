'use strict';
module.exports = app => {
    const cmsProductInfo = app.database.cms.models["cms_product_info"];
    
    const cmsAdvertInfo = app.database.cms.models["cms_advert_info"];

    const cmsProductRef = app.database.cms.models["cms_product_ref"];
    

    const cmsSpecialActivity = app.database.cms.models["cms_special_activity"];
    
    return class apiController extends app.Controller {
        async getProductInfo(ctx) {
            if(isNaN(ctx.query.search)){
                var Tit = "%" + ctx.query.search + "%";
                var param = {
                    where: { productName: { $like: Tit } },
                    limit: Number(ctx.query.limit),
                    offset: Number(ctx.query.offset),

                }
            }else{
                var param = {
                    where: { productNo: ctx.query.search},
                    limit: Number(ctx.query.limit),
                    offset: Number(ctx.query.offset),
                }
            }
            
                return cmsProductInfo.findAndCountAll(param).then(function(res){
                return ctx.body = res
            })
        }
        async test(ctx){
               var param = {
                    where: { advertCode:ctx.request.body.AdvertCode},
                    limit:Number(ctx.request.body.PageSize),
                    offset: Number(ctx.request.body.PageIndex) -1,
                }
           return cmsAdvertInfo.findAndCountAll(param).then(function(res){
               var result = {
                    Data:[]
               }
               res.rows.map(function(res){
                var obj = {}
                for (var attr in res.dataValues)
                {
                    obj[attr.substring(0,1).toUpperCase()+attr.substring(1)] = res.dataValues[attr.substring(0,1).toLowerCase()+attr.substring(1)]
                }
                result.Data.push(obj)
               })
               return ctx.body = result
           })
        }
        async getspecialactivity (ctx) {
            let ResultData = {
                ErrorCode: 0,
                ErrorMessage: 'ok',
                Data:null,
            }
              return cmsSpecialActivity.findById(ctx.request.body.Id).then(function(res) {
                ResultData.Data = res
                return ctx.body = ResultData
              })
        }
        async GetReferenceProductList (ctx) {
            let ResultData = {
                ErrorCode: 0,
                ErrorMessage: 'ok',
                Data:[]
            }            
            const ProductList = await cmsProductRef.findAll({where:{relationCode:ctx.request.body.ReferenceCode,status:'1'}})
            for(var i = 0 ; i < ProductList.length; i ++) {
                var ProductMess = await cmsProductInfo.findOne({where:{productNo:ProductList[i].productNo}})
                ProductList.map(function (item) {
                    if(item.productNo == ProductMess.productNo) {
                        var obj = {
                            "ProductNo":'',
                            "ProductName":'',
                            "ShortDesc":'',
                            "ProductImage":'',
                            "Url":'',
                            "SaleCount":'',
                            "SalePrice":'',
                            "MarketPrice":'',
                            "Status":'',
                        }   
                            obj.ProductNo = ProductList[i].productNo?ProductList[i].productNo:ProductMess.productNo;
                            obj.ProductName = ProductList[i].title?ProductList[i].title:ProductMess.productName;
                            obj.ShortDesc = ProductList[i].memo? ProductList[i].memo : ProductMess.shortDesc;
                            obj.ProductImage = ProductList[i].imageUrl?ProductList[i].imageUrl:ProductMess.productImage;
                            obj.Url = "https://gdtvshop.weixinmvp.com/wap/shop/productdetail.aspx?no=" + item.productNo;
                            obj.SaleCount =  ProductMess.saleCount;
                            obj.SalePrice =  ProductList[i].salePrice?ProductList[i].salePrice:ProductMess.salePrice;
                            obj.MarketPrice = ProductList[i].marketPrice?ProductList[i].marketPrice:ProductMess.marketPrice;
                            ResultData.Data.push(obj)
                    }
    
                })                     
            }
            return ctx.body = ResultData        
        }
    };
};