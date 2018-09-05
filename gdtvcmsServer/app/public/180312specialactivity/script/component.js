



// Banner
app.directive('banner', ['$timeout', function ($timeout) {
    
    return {
        restrict: 'A',
        templateUrl: './component/Banner.html',
        scope: {
            Banner: '=banner',
        },
        link: function ($scope, $element, $attrs) {
            $scope.bannerSwiperInit = function () {
                if ($scope.Banner.length <= 1) return ;
                $timeout(function () {
                    var swiper = new Swiper($element.find('.banner-container.swiper-container'), {
                        autoplay: 5000,
                        loop: true,
                        pagination : $element.find('.banner-container.swiper-container').find('.swiper-pagination').get(0),
                    });
                });
            }
        }
    }
}]);
















// 广告

app.directive('advertList', ['$compile', function ($compile) {
    return {
        restrict: 'A',
        scope: { Data: '=data', $statistics: '=statistics' },
        link: function ($scope, $element) {
            $element.html($compile('<div advert-list-template' + $scope.Data.TempId + ' data-data="Data" data-statistics="$statistics"></div>')($scope));
        }
    }
}]);


$.each([
    {
        TempId: 1,
        Method: function ($scope, $element, $attrs, $rely) {
            $scope.swiperInit = function () {
                if ($scope.Data.Data.length <= 1) return;
                $rely.$timeout(function () {
                    var swiper = new Swiper($element.find('.banner-container.swiper-container'), {
                        autoplay: 5000,
                        loop: true,
                        pagination: $element.find('.banner-container.swiper-container').find('.swiper-pagination').get(0),
                    });
                });
            }
        }
    },
    {
        TempId: 2
    },
    {
        TempId: 3
    },
    {
        TempId: 4
    },
], function (Index, Item) {
    app.directive('advertListTemplate' + Item.TempId, ['$timeout', '$apiService', function ($timeout, $apiService) {
        return {
            restrict: 'A',
            templateUrl: './component/AdvertListTemplate' + Item.TempId + '.html',
            scope: {
                Data: '=data',
                $statistics: '=statistics'
            },
            link: function ($scope, $element, $attrs) {
                return Item.Method && Item.Method($scope, $element, $attrs, {
                    $timeout: $timeout,
                    $apiService: $apiService
                })
            }
        }
    }]);
});































































// 产品列表
app.directive('productList', ['$compile', '$apiService', function ($compile, $apiService) {
    return {
        restrict: 'A',
        scope: { Data: '=data', $statistics: '=statistics' },
        link: function ($scope, $element) {
            $element.html($compile('<div product-list-template' + $scope.Data.TempId + ' data-data="Data" data-statistics="$statistics"></div>')($scope));
        }
    }
}]);



$.each([
    {
        TempId: 1,
        Method: function ($scope, $element, $attrs, $rely) {
            $scope.Data.List = [];
            $rely.$apiService.GgetReferenceProductList($scope.Data.Code).then(function (List) {
                $scope.Data.List = List;
            });
        }
    },
    {
        TempId: 2,
        Method: function ($scope, $element, $attrs, $rely) {
            $scope.Data.List = [];
            $rely.$apiService.GgetReferenceProductList($scope.Data.Code).then(function (List) {
                $scope.Data.List = List;
            });
        }
    },
    {
        TempId: 3,
        Method: function ($scope, $element, $attrs, $rely) {
            $scope.Data.List = [];
            $rely.$apiService.GgetReferenceProductList($scope.Data.Code).then(function (List) {
                $scope.Data.List = List;
            });
        }
    },
    {
        TempId: 4,
        Method: function ($scope, $element, $attrs, $rely) {
            $scope.Data.List = [];
            $rely.$apiService.GgetReferenceProductList($scope.Data.Code).then(function (List) {
                $scope.Data.List = List;
            });
        }
    },
    {
        TempId: 5,
        Method: function ($scope, $element, $attrs, $rely) {
            $scope.Data.List = [];
            $rely.$apiService.GgetReferenceProductList($scope.Data.Code).then(function (List) {
                $.each(List, function (Index, Item) {
                    if (!Item.PromotionTagText) {
                        Item.PromotionTag = 'recommend';
                        Item.PromotionTagText = '推荐';
                    }
                });
                $scope.Data.List = List;
            });
            $scope.swiperInit = function () {
                $rely.$timeout(function () {
                    var $el = $element.children().children('.swiper-container').eq(0);
                    var swiper = new Swiper($el, {
                        slidesPerView: 3.05,
                        autoplay: 5000,
                        pagination : $el.children('.swiper-pagination').get(0),
                    });
                });
            };
        }
    },
    {
        TempId: 6,
        Method: function ($scope, $element, $attrs, $rely) {
            $scope.Data.List = [];
            $rely.$apiService.GgetReferenceProductList($scope.Data.Code).then(function (List) {
                $.each(List, function (Index, Item) {
                    if (!Item.PromotionTagText) {
                        Item.PromotionTag = 'recommend';
                        Item.PromotionTagText = '推荐';
                    }
                });
                $scope.Data.List = List;
            });
            $scope.swiperInit = function () {
                $rely.$timeout(function () {
                    var $el = $element.children().children('.swiper-container').eq(0);
                    var swiper = new Swiper($el, {
                        slidesPerView: 3,
                        slidesPerGroup: 3,
                        autoplay: 5000,
                        pagination: $el.children('.swiper-pagination').get(0),
                    });
                });
            };
        }
    },
    {
        TempId: 7,
        Method: function ($scope, $element, $attrs, $rely) {
            $scope.Data.List = [];
            $rely.$apiService.GgetReferenceProductList($scope.Data.Code).then(function (List) {
                $scope.Data.List = List;
            });
            $scope.swiperInit = function () {
                $rely.$timeout(function () {
                    var $el = $element.children().children('.swiper-container').eq(0);
                    var swiper = new Swiper($el, {
                        autoplay: 5000,
                        loop: true,
                        autoplayDisableOnInteraction: false,
                        followFinger: true,
                        pagination: $el.children('.swiper-pagination').get(0),
                        effect: "coverflow",
                        centeredSlides: true,
                        slidesPerView: 1.5,
                        loopedSlides: 2,
                        coverflow: {
                            rotate: 0,
                            slideShadows: false,
                            stretch: 0,
                            depth: 150,
                            modifier: 1
                        },
                    });
                });
            };
        }
    },
    {
        TempId: 8,
        Method: function ($scope, $element, $attrs, $rely) {
            $scope.Data.List = [];
            $rely.$apiService.GgetReferenceProductList($scope.Data.Code).then(function (List) {
                $scope.Data.List = List;
            });
        }
    },
    {
        TempId: 9,
        Method: function ($scope, $element, $attrs, $rely) {
            $scope.Data.List = [];
            $rely.$apiService.GgetReferenceProductList($scope.Data.Code).then(function (List) {
                $scope.Data.List = List;
            });
        }
    }
], function (Index, Item) {
    app.directive('productListTemplate' + Item.TempId, ['$timeout', '$apiService', function ($timeout, $apiService) {
        return {
            restrict: 'A',
            templateUrl: './component/ProductListTemplate' + Item.TempId + '.html',
            scope: {
                Data: '=data',
                $statistics: '=statistics'
            },
            link: function ($scope, $element, $attrs) {
                $scope.$advertStatistics = $scope.$statistics.of('Advert');
                $scope.$productStatistics = $scope.$statistics.of('Product');
                return Item.Method && Item.Method($scope, $element, $attrs, {
                    $timeout: $timeout,
                    $apiService: $apiService
                })
            }
        };
    }]);
});


