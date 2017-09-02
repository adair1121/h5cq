var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var RoleInfoVo = (function () {
    function RoleInfoVo() {
        /**
         * 职业
         */
        this.job = 0;
        /**
         * 性别
         */
        this.sex = 0;
        /**
         * 朝向
         */
        this.look = 0;
        /**
         * 初始所在行
         */
        this.row = 0;
        /**
         * 初始所在列
         */
        this.col = 0;
    }
    return RoleInfoVo;
}());
__reflect(RoleInfoVo.prototype, "RoleInfoVo");
//# sourceMappingURL=RoleInfoVo.js.map