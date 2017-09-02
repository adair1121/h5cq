var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Role_select_item = (function (_super) {
    __extends(Role_select_item, _super);
    function Role_select_item() {
        var _this = _super.call(this) || this;
        _this.skinName = "Role_select_item_skin";
        return _this;
    }
    Role_select_item.prototype.dataChanged = function () {
        this.ifLocked.text = (this.data.ifLocked ? "已激活" : "未激活");
        this.jobName.text = this.data.jobName;
        // var img:eui.Image = new eui.Image();
        // img.source = this.data.source;
        // this.roleCom.addChild(img);
        // this.refreshRoleMode(this.data.rolePath,this.data.weaponPath);
    };
    /**更新角色模型 */
    Role_select_item.prototype.refreshRoleMode = function (roleModePath, roleWeaponPath) {
        if (roleModePath === void 0) { roleModePath = ""; }
        if (roleWeaponPath === void 0) { roleWeaponPath = ""; }
        this.weaponMc.loadFile(roleWeaponPath, true, -1, null, this);
        this.roleCom.addChild(this.weaponMc);
        this.roleMc.loadFile(roleModePath, true, -1, null, this);
        this.roleCom.addChild(this.roleMc);
        this.roleMc.x = (this.roleCom.width >> 1);
        this.roleMc.y = (this.roleCom.height >> 1) + 25;
        this.weaponMc.x = this.roleMc.x;
        this.weaponMc.y = this.roleMc.y;
    };
    return Role_select_item;
}(eui.ItemRenderer));
__reflect(Role_select_item.prototype, "Role_select_item");
//# sourceMappingURL=Role_select_item.js.map