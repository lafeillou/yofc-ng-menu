const Util = (($) => {
    let transition = false;

    // 获取特殊过渡效果结束事件
    function getSpecialTransitionEndEvent() {
        return {
            bindType: transition.end,
            delegateType: transition.end,
            handle(event) {
                if ($(event.target).is(this)) {
                    return event.
                    handleObj.
                    handler.
                    apply(this, arguments);
                }
                return undefined;
            }
        };
    }

    // 过渡事件结束测试
    function transitionEndTest() {
        if (window.QUnit) {
            return false;
        }
        return {
            end: 'transitionend'
        };
    }
    // 过渡结束枚举器
    function transitionEndEmulator(duration) {
        let called = false;
        $(this).one(Util.TRANSITION_END, () => {
            called = true;
        });

        setTimeout(() => {
            if (!called) {
                Util.triggerTransitionEnd(this);
            }
        }, duration);
        return this;
    }

    // 设置过渡结束事件支持
    function setTransitionEndSupport() {
        transition = transitionEndTest();
        $.fn.mmEmulateTransitionEnd = transitionEndEmulator;

        if (Util.supportsTransitionEnd()) {
            $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
        }
    }

    const Util = {
        TRANSITION_END: 'mmTransitionEnd',
        triggerTransitionEnd(element) {
            $(element).trigger(transition.end);
        },
        supportsTransitionEnd() {
            return Boolean(transition);
        }
    };

    setTransitionEndSupport();
    return Util;
})(jQuery);