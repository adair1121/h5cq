var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PlayerBaseInfoVo = (function () {
    function PlayerBaseInfoVo() {
        /**
         * 元宝
         */
        this.ingots = 0;
        /**
         * vip等级
         */
        this.vip = 0;
    }
    return PlayerBaseInfoVo;
}());
__reflect(PlayerBaseInfoVo.prototype, "PlayerBaseInfoVo");
//# sourceMappingURL=PlayerBaseInfoVo.js.map