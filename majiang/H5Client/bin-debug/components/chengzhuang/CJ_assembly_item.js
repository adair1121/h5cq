var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CJ_assembly_item = (function (_super) {
    __extends(CJ_assembly_item, _super);
    function CJ_assembly_item() {
        var _this = _super.call(this) || this;
        _this.skinName = "CJ_assembly_item_skin";
        _this.assemblyBtn.label = "分解";
        return _this;
    }
    CJ_assembly_item.prototype.dataChanged = function () {
        this.item.bgBox = this.data.equipBoxSource;
        this.item.iName = this.data.level;
        this.item.img = this.data.equipSource;
        this.equipName.text = this.data.itemName;
        this.rewardLabel = this.data.orangeResolve;
        this.rewardLabel.textColor = this.data.rewardColor;
    };
    return CJ_assembly_item;
}(eui.ItemRenderer));
__reflect(CJ_assembly_item.prototype, "CJ_assembly_item");
//# sourceMappingURL=CJ_assembly_item.js.map