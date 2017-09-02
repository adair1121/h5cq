var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BagBtn = (function (_super) {
    __extends(BagBtn, _super);
    function BagBtn() {
        var _this = _super.call(this) || this;
        _this.skinName = "BagBtn_skin";
        return _this;
    }
    BagBtn.prototype.setAttr = function (attrObj) {
        for (var key in attrObj) {
            if (this.labelTxt[key]) {
                this.labelTxt[key] = attrObj[key];
            }
            else {
                this.button[key] = attrObj[key];
            }
        }
    };
    return BagBtn;
}(eui.Component));
__reflect(BagBtn.prototype, "BagBtn");
//# sourceMappingURL=BagBtn.js.map