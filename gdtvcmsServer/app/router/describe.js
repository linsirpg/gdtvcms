



'use strict';

module.exports = async function (router, controller) {
	router.get('/ProDec',controller.describe.ProDec)

	router.get('/GetCmsProductTagRef',controller.describe.GetCmsProductTagRef)

	router.get('/GetProDec',controller.describe.GetProDec)

	router.get('/DeleteProDec',controller.describe.DeleteProDec)

	router.get('/DeleteCmsProductTagRef',controller.describe.DeleteCmsProductTagRef)

	router.post('/status',controller.describe.status)

	router.post('/UpdateCMSTAG',controller.describe.UpdateCMSTAG); 

	router.post('/addOne',controller.describe.addOne); 


	router.post('/EditGood',controller.describe.EditGood); 

	
	router.get('/deleteOne',controller.describe.deleteOne); 


	router.get('/getPositionList',controller.describe.getPositionList); 

	router.post('/creat',controller.describe.creat); 

	router.post('/Tagstatus',controller.describe.Tagstatus)

	router.post('/getPosition',controller.describe.getPosition); 
	
};


