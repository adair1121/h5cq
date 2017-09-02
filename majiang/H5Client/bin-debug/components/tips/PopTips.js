var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PopTips = (function (_super) {
    __extends(PopTips, _super);
    function PopTips(quality) {
        if (quality === void 0) { quality = 5; }
        var _this = _super.call(this) || this;
        _this.qualityColor = {};
        _this.w = 0;
        _this.moveObj = { y: 0 };
        _this.moveEnd = false;
        _this.STYLE_COLOR = "C";
        _this.STYLE_SIZE = "S";
        _this.qualityColor = DataCenter.bag.qualityColor;
        _this.curQualityColor = _this.qualityColor[quality];
        _this.skinName = "PopTips_skin";
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    PopTips.prototype.onAddToStage = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.watcher = eui.Binding.bindProperty(this.moveObj, ["y"], this, "y");
    };
    PopTips.prototype.getSingleTextFlow1 = function (e) {
        var t = e.split("&T:", 2);
        if (2 == t.length) {
            for (var i, n = "<font", r = t[0].split("&"), o = !1, s = 0, a = r.length; a > s; s++) {
                switch (i = r[s].split(":"), i[0]) {
                    case this.STYLE_SIZE:
                        n += ' size="' + parseInt(i[1]) + '"';
                        break;
                    case this.STYLE_COLOR:
                        n += ' color="' + parseInt(i[1]) + '"';
                        break;
                }
            }
            return n += o ? "><u>" + t[1] + "</u></font>" : ">" + t[1] + "</font>";
        }
        return "<font>" + e + "</font>";
    };
    PopTips.prototype.move = function (target, posY, callBackFunc, arg, index) {
        if (this.curTart != target) {
            this.curTart = target;
            egret.Tween.removeTweens(target);
            setTimeout(function () {
                egret.Tween.get(target).to({ alpha: 0 }, 500).call(function () {
                    egret.Tween.removeTweens(target);
                    target.parent.removeChild(target);
                    target.removeTips(target, callBackFunc, arg, index);
                });
            }, 1000);
        }
        egret.Tween.get(target.moveObj).to({ y: posY }, 500).call(function () {
            egret.Tween.removeTweens(target.moveObj);
        });
    };
    PopTips.prototype.removeTips = function (that, m_call, m_arg, m_index) {
        that.moveEnd = true;
        m_call.call(m_arg, { index: m_index });
    };
    PopTips.prototype.refreshAttr = function () {
        this.width = this.lab.width + 80;
        this.popTipsBg.width = this.width;
        this.x = (Config.w_width >> 1) - (this.width >> 1);
        this.y = (Config.w_height >> 1) - (this.height >> 1) - 80;
        this.moveObj.y = this.y;
    };
    Object.defineProperty(PopTips.prototype, "labelTxt", {
        set: function (value) {
            this._label = value;
            for (var t = value.split("|"), i = "", n = 0, r = t.length; r > n; n++) {
                i += this.getSingleTextFlow1(t[n]);
            }
            try {
                var content = (new egret.HtmlTextParser).parse(i);
            }
            catch (error) {
                console.log("错误的HTML输入");
                return;
            }
            this.lab.textFlow = content;
            this.refreshAttr();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PopTips.prototype, "label", {
        get: function () {
            return this._label;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 测试使用
     */
    PopTips.prototype.createBgSp = function (bg, w) {
        bg.graphics.clear();
        bg.graphics.beginFill(0x140E11, 0.4);
        bg.graphics.drawRect(0, 0, w, 24);
        bg.graphics.endFill();
    };
    return PopTips;
}(eui.Component));
__reflect(PopTips.prototype, "PopTips");
//# sourceMappingURL=PopTips.js.map