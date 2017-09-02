var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ModuleEnum = (function () {
    function ModuleEnum() {
    }
    return ModuleEnum;
}());
ModuleEnum.MAP = "map";
ModuleEnum.BAG = "bag";
ModuleEnum.BAG_SMELT = "bag_smelt";
ModuleEnum.SKILLPANEL = "skillPanel";
ModuleEnum.RANK = "rank";
ModuleEnum.STORE = "store";
ModuleEnum.ROLEINFO = "ROLEINFO";
ModuleEnum.MAINUI = "mainUI";
ModuleEnum.SELECTROLE = "selectRole";
ModuleEnum.DATA = "data";
ModuleEnum.ACTION = "action";
ModuleEnum.FORGING = "forging";
ModuleEnum.CHAT = "chat";
ModuleEnum.FRIEND = "friend";
ModuleEnum.CHALLENGE = "challenge";
ModuleEnum.FUBEN = "fuBen";
ModuleEnum.MAIL = "mail";
ModuleEnum.CREATEROLE = "createRole";
ModuleEnum.CJ = "cj";
ModuleEnum.BOSS = "boss";
__reflect(ModuleEnum.prototype, "ModuleEnum");
//# sourceMappingURL=ModuleEnum.js.map