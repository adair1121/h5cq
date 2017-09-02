var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Way_shop_item = (function (_super) {
    __extends(Way_shop_item, _super);
    function Way_shop_item() {
        var _this = _super.call(this) || this;
        _this.m_maxNum = 0;
        _this.skinName = "Way_shop_item_skin";
        return _this;
    }
    Way_shop_item.prototype.childrenCreated = function () {
        Global.addEventListener(MainNotify.COSTCHANGE, this.costChange, this);
        this.watcher = eui.Binding.bindHandler(Way_shop_item, ["allCostNum"], this.allCostChange, this);
    };
    Way_shop_item.prototype.allCostChange = function (value) {
        if (value) {
            this.allCostLabel.text = Way_shop_item.allCostNum + "";
        }
    };
    Way_shop_item.prototype.costChange = function (evt) {
        Way_shop_item.allCostNum = evt.c_data.curValue * Way_shop_item.m_singleCost;
        Way_shop_item.costValue = evt.c_data.curValue;
    };
    Way_shop_item.prototype.setItemData = function (dataObj) {
        this.commonItem.equipBox.source = GlobalFunc.setBgData(dataObj.quality).boxS;
        this.commonItem.equipImg.source = dataObj.imgS;
        this.itemName.text = dataObj.itemName;
        // this.singleCost = dataObj.singleCost;
        Way_shop_item.allCostNum = this.singleCost;
        this.itemName.textColor = DataCenter.bag.qualityColor[dataObj.quality];
    };
    Object.defineProperty(Way_shop_item.prototype, "relation", {
        set: function (value) {
            this.addCom.minValue = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Way_shop_item.prototype, "singleCost", {
        get: function () {
            return Way_shop_item.m_singleCost;
        },
        set: function (value) {
            this.singleCostLabel.text = value + "";
            Way_shop_item.m_singleCost = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Way_shop_item.prototype, "maxNum", {
        set: function (value) {
            this.addCom.maxValue = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Way_shop_item.prototype, "costNum", {
        get: function () {
            return this.addCom.costNum;
        },
        set: function (value) {
            this.addCom.costNum = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Way_shop_item.prototype, "allCost", {
        set: function (value) {
            Way_shop_item.allCostNum = value;
        },
        enumerable: true,
        configurable: true
    });
    return Way_shop_item;
}(eui.Component));
Way_shop_item.m_singleCost = 100;
Way_shop_item.costValue = 1;
__reflect(Way_shop_item.prototype, "Way_shop_item");
//# sourceMappingURL=Way_shop_item.js.map