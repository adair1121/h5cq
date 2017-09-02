var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Module_roleSelect = (function (_super) {
    __extends(Module_roleSelect, _super);
    function Module_roleSelect() {
        return _super.call(this) || this;
    }
    Module_roleSelect.prototype.bind = function () {
        this.p_type = PanelType.MAINNAV;
    };
    /**
     * 接收来自模块间的消息并分发
     * @param msg 消息列表
     */
    Module_roleSelect.prototype.receiveMsgFromModule = function (msgType, data) {
        if (data === void 0) { data = null; }
        switch (msgType) {
            case MainNotify.OPENCREATEROLE:
                //打开邮件面板
                this.createView(data);
                break;
            case MainNotify.CLOSECRETEROLE:
                this.removeView();
                break;
            default:
                break;
        }
    };
    /**
     * 解析来自服务器的消息并处理
     * @param msg 模块对应的消息
     */
    // public receiveMsgFromSever(msg:proto.Pro):void{
    // 	switch (msg.S) {
    // 		default:
    // 			break;
    // 	}
    // }
    Module_roleSelect.prototype.createView = function (dataObj) {
        if (dataObj === void 0) { dataObj = null; }
        if (this.view && this.view.parent && this.view.parent.contains(this.view)) {
            this.removeView();
        }
        else {
            //打开角色面板
            this.view = new View_roleSelect();
            _super.prototype.createView.call(this);
            if (dataObj) {
                this.view.setData(dataObj);
            }
        }
    };
    Module_roleSelect.prototype.removeView = function () {
        //关闭角色面板
        if (this.view && this.view.parent && this.view.parent.contains(this.view)) {
            this.view.removeEvent();
            this.view.parent.removeChild(this.view);
        }
    };
    Module_roleSelect.prototype.createRole = function (dataObj) {
        var createRole_msg = new proto.c_createRole();
        createRole_msg.job = dataObj.job;
        createRole_msg.sex = dataObj.sex;
        SocketManager.getInstance().sendProto(createRole_msg);
    };
    return Module_roleSelect;
}(Base_module));
__reflect(Module_roleSelect.prototype, "Module_roleSelect");
//# sourceMappingURL=Module_roleSelect.js.map