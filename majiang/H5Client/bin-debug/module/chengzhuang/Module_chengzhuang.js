var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Module_chengzhuang = (function (_super) {
    __extends(Module_chengzhuang, _super);
    function Module_chengzhuang() {
        var _this = _super.call(this) || this;
        _this.assemblyObj = {};
        _this.disAssemblyObj = {};
        return _this;
    }
    Module_chengzhuang.prototype.bindData = function () {
        this.p_type = PanelType.MAINNAV;
    };
    /**
     * 接收来自模块间的消息并分发
     * @param msg 消息列表
     */
    Module_chengzhuang.prototype.receiveMsgFromModule = function (msgType, dataRes) {
        if (dataRes === void 0) { dataRes = null; }
        switch (msgType) {
            case MainNotify.OPENCJPANEL:
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
    Module_chengzhuang.prototype.receiveMsgFromSever = function (msg) {
        switch (msg.S) {
            case proto.MessageType.s_AssemblyEquip:
                var assembly_msg = msg;
                if (!assembly_msg.isSuccess) {
                    var obj = { type: TipsEnum.TYPE_WARN, label: assembly_msg.errMsg };
                    PopTipsManager.showPopTips([obj]);
                }
                else {
                    this.assemblyObj.equipItem = assembly_msg.equipItem;
                    this.sendMsgToModule([ModuleEnum.ROLEINFO], MainNotify.CJ_ASSEMBLY_SUCCESS, this.assemblyObj);
                    this.view.resetCJEquipData();
                }
                break;
            case proto.MessageType.s_DisassembleEquip:
                var dis_msg = msg;
                if (!dis_msg.isSuccess) {
                    var obj = { type: TipsEnum.TYPE_WARN, label: assembly_msg.errMsg };
                    PopTipsManager.showPopTips([obj]);
                }
                else {
                    for (var i = 0; i < DataCenter.cjEquip.length; i++) {
                        if (DataCenter.cjEquip[i].uid === this.disAssemblyObj.insId) {
                            this.sendMsgToModule([ModuleEnum.BAG], MainNotify.REMOVEBAGITEM, [DataCenter.cjEquip[i]]);
                            DataCenter.cjEquip.splice(i, 1);
                            break;
                        }
                    }
                    this.view.refreshCJData();
                }
                break;
            default:
                break;
        }
    };
    Module_chengzhuang.prototype.createView = function () {
        this.view = new View_chengzhuang();
        _super.prototype.createView.call(this);
    };
    Module_chengzhuang.prototype.removeView = function (closeState) {
        if (this.view && this.view.parent && this.view.parent.contains(this.view)) {
            this.view.removeEvent();
            this.view.parent.removeChild(this.view);
            if (closeState) {
                this.sendMsgToModule([ModuleEnum.MAINUI], MainNotify.INITNAVFOCUS);
            }
        }
    };
    /**向服务器发送消息 */
    //请求合成橙装
    Module_chengzhuang.prototype.assemblyEquip = function (dataObj) {
        var assembly_msg = new proto.c_AssemblyEquip();
        this.assemblyObj = dataObj;
        assembly_msg.itemId = dataObj.itemId;
        assembly_msg.job = dataObj.job;
        assembly_msg.equipPos = dataObj.equipPos;
        SocketManager.getInstance().sendProto(assembly_msg);
    };
    /**请求分解橙装 */
    Module_chengzhuang.prototype.disAssemblyEqip = function (dataObj) {
        var dis_msg = new proto.c_DisassembleEquip();
        dis_msg.equipInstId = dataObj.insId;
        dis_msg.job = dataObj.job;
        this.disAssemblyObj = dataObj;
        SocketManager.getInstance().sendProto(dis_msg);
    };
    return Module_chengzhuang;
}(Base_module));
__reflect(Module_chengzhuang.prototype, "Module_chengzhuang");
//# sourceMappingURL=Module_chengzhuang.js.map