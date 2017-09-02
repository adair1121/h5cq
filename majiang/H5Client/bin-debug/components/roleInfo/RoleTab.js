var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RoleTab = (function (_super) {
    __extends(RoleTab, _super);
    function RoleTab(type) {
        var _this = _super.call(this) || this;
        _this.roleModleObj = {};
        _this.skinName = "RoleTab_skin";
        _this.m_type = type;
        return _this;
    }
    RoleTab.prototype.childrenCreated = function () {
        this.leftEquipArr = new eui.ArrayCollection();
        this.rightEquipArr = new eui.ArrayCollection();
        this.otherACT = new eui.ArrayCollection();
        this.roleMc = new MovieClip();
        this.weaponMc = new MovieClip();
        this.wingMc = new MovieClip();
        this.equipLeftList.dataProvider = this.leftEquipArr;
        this.equipRightList.dataProvider = this.rightEquipArr;
        this.otherList.dataProvider = this.otherACT;
        this.itemInfoPop = new Bag_itemInfo();
        this.equipLeftList.itemRenderer = RoleEquipRenderer;
        this.equipRightList.itemRenderer = RoleEquipRenderer;
        this.otherList.itemRenderer = RoleEquipRenderer;
        this.CJBtn.label = "橙装";
        if (this.m_type) {
            this.reloadingBtn.visible = false;
            this.checkAttr.visible = false;
        }
        else {
            this.reloadingBtn.visible = true;
            this.checkAttr.visible = true;
            this.reloadingBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onReloadBegin, this);
            this.reloadingBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.onReloadEnd, this);
            this.CJBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCJTouchHandler, this);
            this.checkAttr.setClickFunction(this.clickLinkFunc, this);
            this.roleAttr = new Role_showAttrs();
            this.layer = ViewController.getInstance().getContainer().layer_popup;
            this.otherList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onOtherItemTap, this);
        }
        this.equipLeftList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
        this.equipRightList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
    };
    RoleTab.prototype.onCJTouchHandler = function (evt) {
        Global.dispatchEvent(MainNotify.OPENCJPANEL);
    };
    RoleTab.prototype.onItemTap = function (evt) {
        this.setItemInfo(this.itemInfoPop, evt.item);
    };
    RoleTab.prototype.onOtherItemTap = function (evt) {
        var type = evt.item.type;
        var openState = false;
        switch (type) {
            case data.StrengthenType.ST_LH:
                this.curPop = new Role_longhunhudun("longhun");
                openState = true;
                break;
            case data.StrengthenType.ST_HD:
                this.curPop = new Role_longhunhudun("hudun");
                openState = true;
                break;
            case data.StrengthenType.ST_MB:
                this.curPop = new Role_longhunhudun("mabi");
                openState = true;
                break;
            case data.StrengthenType.ST_HS:
                this.curPop = new Role_longhunhudun("hushen");
                openState = true;
                break;
            case 2:
                //时装
                this.curPop = new Role_fashion();
                openState = true;
                break;
            case 3:
                //称号
                break;
            default:
                openState = false;
                break;
        }
        if (openState) {
            PopUpManager.addPopUp(this.curPop, true, this.curPop.skinName, this.layer, 0);
            PopUpManager.startClickHidden(this.curPop.skinName, this.callBackFunc, this);
            if (this.curPop instanceof Role_fashion) {
                this.curPop.setInitData(this.roleModleObj);
            }
        }
    };
    RoleTab.prototype.clickLinkFunc = function () {
        PopUpManager.addPopUp(this.roleAttr, true, this.roleAttr.skinName, this.layer, 0);
        PopUpManager.startClickHidden(this.roleAttr.skinName, function () {
            PopUpManager.removePopUp(this.roleAttr.skinName, 0);
        }, this);
    };
    RoleTab.prototype.callBackFunc = function () {
        PopUpManager.removePopUp(this.curPop.skinName, 0);
    };
    RoleTab.prototype.onReloadBegin = function (evt) {
        this.reloadingBtn.x = this.reloadingBtn.x + 3;
        this.reloadingBtn.y = this.reloadingBtn.y + 3;
    };
    RoleTab.prototype.onReloadEnd = function (evt) {
        this.reloadingBtn.x = this.reloadingBtn.x - 3;
        this.reloadingBtn.y = this.reloadingBtn.y - 3;
        Global.dispatchEvent(MainNotify.RELOADINGCLOTH);
    };
    /**更新装备数据 */
    RoleTab.prototype.refreshEquipData = function (data) {
        this.leftEquipArr.source = data.leftSourceArr;
        this.rightEquipArr.source = data.rightSourceArr;
        //测试调用方法是否正确
        // this.addTips()
    };
    /**更新特殊装备 */
    RoleTab.prototype.refreshSpecialData = function (data) {
        this.otherACT.source = data.specialSourceArr;
    };
    /**更新龙魂或护盾 */
    RoleTab.prototype.refreshLongHunOrHudun = function (id) {
        this.curPop.refreshView(id);
    };
    /**更新角色模型 */
    RoleTab.prototype.refreshRoleMode = function (roleModePath) {
        if (roleModePath === void 0) { roleModePath = ""; }
        this.roleModleObj.rolePath = roleModePath;
        this.roleMc.loadFile(roleModePath, true, -1, null, this);
        this.roleModuleGroup.addChild(this.roleMc);
        this.roleMc.x = (this.roleModuleGroup.width >> 1);
        this.roleMc.y = (this.roleModuleGroup.height >> 1) + 25;
    };
    RoleTab.prototype.refreshWeaponMode = function (roleWeaponPath) {
        if (roleWeaponPath === void 0) { roleWeaponPath = ""; }
        this.roleModleObj.weaponPath = roleWeaponPath;
        this.weaponMc.loadFile(roleWeaponPath, true, -1, null, this);
        this.roleModuleGroup.addChild(this.weaponMc);
        this.weaponMc.x = (this.roleModuleGroup.width >> 1);
        this.weaponMc.y = (this.roleModuleGroup.height >> 1) + 25;
    };
    // /**更新角色模型 */
    // public refreshRoleMode(roleModePath:string = "",roleWeaponPath:string = ""):void{
    // 	this.roleMode.source = roleModePath;
    // 	this.roleWeapon.source = roleWeaponPath;
    // }
    /**更新翅膀模型 */
    RoleTab.prototype.refreshWingMode = function (roleWingPath) {
        if (roleWingPath === void 0) { roleWingPath = ""; }
        this.roleModleObj.wingPath = roleWingPath;
        this.wingMc.loadFile(roleWingPath, true, -1, null, this);
        this.roleWing.addChild(this.wingMc);
        this.wingMc.x = (this.roleWing.width >> 1);
        this.wingMc.y = (this.roleWing.height >> 1) + 25;
        // this.roleWing.source = roleWingPath;
    };
    /**添加提示 */
    RoleTab.prototype.addTips = function () {
        this.addEventListener(egret.Event.RENDER, this.onRender, this);
    };
    RoleTab.prototype.onRender = function (evt) {
        //=======================此处为测试使用===============================
        this.tipsPoint = new RedPointTips();
        var x = this.equipLeftList.width - this.tipsPoint.width;
        var y = -this.tipsPoint.height;
        var dis = this.equipLeftList.getElementAt(1);
        this.tipsPoint.addTipsToDis(dis, x, y, "Role");
        this.removeEventListener(egret.Event.RENDER, this.onRender, this);
        //==================================================================
    };
    RoleTab.prototype.remove = function () {
        this.wingMc.gotoAndStop(0);
        this.wingMc = null;
        this.roleMc.gotoAndStop(0);
        this.roleMc = null;
        this.weaponMc.gotoAndStop(0);
        this.weaponMc = null;
        if (!this.m_type) {
            this.reloadingBtn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onReloadBegin, this);
            this.reloadingBtn.removeEventListener(egret.TouchEvent.TOUCH_END, this.onReloadEnd, this);
            this.otherList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onOtherItemTap, this);
            this.CJBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCJTouchHandler, this);
        }
    };
    RoleTab.prototype.setItemInfo = function (item, dataRes) {
        this.m_layer = ViewController.getInstance().getContainer().layer_popup;
        var obj = dataRes;
        var baseAttrSource = [];
        if (!dataRes.attrStrAny) {
            return;
        }
        var qianghua = DataCenter.forgingData.get(Module_roleInfo.curJob + "").get("qianghua");
        var zhuling = DataCenter.forgingData.get(Module_roleInfo.curJob + "").get("zhuling");
        var gem = DataCenter.forgingData.get(Module_roleInfo.curJob + "").get("gem");
        for (var i = 0, len = dataRes.attrStrAny.length; i < len; i++) {
            var obj2 = {
                attrValue: dataRes.attrStrAny[i]
            };
            baseAttrSource.push(obj2);
        }
        var attrQH = this.calculForginUpValue(dataRes.equipPos, qianghua, "qianghua");
        var attrBS = this.calculForginUpValue(dataRes.equipPos, gem, "gem");
        var attrZL = this.calculForginUpValue(dataRes.equipPos, zhuling, "zhuling");
        obj.attrSource = [{ title: "基础属性", renderType: 1, baseAttrSource: baseAttrSource }];
        if (attrQH) {
            obj.attrSource.push(attrQH);
        }
        if (attrBS) {
            obj.attrSource.push(attrBS);
        }
        if (attrZL) {
            obj.attrSource.push(attrZL);
        }
        item.setData(obj);
        PopUpManager.addPopUp(item, true, item.skinName, this.m_layer, 0);
        PopUpManager.startClickHidden(item.skinName, function () {
            item.initData();
            PopUpManager.removePopUp(item.skinName, 0);
        }, this);
    };
    RoleTab.prototype.calculForginUpValue = function (equipPos, operArr, type) {
        var sourceObj = {};
        var title = "";
        var renderType;
        switch (type) {
            case "qianghua":
                title = "强化属性";
                renderType = 1;
                break;
            case "gem":
                title = "宝石属性";
                renderType = 2;
                break;
            case "zhuling":
                title = "注灵属性";
                renderType = 1;
                break;
        }
        var arr = [];
        var len = operArr.length;
        var forginTemple;
        var attrEnum = [];
        var attr = [];
        var num = 0;
        for (var i = 0; i < len; i++) {
            var obj = {};
            forginTemple = temple.TempleManager.select(operArr[i].value);
            if (equipPos === forginTemple.pos) {
                attrEnum = forginTemple.AttrEnum;
                attr = forginTemple.Attr;
                for (var j = 0; j < attrEnum.length; j++) {
                    if (attr[j]) {
                        if (forginTemple.systemType != 2) {
                            obj.attrValue = (GlobalFunc.formatTipsInfo(attrEnum[j]) + "+" + attr[j]);
                        }
                        else {
                            obj.attrValue = "lv" + forginTemple.lev + "\t" + GlobalFunc.formatTipsInfo(attrEnum[j]) + "\t+" + attr[j];
                            obj.gemSource = "gem_icon_red_1_png";
                        }
                        arr.push(obj);
                    }
                }
                break;
            }
        }
        if (arr.length <= 0) {
            //装备没有任何锻造痕迹
            return false;
        }
        sourceObj.baseAttrSource = arr;
        sourceObj.title = title;
        sourceObj.renderType = renderType;
        return sourceObj;
    };
    return RoleTab;
}(eui.Component));
__reflect(RoleTab.prototype, "RoleTab");
//# sourceMappingURL=RoleTab.js.map