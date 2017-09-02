var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Bag_attrItem = (function (_super) {
    __extends(Bag_attrItem, _super);
    function Bag_attrItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "Bag_attrItem_skin";
        _this.arrayCollect = new eui.ArrayCollection();
        _this.itemGroup.dataProvider = _this.arrayCollect;
        return _this;
    }
    Bag_attrItem.prototype.dataChanged = function () {
        this.attrTitle.text = this.data.title;
        if (this.data.renderType === 1) {
            this.itemGroup.itemRenderer = Attr_baseInfo;
        }
        else {
            this.itemGroup.itemRenderer = Attr_GemInfo;
        }
        this.arrayCollect.source = this.data.baseAttrSource;
        this.itemGroup.height = this.data.baseAttrSource.length * Attr_baseInfo.getHeight();
        this.height = (this.itemGroup.height + 20);
        Bag_attrItem._h = (this.itemGroup.height + 20) + "@@" + Math.random();
    };
    return Bag_attrItem;
}(eui.ItemRenderer));
__reflect(Bag_attrItem.prototype, "Bag_attrItem");
//# sourceMappingURL=Bag_attrItem.js.map