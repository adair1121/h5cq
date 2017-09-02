var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Module_player = (function (_super) {
    __extends(Module_player, _super);
    function Module_player() {
        return _super.call(this) || this;
    }
    Module_player.prototype.bindData = function () {
        eui.Binding.bindHandler(DataCenter, ["playerInfo"], this.dealWithPlayerData, this);
    };
    //////////////////////////////数据绑定函数///////////////
    Module_player.prototype.dealWithPlayerData = function () {
        // var bag = DataCenter.basePlayerInfo.bags;
        // this.dealWithBagData(bag);
        // this.createUserBaseVo(DataCenter.basePlayerInfo);
    };
    /**
     * 处理背包数据
     */
    Module_player.prototype.dealWithBagData = function (bag, oper) {
        if (oper === void 0) { oper = 0; }
        var bagArr = [];
        for (var i = 0; i < bag.length; i++) {
            var obj = {};
            obj["num"] = bag[i].num;
            obj["uid"] = bag[i].uid;
            bagArr.push(obj);
        }
        DataCenter.bag.roleBagInfo = bagArr;
    };
    Module_player.prototype.createUserBaseVo = function (data) {
        // var levelId = data.lvl;
        // var lvConfig = this.getTemple(levelId);
        // console.log(lvConfig);
        this.playerBaseVo = new PlayerBaseInfoVo();
        for (var o in data) {
            this.playerBaseVo[o] = data[o];
        }
        // ModuleData_mainUI.playerBaseInfo 
        DataCenter.playerInfoVO = this.playerBaseVo;
        DataCenter.bag.bagNum = data.bagCount;
        // DataCenter.baseInfo.playerBaseInfo = data;
        // this.toDealWithRoleInfoData(this.roleInfo);
    };
    return Module_player;
}(Base_module));
__reflect(Module_player.prototype, "Module_player");
//# sourceMappingURL=Module_player.js.map