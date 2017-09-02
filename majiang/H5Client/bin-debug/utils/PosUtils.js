var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PosUtils = (function () {
    function PosUtils() {
    }
    /**
     * 网格坐标转像素坐标
     * @param gx x坐标
     * @param gy y坐标
     * @return egret.point 实际像素点
     */
    PosUtils.gridToPixel = function (gx, gy) {
        return new egret.Point(gx * 60 + 30, gy * 40 + 20);
    };
    /**
     * 像素坐标转网格坐标
     * @param px x坐标
     * @param py y坐标
     * @return egret.point 网格坐标点
     */
    PosUtils.pixelToGrid = function (px, py) {
        return new egret.Point(Math.floor((px - 30) / 60), Math.floor((py - 20) / 40));
    };
    /**
     * 网格坐标转地图格子
     * @param gx x坐标
     * @param gy y坐标
     * @return egret.point 地图格子点
     */
    PosUtils.gridToMapGrid = function (gx, gy) {
        var p = PosUtils.gridToPixel(gx, gy);
        var mx = Math.floor(p.y / 256);
        var my = Math.floor(p.x / 256);
        return new egret.Point(mx, my);
    };
    /**
     * 获取朝向
     */
    PosUtils.getLook = function (sx, sy, ex, ey) {
        var x = ex - sx;
        var y = ey - sy;
        if (x < 0) {
            if (y < 0) {
                return 8;
            }
            else if (y = 0) {
                return 7;
            }
            else {
                return 6;
            }
        }
        else if (x = 0) {
            if (y < 0) {
                return 1;
            }
            else if (y = 0) {
                return 0;
            }
            else {
                return 5;
            }
        }
        else {
            if (y < 0) {
                return 2;
            }
            else if (y = 0) {
                return 3;
            }
            else {
                return 4;
            }
        }
    };
    return PosUtils;
}());
__reflect(PosUtils.prototype, "PosUtils");
//# sourceMappingURL=PosUtils.js.map