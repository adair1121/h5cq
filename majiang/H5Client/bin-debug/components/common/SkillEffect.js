var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SkillEffect = (function (_super) {
    __extends(SkillEffect, _super);
    function SkillEffect() {
        var _this = _super.call(this) || this;
        _this.play1Com = false;
        _this.play2Com = false;
        _this.initView();
        return _this;
    }
    SkillEffect.prototype.initView = function () {
        var _this = this;
        this.effectCon = new egret.Sprite();
        this.addChild(this.effectCon);
        this.effect1 = new MovieClip();
        this.effect2 = new MovieClip();
        this.effect3 = new MovieClip();
        this.effect1.addEventListener(egret.Event.CHANGE, function () { _this.addChild(_this.effect1); _this.effect1.startPlay(0); }, this);
        this.effect2.addEventListener(egret.Event.CHANGE, function () { _this.playEffect2(); }, this);
        this.effect3.addEventListener(egret.Event.CHANGE, function () { _this.playEffect3(); }, this);
    };
    SkillEffect.prototype.createSkill = function (skillId, sex, look, targetX, targetY) {
        if (look === void 0) { look = 5; }
        if (targetX === void 0) { targetX = 0; }
        if (targetY === void 0) { targetY = 0; }
        this.play1Com = true;
        this.play2Com = true;
        this.targetX = targetX;
        this.targetY = targetY;
        this.look = look;
        var c = temple.TempleManager.select(parseInt(skillId));
        var model1 = sex == 1 ? c.skillResIdMan : c.skillResIdLady;
        var modelFly = c.skillResIdFly;
        var modelRock = c.skillResIdRock;
        switch (c.skill_category) {
            case 101:
            case 102:
            case 103:
            case 104:
            case 105:
                this.loadSkill(model1 + "_a_" + look);
                break;
            case 201:
                this.loadSkill(model1 + "_a_" + 5, modelFly + "_a_" + 5, modelRock + "_a_" + 5);
                break;
            case 202:
                this.loadSkill(model1 + "_a_" + 5, null, modelRock + "_a_" + 5);
                break;
            case 203:
            case 204:
                this.loadSkill(model1 + "_a_" + 5);
                break;
            case 205:
                this.loadSkill(model1 + "_a_" + 5, null, modelRock + "_a_" + 5);
                break;
            case 301:
                this.loadSkill(model1 + "_a_" + 5, modelFly + "_a_" + 5, modelRock + "_a_" + 5);
                break;
            case 302:
                this.loadSkill(model1 + "_a_" + 5, null, modelRock + "_a_" + 5);
                break;
            case 303:
                this.loadSkill(model1 + "_a_" + 5, null, modelRock + "_a_" + 5);
                break;
            case 304:
            case 305:
                this.loadSkill(model1 + "_a_" + 5);
                break;
        }
    };
    SkillEffect.prototype.loadSkill = function (name1, name2, name3) {
        var _this = this;
        if (name1 === void 0) { name1 = null; }
        if (name2 === void 0) { name2 = null; }
        if (name3 === void 0) { name3 = null; }
        this.hasEffect2 = name2 ? true : false;
        this.hasEffect3 = name3 ? true : false;
        if (name1) {
            this.play1Com = false;
            this.play2Com = false;
            this.effect1.loadFile(Config.path_effectMc + name1, false, 1, function () {
                _this.play1Com = true;
                if (_this.hasEffect2) {
                    _this.playEffect2();
                    return;
                }
                else if (_this.hasEffect3) {
                    _this.play2Com = true;
                    _this.playEffect3();
                    return;
                }
                _this.removeSkill();
                return;
            }, this);
        }
        if (name2) {
            this.play2Com = false;
            this.effect2.loadFile(Config.path_effectMc + name2, false, -1, function () { }, this);
        }
        if (name3) {
            this.effect3.loadFile(Config.path_effectMc + name3, false, 1, function () {
                _this.removeSkill();
                return;
            }, this);
        }
    };
    SkillEffect.prototype.playEffect1 = function () {
    };
    SkillEffect.prototype.playEffect2 = function () {
        var _this = this;
        if (!this.play1Com) {
            return;
        }
        this.removeChildren();
        this.addChild(this.effect2);
        this.effect2.y = -60;
        var rotation = (this.look - 1) * 45;
        this.effect2.rotation = rotation;
        this.effect2.startPlay(0);
        egret.Tween.get(this.effect2).to({ x: this.targetX, y: this.targetY - 60 }, 100).call(function () {
            if (_this.hasEffect3) {
                _this.play2Com = true;
                _this.playEffect3();
                return;
            }
            _this.removeSkill();
            return;
        });
    };
    SkillEffect.prototype.playEffect3 = function () {
        if (!this.play2Com) {
            return;
        }
        this.removeChildren();
        this.addChild(this.effect3);
        this.effect3.x = this.targetX;
        this.effect3.y = this.targetY;
        this.effect3.startPlay(0);
    };
    SkillEffect.prototype.removeSkill = function () {
        this.removeChildren();
        this.dispatchEventWith("skillPlayCom");
    };
    return SkillEffect;
}(egret.Sprite));
__reflect(SkillEffect.prototype, "SkillEffect");
//# sourceMappingURL=SkillEffect.js.map