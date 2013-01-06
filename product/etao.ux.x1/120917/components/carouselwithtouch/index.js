

KISSY.add('components/carouselwithtouch/index', function (S, Switchable) {
    var Event = S.Event;

    function CarouselWithTouch() {
        CarouselWithTouch.superclass.constructor.apply(this, arguments);
        this.enableTouch();
    }

    S.extend(CarouselWithTouch, Switchable.Carousel, {
        enableTouch:function () {
            var S = KISSY, Switchable = KISSY.Switchable , Event = S.Event, DOM = S.DOM;

            var PIXEL_THRESH = 3;
            var self = this;

            function isTouchEvent(e) {
                return e.type.indexOf('touch') != -1;
            }

            function getXyObj(e) {
                var touch;
                if (isTouchEvent(e)) {
                    // touches is 0 when touchend
                    touch = e.originalEvent['changedTouches'][0];
                } else {
                    touch = e;
                }
                return touch;
            }

            function init() {
                // TODO 单步不支持 touch
                if (self._realStep) {
                    return;
                }
                var cfg = self.config,
                // circular 会修改 cfg.effect
                    effect = cfg.scrollType || cfg.effect;
                if (effect == 'scrolly' || effect == 'scrollx') {
                    var content = self.content,
                        container = self.container,
                        startX,
                        startY,
                        realStarted = 0,
                        started = 0,
                        startContentOffset = {},
                        containerRegion = {},
                        prop = "left",
                        diff,
                        viewSize;

                    if (effect == 'scrolly') {
                        prop = "top";
                    }

                    function start() {
                        if (// edge adjusting, wait
                            self.panels[self.activeIndex].style.position == 'relative') {
                            return;
                        }
                        // 停止自动播放
                        if (self.stop) {
                            self.stop();
                        }

                        started = 1;
                        startContentOffset = DOM.offset(content);
                        containerRegion = getRegionFn(container);
                    }

                    function inRegionFn(n, l, r) {
                        return n >= l && n <= r;
                    }

                    function getRegionFn(n) {
                        var containerRegion = DOM.offset(n);
                        containerRegion.bottom = containerRegion.top +
                            container.offsetHeight;
                        containerRegion.right = containerRegion.left +
                            container.offsetWidth;
                        return containerRegion;
                    }

                    /**
                     * 调整位置
                     */
                    function adjustPosition(panels, start, prop, viewDiff) {
                        var self = this, cfg = self.config,
                            steps = cfg.steps,
                            len = self.length,
                            from = start * steps,
                            to = (start + 1) * steps;
                        var POSITION = 'position',
                            RELATIVE = 'relative';
                        // 调整 panels 到下一个视图中
                        var actionPanels = panels.slice(from, to);
                        DOM.css(actionPanels, POSITION, RELATIVE);
                        DOM.css(actionPanels, prop, (start ? -1 : 1) * viewDiff * len);
                    }

                    function move(e) {

                        // 拖出边界外就算结束，即使再回来也应该没响应
                        if (!started) {
                            return;
                        }

                        var touch = getXyObj(e),
                            currentOffset = {},
                            inRegion;

                        if (effect == 'scrolly') {
                            viewSize = self.viewSize[1];
                            diff = touch.pageY - startY;
                            currentOffset.top = startContentOffset.top + diff;
                            inRegion = inRegionFn(touch.pageY,
                                containerRegion.top,
                                containerRegion.bottom);
                        } else {
                            viewSize = self.viewSize[0];
                            diff = touch.pageX - startX;
                            currentOffset.left = startContentOffset.left + diff;
                            inRegion = inRegionFn(touch.pageX,
                                containerRegion.left,
                                containerRegion.right);
                        }

                        // 已经开始或者第一次拖动距离超过 5px
                        if (realStarted ||
                            Math.abs(diff) > PIXEL_THRESH) {
                            if (isTouchEvent(e)) {
                                // stop native page scrolling in ios
                                e.preventDefault();
                            }
                            // 正在进行的动画停止
                            if (self.anim) {
                                self.anim.stop();
                                self.anim = undefined;
                            }
                            if (!inRegion) {
                                end();
                            } else {
                                // 只有初始拖动距离超过 5px 才算开始拖动
                                // 防止和 click 混淆
                                if (!realStarted) {
                                    realStarted = 1;

                                    if (cfg.circular) {
                                        var activeIndex = self.activeIndex, threshold = self.length - 1;
                                        /*
                                         circular logic : only run once after mousedown/touchstart
                                         */
                                        if (activeIndex == threshold) {
                                            adjustPosition.call(self, self.panels, 0, prop, viewSize);
                                        } else if (activeIndex == 0) {
                                            adjustPosition.call(self, self.panels, threshold, prop, viewSize);
                                        }
                                    }
                                }
                                // 跟随手指移动
                                DOM.offset(content, currentOffset);

                            }
                        }
                    }

                    // 水平/垂直滚动效果
                    Switchable.Effects.scrollx1 = function (callback, direction, forceAnimation) {

                        var SCROLLX = 'scrollx',
                            LEFT = 'left',
                            TOP = 'top',
                            PX = 'px';

                        var self = this,
                            fromIndex = self.fromIndex;
                        var cfg = self.config;
                        var isX = cfg.effect === SCROLLX;
                        var diff = self.viewSize[isX ? 0 : 1] * self.activeIndex;
                        var props = { };
                        props[isX ? LEFT : TOP] = -diff + PX;

                        if (self.anim) {
                            self.anim.stop();
                        }
                        // 强制动画或者不是初始化
                        if (forceAnimation ||
                            fromIndex > -1) {
                            self.anim = new KISSY.Anim(self.content, props,
                                cfg.duration,
                                cfg.easing,
                                function () {
                                    self.anim = undefined; // free
                                    // callback && callback();

                                }).run();
                        } else {
                            DOM.css(self.content, props);
                            //callback && callback();
                        }

                    };
                    function resetPosition(panels, start, prop, viewDiff) {
                        var self = this,
                            cfg = self.config,
                            steps = cfg.steps,
                            len = self.length,
                            from = start * steps,
                            to = (start + 1) * steps,
                            i;
                        var POSITION = 'position',
                            EMPTY = '';
                        // 滚动完成后，复位到正常状态
                        var actionPanels = panels.slice(from, to);
                        DOM.css(actionPanels, POSITION, EMPTY);
                        DOM.css(actionPanels, prop, EMPTY);

                        // 瞬移到正常位置
                        DOM.css(self.content, prop, start ? -viewDiff * (len - 1) : EMPTY);
                    }

                    function end() {
                        if (!realStarted) {
                            return;
                        }
                        realStarted = 0;
                        started = 0;
                        /*
                         circular logic
                         */
                        var activeIndex = self.activeIndex,
                            lastIndex = self.length - 1;
                        if (!cfg.circular) {
                            // 不能循环且到了边界，恢复到原有位置
                            if (diff < 0 && activeIndex == lastIndex ||
                                diff > 0 && activeIndex == 0) {
                                // 强制动画恢复到初始位置
                                Switchable.Effects['scrollx1'].call(self, undefined, undefined, true);
                                return;
                            }
                        }
                        if (diff < 0 && activeIndex == lastIndex) {
                            // 最后一个到第一个
                        } else if (diff > 0 && activeIndex == 0) {
                            // 第一个到最后一个
                        } else if (activeIndex == 0 || activeIndex == lastIndex) {
                            // 否则的话恢复位置
                            resetPosition.call(self,
                                self.panels,
                                activeIndex == 0 ? lastIndex : 0,
                                prop,
                                viewSize);
                        }
                        self[diff < 0 ? 'next' : 'prev']();

                        // 开始自动播放
                        if (self.start) {
                            self.start();
                        }
                    }

                    Event.on(content, 'touchstart', function (e) {
                        start();
                        startX = e.pageX;
                        startY = e.pageY;
                    });
                    self.move = move;
                    self.end = end;
                    Event.on(content, 'touchmove', move);
                    Event.on(content, 'touchend', end);

                    self.disable = function (){
                        Event.remove(content, 'touchmove');
                        Event.remove(content, 'touchend');
                    };
                }
            }
            init();
        },

        disableTouch:function(){
            var DOM = S.Event, that = this;
            that.disable();
        }
    });

    CarouselWithTouch.autoplay = function(host){
        var cfg = host.config,
            interval = cfg.interval * 1000;

        if (!cfg.auto) return;

        if (CarouselWithTouch.timer) {
            CarouselWithTouch.timer.cancel();
            CarouselWithTouch.timer = undefined;
        }

        function startAutoplay() {
            // 设置自动播放
            CarouselWithTouch.timer = S.later(function() {
                if (host.paused) return;
                // 自动播放默认 forward（不提供配置），这样可以保证 circular 在临界点正确切换
                host.switchTo(host.activeIndex < host.length - 1 ?
                    host.activeIndex + 1 : 0,
                    'forward');
            }, interval, true);
        }

        // go
        startAutoplay();

        // 添加 stop 方法，使得外部可以停止自动播放
        host.stop = function() {
            if (CarouselWithTouch.timer) {
                CarouselWithTouch.timer.cancel();
                CarouselWithTouch.timer = undefined;
            }
            // paused 可以让外部知道 autoplay 的当前状态
            host.paused = true;
        };

        host.start = function() {
            if (CarouselWithTouch.timer) {
                CarouselWithTouch.timer.cancel();
                CarouselWithTouch.timer = undefined;
            }
            host.paused = false;
            startAutoplay();
        };

        // 鼠标悬停，停止自动播放
        if (cfg.pauseOnHover) {
            Event.on(host.container, 'mouseenter', host.stop, host);
            Event.on(host.container, 'mouseleave', host.start, host);
        }
    } ;
    return {
        getCarousel:function () {
            return CarouselWithTouch
        }
    };
}, { requires:['switchable'] });