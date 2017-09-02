var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MoviePool = (function () {
    function MoviePool() {
        this.dict = new Dictionary("MoviePool");
    }
    MoviePool.getInstance = function () {
        return MoviePool.instance ? MoviePool.instance : MoviePool.instance = new MoviePool();
    };
    /**
     * 从池中取出名为key的影片剪辑
     * @param key 影片剪辑的名字
     * @param allowClone 允许克隆
     */
    MoviePool.prototype.getMc = function (key, allowClone) {
        if (allowClone === void 0) { allowClone = false; }
        var mc;
        if (this.dict.hasKey(key)) {
            if (allowClone) {
                mc = this.createMc(key);
            }
            else {
                mc = this.dict.get(key);
            }
        }
        else {
            mc = this.createMc(key);
            this.dict.add(key, mc);
        }
        return mc;
    };
    MoviePool.prototype.createMc = function (name) {
        var data = RES.getRes(name + "_json");
        var texture = RES.getRes(name + "_png");
        // var data=await RES.getResAsync(name+"_json",null,null);
        // var texture=await RES.getResAsync(name+"_png",null,null);
        var mcFactory = new egret.MovieClipDataFactory(data, texture);
        var mc = new egret.MovieClip(mcFactory.generateMovieClipData(name));
        return mc;
    };
    return MoviePool;
}());
__reflect(MoviePool.prototype, "MoviePool");
//# sourceMappingURL=MoviePool.js.map