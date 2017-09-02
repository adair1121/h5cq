var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var View_fuben = (function (_super) {
    __extends(View_fuben, _super);
    function View_fuben() {
        return _super.call(this) || this;
    }
    View_fuben.prototype.childrenCreated = function () {
        this.curModule = this.module;
        this.arrCollect = new eui.ArrayCollection();
        this.itemList.dataProvider = this.arrCollect;
        this.materialBtn.setAttr({ text: "材料副本", size: 20 });
        this.challengeBtn.setAttr({ text: "挑战副本", size: 20 });
        this.xuWuBtn.setAttr({ text: "虚无境地", size: 20 });
        this.changeTap(this.materialBtn);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    View_fuben.prototype.setViewData = function (dataObj) {
        this.arrCollect.source = dataObj.itemSource;
    };
    View_fuben.prototype.onTouchTap = function (evt) {
        switch (evt.target) {
            case this.returnBtn:
                this.curModule.removeView();
                break;
            case this.materialBtn.button:
                if (this.curBtn != this.materialBtn) {
                }
                break;
            case this.challengeBtn.button:
                break;
            case this.xuWuBtn.button:
                break;
            default:
                break;
        }
    };
    View_fuben.prototype.removeEvent = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    /**tab切换 */
    View_fuben.prototype.changeTap = function (curBtn) {
        this.curBtn.setAttr({ currentState: "up" });
        this.curBtn = curBtn;
        curBtn.setAttr({ currentState: "down" });
    };
    return View_fuben;
}(Base_view));
__reflect(View_fuben.prototype, "View_fuben");
//# sourceMappingURL=View_fuben.js.map