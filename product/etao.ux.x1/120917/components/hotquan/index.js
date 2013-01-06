KISSY.add('components/hotquan/index', function (S, Brick) {
    var DOM = S.DOM, Event = S.Event;

    var HotQuan = function () {
        HotQuan.superclass.constructor.apply(this, arguments);
    };

    S.extend(HotQuan, Brick, {
        initialize: function () {
            S.use("components/carouselwithtouch/index", function (S, Utils) {
                var Carousel =   Utils.getCarousel();
                var curHotQuanNum = S.one('#J_CurHotQuanNum');

                var carousel = new Carousel('#J_HotQuanList', {
                    effect:'scrollx',
//                    autoplay: true,
//                    interval: 3,
                    hasTriggers: false,
                    easing:'easeOutStrong',
                    steps: 1,
                    viewSize: [188],
                    circular: true,
                    prevBtnCls: 'slide-prev',
                    nextBtnCls: 'slide-next',
                    lazyDataType: 'img-src'
                });
                carousel.on('switch', function (evt) {
                    curHotQuanNum.html(evt.currentIndex + 1);
                });
            });
        },
        destructor: function () {

        }
    });

    return HotQuan;
}, {
    requires: ['brix/core/brick']
});