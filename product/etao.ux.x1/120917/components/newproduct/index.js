KISSY.add("components/newproduct/index", function(S, Brick) {
    function NewProduct() {
        NewProduct.superclass.constructor.apply(this, arguments);
    }

    S.extend(NewProduct, Brick, {
        initialize: function() {
            var elNewProduct = S.one('#J_NewProd');
            if (!elNewProduct) return;

            var elView = S.one('.view-first', elNewProduct);
            var elMask = S.one('.mask', elNewProduct);

            if (S.UA.ie < 9) {
                elView.on('mouseenter', function (evt) {
                    elMask.animate({opacity: 1}, 0.5, 'easeIn');
                });
                elView.on('mouseleave', function (evt) {
                    elMask.css({opacity: 0});
                });
            }
        },
        destructor: function(){
        }
    });

    return NewProduct;
}, {
    requires: ['brix/core/brick']
});