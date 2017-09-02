var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Secret_book = (function (_super) {
    __extends(Secret_book, _super);
    function Secret_book() {
        var _this = _super.call(this) || this;
        _this.skinName = "Secret_book_skin";
        return _this;
    }
    Secret_book.prototype.childrenCreated = function () {
        this.touchEnabled = true;
        this.materialFind = new Material_find();
        this.startBtn.setAttr({ text: "学习" });
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.arrayCollection = new eui.ArrayCollection();
        this.itemList.dataProvider = this.arrayCollection;
        this.itemList.itemRenderer = CommonItem;
        this.scroller.viewport = this.itemList;
        this.itemList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
        this.moduleLink.textFlow = (new egret.HtmlTextParser).parser('<font color="#9BF707" size="14" fontFamily="SimHei"><u>通过王者争霸玩法获得</u></font>');
        this.getWayLinkBtn.textFlow = (new egret.HtmlTextParser).parser('<font color="#9BF707" size="16" fontFamily="SimHei"><u>获得途径</u></font>');
        //测试
        this.testName = ["中级健体", "中级强力", "中级防御", "中级暴击", "中级免伤", "中级必杀", "中级穿透", "中级反伤", "中级偷袭", "中级神佑",
            "中级死咒", "中级再生", "高级健体", "高级强力", "高级防御", "高级暴击", "高级免伤", "高级必杀", "高级穿透", "高级反伤",
            "高级偷袭", "高级神佑", "高级死咒", "高级再生"];
        //
        eui.Binding.bindHandler(DataCenter, ["secretBook"], this.onBookChange, this);
    };
    Secret_book.prototype.onBookChange = function (value) {
        if (value) {
            this.selectInfo(value);
        }
    };
    Secret_book.prototype.onTouchTap = function (evt) {
        switch (evt.target) {
            case this.returnBtn:
            case this.closeBtn:
                this.closeView();
                break;
            case this.moduleLink:
            case this.getWayLinkBtn:
                //获得途径
                this.openMaterialFind();
                break;
            case this.startBtn.button:
                //学习秘籍
                break;
            default:
                break;
        }
    };
    /**打开材料获取界面 */
    Secret_book.prototype.openMaterialFind = function () {
        this.closeView();
        var layer = ViewController.getInstance().getContainer().layer_popup;
        PopUpManager.addPopUp(this.materialFind, true, this.materialFind.skinName, layer, 0);
    };
    Secret_book.prototype.onItemTap = function (evt) {
        this.setDesc(evt.item);
    };
    Secret_book.prototype.setDesc = function (descObj) {
        this.bookScore.text = descObj.score;
        this.bookName.text = descObj.itemName;
        this.bookName.textColor = descObj.color;
        this.bookDesc.text = descObj.desc;
        this.bookDesc.textColor = 0xefbf00;
        this.bookItem.bgBox = descObj.boxS;
        this.bookItem.img = descObj.imgSource;
    };
    Secret_book.prototype.closeView = function () {
        PopUpManager.removePopUp(this.skinName, 0);
    };
    Secret_book.prototype.selectInfo = function (idArr) {
        this.sourceArr = [];
        for (var i = 0; i < idArr.length; i++) {
            var bgd = GlobalFunc.setBgData(idArr[i]);
            var obj = {
                itemName: this.testName[i],
                imgSource: "",
                boxS: bgd.boxS,
                quality: idArr[i],
                score: 24000,
                desc: "这只是一个测试~~~ @@" + Math.random() * 999,
                color: bgd.color
            };
            // var template = temple.TempleManager.select(idArr[i]);
            this.sourceArr.push(obj);
        }
        this.setDesc(this.sourceArr[0]);
        this.arrayCollection.source = this.sourceArr;
    };
    Object.defineProperty(Secret_book.prototype, "state", {
        set: function (value) {
            this.skin.currentState = value;
        },
        enumerable: true,
        configurable: true
    });
    Secret_book.prototype.initScroller = function () {
        this.scroller.stopAnimation();
        this.scroller.validateNow();
        this.scroller.viewport.scrollV = 0;
    };
    return Secret_book;
}(Base_view));
__reflect(Secret_book.prototype, "Secret_book");
//# sourceMappingURL=Secret_book.js.map