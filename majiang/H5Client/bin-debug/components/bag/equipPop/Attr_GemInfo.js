var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Attr_GemInfo = (function (_super) {
    __extends(Attr_GemInfo, _super);
    function Attr_GemInfo() {
        var _this = _super.call(this) || this;
        _this.skinName = "Attr_GemInfo_skin";
        return _this;
    }
    Attr_GemInfo.prototype.dataChanged = function () {
        this.attr.text = this.data.attrValue;
        this.gem.source = this.data.gemSource;
        Attr_GemInfo._h = this.height;
    };
    Attr_GemInfo.getHeight = function () {
        return Attr_GemInfo._h;
    };
    return Attr_GemInfo;
}(eui.ItemRenderer));
__reflect(Attr_GemInfo.prototype, "Attr_GemInfo");
//# sourceMappingURL=Attr_GemInfo.js.map