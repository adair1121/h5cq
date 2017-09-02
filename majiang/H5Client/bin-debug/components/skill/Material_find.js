var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Material_find = (function (_super) {
    __extends(Material_find, _super);
    function Material_find() {
        var _this = _super.call(this) || this;
        _this.skinName = "Material_find_skin";
        return _this;
    }
    Material_find.prototype.childrenCreated = function () {
        this.secret.iName = "秘籍";
        this.secret.itemName.textColor = 0xefbf00;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.arrayCollection = new eui.ArrayCollection();
        this.itemList.itemRenderer = Material_item;
        this.itemList.dataProvider = this.arrayCollection;
        this.refreshSource([{ icon: "bag_2_bg_png", itemWay: "王者争霸" }]);
        this.itemList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
    };
    Material_find.prototype.refreshSource = function (source) {
        this.arrayCollection.source = source;
    };
    Material_find.prototype.onItemTap = function (evt) {
        //测试
        var obj = [{ type: TipsEnum.TYPE_WARN, label: "活动尚未开启" }];
        PopTipsManager.showPopTips(obj);
    };
    Material_find.prototype.onTouchTap = function (evt) {
        switch (evt.target) {
            case this.closeBtn:
            case this.returnBtn:
                this.closeView();
                break;
        }
    };
    Material_find.prototype.closeView = function () {
        PopUpManager.removePopUp(this.skinName, 0);
    };
    return Material_find;
}(eui.Component));
__reflect(Material_find.prototype, "Material_find");
//# sourceMappingURL=Material_find.js.map