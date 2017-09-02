var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GoodsItem = (function (_super) {
    __extends(GoodsItem, _super);
    function GoodsItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "Bag_Item_skin";
        return _this;
    }
    GoodsItem.prototype.dataChanged = function () {
        this.labelDisplay.text = this.data.label;
        this.equipImg.source = this.data.equipSource;
        if (this.data.num) {
            this.equipIntensify.visible = true;
            this.equipIntensify.text = this.data.num;
        }
        else {
            this.equipIntensify.visible = false;
        }
        this.equipBox.source = this.data.equipBoxSource;
    };
    return GoodsItem;
}(eui.ItemRenderer));
__reflect(GoodsItem.prototype, "GoodsItem");
//# sourceMappingURL=GoodsItem.js.map