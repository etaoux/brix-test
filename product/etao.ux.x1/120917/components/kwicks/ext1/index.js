KISSY.add("components/kwicks/ext1/index", function(S, Brick) {
    function Kwicks() {
        Kwicks.superclass.constructor.apply(this, arguments);
    }

    S.extend(Kwicks, Brick, {
        initialize: function() {
            S.log('Kwicks ext1 initialize');
        },
        destructor:function(){
            S.log('Kwicks ext1 destroy');
        }
    });
    return Kwicks;
}, {
    requires: ["components/kwicks/index"]
});