var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var data;
(function (data) {
    var GridrateTemple = (function (_super) {
        __extends(GridrateTemple, _super);
        function GridrateTemple(obj) {
            var _this = _super.call(this) || this;
            _super.prototype.init.call(_this, obj);
            return _this;
        }
        Object.defineProperty(GridrateTemple.prototype, "id", {
            /**
            * 环数
            */
            get: function () { return this.obj.id; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(GridrateTemple.prototype, "count", {
            /**
            * 格子数
            */
            get: function () { return this.obj.count; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(GridrateTemple.prototype, "gridlev", {
            /**
            * 可出现资源等级
            */
            get: function () { return this.obj.gridlev; },
            enumerable: true,
            configurable: true
        });
        ;
        return GridrateTemple;
    }(data.Temple));
    GridrateTemple.temples = [];
    data.GridrateTemple = GridrateTemple;
    __reflect(GridrateTemple.prototype, "data.GridrateTemple");
})(data || (data = {}));
//# sourceMappingURL=GridrateTemple.js.map