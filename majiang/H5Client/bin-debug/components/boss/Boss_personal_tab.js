var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Boss_personal_tab = (function (_super) {
    __extends(Boss_personal_tab, _super);
    function Boss_personal_tab() {
        var _this = _super.call(this) || this;
        _this.skinName = "Boss_personal_skin";
        return _this;
    }
    Boss_personal_tab.prototype.childrenCreated = function () {
        this.collect = new eui.ArrayCollection();
        this.list.itemRenderer = Boss_personal_item;
        this.list.dataProvider = this.collect;
        this.scroller.viewport = this.list;
        // this.collect.source = [{bossId:201110001,bossIcon:"",dropIcon:["","",""],count:1}];
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this, false, 2);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this, false, 1);
    };
    Boss_personal_tab.prototype.onItemTap = function (evt) {
        var item = this.list.getChildAt(evt.itemIndex);
        this.curItemBtn = item.challengeBtn;
        this.itemData = evt.item;
    };
    Boss_personal_tab.prototype.setBossSource = function (source) {
        this.collect.source = source;
    };
    Boss_personal_tab.prototype.setBossItem = function (item, index) {
        this.collect.replaceItemAt(item, index);
        this.collect.refresh();
    };
    Boss_personal_tab.prototype.onTouchTap = function (evt) {
        switch (evt.target) {
            case this.removeBtn:
                this.remove();
                break;
            case this.curItemBtn:
                if (this.curItemBtn.currentState === "up") {
                    Global.dispatchEvent(MainNotify.CHALLENGE_PERSONAL_BOSS, this.itemData);
                }
                break;
        }
    };
    Boss_personal_tab.prototype.remove = function () {
        this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        if (this.parent && this.parent.contains(this)) {
            this.parent.removeChild(this);
        }
    };
    return Boss_personal_tab;
}(eui.Component));
__reflect(Boss_personal_tab.prototype, "Boss_personal_tab");
//# sourceMappingURL=Boss_personal_tab.js.map