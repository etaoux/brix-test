KISSY.add('components/_grid-same-style-list_/index', function(S, Brick, ContentList,undefined){
 
  function GridSamestyle(config) {
        GridSamestyle.superclass.constructor.apply(this, arguments);
  }
  //私有变量
  GridSamestyle.ATTRS = {
  }
  //共有方法
  GridSamestyle.METHOD = {
  }
  
  //事件绑定
  GridSamestyle.EVENTS = {
  }
  //业务逻辑，私有方法
  S.extend(GridSamestyle, ContentList,{
    initialize: function(){
      var self = this, el = self.get('el');

      self._lazyLoad();
    }
    
  });
  S.augment(GridSamestyle, GridSamestyle.METHOD);
  return GridSamestyle;
}, {
  requires: ['brix/core/brick', 'components/content-list/index', './index.css']
});

