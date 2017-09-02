var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SkillShowTab = (function (_super) {
    __extends(SkillShowTab, _super);
    function SkillShowTab(type) {
        var _this = _super.call(this) || this;
        _this.skinName = "SkillTab_skin";
        return _this;
    }
    SkillShowTab.prototype.childrenCreated = function () {
        this.skillSource = new eui.ArrayCollection();
        this.skillList.itemRenderer = RoleSkillItemRender;
        this.skillList.dataProvider = this.skillSource;
    };
    SkillShowTab.prototype.refreshSkillSource = function (value) {
        this.skillSource.source = value;
    };
    SkillShowTab.prototype.remove = function () {
    };
    return SkillShowTab;
}(eui.Component));
__reflect(SkillShowTab.prototype, "SkillShowTab");
//# sourceMappingURL=SkillShowTab.js.map