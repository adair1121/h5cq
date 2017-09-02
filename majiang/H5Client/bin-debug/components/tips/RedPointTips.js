var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RedPointTips = (function (_super) {
    __extends(RedPointTips, _super);
    function RedPointTips() {
        var _this = _super.call(this) || this;
        _this.tipsGather = {};
        return _this;
    }
    RedPointTips.prototype.childrenCreated = function () {
        var sp = new egret.Sprite();
        sp.graphics.beginFill(0xff0000, 1);
        sp.graphics.drawCircle(0, 0, 10);
        sp.graphics.endFill();
        this.addChild(sp);
        this.tipsGather = DataCenter.tips.tipsGather;
    };
    /**
     * 添加提示到显示容器
     */
    RedPointTips.prototype.addTipsToDis = function (display, positionX, positionY, type) {
        display.addChild(this);
        this.x = positionX;
        this.y = positionY;
        var obj = { display: display, px: positionX, py: positionY, tips: this };
        if (!this.tipsGather[type]) {
            this.tipsGather[type] = [];
        }
        this.tipsGather[type].push(obj);
    };
    /**
     * 移除提示
     */
    RedPointTips.prototype.removeTipsFromDis = function () {
        if (!!this.parent) {
            this.parent.removeChild(this);
        }
    };
    /**
     * 移除全部提示
     * @param single singleType {boolean string} {是否移除全部提示或者单条所有相关提示,移除单条类型}
     */
    RedPointTips.prototype.removeAllTips = function (single, singleType) {
        if (single === void 0) { single = true; }
        if (singleType === void 0) { singleType = ""; }
        if (single) {
            //移除单条所有相关提示
            if (!!this.tipsGather[singleType]) {
                var singleData = this.tipsGather[singleType];
                for (var i = 0; i < singleData.length; i++) {
                    var tips = singleData[i].tips;
                    tips.parent.removeChild(tips);
                }
            }
            else {
                throw new Error("移除的提示类型不存在。。");
            }
        }
        else {
            //移除全部提示
            for (var key in this.tipsGather) {
                var len = this.tipsGather[key].length;
                for (var j = 0; j < len; j++) {
                    var disp = this.tipsGather[key][i].tips;
                    tips.parent.removeChild(tips);
                }
            }
        }
    };
    return RedPointTips;
}(eui.Component));
__reflect(RedPointTips.prototype, "RedPointTips");
//# sourceMappingURL=RedPointTips.js.map