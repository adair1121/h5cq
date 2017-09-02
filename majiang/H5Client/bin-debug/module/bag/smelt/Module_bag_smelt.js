var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Module_bag_smelt = (function (_super) {
    __extends(Module_bag_smelt, _super);
    function Module_bag_smelt() {
        var _this = _super.call(this) || this;
        _this.smeltNum = 9;
        _this.jobInFo = {};
        return _this;
    }
    /**
     * 解析来自服务器的消息并处理
     * @param msg 模块对应的消息
     */
    Module_bag_smelt.prototype.receiveMsgFromSever = function (msg) {
        switch (msg.S) {
            case proto.MessageType.s_SmeltEquips:
                var smeltMsg = msg;
                this.dealWithSmeltEquipRes(smeltMsg);
                break;
            default:
                break;
        }
    };
    Module_bag_smelt.prototype.bindData = function () {
        this.p_type = PanelType.MAINNAV;
        // eui.Binding.bindHandler(DataCenter,["role1Info","equips"],this.getEquipValue,this);
        eui.Binding.bindHandler(DataCenter, ["bag", "curSmeltGroup"], this.smeltEquipDataChange, this);
    };
    // private getEquipValue(value:proto.ItemData[]):void{
    // 	if(value!= null){
    // 		this.minEquipValueObj = {};
    // 		for(var i:number = 0;i<value.length;i++){
    // 			var obj:any = {};
    // 			var template:data.ItemTemple = temple.TempleManager.select(value[i].TempleID) as data.ItemTemple;
    // 			var itemtype2:any = this.minEquipValueObj[template.itemtype2];
    // 			if(itemtype2 && itemtype2.FightValue){
    // 				if(itemtype2.FightValue > value[i].point){
    // 					this.minEquipValueObj[template.itemtype2] = value[i].point;
    // 				}
    // 			}
    // 			this.minEquipValueObj[template.itemtype2] = value[i].point;
    // 		}
    // 	}
    // }
    Module_bag_smelt.prototype.smeltEquipDataChange = function (value) {
        if (value != null && this.view && this.view.parent && this.view.parent.contains(this.view)) {
            this.setSmeltData(value);
        }
    };
    /**
     * 初始化熔炼装备数据
     */
    Module_bag_smelt.prototype.initSmeltData = function () {
        Module_bag_smelt.source = [];
        for (var i = 0; i < 9; i++) {
            var bgObj = GlobalFunc.setBgData(1);
            this.standBoxData = { equipBoxSource: bgObj.boxS, isEmpty: true };
            Module_bag_smelt.source.push(this.standBoxData);
        }
    };
    /**
     * 接收来自模块间的消息并分发
     * @param msg 消息列表
     */
    Module_bag_smelt.prototype.receiveMsgFromModule = function (msgType, data) {
        if (data === void 0) { data = null; }
        switch (msgType) {
            case MainNotify.OPENBAGSMELT:
                this.createView();
                break;
            default:
                break;
        }
    };
    Module_bag_smelt.prototype.createView = function () {
        if (this.view && this.view.parent && this.view.parent.contains(this.view)) {
            this.removeView(1);
        }
        else {
            //打开背包
            this.view = new View_bag_smelt();
            _super.prototype.createView.call(this);
            this.calculMinFightValue();
            this.setSmeltData(DataCenter.bag.curSmeltGroup);
            eui.Binding.bindProperty(Module_bag_smelt, ["source"], this.view.arrayCollection, "source");
        }
    };
    Module_bag_smelt.prototype.removeView = function (closeState) {
        //关闭背包
        if (this.view && this.view.parent && this.view.parent.contains(this.view)) {
            this.view.removeEvent();
            this.view.parent.removeChild(this.view);
            if (closeState) {
                this.sendMsgToModule([ModuleEnum.MAINUI], MainNotify.INITNAVFOCUS);
            }
        }
    };
    Module_bag_smelt.prototype.setSmeltData = function (data) {
        Module_bag_smelt.source = [];
        Module_bag_smelt.source = GlobalFunc.deepCopy(data);
    };
    Module_bag_smelt.prototype.refreshSmeltData = function (index) {
        Module_bag_smelt.source[index] = this.standBoxData;
        this.setSmeltData(Module_bag_smelt.source);
    };
    /**处理装备熔炼后数据 */
    Module_bag_smelt.prototype.dealWithSmeltEquipRes = function (smeltMsg) {
        var obj = [{ type: TipsEnum.TYPE_GOLD, label: "金币", num: smeltMsg.money }];
        PopTipsManager.showPopTips(obj);
        var obj2 = [{ type: TipsEnum.TYPE_EQUIP, label: "强化石", num: smeltMsg.qianghuashi, quality: 4 }];
        PopTipsManager.showPopTips(obj2);
        this.disposeData(Module_bag.equipSource);
        this.disposeData(DataCenter.canSmeltData);
        // var bag:any[] = Module_bag.equipSource;
        // var bagData:any = GlobalFunc.deepCopy(Module_bag.equipSource);
        // DataCenter.bag.roleBagInfo = bagData;
        this.calculMinFightValue();
    };
    Module_bag_smelt.prototype.disposeData = function (data) {
        var operData = data;
        for (var i = 0, flag = true, len = operData.length; i < len; flag ? i++ : i) {
            (function (that) {
                for (var j = 0; j < that.smeltEquipArr.length; j++) {
                    if (operData[i] && operData[i].uid && operData[i].uid === that.smeltEquipArr[j]) {
                        operData.splice(i, 1);
                        flag = false;
                        break;
                    }
                    else {
                        flag = true;
                    }
                }
            })(this);
        }
    };
    /**请求装备熔炼 */
    Module_bag_smelt.prototype.smeltEquip = function () {
        this.smeltEquipArr = [];
        var len = Module_bag_smelt.source.length;
        for (var i = 0; i < len; i++) {
            if (Module_bag_smelt.source[i].uid) {
                this.smeltEquipArr.push((Module_bag_smelt.source[i].uid).toString());
            }
        }
        if (this.smeltEquipArr.length) {
            var smeltMsg = new proto.c_SmeltEquips();
            smeltMsg.InstIdList = this.smeltEquipArr;
            SocketManager.getInstance().sendProto(smeltMsg);
        }
    };
    Module_bag_smelt.prototype.calculMinFightValue = function () {
        this.initSmeltData();
        var arr = DataCenter.canSmeltData;
        var len = arr.length;
        var num = 0;
        if (len) {
            if (len >= 9) {
                num = 9;
            }
            else {
                num = len;
            }
            for (var j = 0; j < num; j++) {
                this.getValue(arr[j], j);
            }
        }
        DataCenter.bag.curSmeltGroup = GlobalFunc.deepCopy(Module_bag_smelt.source);
    };
    Module_bag_smelt.prototype.getValue = function (obj, index) {
        obj["isEmpty"] = false;
        Module_bag_smelt.source[index] = obj;
    };
    return Module_bag_smelt;
}(Base_module));
Module_bag_smelt.source = {};
__reflect(Module_bag_smelt.prototype, "Module_bag_smelt");
//# sourceMappingURL=Module_bag_smelt.js.map