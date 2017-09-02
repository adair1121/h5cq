var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Role_getXw = (function (_super) {
    __extends(Role_getXw, _super);
    function Role_getXw() {
        var _this = _super.call(this) || this;
        _this.TYPE_1 = 1;
        _this.TYPE_2 = 2;
        _this.TYPE_3 = 3;
        _this.buyChaojiCount = 0;
        _this.buyGaojiCount = 0;
        _this.skinName = "Role_getXw_skin";
        return _this;
    }
    Role_getXw.prototype.childrenCreated = function () {
        var gaojiItemTemple = temple.TempleManager.select(this.gaojiId);
        var chaojiItemTemple = temple.TempleManager.select(this.chaojiId);
        var gaojiShopTemple = temple.TempleManager.select(DataCenter.storeGoods[this.gaojiId]);
        var chaojijiShopTemple = temple.TempleManager.select(DataCenter.storeGoods[this.chaojiId]);
        this.item1.setxw(66000, 0x04fe10);
        this.item2.setxw(gaojiItemTemple.UseVaule, 0x04fe10);
        this.item3.setxw(chaojiItemTemple.UseVaule, 0xd21eff);
        this.calculHasGoods();
        this.item1.state = "exchangeXw";
        this.item2.state = "buyXw";
        this.item3.state = "buyXw";
        this.item2.item = gaojiItemTemple.name;
        this.item3.item = chaojiItemTemple.name;
        this.item2.icost = gaojiShopTemple.sellPrice[0] + "";
        this.item3.icost = chaojijiShopTemple.sellPrice[0] + "";
        this.storeShop = new Store_shop();
        this.item1.setItemData({ quality: 1, imgS: Config.path_public + "40000001.png" });
        this.item2.setItemData({ quality: gaojiItemTemple.itemQuality, imgS: Config.path_goods + gaojiItemTemple.icon + ".png" });
        this.item3.setItemData({ quality: chaojiItemTemple.itemQuality, imgS: Config.path_goods + chaojiItemTemple.icon + ".png" });
        eui.Binding.bindHandler(DataCenter.playerAttr, [data.PlayerAttr.degraderemaincount + ""], this.item1DataChange, this);
        eui.Binding.bindHandler(DataCenter.playerAttr, [data.PlayerAttr.gaozhuan_remaincount + ""], this.item2DataChange, this);
        eui.Binding.bindHandler(DataCenter.playerAttr, [data.PlayerAttr.chaozhuan_remaincount + ""], this.item3DataChange, this);
        eui.Binding.bindHandler(DataCenter, ["changeItemNum"], this.changeXuWei, this);
        eui.Binding.bindHandler(DataCenter, ["buyItemState"], this.buyItemState, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.layer = ViewController.getInstance().getContainer().layer_popup;
    };
    Role_getXw.prototype.setGoodsTemple = function (temple) {
        this.gaojiId = temple[0];
        this.chaojiId = temple[1];
    };
    Role_getXw.prototype.buyItemState = function (value) {
        if (value) {
            this.calculHasGoods();
        }
    };
    Role_getXw.prototype.changeXuWei = function (value) {
        if (value && value.id) {
            this.calculHasGoods();
        }
    };
    /**计算当前是否拥有换取修为的物品 */
    Role_getXw.prototype.calculHasGoods = function () {
        var uid1 = DataCenter.goodsUIDgather.get(this.gaojiId + "");
        var uid2 = DataCenter.goodsUIDgather.get(this.chaojiId + "");
        if (uid1) {
            var gaojiNum = DataCenter.goodsSource.get(uid1 + "");
            if (gaojiNum) {
                this.gaojizhuanshengdan = gaojiNum;
                this.item2.setBtnState("使用", "up");
            }
            else {
                this.gaojizhuanshengdan = 0;
                this.item2.setBtnState("购买", "up");
            }
        }
        else {
            this.gaojizhuanshengdan = 0;
            this.item2.setBtnState("购买", "up");
        }
        if (uid2) {
            var chaojiNum = DataCenter.goodsSource.get(uid2 + "");
            if (chaojiNum) {
                this.chaojizhuanshengdan = chaojiNum;
                this.item3.setBtnState("使用", "up");
            }
            else {
                this.chaojizhuanshengdan = 0;
                this.item3.setBtnState("购买", "up");
            }
        }
        else {
            this.chaojizhuanshengdan = 0;
            this.item3.setBtnState("购买", "up");
        }
    };
    Role_getXw.prototype.onTouchTap = function (evt) {
        switch (evt.target) {
            case this.item1.commonBtn:
                if (this.degraderemaincount) {
                    this.type = this.TYPE_1;
                    this.exchangeXuewei();
                }
                break;
            case this.item2.commonBtn:
                this.dealWithShopHandler(this.gaojizhuanshengdan, this.TYPE_2, this.buyChaojiCount, this.gaojiId, this.item2);
                break;
            case this.item3.commonBtn:
                this.dealWithShopHandler(this.chaojizhuanshengdan, this.TYPE_3, this.buyChaojiCount, this.chaojiId, this.item3);
                break;
        }
    };
    /**处理购买材料函数 */
    Role_getXw.prototype.dealWithShopHandler = function (goodsNum, shopType, buyCount, curTempleId, curItem) {
        if (goodsNum) {
            this.type = shopType;
            this.sendToServer(curTempleId);
        }
        else {
            if (buyCount) {
                curItem.setBtnState("购买", "up");
                //购买
                var tid = DataCenter.storeGoods[curTempleId];
                var itemTemple = temple.TempleManager.select(curTempleId);
                var shopTemple = temple.TempleManager.select(tid);
                var itmeObj = { quality: itemTemple.itemQuality, itemName: itemTemple.name, imgS: Config.path_goods + itemTemple.icon + ".png" };
                itmeObj.tid = tid;
                itmeObj.singleCost = shopTemple.sellPrice[0];
                if (shopType === this.TYPE_2) {
                    itmeObj.maxNum = DataCenter.playerAttr[data.PlayerAttr.gaozhuan_remaincount];
                }
                else {
                    itmeObj.maxNum = DataCenter.playerAttr[data.PlayerAttr.chaozhuan_remaincount];
                }
                this.popShop(itmeObj);
            }
            else {
                curItem.setBtnState("购买", "disabled");
            }
        }
    };
    Role_getXw.prototype.popShop = function (dataObj) {
        var _this = this;
        PopUpManager.addPopUp(this.storeShop, true, this.storeShop.skinName, this.layer, 0);
        this.storeShop.initData({ maxNum: dataObj.maxNum, tid: dataObj.tid, singleCost: dataObj.singleCost, itemData: dataObj });
        PopUpManager.startClickHidden(this.storeShop.skinName, function () {
            PopUpManager.removePopUp(_this.storeShop.skinName, 0);
        }, this);
    };
    Role_getXw.prototype.exchangeXuewei = function () {
        Global.dispatchEvent(MainNotify.USE_XIUWEI);
    };
    Role_getXw.prototype.sendToServer = function (templeID) {
        Global.dispatchEvent(MainNotify.USE_GOODS, { useCount: 1, templateId: templeID });
    };
    Role_getXw.prototype.item1DataChange = function (value) {
        this.degraderemaincount = value;
        if (value) {
            this.item1.count = value;
            this.item1.setBtnState("兑换", "up");
            this.item1.commonBtn.touchEnabled = true;
        }
        else {
            this.item1.count = 0;
            this.item1.setBtnState("兑换", "disabled");
            this.item1.commonBtn.touchEnabled = false;
        }
    };
    Role_getXw.prototype.item2DataChange = function (value) {
        this.buyGaojiCount = value;
        if (value) {
            this.item2.count = value;
            this.item2.commonBtn.touchEnabled = true;
        }
        else {
            this.item2.count = 0;
            this.item2.setBtnState("购买", "disabled");
            this.item2.commonBtn.touchEnabled = false;
        }
    };
    Role_getXw.prototype.item3DataChange = function (value) {
        this.buyChaojiCount = value;
        if (value) {
            this.item3.count = value;
            this.item3.commonBtn.touchEnabled = true;
        }
        else {
            this.item3.count = 0;
            this.item3.setBtnState("购买", "disabled");
            this.item3.commonBtn.touchEnabled = false;
        }
    };
    return Role_getXw;
}(eui.Component));
__reflect(Role_getXw.prototype, "Role_getXw");
//# sourceMappingURL=Role_getXw.js.map