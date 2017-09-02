var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Btn1 = (function (_super) {
    __extends(Btn1, _super);
    function Btn1() {
        var _this = _super.call(this) || this;
        _this.skinName = "Btn1_skin";
        return _this;
    }
    Object.defineProperty(Btn1.prototype, "label", {
        set: function (value) {
            this.labelTxt.text = value;
        },
        enumerable: true,
        configurable: true
    });
    return Btn1;
}(eui.Component));
__reflect(Btn1.prototype, "Btn1");
//# sourceMappingURL=Btn1.js.map