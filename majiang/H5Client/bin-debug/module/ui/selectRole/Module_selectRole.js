var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Module_selectRole = (function (_super) {
    __extends(Module_selectRole, _super);
    function Module_selectRole() {
        return _super.call(this) || this;
    }
    /**
     * 接收来自模块间的消息并分发
     * @param msg 消息列表
     */
    Module_selectRole.prototype.receiveMsgFromModule = function (msgType, data) {
        if (data === void 0) { data = null; }
        switch (msgType) {
            case MainNotify.OPENSELECTROLEPANEL:
                this.createView();
                break;
            default:
                break;
        }
    };
    Module_selectRole.prototype.createView = function () {
        this.view = new View_selectRole();
        ViewController.getInstance().addView(ViewController.getInstance().getContainer().layer_panel, this.view);
    };
    Module_selectRole.prototype.createRole = function () {
        var params = this.view.tData;
        var msg_createChar = new proto.c_CreateChar();
        msg_createChar.name = params.name;
        msg_createChar.JOB = parseInt(params.Job);
        msg_createChar.Sex = parseInt(params.Sex);
        SocketManager.getInstance().sendProto(msg_createChar);
        this.removeView();
    };
    return Module_selectRole;
}(Base_module));
__reflect(Module_selectRole.prototype, "Module_selectRole");
//# sourceMappingURL=Module_selectRole.js.map