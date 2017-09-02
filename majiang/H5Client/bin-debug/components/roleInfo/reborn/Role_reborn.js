var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Role_reborn = (function (_super) {
    __extends(Role_reborn, _super);
    function Role_reborn(type) {
        var _this = _super.call(this) || this;
        _this.value = 0;
        _this.skinName = "Role_reborn_skin";
        return _this;
    }
    Role_reborn.prototype.childrenCreated = function () {
        this.addItem = [];
        this.btn_upgrade.label = "提升";
        this.role_getXw = new Role_getXw();
        this.cAttrList.itemRenderer = Role_specialItem;
        this.nextAttrList.itemRenderer = Role_specialItem;
        this.c_arryCollect = new eui.ArrayCollection();
        this.n_arrayCollect = new eui.ArrayCollection();
        this.cAttrList.dataProvider = this.c_arryCollect;
        this.nextAttrList.dataProvider = this.n_arrayCollect;
        this.layer = ViewController.getInstance().getContainer().layer_popup;
        this.getXW.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGetXw, this);
        this.watcher = eui.Binding.bindHandler(DataCenter.playerAttr, [data.PlayerAttr.xiuwei + ""], this.xiuweiChange, this);
        this.btn_upgrade.button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    Role_reborn.prototype.xiuweiChange = function (value) {
        this.txt_hadXw.text = value + "";
    };
    Role_reborn.prototype.onGetXw = function (evt) {
        this.role_getXw.setGoodsTemple(this.addItem);
        PopUpManager.addPopUp(this.role_getXw, true, this.role_getXw.skinName, this.layer, 0);
        PopUpManager.startClickHidden(this.role_getXw.skinName, this.callBackFunc, this);
    };
    Role_reborn.prototype.callBackFunc = function () {
        PopUpManager.removePopUp(this.role_getXw.skinName, 0);
    };
    Role_reborn.prototype.refreshRebornData = function (data) {
        this.c_arryCollect.source = data.cAttr;
        this.n_arrayCollect.source = data.nAttr;
        this.addItem = data.addItem;
        this.rebornLev.text = data.reLev + "转";
        this.txt_needXw.text = data.reExp;
        this.n_xiuwei = parseInt(data.reExp);
        this.ifTop = data.rebornLev;
        this.fightValue.text = data.fightValue + "";
        this.value = data.changeValue;
        if (this.clickState) {
            GlobalFunc.showPowerUpTips(data.fightValue, [this.value]);
            this.clickState = false;
        }
    };
    Role_reborn.prototype.onTouchTap = function (evt) {
        var c_xiuwei = DataCenter.playerAttr[data.PlayerAttr.xiuwei];
        if (this.ifTop) {
            var obj = [{ type: TipsEnum.TYPE_WARN, label: "转生已达到顶级" }];
            PopTipsManager.showPopTips(obj);
            return;
        }
        if (this.n_xiuwei <= c_xiuwei) {
            this.clickState = true;
            Global.dispatchEvent(MainNotify.REBORN);
        }
        else {
            var obj = [{ type: TipsEnum.TYPE_WARN, label: "修为不足" }];
            PopTipsManager.showPopTips(obj);
        }
    };
    Role_reborn.prototype.remove = function () {
        this.btn_upgrade.button.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.watcher.unwatch();
    };
    return Role_reborn;
}(eui.Component));
__reflect(Role_reborn.prototype, "Role_reborn");
//# sourceMappingURL=Role_reborn.js.map