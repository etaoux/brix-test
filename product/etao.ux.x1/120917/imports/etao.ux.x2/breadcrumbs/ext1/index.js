KISSY.add("imports/etao.ux.x2/breadcrumbs/ext1/index", function(S, Brick) {
    function Breadcrumbs() {
        Breadcrumbs.superclass.constructor.apply(this, arguments);
    }

    S.extend(Breadcrumbs, Brick, {
        initialize: function() {
            S.log('Breadcrumbs ext1 initialize');
        },
        destructor:function(){
            S.log('Breadcrumbs ext1 destroy');
        }
    });
    return Breadcrumbs;
}, {
    requires: ["imports/etao.ux.x2/breadcrumbs/index","brix/gallery/breadcrumbs/breadcrumbs.css","brix/gallery/dropdown/dropdown.css"]
});