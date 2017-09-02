var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var lcp;
(function (lcp) {
    var ChangeEvent = (function (_super) {
        __extends(ChangeEvent, _super);
        function ChangeEvent(type, obj, bubbles, cancelable) {
            if (obj === void 0) { obj = null; }
            if (bubbles === void 0) { bubbles = false; }
            if (cancelable === void 0) { cancelable = false; }
            var _this = _super.call(this, type, bubbles, cancelable) || this;
            _this.CLASS_NAME = "ChangeEvent";
            if (obj) {
                _this._obj = obj;
            }
            return _this;
        }
        Object.defineProperty(ChangeEvent.prototype, "c_data", {
            get: function () {
                return this._obj;
            },
            enumerable: true,
            configurable: true
        });
        return ChangeEvent;
    }(egret.Event));
    lcp.ChangeEvent = ChangeEvent;
    __reflect(ChangeEvent.prototype, "lcp.ChangeEvent");
})(lcp || (lcp = {}));
//# sourceMappingURL=ChangeEvent.js.map