var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Way_other_item = (function (_super) {
    __extends(Way_other_item, _super);
    function Way_other_item() {
        var _this = _super.call(this) || this;
        _this.skinName = "Way_other_item_skin";
        return _this;
    }
    Way_other_item.prototype.childrenCreated = function () {
        this.arrayCollect = new eui.ArrayCollection;
        this.list.itemRenderer = Material_item;
        this.list.dataProvider = this.arrayCollect;
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
    };
    Way_other_item.prototype.refreshOtherWay = function (source, title) {
        if (title === void 0) { title = "其它途径"; }
        this.arrayCollect.source = source;
        this.list.height = source.length * Material_item.m_height;
        this.height = this.list.height + 57;
        this.title.text = title;
    };
    Way_other_item.prototype.onItemTap = function (evt) {
        var obj = [{ type: TipsEnum.TYPE_WARN, label: "敬请期待" }];
        PopTipsManager.showPopTips(obj);
    };
    return Way_other_item;
}(eui.Component));
__reflect(Way_other_item.prototype, "Way_other_item");
//# sourceMappingURL=Way_other_item.js.map