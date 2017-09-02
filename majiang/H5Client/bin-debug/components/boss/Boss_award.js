var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Boss_award = (function (_super) {
    __extends(Boss_award, _super);
    function Boss_award() {
        var _this = _super.call(this) || this;
        _this.count = 5;
        _this._openMsg = "";
        _this.skinName = "Boss_award_skin";
        return _this;
    }
    Boss_award.prototype.childrenCreated = function () {
        this.arrayCollect = new eui.ArrayCollection();
        this.scroller.viewport = this.list;
        this.list.dataProvider = this.arrayCollect;
        this.list.itemRenderer = CommonItem;
        this.timer = new egret.Timer(1000, 5);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTimerCom, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.timer.start();
        this.sureBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSureTouch, this);
    };
    Boss_award.prototype.setData = function (itemData, arg, openModule, openMsg, dataObj) {
        if (openModule === void 0) { openModule = ""; }
        if (openMsg === void 0) { openMsg = ""; }
        if (dataObj === void 0) { dataObj = {}; }
        this.arg = arg;
        this._openModule = openModule;
        this._openMsg = openMsg;
        this._dataObj = dataObj;
        this.arrayCollect.source = itemData;
    };
    Boss_award.prototype.onTimer = function (evt) {
        this.count -= 1;
        this.sureBtn.label = "确定(" + this.count + ")";
    };
    Boss_award.prototype.onTimerCom = function (evt) {
        this.remove();
        this.requestExit();
    };
    Boss_award.prototype.onSureTouch = function (evt) {
        this.remove();
        this.requestExit();
    };
    Boss_award.prototype.requestExit = function () {
        DataCenter.curSceneId = DataCenter.playerAttr[data.PlayerAttr.levelStageID];
        GlobalFunc.changeSence(DataCenter.curSceneId, this.arg, this._openModule, this._openMsg, this._dataObj);
        PopUpManager.removePopUp(this.skinName, 0);
    };
    Boss_award.prototype.remove = function () {
        this.timer.stop();
        this.timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTimerCom, this);
        this.sureBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSureTouch, this);
    };
    return Boss_award;
}(eui.Component));
__reflect(Boss_award.prototype, "Boss_award");
//# sourceMappingURL=Boss_award.js.map