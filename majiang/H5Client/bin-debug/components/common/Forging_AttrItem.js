var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Forging_AttrItem = (function (_super) {
    __extends(Forging_AttrItem, _super);
    function Forging_AttrItem(name, value_now, value_next) {
        var _this = _super.call(this) || this;
        _this.skinName = "Forging_AttrItem_skin";
        _this.txt_propName.text = name;
        _this.txt_prop_now.text = value_now;
        _this.txt_prop_next.text = value_next;
        return _this;
    }
    return Forging_AttrItem;
}(eui.Component));
__reflect(Forging_AttrItem.prototype, "Forging_AttrItem");
//# sourceMappingURL=Forging_AttrItem.js.map