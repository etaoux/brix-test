KISSY.add("ne/etao/js/v1/search-form", function (S, DateSelect, DropdownBrick) {
    var one = S.Node.one;
    var depCityName = one("#J_depCityName");
    var depCityCode = one("#J_depCityCode");
    var arrCityName = one("#J_arrCityName");
    var arrCityCode = one("#J_arrCityCode");
    var depDateNode = one("#J_depDate");
    var jCode = one("#J_jp");
    var qCode = one("#J_q");
    var searchForm = one("#J_tripSearchForm");
    var recordNode = one("#J_tripRecord");

    var depCityList = new DropdownBrick({tmpl:'#J_depCity'});
    depCityList.on("selected", function(e){
        depCityCode.attr("value",  e.value);
        depCityName.attr("value",  e.text.substr(1));
    });
    var arrCityList = new DropdownBrick({tmpl:'#J_arrCity'});
    arrCityList.on("selected", function(e){
        arrCityCode.attr("value",  e.value);
        arrCityName.attr("value",  e.text.substr(1));
    });

    var getRecord = function(){
        var src = recordNode.attr("value");
        if(src){
            var img = new Image();
            img.src = 'http://log.mmstat.com/'+ src + '?hitcount=' + Math.ceil(Math.random()*10000000);
        }

    };



    var dateSelect = new DateSelect("#J_dataBox");
    searchForm.on("submit", function(){

        getRecord();

        var depCity = depCityName.attr('value') || "";
        var arrCity = arrCityName.attr('value') || "";

        if(!depCity){
            depCityList.focus();
            return false;
        }
        if(!arrCity){

            arrCityList.focus();
            return false;
        }

        var depDate = dateSelect.getDate();
        qCode.attr('value',depCity + ' ' + arrCity + ' 机票');
        jCode.attr('value' , "tbsearch|" + depCity + '|' + arrCity + '|' + depDate);

        depDateNode.attr("value", depDate);

    });
}, {
    requires: ["./date-select", "brix/gallery/dropdown/index"]
});
KISSY.add("ne/etao/js/v1/date-select", function (S, DropdownBrick) {

    // 缓存变量
    var one = S.Node.one;

    //年月日需要初始化信息
    var nowDate = new Date();
    var year = nowDate.getFullYear();
    var month = nowDate.getMonth();
    var day = nowDate.getDate();
    var dayArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    //日期下拉框的模板
    var tpl = '<div  bx-name="dropdown" bx-tmpl="dropdown" bx-datakey="dropdown_list" class="trip-search-dropdown trip-search-{{type}}">'+
        '{{#dropdown_list}}'+
        '{{#selected}}'+
        '<span class="dropdown-hd">'+
        '<span class="dropdown-text" value="{{value}}">{{text}}</span>'+
        '</span>'+
        '{{/selected}}'+
        '{{/dropdown_list}}'+
        '<ul class="dropdown-list">'+
        ' {{#dropdown_list}}'+
        '<li class="dropdown-item{{#selected}} dropdown-itemselected{{/selected}}"><span value="{{value}}">{{text}}</span></li>'+
        '{{/dropdown_list}}'+
        '</ul>'+
        '{{#dropdown_list}}'+
        '{{#selected}}'+
        '<input value="{{value}}" type="hidden" />'+
        '{{/selected}}'+
        '{{/dropdown_list}}'+
        '</div>';

    //日期下拉框
    function dateSelect(boxId){
        var t = this;
        t.boxId = boxId;      //放年月日的盒子id
        t.year = year;        //存放当前用户选择的年，默认为当天    -- 主要为设置月日使用
        t.month = month;       //存放当前用户选择的年，默认为当天    -- 主要为设置月日使用
        t.day = day;
        //年下拉框
        t.yearDropDown = t.initDropDown(t.collectData(year-1, year+1), "year");
        t.yearDropDown.render();
        t.yearSelectEvent();

        //月下拉框
        t.monthDropDown = t.initDropDown(t.getTheMonth(), "month");
        t.monthDropDown.render();
        t.monthSelectEvent();
        t.changeMonthListHeight();

        //天下拉框
        t.dayDropDown = t.initDropDown(t.getDay(t.year, t.month), "day");
        t.dayDropDown.render();
        t.daySelectEvent();
        t.changeDayListHeight();

    };

    S.augment(dateSelect, {

        //初始化下拉框
        initDropDown: function(data, type){
            var t = this;
            var config = {
                container: t.boxId,//容器节点
                tmpl: tpl,//需要的模板
                data: {
                    dropdown_list: data,
                    type: type
                }

            };
            return  new DropdownBrick(config);

        },

        //给下拉框绑定select事件
        yearSelectEvent: function(){
            var t = this;
            t.yearDropDown.on('selected',function(e){
                t.year = e.value;
                t.month = t.year == year? month :  0;
                t.day = (t.year == year && t.month == month)? day : 1;

                t.monthDropDown.setChunkData('dropdown_list', t.getTheMonth(t.year));
                t.dayDropDown.setChunkData('dropdown_list', t.getDay(t.year, t.month));
                t.changeMonthListHeight();
                t.changeDayListHeight();


            });
        },

        //给下拉框绑定select事件
        monthSelectEvent: function(){
            var t = this;
            t.monthDropDown.on("selected", function(e){
                t.month = e.value - 1;
                t.day = (t.year == year && t.month == month)? day : 1;

                t.dayDropDown.setChunkData('dropdown_list', t.getDay(t.year, t.month));
                t.changeDayListHeight();
            });
        },

        daySelectEvent: function(){
            var t = this;
            t.dayDropDown.on("selected", function(e){
                t.day = e.value ;
            });
        },


        //修改天下拉框的高度
        changeDayListHeight: function(){
            var t = this;
            var temp = dayArr[t.month];
            if((temp - t.day) > 8){
                var dayBox = one(t.boxId + " .trip-search-day .dropdown-list");
                dayBox.css("height", "160px");
            }

        },

        //修改月下拉框的高度
        changeMonthListHeight: function(){
            var t = this;
            var day = dayArr[t.month];
            if(month < 5 || year != t.year){
                var dayBox = one(t.boxId + " .trip-search-month .dropdown-list");
                dayBox.css("height", "160px");
            }

        },

        //获取年月日
        getDate: function(){
            var t = this;
            return t.year + "-" + t.toDoubleNum(t.month + 1) + "-"  + t.toDoubleNum(t.day);

        },

        //返回双数字
        toDoubleNum: function(num){
            if(num < 10){
                return "0" + num;
            }
            return num;
        },

        //通过年获取月份，如果是今年则为本月开始
        getTheMonth: function(){
            var t = this;
            var temp = month;
            if(year != t.year){
                temp = 0;
            }

            return t.collectData(temp, 12);
        },

        //是否是闰年
        isLeapYear: function(){
            var t = this;
            return!!((t.year & 3) == 0 && (t.year % 100 || (t.year % 400 == 0 && t.year)));
        },

        //获取年月对应的天数
        getDay: function(){
            var t = this;
            var beginDay = (t.year == year && t.month == month)? (day - 1) : 0;
            dayArr[1] = t.isLeapYear()? 29 : 28;

            return t.collectData(beginDay, dayArr[t.month]);
        },

        //收集下拉数据
        collectData: function(begin, end){
            var temp = begin;
            var tempArr = [];
            while(temp < end){
                tempArr.push({
                    selected: temp == begin,
                    value: ++temp,
                    text: temp
                });
            }
            return tempArr;
        }

    });

    return dateSelect;

}, {
    requires: ["brix/gallery/dropdown/index"]
});
KISSY.add("components/virtualservice/index", function(S, Brick) {
    var $ = S.all, loginPopup;
    function Virtual() {
        Virtual.superclass.constructor.apply(this, arguments);
    }
    Virtual.EVENTS = {
    };
    S.extend(Virtual, Brick, {
        initialize: function() {
            var that = this;
                lastTab = 0, curTab = 0;
            S.ready(function(S) {
                KISSY.use("datalazyload,switchable", function(S,Switchable) {
                    var Tabs = S.Switchable.Tabs,
                        tabs = new Tabs('#J_Recharge', {
                        switchTo : 0,
                        navCls:'ks-fee-nav',
                        contentCls: 'ks-fee-content',
                        activeTriggerCls: 'ks-fee-active'
                    });
                    tabs.on('switch', function(ev){
                        curTab =  ev.currentIndex;
                        if(curTab === 0){
                            S.Event.fire('#J_EtaoPhone','show');
                            S.Event.fire('#J_EtaoQQ','hide');
                        }
                        if(curTab === 1){
                            S.Event.fire('#J_EtaoPhone','hide');
                            if(!$('#J_EtaoQQ').attr('data-intial')){
                                that.initQQ();
                                $('#J_EtaoQQ').attr('data-intial', true);
                            }
                            S.Event.fire('#J_EtaoQQ','show');

                        }
                        if(curTab === 2){
                            if(!$('#J_EtaoJiPiao').attr('data-intial')){
                                that.initTicket();
                                $('#J_EtaoJiPiao').attr('data-intial', true);
                            }

                        }
                    });
                    that.initCellphone();
                });
            });
        },
        initCellphone: function(){
            S.getScript('http://a.tbcdn.cn/apps/tcc/phone/20120830/etao.js ',{ success: initRecharge});
            function initRecharge() {
                S.config({
                    packages: [{
                        name: 'gallery',
                        path: 'http://a.tbcdn.cn/s/kissy',
                        charset: 'utf-8'
                    }]
                });
                S.use('tcc/phone/3.0/etao', function (S, Recharger) {
                    var recharger = new Recharger('recharger', {
                        env:'etao_home',
                        onSubmitAsAVisitor: function (sku) {
                            S.use('LoginPopup', function() {
                                var login = S.LoginPopup();
                                if (!login.checkTrueLogin()) {
                                    login.showLoginPopup();
                                }
                            });
                        }
                    });
                    S.all('#J_EtaoPhone').on('show', function(){
                        recharger.show();
                    });
                    S.all('#J_EtaoPhone').on('hide', function(){
                        recharger.hide();
                    });

                });
            }
        },
        initQQ: function(){
            if (S.Config.debug) {
                S.config({
                    packages: [{
                        name: 'tcc_recharger',
                        path: 'http://assets.daily.taobao.net/apps/tcc/src/recharger/v1',
                        charset: 'utf-8'
                    }, {
                        name: 'gallery',
                        path: 'http://assets.daily.taobao.net/s/kissy',
                        charset: 'utf-8'
                    }]
                });
            } else {
                S.config({
                    packages: [{
                        name: 'tcc_recharger',
                        path: 'http://a.tbcdn.cn/apps/tcc/build/20121011',
                        charset: 'utf-8'
                    }, {
                        name: 'gallery',
                        path: 'http://a.tbcdn.cn/s/kissy',
                        charset: 'utf-8'
                    }]
                });
            }
            S.getScript('http://a.tbcdn.cn/apps/tcc/build/20121011/tcc_recharger/qq/etao_home-min.css');
            S.use('tcc_recharger/qq/etao', function (S, Recharger) {
                var recharger = new Recharger('qqmoney', {
                    env: 'etao_home',
                    menuType: 'menu'

                });
                recharger.on('visitor-submit', function () {
                    S.use('LoginPopup', function() {
                        var login = S.LoginPopup();
                        if (!login.checkTrueLogin()) {
                            login.showLoginPopup();
                        }
                    });
                });
                recharger.init();
                S.all('#J_EtaoQQ').on('show', function(){
                    recharger.show();
                });
                S.all('#J_EtaoQQ').on('hide', function(){
                    recharger.hide();
                });
            });
        },
        initTicket: function(){
//            KISSY.getScript('http://a.tbcdn.cn/apps/et/ne/??etao/js/v1/search-form-min.js,' +
//                'etao/js/v1/date-select-min.js' +
//                ',etao/js/v1/dropdown/index-min.js,' +
//                'etao/js/v1/dropdown/brick-min.js,' +
//                'etao/js/v1/dropdown/chunk-min.js,' +
//                'etao/js/v1/dropdown/dataset-min.js,' +
//                'etao/js/v1/dropdown/tmpler-min.js,' +
//                'etao/js/v1/dropdown/mu-min.js,' +
//                'etao/js/v1/dropdown/mustache-min.js',{success:function(){
//
//                KISSY.use("ne/etao/js/v1/search-form");
//            }});
//            KISSY.getScript('http://localhost/ehome/components/virtual/ne.js',{success:function(){
                KISSY.use("ne/etao/js/v1/search-form");
//            }});

        },
        destructor:function(){
        }
    });
    return Virtual;
}, {
    requires: ["brix/core/brick"]
});

