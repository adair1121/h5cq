var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Attr_baseInfo = (function (_super) {
    __extends(Attr_baseInfo, _super);
    function Attr_baseInfo() {
        var _this = _super.call(this) || this;
        _this.skinName = "Attr_baseInfo_skin";
        return _this;
    }
    Attr_baseInfo.prototype.dataChanged = function () {
        this.attrValue.text = this.data.attrValue;
        Attr_baseInfo._h = this.height;
    };
    Attr_baseInfo.getHeight = function () {
        return Attr_baseInfo._h;
    };
    return Attr_baseInfo;
}(eui.ItemRenderer));
__reflect(Attr_baseInfo.prototype, "Attr_baseInfo");
//# sourceMappingURL=Attr_baseInfo.js.map