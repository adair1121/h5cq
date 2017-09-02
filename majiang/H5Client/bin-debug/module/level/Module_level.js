var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Module_level = (function (_super) {
    __extends(Module_level, _super);
    function Module_level() {
        return _super.call(this) || this;
    }
    Module_level.prototype.bindData = function () {
        eui.Binding.bindHandler(DataCenter.playerAttr, [data.PlayerAttr.levelStageID + ""], this.levelIdChange, this);
    };
    Module_level.prototype.levelIdChange = function (value) {
        if (value) {
            this.dealWithChallengeData(value);
            this.levelStageId = value;
        }
    };
    /**
     * 接收来自模块间的消息并分发
     * @param msg 消息列表
     */
    Module_level.prototype.receiveMsgFromModule = function (msgType, dataRes) {
        if (dataRes === void 0) { dataRes = null; }
        switch (msgType) {
            case MainNotify.OPENCHALLENGEPANEL:
                this.createView();
                break;
            default:
                break;
        }
    };
    /**
     * 解析来自服务器的消息并处理
     * @param msg 模块对应的消息
     */
    Module_level.prototype.receiveMsgFromSever = function (msg) {
        switch (msg.S) {
            default:
                break;
        }
    };
    /**处理挑战关卡数据 */
    Module_level.prototype.dealWithChallengeData = function (levId) {
        Module_level.levelInfoObj = {};
        var template = temple.TempleManager.select(levId);
        var template2 = temple.TempleManager.select(template.BossMap);
        var bossTemplate = temple.TempleManager.select(template2.MonsterID);
        var obj = {
            money: template.Money,
            exp: template.Exp,
            zhenqi: template.ZhenQi,
            progressValue: template.ProgressRate,
            bossName: bossTemplate.name,
            // bossPath:Config.path_monMc + bossTemplate.model + "_s_5"
            bossPath: Config.path_monMc + "31030_s_5"
        };
        Module_level.levelInfoObj = obj;
    };
    //请求服务器
    Module_level.prototype.startChallenge = function () {
        // var msg_challenge:proto.c_CreateNewSence = new proto.c_CreateNewSence();
        var levelTemple = temple.TempleManager.select(this.levelStageId);
        var bossMap = levelTemple.BossMap;
        // msg_challenge.levelStageID = bossMap;
        // DataCenter.curFuBen = data.SenceType.GuanQia;
        // SocketManager.getInstance().sendProto(msg_challenge);
        // this.removeView();
        // this.sendMsgToModule([ModuleEnum.MAP],MainNotify.INITDATA);
        GlobalFunc.changeSence(bossMap, this);
        this.removeView();
    };
    //页面相关操作
    Module_level.prototype.createView = function () {
        this.view = new View_level();
        _super.prototype.createView.call(this);
        this.view.setViewData(Module_level.levelInfoObj);
    };
    Module_level.prototype.removeView = function () {
        if (this.view && this.view.parent && this.view.parent.contains(this.view)) {
            this.view.removeEvent();
            this.view.parent.removeChild(this.view);
        }
    };
    return Module_level;
}(Base_module));
Module_level.levelInfoObj = {};
__reflect(Module_level.prototype, "Module_level");
//# sourceMappingURL=Module_level.js.map