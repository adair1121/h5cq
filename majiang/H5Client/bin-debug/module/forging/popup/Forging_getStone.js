var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Forging_getStone = (function (_super) {
    __extends(Forging_getStone, _super);
    function Forging_getStone() {
        var _this = _super.call(this) || this;
        _this.skinName = "Forging_getStone_skin";
        return _this;
    }
    Forging_getStone.prototype.childrenCreated = function () {
        var _this = this;
        this.touchEnabled = true;
        this.item.data = { equipSource: Config.path_goods + 20003003 + ".png" };
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.btn_ronglian.setClickFunction(function () {
            _this.dispatchEvent(new egret.Event("openRonglianPanel"));
            PopUpManager.removePopUp(_this.skinName);
        }, this);
    };
    Forging_getStone.prototype.onTouchTap = function (evt) {
        switch (evt.target) {
            case this.returnBtn:
            //点击返回
            case this.closeBtn:
                PopUpManager.removePopUp(this.skinName, 0);
                //点击关闭
                break;
            default:
                break;
        }
    };
    return Forging_getStone;
}(eui.Component));
__reflect(Forging_getStone.prototype, "Forging_getStone");
//# sourceMappingURL=Forging_getStone.js.map