var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MainContainer = (function (_super) {
    __extends(MainContainer, _super);
    function MainContainer() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    MainContainer.prototype.init = function () {
        this.layer_panel = new eui.Component();
        this.addChild(this.layer_panel);
        this.layer_map = new egret.DisplayObjectContainer();
        this.addChild(this.layer_map);
        this.layer_ui = new eui.Component();
        this.addChild(this.layer_ui);
        this.layer_popup = new eui.Component();
        this.addChild(this.layer_popup);
        this.layer_wait = new eui.Component();
        this.addChild(this.layer_wait);
    };
    return MainContainer;
}(egret.DisplayObjectContainer));
__reflect(MainContainer.prototype, "MainContainer");
//# sourceMappingURL=MainContainer.js.map