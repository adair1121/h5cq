var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Material_item = (function (_super) {
    __extends(Material_item, _super);
    function Material_item() {
        var _this = _super.call(this) || this;
        _this.skinName = "Material_item_skin";
        Material_item._height = _this.height;
        return _this;
    }
    Material_item.prototype.dataChanged = function () {
        this.icon.source = this.data.icon;
        this.way.myText = this.data.itemWay;
        if (this.data.width) {
            this.width = this.data.width;
        }
    };
    Object.defineProperty(Material_item, "m_height", {
        get: function () {
            return Material_item._height;
        },
        enumerable: true,
        configurable: true
    });
    return Material_item;
}(eui.ItemRenderer));
__reflect(Material_item.prototype, "Material_item");
//# sourceMappingURL=Material_item.js.map