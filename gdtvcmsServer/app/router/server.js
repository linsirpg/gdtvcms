



'use strict';

module.exports = async function (router, controller) {
    router.get('/GetSpecialSubject', controller.server.GetSpecialSubject);

    router.get('/GetSpecialSubjectPagination', controller.server.GetSpecialSubjectPagination);
    
    router.get('/GetCodeGoods', controller.server.GetCodeGoods);

    router.get('/GetByTitle', controller.server.GetByTitle);

    router.post('/file', controller.server.file);

    router.post('/addOne',controller.server.addOne);

    router.post('/update',controller.server.update);

    router.get('/deleteOne',controller.server.deleteOne);

    router.post('/FloorUpdate',controller.server.FloorUpdate); 
    
    router.post('/LimitUpdate',controller.server.LimitUpdate); 
    

    router.get('/UuId',controller.server.UuId);    

    router.get('/UpdateSpecialSubject',controller.server.UpdateSpecialSubject);  
    
    router.post('/UpdateSpecialSubject',controller.server.UpdateSpecialSubject);  

    router.post('/creatSpecialSubject',controller.server.creatSpecialSubject);    
      
    router.get('/DestroySpecialSubject',controller.server.DestroySpecialSubject);

    router.get('/deleteGoods',controller.server.deleteGoods);

    router.get('/DelFloorCode',controller.server.DelFloorCode);

    router.post('/login',controller.server.login);
    
    router.get('/getCookie',controller.server.getCookie);

    router.get('/GetCodeGoodsPagination',controller.server.GetCodeGoodsPagination);

    router.get('/GetByNum',controller.server.GetByNum);

    router.get('/logout',controller.server.logout);


    router.get('/status',controller.server.status);

    router.get('/Goodstatus',controller.server.Goodstatus);
    
};

