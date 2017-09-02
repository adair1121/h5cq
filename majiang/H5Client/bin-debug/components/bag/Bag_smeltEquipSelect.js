var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Bag_smeltEquipSelect = (function (_super) {
    __extends(Bag_smeltEquipSelect, _super);
    function Bag_smeltEquipSelect() {
        var _this = _super.call(this) || this;
        _this.equipSource = [];
        _this.selectNum = 0;
        _this.sourceArr = [];
        _this.skinName = "Bag_smeltEquipSelect_skin";
        return _this;
    }
    Bag_smeltEquipSelect.prototype.childrenCreated = function () {
        this.count.text = "0/9";
        this.sureBtn.label = "确定";
        this.arrayCollection = new eui.ArrayCollection();
        this.itemList.dataProvider = this.arrayCollection;
        this.itemList.itemRenderer = Smelt_selectItem;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.itemList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
        this.scroller.viewport = this.itemList;
        // eui.Binding.bindHandler(DataCenter,["bagData"],this.bagDataChange,this);
        eui.Binding.bindHandler(this, ["equipSource"], this.equipSourceChange, this);
        eui.Binding.bindHandler(Module_bag_smelt, ["source"], this.selectChange, this);
        eui.Binding.bindHandler(this, ["selectNum"], this.selectNumChange, this);
    };
    Bag_smeltEquipSelect.prototype.onTouchTap = function (evt) {
        switch (evt.target) {
            case this.sureBtn.button:
                this.closeView();
                this.sureHandler();
                break;
        }
    };
    Bag_smeltEquipSelect.prototype.onItemTap = function (evt) {
        var item = this.itemList.getChildAt(evt.itemIndex);
        if (!evt.item.selected) {
            if (this.selectNum < 9) {
                this.selectNum += 1;
                evt.item.selected = true;
                evt.item["isEmpty"] = false;
                item.checkSelect = true;
                if (this.selectNum >= 9) {
                    this.closeView();
                    this.sureHandler();
                }
            }
        }
        else {
            evt.item["isEmpty"] = true;
            this.selectNum -= 1;
            evt.item.selected = false;
            item.checkSelect = false;
        }
    };
    // private bagDataChange(value:any):void{
    // 	if(value.length){
    // 		this.dealWithBagData(value);
    // 	}
    // }
    Bag_smeltEquipSelect.prototype.equipSourceChange = function (value) {
        if (value) {
            this.refreshData(value);
        }
    };
    Bag_smeltEquipSelect.prototype.selectChange = function (value) {
        if (value.length) {
            this.dealWithBagData(value);
        }
    };
    Bag_smeltEquipSelect.prototype.selectNumChange = function (value) {
        this.count.text = value + "/9";
    };
    Bag_smeltEquipSelect.prototype.sureHandler = function () {
        this.initSmeltData();
        var data = this.itemList.dataProvider;
        var len = data.source.length;
        var source = data.source;
        var arr = [];
        for (var i = 0; i < len; i++) {
            if (source[i].selected) {
                var obj = {};
                var bgObj = this.setBagBgData(source[i].quality);
                obj.uid = source[i].uid;
                obj.job = source[i].job;
                obj.label = source[i].lev;
                obj.equipSource = source[i].imgSource;
                obj.num = source[i].num;
                obj.equipBoxSource = source[i].boxS;
                obj.isEmpty = source[i].isEmpty;
                arr.push(obj);
            }
        }
        for (var i = 0; i < arr.length; i++) {
            Module_bag_smelt.source[i] = arr[i];
        }
        DataCenter.bag.curSmeltGroup = Module_bag_smelt.source;
    };
    /**
     * 初始化熔炼装备数据
     */
    Bag_smeltEquipSelect.prototype.initSmeltData = function () {
        Module_bag_smelt.source = [];
        for (var i = 0; i < 9; i++) {
            var bgObj = this.setBagBgData(1);
            var obj = { equipBoxSource: bgObj.boxS, isEmpty: true };
            Module_bag_smelt.source.push(obj);
        }
    };
    Bag_smeltEquipSelect.prototype.dealWithBagData = function (value) {
        this.scroller.stopAnimation();
        this.scroller.validateNow();
        this.scroller.viewport.scrollV = 0;
        this.selectNum = 0;
        this.equipSource = [];
        var bag = Module_bag.equipSource;
        var curSmeltGroup = value;
        for (var i = 0; i < bag.length; i++) {
            var template = temple.TempleManager.select(parseInt(bag[i].TempleID));
            var itemType = template.itemtype1;
            var icon = template.icon;
            var bgObj = this.setBagBgData(bag[i].quality);
            var obj = {};
            obj.job = template.JOB;
            obj.iName = template.name;
            obj.lev = template.needlev;
            obj.boxS = bgObj.boxS;
            obj.itemName = template.name;
            obj.quality = bag[i].quality;
            obj.uid = bag[i].uid;
            obj.num = bag[i].num == 0 ? "" : bag[i].num;
            obj.cattr = bag[i].cattr;
            obj.extra = bag[i].extra;
            obj.imgSource = Config.path_equip + icon + ".png";
            for (var j = 0; j < curSmeltGroup.length; j++) {
                if (obj.uid === curSmeltGroup[j].uid) {
                    obj.selected = true;
                    this.selectNum += 1;
                    break;
                }
                else {
                    obj.selected = false;
                }
            }
            this.equipSource.push(obj);
        }
    };
    /**
     * 设置背包item背景数据
     */
    Bag_smeltEquipSelect.prototype.setBagBgData = function (quality) {
        var obj = {};
        if (quality != 1) {
            obj.boxS = "bag_" + quality + "_box_png";
        }
        else {
            obj.boxS = "bag_1_box_png";
        }
        return obj;
    };
    Bag_smeltEquipSelect.prototype.closeView = function () {
        PopUpManager.removePopUp(this.skinName, 0);
    };
    Bag_smeltEquipSelect.prototype.refreshData = function (source) {
        this.arrayCollection.source = source;
    };
    Bag_smeltEquipSelect.prototype.refreshSource = function () {
        var data = GlobalFunc.deepCopy(Module_bag_smelt.source);
        Module_bag_smelt.source = [];
        Module_bag_smelt.source = data;
    };
    return Bag_smeltEquipSelect;
}(eui.Component));
__reflect(Bag_smeltEquipSelect.prototype, "Bag_smeltEquipSelect");
//# sourceMappingURL=Bag_smeltEquipSelect.js.map