KISSY.add('components/_supplement-promotion_/index', function(S, Brick, undefined){
 
  function SupplePromotion(config) {
        SupplePromotion.superclass.constructor.apply(this, arguments);
  }
  //私有变量
  SupplePromotion.ATTRS = {
  }
  //共有方法
  SupplePromotion.METHOD = {
   
  }
  
  //事件绑定
  SupplePromotion.EVENTS = {
    
  }
  //业务逻辑，私有方法
  S.extend(SupplePromotion, Brick,{
   
  });
  S.augment(SupplePromotion, SupplePromotion.METHOD);
  return SupplePromotion;
}, {
  requires: ['brix/core/brick', './index.css']
});

