var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Module_forging = (function (_super) {
    __extends(Module_forging, _super);
    function Module_forging() {
        var _this = _super.call(this) || this;
        _this.p_type = PanelType.MAINNAV;
        return _this;
    }
    /**
     * 解析来自服务器的消息并处理
     * @param msg 模块对应的消息
     */
    Module_forging.prototype.receiveMsgFromSever = function (msg) {
        switch (msg.S) {
            case proto.MessageType.s_Strengthen:
                if (this.curForgingType != DataCenter.forginType) {
                    return;
                }
                var curMsg = msg;
                if (curMsg.isSuccess) {
                    this.qianghuaHandler(curMsg);
                }
                else {
                    var obj = { type: TipsEnum.TYPE_WARN, label: "锻造失败" };
                    PopTipsManager.showPopTips([obj]);
                }
                break;
            default:
                break;
        }
    };
    /**
     * 接收来自模块间的消息并分发
     * @param msg 消息列表
     */
    Module_forging.prototype.receiveMsgFromModule = function (msgType, data) {
        if (data === void 0) { data = null; }
        switch (msgType) {
            case MainNotify.OPENFORGINGPANEL:
                //打开锻造面板
                this.createView();
                break;
            default:
                break;
        }
    };
    Module_forging.prototype.qianghuaHandler = function (msg) {
        if (msg.isSuccess) {
            var arr = DataCenter.forgingData.get(this.curJob + "").get(this.curState);
            var fightValueUp = 0;
            for (var i = 0; i < arr.length; i++) {
                var any = arr[i];
                if (any.pos == DataCenter.forgingPos.get(this.curJob + "")[this.curForgingType]) {
                    switch (this.curState) {
                        case "qianghua":
                            var oldT = temple.TempleManager.select(any.value);
                            var newT = temple.TempleManager.select(msg.newID);
                            fightValueUp = newT.FightValue - oldT.FightValue;
                            break;
                        case "gem":
                            var oldT1 = temple.TempleManager.select(any.value);
                            var newT1 = temple.TempleManager.select(msg.newID);
                            fightValueUp = newT1.FightValue - oldT1.FightValue;
                            break;
                        case "zhuling":
                            var oldT2 = temple.TempleManager.select(any.value);
                            var newT2 = temple.TempleManager.select(msg.newID);
                            fightValueUp = newT2.FightValue - oldT2.FightValue;
                            break;
                    }
                    any.value = msg.newID;
                }
            }
        }
        var template = temple.TempleManager.select(msg.nextStrengthId);
        DataCenter.forgingPos.get(this.curJob + "")[this.curForgingType] = template.pos;
        DataCenter.forginPower.get(this.curJob + "")[this.curForgingType] += fightValueUp;
        GlobalFunc.showPowerUpTips(DataCenter.forginPower.get(this.curJob + "")[this.curForgingType], [fightValueUp]);
        var num;
        switch (template.pos) {
            case 1:
                num = 0;
                break;
            case 2:
                num = 1;
                break;
            case 3:
                num = 2;
                break;
            case 4:
                num = 3;
                break;
            case 5:
                num = 4;
                break;
            case 6:
                num = 5;
                break;
            case 7:
                num = 6;
                break;
            case 8:
                num = 7;
                break;
        }
        DataCenter.forgingUIPos.get(this.curJob + "")[this.curForgingType] = num;
        this.view.changeView(this.curState);
    };
    Module_forging.prototype.createView = function () {
        if (this.view && this.view.parent && this.view.parent.contains(this.view)) {
            this.removeView(1);
        }
        else {
            //打开角色面板
            this.view = new View_forging();
            _super.prototype.createView.call(this);
            // this.view.refreshHeadIcon(Module_roleInfo.headIconSource);
            this.refreshView();
        }
    };
    Module_forging.prototype.removeView = function (closeState) {
        //关闭角色面板
        if (this.view && this.view.parent && this.view.parent.contains(this.view)) {
            this.view.removeEvent();
            this.view.parent.removeChild(this.view);
            if (closeState) {
                this.sendMsgToModule([ModuleEnum.MAINUI], MainNotify.INITNAVFOCUS);
            }
        }
    };
    /*** 刷新界面数据显示*/
    Module_forging.prototype.refreshView = function () {
        //
        // this.view.refreshRoleMode(Module_roleInfo.clothPath,Module_roleInfo.weaponPath);
        // this.view.refreshEquipData({leftSourceArr:Module_roleInfo.leftEquipArr,rightSourceArr:Module_roleInfo.rightEquipArr});
        // this.view.changePower(DataCenter.role1Info.roleAttr[data.RoleAttr.FightValue]);
        this.view.changeView();
    };
    Module_forging.prototype.sendUpgradeMsg = function (type) {
        this.curForgingType = type;
        var forging_msg = new proto.c_Strengthen();
        forging_msg.job = this.curJob;
        forging_msg.type = type + 1;
        DataCenter.forginType = type;
        forging_msg.pos = DataCenter.forgingPos.get(this.curJob + "")[type];
        SocketManager.getInstance().sendProto(forging_msg);
    };
    return Module_forging;
}(Base_module));
__reflect(Module_forging.prototype, "Module_forging");
//# sourceMappingURL=Module_forging.js.map