var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Mail_itemRenderer = (function (_super) {
    __extends(Mail_itemRenderer, _super);
    function Mail_itemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = "Mail_itemRenderer_skin";
        return _this;
    }
    Mail_itemRenderer.prototype.dataChanged = function () {
        var mailTemple = temple.TempleManager.select(this.data.mailTemplateId);
        if (this.data.mailState) {
            this.txt_read.text = "(已读)";
        }
        else {
            this.txt_read.text = "(未读)";
        }
        this.txt_title.text = mailTemple.title;
        this.txt_read.x = this.txt_title.x + this.txt_title.width + 10;
        this.txt_time.text = GlobalFunc.formatTime(this.data.sendTime);
    };
    return Mail_itemRenderer;
}(eui.ItemRenderer));
__reflect(Mail_itemRenderer.prototype, "Mail_itemRenderer");
//# sourceMappingURL=Mail_itemRenderer.js.map