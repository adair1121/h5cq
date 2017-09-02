var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Module_fuben = (function (_super) {
    __extends(Module_fuben, _super);
    function Module_fuben() {
        return _super.call(this) || this;
    }
    Module_fuben.prototype.bindData = function () {
    };
    /**
     * 接收来自模块间的消息并分发
     * @param msg 消息列表
     */
    Module_fuben.prototype.receiveMsgFromModule = function (msgType, dataRes) {
        if (dataRes === void 0) { dataRes = null; }
        switch (msgType) {
            case MainNotify.OPENFUBENPANEL:
                this.createView();
                break;
            default:
                break;
        }
    };
    /**
     * 解析来自服务器的消息并处理
     * @param msg 模块对应的消息
     */
    Module_fuben.prototype.receiveMsgFromSever = function (msg) {
        switch (msg.S) {
            default:
                break;
        }
    };
    Module_fuben.prototype.createView = function () {
        this.view = new View_fuben();
        _super.prototype.createView.call(this);
    };
    Module_fuben.prototype.removeView = function () {
        if (this.view && this.view.parent && this.view.parent.contains(this.view)) {
            this.view.removeEvent();
            this.view.parent.removeChild(this.view);
        }
    };
    return Module_fuben;
}(Base_module));
__reflect(Module_fuben.prototype, "Module_fuben");
//# sourceMappingURL=Module_fuben.js.map