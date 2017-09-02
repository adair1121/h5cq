var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var View_map_bg = (function (_super) {
    __extends(View_map_bg, _super);
    function View_map_bg() {
        return _super.call(this) || this;
    }
    /**
     * 加载地图
     * @param mx 地图显示中心的列索引
     * @param my 地图显示中心的行索引
     */
    View_map_bg.prototype.mapload = function (path, gx, gy) {
        if (gx === void 0) { gx = 0; }
        if (gy === void 0) { gy = 0; }
        this.curMapName = path;
        this.destroy(gx, gy);
        var p = PosUtils.gridToMapGrid(gx, gy);
        this.curMx = p.x;
        this.curMy = p.y;
        this.createMapArr(p.x, p.y);
        // console.log(111111111, this.curMx, this.curMy);
    };
    /**
     * 生成地图数组
     */
    View_map_bg.prototype.createMapArr = function (mx, my) {
        if (mx === void 0) { mx = 0; }
        if (my === void 0) { my = 0; }
        var minX = mx - 2;
        var minY = my - 2;
        var maxX = mx + 2;
        var maxY = my + 2;
        for (var j = minX; maxX >= j; j++) {
            for (var i = minY; maxY >= i; i++) {
                if (i >= 0 && j >= 0) {
                    var path = "resource/assets/map/" + this.curMapName + "/" + j + "_" + i + ".jpg";
                    var block = new MapBlock(path, j, i);
                    this.mapBlockArr.push(block);
                    this.mapCon.addChild(block);
                    block.x = i * 256 + 128;
                    block.y = j * 256 + 128;
                }
            }
        }
    };
    View_map_bg.prototype.destroy = function (gx, gy) {
        if (gx === void 0) { gx = 0; }
        if (gy === void 0) { gy = 0; }
        if (this.mapCon) {
            this.mapCon.removeChildren();
            this.mapCon = null;
            this.mapBlockArr = null;
        }
        this.mapCon = new egret.Sprite();
        this.addChild(this.mapCon);
        // var p=PosUtils.gridToPixel(gx,gy);
        // this.mapCon.x=p.x;
        // this.mapCon.y=p.y;
        this.mapBlockArr = [];
    };
    /**检测地图格子是否需要更新 */
    View_map_bg.prototype.checkGridHasUpdate = function (gx, gy) {
        var p = PosUtils.gridToMapGrid(gx, gy);
        if (this.curMx == p.x && this.curMy == p.y) {
            return;
        }
        else {
            // var _x=this.curMx+(p.x-this.curMx)*3;
            // var _y=this.curMy+(p.y-this.curMy)*2;
            for (var j = p.x - 2; p.x + 2 >= j; j++) {
                for (var i = p.y - 2; p.y + 2 >= i; i++) {
                    if ((this.curMx - 2 <= j && j <= this.curMx + 2) && (this.curMy - 1 <= i && i <= this.curMy + 1)) {
                        continue;
                    }
                    if (i >= 0 && j >= 0) {
                        var path = "resource/assets/map/" + this.curMapName + "/" + j + "_" + i + ".jpg";
                        var block = new MapBlock(path, j, i);
                        this.mapBlockArr.push(block);
                        this.mapCon.addChild(block);
                        block.x = i * 256 + 128;
                        block.y = j * 256 + 128;
                    }
                }
            }
        }
        this.curMx = p.x;
        this.curMy = p.y;
        for (var k = 0; this.mapBlockArr.length > k; k++) {
            var block = this.mapBlockArr[k];
            if (block.mx < p.x - 2 || block.mx > p.x + 2 || block.my < p.y - 2 || block.my > p.y + 2) {
                this.mapCon.removeChild(block);
                this.mapBlockArr.splice(k, 1);
            }
        }
    };
    return View_map_bg;
}(egret.Sprite));
__reflect(View_map_bg.prototype, "View_map_bg");
var MapBlock = (function (_super) {
    __extends(MapBlock, _super);
    function MapBlock(path, mx, my) {
        var _this = _super.call(this) || this;
        _this.mx = mx;
        _this.my = my;
        _this.initView(path);
        return _this;
    }
    MapBlock.prototype.initView = function (path) {
        var _this = this;
        RES.getResByUrl(path, function (texture) {
            var bmp = new egret.Bitmap(texture);
            _this.addChild(bmp);
            bmp.x = -128;
            bmp.y = -128;
        }, this, RES.ResourceItem.TYPE_IMAGE);
    };
    Object.defineProperty(MapBlock.prototype, "my", {
        get: function () { return this._my; },
        set: function (v) { this._my = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapBlock.prototype, "mx", {
        get: function () { return this._mx; },
        set: function (v) { this._mx = v; },
        enumerable: true,
        configurable: true
    });
    return MapBlock;
}(egret.Sprite));
__reflect(MapBlock.prototype, "MapBlock");
//# sourceMappingURL=View_map_bg.js.map