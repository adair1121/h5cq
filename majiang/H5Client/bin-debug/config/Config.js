var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config = (function () {
    function Config() {
    }
    /**当前游戏宽度 */
    Config.curWidth = function () {
        return egret.MainContext.instance.stage.stageWidth;
    };
    /**当前游戏高度 */
    Config.curHeight = function () {
        return egret.MainContext.instance.stage.stageHeight;
    };
    Config.curStage = function () {
        return egret.MainContext.instance.stage;
    };
    return Config;
}());
/**游戏地址 */
// public static gameHost:string="127.0.0.1";//本机
// public static gameHost:string="192.168.1.50";//开发
Config.gameHost = "192.168.1.51"; //测试
Config.gamePort = 5005;
/**版本号 */
Config.THMVERSION = "0.0.1";
Config.RESVERSION = "0.0.1";
/**测试用户 */
Config.username = "g42";
Config.password = "greentea";
/**窗口大小 */
Config.w_width = 480;
Config.w_height = 800;
/**默认装备资源路径 */
Config.path_default_equip = "resource/assets/picicon/images/public/default/equip/";
/**装备资源路径 */
Config.path_equip = "resource/assets/picicon/images/item/equip/";
/**技能图标资源路径 */
Config.path_skillIcon = "resource/assets/picicon/images/skillIcon/";
/**道具资源路径 */
Config.path_goods = "resource/assets/picicon/images/item/goods/";
/**掉落装备资源 */
Config.path_drop = "resource/assets/picicon/images/item/dropIcon/";
/**人物模型路径（男） */
Config.path_man = "resource/assets/picicon/images/roleInfo/cloth/malebody/";
/**人物模型路径（女） */
Config.path_woman = "resource/assets/picicon/images/roleInfo/cloth/femalebody/";
/**武器模型路径 */
Config.path_weapon = "resource/assets/picicon/images/roleInfo/weapon/";
/**翅膀模型路径 */
Config.path_wing = "resource/assets/movie/wing/";
/**翅膀动态模型内观路径 */
Config.path_wing_in = "resource/assets/movie/wing_in/";
/** 人物动态模型内观路径*/
Config.path_role_in = "resource/assets/movie/role_in/";
/**为期动态资源内观路径 */
Config.path_weapon_in = "resource/assets/movie/weapon_in/";
/**其他资源路径 */
Config.path_public = "resource/assets/picicon/images/public/";
/**boss头像路径 */
Config.path_monHead = "resource/assets/picicon/images/monsterHead/";
/**外观mc路径 */
Config.path_roleMc = "resource/assets/movie/role/";
Config.path_weaponMc = "resource/assets/movie/weapon/";
Config.path_monMc = "resource/assets/movie/monster/";
Config.path_effectMc = "resource/assets/movie/effect/";
Config.path_shadowMc = "resource/assets/movie/shadow/yzm";
Config.path_wingMc = "resource/assets/movie/wing/";
Config.path_buffMc = "resource/assets/movie/buff/";
/**时间戳 */
Config.time_stamps = 0;
__reflect(Config.prototype, "Config");
//# sourceMappingURL=Config.js.map