var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Module_data = (function (_super) {
    __extends(Module_data, _super);
    function Module_data() {
        return _super.call(this) || this;
    }
    /**
     * 解析来自服务器的消息并处理
     * @param msg 模块对应的消息
     */
    Module_data.prototype.receiveMsgFromSever = function (msg) {
        switch (msg.S) {
            case proto.MessageType.s_Map_Player:
                var msg1 = msg;
                this.dealWithInitData(msg1);
                break;
            case proto.MessageType.s_Login:
                var curMsg = msg;
                this.toDealWithLoginData(curMsg);
                break;
            case proto.MessageType.s_RoleAttrChange:
                var attrMsg = msg;
                this.dealWithAttr(attrMsg);
                break;
            case proto.MessageType.s_Kickout:
                var kickMsg = msg;
                alert(kickMsg.MsgReason);
                _super.prototype.clearView.call(this);
                break;
            case proto.MessageType.s_CreateRole:
                var create_msg = msg;
                if (create_msg.roleInfo) {
                    this.crateRoleInfo(create_msg.roleInfo, true);
                }
                break;
            default:
                break;
        }
    };
    /**
     * 处理初始化数据
     */
    Module_data.prototype.dealWithInitData = function (initData) {
        DataCenter.roleAttrsArr = new Dictionary("DataCenter.roleAttrsArr");
        DataCenter.playerName = initData.playerName;
        DataCenter.playerId = initData.PlayerInstId;
        DataCenter.playerAttr = initData.playerAttr;
        for (var i = 0, roleItem; i < initData.client_roleinfo.length; i++) {
            roleItem = initData.client_roleinfo[i];
            this.crateRoleInfo(roleItem);
        }
        // this.calculHPandMP();
        // DataCenter.role1Attr=initData.client_roleinfo[0].roleAttr;
        // if(initData.client_roleinfo[1]){
        // 	DataCenter.role2Attr=initData.client_roleinfo[1].roleAttr;
        // }
        // if(initData.client_roleinfo[2]){
        // 	DataCenter.role3Attr=initData.client_roleinfo[2].roleAttr;
        // }
        // DataCenter.time_stamps=initData.timeSpan-egret.getTimer();
        var msg = new proto.c_CreateNewSence();
        msg.levelStageID = DataCenter.playerAttr[data.PlayerAttr.levelStageID];
        DataCenter.curSceneId = msg.levelStageID;
        SocketManager.getInstance().sendProto(msg);
    };
    Module_data.prototype.crateRoleInfo = function (roleItem, gameCreate) {
        if (gameCreate === void 0) { gameCreate = false; }
        var any = {};
        any.job = roleItem.job;
        any.sex = roleItem.roleAttr[data.RoleAttr.sex];
        any.insId = roleItem.instanceId;
        any.initTempId = roleItem.templateId;
        if (!DataCenter.roleList) {
            DataCenter.roleList = [];
        }
        DataCenter.roleList.push(any);
        DataCenter["role" + roleItem.job + "Info"] = roleItem;
        DataCenter["role" + roleItem.job + "InfoVO_out"] = this.setRoleInfoVO(roleItem);
        var roleEquip = {};
        for (var k = 0; k < roleItem.equips.length; k++) {
            var item = roleItem.equips[k];
            var template = temple.TempleManager.select(item.TempleID);
            var equipPos = GlobalFunc.searchAttrValue(data.ItemAttr.equipPos, item.attrList);
            if (equipPos === data.EquipPos.fashion_wings) {
                DataCenter.wingFashionState = true;
                DataCenter.curWingFashionId = item.TempleID;
            }
            else if (equipPos === data.EquipPos.fashion_weapon) {
                DataCenter.weaponFashionState = true;
                DataCenter.weaponFashionId = item.TempleID;
            }
            else if (equipPos === data.EquipPos.fashion_role) {
                DataCenter.roleFashionState = true;
                DataCenter.curRoleFahsionId = item.TempleID;
            }
            else if (equipPos == data.EquipPos.body) {
                roleEquip.clothId = item.TempleID;
            }
            else if (equipPos == data.EquipPos.weapon) {
                roleEquip.weaponId = item.TempleID;
            }
        }
        var initTemp = temple.TempleManager.select(any.initTempId);
        if (!roleEquip.clothId) {
            roleEquip.initClothId = any.sex == 1 ? initTemp.maleResID : initTemp.femaleResID;
        }
        if (!roleEquip.weaponId) {
            roleEquip.initWeaponId = any.sex == 1 ? initTemp.maleWeaponID : initTemp.femaleWeaponID;
        }
        DataCenter.moveSpeed = initTemp.moveTime;
        DataCenter.roleEquip.add(any.job + "", roleEquip);
        DataCenter.RoleInFoVo[any.job] = roleItem;
        DataCenter.roleAttrsArr.add(any.job, roleItem.roleAttr);
        DataCenter["role" + roleItem.job + "Attr"] = roleItem.roleAttr;
        if (!DataCenter.forgingData) {
            DataCenter.forgingData = new Dictionary("DataCenter.forgingData");
        }
        this.calculHPandMP();
        DataCenter.forgingData.add(any.job + "", GlobalFunc.setForgingData(roleItem.strengthens));
        this.dealWithStrengthenPos(any.job, roleItem.strengthens);
        GlobalFunc.creteRolePowerObj(roleItem.equips, roleItem.job);
        if (gameCreate) {
            //在游戏中创建角色
            this.sendMsgToModule([ModuleEnum.MAP], MainNotify.CREATENEWROLE);
            this.sendMsgToModule([ModuleEnum.CREATEROLE], MainNotify.CLOSECRETEROLE);
            Global.dispatchEvent(MainNotify.JOBCHAGNE, { job: roleItem.job, add: true });
        }
    };
    Module_data.prototype.equipForginType = function (type) {
        if (type === data.StrengthenType.ST_QH || type === data.StrengthenType.ST_BS || type === data.StrengthenType.ST_ZL || type === data.StrengthenType.ST_JL) {
            return true;
        }
        return false;
    };
    /**处理强化装备位置 */
    Module_data.prototype.dealWithStrengthenPos = function (job, strengthens) {
        var arr2 = [];
        for (var j = 0; j < strengthens.length; j++) {
            if (this.equipForginType(strengthens[j].type)) {
                arr2.push(strengthens[j]);
            }
        }
        var arr = GlobalFunc.sortRule(GlobalFunc.NORMALIZE, "type", GlobalFunc.deepCopy(arr2));
        if (!DataCenter.forgingUIPos) {
            DataCenter.forgingUIPos = new Dictionary("DataCenter.forgingUIPos");
        }
        if (!DataCenter.forgingPos) {
            DataCenter.forgingPos = new Dictionary("DataCenter.forgingPos");
        }
        if (!DataCenter.forginPower) {
            DataCenter.forginPower = new Dictionary("DataCenter.forginPower");
        }
        var len = arr.length;
        var lightPos = [];
        var powerArr = [];
        var power = 0;
        for (var i = 0; i < len; i++) {
            var id = arr[i].strengthId;
            var template = temple.TempleManager.select(id);
            power += template.FightValue;
            if (i % 8 === 0) {
                lightPos.push(template.pos);
            }
            if ((i + 1) % 8 === 0) {
                powerArr.push(power);
                power = 0;
            }
        }
        DataCenter.forgingUIPos.add(job + "", this.setForgingPos(lightPos));
        DataCenter.forgingPos.add(job + "", lightPos);
        DataCenter.forginPower.add(job + "", powerArr);
    };
    Module_data.prototype.setForgingPos = function (arr) {
        var arr1 = [];
        for (var i = 0; i < arr.length; i++) {
            switch (arr[i]) {
                case data.EquipPos.weapon:
                    arr1.push(0);
                    break;
                case data.EquipPos.head:
                    arr1.push(1);
                    break;
                case data.EquipPos.body:
                    arr1.push(2);
                    break;
                case data.EquipPos.neck:
                    arr1.push(3);
                    break;
                case data.EquipPos.left_bracelet:
                    arr1.push(4);
                    break;
                case data.EquipPos.right_bracelet:
                    arr1.push(5);
                    break;
                case data.EquipPos.left_ring:
                    arr1.push(6);
                    break;
                case data.EquipPos.right_ring:
                    arr1.push(7);
                    break;
            }
        }
        return arr1;
    };
    Module_data.prototype.sortArrByIndex = function (any1, any2) {
        var a = any1.index;
        var b = any2.index;
        if (a > b) {
            return 1;
        }
        else if (a < b) {
            return -1;
        }
        else {
            return 0;
        }
    };
    Module_data.prototype.setRoleInfoVO = function (roleInfo) {
        var roleVO = new RoleInfoVo();
        // roleVO.action=roleInfo.roleAttr.state;
        roleVO.col = roleInfo.roleAttr[data.RoleAttr.x];
        roleVO.row = roleInfo.roleAttr[data.RoleAttr.y];
        roleVO.job = roleInfo.roleAttr[data.RoleAttr.job];
        roleVO.look = 5;
        // roleVO.mapid=roleInfo.roleAttr[data.RoleAttr.InstanceId] + "";
        roleVO.sex = roleInfo.roleAttr[data.RoleAttr.sex];
        // roleVO.uid=roleInfo.roleAttr.uid;
        // roleVO.clothId_in=roleInfo.roleAttr[data.RoleAttr.clothes] + "";
        // roleVO.weaponId_in=roleInfo.roleAttr[data.RoleAttr.weaponID] + "";
        roleVO.wingsId_in = roleInfo.roleAttr[data.RoleAttr.wingsID];
        // var c=temple.TempleManager.select(roleInfo.roleAttr[data.RoleAttr.clothes]);
        // roleVO.clothId_out=roleVO.sex==1?c["maleResId"]:c["femaleResId"];
        // var d=temple.TempleManager.select(roleInfo.roleAttr[data.RoleAttr.weaponID]);
        // roleVO.weaponId_out=roleVO.sex==1?d["maleResId"]:d["femaleResId"];
        var wingsId = roleInfo.roleAttr[data.RoleAttr.wingsID];
        var e = temple.TempleManager.select(wingsId);
        if (e) {
            roleVO.wingsId_out = e.maleResId;
        }
        return roleVO;
    };
    /**
     * 处理登录数据
     */
    Module_data.prototype.toDealWithLoginData = function (curMsg) {
        DataCenter.baseInfo.loginState = curMsg.state;
        switch (curMsg.state) {
            case 0:
            case 1:
                alert(curMsg.mess);
            case 2:
                //无创建角色
                this.sendMsgToModule([ModuleEnum.SELECTROLE], MainNotify.OPENSELECTROLEPANEL);
                break;
        }
    };
    /**
     * 处理属性改变
     */
    Module_data.prototype.dealWithAttr = function (attrMsg) {
        switch (attrMsg.Job) {
            case 0:
                this.setAttrValue(attrMsg.AttrChangeList, attrMsg.Job);
                break;
            case 1:
            case 2:
            case 3:
                this.setAttrValue(attrMsg.AttrChangeList, attrMsg.Job);
                this.calculHPandMP();
                break;
        }
    };
    Module_data.prototype.setAttrValue = function (changeList, type) {
        for (var i = 0, len = changeList.length, item; i < len; i++) {
            item = changeList[i];
            if (!type) {
                DataCenter.playerAttr[item.attrID] = item.myvalue;
            }
            else {
                DataCenter.roleAttrsArr.get(type + "")[item.attrID] = item.myvalue;
            }
        }
    };
    /**计算最大血量法量值 */
    Module_data.prototype.calculHPandMP = function () {
        var hp;
        var mp;
        if (!DataCenter.roleList) {
            console.log("人物列表为空");
        }
        for (var i, len = DataCenter.roleList.length, item; i < len; i++) {
            item = DataCenter.roleAttrsArr.get(i + "");
            hp += item[data.RoleAttr.MHP];
            mp += item[data.RoleAttr.MMP];
        }
        DataCenter.playerInfo.tolMp = mp;
        DataCenter.playerInfo.tolHp = hp;
    };
    return Module_data;
}(Base_module));
__reflect(Module_data.prototype, "Module_data");
//# sourceMappingURL=Module_data.js.map