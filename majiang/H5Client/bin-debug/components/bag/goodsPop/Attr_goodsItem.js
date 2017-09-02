var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Attr_goodsItem = (function (_super) {
    __extends(Attr_goodsItem, _super);
    function Attr_goodsItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "Attr_goodsItem_skin";
        return _this;
    }
    Attr_goodsItem.prototype.dataChanged = function () {
        this.descItem.textFlow = (new egret.HtmlTextParser).parser(this.data.desc);
        this.height = this.descItem.height + 12;
        Attr_goodsItem.m_height = this.height;
    };
    return Attr_goodsItem;
}(eui.ItemRenderer));
__reflect(Attr_goodsItem.prototype, "Attr_goodsItem");
//# sourceMappingURL=Attr_goodsItem.js.map