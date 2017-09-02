var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Friend_chat_item = (function (_super) {
    __extends(Friend_chat_item, _super);
    function Friend_chat_item() {
        var _this = _super.call(this) || this;
        _this.skinName = "Friend_chat_item_skin";
        return _this;
    }
    Friend_chat_item.prototype.dataChanged = function () {
        this.stateName = this.data.stateName;
        this.invalidateState();
        this.validateNow();
        this.icon.selected = false;
        // this.friendName.text = this.data.name;
        switch (this.stateName) {
            case "time":
                this.txt.text = this.getCurrentTime(this.data.timeSpan);
                break;
            case "Lchat":
            case "Rchat":
                this.txt.text = this.data.content;
                break;
        }
    };
    Friend_chat_item.prototype.getCurrentTime = function (timeSpan) {
        var time = "2017-06-02 16:35";
        var data = new Date(timeSpan * 1000);
        var nian = data.getFullYear() + "";
        var yue = data.getMonth() + 1 + "";
        var ri = data.getDate() + "";
        var shi = data.getHours() + "";
        var fen = data.getMinutes() + "";
        time = nian + "-" + ((yue.length > 1) ? yue : "0" + yue) + "-" + ((ri.length > 1) ? ri : "0" + ri) + " " + ((shi.length > 1) ? shi : "0" + shi) + ":" + ((fen.length > 1) ? fen : "0" + fen);
        return time;
    };
    Friend_chat_item.prototype.getCurrentState = function () {
        return this.stateName;
    };
    return Friend_chat_item;
}(eui.ItemRenderer));
__reflect(Friend_chat_item.prototype, "Friend_chat_item");
//# sourceMappingURL=Friend_chat_item.js.map