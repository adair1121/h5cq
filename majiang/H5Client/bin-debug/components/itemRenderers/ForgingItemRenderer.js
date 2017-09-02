var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ForgingItemRenderer = (function (_super) {
    __extends(ForgingItemRenderer, _super);
    function ForgingItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = "ForgingItemRenderer_skin";
        return _this;
    }
    ForgingItemRenderer.prototype.dataChanged = function () {
        this.equipImg.source = this.data.equipSource;
        if (this.data.equipIntensify) {
            this.equipIntensify.visible = true;
            this.equipIntensify.text = "+" + this.data.equipIntensify;
        }
        else {
            this.equipIntensify.visible = false;
        }
        if (this.data.boxS) {
            this.boxS.source = this.data.boxS;
        }
        else {
            this.boxS.source = "bag_1_box_png";
        }
        if (this.data.iName) {
            this.iName.visible = true;
            this.iName.text = this.data.iName;
        }
        else {
            this.iName.visible = false;
        }
        if (this.data.time) {
            this.time.text = GlobalFunc.formatTime(this.data.time, false);
        }
        // if(this.selected){
        // 	this.currentState="down";
        // }else{
        // 	this.currentState="up";
        // }
    };
    return ForgingItemRenderer;
}(eui.ItemRenderer));
__reflect(ForgingItemRenderer.prototype, "ForgingItemRenderer");
//# sourceMappingURL=ForgingItemRenderer.js.map