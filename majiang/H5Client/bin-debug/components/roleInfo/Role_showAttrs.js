var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Role_showAttrs = (function (_super) {
    __extends(Role_showAttrs, _super);
    function Role_showAttrs() {
        var _this = _super.call(this) || this;
        _this.currentIndex = 0;
        _this.skinName = "Role_showAttrs_skin";
        return _this;
    }
    Role_showAttrs.prototype.childrenCreated = function () {
        this.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        this.btn_prev.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGroupTouchBegin, this);
        this.returnBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReturn, this);
        this.setBtnVisible();
        this.changeData();
    };
    Role_showAttrs.prototype.onGroupTouchBegin = function (event) {
        this.startX = event.stageX;
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onGroupTouchEnd, this);
    };
    Role_showAttrs.prototype.onGroupTouchEnd = function (event) {
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onGroupTouchEnd, this);
        if (Math.abs(event.stageX - this.startX) < 80) {
            return;
        }
        var isLeft = event.stageX > this.startX ? false : true;
        if (isLeft && this.currentIndex >= DataCenter.roleAttrsArr.length - 1) {
            return;
        }
        else if (!isLeft && this.currentIndex <= 0) {
            return;
        }
        if (this.currentIndex < 0) {
            this.currentIndex = 0;
        }
        if (this.currentIndex > DataCenter.roleAttrsArr.length - 1) {
            this.currentIndex = DataCenter.roleAttrsArr.length - 1;
        }
        this.moveData(isLeft);
        this.setBtnVisible();
    };
    Role_showAttrs.prototype.onReturn = function (evt) {
        PopUpManager.removePopUp(this.skinName, 0);
    };
    Role_showAttrs.prototype.onBtnClick = function (event) {
        var isLeft;
        switch (event.target) {
            case this.btn_next:
                this.currentIndex++;
                isLeft = true;
                break;
            case this.btn_next:
                this.currentIndex--;
                isLeft = false;
                break;
            default:
                break;
        }
        if (this.currentIndex < 0) {
            this.currentIndex = 0;
        }
        if (this.currentIndex > DataCenter.roleAttrsArr.length - 1) {
            this.currentIndex = DataCenter.roleAttrsArr.length - 1;
        }
        this.moveData(isLeft);
        this.setBtnVisible();
    };
    Role_showAttrs.prototype.setBtnVisible = function () {
        var num = DataCenter.roleAttrsArr.length;
        this.btn_next.visible = false;
        this.btn_prev.visible = false;
        this.btn_next.touchEnabled = false;
        this.btn_prev.touchEnabled = false;
        if (num > 1) {
            if (this.currentIndex > 0) {
                this.btn_prev.visible = true;
                this.btn_prev.touchEnabled = true;
            }
            else if (this.currentIndex < num - 1) {
                this.btn_next.visible = true;
                this.btn_next.touchEnabled = true;
            }
        }
    };
    Role_showAttrs.prototype.moveData = function (isLeft) {
        var _this = this;
        var toX;
        var fromX;
        var endX = 200;
        if (isLeft) {
            toX = 0;
            fromX = 400;
        }
        else {
            toX = 400;
            fromX = 0;
        }
        egret.Tween.get(this.attrs).to({ x: toX, alpha: 0 }, 500, egret.Ease.cubicIn).call(function () {
            _this.changeData();
            _this.attrs.x = fromX;
            egret.Tween.get(_this.attrs).to({ x: endX, alpha: 1 }, 500, egret.Ease.cubicOut).call(function () {
                egret.Tween.removeTweens(_this.attrs);
            }, _this);
        }, this);
    };
    Role_showAttrs.prototype.changeData = function () {
        this.currentRoleData = DataCenter.roleAttrsArr.get(DataCenter.roleList[this.currentIndex].job);
        this.img_title.source = "role_attr_title_" + this.currentRoleData.job + "_png";
        this.txt_hp.text = this.currentRoleData[data.RoleAttr.HP] + "";
        this.txt_mbChan.text = this.currentRoleData[data.RoleAttr.palsyRate] + "";
        this.txt_mbResi.text = this.currentRoleData[data.RoleAttr.resiPalsy] + "";
        this.txt_mdef.text = this.currentRoleData[data.RoleAttr.MDEF] + "";
        this.txt_mp.text = this.currentRoleData[data.RoleAttr.MP] + "";
        this.txt_resicritial.text = this.currentRoleData[data.RoleAttr.resicritial] + "";
        this.txt_drd.text = this.currentRoleData[data.RoleAttr.DRD] + "";
        this.txt_def.text = this.currentRoleData[data.RoleAttr.DEF] + "";
        this.txt_critial.text = this.currentRoleData[data.RoleAttr.critial] + "";
        this.txt_critcoe.text = this.currentRoleData[data.RoleAttr.critcoe] + "";
        this.txt_atk.text = this.currentRoleData[data.RoleAttr.ATK] + "";
    };
    return Role_showAttrs;
}(eui.Component));
__reflect(Role_showAttrs.prototype, "Role_showAttrs");
//# sourceMappingURL=Role_showAttrs.js.map