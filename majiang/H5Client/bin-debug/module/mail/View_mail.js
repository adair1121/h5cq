var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var View_mail = (function (_super) {
    __extends(View_mail, _super);
    function View_mail() {
        var _this = _super.call(this) || this;
        _this.skinName = "View_mail_skin";
        return _this;
    }
    View_mail.prototype.childrenCreated = function () {
        this.curModule = this.module;
        this.mailPopup = new Mail_popup();
        this.scroller.viewport = this.list;
        this.mailListData = [];
        this.list.itemRenderer = Mail_itemRenderer;
        this.collection = new eui.ArrayCollection();
        this.list.dataProvider = this.collection;
        this.returnBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClickHandler, this);
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.clickItemHandler, this);
    };
    View_mail.prototype.changeView = function (source) {
        // this.mailListData=DataCenter.mailData;
        this.collection.source = [];
        this.collection.source = source;
        this.scroller.viewport.scrollV = 0;
    };
    View_mail.prototype.btnClickHandler = function (event) {
        switch (event.target) {
            case this.returnBtn:
                this.curModule.removeView();
                break;
            default:
                break;
        }
    };
    View_mail.prototype.clickItemHandler = function (event) {
        this.mailId = event.item.mailId;
        PopUpManager.addPopUp(this.mailPopup, true, this.mailPopup.skinName, ViewController.getInstance().getContainer().layer_popup, 0);
        PopUpManager.startClickHidden(this.mailPopup.skinName, this.callBackFunc, this);
        this.mailPopup.setMailData(event.item, this.getReward, this);
        this.curModule.openMail(this.mailId);
    };
    View_mail.prototype.getReward = function () {
        this.curModule.getRewardToS(this.mailId);
    };
    View_mail.prototype.removeEvent = function () {
    };
    View_mail.prototype.callBackFunc = function () {
        PopUpManager.removePopUp(this.mailPopup.skinName, 0);
    };
    return View_mail;
}(Base_view));
__reflect(View_mail.prototype, "View_mail");
//# sourceMappingURL=View_mail.js.map