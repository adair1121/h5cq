var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Smelt_selectItem = (function (_super) {
    __extends(Smelt_selectItem, _super);
    function Smelt_selectItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "Smelt_selectItem_skin";
        return _this;
    }
    Smelt_selectItem.prototype.dataChanged = function () {
        this.comonItem.equipBox.source = this.data.boxS;
        this.comonItem.equipImg.source = this.data.imgSource;
        this.comonItem.iName = this.data.lev;
        this.itemName.text = this.data.iName;
        this.checkBox.selected = this.data.selected;
        for (var key in this.data.extra) {
            var attrName = AttrNameUtil.getInstance().getAttrName(parseInt(key), 3) + ":";
            var attrValue = "\t\t" + this.data.cattr[key] + "+" + this.data.extra[key];
            if (this.data.extra[key]) {
                this.createLabel(attrName + attrValue, 0x0FB8FF);
            }
        }
    };
    Object.defineProperty(Smelt_selectItem.prototype, "checkSelect", {
        set: function (value) {
            this.checkBox.selected = value;
        },
        enumerable: true,
        configurable: true
    });
    Smelt_selectItem.prototype.createLabel = function (str, color) {
        if (color === void 0) { color = 0xffffff; }
        this.attrLabel = new eui.Label();
        this.attrGroup.addChild(this.attrLabel);
        var htmlText = "<font color=" + color + " size=16 fontFamily='SimHei'>" + str + "</font>";
        this.attrLabel.textFlow = (new egret.HtmlTextParser).parser(htmlText);
    };
    return Smelt_selectItem;
}(eui.ItemRenderer));
__reflect(Smelt_selectItem.prototype, "Smelt_selectItem");
//# sourceMappingURL=Smelt_selectItem.js.map