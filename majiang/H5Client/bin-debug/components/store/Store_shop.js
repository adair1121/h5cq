var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Store_shop = (function (_super) {
    __extends(Store_shop, _super);
    function Store_shop() {
        var _this = _super.call(this) || this;
        _this.skinName = "Store_shop_skin";
        return _this;
    }
    Store_shop.prototype.childrenCreated = function () {
        this.buyBtn.label = "购买";
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    Store_shop.prototype.onTouchTap = function (evt) {
        switch (evt.target) {
            case this.returnBtn:
                this.closeView();
                break;
            case this.buyBtn.button:
                var cost = this.singleCost * this.shopItem.costNum;
                if (cost > DataCenter.playerAttr[data.PlayerAttr.gold]) {
                    var tipObj = [{ type: TipsEnum.TYPE_WARN, label: "元宝不足" }];
                    PopTipsManager.showPopTips(tipObj);
                }
                PopUpManager.removePopUp(this.skinName, 0);
                Global.dispatchEvent(MainNotify.BUYITEM, { ID: this.tid, num: this.shopItem.costNum, entrance: 0 });
                break;
        }
    };
    Store_shop.prototype.initData = function (obj) {
        this.tid = obj.tid;
        this.singleCost = obj.singleCost;
        this.shopItem.singleCost = obj.singleCost;
        this.shopItem.costNum = 1;
        this.shopItem.allCost = obj.singleCost * 1;
        if (obj.maxNum) {
            this.shopItem.maxNum = obj.maxNum;
        }
        this.shopItem.setItemData(obj.itemData);
    };
    Store_shop.prototype.closeView = function () {
        PopUpManager.removePopUp(this.skinName, 0);
    };
    Store_shop.prototype.refreshItem = function (dataObj) {
        this.shopItem.setItemData(dataObj.shopData);
    };
    return Store_shop;
}(eui.Component));
__reflect(Store_shop.prototype, "Store_shop");
//# sourceMappingURL=Store_shop.js.map