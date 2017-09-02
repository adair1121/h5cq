var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Role_specialItem = (function (_super) {
    __extends(Role_specialItem, _super);
    function Role_specialItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "Role_specialItem_skin";
        return _this;
    }
    Role_specialItem.prototype.dataChanged = function () {
        this.attrTitle.text = this.data.attr;
        this.attrNum.text = this.data.value;
        this.attrNum.x = this.attrTitle.x + this.attrTitle.width + 10;
    };
    return Role_specialItem;
}(eui.ItemRenderer));
__reflect(Role_specialItem.prototype, "Role_specialItem");
//# sourceMappingURL=Role_specialItem.js.map