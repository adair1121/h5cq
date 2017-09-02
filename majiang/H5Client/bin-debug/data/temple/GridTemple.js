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
    var GridTemple = (function (_super) {
        __extends(GridTemple, _super);
        function GridTemple(obj) {
            var _this = _super.call(this) || this;
            _super.prototype.init.call(_this, obj);
            return _this;
        }
        Object.defineProperty(GridTemple.prototype, "ID", {
            /**
            * 类型ID
            */
            get: function () { return this.obj.ID; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(GridTemple.prototype, "icons", {
            /**
            * 地块图片列表
            */
            get: function () { return this.obj.icons; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(GridTemple.prototype, "lev", {
            /**
            * 资源等级
            */
            get: function () { return this.obj.lev; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(GridTemple.prototype, "name", {
            /**
            * 地块名称
            */
            get: function () { return this.obj.name; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(GridTemple.prototype, "rock", {
            /**
            * 系数金
            */
            get: function () { return this.obj.rock; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(GridTemple.prototype, "wood", {
            /**
            * 系数木
            */
            get: function () { return this.obj.wood; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(GridTemple.prototype, "water", {
            /**
            * 系数水
            */
            get: function () { return this.obj.water; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(GridTemple.prototype, "fire", {
            /**
            * 系数火
            */
            get: function () { return this.obj.fire; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(GridTemple.prototype, "clay", {
            /**
            * 系数土
            */
            get: function () { return this.obj.clay; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(GridTemple.prototype, "foglev", {
            /**
            * 迷雾等级
            */
            get: function () { return this.obj.foglev; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(GridTemple.prototype, "fograte", {
            /**
            * 迷雾出现概率
            */
            get: function () { return this.obj.fograte; },
            enumerable: true,
            configurable: true
        });
        ;
        return GridTemple;
    }(data.Temple));
    GridTemple.temples = [];
    data.GridTemple = GridTemple;
    __reflect(GridTemple.prototype, "data.GridTemple");
})(data || (data = {}));
//# sourceMappingURL=GridTemple.js.map