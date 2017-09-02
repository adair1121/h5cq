var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Bag_item = (function (_super) {
    __extends(Bag_item, _super);
    function Bag_item() {
        var _this = _super.call(this) || this;
        _this.skinName = "Bag_Item_skin";
        return _this;
    }
    Bag_item.prototype.dataChanged = function () {
        this.labelDisplay.text = this.data.label;
        this.equipImg.source = this.data.equipSource;
        this.equipIntensify.text = this.data.num;
        this.equipBox.source = this.data.equipBoxSource;
    };
    return Bag_item;
}(eui.ItemRenderer));
__reflect(Bag_item.prototype, "Bag_item");
//# sourceMappingURL=Bag_item.js.map