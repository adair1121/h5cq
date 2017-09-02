var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Role_longhunhudun = (function (_super) {
    __extends(Role_longhunhudun, _super);
    function Role_longhunhudun(state) {
        var _this = _super.call(this) || this;
        _this.typeObj = {};
        _this.curJob = 0;
        _this.skinName = "Role_longhunhudun_skin";
        _this.skin.currentState = state;
        _this.typeObj = { "longhun": data.StrengthenType.ST_LH, "hudun": data.StrengthenType.ST_HD,
            "mabi": data.StrengthenType.ST_MB, "hushen": data.StrengthenType.ST_HS };
        _this.type = _this.typeObj[state];
        return _this;
    }
    Role_longhunhudun.prototype.childrenCreated = function () {
        this.goodsPop = new Get_Goods_pop();
        this.curAttrCollection = new eui.ArrayCollection();
        this.nextAttrCollection = new eui.ArrayCollection();
        this.curAttrGroup.itemRenderer = Role_specialItem;
        this.nextAttrGroup.itemRenderer = Role_specialItem;
        this.curAttrGroup.dataProvider = this.curAttrCollection;
        this.nextAttrGroup.dataProvider = this.nextAttrCollection;
        this.layer = ViewController.getInstance().getContainer().layer_popup;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.curJob = DataCenter.roleList[0].job;
        Global.addEventListener(MainNotify.JOBCHAGNE, this.jobChange, this);
        this.watcher = eui.Binding.bindHandler(DataCenter, ["changeItemNum"], this.changeNeedStone, this);
        this.getDragonOrShieldId();
        this.headCom.updateHead(DataCenter.roleList, this.skinName);
    };
    Role_longhunhudun.prototype.getDragonOrShieldId = function () {
        var id = 0;
        var otherArr = DataCenter.forgingData.get(this.curJob + "").get("other");
        id = otherArr[this.type];
        this.refreshView(id);
    };
    Role_longhunhudun.prototype.changeNeedStone = function (value) {
        if (value && value.id) {
            var uid = DataCenter.goodsUIDgather.get(this.goodsId + "");
            if (uid && uid === value.id) {
                this.curValue = value.num ? value.num : 0;
                this.num.text = this.curValue + "/" + this.template.itemNum;
            }
        }
    };
    Role_longhunhudun.prototype.jobChange = function (evt) {
        if (evt.c_data.insKey === this.skinName) {
            this.curJob = evt.c_data.job;
            this.getDragonOrShieldId();
        }
    };
    Role_longhunhudun.prototype.onTouchTap = function (evt) {
        switch (evt.target) {
            case this.upGradeBtn.button:
                this.clickHandler();
                break;
            case this.returnBtn:
                this.closeView();
                break;
            default:
                break;
        }
    };
    Role_longhunhudun.prototype.refreshView = function (mid) {
        this.template = temple.TempleManager.select(mid);
        this.goodsId = this.template.itemID;
        var itemTemplate = temple.TempleManager.select(this.goodsId);
        var curData = this.createBaseAttrCnt(this.template.AttrEnum, this.template.Attr);
        this.curAttrCollection.source = curData;
        if (this.template.nextID) {
            this.template2 = temple.TempleManager.select(this.template.nextID);
            var nextData = this.createBaseAttrCnt(this.template2.AttrEnum, this.template2.Attr);
            this.nextAttrCollection.source = nextData;
            this.changeValue = this.template2.FightValue - this.template.FightValue;
        }
        else {
            this.nextAttrCollection.source = curData;
            return;
        }
        var uid = DataCenter.goodsUIDgather.get(this.goodsId + "");
        if (uid) {
            this.curValue = DataCenter.goodsSource.get(uid + "");
        }
        else {
            this.curValue = 0;
        }
        this.item.source = Config.path_equip + itemTemplate.icon + ".png";
        this.num.text = this.curValue + "/" + this.template.itemNum;
        this.totalValue = this.template.itemNum;
        this.level.text = this.template.lev + "";
        this.judgeSuiPian();
        if (this.clickState) {
            GlobalFunc.showPowerUpTips(this.template.FightValue, [this.changeValue]);
            // this.showUpGradeRes(this.template.FightValue);
            this.clickState = false;
        }
    };
    /**创建属性 */
    Role_longhunhudun.prototype.createBaseAttrCnt = function (attrEnum, attrCnt) {
        var attrName = "";
        var cnt = [];
        for (var i = 0; i < attrEnum.length; i++) {
            var obj = {};
            attrName = AttrNameUtil.getInstance().getAttrName(attrEnum[i], 3);
            if (!attrName) {
                attrName = AttrNameUtil.getInstance().getAttrName(-1, 3);
            }
            obj.attr = attrName;
            obj.value = attrCnt[i];
            cnt.push(obj);
        }
        return cnt;
    };
    Role_longhunhudun.prototype.clickHandler = function () {
        if (!this.goWay) {
            //提升
            this.clickState = true;
            Global.dispatchEvent(MainNotify.UP_LONGHUN_OR_HUDUN, { type: this.type, job: this.curJob });
        }
        else {
            //获得材料
            PopUpManager.addPopUp(this.goodsPop, true, this.goodsPop.skinName, this.layer, 0);
            PopUpManager.startClickHidden(this.goodsPop.skinName, this.callBackFunc, this);
            var template = temple.TempleManager.select(this.goodsId);
            var obj = { tid: this.goodsId, singleCost: 20, quality: 4, itemName: template.name, imgS: Config.path_goods + template.icon + ".png", state: this.type };
            var itemGetWay = "材料副本";
            if (this.type === data.StrengthenType.ST_MB || this.type === data.StrengthenType.ST_HS) {
                itemGetWay = "通关章节获得";
            }
            this.goodsPop.refreshItem({ shopData: obj, itemData: [{ itemWay: itemGetWay, icon: "popup_box_png" }] });
        }
    };
    Role_longhunhudun.prototype.callBackFunc = function () {
        PopUpManager.removePopUp(this.goodsPop.skinName, 0);
    };
    Role_longhunhudun.prototype.judgeSuiPian = function () {
        if (this.curValue >= this.totalValue) {
            this.upGradeBtn.label = "提升";
            this.num.textColor = 0x00FF4B;
            this.goWay = 0;
        }
        else {
            this.upGradeBtn.label = "获得材料";
            this.num.textColor = 0xED0909;
            this.goWay = 1;
        }
    };
    Role_longhunhudun.prototype.closeView = function () {
        PopUpManager.removePopUp(this.skinName, 0);
        Global.removeEventListener(MainNotify.JOBCHAGNE, this.jobChange, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        if (this.watcher) {
            this.watcher.unwatch();
        }
    };
    return Role_longhunhudun;
}(eui.Component));
__reflect(Role_longhunhudun.prototype, "Role_longhunhudun");
//# sourceMappingURL=Role_longhunhudun.js.map