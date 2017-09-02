var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var View_forging = (function (_super) {
    __extends(View_forging, _super);
    function View_forging() {
        var _this = _super.call(this) || this;
        _this.stateName = "qianghua";
        _this._fightValue = 0;
        _this.skinName = "View_forging_skin";
        return _this;
    }
    View_forging.prototype.childrenCreated = function () {
        this.initialize();
        this.bindData();
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        // Global.addEventListener(MainNotify.RELOADINGCLOTH,this.onDispatchRes,this);
        // Global.addEventListener(MainNotify.STAR_UPGRADE,this.onDispatchRes,this);
        // Global.addEventListener(MainNotify.AUTO_STAR_UPGRADE,this.onDispatchRes,this);
        // Global.addEventListener(MainNotify.EXPERIENCE_STAR,this.onDispatchRes,this);
        // Global.addEventListener(MainNotify.WINGCHANGE,this.onDispatchRes,this);
        Global.addEventListener(MainNotify.JOBCHAGNE, this.changeJob, this);
        // Global.addEventListener(MainNotify.USE_XIUWEI,this.onDispatchRes,this);
        this.headCom.updateHead(DataCenter.roleList, this.skinName);
    };
    View_forging.prototype.bindData = function () {
        eui.Binding.bindHandler(DataCenter, ["changeItemNum"], this.changeNeedStone, this);
        eui.Binding.bindHandler(this, ["_fightValue"], this.changePower, this);
    };
    View_forging.prototype.changeNeedStone = function (value) {
        if (value && value.id) {
            var uid = DataCenter.goodsUIDgather.get(this.stoneId + "");
            if (uid && uid === value.id) {
                this.txt_haveStone.text = DataCenter.changeItemNum.num + "";
            }
        }
    };
    View_forging.prototype.changePower = function (value) {
        this.power.text = value + "";
    };
    View_forging.prototype.initialize = function () {
        var _this = this;
        this.curModule = this.module;
        // this.curRoleBtn["roleIcon"].source="head_0_0_png";
        //===========================
        this.collection = new eui.ArrayCollection(this.currentListData);
        this.itemGroup.dataProvider = this.collection;
        this.itemGroup.selectedIndex = 0;
        this.btn_qianghua.setAttr({ text: "强化", currentState: "down" });
        this.btn_gem.setAttr({ text: "宝石", currentState: "up" });
        this.btn_zhuling.setAttr({ text: "注灵", currentState: "up" });
        this.btn_refining.setAttr({ text: "精炼", currentState: "up" });
        this.curBtn = this.btn_qianghua;
        this.curModule.curJob = DataCenter.roleList[0].job;
        this.btn_getProps.setClickFunction(this.getPropsHandler, this);
        this.popup_getStone = new Forging_getStone();
        this.popup_getStone.addEventListener("openRonglianPanel", function () {
            _this.curModule.sendMsgToModule([ModuleEnum.BAG], MainNotify.OPENBAG);
        }, this);
    };
    View_forging.prototype.changeJob = function (evt) {
        if (evt.c_data.job && evt.c_data.insKey === this.skinName) {
            this.curModule.curJob = evt.c_data.job;
            this._fightValue = DataCenter.forginPower.get(this.curModule.curJob + "")[this.curForgingType];
        }
    };
    View_forging.prototype.onTouchTap = function (evt) {
        switch (evt.target) {
            case this.returnBtn:
            //点击返回
            case this.closeBtn:
                this.removeView(1);
                //点击关闭
                break;
            case this.btn_upgrade.button:
                var arr = DataCenter.forgingData.get(this.curModule.curJob + "").get(this.currentState);
                var temp = temple.TempleManager.select(arr[arr.length - 1].value);
                if (!temp.nextID) {
                    var popObj = { type: TipsEnum.TYPE_WARN, label: "已达到顶级" };
                    PopTipsManager.showPopTips([popObj]);
                    return;
                }
                if (this.stoneFull) {
                    this.curModule.sendUpgradeMsg(this.curForgingType);
                }
                else {
                    this.getPropsHandler();
                }
                break;
            case this.btn_gem.button:
                this.changeStateHandler(evt);
                break;
            case this.btn_qianghua.button:
                this.changeStateHandler(evt);
                break;
            case this.btn_zhuling.button:
                this.changeStateHandler(evt);
                break;
            default:
                break;
        }
    };
    View_forging.prototype.changeStateHandler = function (evt) {
        this.btn_qianghua.setAttr({ currentState: "up" });
        this.btn_gem.setAttr({ currentState: "up" });
        this.btn_zhuling.setAttr({ currentState: "up" });
        this.btn_refining.setAttr({ currentState: "up" });
        switch (evt.target) {
            case this.btn_gem.button:
                this.btn_gem.setAttr({ currentState: "down" });
                this.changeView("gem");
                break;
            case this.btn_qianghua.button:
                this.btn_qianghua.setAttr({ currentState: "down" });
                this.changeView("qianghua");
                break;
            case this.btn_zhuling.button:
                this.btn_zhuling.setAttr({ currentState: "down" });
                this.changeView("zhuling");
                break;
            default:
                break;
        }
    };
    View_forging.prototype.changeView = function (stateName) {
        if (stateName === void 0) { stateName = "qianghua"; }
        this.stateName = stateName;
        this.curModule.curState = stateName;
        this.invalidateState();
        // this.changeNeedStone();
        // this.changePower();
        switch (stateName) {
            case "qianghua":
                this.itemGroup.itemRenderer = ForgingItemRenderer;
                this.currentListData = Forging_DataUtil.getQiangHuaData(DataCenter.forgingData.get(this.curModule.curJob + "").get(this.currentState), this.curModule.curJob);
                this.btn_upgrade.label = "强化";
                this.curForgingType = 0;
                break;
            case "gem":
                this.itemGroup.itemRenderer = ForgingItemRenderer;
                this.currentListData = Forging_DataUtil.getGemData(DataCenter.forgingData.get(this.curModule.curJob + "").get(this.currentState));
                this.btn_upgrade.label = "提升";
                this.curForgingType = 1;
                break;
            case "zhuling":
                this.itemGroup.itemRenderer = ForgingItemRenderer;
                this.currentListData = Forging_DataUtil.getZhulingData(DataCenter.forgingData.get(this.curModule.curJob + "").get(this.currentState));
                this.btn_upgrade.label = "提升";
                this.curForgingType = 2;
                break;
            default:
                break;
        }
        this._fightValue = DataCenter.forginPower.get(this.curModule.curJob + "")[this.curForgingType];
        // this.power.text = this._fightValue+"";
        this.currentIndex = DataCenter.forgingUIPos.get(this.curModule.curJob + "")[this.curForgingType];
        this.changeData();
    };
    Object.defineProperty(View_forging.prototype, "fightValue", {
        get: function () { return this._fightValue; },
        set: function (v) { this._fightValue += v; },
        enumerable: true,
        configurable: true
    });
    View_forging.prototype.getFigthValue = function () {
        var num = 0;
        for (var i = 0; i < this.currentListData.length; i++) {
            num += this.currentData[i].FigthValue;
        }
        this._fightValue = num;
    };
    View_forging.prototype.getPropsHandler = function () {
        switch (this.curForgingType) {
            case 0:
                PopUpManager.addPopUp(this.popup_getStone, true, this.popup_getStone.skinName, ViewController.getInstance().getContainer().layer_popup, 0);
                PopUpManager.startClickHidden(this.popup_getStone.skinName, function () {
                    PopUpManager.removePopUp(this.popup_getStone.skinName, this);
                }, this);
                break;
            case 1:
                //获得材料
                var getGoods = new Get_Goods_pop();
                PopUpManager.addPopUp(getGoods, true, getGoods.skinName, ViewController.getInstance().getContainer().layer_popup, 0);
                PopUpManager.startClickHidden(getGoods.skinName);
                var template = temple.TempleManager.select(this.currentData.itemID);
                var shopTemple = temple.TempleManager.select(DataCenter.storeGoods[this.currentData.itemID]);
                var obj = { tid: this.currentData.itemID, singleCost: shopTemple.sellPrice[0], quality: 4, itemName: template.name, imgS: Config.path_goods + template.icon + ".png", state: 0 };
                getGoods.refreshItem({ shopData: obj, itemData: [{ itemWay: "材料副本", icon: "popup_box_png" }] });
                // PopUpManager.addPopUp(this.popup_getStone,true,ViewController.getInstance().getContainer().layer_popup,0);
                // PopUpManager.startClickHidden();
                break;
            case 2:
                var getGoods1 = new Get_Goods_pop();
                PopUpManager.addPopUp(getGoods1, true, getGoods1.skinName, ViewController.getInstance().getContainer().layer_popup, 0);
                PopUpManager.startClickHidden(getGoods1.skinName);
                var template = temple.TempleManager.select(this.currentData.itemID);
                var obj = { tid: this.currentData.itemID, quality: 4, itemName: template.name, imgS: Config.path_goods + template.icon + ".png", state: 1 };
                getGoods1.refreshItem({ shopData: obj, itemData: [{ itemWay: "参与击杀全民BOSS", icon: "popup_box_png" }] });
                break;
            default:
                break;
        }
    };
    View_forging.prototype.changeData = function () {
        this.collection.replaceAll(this.currentListData);
        this.collection.refresh();
        this.itemGroup.dataProviderRefreshed();
        this.itemGroup.selectedIndex = this.currentIndex;
        switch (this.stateName) {
            case "qianghua":
                this.updateQianghuaView();
                break;
            case "gem":
                this.updateGemView();
                break;
            case "zhuling":
                this.updateQianghuaView();
                break;
        }
    };
    View_forging.prototype.updateQianghuaView = function () {
        this.currentData = this.currentListData[this.currentIndex];
        this.icon_img.source = this.currentData.equipSource;
        this.icon_txt.text = "+" + this.currentData.equipIntensify;
        this.stoneId = this.currentData.itemID;
        var uid = DataCenter.goodsUIDgather.get(this.stoneId + "");
        var num = 0;
        if (uid) {
            num = DataCenter.goodsSource.get(uid + "");
        }
        this.txt_haveStone.text = num ? num + "" : 0 + "";
        this.txt_needStone.text = this.currentData.itemNum;
        if (Number(this.txt_needStone.text) > Number(this.txt_haveStone.text)) {
            this.txt_haveStone.textColor = 0xfc3434;
            this.stoneFull = false;
        }
        else {
            this.txt_haveStone.textColor = 0x00FF4B;
            this.stoneFull = true;
        }
        var propArr = this.currentData.attrType;
        var valueArr = this.currentData.attrVal;
        var valueNextArr = this.currentData.n_attrVal;
        this.group_attrs.removeChildren();
        for (var i = 0; i < propArr.length; i++) {
            var name = GlobalFunc.formatTipsInfo(propArr[i]);
            var item = new Forging_AttrItem(name, "+" + valueArr[i], valueNextArr[i] + "");
            this.group_attrs.addChild(item);
        }
    };
    View_forging.prototype.updateGemView = function () {
        this.currentData = this.currentListData[this.currentIndex];
        this.stoneId = this.currentData.itemID;
        var uid = DataCenter.goodsUIDgather.get(this.stoneId + "");
        var num = 0;
        if (uid) {
            num = DataCenter.goodsSource.get(uid + "");
        }
        this.txt_haveStone.text = num ? num + "" : 0 + "";
        this.txt_needStone.text = this.currentData.itemNum;
        if (Number(this.txt_needStone.text) > Number(this.txt_haveStone.text)) {
            this.txt_haveStone.textColor = 0xfc3434;
            this.stoneFull = false;
        }
        else {
            this.txt_haveStone.textColor = 0x00FF4B;
            this.stoneFull = true;
        }
        var lev = this.currentData.lev;
        var itemNum = this.currentData.itemNum;
        var attrType = this.currentData.attrType;
        var attrVal = this.currentData.attrVal;
        var len = Math.floor(lev / 10);
        // var color:string;
        // switch (attrType) {
        // 	case 13:
        // 		color="green";
        // 		break;
        // 	case 22:
        // 		color="red";
        // 		break;
        // 	case 23:
        // 		color="yellow";
        // 		break;
        // 	case 25:
        // 		color="blue";
        // 		break;
        // 	default:
        // 		break;
        // }
        for (var i = 1; i <= 4; i++) {
            this["gem_txt_grade" + i].size = 20;
            this["gem_txt_attr" + i].size = 20;
            this["gem_txt_grade" + i].textColor = 0x00ff4b;
            this["gem_txt_attr" + i].textColor = 0x00ff4b;
            if (i - 1 < len) {
                // this["gem_img"+i].source="gem_icon_"+color+"_1_png";
                this["gem_txt_grade" + i].text = "lv" + 10;
                this["gem_txt_attr" + i].text = AttrNameUtil.getInstance().getAttrName(attrType[0], 3) + "+" + attrVal[0] / lev * 10;
            }
            else if (i - 1 == len && lev != 0) {
                // this["gem_img"+i].source="gem_icon_"+color+"_2_png";
                this["gem_txt_grade" + i].text = "lv" + lev % 10;
                this["gem_txt_attr" + i].text = AttrNameUtil.getInstance().getAttrName(attrType[0], 3) + "+" + attrVal[0] / lev * (lev % 10);
            }
            else {
                this["gem_img" + i].source = "gem_icon_gray_1_png";
                this["gem_txt_grade" + i].text = AttrNameUtil.getInstance().getAttrName(attrType[0], 3) + "宝石";
                this["gem_txt_attr" + i].text = "未激活";
                this["gem_txt_grade" + i].size = 18;
                this["gem_txt_attr" + i].size = 18;
                this["gem_txt_grade" + i].textColor = 0xa19d94;
                this["gem_txt_attr" + i].textColor = 0xa19d94;
            }
        }
    };
    View_forging.prototype.removeView = function (closeState) {
        this.module.removeView(closeState);
    };
    View_forging.prototype.removeEvent = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        Global.removeEventListener(MainNotify.JOBCHAGNE, this.changeJob, this);
    };
    View_forging.prototype.getCurrentState = function () {
        return this.stateName;
    };
    return View_forging;
}(Base_view));
__reflect(View_forging.prototype, "View_forging");
//# sourceMappingURL=View_forging.js.map