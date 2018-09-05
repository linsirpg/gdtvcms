



'use strict';

module.exports = async function (router, controller) {
    router.post('/Excel',controller.public.Excel );
    router.post('/presetExcel',controller.public.presetExcel );
    // router.post('/UpdateProductRef',controller.public.UpdateProductRef );
    // router.get('/test',controller.public.UpdateProductRef );
    router.get('/Upcatecategory',controller.public.Upcatecategory );
    //根据分类导入产品
    // router.post('/addProduct',controller.public.addProduct);
    
    router.post('/addAdverProduct',controller.public.addAdverProduct);
    
    // 跟新分类的产品
    // router.post('/updateProduct',controller.public.updateProduct);
    
    
};

