var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AddGoodsNumCom = (function (_super) {
    __extends(AddGoodsNumCom, _super);
    function AddGoodsNumCom() {
        var _this = _super.call(this) || this;
        _this.m_minV = 1;
        _this.curValue = 1;
        _this.m_maxV = 0;
        _this.skinName = "AddGoodsNumComSkin";
        return _this;
    }
    AddGoodsNumCom.prototype.childrenCreated = function () {
        this.numLabel.text = this.m_minV + "";
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    AddGoodsNumCom.prototype.onTouchTap = function (evt) {
        switch (evt.target) {
            case this.jian:
                if (this.curValue <= 1) {
                    return;
                }
                this.curValue -= this.m_minV;
                break;
            case this.jia:
                this.curValue += this.m_minV;
                if (this.m_maxV) {
                    if (this.curValue >= this.m_maxV) {
                        this.curValue = this.m_maxV;
                        var obj = { type: TipsEnum.TYPE_WARN, label: "已达购买上限" };
                        PopTipsManager.showPopTips([obj]);
                    }
                }
                break;
            case this.jia10:
                this.curValue += 10;
                if (this.m_maxV) {
                    if (this.curValue >= this.m_maxV) {
                        this.curValue = this.m_maxV;
                        var obj = { type: TipsEnum.TYPE_WARN, label: "已达购买上限" };
                        PopTipsManager.showPopTips([obj]);
                    }
                }
                break;
            case this.jian10:
                if (this.curValue >= 10) {
                    this.curValue -= 10;
                    this.curValue = this.curValue ? this.curValue : 1;
                }
                else {
                    return;
                }
                break;
            default:
                this.curValue = this.curValue;
                break;
        }
        this.numLabel.text = this.curValue + "";
        Global.dispatchEvent(MainNotify.COSTCHANGE, { curValue: this.curValue });
    };
    Object.defineProperty(AddGoodsNumCom.prototype, "minValue", {
        set: function (value) {
            this.m_minV = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddGoodsNumCom.prototype, "maxValue", {
        set: function (value) {
            this.m_maxV = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddGoodsNumCom.prototype, "costNum", {
        get: function () {
            return this.curValue;
        },
        set: function (value) {
            this.numLabel.text = value + "";
            this.curValue = value;
        },
        enumerable: true,
        configurable: true
    });
    return AddGoodsNumCom;
}(eui.Component));
__reflect(AddGoodsNumCom.prototype, "AddGoodsNumCom");
//# sourceMappingURL=AddGoodsNumCom.js.map