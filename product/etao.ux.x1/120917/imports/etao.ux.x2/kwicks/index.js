KISSY.add("imports/etao.ux.x2/kwicks/index", function(S, Brick) {
    function Kwicks() {
        Kwicks.superclass.constructor.apply(this, arguments);
    }

    S.extend(Kwicks, Brick, {
        initialize: function() {
            S.log('initialize');
        },
        destructor:function(){
            S.log('destroy');
        }
    });
    return Kwicks;
}, {
    requires: ["brix/gallery/kwicks/index"]
});