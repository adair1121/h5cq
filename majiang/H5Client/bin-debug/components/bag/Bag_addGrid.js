var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Bag_addGrid = (function (_super) {
    __extends(Bag_addGrid, _super);
    function Bag_addGrid() {
        var _this = _super.call(this) || this;
        _this.curGridNum = 5;
        _this.maxNum = 0;
        _this.skinName = "Bag_addGrid_skin";
        return _this;
    }
    Bag_addGrid.prototype.childrenCreated = function () {
        this.initialize();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.touchEnabled = true;
        var template = temple.TempleManager.select(DataCenter.maxBoxBuyNum);
        this.maxNum = template.argument;
    };
    Bag_addGrid.prototype.initialize = function () {
        this.confireBtn.label = "确定";
        this.cancleBtn.label = "取消";
        this.refreshGridNum(this.curGridNum);
    };
    Bag_addGrid.prototype.onTouchTap = function (evt) {
        switch (evt.target) {
            case this.cancleBtn.button:
                this.removeView();
                break;
            case this.reduceBtn:
                if (this.curGridNum > 5) {
                    this.curGridNum -= 5;
                }
                this.refreshGridNum(this.curGridNum);
                break;
            case this.addBtn:
                if (this.curGridNum < this.maxNum) {
                    this.curGridNum += 5;
                }
                this.refreshGridNum(this.curGridNum);
                break;
            case this.confireBtn.button:
                this.sendMsgToServer();
                break;
            default:
                break;
        }
    };
    Bag_addGrid.prototype.removeView = function () {
        if (this && this.parent && this.parent.contains(this)) {
            this.curGridNum = 5;
            this.refreshGridNum(this.curGridNum);
            PopUpManager.removePopUp(this.skinName, 0);
        }
    };
    Bag_addGrid.prototype.refreshGridNum = function (num) {
        this.gridNum.text = num + "";
        this.cost.text = DataCenter.bagGridRelation[num];
    };
    Bag_addGrid.prototype.sendMsgToServer = function () {
        var attr = DataCenter.playerAttr;
        if (attr[data.PlayerAttr.gold] < this.curGridNum) {
            var obj = {
                type: TipsEnum.TYPE_WARN,
                group: [{ label: "元宝不足" }]
            };
            PopTipsManager.showPopTips([obj]);
            return;
        }
        else {
            Global.dispatchEvent(MainNotify.HANDSHAKE_ADDBOXNUM, { num: this.curGridNum });
            //测试使用
            // attr[data.PlayerAttr.gold] -= this.curGridNum;
            this.removeView();
        }
    };
    return Bag_addGrid;
}(eui.Component));
__reflect(Bag_addGrid.prototype, "Bag_addGrid");
//# sourceMappingURL=Bag_addGrid.js.map