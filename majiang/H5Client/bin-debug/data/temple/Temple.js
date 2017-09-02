var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var data;
(function (data) {
    var Temple = (function () {
        function Temple() {
        }
        Temple.prototype.init = function (o) {
            this.obj = o;
        };
        return Temple;
    }());
    data.Temple = Temple;
    __reflect(Temple.prototype, "data.Temple");
})(data || (data = {}));
//# sourceMappingURL=Temple.js.map