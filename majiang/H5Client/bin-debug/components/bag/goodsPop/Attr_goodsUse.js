var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Attr_goodsUse = (function (_super) {
    __extends(Attr_goodsUse, _super);
    function Attr_goodsUse() {
        var _this = _super.call(this) || this;
        _this.count = 1;
        _this.skinName = "Attr_goodsUse_skin";
        return _this;
    }
    Attr_goodsUse.prototype.childrenCreated = function () {
        Attr_goodsUse.m_height = this.height;
        this.useBtn.setAttr({ text: "使用" });
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    Attr_goodsUse.prototype.onTouchTap = function (evt) {
        switch (evt.target) {
            case this.reduceBtn:
                if (this.count <= 1) {
                    return;
                }
                this.count--;
                this.gridNum.text = this.count + "";
                break;
            case this.addBtn:
                if (this.count >= Attr_goodsUse._useMaxNum) {
                    return;
                }
                this.count++;
                this.gridNum.text = this.count + "";
                break;
            case this.useBtn.button:
                if (Attr_goodsUse._callBackFunc && Attr_goodsUse._callBakArg) {
                    Attr_goodsUse._callBackFunc.call(Attr_goodsUse._callBakArg, { num: this.count, templateId: Attr_goodsUse._templateId });
                }
                break;
        }
    };
    /**设置数量以及回调 */
    Attr_goodsUse.setData = function (dataObj) {
        Attr_goodsUse._useMaxNum = dataObj.num;
        Attr_goodsUse._callBackFunc = dataObj.callBackFunc;
        Attr_goodsUse._callBakArg = dataObj.arg;
        Attr_goodsUse._templateId = dataObj.templateId;
    };
    return Attr_goodsUse;
}(eui.ItemRenderer));
__reflect(Attr_goodsUse.prototype, "Attr_goodsUse");
//# sourceMappingURL=Attr_goodsUse.js.map