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
    var MonsterTemple = (function (_super) {
        __extends(MonsterTemple, _super);
        function MonsterTemple(obj) {
            var _this = _super.call(this) || this;
            _super.prototype.init.call(_this, obj);
            return _this;
        }
        Object.defineProperty(MonsterTemple.prototype, "ID", {
            /**
            * 编号
            */
            get: function () { return this.obj.ID; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(MonsterTemple.prototype, "name", {
            /**
            * 名字
            */
            get: function () { return this.obj.name; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(MonsterTemple.prototype, "map", {
            /**
            * 副本地图
            */
            get: function () { return this.obj.map; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(MonsterTemple.prototype, "lev", {
            /**
            * 等级
            */
            get: function () { return this.obj.lev; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(MonsterTemple.prototype, "model", {
            /**
            * 模型
            */
            get: function () { return this.obj.model; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(MonsterTemple.prototype, "ATK", {
            /**
            * 攻
            */
            get: function () { return this.obj.ATK; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(MonsterTemple.prototype, "DEF", {
            /**
            * 防
            */
            get: function () { return this.obj.DEF; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(MonsterTemple.prototype, "MHP", {
            /**
            * 血
            */
            get: function () { return this.obj.MHP; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(MonsterTemple.prototype, "HIT", {
            /**
            * 命中
            */
            get: function () { return this.obj.HIT; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(MonsterTemple.prototype, "DODGE", {
            /**
            * 闪避
            */
            get: function () { return this.obj.DODGE; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(MonsterTemple.prototype, "SPD", {
            /**
            * 速度
            */
            get: function () { return this.obj.SPD; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(MonsterTemple.prototype, "Weak", {
            /**
            * 弱点
            */
            get: function () { return this.obj.Weak; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(MonsterTemple.prototype, "resistance", {
            /**
            * 抵抗
            */
            get: function () { return this.obj.resistance; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(MonsterTemple.prototype, "string", {
            /**
            * 免疫技能
            */
            get: function () { return this.obj.string; },
            enumerable: true,
            configurable: true
        });
        ;
        return MonsterTemple;
    }(data.Temple));
    MonsterTemple.temples = [];
    data.MonsterTemple = MonsterTemple;
    __reflect(MonsterTemple.prototype, "data.MonsterTemple");
})(data || (data = {}));
//# sourceMappingURL=MonsterTemple.js.map