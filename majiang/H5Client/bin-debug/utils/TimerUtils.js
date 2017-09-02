var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TimerUtils = (function (_super) {
    __extends(TimerUtils, _super);
    function TimerUtils() {
        var _this = _super.call(this) || this;
        _this._delay = 1;
        _this._repeatCount = 0;
        _this._startTime = 0;
        _this.init();
        return _this;
    }
    TimerUtils.prototype.init = function () {
        this.timer = new egret.Timer(this.delay, this.repeatCount);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTimerCom, this);
    };
    TimerUtils.prototype.onTimer = function (event) {
        // // this.startTime+=this.delay;
        // console.log(this.delay,this.timer.currentCount);
        // console.log(egret.getTimer());
        if (this.timerCallbackFunc) {
            this.timerCallbackFunc.call(this.callBackArg, { currentTime: this.startTime + this.delay * this.timer.currentCount });
        }
    };
    TimerUtils.prototype.onTimerCom = function (event) {
        if (this.comCallBackFunc) {
            this.comCallBackFunc.call(this.callBackArg, { endTime: this.startTime + this.delay * this.timer.currentCount });
        }
        this.destroy();
    };
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * 延迟函数
     * @param callBackFunc 回调函数
     * @param callBackArg 回调函数作用域
     */
    TimerUtils.prototype.setTimeOut = function (delayTime, callBackFunc, callBackArg) {
        this.destroy();
        this.delay = delayTime;
        this.repeatCount = 1;
        this.comCallBackFunc = callBackFunc;
        this.callBackArg = callBackArg;
        this.timer.start();
    };
    /**
     * 设置计时器
     * @param delayTime 间隔时间 （默认：1，毫秒）
     * @param repeatCount 执行次数 （默认：0）
     * @param startTime 开始时间 （默认：0，毫秒）
     * @param timerCallBackFunc 计时回调函数 （默认：null）
     * @param comCallBackFunc 计时完成回调函数 （默认：null）
     * @param callBackArg 回调函数作用域 （默认：null）
     */
    TimerUtils.prototype.setUpTiming = function (delayTime, repeatCount, startTime, timerCallBackFunc, comCallBackFunc, callBackArg) {
        if (delayTime === void 0) { delayTime = 1; }
        if (repeatCount === void 0) { repeatCount = 0; }
        if (startTime === void 0) { startTime = 0; }
        if (timerCallBackFunc === void 0) { timerCallBackFunc = null; }
        if (comCallBackFunc === void 0) { comCallBackFunc = null; }
        if (callBackArg === void 0) { callBackArg = null; }
        this.destroy();
        this.delay = delayTime;
        this.repeatCount = repeatCount;
        this.startTime = startTime;
        this.timerCallbackFunc = timerCallBackFunc;
        this.comCallBackFunc = comCallBackFunc;
        this.callBackArg = callBackArg;
        this.timer.start();
    };
    /**
     * 设置帧循环
     * @param delayTime 间隔时间 （默认：1，毫秒）
     * @param startTime 开始时间 （默认：0，毫秒）
     * @param timerCallBackFunc 计时回调函数 （默认：null）
     * @param comCallBackFunc 计时完成回调函数 （默认：null）
     * @param callBackArg 回调函数作用域 （默认：null）
     */
    TimerUtils.prototype.setUpFrame = function (delayTime, startTime, timerCallBackFunc, comCallBackFunc, callBackArg) {
        if (delayTime === void 0) { delayTime = 1; }
        if (startTime === void 0) { startTime = 0; }
        if (timerCallBackFunc === void 0) { timerCallBackFunc = null; }
        if (comCallBackFunc === void 0) { comCallBackFunc = null; }
        if (callBackArg === void 0) { callBackArg = null; }
        this.frameCount = 0;
        this.delay = delayTime;
        this.startTime = startTime;
        this.timerCallbackFunc = timerCallBackFunc;
        this.comCallBackFunc = comCallBackFunc;
        this.callBackArg = callBackArg;
        var self = this;
        new egret.Stage().addEventListener(egret.Event.ENTER_FRAME, this.onFrame, self);
    };
    TimerUtils.prototype.onFrame = function (event) {
        this.frameCount++;
        var frameRate = new egret.Stage().frameRate;
        // var delay:number=frameRate*this.delay/1000;
        // if(this.frameCount%(delay)!=0){
        // 	return;
        // }
        if (this.timerCallbackFunc) {
            this.timerCallbackFunc.call(this.callBackArg, { currentTime: this.startTime + this.frameCount * 1000 / frameRate });
        }
    };
    /**
     * 销毁计时器
     */
    TimerUtils.prototype.destroy = function () {
        this.timer.stop();
        this.timer.reset();
        this.startTime = 0;
        this.delay = 1;
        this.repeatCount = 0;
        this.callBackArg = null;
        this.comCallBackFunc = null;
        this.timerCallbackFunc = null;
    };
    Object.defineProperty(TimerUtils.prototype, "repeatCount", {
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /**循环次数 */
        get: function () { return this._repeatCount; },
        set: function (v) { this._repeatCount = v; this.timer.repeatCount = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimerUtils.prototype, "delay", {
        /**循环间隔 */
        get: function () { return this._delay; },
        set: function (v) { this._delay = v; this.timer.delay = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimerUtils.prototype, "startTime", {
        /**开始计时时间 */
        get: function () { return this._startTime; },
        set: function (v) { this._startTime = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimerUtils.prototype, "timerCallbackFunc", {
        /**计时中回调函数 */
        get: function () { return this._timerCallbackFunc; },
        set: function (v) { this._timerCallbackFunc = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimerUtils.prototype, "comCallBackFunc", {
        /**计时结束回调函数 */
        get: function () { return this._comCallBackFunc; },
        set: function (v) { this._comCallBackFunc = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimerUtils.prototype, "callBackArg", {
        /**回调函数作用域 */
        get: function () { return this._callBackArg; },
        set: function (v) { this._callBackArg = v; },
        enumerable: true,
        configurable: true
    });
    return TimerUtils;
}(egret.EventDispatcher));
__reflect(TimerUtils.prototype, "TimerUtils");
//# sourceMappingURL=TimerUtils.js.map