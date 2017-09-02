var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MainUI_nav = (function (_super) {
    __extends(MainUI_nav, _super);
    function MainUI_nav() {
        var _this = _super.call(this) || this;
        // public boss:eui.Button;
        _this.btnArr = [];
        _this.standed = 80;
        _this.skinName = "MainUI_nav_skin";
        return _this;
    }
    MainUI_nav.prototype.childrenCreated = function () {
        // this.btnArr = [this.bag,this.role,this.skill,this.forging,this.boss];
        this.btnArr = [this.bag, this.role, this.skill, this.forging];
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.TouchTap, this);
        this.bag["bagIcon"].source = "nav_bag_png";
        this.forging["bagIcon"].source = "nav_forg_png";
        // this.boss["bagIcon"].source = "nav_boss_png";
        // this.tipsPoint = new RedPointTips();
        this.hpBall = MoviePool.getInstance().getMc("hpBall");
        this.ballGroup.addChild(this.hpBall);
        this.hpBall.gotoAndPlay(1, -1);
        this.hpBall.mask = this.hpMask;
        this.hpBall.x = 2;
        this.hpBall.y = 0;
        this.mpBall = MoviePool.getInstance().getMc("mpBall");
        this.ballGroup.addChild(this.mpBall);
        this.mpBall.gotoAndPlay(1, -1);
        this.mpBall.mask = this.mpMask;
        this.mpBall.y = 0;
        eui.Binding.bindHandler(DataCenter, ["playerMaxExp"], this.maxNumChange, this);
        eui.Binding.bindHandler(DataCenter, ["playerCurExp"], this.curExpChange, this);
        /**测试调用方法 */
        // this.addTips();
        this.setFocus(null);
    };
    MainUI_nav.prototype.maxNumChange = function (value) {
        this.playerProgress.maximum = value;
    };
    MainUI_nav.prototype.curExpChange = function (value) {
        this.playerProgress.value = value;
    };
    MainUI_nav.prototype.TouchTap = function (evt) {
        switch (evt.target) {
            case this.bag:
                this.setFocus(this.bag);
                this.onClickOper(MainNotify.OPENBAG);
                break;
            case this.role:
                this.setFocus(this.role);
                this.onClickOper(MainNotify.OPENROLEPANEL);
                break;
            case this.skill:
                this.setFocus(this.skill);
                this.onClickOper(MainNotify.OPENSKILLPANEL);
                break;
            case this.forging:
                this.setFocus(this.forging);
                this.onClickOper(MainNotify.OPENFORGINGPANEL);
                break;
            // case this.boss:
            // 	this.setFocus(this.boss);
            // 	this.onClickOper(MainNotify.OPENPERSONALBOSSPANEL);
            // 	break;
            default:
                break;
        }
    };
    MainUI_nav.prototype.setFocus = function (curTarget) {
        var len = this.btnArr.length;
        for (var i = 0; i < len; i++) {
            var curtarget = this.btnArr[i];
            if (this.btnArr[i] === curTarget) {
                curtarget["navBtnBg"].visible = true;
            }
            else {
                curtarget["navBtnBg"].visible = false;
            }
        }
    };
    MainUI_nav.prototype.initFocus = function () {
        this.setFocus(null);
        // if(this.curBtn){
        // 	this.setFocus(this.curBtn);
        // }
        // this.curBtn = null;
    };
    MainUI_nav.prototype.onClickOper = function (target) {
        //打开背包
        Global.dispatchEvent(target, null, false);
    };
    MainUI_nav.prototype.addTips = function () {
        this.addEventListener(egret.Event.RENDER, this.onRender, this);
    };
    MainUI_nav.prototype.onRender = function (evt) {
        //===================================此处为测试使用========================
        var x = this.role.width - this.tipsPoint.width;
        var y = -this.tipsPoint.height;
        this.tipsPoint.addTipsToDis(this.role, x, y, "Role");
        this.removeEventListener(egret.Event.RENDER, this.onRender, this);
        //===========================================================================
    };
    /**
     * 更新血池百分比
     * @param currHp {number} {当前血量值}
     * @param changeHp {number} {变化后血量值}
     */
    MainUI_nav.prototype.refreshHpPoolBall = function (changeHp) {
        this.totalHp = DataCenter.playerInfo.tolHp;
        if (changeHp === this.totalHp) {
            this.hpBall.y = 0;
            return;
        }
        this.hpBall.y += (changeHp / this.totalHp) * this.standed;
    };
    /**
     * 更新法池百分比
     * @param currMp {number} {当前法量值}
     * @param changeMp	{number} {变化后法量值}
     */
    MainUI_nav.prototype.refreshMpPoolBall = function (changeMp) {
        this.totalMp = DataCenter.playerInfo.tolMp;
        if (this.totalMp === changeMp) {
            this.mpBall.y = 0;
            return;
        }
        this.mpBall.y += (changeMp / this.totalMp) * this.standed;
    };
    return MainUI_nav;
}(eui.Component));
__reflect(MainUI_nav.prototype, "MainUI_nav");
//# sourceMappingURL=MainUI_nav.js.map