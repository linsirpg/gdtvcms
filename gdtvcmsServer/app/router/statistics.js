



'use strict';

module.exports = async function (router, controller) {
    router.post('/getStatistics',controller.statistics.getStatistics);
};
