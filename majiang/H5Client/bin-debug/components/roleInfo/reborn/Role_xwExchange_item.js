var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Role_xwExchange_item = (function (_super) {
    __extends(Role_xwExchange_item, _super);
    function Role_xwExchange_item() {
        var _this = _super.call(this) || this;
        _this.STATE_EXCHANGE = "exchangeXw";
        _this.STATE_BUY = "buyXw";
        _this.skinName = "Role_xwExchange_item_skin";
        return _this;
    }
    Role_xwExchange_item.prototype.childrenCreated = function () {
        this.skin.currentState = this.STATE_EXCHANGE;
    };
    Role_xwExchange_item.prototype.setBtnState = function (name, state) {
        this.commonBtn.label = name;
        this.commonBtn.currentState = state;
    };
    Role_xwExchange_item.prototype.setItemData = function (dataObj) {
        this.icon.equipBox.source = GlobalFunc.setBgData(dataObj.quality).boxS;
        this.icon.img = dataObj.imgS;
    };
    Object.defineProperty(Role_xwExchange_item.prototype, "count", {
        set: function (num) {
            this.txt_count.textFlow = (new egret.HtmlTextParser).parser("<font color=0xe6d8b3>今天还可兑换</font><font color=0x04fe10>" + num + "</font><font color=0xe6d8b3>次</font>");
        },
        enumerable: true,
        configurable: true
    });
    Role_xwExchange_item.prototype.setxw = function (num, color) {
        this.txt1.textFlow = (new egret.HtmlTextParser).parser("<font color=0xfecc04>增加</font><font color=" + color + ">" + num + "</font><font color=0xfecc04>修为</font>");
    };
    Object.defineProperty(Role_xwExchange_item.prototype, "state", {
        set: function (value) {
            this.skin.currentState = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Role_xwExchange_item.prototype, "item", {
        set: function (value) {
            this.text2.text = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Role_xwExchange_item.prototype, "icost", {
        set: function (value) {
            this.cost.text = value;
        },
        enumerable: true,
        configurable: true
    });
    return Role_xwExchange_item;
}(eui.Component));
__reflect(Role_xwExchange_item.prototype, "Role_xwExchange_item");
//# sourceMappingURL=Role_xwExchange_item.js.map