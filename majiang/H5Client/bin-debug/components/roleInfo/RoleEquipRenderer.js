var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RoleEquipRenderer = (function (_super) {
    __extends(RoleEquipRenderer, _super);
    function RoleEquipRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = "Role_equipItem_skin";
        return _this;
    }
    RoleEquipRenderer.prototype.dataChanged = function () {
        if (this.data.state) {
            this.stateName = "specialEquip";
            this.invalidateState();
        }
        else {
            this.stateName = "rect";
            this.invalidateState();
            this.showName.text = this.data.label;
            this.equipImg.source = this.data.equipSource;
            if (this.data.equipIntensify) {
                this.equipIntensify.visible = true;
                this.equipIntensify.text = this.data.equipIntensify;
            }
            else {
                this.equipIntensify.visible = false;
                this.equipIntensify.text = "0";
            }
            if (this.data.equipLv) {
                this.equipLv.visible = true;
                this.equipLv.text = this.data.equipLv;
            }
            else {
                this.equipLv.visible = false;
                this.equipLv.text = "0";
            }
            this.equipBox.source = GlobalFunc.setBgData(this.data.quality).boxS;
            if (this.data.attr) {
                var attr = this.data.attr;
                for (var key in attr) {
                    if (this.showName[key]) {
                        this.showName[key] = attr[key];
                    }
                }
            }
        }
    };
    RoleEquipRenderer.prototype.getCurrentState = function () {
        return this.stateName;
    };
    Object.defineProperty(RoleEquipRenderer.prototype, "r_state", {
        get: function () {
            return this.skin.currentState;
        },
        enumerable: true,
        configurable: true
    });
    return RoleEquipRenderer;
}(eui.ItemRenderer));
__reflect(RoleEquipRenderer.prototype, "RoleEquipRenderer");
//# sourceMappingURL=RoleEquipRenderer.js.map