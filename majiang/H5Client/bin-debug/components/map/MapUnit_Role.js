var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MapUnit_Role = (function (_super) {
    __extends(MapUnit_Role, _super);
    function MapUnit_Role() {
        var _this = _super.call(this) || this;
        _this._direct = 0;
        _this.weaponId = "50000";
        return _this;
    }
    MapUnit_Role.prototype.setRoleInfo = function (job, roleAttr, roleEquip) {
        if (roleEquip === void 0) { roleEquip = ""; }
        this.isCreated = false;
        this.job = job;
        this.role = new RoleMc();
        this.addChild(this.role);
        this.role.roleAttr = roleAttr;
        this.role.job = this.job;
        this.role.roleEquip = roleEquip;
        this.direct = 5;
        this.state = MapUnitState.STAND;
        this.role.changeMc();
        this.effect = new egret.Sprite();
        this.addChild(this.effect);
        this.buffCon = new egret.Sprite();
        this.addChild(this.buffCon);
        this.labelCon = new egret.Sprite();
        this.addChild(this.labelCon);
        this.buffList = new Dictionary("roleUnitBuffList");
        this.labelDict = new Dictionary("roleUnitLabelList");
        this.isCreated = true;
        // this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
        // 	switch (DataCenter.role1InfoVO_out.job) {
        // 		case 1:
        // 			this.skillIndex=this.skillIndex>=6?0:this.skillIndex+1;
        // 			break;
        // 		case 2:
        // 			this.skillIndex=this.skillIndex>=4?0:this.skillIndex+1;
        // 			break;
        // 		case 3:
        // 			this.skillIndex=this.skillIndex>=4?0:this.skillIndex+1;
        // 			break;
        // 		default:
        // 			break;
        // 	}
        // },this);
    };
    MapUnit_Role.prototype.attack = function (action) {
        if (action.look && action.look != 0) {
            this.direct = action.look;
        }
        this.state = MapUnitState.ATTACK;
        this.role.changeMc();
        this.addEffect(action.skillID + "", action.targetX, action.targetY);
    };
    MapUnit_Role.prototype.cast = function (action) {
        if (action.look != 0) {
            this.direct = action.look;
        }
        this.state = MapUnitState.CAST;
        this.role.changeMc();
        this.addEffect(action.skillID + "", action.targetX, action.targetY);
    };
    MapUnit_Role.prototype.move = function (look, state, times) {
        if (times === void 0) { times = -1; }
        this.direct = look;
        this.state = state;
        this.role.changeMc(times);
    };
    MapUnit_Role.prototype.changeStand = function () {
        this.state = MapUnitState.STAND;
        this.role.changeMc();
    };
    // private skillIndex:number=0;
    /**
     * 添加特效
     */
    MapUnit_Role.prototype.addEffect = function (effectName, tx, ty) {
        var _this = this;
        if (tx === void 0) { tx = 0; }
        if (ty === void 0) { ty = 0; }
        // if(this.effectPlaying){
        // 	return;
        // }
        // this.effectPlaying=true;
        var dir;
        var scale;
        if (this.direct == 6) {
            dir = 4, scale = -1;
        }
        else if (this.direct == 7) {
            dir = 3, scale = -1;
        }
        else if (this.direct == 8) {
            dir = 2, scale = -1;
        }
        else {
            dir = this.direct, scale = 1;
        }
        var p = PosUtils.gridToPixel(tx, ty);
        if (this.job > 1) {
            scale = 1;
        }
        var mc = new SkillEffect();
        // mc.effIndex=this.skillIndex;
        // mc.addEventListener("addBuff",(event:egret.Event)=>{
        // 	this.addBuff(event.data);
        // },this);
        mc.addEventListener("skillPlayCom", function () {
            _this.effect.removeChild(mc);
            // this.effectPlaying=false;;
        }, this);
        // mc.createSkill(effectName,DataCenter.role1InfoVO_out.job,dir,p.x-this.x,p.y-this.y);
        mc.createSkill(effectName, this.job, dir, p.x - this.x, p.y - this.y);
        this.effect.addChild(mc);
        mc.scaleX = scale;
    };
    MapUnit_Role.prototype.addBuff = function (buffId) {
        for (var i = 0; i < buffId.length; i++) {
            var temp = temple.TempleManager.select(buffId[i]);
            var buff = new MovieClip();
            this.buffCon.addChild(buff);
            buff.loadFile(Config.path_buffMc + temp.EffectResId + "_a_5", true);
            this.buffList.add(buffId[i] + "", buff);
        }
    };
    /**添加buff效果展示 */
    MapUnit_Role.prototype.addBuffShowInfo = function (showInfo, id) {
        for (var i = 0; i < id.length; i++) {
            var labelFamily = "";
            var txt = new eui.BitmapLabel();
            if (showInfo > 0) {
                labelFamily = "greenFont_fnt";
            }
            else {
                labelFamily = "redFont_fnt";
            }
            txt.font = RES.getRes(labelFamily);
            txt.text = Math.abs(showInfo) + "";
            // txt.text=damageInfo.showInfo>=0?"+"+damageInfo.showInfo:"-"+(-damageInfo.showInfo);
            this.labelCon.addChild(txt);
            // txt.x=this.buffCon.x;
            // txt.y=unit.y - unit.height
            this.labelDict.add(id[i] + "", txt);
            var yy = txt.y;
            this.up(txt, yy);
        }
    };
    MapUnit_Role.prototype.up = function (txt, yy) {
        var _this = this;
        egret.Tween.get(txt).to({ y: yy - 120 }, 1000, egret.Ease.circOut).to({ alpha: 0 }, 500).call(function () {
            egret.Tween.removeTweens(txt);
            txt.y = yy;
            txt.alpha = 1;
            _this.up(txt, yy);
        }, this);
    };
    /**移除单项buff效果文字展示 */
    MapUnit_Role.prototype.removeOneBuffShowInfo = function (id) {
        for (var i = 0; i < id.length; i++) {
            if (this.labelDict.hasKey(id[i] + "")) {
                if (this.labelCon.contains(this.labelDict.get(id[i] + ""))) {
                    this.labelCon.removeChild(this.labelDict.get(id[i] + ""));
                }
                this.labelDict.remove(id[i] + "");
            }
        }
    };
    /**清除全部buff效果文字展示 */
    MapUnit_Role.prototype.clearBuffShowInfo = function () {
        this.labelCon.removeChildren();
        this.labelDict.clear();
    };
    /**清除buff列表中所有buff */
    MapUnit_Role.prototype.clearBuff = function () {
        this.buffList.clear();
        this.buffCon.removeChildren();
    };
    /**清除某一项buff */
    MapUnit_Role.prototype.clearOnceBuff = function (buffId) {
        for (var i = 0; i < buffId.length; i++) {
            if (this.buffList.hasKey(buffId[i] + "")) {
                if (this.buffCon.contains(this.buffList.get(buffId[i] + ""))) {
                    this.buffCon.removeChild(this.buffList.get(buffId[i] + ""));
                }
                this.buffList.remove(buffId[i] + "");
            }
        }
    };
    // public setBuff(buffInfo:proto.BuffEffect):void{
    // 	switch (buffInfo.type) {
    // 		case 0:
    // 			this.removeBuff(buffInfo.buffId);
    // 			break;
    // 		case 1:
    // 			// this.removeBuff();
    // 			break;
    // 		default:
    // 			break;
    // 	}
    // }
    MapUnit_Role.prototype.removeBuff = function (buffId) {
        var buff = this.buffList.get(buffId + "");
        this.buffCon.removeChild(buff);
        this.buffList.remove(buffId + "");
    };
    MapUnit_Role.prototype.destory = function () {
        this.removeChild(this.role);
        this.role = null;
    };
    Object.defineProperty(MapUnit_Role.prototype, "direct", {
        /**朝向 */
        get: function () { return this._direct; },
        set: function (v) { this._direct = v; if (this.role)
            this.role.diret = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapUnit_Role.prototype, "state", {
        /**状态 */
        get: function () { return this._state; },
        set: function (v) { this._state = v; if (this.role)
            this.role.state = v; },
        enumerable: true,
        configurable: true
    });
    return MapUnit_Role;
}(Base_MapUnit));
__reflect(MapUnit_Role.prototype, "MapUnit_Role");
var RoleMc = (function (_super) {
    __extends(RoleMc, _super);
    function RoleMc() {
        var _this = _super.call(this) || this;
        _this.initView();
        return _this;
    }
    Object.defineProperty(RoleMc.prototype, "roleAttr", {
        get: function () {
            return this._roleAttr;
        },
        set: function (v) {
            this._roleAttr = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoleMc.prototype, "job", {
        get: function () {
            return this._job;
        },
        set: function (v) {
            this._job = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoleMc.prototype, "roleEquip", {
        get: function () {
            return this._roleEquip;
        },
        set: function (v) {
            this._roleEquip = v;
        },
        enumerable: true,
        configurable: true
    });
    RoleMc.prototype.initView = function () {
        this.role = new MovieClip();
        this.weapon = new MovieClip();
        this.wing = new MovieClip();
        this.shadow = new MovieClip();
        this.addChild(this.shadow);
        this.addChild(this.role);
        this.addChild(this.weapon);
        this.addChild(this.wing);
    };
    RoleMc.prototype.changeMc = function (times) {
        if (times === void 0) { times = -1; }
        this.changeCloth(times);
        this.changeWeapon(times);
        this.changeShadow(times);
        this.changeWing(times);
    };
    RoleMc.prototype.changeShadow = function (times) {
        var _this = this;
        if (times === void 0) { times = -1; }
        if (!this.state || !this.diret) {
            return;
        }
        this.changeShadowing = true;
        var path;
        var shadowPath = Config.path_shadowMc + "_" + this.state + "_" + this.diret;
        path = Config.path_shadowMc + "_" + this.state + "_" + this.diret;
        if (this.shadowPath == shadowPath) {
            if (this.state == MapUnitState.RUN || this.state == MapUnitState.STAND) {
                return;
            }
            else {
                this.play();
            }
        }
        this.shadowPath = shadowPath;
        this.shadow.addEventListener(egret.Event.CHANGE, function () {
            _this.changeShadowing = false;
            _this.play();
        }, this);
        this.shadow.loadFile(path, true, times == -1 ? this.playCount() : times, this.mcPlayCom, this);
    };
    RoleMc.prototype.changeWing = function (times) {
        var _this = this;
        if (times === void 0) { times = -1; }
        if (!this.state || !this.diret) {
            return;
        }
        this.changeWinging = true;
        var path;
        var dir;
        var scale;
        if (this.diret == 6) {
            dir = 4, scale = -1;
        }
        else if (this.diret == 7) {
            dir = 3, scale = -1;
        }
        else if (this.diret == 8) {
            dir = 2, scale = -1;
        }
        else {
            dir = this.diret, scale = 1;
        }
        if (this.diret >= 4 && this.diret <= 6) {
            this.setChildIndex(this.wing, 1);
        }
        else {
            this.setChildIndex(this.wing, 3);
        }
        var temp;
        if (DataCenter.wingFashionState) {
            temp = temple.TempleManager.select(DataCenter.curWingFashionId);
        }
        else {
            temp = temple.TempleManager.select(this.roleAttr[data.RoleAttr.wingsID]);
        }
        try {
            temp.maleResId;
        }
        catch (err) {
            console.log("翅膀temple不存在==查询id==》" + this.roleAttr[data.RoleAttr.wingsID]);
            return;
        }
        var wingPath = temp.maleResId + "_" + this.state + "_" + this.diret;
        // path=Config.path_wingMc+ DataCenter.role1InfoVO_out.wingsId_out+"_"+this.state+"_"+dir;
        path = Config.path_wingMc + temp.maleResId + "_" + this.state + "_" + dir;
        if (this.wingPath == wingPath) {
            if (this.state == MapUnitState.RUN || this.state == MapUnitState.STAND) {
                return;
            }
            else {
                this.play();
            }
        }
        this.wingPath = wingPath;
        this.wing.addEventListener(egret.Event.CHANGE, function () {
            _this.changeWinging = false;
            _this.play();
        }, this);
        this.wing.loadFile(path, true, times == -1 ? this.playCount() : times, this.mcPlayCom, this);
        this.wing.scaleX = scale;
    };
    RoleMc.prototype.changeCloth = function (times) {
        var _this = this;
        if (times === void 0) { times = -1; }
        if (!this.state || !this.diret) {
            return;
        }
        this.changeRoleing = true;
        var path;
        var dir;
        var scale;
        if (this.diret == 6) {
            dir = 4, scale = -1;
        }
        else if (this.diret == 7) {
            dir = 3, scale = -1;
        }
        else if (this.diret == 8) {
            dir = 2, scale = -1;
        }
        else {
            dir = this.diret, scale = 1;
        }
        var modelId;
        var temp;
        if (DataCenter.roleFashionState) {
            temp = temple.TempleManager.select(DataCenter.curRoleFahsionId);
            try {
                modelId = this.roleAttr[data.RoleAttr.sex] == 1 ? temp.maleResId : temp.femaleResId;
            }
            catch (err) {
                console.log(DataCenter.curRoleFahsionId + '>>>>此人物时装id 在物品表不存在 或资源不存在');
            }
        }
        else {
            var clothsId = this.roleEquip.clothId;
            if (clothsId) {
                temp = temple.TempleManager.select(clothsId);
                modelId = this.roleAttr[data.RoleAttr.sex] == 1 ? temp.maleResId : temp.femaleResId;
            }
            else {
                modelId = this.roleEquip.initClothId;
            }
        }
        var rolePath = modelId + "_" + this.state + "_" + this.diret;
        path = Config.path_roleMc + modelId + "_" + this.state + "_" + dir;
        if (this.rolePath == rolePath) {
            if (this.state == MapUnitState.RUN || this.state == MapUnitState.STAND) {
                return;
            }
            else {
                this.play();
            }
        }
        this.rolePath = rolePath;
        this.role.addEventListener(egret.Event.CHANGE, function () {
            _this.changeRoleing = false;
            _this.play();
        }, this);
        this.role.loadFile(path, true, times == -1 ? this.playCount() : times, this.mcPlayCom, this);
        this.role.scaleX = scale;
    };
    RoleMc.prototype.changeWeapon = function (times) {
        var _this = this;
        if (times === void 0) { times = -1; }
        if (!this.state || !this.diret) {
            return;
        }
        this.changeWeaponing = true;
        var path;
        var dir;
        var scale;
        if (this.diret == 6) {
            dir = 4, scale = -1;
        }
        else if (this.diret == 7) {
            dir = 3, scale = -1;
        }
        else if (this.diret == 8) {
            dir = 2, scale = -1;
        }
        else {
            dir = this.diret, scale = 1;
        }
        var modelId;
        var temp;
        if (DataCenter.weaponFashionState) {
            temp = temple.TempleManager.select(DataCenter.weaponFashionId);
            try {
                modelId = this.roleAttr[data.RoleAttr.sex] == 1 ? temp.maleResId : temp.femaleResId;
            }
            catch (err) {
                console.log(DataCenter.weaponFashionId + '>>>>此武器时装id 在物品表不存在 或资源不存在');
            }
        }
        else {
            var weaponId = this.roleEquip.weaponId;
            if (weaponId) {
                temp = temple.TempleManager.select(weaponId);
                modelId = this.roleAttr[data.RoleAttr.sex] == 1 ? temp.maleResId : temp.femaleResId;
            }
            else {
                modelId = this.roleEquip.initWeaponId;
            }
        }
        var weaponPath = modelId + "_" + this.state + "_" + this.diret;
        path = Config.path_weaponMc + modelId + "_" + this.state + "_" + dir;
        if (this.weaponPath == weaponPath) {
            if (this.state == MapUnitState.RUN || this.state == MapUnitState.STAND) {
                return;
            }
            else {
                this.play();
            }
        }
        this.weaponPath = weaponPath;
        this.weapon.addEventListener(egret.Event.CHANGE, function () {
            _this.changeWeaponing = false;
            _this.play();
        }, this);
        this.weapon.loadFile(path, true, times == -1 ? this.playCount() : times, this.mcPlayCom, this);
        this.weapon.scaleX = scale;
    };
    RoleMc.prototype.play = function () {
        if (!this.changeRoleing && !this.changeWeaponing && !this.changeShadowing && !this.changeWinging) {
            this.role.gotoAndPlay(0);
            this.weapon.gotoAndPlay(0);
            this.wing.gotoAndPlay(0);
            this.shadow.gotoAndPlay(0);
        }
    };
    RoleMc.prototype.mcPlayCom = function () {
        if (this.state == MapUnitState.ATTACK || this.state == MapUnitState.CAST) {
            this.state = MapUnitState.STAND;
            this.changeMc();
        }
    };
    RoleMc.prototype.playCount = function () {
        // return 1;
        return this.state == MapUnitState.ATTACK || this.state == MapUnitState.CAST ? 1 : -1;
    };
    Object.defineProperty(RoleMc.prototype, "state", {
        get: function () { return this._state; },
        set: function (v) { this._state = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoleMc.prototype, "diret", {
        get: function () { return this._diret; },
        set: function (v) { this._diret = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoleMc.prototype, "isAttack", {
        get: function () { return this._isAttack; },
        set: function (v) { this._isAttack = v; },
        enumerable: true,
        configurable: true
    });
    return RoleMc;
}(egret.Sprite));
__reflect(RoleMc.prototype, "RoleMc");
//# sourceMappingURL=MapUnit_Role.js.map