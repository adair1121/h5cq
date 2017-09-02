var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Get_Goods_pop = (function (_super) {
    __extends(Get_Goods_pop, _super);
    function Get_Goods_pop() {
        var _this = _super.call(this) || this;
        _this.skinName = "Get_Goods_pop_skin";
        return _this;
    }
    Get_Goods_pop.prototype.childrenCreated = function () {
        this.reChargeBtn.label = "充值";
        this.buyBtn.label = "购买";
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    Get_Goods_pop.prototype.refreshItem = function (dataObj) {
        var state = dataObj.shopData.state;
        if (state === data.StrengthenType.ST_HD || state === data.StrengthenType.ST_MB || state === data.StrengthenType.ST_HS || state === 1) {
            this.skin.currentState = "hudun";
            this.commonItem.equipBox.source = GlobalFunc.setBgData(dataObj.shopData.quality).boxS;
            this.commonItem.equipImg.source = dataObj.shopData.imgS;
            this.commonItem.iName = dataObj.shopData.itemName;
            this.commonItem.iNameColor = DataCenter.bag.qualityColor[dataObj.shopData.quality];
        }
        else if (dataObj.shopData.state === data.StrengthenType.ST_LH || state === 0) {
            this.skin.currentState = "longhun";
            this.shopItem.costNum = 1;
            this.shopItem.allCost = dataObj.shopData.singleCost * 1;
            this.shopItem.singleCost = dataObj.shopData.singleCost;
            this.shopItem.setItemData(dataObj.shopData);
            this.templateId = dataObj.shopData.tid;
        }
        this.otherItem.refreshOtherWay(dataObj.itemData);
    };
    Get_Goods_pop.prototype.onTouchTap = function (evt) {
        switch (evt.target) {
            case this.returnBtn:
                this.closeView();
                break;
            case this.reChargeBtn.button:
                break;
            case this.buyBtn.button:
                var goldNum = DataCenter.playerAttr[data.PlayerAttr.gold];
                var cost = Way_shop_item.m_singleCost * Way_shop_item.costValue;
                if (goldNum < cost) {
                    var tipObj = [{ type: TipsEnum.TYPE_WARN, label: "元宝不足" }];
                    PopTipsManager.showPopTips(tipObj);
                    return;
                }
                var obj = { ID: DataCenter.storeGoods[this.templateId], num: this.shopItem.costNum, entrance: 0 };
                Global.dispatchEvent(MainNotify.BUYITEM, obj);
                this.closeView();
                break;
            default:
                break;
        }
    };
    Get_Goods_pop.prototype.closeView = function () {
        PopUpManager.removePopUp(this.skinName, 0);
    };
    return Get_Goods_pop;
}(eui.Component));
__reflect(Get_Goods_pop.prototype, "Get_Goods_pop");
//# sourceMappingURL=Get_Goods_pop.js.map