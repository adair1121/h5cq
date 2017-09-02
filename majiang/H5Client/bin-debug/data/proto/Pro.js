var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var proto;
(function (proto) {
    var Pro = (function () {
        //public cc:number;
        function Pro() {
            this.S = 0;
        }
        Pro.prototype.encode = function (by) {
        };
        Pro.prototype.decode = function (by) {
        };
        return Pro;
    }());
    proto.Pro = Pro;
    __reflect(Pro.prototype, "proto.Pro");
})(proto || (proto = {}));
//# sourceMappingURL=Pro.js.map