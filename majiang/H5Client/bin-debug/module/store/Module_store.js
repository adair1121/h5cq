var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Module_store = (function (_super) {
    __extends(Module_store, _super);
    function Module_store() {
        return _super.call(this) || this;
    }
    Module_store.prototype.bindData = function () {
        eui.Binding.bindHandler(Module_store, ["storeData"], this.storeDataChange, this);
        eui.Binding.bindHandler(DataCenter.playerAttr, [data.PlayerAttr.gongxun + ""], this.gongxunChange, this);
        eui.Binding.bindHandler(DataCenter.playerAttr, [data.PlayerAttr.shopScore + ""], this.jifenChange, this);
    };
    Module_store.prototype.storeDataChange = function (value) {
        if (value && this.view && this.view.parent && this.view.parent.contains(this.view)) {
            this.view.refreshData(value);
        }
    };
    Module_store.prototype.gongxunChange = function (value) {
        if (value && this.view && this.view.parent && this.view.parent.contains(this.view)) {
            this.view.refreshGongxunValue(value);
        }
    };
    Module_store.prototype.jifenChange = function (value) {
        if (value && this.view && this.view.parent && this.view.parent.contains(this.view)) {
            this.view.refreshMyScore(value);
        }
    };
    /**
     * 接收来自模块间的消息并分发
     * @param msg 消息列表
     */
    Module_store.prototype.receiveMsgFromModule = function (msgType, dataRes) {
        if (dataRes === void 0) { dataRes = null; }
        switch (msgType) {
            case MainNotify.OPENSTOREPANEL:
                this.createView();
                break;
            case MainNotify.DEALBUYITEMDATA:
                this.dealWithBuyData();
                break;
            default:
                break;
        }
    };
    /**
     * 解析来自服务器的消息并处理
     * @param msg 模块对应的消息
     */
    Module_store.prototype.receiveMsgFromSever = function (msg) {
        switch (msg.S) {
            case proto.MessageType.s_RequestShop:
                var shopMsg = msg;
                if (shopMsg.remainRefreshSeconds && this.view && this.view.parent && this.view.parent.contains(this.view)) {
                    Module_store.timeSpan = shopMsg.remainRefreshSeconds;
                    this.view.refreshCurTime(Module_store.timeSpan);
                }
                if (shopMsg.isRefresh) {
                    DataCenter.steryShopData = [];
                    this.dealWithStoreData(shopMsg.templateIdList, 0);
                }
                else {
                    this.setStoreData(DataCenter.steryShopData);
                    return;
                }
                break;
            // case proto.MessageType.s_BuyItem:
            // 	var buy Msg:proto.s_BuyItem = msg as proto.s_BuyItem;
            // 	if(!buyMsg.isSuccess){
            // 		var obj:any[] = [{type:TipsEnum.TYPE_WARN,label:"购买失败"}];
            // 		PopTipsManager.showPopTips(obj);
            // 	}else{
            // 		this.dealWithBuyData();
            // 	}
            // 	break;
            // case proto.MessageType.s_BuyAllItem:
            // 	var buyAllMsg:proto.s_BuyAllItem = msg as proto.s_BuyAllItem;
            // 	if(!buyAllMsg.isSuccess){
            // 		var obj:any[] = [{type:TipsEnum.TYPE_WARN,label:"购买失败"}];
            // 		PopTipsManager.showPopTips(obj);
            // 	}else{
            // 		Module_store.typeData[Module_store.storeType] = [];
            // 		this.setStoreData([]);
            // 	}
            // 	break;
            default:
                break;
        }
    };
    //============================处理服务器返回数据==============================
    Module_store.prototype.dealWithStoreData = function (items, type) {
        var arr = [];
        for (var i = 0; i < items.length; i++) {
            var obj = {};
            var shopItem = temple.TempleManager.select(items[i]);
            var template = temple.TempleManager.select(shopItem.ItemID);
            obj.itemId = shopItem.ID;
            obj.shopType = shopItem.shopType;
            obj.cost = shopItem.sellPrice;
            obj.goodsNum = shopItem.itemNumber;
            obj.itemName = shopItem.sellName;
            obj.moneyType = shopItem.sellPriceType;
            obj.disCount = shopItem.ratio;
            obj.point = template.FightVaule;
            if (template.itemtype1 === 2) {
                //当前是装备
                // for(var j:number = 0,len:number = template.num.length,item:number[] = template.Value;j<len;j++){
                // 	item = shopItem.item.attrList[j];
                // 	obj.attrStrAny.push(GlobalFunc.formatTipsInfo(item));
                // 	obj.score = obj.power = (data.ItemAttr.score === item.attrID?item.myvalue:0);
                // }
                obj.job = template.JOB;
                obj.imgS = obj.equipSource = Config.path_equip + template.icon + ".png";
                obj.templeId = shopItem.ItemID;
                obj.level = template.name;
                obj.quality = template.itemQuality;
                // obj.score = shopItem.item.point;
                var num = this.calculEquipScore(obj.point, template.equipPos, template.JOB);
                obj.scoreUp = num ? num : 0;
            }
            else {
                obj.lev = template.needlev;
                obj.desc = template.needCondition;
                obj.imgS = Config.path_goods + template.icon + ".png";
                obj.scoreUp = 0;
                obj.quality = template.itemQuality;
            }
            arr.push(obj);
        }
        var unitArr = this.getStoreGather(type);
        unitArr = GlobalFunc.deepCopy(arr);
        if (!type) {
            DataCenter.steryShopData = GlobalFunc.deepCopy(arr);
        }
        if (Module_store.storeType === type) {
            this.setStoreData(GlobalFunc.deepCopy(arr));
        }
    };
    Module_store.prototype.calculEquipScore = function (power, equipPos, job) {
        var arr2 = [];
        if (equipPos.length >= 2) {
            if (!job || !DataCenter.roleMinEquipValueObj[job]) {
                return;
            }
            var power1 = DataCenter.roleMinEquipValueObj[job][equipPos[0]];
            var power2 = DataCenter.roleMinEquipValueObj[job][equipPos[1]];
            if (power1 && power2) {
                var minV = Math.min(power1, power2);
                if (power > minV) {
                    return power - minV;
                }
                return 0;
            }
            return power;
        }
        else {
            if (!job || !DataCenter.roleMinEquipValueObj[job]) {
                return;
            }
            var equipPower = DataCenter.roleMinEquipValueObj[job][equipPos[0]];
            if (equipPower) {
                if (power > equipPower) {
                    return power - equipPower;
                }
                else {
                    return 0;
                }
            }
            return power;
        }
    };
    /**
     * 设置item弹窗信息数据
     */
    // public setItemInfo(item:Bag_itemInfo,dataRes:any):void{
    // 	var m_layer:eui.Component = ViewController.getInstance().getContainer().layer_popup;
    // 	var obj = dataRes;
    // 	// obj.power = 21365;
    // 	var templeId:number = dataRes.templeId;
    // 	var template:data.ItemTemple = temple.TempleManager.select(templeId) as data.ItemTemple;
    // 	var extra:any = dataRes.extra;
    // 	var baseAttrSource:any[] = [];
    // 	for(var key in extra){
    // 		var obj2:any ={
    // 			attrTitle:AttrNameUtil.getInstance().getAttrName(parseInt(key),3)+":",
    // 			attrValue: dataRes.cattr[key] + "+"+extra[key]
    // 		}
    // 		if(extra[key]){
    // 			baseAttrSource.push(obj2);
    // 		}
    // 	}
    // 	obj.attrSource = [{title:"基础属性",renderType:1,baseAttrSource:baseAttrSource}]
    // 	item.setData(obj);
    // 	PopUpManager.addPopUp(item,true,item.skinName,m_layer,0);
    // 	PopUpManager.startClickHidden(item.skinName,()=>{
    // 		item.initData();
    // 		PopUpManager.removePopUp(item.skinName,0);
    // 	},this);
    // }
    //处理购买神秘商店道具
    Module_store.prototype.dealWithBuyData = function () {
        if (!Module_store.storeType) {
            var arr = DataCenter.steryShopData;
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].itemId === Module_store.buyItemId) {
                    arr.splice(i, 1);
                    break;
                }
            }
            this.setStoreData(arr);
        }
    };
    //====================================向服务器发起请求=====================================
    // public buyAll():void{
    // 	var arr:any[] = Module_store.typeData[Module_store.storeType];
    // 	var allMoney:number = 0;
    // 	var allGold:number = 0;
    // 	for(var i:number = 0;i < arr.length;i++){
    // 		arr[i].moneyType === 34?allGold += arr[i].cost:allMoney += arr[i].cost;
    // 	}
    // 	var msg:string = "";
    // 	if(allGold){
    // 		if(allGold > DataCenter.playerAttr[data.PlayerAttr.gold]){
    // 			var obj:any[] = [{type:TipsEnum.TYPE_WARN,label:"元宝不足"}];
    // 			PopTipsManager.showPopTips(obj);
    // 			return;
    // 		}
    // 	}
    // 	if(allMoney){
    // 		if(allMoney > DataCenter.playerAttr[data.PlayerAttr.money]){
    // 			var obj:any[] = [{type:TipsEnum.TYPE_WARN,label:"金币不足"}];
    // 			PopTipsManager.showPopTips(obj);
    // 			return;
    // 		}
    // 	}
    // 	var msg_buyAll:proto.c_BuyAllItem = new proto.c_BuyAllItem();
    // 	SocketManager.getInstance().sendProto(msg_buyAll);
    // }
    /**购买单个物品 */
    // public singleBuy(dataObj:any):void{
    // 	var msg_buyItem:proto.c_BuyItem = new proto.c_BuyItem();
    // 	msg_buyItem.ID = dataObj.itemID;
    // 	Module_store.buyItemId = dataObj.itemID;
    // 	msg_buyItem.num = dataObj.num;
    // 	SocketManager.getInstance().sendProto(msg_buyItem);
    // }
    /**神秘商城刷新 */
    Module_store.prototype.refreshSteryShop = function () {
        var refreshMsg = new proto.c_ManualRefresh();
        SocketManager.getInstance().sendProto(refreshMsg);
    };
    /**获取商城数据 */
    Module_store.prototype.getStoreData = function (obj) {
        var arr = this.getStoreGather(obj.type);
        if (obj.type) {
            //当前商店非神秘商店
            if (!arr.length) {
                var arr2 = DataCenter.storeData[obj.type + 1];
                this.dealWithStoreData(arr2, obj.type);
                return;
            }
            else {
                this.setStoreData(arr);
            }
        }
        else {
            //当前为神秘商店逻辑判断
            if (obj.isRefresh) {
                //主动刷新神秘商店
                var storeMsg = new proto.c_RequestShop();
                SocketManager.getInstance().sendProto(storeMsg);
                return;
            }
            else {
                this.setStoreData(GlobalFunc.deepCopy(DataCenter.steryShopData));
                if (Module_store.timeSpan) {
                    this.view.refreshCurTime(Module_store.timeSpan);
                }
            }
        }
    };
    Module_store.prototype.getStoreGather = function (type) {
        var arr;
        switch (type) {
            case 1:
                arr = Module_store.propData;
                break;
            case 2:
                arr = Module_store.gongxunData;
                break;
            case 3:
                arr = Module_store.jifenData;
                break;
        }
        return arr;
    };
    //===========================界面相关处理=================================
    Module_store.prototype.setStoreData = function (source) {
        Module_store.storeData = [];
        if (source.length) {
            Module_store.storeData = source;
        }
    };
    Module_store.prototype.createView = function () {
        this.view = new View_store();
        _super.prototype.createView.call(this);
        Module_store.storeType = 0;
        this.getStoreData({ type: 0, isRefresh: true });
    };
    Module_store.prototype.removeView = function () {
        if (this.view && this.view.parent && this.view.parent.contains(this.view)) {
            this.view.removeEvent();
            this.view.parent.removeChild(this.view);
        }
    };
    Module_store.prototype.compareFight = function (item1, item2) {
        var a = item1.point;
        var b = item2.point;
        if (a > b) {
            return 1;
        }
        else if (a < b) {
            return -1;
        }
        else {
            return 0;
        }
    };
    return Module_store;
}(Base_module));
Module_store.storeData = [];
Module_store.propData = [];
Module_store.gongxunData = [];
Module_store.jifenData = [];
__reflect(Module_store.prototype, "Module_store");
//# sourceMappingURL=Module_store.js.map