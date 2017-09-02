var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Module_boss = (function (_super) {
    __extends(Module_boss, _super);
    function Module_boss() {
        var _this = _super.call(this) || this;
        _this.BOSS_PERSONAL = 1;
        _this.BOSS_WORLD = 2;
        _this.BOSS_ZHUANSHENG = 3;
        _this.TYPE_PERSONAL = "personal";
        _this.TYPE_WORLD = "world";
        return _this;
    }
    /**
     * 解析来自服务器的消息并处理
     * @param msg 模块对应的消息
     */
    Module_boss.prototype.receiveMsgFromSever = function (msg) {
        switch (msg.S) {
            case proto.MessageType.s_PersonalBoss:
                var person_msg = msg;
                if (person_msg.isWin) {
                    //战斗胜利
                    this.changePersonalBossData(this.curBossId);
                    this.sendMsgToModule([ModuleEnum.ACTION], MainNotify.EXTRACTIONLIST, { actionList: person_msg.actList });
                }
                else {
                    DataCenter.curSceneId = DataCenter.playerAttr[data.PlayerAttr.levelStageID];
                    GlobalFunc.changeSence(DataCenter.curSceneId, this);
                }
                break;
            case proto.MessageType.s_WorldBoss:
                var world_msg = msg;
                var layer = ViewController.getInstance().getContainer().layer_ui;
                if (world_msg.isWin) {
                    var len = world_msg.DropList.length;
                    var popArr = [];
                    for (var i = 0, item; i < len; i++) {
                        item = world_msg.DropList[i];
                        var obj = {};
                        var template = temple.TempleManager.select(item.TempleID);
                        obj.quality = template.itemQuality,
                            obj.num = GlobalFunc.searchAttrValue(data.ItemAttr.count, item.attrList);
                        obj.type = TipsEnum.TYPE_EQUIP;
                        obj.label = template.name;
                        if (template.itemtype1 === 1 || template.itemtype1 === 3) {
                            obj.imgSource = Config.path_goods + template.icon + ".png";
                        }
                        else {
                            obj = Config.path_equip + template.icon + ".png";
                        }
                        obj.itemName = template.name;
                        obj.color = DataCenter.bag.qualityColor[obj.quality];
                        obj.boxS = GlobalFunc.setBgData(obj.quality).boxS;
                        popArr.push(obj);
                    }
                    PopTipsManager.showPopTips(popArr);
                    var awardPanel = new Boss_award();
                    PopUpManager.addPopUp(awardPanel, true, awardPanel.skinName, layer, 0);
                    awardPanel.setData(popArr, this, ModuleEnum.BOSS, MainNotify.OPENPERSONALBOSSPANEL, { type: "world" });
                }
                else {
                    DataCenter.curSceneId = DataCenter.playerAttr[data.PlayerAttr.levelStageID];
                    GlobalFunc.changeSence(DataCenter.curSceneId, this);
                }
                break;
            case proto.MessageType.s_PersonalBossList:
                var bossListMsg = msg;
                this.bossList = bossListMsg.bossInfoList;
                break;
            case proto.MessageType.s_WorldBossList:
                var worldBossList = msg;
                this.worldBossData = [];
                this.dealWithBossList(worldBossList.bossInfoList, worldBossList.serverTime);
                break;
            case proto.MessageType.s_BossAck:
                var ack_msg = msg;
                if (ack_msg.isSuccess) {
                    DataCenter.curFuBen = this.curFuBen;
                    DataCenter.changeSenceState = true;
                    var bossTemple = temple.TempleManager.select(this.curBossId);
                    this.sendMsgToModule([ModuleEnum.MAP, ModuleEnum.ACTION], MainNotify.INITDATA);
                    this.sendMsgToModule([ModuleEnum.MAP], MainNotify.CHANGESCENE, { mapId: bossTemple.mapID });
                    this.removeView();
                }
                else {
                    PopTipsManager.showPopTips([{ type: TipsEnum.TYPE_WARN, label: ack_msg.errMsg }]);
                    return;
                }
                break;
            default:
                break;
        }
    };
    Module_boss.prototype.bindData = function () {
        this.personBossData = [];
        this.worldBossData = [];
    };
    //////////////////////////////数据绑定函数///////////////
    /**
     * 接收来自模块间的消息并分发
     * @param msg 消息列表
     */
    Module_boss.prototype.receiveMsgFromModule = function (msgType, dataRes) {
        if (dataRes === void 0) { dataRes = null; }
        switch (msgType) {
            case MainNotify.OPENPERSONALBOSSPANEL:
                this.createView(dataRes);
                break;
            default:
                break;
        }
    };
    //========================发送消息到服务器============================
    /**挑战个人boss */
    Module_boss.prototype.challengePersonalBoss = function (dataObj) {
        var msg = new proto.c_PersonalBoss();
        msg.bossTemplateId = dataObj.bossId;
        this.curFuBen = data.SenceType.GeRenBoss;
        this.curBossId = dataObj.bossId;
        SocketManager.getInstance().sendProto(msg);
    };
    /**挑战全名boss */
    Module_boss.prototype.challengeWorldBoss = function (dataObj) {
        var boss_msg = new proto.c_WorldBoss();
        this.curFuBen = data.SenceType.FuBen;
        boss_msg.bossTemplateId = dataObj.bossId;
        this.curBossId = dataObj.bossId;
        SocketManager.getInstance().sendProto(boss_msg);
    };
    /**获取世界boss列表 */
    Module_boss.prototype.getWorldBossData = function () {
        var msg = new proto.c_WorldBossList();
        SocketManager.getInstance().sendProto(msg);
    };
    //=====================界面相关操作======================
    Module_boss.prototype.createView = function (dataRes) {
        if (dataRes === void 0) { dataRes = null; }
        if (this.view && this.view.parent && this.view.parent.contains(this.view)) {
            this.removeView();
        }
        else {
            //打开背包
            this.view = new View_boss();
            _super.prototype.createView.call(this);
            if (dataRes === null || (dataRes && dataRes.type === this.TYPE_PERSONAL)) {
                this.view.changePersonalBossTap();
                this.personBossData = [];
                this.dealWithBossList(this.bossList);
            }
            else if (dataRes && dataRes.type === this.TYPE_WORLD) {
                this.view.curPanelType = dataRes.type;
                this.view.changeWorldBossTap();
                this.getWorldBossData();
            }
        }
    };
    /**
     * 关闭界面
     * @param closeState 关闭状态  0为被动关闭 1为主动关闭
     */
    Module_boss.prototype.removeView = function (closeState) {
        if (closeState === void 0) { closeState = 0; }
        //关闭背包
        if (this.view && this.view.parent && this.view.parent.contains(this.view)) {
            this.view.removeEvent();
            this.view.parent.removeChild(this.view);
            if (closeState) {
                this.sendMsgToModule([ModuleEnum.MAINUI], MainNotify.INITNAVFOCUS);
            }
        }
    };
    /**世界boss重生 */
    Module_boss.prototype.bossRebirth = function (dataObj) {
        this.changeWorldBossData(dataObj.bossId, true, 0);
    };
    /**设置个人boss数据 */
    Module_boss.prototype.setPersonalBossData = function () {
        if (this.view && this.view.parent && this.view.parent.contains(this.view)) {
            this.view.setPersonalBossData(this.personBossData);
        }
    };
    /**设置世界boss数据 */
    Module_boss.prototype.setWorldBossData = function () {
        if (this.view && this.view.parent && this.view.parent.contains(this.view)) {
            this.view.setWorldBossData(this.worldBossData);
        }
    };
    /**修改个人boss数据 */
    Module_boss.prototype.changePersonalBossData = function (id) {
        for (var i = 0, len = this.bossList.length; i < len; i++) {
            if (this.bossList[i].bossTemplateId === id) {
                // this.bossList[i].challenged = true;
                this.bossList[i].isOpen = false;
                break;
            }
        }
    };
    /**修改世界boss数据 */
    Module_boss.prototype.changeWorldBossData = function (id, isOpen, time) {
        var bossTemple = temple.TempleManager.select(id);
        for (var i = 0, len = this.worldBossData.length; i < len; i++) {
            if (this.worldBossData[i].bossTemplateId === id) {
                // this.bossList[i].challenged = true;
                this.worldBossData[i].time = time;
                this.worldBossData[i].isOpen = isOpen;
                break;
            }
        }
        this.sortBossSequence(this.worldBossData);
    };
    /**个人boss排序 */
    Module_boss.prototype.sortBossSequence = function (bossData) {
        var openGather = [];
        var notOpenGather = [];
        var challengeGather = [];
        var notChallengeGather = [];
        for (var i = 0, len = bossData.length; i < len; i++) {
            if (bossData[i].challenged) {
                openGather.push(bossData[i]);
            }
            else {
                notOpenGather.push(bossData[i]);
            }
        }
        for (var j = 0, len2 = openGather.length; j < len2; j++) {
            if (openGather[j].isOpen) {
                notChallengeGather.push(openGather[j]);
            }
            else {
                challengeGather.push(openGather[j]);
            }
        }
        challengeGather = GlobalFunc.sortRule(GlobalFunc.NORMALIZE, "bossLev", challengeGather);
        openGather = notChallengeGather.concat(challengeGather);
        bossData = openGather.concat(notOpenGather);
        if (this.view.curPanelType === this.TYPE_WORLD) {
            this.worldBossData = bossData;
            this.setWorldBossData();
        }
        else {
            this.personBossData = bossData;
            this.setPersonalBossData();
        }
    };
    //===================数据解析处理========================
    Module_boss.prototype.dealWithBossList = function (bossList, serverTime) {
        if (serverTime === void 0) { serverTime = 0; }
        for (var i = 0, len = bossList.length, item; i < len; i++) {
            item = bossList[i];
            var obj = {};
            obj.bossId = item.bossTemplateId;
            var bossTemple = temple.TempleManager.select(obj.bossId);
            var unitTemple = temple.TempleManager.select(bossTemple.mosterId);
            obj.bossIcon = Config.path_monHead + bossTemple.bossIcon + ".png";
            obj.bossName = unitTemple.name;
            obj.dropIcon = ["", "", ""];
            obj.count = item.isOpen ? 1 : 0;
            obj.isOpen = item.isOpen;
            obj.playerCount = item.playerCount;
            obj.time = item.expireTime - serverTime;
            var rebornId = DataCenter.playerAttr[data.PlayerAttr.rebornID];
            var rebornTemple = temple.TempleManager.select(rebornId);
            var lev = DataCenter.playerAttr[data.PlayerAttr.levID];
            if (bossTemple.bossReborn > 0) {
                obj.bossLev = bossTemple.bossReborn + bossTemple.bossBeginlevel;
                if (rebornTemple.RELev < bossTemple.bossReborn) {
                    obj.challenged = false;
                    obj.condition = bossTemple.bossReborn + "转开启";
                }
                else {
                    obj.challenged = true;
                }
                new Date().setSeconds;
            }
            else {
                obj.bossLev = bossTemple.bossBeginlevel;
                if (lev < bossTemple.bossBeginlevel) {
                    obj.challenged = false;
                    obj.condition = bossTemple.bossBeginlevel + "级开启";
                }
                else {
                    obj.challenged = true;
                }
            }
            if (bossTemple.bossType === this.BOSS_PERSONAL) {
                obj.state = "personal";
                this.personBossData.push(obj);
            }
            else if (bossTemple.bossType === this.BOSS_WORLD) {
                obj.state = "world";
                this.worldBossData.push(obj);
            }
        }
        if (this.view.curPanelType === this.TYPE_WORLD) {
            this.sortBossSequence(this.worldBossData);
        }
        else {
            this.sortBossSequence(this.personBossData);
        }
    };
    return Module_boss;
}(Base_module));
__reflect(Module_boss.prototype, "Module_boss");
//# sourceMappingURL=Module_boss.js.map