var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Boss_world_tab = (function (_super) {
    __extends(Boss_world_tab, _super);
    function Boss_world_tab() {
        var _this = _super.call(this) || this;
        _this.skinName = "Boss_world_tab_skin";
        return _this;
    }
    Boss_world_tab.prototype.childrenCreated = function () {
        this.countTimer = new egret.Timer(1000);
        this.collection = new eui.ArrayCollection();
        this.list.itemRenderer = Boss_personal_item;
        this.list.dataProvider = this.collection;
        this.scroller.viewport = this.list;
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this, false, 2);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this, false, 1);
        var globalTemple = temple.TempleManager.select(DataCenter.worldBossTotalNum);
        this.totalValue = globalTemple.argument;
        this.timeGroup.visible = false;
        globalTemple = temple.TempleManager.select(DataCenter.worldBossCountAddTime);
        this.refreshTime = globalTemple.argument;
        this.watcher = eui.Binding.bindHandler(DataCenter.playerAttr, [data.PlayerAttr.boss_remaincount + ""], this.countChange, this);
        this.remainWatcher = eui.Binding.bindHandler(DataCenter.playerAttr, [data.PlayerAttr.boss_remainSeconds + ""], this.bossCountChange, this);
        this.countTimer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
    };
    Boss_world_tab.prototype.onTimer = function (evt) {
        this.count -= 1;
        this.time.text = GlobalFunc.formatTime(this.count, false, true);
    };
    Boss_world_tab.prototype.bossCountChange = function (value) {
        if (this.curValue != this.totalValue) {
            this.count = this.refreshTime - value;
            this.timeGroup.visible = true;
            this.time.text = GlobalFunc.formatTime(this.count, false, true);
            this.countTimer.start();
        }
        else {
            this.timeGroup.visible = false;
            this.countTimer.stop();
        }
    };
    Boss_world_tab.prototype.countChange = function (value) {
        this.curValue = value;
        this.challengeNum.text = this.curValue + "/" + this.totalValue;
    };
    Boss_world_tab.prototype.onItemTap = function (evt) {
        var item = this.list.getChildAt(evt.itemIndex);
        this.curItemBtn = item.challengeBtn;
        this.itemData = evt.item;
    };
    Boss_world_tab.prototype.setBossSource = function (source) {
        this.collection.source = source;
        this.curValue = DataCenter.playerAttr[data.PlayerAttr.boss_remaincount];
        this.challengeNum.text = this.curValue + "/" + this.totalValue;
    };
    Boss_world_tab.prototype.setBossItem = function (item, index) {
        this.collection.replaceItemAt(item, index);
        this.collection.refresh();
    };
    Boss_world_tab.prototype.onTouchTap = function (evt) {
        switch (evt.target) {
            case this.curItemBtn:
                if (this.curValue <= 0) {
                    PopTipsManager.showPopTips([{ type: TipsEnum.TYPE_WARN, label: "boss挑战次数不足" }]);
                    return;
                }
                if (this.curItemBtn.currentState === "up") {
                    Global.dispatchEvent(MainNotify.CHALLENGE_WORLD_BOSS, this.itemData);
                }
                break;
        }
    };
    Boss_world_tab.prototype.remove = function () {
        for (var i = 0; i < this.list.numChildren; i++) {
            var item = this.list.getChildAt(i);
            if (item && item.parent && item.parent.contains(item)) {
                item.remove();
            }
        }
        if (this.watcher) {
            this.watcher.unwatch();
        }
        if (this.remainWatcher) {
            this.remainWatcher.unwatch();
        }
        this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.countTimer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        if (this.parent && this.parent.contains(this)) {
            this.parent.removeChild(this);
        }
    };
    return Boss_world_tab;
}(eui.Component));
__reflect(Boss_world_tab.prototype, "Boss_world_tab");
//# sourceMappingURL=Boss_world_tab.js.map