var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Secret_replace = (function (_super) {
    __extends(Secret_replace, _super);
    function Secret_replace() {
        var _this = _super.call(this) || this;
        _this.skinName = "Secret_replace_skin";
        return _this;
    }
    Secret_replace.prototype.childrenCreated = function () {
        this.replaceBtn.setAttr({ text: "置换", size: 20 });
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.secretGroup.touchEnabled = true;
        this.arrayCollection = new eui.ArrayCollection();
        this.itemList.dataProvider = this.arrayCollection;
        this.itemList.itemRenderer = CommonItem;
        this.scroller.viewport = this.itemList;
        this.secretSource = new eui.ArrayCollection();
        this.secretGroup.dataProvider = this.secretSource;
        this.secretGroup.itemRenderer = CommonItem;
        this.itemList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
        this.secretGroup.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onSecretItemTap, this);
        //测试
        this.testName = ["中级强力", "高级神佑", "中级必杀"];
        this.selectInfo([4, 5, 4]);
        this.initSecretBox();
    };
    Secret_replace.prototype.initSecretBox = function () {
        this.itemArr = [];
        for (var i = 0; i < 3; i++) {
            var bgd = GlobalFunc.setBgData(1);
            var obj = {
                isEmpty: 1,
                imgSource: "",
                boxS: bgd.boxS,
                index: i
            };
            this.itemArr.push(obj);
        }
        this.refreshSecretList();
    };
    Secret_replace.prototype.refreshSecretList = function () {
        this.secretSource.source = this.itemArr;
    };
    Secret_replace.prototype.selectInfo = function (idArr) {
        this.sourceArr = [];
        for (var i = 0; i < idArr.length; i++) {
            var bgd = GlobalFunc.setBgData(idArr[i]);
            var obj = {
                itemName: this.testName[i],
                imgSource: "",
                boxS: bgd.boxS,
                color: bgd.color
            };
            // var template = temple.TempleManager.select(idArr[i]);
            this.sourceArr.push(obj);
        }
        this.arrayCollection.source = this.sourceArr;
    };
    Secret_replace.prototype.refreshScrollerView = function (source) {
        this.arrayCollection.source = source;
    };
    Secret_replace.prototype.onTouchTap = function (evt) {
        switch (evt.target) {
            case this.closeBtn:
            case this.returnBtn:
                this.closeView();
                break;
            case this.replaceBtn:
                //置换
                break;
            default:
                break;
        }
    };
    Secret_replace.prototype.closeView = function () {
        PopUpManager.removePopUp(this.skinName, 0);
    };
    Secret_replace.prototype.onItemTap = function (evt) {
        var item = evt.item;
        for (var i = 0; i < 3; i++) {
            var obj = this.itemArr[i];
            if (obj.isEmpty) {
                // obj.imgSource = item.bgS;
                obj.isEmpty = 0;
                this.refreshSecretList();
                break;
            }
        }
    };
    Secret_replace.prototype.onSecretItemTap = function (evt) {
        var item = evt.item;
        if (!item.isEmpty) {
            this.itemArr[item.index].isEmpty = 1;
            this.itemArr[item.index].imgSource = "";
            this.refreshSecretList();
        }
    };
    return Secret_replace;
}(eui.Component));
__reflect(Secret_replace.prototype, "Secret_replace");
//# sourceMappingURL=Secret_replace.js.map