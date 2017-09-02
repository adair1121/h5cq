var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var View_bag_smelt = (function (_super) {
    __extends(View_bag_smelt, _super);
    function View_bag_smelt() {
        var _this = _super.call(this) || this;
        _this.skinName = "Bag_smelt_skin";
        return _this;
    }
    View_bag_smelt.prototype.childrenCreated = function () {
        this.initialize();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.itemList.dataProvider = this.arrayCollection;
        this.itemList.itemRenderer = GoodsItem;
        this.itemList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
    };
    View_bag_smelt.prototype.onTouchTap = function (evt) {
        switch (evt.target) {
            case this.closeBtn:
            case this.returnBtn:
                this.removeView(1);
                this;
                break;
            case this.smeltBtn.button:
                this.curModule.smeltEquip();
                break;
            case this.rongluBtn.button:
                break;
            case this.normalEquipBtn.button:
                break;
            default:
                break;
        }
    };
    View_bag_smelt.prototype.onItemTap = function (evt) {
        var curSmeltData = Module_bag_smelt.source;
        if (!evt.item.isEmpty) {
            this.curModule.refreshSmeltData(curSmeltData.indexOf(evt.item));
        }
        else {
            PopUpManager.addPopUp(this.selectEquipPanel, true, this.selectEquipPanel.skinName, this.layer, 0);
            this.selectEquipPanel.refreshSource();
            PopUpManager.startClickHidden(this.selectEquipPanel.skinName, this.callBackFunc, this);
        }
    };
    View_bag_smelt.prototype.callBackFunc = function () {
        PopUpManager.removePopUp(this.selectEquipPanel.skinName, 0);
    };
    View_bag_smelt.prototype.initialize = function () {
        this.layer = ViewController.getInstance().getContainer().layer_popup;
        this.selectEquipPanel = new Bag_smeltEquipSelect();
        this.smeltBtn.label = "熔炼";
        this.rongluBtn.setAttr({ text: "熔炉", size: 20 });
        this.normalEquipBtn.setAttr({ text: "普通装备", currentState: "down", size: 20 });
        this.btnArr = [this.normalEquipBtn, this.rongluBtn];
        this.curModule = this.module;
        this.arrayCollection = new eui.ArrayCollection();
    };
    View_bag_smelt.prototype.setButtonState = function () {
    };
    View_bag_smelt.prototype.initBtnState = function () {
        this.normalEquipBtn.setAttr({ currentState: "down" });
        this.rongluBtn.setAttr({ currentState: "down" });
    };
    View_bag_smelt.prototype.removeView = function (closeState) {
        this.curModule.removeView(closeState);
    };
    View_bag_smelt.prototype.removeEvent = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.itemList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
    };
    return View_bag_smelt;
}(Base_view));
__reflect(View_bag_smelt.prototype, "View_bag_smelt");
//# sourceMappingURL=View_bag_smelt.js.map