var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Boss_personal_item = (function (_super) {
    __extends(Boss_personal_item, _super);
    function Boss_personal_item() {
        var _this = _super.call(this) || this;
        _this.TYPE_PERSONAL = "personal";
        _this.TYPE_WORLD = "world";
        _this.timeCount = 0;
        _this.itemBossData = {};
        _this.skinName = "Boss_personal_item_skin";
        return _this;
    }
    Boss_personal_item.prototype.childrenCreated = function () {
        this.timer = new egret.Timer(1000);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.timer.addEventListener(egret.TimerEvent.COMPLETE, this.onTimerComplete, this);
    };
    Boss_personal_item.prototype.onTimer = function (evt) {
        if (this.timeCount != 0) {
            this.timeCount -= 1;
            this.time.text = GlobalFunc.formatTime(this.timeCount, false, true);
        }
    };
    Boss_personal_item.prototype.onTimerComplete = function (evt) {
        this.timeCount = 0;
        this.timer.stop();
        //发送事件通知当前boss倒计时结束
        Global.dispatchEvent(MainNotify.WORLDBOSSREBIRTH, this.itemBossData);
    };
    Boss_personal_item.prototype.dataChanged = function () {
        this.itemBossData = this.data;
        this.skinState = this.data.state;
        this.invalidateState();
        this.challengeBtn.label = "挑战";
        this.item1.img = this.data.dropIcon[0];
        this.item2.img = this.data.dropIcon[1];
        this.item3.img = this.data.dropIcon[2];
        this.bossIcon.source = this.data.bossIcon;
        this.bossName.text = this.data.bossName;
        if (this.data.challenged) {
            //满足挑战条件
            this.challengeBtn.visible = true;
            this.condition.visible = false;
            this.time.visible = false;
            this.group.visible = true;
        }
        else {
            this.condition.text = this.data.condition;
            this.condition.visible = true;
            this.challengeBtn.visible = false;
            this.time.visible = false;
            this.group.visible = false;
        }
        if (!this.data.isOpen) {
            this.challengeBtn.currentState = "disabled";
        }
        else {
            this.challengeBtn.currentState = "up";
        }
        if (this.skinState === this.TYPE_PERSONAL) {
            this.count.text = this.data.count;
        }
        else {
            if (!this.data.isOpen) {
                this.group.visible = false;
                if (this.data.challenged) {
                    this.time.visible = true;
                    if (this.data.time) {
                        this.timeCount = this.data.time;
                        this.time.text = GlobalFunc.formatTime(this.data.time, false, true);
                        this.timer.repeatCount = this.data.time;
                        this.timer.start();
                    }
                }
            }
            else {
                this.group.visible = true;
                this.romeNum.text = this.data.playerCount;
                this.time.visible = false;
            }
        }
    };
    Boss_personal_item.prototype.remove = function () {
        this.timer.stop();
        this.timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.timer.removeEventListener(egret.TimerEvent.COMPLETE, this.onTimerComplete, this);
    };
    Boss_personal_item.prototype.getCurrentState = function () {
        return this.skinState;
    };
    return Boss_personal_item;
}(eui.ItemRenderer));
__reflect(Boss_personal_item.prototype, "Boss_personal_item");
//# sourceMappingURL=Boss_personal_item.js.map