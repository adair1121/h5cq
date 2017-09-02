var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var View_map_unit = (function (_super) {
    __extends(View_map_unit, _super);
    function View_map_unit() {
        var _this = _super.call(this) || this;
        _this.unitObj = [];
        _this.mapNum = 0;
        _this.curBossHp = 0;
        _this.labelGather = [];
        _this.unitIdDict = new Dictionary("unitIdDict");
        _this.dropCon = new egret.Sprite();
        _this.addChild(_this.dropCon);
        // this.monCon=new egret.Sprite();
        // this.addChild(this.monCon);
        _this.mapNum = _this.numChildren;
        return _this;
        // Global.addEventListener("addMoveEffect",this.addMoveEffect,this);
    }
    // private friendUnit:any[] = [];
    // private isCZSkill:boolean=false;
    // private CZSkillTime:number;
    // private dropArr:Array<proto.Client_DropInfo>
    /**
     * 创建人物角色
     * @param roleId 角色id
     * @param skinId 皮肤id
     * @param _x 站位x
     * @param _y 站位y
     * @param direction 朝向
     */
    View_map_unit.prototype.createPerson = function (roleInfo, isFirst) {
        var _this = this;
        var role;
        var roleAttr = roleInfo.roleAttr;
        if (this.unitIdDict.hasKey(roleInfo.instanceId + "")) {
            role = this.unitIdDict.get(roleInfo.instanceId + "");
        }
        else {
            role = new MapUnit_Role();
            this.addChild(role);
            role.setRoleInfo(roleInfo.job, roleInfo.roleAttr, DataCenter.roleEquip.get(roleInfo.job + ""));
            this.unitIdDict.add(roleInfo.instanceId + "", role);
            if (isFirst) {
                Config.personId = roleInfo.instanceId + "";
            }
            eui.Binding.bindHandler(roleAttr, [data.RoleAttr.x + ""], function (value) {
                if (value) {
                    var p = PosUtils.gridToPixel(roleAttr[data.RoleAttr.x], roleAttr[data.RoleAttr.y]);
                    role.gx = roleAttr[data.RoleAttr.x];
                    role.x = p.x;
                }
            }, this);
            eui.Binding.bindHandler(roleAttr, [data.RoleAttr.y + ""], function (value) {
                if (value) {
                    var p = PosUtils.gridToPixel(roleAttr[data.RoleAttr.x], roleAttr[data.RoleAttr.y]);
                    role.gy = roleAttr[data.RoleAttr.y];
                    role.y = p.y;
                    for (var i = 0; i < _this.unitObj.length; i++) {
                        if (_this.unitObj[i][roleInfo.instanceId]) {
                            _this.unitObj[i].gy = role.gy;
                        }
                    }
                }
            }, this);
            var obj = {};
            obj[roleInfo.instanceId] = role;
            obj.gy = role.gy;
            role.insId = roleInfo.instanceId;
            this.unitObj.push(obj);
        }
        // var p=PosUtils.gridToPixel(roleAttr[data.RoleAttr.x],roleAttr[data.RoleAttr.y]);
        // role.gx=roleAttr[data.RoleAttr.x];
        // role.gy=roleAttr[data.RoleAttr.y];
        // role.x=p.x;
        // role.y=p.y;
    };
    View_map_unit.prototype.clear = function () {
        this.dropCon.removeChildren();
        this.unitObj = [];
        for (var key in this.unitIdDict.dict) {
            var element = this.unitIdDict.dict[key];
            if (element && element.parent && element.parent.contains(element)) {
                element.parent.removeChild(element);
            }
        }
        for (var i = 0; i < this.labelGather.length; i++) {
            this.labelGather[i].parent.removeChild(this.labelGather[i]);
        }
        this.labelGather = [];
        // this.removeChildren();
        this.unitIdDict.clear();
    };
    /**单位移动 */
    View_map_unit.prototype.move = function (insId, action, time, stand, last) {
        if (time === void 0) { time = -1; }
        if (stand === void 0) { stand = false; }
        if (last === void 0) { last = false; }
        var unit = this.unitIdDict.get(insId + "");
        var curUnitObj;
        for (var i = 0; i < this.unitObj.length; i++) {
            if (this.unitObj[i][insId]) {
                curUnitObj = this.unitObj[i];
                break;
            }
        }
        if (time < 0) {
            if (unit instanceof MapUnit_Role) {
                time = DataCenter.moveSpeed;
            }
            else if (unit instanceof MapUnit_Monster) {
                time = unit.moveStep;
            }
        }
        if (unit) {
            // if(unit instanceof MapUnit_Role && stand){
            // 	console.log("人物当前位置"+unit.gx,unit.gy);
            // 	console.log("人物当前移动步长："+time);
            // 	console.log("人物action数据移动下一个位置："+action.ex,action.ey);
            // }
            // var curTime:number = 0;
            // if(time === DataCenter.moveSpeed || (unit.moveStep && time === unit.moveStep)){
            // 	var gridXNum:number = Math.abs(action.ex - unit.gx);
            // 	var gridYNum:number = Math.abs(action.ey - unit.gy);
            // 	console.log(gridXNum,gridYNum)
            // 	var diffGridNum:number = 0;
            // 	if(gridXNum && gridYNum){
            // 		diffGridNum = Math.max(gridXNum,gridYNum);
            // 	}else if(gridXNum && !gridYNum){
            // 		diffGridNum = gridXNum;
            // 	}else if(!gridXNum && gridYNum){
            // 		diffGridNum = gridYNum;
            // 	}else{
            // 		console.log("获取到的野蛮冲撞的xy坐标为0");
            // 	}
            // 	curTime = diffGridNum*time;
            // }else{
            // 	curTime = time;
            // }
            this.dealWithIndex();
            if ((action.ex === unit.gx) && (action.ey === unit.gy)) {
                unit.changeStand();
                return;
            }
            curUnitObj[insId].gx = action.ex;
            curUnitObj[insId].gy = action.ey;
            curUnitObj.gy = action.ey;
            var p = PosUtils.gridToPixel(action.ex, action.ey);
            if (unit instanceof MapUnit_Monster && stand) {
                egret.Tween.removeTweens(unit);
            }
            egret.Tween.get(unit).to({ x: p.x, y: p.y }, time).call(function () {
                if (stand) {
                    unit.changeStand();
                }
                // if(unit instanceof MapUnit_Monster){
                // 	unit.changeStand();
                // }
                // for(var n:number = 0;n<this.friendUnit.length;n++){
                // 	if(DataCenter.endAction.hasKey(this.friendUnit[n].insId)){
                // 		var boo:boolean = DataCenter.endAction.get(this.friendUnit[n].insId);
                // 		if(boo){
                // 			unit.changeStand();
                // 		}
                // 	}
                // }
            }, this);
            var state = action.state == 1 ? MapUnitState.RUN : MapUnitState.STAND;
            unit.move(action.look, state);
            if (last) {
                DataCenter.curFightState = true;
            }
            else {
                DataCenter.curExecActionState = true;
            }
        }
        // ActionUtil.getInstance().actionExecuting=false;
    };
    /**处理层级关系 */
    View_map_unit.prototype.dealWithIndex = function () {
        var arr = GlobalFunc.sortRule(GlobalFunc.NORMALIZE, "gy", this.unitObj);
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            for (var key in arr[i]) {
                var unit = arr[i][key];
                if (unit && unit.parent && unit.parent.contains(unit)) {
                    this.setChildIndex(unit, this.mapNum + i);
                }
            }
        }
    };
    /**创建单位 */
    View_map_unit.prototype.createUnit = function (action, type, last) {
        if (type === void 0) { type = ""; }
        if (last === void 0) { last = false; }
        switch (action.type) {
            case 0:
                //怪物
                for (var i = 0; i < action.entityInfoList.length; i++) {
                    var monster = action.entityInfoList[i];
                    var curUnit;
                    if (this.unitIdDict.hasKey(monster.InstanceId)) {
                        break;
                    }
                    if (monster.job == 4) {
                        //怪物
                        var unit = new MapUnit_Monster();
                        unit.setMonsterInfo(monster.templateId);
                        this.addChild(unit);
                        var template = temple.TempleManager.select(monster.templateId);
                        unit.moveStep = template.moveTime;
                        curUnit = unit;
                        if (DataCenter.curFuBen === data.SenceType.GeRenBoss || DataCenter.curFuBen === data.SenceType.FuBen) {
                            this.curBossHp = monster.attrList[data.RoleAttr.HP];
                            Global.dispatchEvent(MainNotify.BOSSTOTALHP, { MHP: monster.attrList[data.RoleAttr.MHP] });
                            Global.dispatchEvent(MainNotify.BOSSCURHP, { curHp: this.curBossHp });
                        }
                    }
                    else {
                        //角色
                        var roleUnit = new MapUnit_Role();
                        this.addChild(roleUnit);
                        var sex = monster.attrList[data.RoleAttr.sex];
                        var obj = DataCenter.jobInitData[monster.job];
                        var initClothId = sex === 1 ? obj.maleResID : obj.femaleResID;
                        var initWeaponId = sex === 1 ? obj.maleWeaponID : obj.femaleWeaponID;
                        var roleEquip = {
                            clothId: "",
                            weaponId: "",
                            initClothId: initClothId,
                            initWeaponId: initWeaponId
                        };
                        for (var j = 0, len = monster.equips.length, item; j < len; j++) {
                            item = monster.equips[j];
                            var pos = GlobalFunc.searchAttrValue(data.ItemAttr.equipPos, item.attrList);
                            if (pos === data.EquipPos.weapon) {
                                roleEquip.weaponId = item.TempleID;
                            }
                            if (pos === data.EquipPos.body) {
                                roleEquip.clothId = item.TempleID;
                            }
                        }
                        roleUnit.setRoleInfo(monster.job, monster.attrList, roleEquip);
                        curUnit = roleUnit;
                    }
                    var sx = monster.attrList[data.RoleAttr.x];
                    var sy = monster.attrList[data.RoleAttr.y];
                    var p = PosUtils.gridToPixel(sx, sy);
                    curUnit.x = p.x;
                    curUnit.y = p.y;
                    curUnit.gx = sx;
                    curUnit.gy = sy;
                    curUnit.insId = monster.InstanceId;
                    var obj = {};
                    obj[monster.InstanceId] = curUnit;
                    obj.gy = curUnit.gy;
                    this.unitObj.push(obj);
                    this.unitIdDict.add(monster.InstanceId, curUnit);
                }
                // console.log("创建----","目标："+ action.unitId,"字典：",this.unitIdDict);
                break;
            case 1:
                //掉落的物品
                // this.dropArr=[];
                DataCenter.bag.curDropGroup = [];
                for (var k = 0; k < action.drop.length; k++) {
                    var drop = action.drop[k];
                    var dropUnit = new MapUnit_Drop();
                    dropUnit.setDropInfo(drop);
                    this.dropCon.addChild(dropUnit);
                    var p = PosUtils.gridToPixel(drop.sx, drop.sy);
                    dropUnit.x = p.x;
                    dropUnit.y = p.y;
                    dropUnit.gx = drop.sx;
                    dropUnit.gy = drop.sy;
                    // console.log("掉落品位置：",drop.sx,drop.sy,"id="+drop.instanceId);
                    this.unitIdDict.add(drop.instanceId + "", dropUnit);
                }
                // var role:MapUnit_Role= this.unitIdDict.get( Config.personId);
                // var any:any={roleId:Config.personId,x:role.gx,y:role.gy};
                // ActionUtil.getInstance().setPickUpAction(any,egret.getTimer()+DataCenter.time_stamps,this.dropArr);
                break;
            case 2:
                break;
            default:
                break;
        }
        this.dealWithIndex();
        if (last) {
            DataCenter.curFightState = true;
        }
        else {
            DataCenter.curExecActionState = true;
        }
        // ActionUtil.getInstance().actionExecuting=false;
    };
    /**单位攻击 */
    View_map_unit.prototype.Attack = function (myAction, last) {
        var _this = this;
        if (last === void 0) { last = false; }
        var action = myAction.S_Useskill;
        if (!action) {
            return;
        }
        var unit = this.unitIdDict.get(myAction.InstanceId);
        if (unit) {
            var boo = unit instanceof (MapUnit_Role);
            // for(var n:number = 0;n<this.friendUnit.length;n++){
            // 	if(DataCenter.endAction.hasKey(this.friendUnit[n].insId)){
            // 		var boo:boolean = DataCenter.endAction.get(this.friendUnit[n].insId);
            // 		if(boo){
            // 			unit.changeStand();
            // 		}
            // 	}
            // }
            var temp = temple.TempleManager.select(action.skillID);
            if (boo && (unit.job != data.JobAttr.JS)) {
                unit.cast(action);
            }
            else {
                unit.attack(action);
            }
            if (boo) {
                this.executeChongzhuang(myAction, temp);
            }
            if (action.summonUnit) {
                this.createUnit(action.summonUnit, "friendUnit");
            }
            if (action.damageInfoList) {
                // var temp:data.SkillTemple=temple.TempleManager.select(action.skillID) as data.SkillTemple;
                var timer = new TimerUtils();
                var waitTime = temp.skillTime;
                waitTime += temp.strikeTime;
                timer.setTimeOut(waitTime, function () {
                    timer = null;
                    for (var i = 0; i < action.damageInfoList.length; i++) {
                        _this.showDamage(action.damageInfoList[i], action.attacker, last);
                    }
                }, this);
            }
            if (action.bufferList.length && unit instanceof MapUnit_Role) {
                // for(var j:number = 0;j<action.bufferList.length;j++){
                unit.addBuff(action.bufferList);
            }
            if (action.removeList.length && unit instanceof MapUnit_Role) {
                // for(var m:number = 0;m<action.removeList.length;m++){
                unit.clearOnceBuff(action.removeList);
            }
        }
    };
    View_map_unit.prototype.executeChongzhuang = function (myAction, skillTemple) {
        if (skillTemple.skillType === 4) {
            var action = new proto.MoveAction();
            action.ex = myAction.S_Useskill.hitX;
            action.ey = myAction.S_Useskill.hitY;
            action.look = myAction.S_Useskill.look;
            action.state = 1;
            this.move(myAction.InstanceId, action, myAction.S_Useskill.hitSkillTime, true);
        }
        var monsterList = myAction.S_Useskill.damageInfoList;
        for (var i = 0, len = monsterList.length; i < len; i++) {
            var item = monsterList[i];
            var monAction = new proto.MoveAction();
            monAction.ex = item.hitX;
            monAction.ey = item.hitY;
            if (item.hitX && item.hitY && skillTemple.strikeTime) {
                var monsterUnit = this.unitIdDict.get(item.instId);
                monsterUnit.changeStand();
                this.move(item.instId, monAction, myAction.S_Useskill.hitSkillTime, true);
            }
        }
        if (skillTemple.skillType === 4) {
            Global.dispatchEvent("czSkillMove", { targetId: myAction.InstanceId, time: myAction.S_Useskill.hitSkillTime, action: action });
        }
    };
    /**单位移除*/
    View_map_unit.prototype.removeUnit = function (insId, last) {
        if (last === void 0) { last = false; }
        var unit = this.unitIdDict.get(insId + "");
        if (unit) {
            if (unit instanceof (MapUnit_Drop)) {
                DataCenter.count += 1;
                // this.dropCon.removeChild(unit); 
                this.dropCon.removeChild(unit);
            }
            else {
                this.removeChild(unit);
            }
            // for(var j:number = 0;j<this.friendUnit.length;j++){
            // 	if(this.friendUnit[j] == unit){
            // 		this.friendUnit.splice(j,1);
            // 		break;
            // 	}
            // }
            for (var i = 0; i < this.unitObj.length; i++) {
                if (this.unitObj[i][insId]) {
                    this.unitObj.splice(i, 1);
                    break;
                }
            }
            this.unitIdDict.remove(insId + "");
        }
        if (last) {
            DataCenter.curFightState = true;
        }
        else {
            DataCenter.curExecActionState = true;
        }
    };
    View_map_unit.prototype.showDamage = function (damageInfo, job, last) {
        var _this = this;
        if (last === void 0) { last = false; }
        var unit = this.unitIdDict.get(damageInfo.instId + "");
        if (unit) {
            if (unit instanceof MapUnit_Role) {
                Global.dispatchEvent(MainNotify.REDUCE_POLLBALL, { damage: damageInfo.showInfo }, false);
                // ModuleManager.getInstance().slotMessage([ModuleEnum.MAINUI],[MainNotify.REDUCE_POLLBALL],{damage:action.damage});
                this.damageShow = "redFont_fnt";
            }
            else if (unit instanceof MapUnit_Monster) {
                switch (job) {
                    case 0:
                        this.damageShow = "redFont_fnt";
                        break;
                    case 1:
                        this.damageShow = "warrior_fnt";
                        break;
                    case 2:
                        this.damageShow = "damageFont_blue_fnt";
                        break;
                    case 3:
                        this.damageShow = "purpleFont_fnt";
                        break;
                    default:
                        break;
                }
                if (DataCenter.curFuBen === data.SenceType.GeRenBoss || DataCenter.curFuBen === data.SenceType.FuBen) {
                    this.curBossHp = this.curBossHp - Math.abs(damageInfo.showInfo);
                    Global.dispatchEvent(MainNotify.BOSSCURHP, { curHp: this.curBossHp }, false);
                }
            }
            if (damageInfo.showInfo > 0) {
                this.damageShow = "greenFont_fnt";
            }
            else {
                this.damageShow = "redFont_fnt";
            }
            var txt = new eui.BitmapLabel();
            txt.font = RES.getRes(this.damageShow);
            txt.text = Math.abs(damageInfo.showInfo) + "";
            // txt.text=damageInfo.showInfo>=0?"+"+damageInfo.showInfo:"-"+(-damageInfo.showInfo);
            this.addChild(txt);
            this.labelGather.push(txt);
            txt.x = unit.x;
            txt.y = unit.y - unit.height + ((Math.random() * 10) >> 0);
            egret.Tween.get(txt).to({ y: txt.y - 120, alpha: 0 }, 1500, egret.Ease.circOut).call(function () {
                _this.removeChild(txt);
                egret.Tween.removeTweens(txt);
                _this.labelGather.splice(_this.labelGather.indexOf(txt), 1);
            }, this);
            //加buff
            if (damageInfo.addbuffList.length) {
                for (var i = 0; i < damageInfo.addbuffList.length; i++) {
                    unit.addBuff(damageInfo.addbuffList[i]);
                }
            }
            if (damageInfo.removeBufferList.length) {
                for (var j = 0; j < damageInfo.addbuffList.length; j++) {
                    unit.clearOnceBuff(damageInfo.addbuffList[j]);
                }
            }
            if (damageInfo.isDead) {
                //1、清buff
                unit.clearBuff();
                unit.clearBuffShowInfo();
                //2、移除
                this.removeUnit(damageInfo.instId);
            }
            if (damageInfo.dropActionList) {
                this.createUnit(damageInfo.dropActionList.S_Create);
            }
        }
        if (last) {
            DataCenter.curFightState = true;
        }
        else {
            DataCenter.curExecActionState = true;
        }
        // ActionUtil.getInstance().actionExecuting=false;
    };
    View_map_unit.prototype.judgeLastAction = function () {
    };
    View_map_unit.prototype.setBuff = function (myAction, last) {
        if (last === void 0) { last = false; }
        var unit = this.unitIdDict.get(myAction.InstanceId + "");
        var buffEffect = myAction.S_BuffEffect;
        if (unit) {
            if (buffEffect.showInfo) {
                unit.addBuffShowInfo(buffEffect.showInfo, buffEffect.buffIdList);
            }
            if (!buffEffect.type) {
                //移除
                unit.removeBuff(buffEffect.buffIdList);
                unit.removeOneBuffShowInfo(buffEffect.buffIdList);
            }
            if (buffEffect.isDead) {
                unit.clearBuffShowInfo();
                unit.clearBuff();
                this.removeUnit(myAction.InstanceId);
                if (buffEffect.ResurrectionUnit) {
                    this.createUnit(buffEffect.ResurrectionUnit);
                }
            }
        }
        if (last) {
            DataCenter.curFightState = true;
        }
        else {
            DataCenter.curExecActionState = true;
        }
        // if(unit){
        // 	if(myAction.S_BuffEffect.move){
        // 		this.addMoveBuff(myAction.InstanceId,myAction.S_BuffEffect.buffId,myAction.S_BuffEffect.move);
        // 	}
        // }
    };
    View_map_unit.prototype.addMoveBuff = function (targetId, buffId, action) {
        var temp = temple.TempleManager.select(buffId);
        var time = temp.Argument1[0] * temp.Argument2[0];
        var any = { targetId: targetId, action: action, time: time };
        this.move(targetId, action, time, true);
        Global.dispatchEvent("addMoveBuff", any);
    };
    View_map_unit.prototype.showChangeStand = function (myAction, last) {
        if (last === void 0) { last = false; }
        this.unitIdDict.get(myAction.InstanceId + "").changeStand();
        if (last) {
            DataCenter.curFightState = true;
        }
        else {
            DataCenter.curExecActionState = true;
        }
        //  ActionUtil.getInstance().actionExecuting=false;
    };
    return View_map_unit;
}(egret.Sprite));
__reflect(View_map_unit.prototype, "View_map_unit");
//# sourceMappingURL=View_map_unit.js.map