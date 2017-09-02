var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Module_bag = (function (_super) {
    __extends(Module_bag, _super);
    function Module_bag() {
        var _this = _super.call(this) || this;
        _this.roleMinEquipValue = {};
        _this.waitSmeltData = [];
        _this.equipChangeItem = 0;
        _this.goodsChangeItem = 0;
        _this.curPage = "";
        _this.deleteArr = [];
        return _this;
    }
    /**
     * 解析来自服务器的消息并处理
     * @param msg 模块对应的消息
     */
    Module_bag.prototype.receiveMsgFromSever = function (msg) {
        switch (msg.S) {
            case proto.MessageType.s_AddItems:
                var bagMsg = msg;
                this.dealWithAddBagData(bagMsg.items);
                break;
            case proto.MessageType.s_ItemAttrChange:
                var changeMsg = msg;
                this.dealWithChangeData(changeMsg);
                break;
            case proto.MessageType.s_BagItem:
                var bagDataMsg = msg;
                this.dealWithBaseBagData(bagDataMsg);
                break;
            case proto.MessageType.s_ItemUse:
                var useGoodsMsg = msg;
                this.dealWithUseGoodsData(useGoodsMsg);
                break;
            default:
                break;
        }
    };
    Module_bag.prototype.bindData = function () {
        this.p_type = PanelType.MAINNAV;
        eui.Binding.bindHandler(this, ["equipChangeItem"], this.equipChange, this);
        eui.Binding.bindHandler(this, ["goodsChangeItem"], this.goodsChange, this);
    };
    //////////////////////////////数据绑定函数///////////////
    Module_bag.prototype.equipChange = function () {
        this.setBagGroupData(Module_bag.equipSource);
    };
    Module_bag.prototype.goodsChange = function () {
        this.setBagGroupData(Module_bag.goodsSource);
    };
    Module_bag.prototype.dealWithBaseBagData = function (value) {
        Module_bag.equipSource = [];
        Module_bag.goodsSource = [];
        this.dealWithBagData(value.ItemList);
    };
    Module_bag.prototype.dealWithUseGoodsData = function (msgData) {
        if (!msgData.type) {
            var obj = { type: TipsEnum.TYPE_WARN, label: msgData.errMsg };
            PopTipsManager.showPopTips([obj]);
        }
        var popArr = [];
        if (msgData.type === 1) {
            //获得物品
            var goodsList = msgData.itemList;
            for (var i = 0, len = goodsList.length, item; i < len; i++) {
                var obj = {};
                item = goodsList[i];
                var template = temple.TempleManager.select(item.TempleID);
                obj.quality = template.itemQuality,
                    obj.num = GlobalFunc.searchAttrValue(data.ItemAttr.count, item.attrList);
                obj.type = TipsEnum.TYPE_EQUIP;
                obj.label = template.name;
                popArr.push(obj);
            }
        }
        else {
            //获得属性
            var attrList = msgData.attrList;
            for (var k = 0, len2 = attrList.length, item2; k < len2; k++) {
                item2 = attrList[k];
                var obj = GlobalFunc.getAttrWordEnum(item2.attrID);
                var obj2 = {};
                obj2.label = obj.word;
                obj2.num = item2.myvalue;
                obj2.color = 0xffffff;
                obj2.type = TipsEnum.TYPE_DEFAULT;
                popArr.push(obj2);
            }
        }
        PopTipsManager.showPopTips(popArr);
    };
    Module_bag.prototype.dealWithAddBagData = function (value) {
        if (value.length) {
            this.dealWithBagData(value);
        }
    };
    /**
     * 修改背包消耗品数量
     */
    Module_bag.prototype.dealWithChangeData = function (changeData) {
        var len = Module_bag.goodsSource.length;
        var count;
        var index;
        for (var i = 0; i < len; i++) {
            if (Module_bag.goodsSource[i].uid === changeData.InstanceId) {
                count = GlobalFunc.searchAttrValue(data.ItemAttr.count, changeData.AttrChangeList);
                Module_bag.goodsSource[i].num = count;
                index = i;
                break;
            }
        }
        DataCenter.goodsSource.modify(changeData.InstanceId + "", count);
        DataCenter.changeItemNum = {};
        var any = { id: 0, num: 0 };
        any.id = changeData.InstanceId;
        any.num = count;
        DataCenter.changeItemNum = any;
        this.setBagGroupData(Module_bag.goodsSource);
        if (!count) {
            Module_bag.goodsSource.splice(index, 1);
            for (var key in DataCenter.goodsUIDgather.dict) {
                if (DataCenter.goodsUIDgather.dict[key] === changeData.InstanceId) {
                    DataCenter.goodsUIDgather.remove(key);
                    break;
                }
            }
        }
    };
    /**
     * 处理背包数据
     */
    Module_bag.prototype.dealWithBagData = function (bag) {
        this.waitSmeltData = [];
        if (!DataCenter.goodsSource) {
            DataCenter.goodsSource = new Dictionary("DataCenterGoodsSource");
        }
        for (var i = 0; i < bag.length; i++) {
            var template = temple.TempleManager.select(bag[i].TempleID);
            var bgObj = GlobalFunc.setBgData(template.itemQuality);
            var searchData = GlobalFunc.searchMoreAttrValue([data.ItemAttr.count, data.ItemAttr.score], bag[i].attrList);
            var obj = {};
            obj.job = template.JOB;
            // obj.sex = template.sex;
            obj.itemType = template.itemtype1;
            obj.icon = template.icon;
            obj.equipPos = template.equipPos;
            obj.label = template.name;
            obj.equipBoxSource = bgObj.boxS;
            obj.itemName = template.name;
            obj.quality = template.itemQuality;
            obj.InstanceId = obj.uid = bag[i].InstanceId;
            // obj.power = template.FightVaule;
            obj.num = searchData[data.ItemAttr.count] ? searchData[data.ItemAttr.count] : 0;
            obj.itemType2 = template.itemtype2;
            obj.TempleID = bag[i].TempleID;
            obj.level = template.needlev;
            obj.point = searchData[data.ItemAttr.score] ? searchData[data.ItemAttr.score] : 0;
            obj.itemDesc = [{ desc: template.needCondition }];
            if (obj.itemType === 2) {
                //装备
                obj.num = 0;
                obj.attrStrAny = [];
                //格式化装备item附加值显示tips
                for (var j = 0, len = bag[i].attrList.length, item; j < len; j++) {
                    item = bag[i].attrList[j];
                    if (item.additional) {
                        obj.attrStrAny.push(GlobalFunc.formatTipsInfo(item.attrID) + item.myvalue + " +" + item.additional);
                    }
                }
                obj.equipSource = Config.path_equip + obj.icon + ".png";
                Module_bag.equipSource.push(obj);
                if (obj.itemType2 === 202) {
                    //橙装
                    var cjTempleObj = DataCenter.CJTempleData[bag[i].TempleID];
                    obj.orangeResolve = cjTempleObj.orangeResolve;
                    DataCenter.cjEquip.push(obj);
                }
            }
            if (obj.itemType === 3 && obj.num) {
                //物品
                obj.canUse = template.canUse;
                obj.equipSource = Config.path_goods + obj.icon + ".png";
                Module_bag.goodsSource.push(obj);
                DataCenter.goodsSource.add(obj.uid + "", obj.num);
                if (DataCenter.goodsUIDgather.hasKey(obj.TempleID)) {
                    DataCenter.goodsUIDgather.modify(obj.TempleID + "", obj.uid + "");
                }
                else {
                    DataCenter.goodsUIDgather.add(obj.TempleID + "", obj.uid + "");
                }
            }
            if (!DataCenter.BagitemType2Gather[obj.itemType2]) {
                DataCenter.BagitemType2Gather[obj.itemType2] = [];
            }
            DataCenter.BagitemType2Gather[obj.itemType2].push(obj);
        }
        if (this.curPage === MainNotify.SHOWEQUIP) {
            this.equipChangeItem = Math.random();
        }
        else {
            this.goodsChangeItem = Math.random();
        }
        var arr = GlobalFunc.deepCopy(Module_bag.equipSource);
        for (var i = 0, len = arr.length, bagItem; i < len; i++) {
            bagItem = arr[i];
            if (bagItem.itemType2 === 202) {
                continue;
            }
            this.formatSmeltData(bagItem);
        }
        this.dealWithSmeltData();
    };
    /**格式化装备数据存储 */
    Module_bag.prototype.formatSmeltData = function (obj) {
        var key = obj.equipPos.join("-");
        if (!DataCenter.smeltData[obj.job]) {
            DataCenter.smeltData[obj.job] = {};
        }
        if (!DataCenter.smeltData[obj.job][key]) {
            DataCenter.smeltData[obj.job][key] = [];
        }
        DataCenter.smeltData[obj.job][key].push(obj);
    };
    Module_bag.prototype.dealWithSmeltData = function () {
        DataCenter.canSmeltData = [];
        this.deleteArr = [];
        for (var JOB in DataCenter.smeltData) {
            var equipObj = DataCenter.smeltData[JOB];
            for (var key2 in equipObj) {
                var pos = key2.split("-");
                var equipList = GlobalFunc.deepCopy(equipObj[key2]);
                var arr = GlobalFunc.sortRule(GlobalFunc.REVERSE, "point", equipList);
                if (pos.length < 2) {
                    //单个装备
                    var firstEquipPoint = arr.shift();
                    DataCenter.canSmeltData = DataCenter.canSmeltData.concat(arr);
                    if (!parseInt(JOB)) {
                        //该装备为通用装备
                        DataCenter.canSmeltData.push(firstEquipPoint);
                    }
                    else {
                        var pointObj = DataCenter.roleMinEquipValueObj[JOB];
                        if (pointObj && pointObj[pos[0]] && firstEquipPoint.point <= pointObj[pos[0]]) {
                            DataCenter.canSmeltData.push(firstEquipPoint);
                        }
                    }
                }
                else {
                    var maxEquipPoint = arr.shift();
                    var minEquipPoint = arr.shift();
                    DataCenter.canSmeltData = DataCenter.canSmeltData.concat(arr);
                    var point1Obj = DataCenter.roleMinEquipValueObj[JOB];
                    var index1 = parseInt(pos[0]);
                    var index2 = parseInt(pos[1]);
                    if (point1Obj && point1Obj[index1] && point1Obj[index2]) {
                        var minV = Math.min(point1Obj[index1], point1Obj[index2]);
                        var maxV = Math.max(point1Obj[index1], point1Obj[index2]);
                        if (maxEquipPoint && maxEquipPoint.point <= minV) {
                            DataCenter.canSmeltData.push(maxEquipPoint);
                        }
                        if (minEquipPoint && minEquipPoint.point <= maxV) {
                            DataCenter.canSmeltData.push(minEquipPoint);
                        }
                    }
                    if (point1Obj && point1Obj[index1] && !point1Obj[index2]) {
                        if (minEquipPoint && minEquipPoint.point <= point1Obj[index1]) {
                            DataCenter.canSmeltData.push(minEquipPoint);
                        }
                    }
                    if (pointObj && !point1Obj[index1] && point1Obj[index2]) {
                        if (minEquipPoint && minEquipPoint.point <= point1Obj[index2]) {
                            DataCenter.canSmeltData.push(minEquipPoint);
                        }
                    }
                }
            }
        }
        DataCenter.smeltData = {};
    };
    /**
     * 接收来自模块间的消息并分发
     * @param msg 消息列表
     */
    Module_bag.prototype.receiveMsgFromModule = function (msgType, dataRes) {
        if (dataRes === void 0) { dataRes = null; }
        switch (msgType) {
            case MainNotify.OPENBAG:
                this.createView();
                break;
            case MainNotify.SHOWEQUIP:
                this.curPage = MainNotify.SHOWEQUIP;
                this.setBagGroupData(Module_bag.equipSource);
                break;
            case MainNotify.SHOWPROP:
                this.curPage = MainNotify.SHOWPROP;
                this.setBagGroupData(Module_bag.goodsSource);
                break;
            case MainNotify.REMOVEBAGITEM:
                for (var j = 0; j < dataRes.length; j++) {
                    var itemTemple = temple.TempleManager.select(dataRes[j].TempleID);
                    var source = [];
                    if (itemTemple.itemtype1 === 2) {
                        source = Module_bag.equipSource;
                    }
                    else if (itemTemple.itemtype1 === 3) {
                        source = Module_bag.goodsSource;
                    }
                    var specialSource = DataCenter.BagitemType2Gather[itemTemple.itemtype2];
                    var cjData = DataCenter.CJData;
                    if (specialSource && specialSource.length) {
                        for (var k = 0; k < specialSource.length; k++) {
                            if (dataRes[j].InstanceId === specialSource[k].uid) {
                                specialSource.splice(k, 1);
                                break;
                            }
                        }
                    }
                    if (cjData && cjData.length && itemTemple.itemtype2 == 202) {
                        for (var n = 0; n < cjData.length; n++) {
                            if (dataRes[j].InstanceId === cjData[n].uid) {
                                cjData.splice(n, 1);
                                break;
                            }
                        }
                    }
                    for (var i = 0; i < source.length; i++) {
                        if (dataRes[j].InstanceId === source[i].uid) {
                            source.splice(i, 1);
                            break;
                        }
                    }
                }
                // this.setBagGroupData(Module_bag.equipSource);
                break;
            default:
                break;
        }
    };
    //========================发送消息到服务器============================
    /**发送物品使用数据 */
    Module_bag.prototype.sendUseGoodsDataToS = function (dataObj) {
        var useGoodsMsg = new proto.c_ItemUse();
        useGoodsMsg.templateId = dataObj.templateId;
        useGoodsMsg.useCount = dataObj.useCount;
        SocketManager.getInstance().sendProto(useGoodsMsg);
    };
    /**增加背包格子 */
    Module_bag.prototype.sendAddBoxNumToS = function (dataObj) {
        var bagMsg = new proto.c_AddBag();
        bagMsg.num = dataObj.num;
        SocketManager.getInstance().sendProto(bagMsg);
    };
    Module_bag.prototype.createView = function () {
        if (this.view && this.view.parent && this.view.parent.contains(this.view)) {
            this.removeView(1);
        }
        else {
            //打开背包
            this.view = new View_bag();
            _super.prototype.createView.call(this);
            this.view.initBtnState();
            this.curPage = MainNotify.SHOWEQUIP;
            this.setBagGroupData(Module_bag.equipSource);
            this.bagWatch = eui.Binding.bindProperty(this, ["source"], this.view.arrayCollection, "source");
            this.bagBoxWatch = eui.Binding.bindHandler(DataCenter.playerAttr, [data.PlayerAttr.bagcount + ""], this.boxNumChange, this);
        }
    };
    /**背包格子数据改变 */
    Module_bag.prototype.boxNumChange = function (value) {
        if (value != null && this.view && this.view.parent && this.view.parent.contains(this.view)) {
            this.view.refreshBoxNum(Module_bag.equipSource.length, value);
        }
    };
    /**
     * 关闭界面
     * @param closeState 关闭状态  0为被动关闭 1为主动关闭
     */
    Module_bag.prototype.removeView = function (closeState) {
        //关闭背包
        if (this.view && this.view.parent && this.view.parent.contains(this.view)) {
            this.view.removeEvent();
            this.curPage = "";
            this.bagWatch.unwatch();
            this.bagBoxWatch.unwatch();
            this.view.module = null;
            this.view.parent.removeChild(this.view);
            if (closeState) {
                this.sendMsgToModule([ModuleEnum.MAINUI], MainNotify.INITNAVFOCUS);
            }
        }
    };
    /**
     * 设置背包数据
     */
    Module_bag.prototype.setBagGroupData = function (data) {
        this.source = [];
        this.source = data;
        if (this.view && this.view.parent && this.view.parent.contains(this.view)) {
            this.view.refreshDataGroup(this.source.length);
        }
    };
    Module_bag.prototype.setItemInfo = function (item, dataRes) {
        this.m_layer = ViewController.getInstance().getContainer().layer_popup;
        var obj = dataRes;
        if (dataRes.itemType === 2) {
            var baseAttrSource = [];
            for (var i = 0, len = dataRes.attrStrAny.length; i < len; i++) {
                var obj2 = {
                    attrValue: dataRes.attrStrAny[i]
                };
                baseAttrSource.push(obj2);
            }
            obj.attrSource = [{ title: "基础属性", renderType: 1, baseAttrSource: baseAttrSource }];
            item.setData(obj);
            PopUpManager.addPopUp(item, true, item.skinName, this.m_layer, 0);
        }
        else if (dataRes.itemType === 3) {
            //物品tips皮肤状态 0为不可使用  1为可使用
            obj.canUse ? obj.skinType = 1 : obj.skinType = 0;
            item.setGoodsPopInfo(obj);
            PopUpManager.addPopUp(item, true, item.skinName, this.m_layer, 0);
        }
        PopUpManager.startClickHidden(item.skinName, function () {
            item.initData();
            PopUpManager.removePopUp(item.skinName, 0);
        }, this);
    };
    return Module_bag;
}(Base_module));
Module_bag.goodsSource = [];
Module_bag.equipSource = [];
__reflect(Module_bag.prototype, "Module_bag");
//# sourceMappingURL=Module_bag.js.map