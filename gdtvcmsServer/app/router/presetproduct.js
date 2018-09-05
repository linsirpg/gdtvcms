
'use strict';

module.exports = async function (router, controller) {
    router.get('/GetpresetProduct', controller.presetproduct.GetpresetProduct);
    router.get('/DestroyPreset', controller.presetproduct.DestroyPreset);
};