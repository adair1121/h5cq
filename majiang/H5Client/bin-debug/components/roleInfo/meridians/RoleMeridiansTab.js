var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RoleMeridiansTab = (function (_super) {
    __extends(RoleMeridiansTab, _super);
    function RoleMeridiansTab(type) {
        var _this = _super.call(this) || this;
        _this.btnState = 0;
        _this.skinName = "RoleMeridiansTab_skin";
        _this.m_type = type;
        if (type) {
            _this.costGroup.visible = false;
            _this.ptomoteBtn.visible = false;
        }
        else {
            _this.costGroup.visible = true;
            _this.ptomoteBtn.visible = true;
        }
        return _this;
    }
    RoleMeridiansTab.prototype.childrenCreated = function () {
        this.meritiansP = [];
        var len = this.pGroup.numChildren;
        for (var i = 0; i < len; i++) {
            var item = this.pGroup.getChildAt(i);
            this.meritiansP.push(item);
        }
        this.c_arrayCollect = new eui.ArrayCollection();
        this.n_arrayCollect = new eui.ArrayCollection();
        this.cAttrList.dataProvider = this.c_arrayCollect;
        this.nAttrList.dataProvider = this.n_arrayCollect;
        this.cAttrList.itemRenderer = Role_specialItem;
        this.nAttrList.itemRenderer = Role_specialItem;
        this.ptomoteBtn.label = "提升";
        this.ptomoteBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    RoleMeridiansTab.prototype.refreshData = function (data) {
        var cattr = data.cattr;
        var nattr = data.nattr;
        this.c_arrayCollect.source = data.cattr;
        this.n_arrayCollect.source = data.nattr;
        this.num.text = data.num + "/" + data.cost;
        this.fightValue.text = data.fightValue + "";
        this.changeValue = data.changeValue;
        if (this.clickState) {
            this.clickState = false;
            GlobalFunc.showPowerUpTips(data.fightValue, [this.changeValue]);
        }
        if (data.rank < 10) {
            this.rank.text = data.rank + "c";
        }
        else {
            this.rank.text = "sc";
        }
        if (!this.m_type) {
            if (data.lev < 10) {
                this.ptomoteBtn.label = "提升";
                this.costGroup.visible = true;
                this.upLevLab.text = "";
                this.btnState = 0;
            }
            else {
                this.ptomoteBtn.label = "升阶";
                this.costGroup.visible = false;
                this.upLevLab.text = "免费升阶";
                this.btnState = 1;
            }
        }
        this.refreshSatr(data.lev);
        this.refreshTextColor(data.num);
    };
    RoleMeridiansTab.prototype.refreshSatr = function (starNum) {
        this.initLine();
        if (starNum < 2 && starNum >= 1) {
            var item = this.pGroup.getChildAt(0);
            item.source = "point_select_png";
            return;
        }
        var arr = [];
        for (var i = 0; i < starNum; i++) {
            var item = this.pGroup.getChildAt(i);
            item.source = "point_select_png";
            var p = new egret.Point(item.x, item.y);
            arr.push(p);
        }
        for (var j = 0; j < arr.length; j++) {
            if (arr[j + 1]) {
                var p1 = arr[j];
                var p2 = arr[j + 1];
                this.createLine(p1, p2);
            }
        }
    };
    RoleMeridiansTab.prototype.initLine = function () {
        var len = this.pGroup.numChildren;
        for (var i = 0; i < len; i++) {
            var item = this.pGroup.getChildAt(i);
            item.source = "point_un_select_png";
        }
        this.lineGroup.removeChildren();
    };
    RoleMeridiansTab.prototype.onTouchTap = function (evt) {
        switch (evt.target) {
            case this.ptomoteBtn.button:
                if (this.btnState) {
                    //免费升阶
                    Global.dispatchEvent(MainNotify.JINGMAIUP, { type: 2 });
                }
                else {
                    Global.dispatchEvent(MainNotify.JINGMAIUP, { type: 1 });
                }
                this.clickState = true;
                break;
            default:
                break;
        }
    };
    RoleMeridiansTab.prototype.remove = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    RoleMeridiansTab.prototype.createLine = function (mp, lp) {
        var sp = new egret.Sprite();
        this.lineGroup.addChild(sp);
        sp.graphics.clear();
        sp.graphics.lineStyle(3, 0x69c1ff);
        sp.graphics.moveTo(mp.x, mp.y);
        sp.graphics.lineTo(lp.x, lp.y);
        sp.graphics.endFill();
    };
    RoleMeridiansTab.prototype.refreshTextColor = function (num) {
        if (num < 10) {
            this.num.textColor = 0xfc3434;
        }
        else {
            this.num.textColor = 0xE6D8B3;
        }
    };
    return RoleMeridiansTab;
}(eui.Component));
__reflect(RoleMeridiansTab.prototype, "RoleMeridiansTab");
//# sourceMappingURL=RoleMeridiansTab.js.map