



'use strict';

module.exports = async function (router, controller) {
	router.get('/GetSArticleInfo',controller.articleinfo.GetSArticleInfo)

	router.get('/GetByTitle',controller.articleinfo.GetByTitle)

	router.get('/status',controller.articleinfo.status)

	router.get('/ProductStatus',controller.articleinfo.ProductStatus)

	router.get('/DestroyArticleInfo',controller.articleinfo.DestroyArticleInfo)

	router.get('/GetOneSArticleInfo',controller.articleinfo.GetOneSArticleInfo)

	router.get('/GetCmsProductRef',controller.articleinfo.GetCmsProductRef)

	router.get('/deleteOne',controller.articleinfo.deleteOne)

	router.post('/addOne',controller.articleinfo.addOne)

	router.post('/update',controller.articleinfo.update)

	router.get('/Goodstatus',controller.articleinfo.Goodstatus)

	router.post('/UpdateArtical',controller.articleinfo.UpdateArtical)

	router.post('/creat',controller.articleinfo.creat)
	
	router.get('/DelCode',controller.articleinfo.DelCode)

};


