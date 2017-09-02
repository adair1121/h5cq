var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Module_mainUI = (function (_super) {
    __extends(Module_mainUI, _super);
    function Module_mainUI() {
        var _this = _super.call(this) || this;
        _this.autoChallengeState = false;
        _this.levelId = 0;
        return _this;
    }
    Module_mainUI.prototype.bindData = function () {
        DataCenter.curFuBen = data.SenceType.YeWai;
        eui.Binding.bindHandler(DataCenter, ["playerAttr"], this.dealWithMainUIData, this);
        eui.Binding.bindHandler(DataCenter, ["count"], this.onCountChange, this);
        eui.Binding.bindHandler(DataCenter, ["playerInfo", "curHp"], this.hpChangeHandler, this);
        eui.Binding.bindHandler(this, ["skinState"], this.senceChange, this);
        eui.Binding.bindHandler(DataCenter, ["curFuBen"], this.curSenceChange, this);
    };
    //////////////////////////////数据绑定函数///////////////
    Module_mainUI.prototype.curSenceChange = function (value) {
        this.skinState = value;
        var levId = DataCenter.playerAttr[data.PlayerAttr.levelStageID];
        this.refreshLevelInfo(levId);
    };
    Module_mainUI.prototype.dealWithMainUIData = function (value) {
        if (value != null) {
            DataCenter.playerPower = value[data.PlayerAttr.FightValue];
            DataCenter.playerInfo.curHp = DataCenter.playerInfo.tolHp;
            DataCenter.playerInfo.curMp = DataCenter.playerInfo.tolMp;
        }
    };
    Module_mainUI.prototype.onCountChange = function (value) {
        if (value != null) {
            var len = DataCenter.bag.curDropGroup.length;
            if (len && (value >= len)) {
                DataCenter.count = 0;
                PopTipsManager.showPopTips(DataCenter.bag.curDropGroup);
            }
        }
    };
    Module_mainUI.prototype.hpChangeHandler = function (value) {
        if (value != null && this.view) {
            this.view.changeHpPoll(value);
        }
    };
    Module_mainUI.prototype.senceChange = function (value) {
        if (!isNaN(value) && this.view && this.view.parent && this.view.parent.contains(this.view)) {
            this.view.changeScene(value);
        }
    };
    Module_mainUI.prototype.receiveMsgFromModule = function (msgType, dataRes) {
        if (dataRes === void 0) { dataRes = null; }
        switch (msgType) {
            case MainNotify.INITNAVFOCUS:
                this.view.initNavFocus(null);
                break;
            case MainNotify.REDUCE_POLLBALL:
                this.damage = dataRes.damage;
                DataCenter.playerInfo.curHp -= this.damage;
                break;
            case MainNotify.RESET_POOLBALL:
                DataCenter.playerInfo.curHp = DataCenter.playerInfo.tolHp;
                break;
            // case MainNotify.INITDATA:
            // 	break;
            case MainNotify.ADDCHAT:
                var msg = null;
                if (dataRes) {
                    msg = dataRes.msg;
                }
                if (this.view && this.view.parent && this.view.parent.contains(this.view)) {
                    this.view.showChat(msg);
                }
                break;
            case MainNotify.CHANGESCENE:
                this.createView();
                this.view.showChat();
                break;
            case MainNotify.TIMESTART:
                this.view.startTime();
                break;
            case MainNotify.TIMEEND:
                this.view.stopTime();
                break;
            default:
                break;
        }
    };
    /**
     * 解析来自服务器的消息并处理
     * @param msg 模块对应的消息
     */
    Module_mainUI.prototype.receiveMsgFromSever = function (msg) {
        switch (msg.S) {
            case proto.MessageType.s_BuyItem:
                var buyMsg = msg;
                DataCenter.buyItemState = buyMsg.isSuccess + "@@" + Math.random();
                if (!buyMsg.isSuccess) {
                    var obj = [{ type: TipsEnum.TYPE_WARN, label: "购买失败" }];
                    PopTipsManager.showPopTips(obj);
                    temple;
                    return;
                }
                else {
                    var template = temple.TempleManager.select(this.buyItemId);
                    var itemTemplate = temple.TempleManager.select(template.ItemID);
                    var obj = [{ type: TipsEnum.TYPE_EQUIP, quality: itemTemplate.itemQuality, label: itemTemplate.name, num: this.buyItemNum }];
                    PopTipsManager.showPopTips(obj);
                    if (this.entrance) {
                        //从神秘商店购买材料
                        this.sendMsgToModule([ModuleEnum.STORE], MainNotify.DEALBUYITEMDATA);
                    }
                }
                break;
            case proto.MessageType.s_SyncTime:
                var time_msg = msg;
                var clientTime = time_msg.clientTime;
                var serverTime = time_msg.serverTime;
                var delayTime = serverTime - clientTime;
                DataCenter.serverTimer = serverTime + delayTime;
                break;
            case proto.MessageType.s_LeaveBossRoom:
                var leave_msg = msg;
                if (leave_msg.isSuccess) {
                    this.sendMsgToModule([ModuleEnum.ACTION], MainNotify.INITDATA);
                    DataCenter.curSceneId = DataCenter.playerAttr[data.PlayerAttr.levelStageID];
                    GlobalFunc.changeSence(DataCenter.curSceneId, this);
                }
                else {
                    PopTipsManager.showPopTips([{ type: TipsEnum.TYPE_WARN, label: leave_msg.errMsg }]);
                    return;
                }
                break;
            default:
                break;
        }
    };
    // private dealWithAttr(attrMsg:proto.s_setAttr):void{
    // 	var attrValue:proto.AttrValue[] = attrMsg.setAttr;
    // 	for(var i:number = 0;i<attrValue.length;i++){
    // 		switch(attrValue[i].type){
    // 			case 0:
    // 				DataCenter.basePlayerInfo.playerAttr[attrValue[i].attrID] = attrValue[i].myvalue;
    // 				break;
    // 			case 1:
    // 				break;
    // 			case 2:
    // 				break;
    // 			case 3:
    // 				break;
    // 		}
    // 	}
    // }
    Module_mainUI.prototype.createView = function () {
        if (this.view) {
            return;
        }
        this.view = new View_mainUI();
        DataCenter.challengeNum = DataCenter.playerAttr[data.PlayerAttr.LevelCount] + "@@" + Math.random();
        ViewController.getInstance().getContainer().layer_ui.addChild(this.view);
        eui.Binding.bindProperty(DataCenter.playerAttr, [data.PlayerAttr.FightValue + ""], this.view, "power");
        eui.Binding.bindProperty(DataCenter.playerAttr, [data.PlayerAttr.money + ""], this.view, "money");
        eui.Binding.bindProperty(DataCenter, ["playerName"], this.view, "uname");
        eui.Binding.bindProperty(DataCenter.playerAttr, [data.PlayerAttr.gold + ""], this.view, "gold");
        eui.Binding.bindProperty(DataCenter.playerAttr, [data.PlayerAttr.VIP + ""], this.view, "vip");
        eui.Binding.bindHandler(DataCenter.playerAttr, [data.PlayerAttr.levID + ""], this.levelChange, this);
        eui.Binding.bindHandler(DataCenter, ["challengeNum"], this.levelCountChange, this);
        eui.Binding.bindHandler(DataCenter.playerAttr, [data.PlayerAttr.levelStageID + ""], this.levelIdChange, this);
        eui.Binding.bindHandler(DataCenter.playerAttr, [data.PlayerAttr.exp + ""], this.playerCurHpChange, "this");
        this.view.refreshRoleInfoData();
        this.syncTime();
    };
    Module_mainUI.prototype.levelChange = function (value) {
        this.view.level = value;
        DataCenter.playerMaxExp = DataCenter.levelData[value].Exp;
        DataCenter.worShipExp = DataCenter.levelData[value].worshipExp;
        DataCenter.worShipMoney = DataCenter.levelData[value].worshipMoney;
    };
    Module_mainUI.prototype.playerCurHpChange = function (value) {
        DataCenter.playerCurExp = value;
    };
    Module_mainUI.prototype.levelCountChange = function (value) {
        if (value) {
            var count = parseInt(value.split("@@").shift());
            this.view.refreshChallengeNum(count);
            if (this.autoChallengeState && DataCenter.curFuBen === data.SenceType.YeWai && count >= 3) {
                //开启自动挑战状态
                GlobalFunc.changeSence(this.levelId, this);
            }
        }
    };
    Module_mainUI.prototype.levelIdChange = function (value) {
        if (value) {
            this.refreshLevelInfo(value);
        }
    };
    Module_mainUI.prototype.refreshLevelInfo = function (levelId) {
        var obj = {};
        var template = temple.TempleManager.select(levelId);
        this.levelId = template.BossMap;
        var template2 = temple.TempleManager.select(template.BossMap);
        switch (DataCenter.curFuBen) {
            case data.SenceType.YeWai:
                obj = {
                    levName: "第" + template.LevelNum + "关\t" + template.Name,
                    getMoney: template.Money,
                    getExp: template.Exp,
                    skinState: "mainState"
                };
                break;
            case data.SenceType.GuanQia:
                obj = {
                    levName: "关卡守卫:\t" + template2.LevelNum + "关",
                    fDesc: template2.Desc,
                    skinState: "fubenState"
                };
                break;
            case data.SenceType.GeRenBoss:
                obj = {
                    levName: "个人boss",
                    fDesc: "奖励:金币、经验、精魄、装备、道具",
                    skinState: "fubenState"
                };
                break;
            case data.SenceType.FuBen:
                obj = {
                    levName: "个人boss",
                    fDesc: "奖励:金币、经验、精魄、装备、道具",
                    skinState: "fubenState"
                };
                break;
            default:
                break;
        }
        if (this.view && this.view.parent && this.view.parent.contains(this.view)) {
            this.view.refreshLevelInfo(obj);
        }
    };
    Module_mainUI.prototype.syncTime = function () {
        var time_msg = new proto.c_SyncTime();
        var time = Math.floor(new Date().getTime() / 1000);
        time_msg.clientTime = time;
        SocketManager.getInstance().sendProto(time_msg);
    };
    Module_mainUI.prototype.leaveBossRoom = function () {
        var leave_msg = new proto.c_LeaveBossRoom();
        leave_msg.bossTemplateId = DataCenter.curBossRoomId;
        SocketManager.getInstance().sendProto(leave_msg);
    };
    Module_mainUI.prototype.sendToSByItem = function (dataObj) {
        var shopTemple = temple.TempleManager.select(dataObj.ID);
        var itemTemple = temple.TempleManager.select(shopTemple.ItemID);
        var boxNum = DataCenter.playerAttr[data.PlayerAttr.bagcount];
        if (DataCenter.curBoxNum >= boxNum && itemTemple.itemtype1 === 2) {
            //背包数据已满无法购买装备
            var popObj = { type: TipsEnum.TYPE_WARN, label: "背包已满" };
            PopTipsManager.showPopTips([popObj]);
            return;
        }
        DataCenter.buyItemState = "false@@" + Math.random();
        var cBuyItemMsg = new proto.c_BuyItem();
        cBuyItemMsg.ID = dataObj.ID;
        this.buyItemId = dataObj.ID;
        cBuyItemMsg.num = dataObj.num;
        this.buyItemNum = dataObj.num;
        this.entrance = dataObj.entrance;
        SocketManager.getInstance().sendProto(cBuyItemMsg);
    };
    return Module_mainUI;
}(Base_module));
__reflect(Module_mainUI.prototype, "Module_mainUI");
//# sourceMappingURL=Module_mainUI.js.map