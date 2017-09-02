var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Module_action = (function (_super) {
    __extends(Module_action, _super);
    function Module_action() {
        var _this = _super.call(this) || this;
        _this.curTime = 0;
        _this.stage = new egret.Stage();
        _this.msgGather = [];
        _this.layer = ViewController.getInstance().getContainer().layer_ui;
        _this.timer = new egret.Timer(DataCenter.frameRate);
        _this.timer.addEventListener(egret.TimerEvent.TIMER, _this.onTimerHandler, _this);
        eui.Binding.bindHandler(DataCenter, ["curFightState"], _this.fightStateChange, _this);
        return _this;
        // eui.Binding.bindHandler(DataCenter,["curExecActionState"],this.fightStateChange,this);
    }
    Module_action.prototype.fightStateChange = function (value) {
        if (value && Module_action.curMsg.length <= 0 && Config.connectState) {
            DataCenter.curFightState = false;
            this.resetTimer();
            DataCenter.challengeNum = DataCenter.playerAttr[data.PlayerAttr.LevelCount] + "@@" + Math.random();
            if (DataCenter.curFuBen == data.SenceType.GuanQia || this.curType == ActionUtil.TYPE_EXTRA) {
                // DataCenter.curSceneId = DataCenter.playerAttr[data.PlayerAttr.levelStageID];
                // GlobalFunc.changeSence(DataCenter.curSceneId,this);
                var awardPanel = new Boss_award();
                var itemData = GlobalFunc.deepCopy(DataCenter.bag.curDropGroup);
                for (var i = 0, len = itemData.length; i < len; i++) {
                    var itemTemple = temple.TempleManager.select(itemData[i].tid);
                    if (itemTemple.itemtype1 === 1 || itemTemple.itemtype1 === 3) {
                        itemData[i].imgSource = Config.path_goods + itemTemple.icon + ".png";
                    }
                    else {
                        itemData[i].imgSource = Config.path_equip + itemTemple.icon + ".png";
                    }
                    itemData[i].itemName = itemTemple.name;
                    itemData[i].color = DataCenter.bag.qualityColor[itemData[i].quality];
                    itemData[i].boxS = GlobalFunc.setBgData(itemData[i].quality).boxS;
                }
                PopUpManager.addPopUp(awardPanel, true, awardPanel.skinName, this.layer, 0);
                awardPanel.setData(itemData, this, this.moduleEnum, this.moduleMsg, { type: "personal" });
                return;
            }
            if (!DataCenter.changeSenceState && DataCenter.curFuBen == data.SenceType.YeWai) {
                SocketManager.getInstance().sendProto(new proto.c_move());
            }
        }
    };
    /**
     * 接收来自模块间的消息并分发
     * @param msg 消息列表
     */
    Module_action.prototype.receiveMsgFromModule = function (msgType, dataRes) {
        if (dataRes === void 0) { dataRes = null; }
        switch (msgType) {
            case MainNotify.EXTRACTIONLIST:
                this.resetTimer();
                this.curType = ActionUtil.TYPE_EXTRA;
                this.moduleEnum = ModuleEnum.BOSS;
                this.moduleMsg = MainNotify.OPENPERSONALBOSSPANEL;
                this.dealWithActionList(dataRes.actionList);
                break;
            case MainNotify.INITDATA:
                Module_action.flag = false;
                Module_action.curMsg = [];
                this.resetTimer();
                break;
            default:
                break;
        }
    };
    /**
 * 解析来自服务器的消息并处理
 * @param msg 模块对应的消息
 */
    Module_action.prototype.receiveMsgFromSever = function (msg) {
        switch (msg.S) {
            case proto.MessageType.s_SendMessbox:
                var msg2 = msg;
                if (DataCenter.endAction) {
                    DataCenter.endAction.clear();
                }
                this.resetTimer();
                this.curType = ActionUtil.TYPE_NORMAL;
                this.moduleEnum = "";
                this.moduleMsg = "";
                this.dealWithActionList(msg2.messList);
                break;
            case proto.MessageType.s_NotifyAction:
                var notify_msg = msg;
                this.resetTimer();
                this.curType = ActionUtil.TYPE_OTHER;
                this.dealWithActionList(notify_msg.actionList);
                break;
            case proto.MessageType.s_SyncBossPlayer:
                var sync_msg = msg;
                this.resetTimer();
                this.curType = ActionUtil.TYPE_ADD;
                this.dealWithActionList(sync_msg.addUnitList);
                break;
            default:
                break;
        }
    };
    /**处理动作列表 */
    Module_action.prototype.dealWithActionList = function (msg, type) {
        if (type === void 0) { type = ""; }
        Module_action.curMsg = [];
        Module_action.curMsg = msg;
        DataCenter.curFightState = false;
        // if(!type){
        // 	this.resetTimer();
        // }
        while (Module_action.flag) {
            if (!this.firstElement && Module_action.curMsg.length) {
                this.firstElement = Module_action.curMsg.shift();
            }
            if (this.firstElement.timeSpan <= this.curTime) {
                Module_action.flag = true;
                if (!DataCenter.endAction) {
                    DataCenter.endAction = new Dictionary("DataCenterEndAction");
                }
                if (this.firstElement.actionType === 0) {
                    if (!DataCenter.endAction.hasKey(this.firstElement.InstanceId)) {
                        DataCenter.endAction.add(this.firstElement.InstanceId, true);
                    }
                    else {
                        DataCenter.endAction.modify(this.firstElement.InstanceId, true);
                    }
                    this.calculEndAction(this.firstElement.InstanceId);
                }
                if (Module_action.curMsg.length) {
                    DataCenter.curExecAction = this.firstElement;
                }
                else {
                    DataCenter.lastOfAction = this.firstElement;
                    Module_action.flag = false;
                    return;
                }
                this.firstElement = null;
            }
            else {
                Module_action.flag = false;
                this.timer.start();
                return;
            }
        }
        // if(this.firstElement){
        // 	// DataCenter.curExecAction = this.firstElement;
        // 	DataCenter.lastOfAction = this.firstElement;
        // 	this.firstElement = null;
        // }
        // if(Module_action.curMsg.length <= 0 && Config.connectState){
        // 	this.resetTimer();
        // 	// DataCenter.challengeNum = DataCenter.playerAttr[data.PlayerAttr.LevelCount] + "@@"+Math.random();
        // 	// if(DataCenter.curFuBen != data.SenceType.YeWai){
        // 	// 	DataCenter.curSceneId = DataCenter.playerAttr[data.PlayerAttr.levelStageID];
        // 	// 	GlobalFunc.changeSence(DataCenter.curSceneId,this);
        // 	// 	return;
        // 	// }
        // 	// if(!DataCenter.changeSenceState){
        // 	// 	SocketManager.getInstance().sendProto(new proto.c_move()); 
        // 	// }
        // }
    };
    Module_action.prototype.calculEndAction = function (insId) {
        for (var i = 0; i < Module_action.curMsg.length; i++) {
            if (insId === Module_action.curMsg[i].InstanceId && DataCenter.endAction.hasKey(insId)) {
                DataCenter.endAction.modify(insId, false);
                return;
            }
        }
    };
    Module_action.prototype.resetTimer = function () {
        this.timer.stop();
        Module_action.flag = true;
        this.curTime = 0;
        this.firstElement = null;
    };
    Module_action.prototype.onTimerHandler = function (evt) {
        Module_action.flag = true;
        this.timer.stop();
        this.curTime += DataCenter.frameRate;
        this.dealWithActionList(Module_action.curMsg);
    };
    Module_action.prototype.resetPoolBall = function () {
        this.sendMsgToModule([ModuleEnum.MAINUI], MainNotify.RESET_POOLBALL);
    };
    return Module_action;
}(Base_module));
Module_action.flag = true;
__reflect(Module_action.prototype, "Module_action");
//# sourceMappingURL=Module_action.js.map