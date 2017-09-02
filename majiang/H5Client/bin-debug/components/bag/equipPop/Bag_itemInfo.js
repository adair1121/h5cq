var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Bag_itemInfo = (function (_super) {
    __extends(Bag_itemInfo, _super);
    function Bag_itemInfo() {
        var _this = _super.call(this) || this;
        _this.qualityColor = {};
        _this.valueArr = [];
        _this.skinName = "Bag_itemInfo_skin";
        _this.qualityColor = DataCenter.bag.qualityColor;
        _this.attrCollect = new eui.ArrayCollection();
        _this.attrGroup.itemRenderer = Bag_attrItem;
        _this.attrGroup.dataProvider = _this.attrCollect;
        return _this;
    }
    Bag_itemInfo.prototype.setData = function (obj) {
        this.valueArr = [];
        Bag_attrItem._h = "";
        this.job.text = GlobalFunc.getJobWord(obj.job);
        if (obj.equipPos.length) {
            this.position.text = GlobalFunc.getPositionWord(obj.equipPos[0]);
        }
        else {
            this.position.text = GlobalFunc.getPositionWord(obj.equipPos);
        }
        this.score.text = obj.point;
        this.level.text = obj.level;
        this.commonItem.bgBox = GlobalFunc.setBgData(obj.quality).boxS;
        this.commonItem.img = obj.equipSource;
        this.itemName.text = obj.itemName;
        this.power.text = obj.point;
        this.itemName.textColor = this.qualityColor[obj.quality];
        this.len = obj.attrSource.length;
        this.attrCollect.source = obj.attrSource;
        this.hWatcher = eui.Binding.bindHandler(Bag_attrItem, ["_h"], this.itemChange, this);
    };
    Bag_itemInfo.prototype.itemChange = function (value) {
        if (value) {
            var arr = value.split("@@");
            this.valueArr.push(parseInt[arr[0]]);
            if (this.valueArr.length > this.len) {
                this.valueArr.shift();
            }
            this.attrGroup.height = this.getSum(this.valueArr);
            this.height = this.attrGroup.height + 160;
        }
    };
    Bag_itemInfo.prototype.getSum = function (array) {
        var sum = 0;
        for (var i = 0; i < array.length; i++) {
            sum += parseInt(array[i]);
        }
        return sum;
    };
    Bag_itemInfo.prototype.initData = function () {
        this.hWatcher.unwatch();
        this.commonItem.bgBox = "";
        this.commonItem.img = "";
    };
    return Bag_itemInfo;
}(eui.Component));
__reflect(Bag_itemInfo.prototype, "Bag_itemInfo");
//# sourceMappingURL=Bag_itemInfo.js.map