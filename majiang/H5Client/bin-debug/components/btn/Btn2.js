var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Btn2 = (function (_super) {
    __extends(Btn2, _super);
    function Btn2() {
        var _this = _super.call(this) || this;
        _this.skinName = "Btn2_skin";
        return _this;
    }
    Object.defineProperty(Btn2.prototype, "label", {
        get: function () {
            return this.labelDisplay.text;
        },
        set: function (value) {
            this.labelDisplay.text = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Btn2.prototype, "order", {
        get: function () {
            return this.m_order;
        },
        set: function (value) {
            this.m_order = value;
        },
        enumerable: true,
        configurable: true
    });
    return Btn2;
}(eui.Component));
__reflect(Btn2.prototype, "Btn2");
//# sourceMappingURL=Btn2.js.map