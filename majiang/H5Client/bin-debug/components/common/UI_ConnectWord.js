var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_ConnectWord = (function (_super) {
    __extends(UI_ConnectWord, _super);
    function UI_ConnectWord() {
        return _super.call(this) || this;
    }
    UI_ConnectWord.prototype.createChildren = function () {
        // this.text.textFlow=[null]
        this.textFlow = new Array({ text: this.text, style: { "href": "event:text event triggered", underline: true } });
    };
    UI_ConnectWord.prototype.childrenCreated = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    UI_ConnectWord.prototype.onClick = function (event) {
        if (this.clickFunc) {
            this.clickFunc.call(this.clickArg, this.clickData);
        }
    };
    UI_ConnectWord.prototype.setClickFunction = function (clickFunc, clickArg, clickData) {
        if (clickArg === void 0) { clickArg = null; }
        if (clickData === void 0) { clickData = null; }
        this.clickFunc = clickFunc;
        this.clickArg = clickArg;
        this.clickData = clickData;
    };
    Object.defineProperty(UI_ConnectWord.prototype, "myText", {
        set: function (value) {
            this.textFlow = new Array({ text: value, style: { "href": "event:text event triggered", underline: true } });
        },
        enumerable: true,
        configurable: true
    });
    return UI_ConnectWord;
}(eui.Label));
__reflect(UI_ConnectWord.prototype, "UI_ConnectWord", ["eui.UIComponent", "egret.DisplayObject", "eui.IDisplayText"]);
//# sourceMappingURL=UI_ConnectWord.js.map