var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MovieClip = (function (_super) {
    __extends(MovieClip, _super);
    //
    function MovieClip() {
        var _this = _super.call(this) || this;
        _this.jsonData = null;
        _this.visible = true;
        _this.touchEnabled = false,
            _this._mcFactory = new egret.MovieClipDataFactory;
        return _this;
    }
    MovieClip.prototype.loadFile = function (filename, autoplay, playcount, compFun, compArg) {
        if (autoplay === void 0) { autoplay = true; }
        if (playcount === void 0) { playcount = -1; }
        if (compFun === void 0) { compFun = null; }
        if (compArg === void 0) { compArg = null; }
        this._autoPlay = autoplay,
            this._playCount = playcount || -1,
            this._compFun = compFun,
            this._compArg = compArg,
            this._fileName = filename,
            this.jsonData = null,
            this.texture = null,
            this.visible = !0;
        RES.getResByUrl(this._fileName + ".json", function (t) {
            if (this._fileName == filename) {
                this.jsonData = t;
                this.createBody();
            }
        }, this, RES.ResourceItem.TYPE_JSON);
        RES.getResByUrl(this._fileName + ".png", function (t) {
            if (this._fileName == filename) {
                this.texture = t;
                this.createBody();
            }
        }, this, RES.ResourceItem.TYPE_IMAGE);
    };
    MovieClip.prototype.clearCache = function () {
        this._mcFactory.clearCache(),
            this.movieClipData = null,
            this.visible = !1,
            this.stop();
    };
    MovieClip.prototype.createBody = function () {
        if (this.jsonData && this.texture) {
            this._mcFactory.mcDataSet = this.jsonData,
                this._mcFactory.texture = this.texture;
            var e = this._fileName.split("/"), t = e.pop();
            this.movieClipData = this._mcFactory.generateMovieClipData(t),
                this._autoPlay && (this.gotoAndPlay(1, this._playCount),
                    this._playCount > 0 && (new TimerUtils).setTimeOut(this.playTime * this._playCount, this.playComp, this)),
                this.dispatchEventWith(egret.Event.CHANGE);
        }
    };
    MovieClip.prototype.startPlay = function (frame) {
        this.gotoAndPlay(frame, this._playCount),
            this._playCount > 0 && (new TimerUtils).setTimeOut(this.playTime * this._playCount, this.playComp, this);
    };
    MovieClip.prototype.playComp = function () {
        // this.parent.removeChild(this),
        this._compFun && this._compFun.call(this._compArg);
    };
    Object.defineProperty(MovieClip.prototype, "playTime", {
        get: function () {
            return this.movieClipData ? 1 / this.frameRate * this.totalFrames * 1e3 : 0;
        },
        enumerable: true,
        configurable: true
    });
    return MovieClip;
}(egret.MovieClip));
__reflect(MovieClip.prototype, "MovieClip");
//# sourceMappingURL=MovieClip.js.map