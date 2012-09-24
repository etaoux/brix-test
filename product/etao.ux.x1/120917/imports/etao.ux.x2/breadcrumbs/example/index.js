KISSY.add("imports/etao.ux.x2/breadcrumbs/example/index", function(S, Brick) {
    function Breadcrumbs() {
        Breadcrumbs.superclass.constructor.apply(this, arguments);
    }

    S.extend(Breadcrumbs, Brick, {
        initialize: function() {
            S.log('Breadcrumbs example initialize');
        },
        destructor:function(){
            S.log('Breadcrumbs example destroy');
        }
    });
    return Breadcrumbs;
}, {
    requires: ["imports/etao.ux.x2/breadcrumbs/index","brix/gallery/breadcrumbs/breadcrumbs.css","brix/gallery/dropdown/dropdown.css"]
});