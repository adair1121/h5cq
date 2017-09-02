var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var level_rank_item = (function (_super) {
    __extends(level_rank_item, _super);
    function level_rank_item() {
        var _this = _super.call(this) || this;
        _this.skinName = "level_rank_item_skin";
        return _this;
    }
    level_rank_item.prototype.dataChanged = function () {
        this.rankLev.text = this.data.rankLev;
        this.itemName.text = this.data.itemName;
        this.itemLev.text = this.data.itemLev;
    };
    return level_rank_item;
}(eui.ItemRenderer));
__reflect(level_rank_item.prototype, "level_rank_item");
//# sourceMappingURL=level_rank_item.js.map