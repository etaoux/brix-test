KISSY.add("imports/etao.ux.x2/breadcrumbs/index", function(S, Brick) {
    function Breadcrumbs() {
        Breadcrumbs.superclass.constructor.apply(this, arguments);
    }

    S.extend(Breadcrumbs, Brick, {
        initialize: function() {
            S.log('Breadcrumbs initialize');
        },
        destructor:function(){
            S.log('Breadcrumbs destroy');
        }
    });
    return Breadcrumbs;
}, {
    requires: ["brix/gallery/breadcrumbs/index","brix/gallery/breadcrumbs/breadcrumbs.css","brix/gallery/dropdown/dropdown.css"]
});