var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MainUI_progress = (function (_super) {
    __extends(MainUI_progress, _super);
    function MainUI_progress() {
        var _this = _super.call(this) || this;
        _this.skinName = "MainUI_progress_skin";
        return _this;
    }
    Object.defineProperty(MainUI_progress.prototype, "curValue", {
        set: function (value) {
            this._curValue = value;
            this.label.text = this._curValue + "/" + this._totalValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MainUI_progress.prototype, "totalVale", {
        set: function (value) {
            this._totalValue = value;
            this.label.text = this._curValue + "/" + this._totalValue;
        },
        enumerable: true,
        configurable: true
    });
    return MainUI_progress;
}(eui.Component));
__reflect(MainUI_progress.prototype, "MainUI_progress");
//# sourceMappingURL=MainUI_progress.js.map