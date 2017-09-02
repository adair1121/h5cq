var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Pop_goodsInfo = (function (_super) {
    __extends(Pop_goodsInfo, _super);
    function Pop_goodsInfo() {
        var _this = _super.call(this) || this;
        _this.skinName = "Pop_goodsInfo_skin";
        _this.qualityColor = DataCenter.bag.qualityColor;
        _this.sourceArr = new eui.ArrayCollection();
        _this.attrGroup.dataProvider = _this.sourceArr;
        return _this;
    }
    Pop_goodsInfo.prototype.setGoodsPopInfo = function (obj) {
        this.goodsBoxSource.source = GlobalFunc.setBgData(obj.quality).boxS;
        this.goodsSource.source = obj.equipSource;
        this.itemName.text = obj.itemName;
        this.itemName.textColor = this.qualityColor[parseInt(obj.quality)];
        this.goodsNum.text = obj.num;
        this.level.text = obj.level;
        if (!obj.skinType && !obj.canUse) {
            //只是展示
            this.attrGroup.itemRenderer = Attr_goodsItem;
            this.sourceArr.source = obj.itemDesc;
            this.hWatcher = eui.Binding.bindHandler(Attr_goodsItem, ["m_height"], this.itemHeightChange, this);
        }
        else {
            //物品可使用
            Attr_goodsUse.setData({ num: obj.num, templateId: obj.TempleID, callBackFunc: this.callBackFunc, arg: this });
            this.attrGroup.itemRenderer = Attr_goodsUse;
            this.sourceArr.source = obj.itemDesc;
            this.hWatcher = eui.Binding.bindHandler(Attr_goodsUse, ["m_height"], this.itemHeightChange, this);
        }
    };
    Pop_goodsInfo.prototype.callBackFunc = function (data) {
        PopUpManager.removePopUp(this.skinName, 0);
        Global.dispatchEvent(MainNotify.USE_GOODS, { useCount: data.num, templateId: data.templateId });
    };
    Pop_goodsInfo.prototype.itemHeightChange = function (value) {
        if (value) {
            this.attrGroup.height = value;
            this.height = 150 + this.attrGroup.height;
            this.validateSize();
            this.attrGroup.validateSize();
        }
    };
    Pop_goodsInfo.prototype.initData = function () {
        if (this.hWatcher) {
            this.hWatcher.unwatch();
        }
        this.goodsSource.source = "";
        this.goodsBoxSource.source = "";
    };
    return Pop_goodsInfo;
}(eui.Component));
__reflect(Pop_goodsInfo.prototype, "Pop_goodsInfo");
//# sourceMappingURL=Pop_goodsInfo.js.map