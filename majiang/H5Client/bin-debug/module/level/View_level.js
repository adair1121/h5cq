var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var View_level = (function (_super) {
    __extends(View_level, _super);
    function View_level() {
        var _this = _super.call(this) || this;
        _this.skinName = "View_level_skin";
        return _this;
    }
    View_level.prototype.childrenCreated = function () {
        this.curModule = this.module;
        this.bossMc = new MovieClip();
        // this.arrayCollect = new eui.ArrayCollection();
        this.rankCollect = new eui.ArrayCollection();
        // this.dropList.itemRenderer = CommonItem;
        // this.dropList.dataProvider = this.arrayCollect;
        this.rankList.itemRenderer = level_rank_item;
        this.rankList.dataProvider = this.rankCollect;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        // this.dropList.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this);
        this.checkRank.setClickFunction(function () {
            //打开关卡排行面板
        }, this);
    };
    View_level.prototype.onTouchTap = function (evt) {
        switch (evt.target) {
            case this.returnBtn:
                this.curModule.removeView();
                break;
            case this.challengeBtn:
                //进行挑战相关逻辑操作
                if (DataCenter.curFuBen === data.SenceType.YeWai) {
                    this.curModule.startChallenge();
                }
                break;
            default:
                break;
        }
    };
    // private onItemTap(evt:eui.ItemTapEvent):void{
    // }
    /**设置页面关卡基础数据 */
    View_level.prototype.setViewData = function (dataObj) {
        var expStar = "<font color=0x04fe10>" + dataObj.exp + "</font>" + "<font>/小时</font>";
        this.expLab.textFlow = new egret.HtmlTextParser().parser(expStar);
        var moneyStr = "<font color=0x04fe10>" + dataObj.money + "</font>" + "<font>/小时</font>";
        this.moneyLab.textFlow = new egret.HtmlTextParser().parser(moneyStr);
        if (dataObj.zhenqi) {
            var zhenqiStr = "<font color=0x04fe10>" + dataObj.zhenqi + "</font>" + "<font>/小时</font>";
            this.makiLab.textFlow = new egret.HtmlTextParser().parser(zhenqiStr);
            this.zhenqiGroup.visible = true;
        }
        else {
            this.zhenqiGroup.visible = false;
        }
        var levCount = parseInt(DataCenter.challengeNum.split("@@").shift());
        if (levCount === 3) {
            this.prompt.visible = false;
            this.challengeBtnGroup.visible = true;
        }
        else {
            this.prompt.visible = true;
            this.prompt.text = "在击杀" + (3 - levCount) + "波怪可挑战";
            this.challengeBtnGroup.visible = false;
        }
        this.bossName.text = dataObj.bossName;
        this.bossProgress.value = dataObj.progressValue;
        // this.arrayCollect.source = dataObj.dropData;
        this.dealWidthBossModule(dataObj.bossPath);
    };
    /**更新关卡面板前三排名数据 */
    View_level.prototype.refreshFirstRank = function (source) {
        this.rankCollect.source = source;
    };
    /**更新boss模型数据 */
    View_level.prototype.dealWidthBossModule = function (path) {
        this.bossMc.loadFile(path, true, -1, null, this);
        this.bossGroup.addChild(this.bossMc);
        this.bossMc.x = (this.bossGroup.width >> 1);
        this.bossMc.y = this.bossGroup.height - 20;
    };
    View_level.prototype.removeEvent = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        // this.dropList.removeEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this);
    };
    return View_level;
}(Base_view));
__reflect(View_level.prototype, "View_level");
//# sourceMappingURL=View_level.js.map