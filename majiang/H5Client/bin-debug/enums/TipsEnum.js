var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TipsEnum = (function () {
    function TipsEnum() {
    }
    return TipsEnum;
}());
TipsEnum.TYPE_EQUIP = 0;
TipsEnum.TYPE_WARN = 1;
TipsEnum.TYPE_GOLD = 3;
TipsEnum.TYPE_EXPERIENCE = 4;
TipsEnum.TYPE_DEFAULT = 5;
__reflect(TipsEnum.prototype, "TipsEnum");
var ColorTipsEnum = (function () {
    function ColorTipsEnum() {
    }
    return ColorTipsEnum;
}());
/**提示 */
ColorTipsEnum.COLOR_WARN = "C:0xFF0a00&T:";
/**金币获得 */
ColorTipsEnum.COLOR_GOLD = "C:0xfff843&T:";
/**经验获得 */
ColorTipsEnum.COLOR_EXPERIENCE = "C:0x36de00&T:";
/**默认 */
ColorTipsEnum.COLOR_DEFAULT = "C:0xffffff&T:";
__reflect(ColorTipsEnum.prototype, "ColorTipsEnum");
//# sourceMappingURL=TipsEnum.js.map