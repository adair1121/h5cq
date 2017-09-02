var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Btn3 = (function (_super) {
    __extends(Btn3, _super);
    function Btn3() {
        var _this = _super.call(this) || this;
        _this.skinName = "Btn3_skin";
        _this.labelDisplay.touchEnabled = false;
        _this.touchChildren = false;
        _this.touchEnabled = true;
        return _this;
    }
    Object.defineProperty(Btn3.prototype, "label", {
        get: function () {
            return this._label;
        },
        set: function (v) {
            this._label = v;
            this.labelDisplay.text = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Btn3.prototype, "size", {
        get: function () {
            return this._size;
        },
        set: function (v) {
            this._size = v;
            this.labelDisplay.size = v;
        },
        enumerable: true,
        configurable: true
    });
    return Btn3;
}(eui.Component));
__reflect(Btn3.prototype, "Btn3");
//# sourceMappingURL=Btn3.js.map