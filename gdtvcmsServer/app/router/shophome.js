



'use strict';

module.exports = async function (router, controller) {
   
    router.get('/advertPosition',controller.shophome.advertPosition);

    router.get('/ShopHomePosition',controller.shophome.ShopHomePosition);
    
    router.get('/status',controller.shophome.status);

    router.get('/GetCmsProductRef',controller.shophome.GetCmsProductRef);

    router.get('/Goodstatus',controller.shophome.Goodstatus);

    router.get('/getKind',controller.shophome.getKind);

    router.post('/update',controller.shophome.update);

    router.post('/addOne',controller.shophome.addOne);

    router.get('/deleteOne',controller.shophome.deleteOne);
    
};
