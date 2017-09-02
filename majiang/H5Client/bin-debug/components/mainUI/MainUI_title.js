var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MainUI_title = (function (_super) {
    __extends(MainUI_title, _super);
    function MainUI_title() {
        var _this = _super.call(this) || this;
        _this.skinName = "MainUI_title_skin";
        return _this;
    }
    MainUI_title.prototype.refreshMoneyNum = function (value) {
        if (value > 100000) {
            var num = (value / 100000).toFixed(1);
            var arr = num.split(".");
            var num2 = parseInt(arr[1]);
            arr[1] = num2 ? num2 + "" : "";
            var num3 = num2 ? arr.join(".") : arr[0];
            this.money.text = num3 + "万";
        }
        else {
            this.money.text = value + "";
        }
    };
    MainUI_title.prototype.refreshUname = function (value) {
        this.roleName.text = value;
    };
    MainUI_title.prototype.refreshGoldNum = function (value) {
        if (value > 100000) {
            var num = (value / 100000).toFixed(1);
            var arr = num.split(".");
            var num2 = parseInt(arr[1]);
            arr[1] = num2 ? num2 + "" : "";
            var num3 = num2 ? arr.join(".") : arr[0];
            this.gold.text = num3 + "万";
        }
        else {
            this.gold.text = value + "";
        }
    };
    return MainUI_title;
}(eui.Component));
__reflect(MainUI_title.prototype, "MainUI_title");
//# sourceMappingURL=MainUI_title.js.map