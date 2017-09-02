var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MapUnit_Monster = (function (_super) {
    __extends(MapUnit_Monster, _super);
    function MapUnit_Monster() {
        var _this = _super.call(this) || this;
        _this._direct = 0;
        _this.state = MapUnitState.STAND;
        _this.buffList = new Dictionary("monsterBuffList");
        _this.labelDict = new Dictionary("monsterLabelDict");
        return _this;
    }
    MapUnit_Monster.prototype.setMonsterInfo = function (temleId) {
        this.isCreated = false;
        this.mon = new MonsterMc();
        this.addChild(this.mon);
        this.direct = 5;
        this.state = MapUnitState.STAND;
        this.modelId = temleId;
        var c = temple.TempleManager.select(temleId);
        this.mon.monId = c.model + "";
        this.isCreated = true;
        this.changeStand();
        this.buff = new egret.Sprite();
        this.addChild(this.buff);
        this.labelCon = new egret.Sprite();
        this.addChild(this.labelCon);
    };
    MapUnit_Monster.prototype.attack = function (action) {
        this.direct = action.look;
        this.state = MapUnitState.ATTACK;
        this.mon.changeMc();
    };
    MapUnit_Monster.prototype.move = function (look, state) {
        if (look === void 0) { look = -1; }
        if (state === void 0) { state = ""; }
        if (look != -1) {
            this.direct = look;
        }
        if (state) {
            this.state = state;
        }
        this.mon.changeMc();
    };
    MapUnit_Monster.prototype.changeStand = function () {
        this.state = MapUnitState.STAND;
        this.mon.changeMc();
    };
    MapUnit_Monster.prototype.addBuff = function (buffId) {
        for (var i = 0; i < buffId.length; i++) {
            var buff = new MovieClip();
            ;
            var buffTemplate = temple.TempleManager.select(buffId[i]);
            var effectId = buffTemplate.EffectResId;
            this.buff.addChild(buff);
            buff.loadFile(Config.path_buffMc + effectId + "_a_5", true);
            this.buffList.add(buffId[i] + "", buff);
        }
        // buff.addEventListener(egret.Event.CHANGE,()=>{
        // 	buff.gotoAndStop(buff.totalFrames)
        // },this);
    };
    /**添加buff效果展示 */
    MapUnit_Monster.prototype.addBuffShowInfo = function (showInfo, id) {
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
    MapUnit_Monster.prototype.up = function (txt, yy) {
        var _this = this;
        egret.Tween.get(txt).to({ y: yy - 120 }, 1000, egret.Ease.circOut).to({ alpha: 0 }, 500).call(function () {
            egret.Tween.removeTweens(txt);
            txt.y = yy;
            txt.alpha = 1;
            _this.up(txt, yy);
        }, this);
    };
    /**移除单项buff效果文字展示 */
    MapUnit_Monster.prototype.removeOneBuffShowInfo = function (id) {
        for (var i = 0; i < id.length; i++) {
            if (this.labelDict.hasKey(id[i] + "")) {
                if (this.contains(this.labelDict.get(id[i] + ""))) {
                    this.removeChild(this.labelDict.get(id[i] + ""));
                }
                this.labelDict.remove(id[i] + "");
            }
        }
    };
    /**清除全部buff效果文字展示 */
    MapUnit_Monster.prototype.clearBuffShowInfo = function () {
        this.labelCon.removeChildren();
        this.labelDict.clear();
    };
    /**清除buff列表中所有buff */
    MapUnit_Monster.prototype.clearBuff = function () {
        this.buffList.clear();
        this.buff.removeChildren();
    };
    /**清除某一项buff */
    MapUnit_Monster.prototype.clearOnceBuff = function (buffId) {
        for (var i = 0; i < buffId.length; i++) {
            if (this.buffList.hasKey(buffId[i] + "")) {
                if (this.buff.contains(this.buffList.get(buffId[i] + ""))) {
                    this.buff.removeChild(this.buffList.get(buffId[i] + ""));
                }
                this.buffList.remove(buffId[i] + "");
            }
        }
    };
    Object.defineProperty(MapUnit_Monster.prototype, "direct", {
        /**朝向 */
        get: function () { return this._direct; },
        set: function (v) { this._direct = v; if (this.mon)
            this.mon.diret = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapUnit_Monster.prototype, "state", {
        /**状态 */
        get: function () { return this._state; },
        set: function (v) { this._state = v == "c" ? "a" : v; if (this.mon)
            this.mon.state = v; },
        enumerable: true,
        configurable: true
    });
    return MapUnit_Monster;
}(Base_MapUnit));
__reflect(MapUnit_Monster.prototype, "MapUnit_Monster");
var MonsterMc = (function (_super) {
    __extends(MonsterMc, _super);
    function MonsterMc() {
        var _this = _super.call(this) || this;
        _this.initView();
        return _this;
    }
    MonsterMc.prototype.initView = function () {
        this.mon = new MovieClip();
        this.addChild(this.mon);
        eui.Binding.bindHandler(this, ["monId"], this.changeMon, this);
    };
    MonsterMc.prototype.changeMc = function () {
        this.changeMon();
    };
    MonsterMc.prototype.changeMon = function () {
        var _this = this;
        if (!this.state || !this.diret || !this.monId) {
            return;
        }
        this.changeMoning = true;
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
        var monPath = this.monId + "_" + this.state + "_" + this.diret;
        // var monPath=31000+"_"+this.state+"_"+this.diret;
        path = Config.path_monMc + this.monId + "_" + this.state + "_" + dir;
        // path=Config.path_monMc+ 31000+"_"+this.state+"_"+dir;
        if (this.monPath == monPath) {
            if (this.state == MapUnitState.RUN || this.state == MapUnitState.STAND) {
                return;
            }
            else {
                this.play();
            }
        }
        this.monPath = monPath;
        this.mon.addEventListener(egret.Event.CHANGE, function () {
            _this.changeMoning = false;
        }, this);
        this.mon.loadFile(path, true, this.playCount(), function () {
            this.state = MapUnitState.STAND;
            this.changeMon();
        }, this);
        this.mon.scaleX = scale;
    };
    MonsterMc.prototype.play = function () {
        if (!this.changeMoning) {
            this.mon.gotoAndPlay(0);
        }
    };
    Object.defineProperty(MonsterMc.prototype, "state", {
        get: function () { return this._state; },
        set: function (v) { if (this._state == v) {
            return;
        } this._state = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonsterMc.prototype, "diret", {
        get: function () { return this._diret; },
        set: function (v) { if (this._diret == v) {
            return;
        } this._diret = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonsterMc.prototype, "monId", {
        get: function () { return this._monId; },
        set: function (v) { this._monId = v; },
        enumerable: true,
        configurable: true
    });
    MonsterMc.prototype.playCount = function () {
        return this.state == MapUnitState.ATTACK || this.state == MapUnitState.CAST ? 1 : -1;
    };
    return MonsterMc;
}(egret.Sprite));
__reflect(MonsterMc.prototype, "MonsterMc");
//# sourceMappingURL=MapUnit_Monster.js.map