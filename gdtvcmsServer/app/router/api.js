



'use strict';

module.exports = async function (router, controller) {
    
    router.get('/getProductInfo',controller.api.getProductInfo );



    router.post('/Advert/LoadAdvertList',controller.api.test );
    router.post('/Activity/GetSpecialActivity', controller.api.getspecialactivity);
    router.post('/Product/GetReferenceProductList', controller.api.GetReferenceProductList);

};