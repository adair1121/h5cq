var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var View_bag = (function (_super) {
    __extends(View_bag, _super);
    function View_bag() {
        var _this = _super.call(this) || this;
        _this.sourceLen = 0;
        //判断装备数据源还是道具数据源 true or false;
        _this.state = true;
        _this.skinName = "View_bag_skin";
        return _this;
    }
    View_bag.prototype.childrenCreated = function () {
        this.curModule = this.module;
        this.equipBtn.setAttr({ text: "装备", currentState: "down" });
        this.propBtn.setAttr({ text: "道具", currentState: "up" });
        this.smeltBtn.label = "熔炼";
        this.addGridPop = new Bag_addGrid();
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.arrayCollection = new eui.ArrayCollection();
        // this.refreshDataGroup({num:180,equipSource:"head_0_0_png"});
        this.itemList.dataProvider = this.arrayCollection;
        this.itemList.itemRenderer = GoodsItem;
        this.scroller.viewport = this.itemList;
        this.equipBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.equipOper, this);
        this.propBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.propOper, this);
        this.itemList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
        Global.addEventListener(MainNotify.USE_GOODS, this.onUseGoods, this);
        Global.addEventListener(MainNotify.HANDSHAKE_ADDBOXNUM, this.addBoxNum, this);
    };
    View_bag.prototype.equipOper = function (evt) {
        //显示装备
        this.state = true;
        this.setStateChange([this.equipBtn, this.propBtn], ["down", "up"]);
        this.curModule.sendMsgToModule([ModuleEnum.BAG], MainNotify.SHOWEQUIP);
    };
    View_bag.prototype.propOper = function (evt) {
        //显示道具
        this.state = false;
        this.setStateChange([this.equipBtn, this.propBtn], ["up", "down"]);
        this.curModule.sendMsgToModule([ModuleEnum.BAG], MainNotify.SHOWPROP);
    };
    /**物品使用 */
    View_bag.prototype.onUseGoods = function (evt) {
        this.curModule.sendUseGoodsDataToS(evt.c_data);
    };
    /**增加背包格子 */
    View_bag.prototype.addBoxNum = function (evt) {
        this.curModule.sendAddBoxNumToS(evt.c_data);
    };
    /**物品item点击 */
    View_bag.prototype.onItemTap = function (evt) {
        if (this.state) {
            var itemInfoPop = new Bag_itemInfo();
            this.curModule.setItemInfo(itemInfoPop, evt.item);
        }
        else {
            var goodsItemInfo = new Pop_goodsInfo();
            this.curModule.setItemInfo(goodsItemInfo, evt.item);
        }
    };
    View_bag.prototype.onTouchTap = function (evt) {
        switch (evt.target) {
            case this.returnBtn:
                //点击返回
                this.removeView(1);
                break;
            case this.addBtn:
                //点击增加
                var layer = ViewController.getInstance().getContainer().layer_popup;
                var w = this.addGridPop.width;
                var h = this.addGridPop.height;
                PopUpManager.addPopUp(this.addGridPop, true, this.addGridPop.skinName, layer, 0);
                break;
            case this.smeltBtn.button:
                this.curModule.sendMsgToModule([ModuleEnum.BAG_SMELT], MainNotify.OPENBAGSMELT);
                break;
            default:
                break;
        }
    };
    View_bag.prototype.removeView = function (closeState) {
        this.curModule.removeView(closeState);
    };
    /**刷新背包dataGroup数据 */
    View_bag.prototype.refreshDataGroup = function (sourceLen) {
        this.sourceLen = sourceLen;
        this.scroller.stopAnimation();
        this.scroller.validateNow();
        this.scroller.viewport.scrollV = 0;
        this.refreshBoxNum(this.sourceLen, DataCenter.playerAttr[data.PlayerAttr.bagcount]);
    };
    /**初始化背包按钮状态 */
    View_bag.prototype.initBtnState = function () {
        this.equipBtn.setAttr({ currentState: "down" });
        this.propBtn.setAttr({ currentState: "up" });
        this.bagCapacity.visible = true;
    };
    /**设置按钮状态改变 */
    View_bag.prototype.setStateChange = function (btnArr, btnState) {
        for (var i = 0; i < btnArr.length; i++) {
            btnArr[i].setAttr({ currentState: btnState[i] });
            if (btnState[0] === "down") {
                this.bagCapacity.visible = true;
            }
            else {
                this.bagCapacity.visible = false;
            }
        }
    };
    /**更新背包格子数 */
    View_bag.prototype.refreshBoxNum = function (sourceLen, value) {
        DataCenter.curBoxNum = sourceLen;
        this.equipNum.text = sourceLen + "/" + value;
    };
    View_bag.prototype.removeEvent = function () {
        Global.removeEventListener(MainNotify.USE_GOODS, this.onUseGoods, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.equipBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.equipOper, this);
        this.propBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.propOper, this);
        this.itemList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
        Global.removeEventListener(MainNotify.HANDSHAKE_ADDBOXNUM, this.addBoxNum, this);
        this.curModule = null;
        this.addGridPop = null;
    };
    return View_bag;
}(Base_view));
__reflect(View_bag.prototype, "View_bag");
//# sourceMappingURL=View_bag.js.map