var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var proto;
(function (proto) {
    var Processor = (function (_super) {
        __extends(Processor, _super);
        function Processor() {
            return _super.call(this) || this;
        }
        Processor.prototype.handle = function (p) {
            if (this.commands[p.S]) {
                this.commands[p.S](p);
            }
        };
        Processor.prototype.do_close = function () {
            console.log("与服务器断开连接");
        };
        Processor.prototype.do_connect = function () {
            console.log("连接服务器成功");
            var msg_login = new proto.c_Login();
            msg_login.name = Config.username;
            msg_login.pass = Config.password;
            msg_login.isReLogin = false;
            SocketManager.getInstance().sendProto(msg_login);
        };
        /**初始化数据 */
        Processor.prototype.do_s_Map_Player = function (mess) {
            ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.DATA], mess);
        };
        /**登录 */
        Processor.prototype.do_s_Login = function (mess) {
            ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.DATA], mess);
        };
        /**创建场景 */
        Processor.prototype.do_s_CreateNewSence = function (mess) {
            ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.MAP], mess);
        };
        /**动作列表 */
        Processor.prototype.do_s_SendMessbox = function (mess) {
            ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.ACTION], mess);
        };
        // /**换装 */
        Processor.prototype.do_s_ChangeEquip = function (mess) {
            ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.ROLEINFO], mess);
        };
        // /**添加背包物品 */
        Processor.prototype.do_s_AddItems = function (mess) {
            ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.BAG], mess);
        };
        /**使用物品 */
        Processor.prototype.do_s_ItemUse = function (mess) {
            ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.BAG], mess);
        };
        /**修改背包物品 */
        Processor.prototype.do_s_ItemAttrChange = function (mess) {
            ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.BAG], mess);
        };
        /**获取背包数据 */
        Processor.prototype.do_s_BagItem = function (mess) {
            ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.BAG], mess);
        };
        /**单个技能升级 */
        Processor.prototype.do_s_skill_up = function (mess) {
            ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.SKILLPANEL], mess);
        };
        /**全部技能升级 */
        Processor.prototype.do_s_skillAllUp = function (mess) {
            ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.SKILLPANEL], mess);
        };
        /**翅膀升星 */
        Processor.prototype.do_s_wings_up = function (mess) {
            ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.ROLEINFO], mess);
        };
        /**翅膀升阶 */
        Processor.prototype.do_s_wings_levup = function (mess) {
            ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.ROLEINFO], mess);
        };
        /**装备熔炼 */
        Processor.prototype.do_s_SmeltEquips = function (mess) {
            ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.BAG_SMELT], mess);
        };
        /**属性改变 */
        Processor.prototype.do_s_RoleAttrChange = function (mess) {
            ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.MAINUI, ModuleEnum.DATA], mess);
        };
        /**使用修为 */
        Processor.prototype.do_s_GetXiuWei = function (mess) {
            ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.ROLEINFO], mess);
        };
        /**转生 */
        Processor.prototype.do_s_Reborn = function (mess) {
            ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.ROLEINFO], mess);
        };
        /**创建角色 */
        Processor.prototype.do_s_CreateRole = function (mess) {
            ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.DATA], mess);
        };
        /**强化 */
        Processor.prototype.do_s_Strengthen = function (mess) {
            ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.FORGING, ModuleEnum.ROLEINFO], mess);
        };
        /**经脉 */
        Processor.prototype.do_s_JingMai_Up = function (mess) {
            ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.ROLEINFO], mess);
        };
        /**经脉升阶 */
        Processor.prototype.do_s_JingMai_LvUp = function (mess) {
            ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.ROLEINFO], mess);
        };
        /**龙魂护盾 */
        Processor.prototype.do_s_SpecialEquip_Up = function (mess) {
            ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.ROLEINFO], mess);
        };
        /**聊天记录 */
        Processor.prototype.do_s_ChatCacheInfo = function (mess) {
            ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.CHAT], mess);
        };
        /**聊天记录 */
        Processor.prototype.do_s_ChatInfo = function (mess) {
            ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.CHAT], mess);
        };
        /**聊天 */
        Processor.prototype.do_s_say = function (mess) {
            ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.CHAT], mess);
        };
        /**商城 */
        Processor.prototype.do_s_RequestShop = function (mess) {
            ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.STORE], mess);
        };
        /**购买物品 */
        Processor.prototype.do_s_BuyItem = function (mess) {
            ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.MAINUI], mess);
        };
        // /**全部购买 */
        // public do_s_BuyAllItem(mess:Pro):void{
        // 	ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.STORE],mess);
        // }
        /**初始化好友数据 */
        // public do_s_SendFriendInit(mess:Pro):void{
        // 	ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.FRIEND],mess);
        // }
        /**刷新好友列表 */
        Processor.prototype.do_s_FriendList = function (mess) {
            ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.FRIEND], mess);
        };
        /**添加聊天记录 */
        Processor.prototype.do_s_PrivateChat = function (mess) {
            ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.FRIEND], mess);
        };
        /**根据名字添加好友返回 */
        Processor.prototype.do_s_FriendAck = function (mess) {
            ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.FRIEND], mess);
        };
        /**更新好友状态 */
        Processor.prototype.do_s_UpdateFriendState = function (mess) {
            ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.FRIEND], mess);
        };
        /**剔除玩家 */
        Processor.prototype.do_s_Kickout = function (mess) {
            ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.MAINUI, ModuleEnum.DATA], mess);
        };
        /**收到邮件 */
        Processor.prototype.do_s_MailList = function (mess) {
            ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.MAIL], mess);
        };
        /**收到过期邮件 */
        Processor.prototype.do_s_RefreshMailExpire = function (mess) {
            ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.MAIL], mess);
        };
        /**领取邮件商品 */
        Processor.prototype.do_s_TakeAward = function (mess) {
            ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.MAIL], mess);
        };
        /**打开邮件 */
        Processor.prototype.do_s_OpenMail = function (mess) {
            ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.MAIL], mess);
        };
        /**获取排行榜信息 */
        Processor.prototype.do_s_GetRankList = function (mess) {
            ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.RANK], mess);
        };
        /**获取排行榜玩家详细信息 */
        Processor.prototype.do_s_GetRankInfo = function (mess) {
            ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.RANK], mess);
        };
        /**排行榜改变 */
        Processor.prototype.do_s_RankChange = function (mess) {
            ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.RANK], mess);
        };
        /**排行榜是否膜拜列表 */
        Processor.prototype.do_s_RankWorship = function (mess) {
            ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.RANK], mess);
        };
        /** 排行榜膜拜*/
        Processor.prototype.do_s_Worship = function (mess) {
            ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.RANK], mess);
        };
        /**橙装合成 */
        Processor.prototype.do_s_AssemblyEquip = function (mess) {
            ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.CJ], mess);
        };
        /**橙装分解 */
        Processor.prototype.do_s_DisassembleEquip = function (mess) {
            ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.CJ], mess);
        };
        /**时装激活 */
        Processor.prototype.do_s_ActiveFashion = function (mess) {
            ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.ROLEINFO], mess);
        };
        /**穿上时装 */
        Processor.prototype.do_s_DressFashion = function (mess) {
            ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.ROLEINFO], mess);
        };
        /**时装过期 */
        Processor.prototype.do_s_FashionExpire = function (mess) {
            ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.ROLEINFO], mess);
        };
        /**时间同步 */
        Processor.prototype.do_s_SyncTime = function (mess) {
            ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.MAINUI], mess);
        };
        /**个人boss战斗返回 */
        Processor.prototype.do_s_PersonalBoss = function (mess) {
            ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.BOSS], mess);
        };
        /**世界boss战斗返回 */
        Processor.prototype.do_s_WorldBoss = function (mess) {
            ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.BOSS], mess);
        };
        /**boss战动作列表接收 */
        Processor.prototype.do_s_NotifyAction = function (mess) {
            ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.ACTION], mess);
        };
        /**个人boss列表 */
        Processor.prototype.do_s_PersonalBossList = function (mess) {
            ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.BOSS], mess);
        };
        /**世界boss列表 */
        Processor.prototype.do_s_WorldBossList = function (mess) {
            ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.BOSS], mess);
        };
        /**同步场景内所有的创建动作 */
        Processor.prototype.do_s_SyncBossPlayer = function (mess) {
            ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.ACTION], mess);
        };
        /**创建boss房间反馈 */
        Processor.prototype.do_s_BossAck = function (mess) {
            ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.BOSS], mess);
        };
        /**退出boss房间 */
        Processor.prototype.do_s_LeaveBossRoom = function (mess) {
            ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.MAINUI], mess);
        };
        return Processor;
    }(proto.MessageHandle));
    proto.Processor = Processor;
    __reflect(Processor.prototype, "proto.Processor");
})(proto || (proto = {}));
//# sourceMappingURL=Processor.js.map