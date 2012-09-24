KISSY.add("components/kwicks/example/index", function(S, Brick) {
    function Kwicks() {
        Kwicks.superclass.constructor.apply(this, arguments);
    }

    S.extend(Kwicks, Brick, {
        initialize: function() {
            S.log('Kwicks example initialize');
        },
        destructor:function(){
            S.log('Kwicks example destroy');
        }
    });
    return Kwicks;
}, {
    requires: ["components/kwicks/index"]
});