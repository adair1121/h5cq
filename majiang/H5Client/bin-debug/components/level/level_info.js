var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var level_info = (function (_super) {
    __extends(level_info, _super);
    function level_info() {
        var _this = _super.call(this) || this;
        _this.skinName = "level_info_skin";
        return _this;
    }
    Object.defineProperty(level_info.prototype, "levInfoState", {
        /**设置关卡信息皮肤状态 */
        set: function (skinState) {
            this.skinState = skinState;
            this.invalidateState();
        },
        enumerable: true,
        configurable: true
    });
    level_info.prototype.getCurrentState = function () {
        return this.skinState;
    };
    Object.defineProperty(level_info.prototype, "levName", {
        /**设置关卡信息名称 */
        set: function (name) {
            this.levelName.text = name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(level_info.prototype, "getMoney", {
        /**设置获得金钱能信息 */
        set: function (money) {
            this.levelMoney.text = money + "/小时";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(level_info.prototype, "getExp", {
        /**设置获得经验信息 */
        set: function (exp) {
            this.levelExp.text = exp + "/小时";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(level_info.prototype, "fDesc", {
        /**设置副本奖励信息 */
        set: function (cnt) {
            this.fubenDesc.text = cnt;
        },
        enumerable: true,
        configurable: true
    });
    return level_info;
}(eui.Component));
__reflect(level_info.prototype, "level_info");
//# sourceMappingURL=level_info.js.map