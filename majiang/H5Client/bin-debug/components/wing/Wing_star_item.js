var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Wing_star_item = (function (_super) {
    __extends(Wing_star_item, _super);
    function Wing_star_item() {
        var _this = _super.call(this) || this;
        _this.skinName = "Wing_star_item_skin";
        return _this;
    }
    Wing_star_item.prototype.dataChanged = function () {
        this.star.source = this.data.img;
    };
    return Wing_star_item;
}(eui.ItemRenderer));
__reflect(Wing_star_item.prototype, "Wing_star_item");
//# sourceMappingURL=Wing_star_item.js.map