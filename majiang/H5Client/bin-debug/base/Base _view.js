var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Base_view = (function (_super) {
    __extends(Base_view, _super);
    function Base_view() {
        return _super.call(this) || this;
    }
    Base_view.prototype.removeEvent = function () { };
    ;
    return Base_view;
}(eui.Component));
__reflect(Base_view.prototype, "Base_view");
//# sourceMappingURL=Base _view.js.map