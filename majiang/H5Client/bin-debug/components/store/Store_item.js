var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Store_item = (function (_super) {
    __extends(Store_item, _super);
    function Store_item() {
        var _this = _super.call(this) || this;
        _this.skinName = "Store_item_skin";
        return _this;
    }
    Store_item.prototype.childrenCreated = function () {
        this.commonItem.rightLabelColor = 0xffffff;
        this.buyBtn.label = "购买";
    };
    Store_item.prototype.dataChanged = function () {
        if (!this.data.scoreUp) {
            this.scoreGroup.visible = false;
        }
        else {
            this.scoreGroup.visible = true;
            this.score.text = this.data.scoreUp + "";
        }
        var len = this.data.moneyType.length;
        if (len > 1) {
            this._state = "jifen";
            this.invalidateState();
            for (var i = 0; i < len; i++) {
                if (this.data.moneyType[i] === data.PlayerAttr.gold) {
                    this.type.source = this.createCostIcon(this.data.moneyType[i]);
                    this.itemCost.text = this.createCostLabel(this.data.cost[i]);
                }
                else {
                    this.jifenIcon.source = this.createCostIcon(this.data.moneyType[i]);
                    this.jifenCost.text = this.createCostLabel(this.data.cost[i]);
                }
            }
        }
        else {
            this._state = "normal";
            this.invalidateState();
            this.itemCost.text = this.createCostLabel(this.data.cost[0]);
            this.type.source = this.createCostIcon(this.data.moneyType[0]);
        }
        this.disImg.source = this.data.disCount ? this.data.disCount + "_png" : "";
        this.commonItem.img = this.data.imgS;
        this.commonItem.bgBox = GlobalFunc.setBgData(this.data.quality).boxS;
        this.commonItem.rightText = this.data.num ? this.data.num : "";
        this.itemName.text = this.data.itemName;
        this.itemName.textColor = DataCenter.bag.qualityColor[this.data.quality];
        this.commonItem.rightText = (this.data.goodsNum && this.data.goodsNum != 1) ? this.data.goodsNum + "" : "";
        // this.itemLev.x = this.itemName.x + this.itemName.width + 10;
        // this.itemLev.text = this.data.desc;
    };
    Store_item.prototype.createCostLabel = function (cost) {
        if (cost > 100000) {
            var num = (cost / 100000).toFixed(1);
            var arr = num.split(".");
            var num2 = parseInt(arr[1]);
            arr[1] = num2 ? num2 + "" : "";
            var num3 = num2 ? arr.join(".") : arr[0];
            return num3 + "万";
        }
        else {
            return cost + "";
        }
    };
    Store_item.prototype.createCostIcon = function (type) {
        var str = "";
        switch (type) {
            case data.PlayerAttr.money:
                str = "title_jinbi_png";
                break;
            case data.PlayerAttr.gold:
                str = "title_yuanbao_png";
                break;
            case data.PlayerAttr.shopScore:
                str = "title_yuanbao_png";
                break;
        }
        return str;
    };
    Store_item.prototype.getCurrentState = function () {
        return this._state;
    };
    return Store_item;
}(eui.ItemRenderer));
__reflect(Store_item.prototype, "Store_item");
//# sourceMappingURL=Store_item.js.map