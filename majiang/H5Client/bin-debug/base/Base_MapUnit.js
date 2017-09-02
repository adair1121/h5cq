var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Base_MapUnit = (function (_super) {
    __extends(Base_MapUnit, _super);
    function Base_MapUnit() {
        var _this = _super.call(this) || this;
        _this.job = 0;
        return _this;
    }
    Base_MapUnit.prototype.addEffect = function (effectName) {
    };
    Base_MapUnit.prototype.setBuff = function (buffInfo) {
    };
    Base_MapUnit.prototype.attack = function (action) {
    };
    Base_MapUnit.prototype.cast = function (action) {
    };
    Base_MapUnit.prototype.move = function (look, state) {
    };
    Base_MapUnit.prototype.stand = function (look, state) {
    };
    Base_MapUnit.prototype.addBuff = function (buffId) {
    };
    return Base_MapUnit;
}(egret.Sprite));
__reflect(Base_MapUnit.prototype, "Base_MapUnit");
//# sourceMappingURL=Base_MapUnit.js.map