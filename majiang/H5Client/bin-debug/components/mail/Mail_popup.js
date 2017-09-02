var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Mail_popup = (function (_super) {
    __extends(Mail_popup, _super);
    function Mail_popup() {
        var _this = _super.call(this) || this;
        _this.skinName = "Mail_popup_skin";
        return _this;
    }
    Mail_popup.prototype.childrenCreated = function () {
        this.btn_reward.label = "领取";
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this.rewardCollect = new eui.ArrayCollection();
        this.rewardList.itemRenderer = CommonItem;
        this.rewardList.dataProvider = this.rewardCollect;
    };
    Mail_popup.prototype.onClickHandler = function (evt) {
        switch (evt.target) {
            case this.btn_reward.button:
                this.callBack.call(this.arg);
                PopUpManager.removePopUp(this.skinName, 0);
                break;
            case this.returnBtn:
                PopUpManager.removePopUp(this.skinName, 0);
                break;
        }
    };
    Mail_popup.prototype.setMailData = function (dataObj, callBackFunc, arg) {
        this.callBack = callBackFunc;
        this.arg = arg;
        var mailTemple = temple.TempleManager.select(dataObj.mailTemplateId);
        var content = mailTemple.content;
        var str = content.format(content, dataObj.argumentList);
        this.txt_content.text = str;
        var itemList = dataObj.itemList;
        var arr = [];
        for (var i = 0, len = itemList.length, item; i < len; i++) {
            item = itemList[i];
            var obj = {};
            var template = temple.TempleManager.select(item.TempleID);
            var bgObj = GlobalFunc.setBgData(template.itemQuality);
            var count = GlobalFunc.searchAttrValue(data.ItemAttr.count, item.attrList);
            obj.rightValue = count ? count : 0;
            if (template.itemtype1 === 1 || template.itemtype1 === 3) {
                //道具或代币
                obj.imgSource = Config.path_goods + template.icon + ".png";
            }
            else {
                obj.imgSource = Config.path_equip + template.icon + ".png";
            }
            obj.itemName = template.name;
            obj.boxS = bgObj.boxS;
            obj.color = DataCenter.bag.qualityColor[template.itemQuality];
            arr.push(obj);
        }
        this.rewardCollect.source = arr;
    };
    return Mail_popup;
}(eui.Component));
__reflect(Mail_popup.prototype, "Mail_popup");
//# sourceMappingURL=Mail_popup.js.map