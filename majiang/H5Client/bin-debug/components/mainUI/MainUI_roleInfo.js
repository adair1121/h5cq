var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MainUI_roleInfo = (function (_super) {
    __extends(MainUI_roleInfo, _super);
    function MainUI_roleInfo() {
        var _this = _super.call(this) || this;
        _this.skinName = "MainUI_roleInfo_skin";
        return _this;
    }
    MainUI_roleInfo.prototype.childrenCreated = function () {
        this.rankBtn.touchEnabled = true;
        this.rankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    MainUI_roleInfo.prototype.onTouchTap = function (evt) {
        Global.dispatchEvent(MainNotify.OPENRANKPANEL);
    };
    MainUI_roleInfo.prototype.refreshData = function (data) {
        this.roleHead.source = "head_" + data.job + "_" + data.sex + "_png";
    };
    MainUI_roleInfo.prototype.setPower = function (str) {
        this.power.text = str;
    };
    MainUI_roleInfo.prototype.refreshLelNum = function (value) {
        this.level.text = value + "";
    };
    MainUI_roleInfo.prototype.refreshVipNum = function (value) {
        this.vipNum.text = value + "";
    };
    return MainUI_roleInfo;
}(eui.Component));
__reflect(MainUI_roleInfo.prototype, "MainUI_roleInfo");
//# sourceMappingURL=MainUI_roleInfo.js.map