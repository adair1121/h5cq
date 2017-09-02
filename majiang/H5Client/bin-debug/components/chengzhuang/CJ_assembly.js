var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CJ_assembly = (function (_super) {
    __extends(CJ_assembly, _super);
    function CJ_assembly() {
        var _this = _super.call(this) || this;
        _this.skinName = "CJ_assembly_skin";
        return _this;
    }
    CJ_assembly.prototype.childrenCreated = function () {
        this.equipCollect = new eui.ArrayCollection();
        this.equipList.itemRenderer = CJ_assembly_item;
        this.equipList.dataProvider = this.equipCollect;
        this.scroller.viewport = this.equipList;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this, false, 1);
        this.equipList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onEquipItemTap, this, false, 2);
    };
    CJ_assembly.prototype.setData = function (dataObj, callBack, arg) {
        this.equipCollect.source = dataObj.equipSource;
        this.otherItem.refreshOtherWay(dataObj.itemData, "获取装备");
        this.callBack = callBack;
        this.arg = arg;
    };
    CJ_assembly.prototype.refreshCJData = function (source) {
        this.equipCollect.source = source;
    };
    CJ_assembly.prototype.onTouchHandler = function (evt) {
        switch (evt.target) {
            case this.returnBtn:
                PopUpManager.removePopUp(this.skinName, 0);
                break;
            case (this.curEquipItem ? this.curEquipItem.assemblyBtn : 0):
                var obj = { job: this.curEquipItemData.job, insId: this.curEquipItemData.uid };
                if (this.callBack && this.arg) {
                    this.callBack.call(this.arg, obj);
                }
                break;
            default:
                break;
        }
    };
    CJ_assembly.prototype.onEquipItemTap = function (evt) {
        this.curEquipItem = this.equipList.getChildAt(evt.itemIndex);
        this.curEquipItemData = evt.item;
    };
    return CJ_assembly;
}(eui.Component));
__reflect(CJ_assembly.prototype, "CJ_assembly");
//# sourceMappingURL=CJ_assembly.js.map