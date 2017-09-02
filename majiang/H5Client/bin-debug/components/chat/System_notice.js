var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var System_notice = (function (_super) {
    __extends(System_notice, _super);
    function System_notice() {
        var _this = _super.call(this) || this;
        _this.startState = false;
        _this.skinName = "System_notice_skin";
        return _this;
    }
    System_notice.prototype.childrenCreated = function () {
        this.rotationList = [];
        this.itemText = new egret.TextField();
        this.addChild(this.itemText);
        this.itemText.fontFamily = "Microsoft YaHei";
        this.itemText.size = 20;
        this.itemText.y = 8;
        this.visible = false;
    };
    /**设置公告轮循 */
    System_notice.prototype.setRotationList = function (source) {
        this.rotationList = source;
    };
    /**追加轮循item */
    System_notice.prototype.addItem = function (obj) {
        if (obj.type === 1) {
            //公告
            this.htmlTxt = "<font color=0xfca304>[公告]\t</font>" + "<font color=0xffffff>" + obj.content + "</font>";
        }
        else {
            //系统
            this.htmlTxt = "<font color=0xfc3434>[系统]\t</font>" + "<font color=0xffffff>" + obj.content + "</font>";
        }
        this.rotationList.push(this.htmlTxt);
    };
    /** 移除组件*/
    System_notice.prototype.removeComponent = function () {
        this.visible = false;
        this.startState = false;
        this.lunxunCount = 0;
        this.lunxunSpeed = 0;
        this.singleLunXunEnd = false;
        this.htmlTxt = "";
    };
    /**初始化组件*/
    System_notice.prototype.initComponent = function (singleCount, speed) {
        this.startState = true;
        this.lunxunCount = singleCount;
        this.lunxunSpeed = speed;
        this.visible = true;
        if (this.rotationList.length) {
            this.startLunxun();
        }
    };
    System_notice.prototype.startLunxun = function () {
        this.singleLunXunEnd = false;
        this.itemText.textFlow = (new egret.HtmlTextParser).parser(this.rotationList.shift());
        this.itemText.x = this.x + this.width + 10;
        egret.Tween.get(this.itemText).to({ x: -this.itemText.width }, this.lunxunSpeed).call(function () {
            this.itemText.x = this.x + this.width + 10;
            egret.Tween.removeTweens(this.itemText);
        }, this);
        for (var i = 0; i < this.lunxunCount - 1; i++) {
            var timeOut = egret.setTimeout(function () {
                egret.Tween.get(this.itemText).to({ x: -this.itemText.width }, this.lunxunSpeed).call(function () {
                    this.itemText.x = this.x + this.width + 10;
                    egret.Tween.removeTweens(this.itemText);
                    if (i >= this.lunxunCount - 1) {
                        this.singleLunXunEnd = true;
                        if (this.rotationList.length) {
                            this.startLunxun();
                        }
                        else {
                            this.removeComponent();
                        }
                    }
                }, this);
                egret.clearTimeout(timeOut);
            }, this, this.lunxunSpeed * (i + 1));
        }
    };
    return System_notice;
}(eui.Component));
__reflect(System_notice.prototype, "System_notice");
//# sourceMappingURL=System_notice.js.map