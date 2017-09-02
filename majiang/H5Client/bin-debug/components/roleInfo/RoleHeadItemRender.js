var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RoleHeadItemRender = (function (_super) {
    __extends(RoleHeadItemRender, _super);
    function RoleHeadItemRender() {
        var _this = _super.call(this) || this;
        _this.skinName = "Role_item_skin";
        return _this;
        // this.selected=false;
        // this.roleIconFocus.visible =false;
    }
    RoleHeadItemRender.prototype.dataChanged = function () {
        this.roleIcon.source = this.data.roleIcon;
        // this.roleIconFocus.visible = this.data.focus;
        // if(this.selected){
        // 	this.roleIconFocus.visible =true;
        // }else{
        // 	this.roleIconFocus.visible =false;
        // }
    };
    Object.defineProperty(RoleHeadItemRender.prototype, "source", {
        set: function (value) {
            this.roleIcon.source = value;
        },
        enumerable: true,
        configurable: true
    });
    return RoleHeadItemRender;
}(eui.ItemRenderer));
__reflect(RoleHeadItemRender.prototype, "RoleHeadItemRender");
//# sourceMappingURL=RoleHeadItemRender.js.map