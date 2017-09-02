var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Module_rank = (function (_super) {
    __extends(Module_rank, _super);
    function Module_rank() {
        return _super.call(this) || this;
    }
    Module_rank.prototype.bindData = function () {
        Module_rank.rankData = [];
        eui.Binding.bindHandler(Module_rank, ["rankData"], this.rankDataChange, this);
    };
    Module_rank.prototype.rankDataChange = function (value) {
        if (value && value.length && this.view && this.view.parent && this.view.parent.contains(this.view)) {
            this.view.refreshRankData(value);
        }
    };
    /**
     * 接收来自模块间的消息并分发
     * @param msg 消息列表
     */
    Module_rank.prototype.receiveMsgFromModule = function (msgType, dataRes) {
        if (dataRes === void 0) { dataRes = null; }
        switch (msgType) {
            case MainNotify.OPENRANKPANEL:
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
    Module_rank.prototype.receiveMsgFromSever = function (msg) {
        switch (msg.S) {
            case proto.MessageType.s_GetRankInfo:
                var roleDetail_msg = msg;
                if (roleDetail_msg.isSuccess) {
                    this.showRankPeopleData(roleDetail_msg.rankInfo.roleInfoList);
                }
                else {
                    var obj = { type: TipsEnum.TYPE_WARN, label: roleDetail_msg.errMsg };
                    PopTipsManager.showPopTips(obj);
                }
                break;
            case proto.MessageType.s_RankChange:
                var changeMsg = msg;
                this.dealWithRankChangeData(changeMsg);
                break;
            case proto.MessageType.s_GetRankList:
                var rankList_msg = msg;
                this.dealWithRankData(rankList_msg);
                break;
            case proto.MessageType.s_RankWorship:
                var shipList_msg = msg;
                DataCenter.shipList = shipList_msg.isWorshipList;
                break;
            case proto.MessageType.s_Worship:
                var ship_msg = msg;
                if (!ship_msg.isSuccess) {
                    var obj = { type: TipsEnum.TYPE_WARN, label: ship_msg.errMsg };
                    PopTipsManager.showPopTips([obj]);
                }
                else {
                    if (DataCenter.shipList.length) {
                        var count = -1;
                        for (var key in DataCenter.rankGather) {
                            count++;
                            if (parseInt(key) === this.shipIndex) {
                                break;
                            }
                        }
                        DataCenter.shipList[count] = true;
                        this.view.refreshMoBaiBtnState("disabled");
                    }
                }
                break;
            default:
                break;
        }
    };
    Module_rank.prototype.dealWithRankData = function (rankList) {
        var order = rankList.order;
        var rankData = rankList.RankInfoList;
        var arr = [];
        for (var i = 0, len = rankData.length, item; i < len; i++) {
            item = rankData[i];
            arr.push(this.createSingelRoleInfo(item, i, order, "get"));
        }
        DataCenter.rankGather[order] = GlobalFunc.deepCopy(arr);
        GlobalFunc.sortByKey(DataCenter.rankGather);
    };
    Module_rank.prototype.dealWithRankChangeData = function (changeData) {
        var curRankData = DataCenter.rankGather[changeData.order];
        var pid = changeData.playerId;
        var curIndex = -1;
        var obj = this.createSingelRoleInfo(changeData, changeData.index, changeData.order, "change");
        for (var i = 0; i < curRankData.length; i++) {
            if (pid === curRankData[i].playerId) {
                curIndex = i;
                break;
            }
        }
        curRankData.splice(changeData.index, 0, obj);
        if (curIndex === -1) {
            //当前玩家未在榜内 移除最后一名的玩家
            curRankData.pop();
        }
        else {
            //在榜内  移除源玩家数据
            curRankData.splice(curIndex + 1, 1);
        }
        for (var j = 0; j < curRankData.length; j++) {
            curRankData[j]["order"] = j + 1;
        }
        if (this.openState && this.curRankType === changeData.order) {
            //如果在当前排行榜 刷新数据
            this.setRankData(this.curRankType);
        }
    };
    /**创建排行榜单个人物信息 */
    Module_rank.prototype.createSingelRoleInfo = function (item, index, order, type) {
        var obj = {};
        var baseObj = this.createStaticBaseInfo(order);
        var searchGather = [data.PlayerAttr.FightValue, data.PlayerAttr.rebornID, data.PlayerAttr.levID, data.PlayerAttr.VIP];
        var searchData = GlobalFunc.searchMoreAttrValue(searchGather, item.playerAttrList);
        obj.uName = item.playerName;
        obj.playerId = item.playerId;
        obj.order = index + 1;
        if (obj.playerId === DataCenter.playerId) {
            DataCenter.curPlayerRank[order] = obj.order;
        }
        obj.rankType = order;
        obj.roleFightValueList = [];
        obj.uFightValue = searchData[data.PlayerAttr.FightValue];
        obj.roleInfo = item.roleInfoList;
        this.calculChangeValue(obj, type, item);
        var rebornTemple = temple.TempleManager.select(searchData[data.PlayerAttr.rebornID]);
        var rebornLev = rebornTemple ? rebornTemple.RELev : 0;
        var playerLev = searchData[data.PlayerAttr.levID];
        var str = rebornLev ? rebornLev + "转" + playerLev + "级" : playerLev + "级";
        obj.uLev = str;
        obj.designation = ""; //称号
        var vipNum = searchData[data.PlayerAttr.VIP];
        obj.vipNum = vipNum ? vipNum : 0;
        obj.rankLabel = baseObj.rankLabel;
        obj.state = baseObj.listItemSkin;
        if (!index) {
            obj.firstState = baseObj.firstRankSkin;
        }
        return obj;
    };
    Module_rank.prototype.getRankData = function (dataObj) {
        this.curRankType = dataObj.type;
        this.setRankData(this.curRankType);
    };
    Module_rank.prototype.showRankPeopleData = function (clientRoleInfo) {
        this.sendMsgToModule([ModuleEnum.ROLEINFO], MainNotify.OPENROLEPANEL, { type: 1, roleInfo: clientRoleInfo });
    };
    Module_rank.prototype.createView = function () {
        this.view = new View_rank();
        _super.prototype.createView.call(this);
        // this.view.refreshRoleMode(Config.path_man_in + "50012_a_0",Config.path_weapon_in + "51021_a_0");
        // this.view.refreshWingMode(Config.path_wing_in + "70000_a_0");
        this.setRankData(1);
        this.curRankType = 1;
        this.openState = true;
        this.worShipExpWatcher = eui.Binding.bindProperty(DataCenter, ["worShipExp"], this.view, "worShipExp");
        this.worShipMoneyWatcher = eui.Binding.bindProperty(DataCenter, ["worShipMoney"], this.view, "worShipMoney");
    };
    Module_rank.prototype.setRankData = function (value) {
        this.refreshRoleModel(value);
        Module_rank.rankData = [];
        var curRank = DataCenter.curPlayerRank[value];
        var str = "";
        if (curRank) {
            str = curRank + "";
        }
        else {
            str = "未入榜";
        }
        this.view.refreshCurRank(str);
        Module_rank.rankData = GlobalFunc.deepCopy(DataCenter.rankGather[value]);
    };
    Module_rank.prototype.refreshRoleModel = function (value) {
        var clientRoleInfo = DataCenter.rankGather[value][0].roleInfo;
        var defaultRole;
        if (value === 6 || value === 7 || value === 8) {
            var job = DataCenter.rankData[value][0].profess;
            for (var j = 0; j < clientRoleInfo.length; j++) {
                if (clientRoleInfo[j].job === job) {
                    defaultRole = clientRoleInfo[j];
                    break;
                }
            }
        }
        else {
            defaultRole = clientRoleInfo[0];
        }
        var equips = defaultRole.equips;
        var rolePath;
        var weaponPath;
        var sex = defaultRole.roleAttr[data.RoleAttr.sex];
        if (equips.length) {
            for (var i = 0; i < equips.length; i++) {
                var equipPos = GlobalFunc.searchAttrValue(data.ItemAttr.equipPos, equips[i].attrList);
                var itemTemple = temple.TempleManager.select(equips[i].TempleID);
                // var sex:number = itemTemple.SEX;
                if (equipPos === data.EquipPos.weapon) {
                    weaponPath = (sex === 1) ? Config.path_weapon_in + itemTemple.maleInIcon + "_a_0" : Config.path_weapon_in + itemTemple.femaleInIcon + "_a_0";
                }
                if (equipPos === data.EquipPos.body) {
                    rolePath = (sex === 1) ? Config.path_role_in + itemTemple.maleInIcon + "_a_0" : Config.path_role_in + itemTemple.femaleInIcon + "_a_0";
                }
            }
        }
        var obj = DataCenter.jobInitData[defaultRole.job];
        if (!weaponPath) {
            var weaponId = sex === 1 ? obj.maleWeaponID : obj.femaleWeaponID;
            weaponPath = Config.path_weapon_in + weaponId + "_a_0";
        }
        if (!rolePath) {
            var clothId = sex === 1 ? obj.maleInIcon : obj.femaleInIcon;
            rolePath = Config.path_role_in + clothId + "_a_0";
        }
        this.view.refreshRoleMode(rolePath, weaponPath);
    };
    Module_rank.prototype.calculChangeValue = function (obj, type, item) {
        var rankType = DataCenter.rankData[obj.rankType][0].rankType;
        var job = DataCenter.rankData[obj.rankType][0].profess;
        //当前为排行榜数据获取
        switch (job) {
            case data.JobAttr.Player:
                obj.uFightValue = GlobalFunc.searchAttrValue(data.PlayerAttr.FightValue, item.playerAttrList);
                break;
            case data.JobAttr.JS:
            case data.JobAttr.DS:
            case data.JobAttr.FS:
                if (type === "get") {
                    var clientRoleInfo = obj.roleInfo;
                    for (var i = 0; i < clientRoleInfo.length; i++) {
                        if (clientRoleInfo[i].job === job) {
                            obj.uFightValue = clientRoleInfo[i].roleAttr[data.RoleAttr.FightValue];
                            break;
                        }
                    }
                }
                else {
                    for (var j = 0; j < item.RoleChangeList.length; j++) {
                        if (item.RoleChangeList.Job === job) {
                            var attrList = item.RoleChangeList[j].AttrChangeList;
                            obj.uFightValue = GlobalFunc.searchAttrValue(data.RoleAttr.FightValue, attrList);
                            break;
                        }
                    }
                }
                break;
        }
    };
    Module_rank.prototype.removeView = function () {
        //关闭角色面板
        this.view.remove();
        this.view.parent.removeChild(this.view);
        this.openState = false;
        if (this.worShipExpWatcher) {
            this.worShipExpWatcher.unwatch();
        }
        if (this.worShipMoneyWatcher) {
            this.worShipMoneyWatcher.unwatch();
        }
    };
    //--------------------------向服务器获取消息----------------------
    Module_rank.prototype.getRankInfo = function (playerId) {
        var rankInfoMsg = new proto.c_GetRankInfo();
        rankInfoMsg.playerId = playerId;
        SocketManager.getInstance().sendProto(rankInfoMsg);
    };
    Module_rank.prototype.worShip = function (order) {
        var ship_msg = new proto.c_Worship();
        ship_msg.order = order;
        this.shipIndex = order;
        SocketManager.getInstance().sendProto(ship_msg);
    };
    //----------------------------------------------------------------
    /**
     * 生成排行榜静态信息
     * param--------
     * listItemSkil item皮肤
     * rankLabel 比较值
     */
    Module_rank.prototype.createStaticBaseInfo = function (order) {
        var obj = {};
        obj.firstRankSkin = "rank_first";
        obj.job = data.JobAttr.Player;
        switch (order) {
            case 2:
                //等级
                obj.listItemSkin = "lev_rank";
                obj.rankLabel = "";
                obj.firstRankSkin = "rank_first2";
                break;
            case 6:
                //战士
                obj.listItemSkin = "other_rank";
                obj.rankLabel = "战士战力:";
                obj.job = data.JobAttr.JS;
                break;
            case 7:
                //法师
                obj.listItemSkin = "other_rank";
                obj.rankLabel = "法师战力:";
                obj.obj = data.JobAttr.FS;
                break;
            case 8:
                //道士
                obj.listItemSkin = "other_rank";
                obj.rankLabel = "道士战力:";
                obj.job = data.JobAttr.DS;
                break;
            case 1:
                //战力
                obj.listItemSkin = "other_rank";
                obj.rankLabel = "战斗力:";
                break;
        }
        return obj;
    };
    return Module_rank;
}(Base_module));
__reflect(Module_rank.prototype, "Module_rank");
//# sourceMappingURL=Module_rank.js.map