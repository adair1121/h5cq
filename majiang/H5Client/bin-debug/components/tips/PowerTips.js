var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PowerTips = (function (_super) {
    __extends(PowerTips, _super);
    function PowerTips(callBack, arg) {
        var _this = _super.call(this) || this;
        _this.stopLetter = 2;
        _this.m_callBack = callBack;
        _this.m_arg = arg;
        _this.skinName = "PowerTips_skin";
        _this.myTimer = new egret.Timer(50, 10);
        return _this;
    }
    PowerTips.prototype.letterScroll = function (value) {
        this.otherArr = [];
        this.stopArr = [];
        this.operArr = [];
        var valueStr = value + "";
        var valueArr = valueStr.split("");
        if (valueArr.length < 100) {
            this.stopLetter = valueArr.length;
        }
        else {
            this.stopLetter = 2;
        }
        this.stopArr = valueArr.splice(0, this.stopLetter);
        this.otherArr = this.otherArr.concat(valueArr);
        this.operArr = this.operArr.concat(valueArr);
        this.myTimer.start();
        this.myTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTimerCom, this);
        this.myTimer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
    };
    PowerTips.prototype.onTimer = function (evt) {
        for (var i = 0; i < this.operArr.length; i++) {
            var index = (Math.random() * 10) >> 0;
            this.operArr[i] = index + "";
        }
        var arr = this.stopArr.concat(this.operArr);
        var str = arr.join("");
        this.power.text = str;
    };
    PowerTips.prototype.onTimerCom = function (evt) {
        this.myTimer.stop();
        this.power.text = this.stopArr.concat(this.otherArr).join("");
        if (this.m_callBack && this.m_arg) {
            this.m_callBack.call(this.m_arg);
        }
        var that = this;
        setTimeout(function () {
            egret.Tween.get(that).to({ alpha: 0 }, 500).call(function () {
                egret.Tween.removeTweens(that);
                that.parent.removeChild(that);
            });
        }, 800);
        this.myTimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTimerCom, this);
        this.myTimer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
    };
    return PowerTips;
}(eui.Component));
__reflect(PowerTips.prototype, "PowerTips");
//# sourceMappingURL=PowerTips.js.map