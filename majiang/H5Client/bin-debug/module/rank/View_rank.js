var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var View_rank = (function (_super) {
    __extends(View_rank, _super);
    function View_rank() {
        var _this = _super.call(this) || this;
        // private rankBtn:string[];
        _this.index = 0;
        _this.skinName = "View_rank_skin";
        return _this;
    }
    View_rank.prototype.childrenCreated = function () {
        // this.rankBtn = ["战力榜","等级榜","神翼榜","王者榜","遭遇榜","战圣榜","法神榜","道尊榜","神功榜"];
        this.curModule = this.module;
        this.wingMc = new MovieClip();
        this.weaponMc = new MovieClip();
        this.roleMc = new MovieClip();
        this.itemArr = new eui.ArrayCollection();
        this.itemList.itemRenderer = Rank_roleInfo_item;
        this.itemList.dataProvider = this.itemArr;
        this.scroller.viewport = this.itemList;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.roleModuleGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShowOtherPanel, this);
        this.itemList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
        this.rank_first.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShowOtherPanel, this);
        this.dealWithRankBtn();
        if (DataCenter.shipList.length) {
            var count = -1;
            for (var key in DataCenter.rankGather) {
                count++;
                if (parseInt(key) === this.index) {
                    break;
                }
            }
            var boo = DataCenter.shipList[count];
            boo ? this.refreshMoBaiBtnState("disabled") : this.refreshMoBaiBtnState("up");
        }
    };
    View_rank.prototype.dealWithRankBtn = function () {
        var rankData = DataCenter.rankGather;
        var num = 0;
        for (var key in rankData) {
            var btnLabel = DataCenter.rankData[key][0].name;
            var rankBtn = new Btn2();
            rankBtn.label = btnLabel;
            rankBtn.order = parseInt(key);
            this.btnGroup.addChild(rankBtn);
        }
        if (this.btnGroup.numChildren) {
            this.curBtn = this.btnGroup.getChildAt(0);
            this.index = this.curBtn.order;
            this.curBtn.currentState = "down";
        }
    };
    View_rank.prototype.onTouchTap = function (evt) {
        if (evt.target.parent instanceof Btn2) {
            this.index = evt.target.parent.order;
            // if(this.index === 3 || this.index === 4 || this.index === 8){
            // 	return;
            // }
            if (DataCenter.shipList.length) {
                var count = -1;
                for (var key in DataCenter.rankGather) {
                    count++;
                    if (parseInt(key) === this.index) {
                        break;
                    }
                }
                var boo = DataCenter.shipList[count];
                boo ? this.refreshMoBaiBtnState("disabled") : this.refreshMoBaiBtnState("up");
            }
            this.changeBtnState(evt.target.parent);
            this.curModule.getRankData({ type: this.index });
            return;
        }
        switch (evt.target) {
            case this.returnBtn:
                this.curModule.removeView();
                break;
            case this.worShipBtn:
                this.curModule.worShip(this.index);
                break;
            default:
                break;
        }
    };
    View_rank.prototype.refreshMoBaiBtnState = function (state) {
        if (state === "disabled") {
            this.worShipBtn.touchEnabled = false;
            this.worShipBtn.label = "已膜拜";
        }
        else {
            this.worShipBtn.touchEnabled = true;
            this.worShipBtn.label = "膜拜";
        }
        this.worShipBtn.currentState = state;
    };
    Object.defineProperty(View_rank.prototype, "worShipExp", {
        set: function (value) {
            var str = "";
            if (value > 10000) {
                str = (value / 10000).toFixed(1) + "万";
            }
            else {
                str = value + "";
            }
            this.getExp.text = str;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View_rank.prototype, "worShipMoney", {
        set: function (value) {
            var str = "";
            if (value > 10000) {
                str = (value / 10000).toFixed(1) + "万";
            }
            else {
                str = value + "";
            }
            this.getMoney.text = str;
        },
        enumerable: true,
        configurable: true
    });
    View_rank.prototype.onItemTap = function (evt) {
        this.curModule.getRankInfo(evt.item.playerId);
    };
    View_rank.prototype.onShowOtherPanel = function (evt) {
        this.curModule.getRankInfo(this.firstPlayerId);
    };
    /**更新角色模型 */
    View_rank.prototype.refreshRoleMode = function (roleModePath, roleWeaponPath) {
        if (roleModePath === void 0) { roleModePath = ""; }
        if (roleWeaponPath === void 0) { roleWeaponPath = ""; }
        this.weaponMc.loadFile(roleWeaponPath, true, -1, null, this);
        this.roleModuleGroup.addChild(this.weaponMc);
        this.roleMc.loadFile(roleModePath, true, -1, null, this);
        this.roleModuleGroup.addChild(this.roleMc);
        this.roleMc.x = (this.roleModuleGroup.width >> 1);
        this.roleMc.y = (this.roleModuleGroup.height >> 1) + 25;
        this.weaponMc.x = this.roleMc.x;
        this.weaponMc.y = this.roleMc.y;
    };
    /**更新翅膀模型 */
    View_rank.prototype.refreshWingMode = function (roleWingPath) {
        if (roleWingPath === void 0) { roleWingPath = ""; }
        this.wingMc.loadFile(roleWingPath, true, -1, null, this);
        this.roleWing.addChild(this.wingMc);
        this.wingMc.x = (this.roleWing.width >> 1);
        this.wingMc.y = (this.roleWing.height >> 1) + 25;
    };
    /**更新排行榜数据 */
    View_rank.prototype.refreshRankData = function (dataObj) {
        this.firstData = dataObj.shift();
        this.rank_first.userLev = this.firstData.uLev;
        this.rank_first.userName = this.firstData.uName;
        this.rank_first.userFightValue = this.firstData.uFightValue;
        this.rank_first.stateName = this.firstData.firstState;
        this.rank_first.rankLabel = this.firstData.rankLabel;
        this.firstPlayerId = this.firstData.playerId;
        this.itemArr.source = dataObj;
    };
    /**更新玩家当前排名 */
    View_rank.prototype.refreshCurRank = function (cnt) {
        this.playerRank.text = cnt;
    };
    View_rank.prototype.changeBtnState = function (button) {
        this.scroller.stopAnimation();
        this.scroller.viewport.scrollV = 0;
        this.curBtn.currentState = "up";
        this.curBtn = button;
        this.curBtn.currentState = "down";
    };
    View_rank.prototype.remove = function () {
        this.wingMc.gotoAndStop(0);
        this.wingMc = null;
        this.roleMc.gotoAndStop(0);
        this.roleMc = null;
        this.weaponMc.gotoAndStop(0);
        this.weaponMc = null;
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.rank_first.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onShowOtherPanel, this);
        this.itemList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
    };
    return View_rank;
}(Base_view));
__reflect(View_rank.prototype, "View_rank");
//# sourceMappingURL=View_rank.js.map