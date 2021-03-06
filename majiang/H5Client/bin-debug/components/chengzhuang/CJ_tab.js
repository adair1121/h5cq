var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CJ_tab = (function (_super) {
    __extends(CJ_tab, _super);
    function CJ_tab() {
        var _this = _super.call(this) || this;
        _this.ACTIVATE = "activate";
        _this.NOACTIVATE = "noactivate";
        _this.equipSource = [];
        _this.totleNum = 0;
        _this.curNum = 0;
        //当前橙装templeiD
        _this.cjTempleId = 0;
        //当前穿戴位置
        _this.equipPos = 0;
        //当前消耗品id
        _this.debrisID = 0;
        _this.skinState = "";
        _this.skinName = "CJ_tab_skin";
        return _this;
    }
    CJ_tab.prototype.childrenCreated = function () {
        this.list.selectedIndex = 0;
        this.cjAssembly = new CJ_assembly();
        this.equipPosSource = [data.EquipPos.weapon, data.EquipPos.head, data.EquipPos.body, data.EquipPos.neck, data.EquipPos.left_bracelet,
            data.EquipPos.right_bracelet, data.EquipPos.left_ring, data.EquipPos.right_ring];
        this.sourceCollect = new eui.ArrayCollection();
        this.list.dataProvider = this.sourceCollect;
        this.list.itemRenderer = ForgingItemRenderer;
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
        this.operBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.sourceCollect.source = this.initEquipData();
        eui.Binding.bindHandler(DataCenter, ["changeItemNum"], this.changeCJSuiPian, this);
        this.debrisID = DataCenter.CJTempleData[this.equipSource[0].itemId].debrisID;
        this.cattrCollect = new eui.ArrayCollection();
        this.nattrCollect = new eui.ArrayCollection();
        this.cAttrList.itemRenderer = Role_specialItem;
        this.cAttrList.dataProvider = this.cattrCollect;
        this.nAttrList.itemRenderer = Role_specialItem;
        this.nAttrList.dataProvider = this.nattrCollect;
        var uid = DataCenter.goodsUIDgather.get(this.debrisID + "");
        var num = 0;
        if (uid) {
            num = DataCenter.goodsSource.get(uid + "");
        }
        else {
            num = 0;
        }
        this.curNum = num;
        this.layer = ViewController.getInstance().getContainer().layer_ui;
        this.getCjWay.setClickFunction(this.clickFunc, this);
    };
    CJ_tab.prototype.clickFunc = function () {
        PopUpManager.addPopUp(this.cjAssembly, true, this.cjAssembly.skinName, this.layer, 0);
        var obj = {};
        var itemData = [{ itemWay: "获得橙装:寻宝", icon: "popup_box_png" },
            { itemWay: "获得橙装:全名BOSS", icon: "popup_box_png" },
            { itemWay: "获得橙装:挑战副本", icon: "popup_box_png" }];
        obj.itemData = itemData;
        obj.equipSource = DataCenter.cjEquip;
        this.cjAssembly.setData(obj, this.toCjDis, this);
    };
    CJ_tab.prototype.refreshCJData = function () {
        this.cjAssembly.refreshCJData(DataCenter.cjEquip);
    };
    /**分解橙装 */
    CJ_tab.prototype.toCjDis = function (dataObj) {
        Global.dispatchEvent(MainNotify.CJ_DISASSEMBLY, dataObj);
    };
    CJ_tab.prototype.onItemTap = function (evt) {
        this.refreshEquipState(evt.item);
        this.list.selectedIndex = evt.itemIndex;
    };
    CJ_tab.prototype.onTouchTap = function (evt) {
        if (this.curNum < this.totleNum) {
            var obj = { type: TipsEnum.TYPE_WARN, label: "碎片不足" };
            PopTipsManager.showPopTips([obj]);
            return;
        }
        Global.dispatchEvent(MainNotify.CJ_ASSEMBLY, { itemId: this.cjTempleId, equipPos: this.equipPos });
    };
    /**更新橙装显示状态 */
    CJ_tab.prototype.refreshEquipState = function (item) {
        this.cjTempleId = item.itemId;
        this.debrisID = DataCenter.CJTempleData[item.itemId].debrisID;
        this.equipPos = item.equipPos;
        var curItemTemple = temple.TempleManager.select(item.itemId);
        var nextId = DataCenter.CJTempleData[item.itemId].nextId;
        this.cattrCollect.source = this.createBaseAttr(curItemTemple.num, curItemTemple.Value);
        this.curCj.bgBox = GlobalFunc.setBgData(curItemTemple.itemQuality).boxS;
        this.curName.text = curItemTemple.name;
        this.curCj.iName = curItemTemple.needlev + "";
        this.curCj.img = Config.path_equip + curItemTemple.icon + ".png";
        this.curScore.text = DataCenter.CJTempleData[item.itemId].orangeScore + "";
        this.totleNum = DataCenter.CJTempleData[item.itemId].orangecomDebris;
        if (item.hasEquip) {
            this.operBtn.label = "升级";
            if (nextId) {
                this.operBtn.visible = true;
                this.skinState = this.ACTIVATE;
                this.invalidateState();
                var itemTemplate = temple.TempleManager.select(nextId);
                this.nextCj.bgBox = GlobalFunc.setBgData(5).boxS;
                this.nattrCollect.source = this.createBaseAttr(itemTemplate.num, itemTemplate.Value);
                this.nextName.text = itemTemplate.name;
                this.nextCj.iName = itemTemplate.needlev + "";
                this.nextCj.img = Config.path_equip + itemTemplate.icon + ".png";
                this.nextScore.text = DataCenter.CJTempleData[nextId].orangeScore + "";
                this.totleNum = DataCenter.CJTempleData[nextId].orangecomDebris;
            }
            else {
                this.operBtn.visible = false;
                this.skinState = this.NOACTIVATE;
                this.invalidateState();
            }
        }
        else {
            this.operBtn.visible = true;
            this.operBtn.label = "合成";
            this.skinState = this.NOACTIVATE;
            this.invalidateState();
        }
        this.refreshCost();
    };
    CJ_tab.prototype.getCurrentState = function () {
        return this.skinState;
    };
    //橙装碎片改变
    CJ_tab.prototype.changeCJSuiPian = function (value) {
        if (value && value.id) {
            var uid = DataCenter.goodsUIDgather.get(this.debrisID + "");
            if (uid && uid === value.id) {
                this.curNum = value.num;
                this.refreshCost();
            }
        }
    };
    CJ_tab.prototype.refreshCost = function () {
        this.cost.text = this.curNum + "/" + this.totleNum;
    };
    //初始化橙装数据
    CJ_tab.prototype.initEquipData = function () {
        this.equipSource = [];
        for (var i = 0; i < this.equipPosSource.length; i++) {
            var obj = this.calculInitTempleId(this.equipPosSource[i], 0);
            this.equipSource.push(obj);
        }
        return this.equipSource;
    };
    CJ_tab.prototype.refreshCJEquip = function (job) {
        this.sourceCollect.source = this.getEquipData(job);
        // this.list.selectedIndex = 0;
        // this.refreshEquipState(this.equipSource[0]);
    };
    /**根据职业获取对应的橙装合成数据 */
    CJ_tab.prototype.getEquipData = function (job) {
        var roleInfo = DataCenter.RoleInFoVo[job];
        var equips = roleInfo.equips;
        for (var i = 0, len = equips.length, item; i < len; i++) {
            item = equips[i];
            this.calculSingleCJData(item);
        }
        return this.equipSource;
    };
    /**计算单个橙装数据 修改橙装显示列表*/
    CJ_tab.prototype.calculSingleCJData = function (item, ifRefresh) {
        if (ifRefresh === void 0) { ifRefresh = false; }
        var itemTemple = temple.TempleManager.select(item.TempleID);
        var equipObj = GlobalFunc.searchMoreAttrValue([data.ItemAttr.equipPos, data.ItemAttr.score], item.attrList);
        var obj = this.calculInitTempleId(equipObj[data.ItemAttr.equipPos], equipObj[data.ItemAttr.score]);
        for (var j = 0; j < this.equipSource.length; j++) {
            if (this.equipSource[j].equipPos === obj.equipPos) {
                this.equipSource[j] = obj;
                if (itemTemple.itemtype2 !== 202) {
                    //当前角色穿戴不是橙装
                    this.equipSource[j].boxS = GlobalFunc.setBgData(1).boxS;
                    this.equipSource[j].iName = "";
                    this.equipSource[j].lev = "";
                    this.equipSource[j].equipSource = "";
                    obj.hasEquip = false;
                }
                else {
                    this.equipSource[j].equipSource = Config.path_equip + itemTemple.icon + ".png";
                    this.equipSource[j].boxS = GlobalFunc.setBgData(itemTemple.itemQuality).boxS;
                    this.equipSource[j].iName = itemTemple.name;
                    this.equipSource[j].lev = itemTemple.needlev;
                    this.equipSource[j].itemId = item.TempleID;
                    obj.hasEquip = true;
                }
                break;
            }
        }
        if (ifRefresh) {
            this.refreshEquipState(this.equipSource[this.list.selectedIndex]);
        }
    };
    /**计算初始化橙装temple */
    CJ_tab.prototype.calculInitTempleId = function (equipPos, equipPower) {
        for (var key in DataCenter.CJData) {
            var keyArr = key.split("-");
            if (keyArr.indexOf(equipPos + "") != -1) {
                var obj = {};
                var item;
                var arr = DataCenter.CJData[key];
                temple;
                if (equipPower && arr && arr.length) {
                    for (var i = 0; i < arr.length; i++) {
                        try {
                            var itemTemple = temple.TempleManager.select(arr[i].itemId);
                        }
                        catch (err) {
                            console.log(arr[i]);
                        }
                        if (itemTemple.itemtype2 != 202) {
                            continue;
                        }
                        item = arr[i];
                        if (arr[i].orangeScore > equipPower) {
                            break;
                        }
                    }
                }
                else {
                    item = DataCenter.CJData[key][0];
                }
                var itemTemplate = temple.TempleManager.select(item.itemId);
                obj.itemId = item.itemId;
                obj.equipPos = equipPos;
                obj.hasEquip = false;
                return obj;
            }
        }
    };
    CJ_tab.prototype.remove = function () {
        this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
        this.operBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    /**创建基础属性字段 */
    CJ_tab.prototype.createBaseAttr = function (value, valueArgument) {
        var arr = [];
        for (var i = 0; i < value.length; i++) {
            var obj = {};
            obj.attr = GlobalFunc.formatTipsInfo(value[i]);
            obj.value = valueArgument[i];
            arr.push(obj);
        }
        return arr;
    };
    return CJ_tab;
}(Base_view));
__reflect(CJ_tab.prototype, "CJ_tab");
//# sourceMappingURL=CJ_tab.js.map