var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CommonItem = (function (_super) {
    __extends(CommonItem, _super);
    function CommonItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "ItemSkin";
        return _this;
    }
    CommonItem.prototype.dataChanged = function () {
        this.equipImg.source = this.data.imgSource;
        if (this.data.rightValue) {
            this.rightLabel.text = this.data.rightValue;
        }
        if (this.data.leftValue) {
            this.leftLabel.text = this.data.leftValue;
        }
        this.itemName.text = this.data.itemName;
        this.itemName.textColor = this.data.color;
        this.equipBox.source = this.data.boxS;
    };
    Object.defineProperty(CommonItem.prototype, "bgBox", {
        set: function (value) {
            this.equipBox.source = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommonItem.prototype, "img", {
        set: function (value) {
            this.equipImg.source = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommonItem.prototype, "leftText", {
        set: function (value) {
            this.leftLabel.text = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommonItem.prototype, "rightText", {
        set: function (value) {
            this.rightLabel.text = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommonItem.prototype, "index", {
        get: function () {
            return this.m_index;
        },
        set: function (value) {
            this.m_index = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommonItem.prototype, "isLock", {
        get: function () {
            return this.m_isLock;
        },
        set: function (value) {
            this.m_isLock = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommonItem.prototype, "iName", {
        set: function (value) {
            this.itemName.text = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommonItem.prototype, "iNameColor", {
        set: function (value) {
            this.itemName.textColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommonItem.prototype, "rightLabelSize", {
        set: function (value) {
            this.rightLabel.size = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommonItem.prototype, "rightLabelColor", {
        set: function (value) {
            this.rightLabel.textColor = value;
        },
        enumerable: true,
        configurable: true
    });
    return CommonItem;
}(eui.ItemRenderer));
__reflect(CommonItem.prototype, "CommonItem");
//# sourceMappingURL=CommonItem.js.map