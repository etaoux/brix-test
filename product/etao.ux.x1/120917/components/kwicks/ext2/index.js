KISSY.add("components/kwicks/ext2/index", function(S, Brick) {
    function Kwicks() {
        Kwicks.superclass.constructor.apply(this, arguments);
    }

    S.extend(Kwicks, Brick, {
        initialize: function() {
            S.log('Kwicks ext2 initialize');
        },
        destructor:function(){
            S.log('Kwicks ext2 destroy');
        }
    });
    return Kwicks;
}, {
    requires: ["components/kwicks/index"]
});