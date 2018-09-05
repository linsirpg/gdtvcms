/*
* @Author: acer
* @Date:   2017-07-07 14:08:27
* @Last Modified by:   acer
* @Last Modified time: 2017-08-02 17:52:25
*/

'use strict';

/** 购物车 控制器 */
app.controller('HomeController', function ($scope, $rootScope, $element, $stateParams, $timeout, $apiService) {
    

    var id = Number($stateParams.id);

    if (!id || isNaN(id)) {
        return ;
    }






















    function throttle(method, t){
        var tId;
        t = t || 60;
        return function () {
            var self = this;
            clearTimeout(tId);
            tId = setTimeout(function(){
                method.apply(self, arguments);
            }, t);
        }
    };


    $rootScope.Special = {
        Title: 'DV.生活商城，新年快乐，正品保证，全省包邮',
        Style: '',
        Kind: '',
        Thumbnail: [],
        ThumbnailBanner: [],
        Recomment: null,
        Advert: null,
        Navigation: []
    };



    $scope.Special = $rootScope.Special;
    $scope.$statistics = $rootScope.$Statistics;
    $scope.$RecommenStatisticst = $rootScope.$Statistics.of('Recomment');
    $scope.$AdvertStatisticst = $rootScope.$Statistics.of('Advert');

    $scope.floor = {
        placeholderEl: null,
        el: null,
        index: 0,
        data: [],
        dataWidth: [],
        fixedStatus: false,
        moreStatus: false,
        moreMode: false,
        dataLength: 0,
        scrollTop: 0,
        onclick: function (index, Item) {
            Item.$NavStatisticst.click(Item.Title);
            $scope.floor.moreStatus = false;
            var $el = $element.find('.floor-list-' + index);
            if ($el.length) {
                $('html, body').stop().animate({
                    scrollTop: $el.offset().top - $scope.floor.placeholderEl.height()
                }, 600);
            }
        },
        updateMore: function () {
            $scope.floor.moreStatus = !$scope.floor.moreStatus;
            if ($scope.floor.moreStatus) {
                if ($scope.floor.scrollTop < $scope.floor.placeholderEl.offset().top) {
                    $(window).scrollTop($scope.floor.placeholderEl.offset().top);
                }
                $scope.floor.fixedStatus = true;
            }
        },
        init: function () {
            


            $scope.floor.placeholderEl = $element.find('.floor-container-placeholder');
            $scope.floor.el = $element.find('.floor-container.swiper-container');



            $scope.floor.dataLength = $scope.floor.data.length;
            $scope.floor.moreMode = $scope.floor.dataLength > 4;

            if (!$scope.floor.moreMode) {
                var titleArrLength = 0;
                for (let i = 0; i < $scope.floor.data.length; i++) {
                    titleArrLength += $scope.floor.data[i].Title ? $scope.floor.data[i].Title.length : 0;
                }
                for (let i = 0; i < $scope.floor.data.length; i++) {
                    var bi = 100 / titleArrLength * ($scope.floor.data[i].Title ? $scope.floor.data[i].Title.length : 0);
                    $scope.floor.dataWidth.push(bi.toFixed(6) + '%');
                }
            }



            if ($scope.floor.moreMode) {
                $timeout(function () {
                    var swiper = new Swiper($scope.floor.el, {
                        freeMode : true,
                        slidesPerView : 'auto',
                        freeModeSticky : true ,
                    });
                });
            }




            $(window).scroll(throttle(function () {
                $scope.floor.scrollTop =  Math.floor($(this).scrollTop());
                if ($scope.floor.scrollTop >= Math.floor($scope.floor.placeholderEl.offset().top)) {
                    $scope.floor.fixedStatus = true;
                } else {
                    $scope.floor.fixedStatus = false;
                    $scope.floor.moreStatus = false;
                }


                for (let i = 0; i <  $scope.floor.dataLength; i++) {
                    var $el = $element.find('.floor-list-' + i);
                    if (Math.floor($el.offset().top - $scope.floor.placeholderEl.height()) <= $scope.floor.scrollTop) {
                        $scope.floor.index = i;
                    }
                }
                $scope.$apply();
            }, 60));
        }
    };



    if (id) {

        $apiService.GetSpecialActivity(id).then(function ($res) {

            console.log($res);

            $.each($res.Navigation, function (Index, Item) {
                Item.$NavStatisticst = $rootScope.$Statistics.of('NavigationNav');
                Item.$ProductStatisticst = $rootScope.$Statistics.of('Navigation').of(Item.Title);
            })

            $.extend($scope.Special, $res);
            
            if ($scope.Special.Title) {
                window.document.title = $scope.Special.Title;
            }

            $scope.floor.data = $scope.Special.Navigation;

        });
    
    }



    $scope.gotopShow = false;
    $(window).scroll(throttle(function(){
        var pageScrollTop = $(this).scrollTop();
        if ($scope.gotopShow === false && pageScrollTop > 300 ) {
            $scope.gotopShow = true;
            $scope.$apply();
        } else if ($scope.gotopShow === true && pageScrollTop <= 300) {
            $scope.gotopShow = false;
            $scope.$apply();
        }
    }, 60)).scroll();

    $scope.ontop = function () {
        $('html, body').stop().animate({
            scrollTop: 0
        }, 600);
    };




    
    

});