var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var fuben_material_item = (function (_super) {
    __extends(fuben_material_item, _super);
    function fuben_material_item() {
        var _this = _super.call(this) || this;
        _this.skinName = "fuben_material_item_skin";
        return _this;
    }
    fuben_material_item.prototype.dataChanged = function () {
        this.count.text = this.data.count + "";
        this.cost.text = this.data.cost + "";
    };
    Object.defineProperty(fuben_material_item.prototype, "s_count", {
        set: function (count) {
            this.count.text = this.data.count + "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(fuben_material_item.prototype, "s_cost", {
        set: function (money) {
            this.cost.text = this.data.cost + "";
        },
        enumerable: true,
        configurable: true
    });
    return fuben_material_item;
}(eui.ItemRenderer));
__reflect(fuben_material_item.prototype, "fuben_material_item");
//# sourceMappingURL=fuben_material_item.js.map