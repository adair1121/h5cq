var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Rank_roleInfo_item = (function (_super) {
    __extends(Rank_roleInfo_item, _super);
    function Rank_roleInfo_item() {
        var _this = _super.call(this) || this;
        _this.skinName = "Rank_roleInfo_item_skin";
        return _this;
    }
    Rank_roleInfo_item.prototype.dataChanged = function () {
        this.stateName = this.data.state;
        this.vNum = this.data.vipNum;
        this.rankOrder.text = this.data.order + "";
        this.userName = this.data.uName;
        this.rankLabel = this.data.rankLabel;
        this.userLev = this.data.uLev;
        this.userFightValue = this.data.uFightValue;
        this.uLev.x = this.uName.x + this.uName.width + 12;
    };
    Rank_roleInfo_item.prototype.getCurrentState = function () {
        return this.stateName;
    };
    Object.defineProperty(Rank_roleInfo_item.prototype, "vNum", {
        set: function (value) {
            this.vipNum.text = value + "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rank_roleInfo_item.prototype, "userName", {
        set: function (value) {
            this.uName.text = value + "";
            this.uLev.x = this.uName.x + this.uName.width + 7;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rank_roleInfo_item.prototype, "userLev", {
        set: function (value) {
            this.uLev.text = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rank_roleInfo_item.prototype, "rankLabel", {
        set: function (value) {
            this.rank_value.text = value;
            this.uFightValue.x = this.rank_value.x + this.rank_value.width + 12;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rank_roleInfo_item.prototype, "stateName", {
        get: function () {
            return this.m_stateName;
        },
        set: function (value) {
            this.m_stateName = value;
            this.invalidateState();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rank_roleInfo_item.prototype, "userFightValue", {
        set: function (value) {
            if (value > 100000) {
                var num = (value / 100000).toFixed(1);
                var arr = num.split(".");
                var num2 = parseInt(arr[1]);
                arr[1] = num2 ? num2 + "" : "";
                var num3 = num2 ? arr.join(".") : arr[0];
                this.uFightValue.text = num3 + "万";
            }
            else {
                this.uFightValue.text = value + "";
            }
        },
        enumerable: true,
        configurable: true
    });
    return Rank_roleInfo_item;
}(eui.ItemRenderer));
__reflect(Rank_roleInfo_item.prototype, "Rank_roleInfo_item");
//# sourceMappingURL=Rank_roleInfo_item.js.map