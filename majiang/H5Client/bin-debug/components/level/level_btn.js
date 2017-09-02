var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var level_btn = (function (_super) {
    __extends(level_btn, _super);
    function level_btn() {
        var _this = _super.call(this) || this;
        _this.clickState = false;
        _this.skinName = "level_btn_skin";
        return _this;
    }
    level_btn.prototype.childrenCreated = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    level_btn.prototype.onTouch = function (evt) {
        switch (evt.target) {
            case this.autoBtn:
                this.clickState = !this.clickState;
                if (this.clickState) {
                    this.autoBtn.currentState = "down";
                    Global.dispatchEvent(MainNotify.SENDTOSAUTOCHALLENGE, { type: 1 });
                }
                else {
                    this.autoBtn.currentState = "up";
                    Global.dispatchEvent(MainNotify.SENDTOSAUTOCHALLENGE, { type: 0 });
                }
                break;
            case this.levelIcon:
                Global.dispatchEvent(MainNotify.OPENCHALLENGEPANEL);
                break;
        }
    };
    Object.defineProperty(level_btn.prototype, "curValue", {
        /**设置当前挑战波数 */
        set: function (value) {
            this.progress.value = value;
            this.progress["numLabel"].text = value + "/3";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(level_btn.prototype, "curState", {
        /**设置当前自动挑战按钮状态 */
        set: function (value) {
            if (value) {
                this.clickState = true;
                this.autoBtn.currentState = "down";
            }
            else {
                this.clickState = false;
                this.autoBtn.currentState = "up";
            }
        },
        enumerable: true,
        configurable: true
    });
    return level_btn;
}(eui.Component));
__reflect(level_btn.prototype, "level_btn");
//# sourceMappingURL=level_btn.js.map