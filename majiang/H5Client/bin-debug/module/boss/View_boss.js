var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var View_boss = (function (_super) {
    __extends(View_boss, _super);
    function View_boss() {
        var _this = _super.call(this) || this;
        _this.TYPE_PERSONAL = "personal";
        _this.TYPE_WORLD = "world";
        _this.curPanelType = "personal";
        _this.skinName = "View_boss_skin";
        return _this;
    }
    View_boss.prototype.childrenCreated = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        Global.addEventListener(MainNotify.CHALLENGE_PERSONAL_BOSS, this.dispatchEventHandle, this);
        Global.addEventListener(MainNotify.CHALLENGE_WORLD_BOSS, this.dispatchEventHandle, this);
        Global.addEventListener(MainNotify.WORLDBOSSREBIRTH, this.bossRebirth, this);
        this.personalBtn.setAttr({ text: "个人", currentState: "down" });
        this.allBtn.setAttr({ text: "全民", currentState: "up" });
        this.zsBtn.setAttr({ text: "转生", currentState: "up" });
        this.curModule = this.module;
        this.curBtn = this.personalBtn;
        this.changeTap(this.personalBtn, Boss_personal_tab);
        // this.curModule.setPersonalBossData();
    };
    View_boss.prototype.bossRebirth = function (evt) {
        this.curModule.bossRebirth(evt.c_data);
    };
    View_boss.prototype.onTouchTap = function (evt) {
        switch (evt.target) {
            case this.personalBtn.button:
                this.changePersonalBossTap();
                this.curPanelType = this.TYPE_PERSONAL;
                if (this.curTap instanceof Boss_personal_tab) {
                    this.curModule.setPersonalBossData();
                }
                break;
            case this.allBtn.button:
                this.changeWorldBossTap();
                this.curPanelType = this.TYPE_WORLD;
                if (this.curTap instanceof Boss_world_tab) {
                    this.curModule.getWorldBossData();
                }
                break;
            case this.returnBtn:
                this.curModule.removeView();
                break;
        }
    };
    View_boss.prototype.changePersonalBossTap = function () {
        this.changeTap(this.personalBtn, Boss_personal_tab);
    };
    View_boss.prototype.changeWorldBossTap = function () {
        this.changeTap(this.allBtn, Boss_world_tab);
    };
    View_boss.prototype.setPersonalBossData = function (source) {
        if (this.curTap instanceof Boss_personal_tab) {
            this.curTap.setBossSource(source);
        }
    };
    View_boss.prototype.setWorldBossData = function (source) {
        if (this.curTap instanceof Boss_world_tab) {
            this.curTap.setBossSource(source);
        }
    };
    View_boss.prototype.dispatchEventHandle = function (evt) {
        var boxNum = DataCenter.playerAttr[data.PlayerAttr.bagcount];
        if (DataCenter.curBoxNum >= boxNum) {
            //背包数据已满无法购买装备
            var popObj = { type: TipsEnum.TYPE_WARN, label: "背包已满" };
            PopTipsManager.showPopTips([popObj]);
            return;
        }
        switch (evt.type) {
            case MainNotify.CHALLENGE_PERSONAL_BOSS:
                this.curModule.challengePersonalBoss(evt.c_data);
                break;
            case MainNotify.CHALLENGE_WORLD_BOSS:
                this.curModule.challengeWorldBoss(evt.c_data);
                break;
        }
    };
    /**tab切换 */
    View_boss.prototype.changeTap = function (curBtn, Tab) {
        this.curBtn.setAttr({ currentState: "up" });
        this.curBtn = curBtn;
        curBtn.setAttr({ currentState: "down" });
        if (this.curTap && this.curTap.parent && this.curTap.parent.contains(this.curTap)) {
            this.curTap.remove();
        }
        this.curTap = new Tab();
        this.tabGroup.addChild(this.curTap);
    };
    View_boss.prototype.removeEvent = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        Global.removeEventListener(MainNotify.CHALLENGE_PERSONAL_BOSS, this.dispatchEventHandle, this);
        Global.removeEventListener(MainNotify.CHALLENGE_WORLD_BOSS, this.dispatchEventHandle, this);
        Global.removeEventListener(MainNotify.WORLDBOSSREBIRTH, this.bossRebirth, this);
        this.curTap.remove();
    };
    return View_boss;
}(Base_view));
__reflect(View_boss.prototype, "View_boss");
//# sourceMappingURL=View_boss.js.map