var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MainNotify = (function () {
    function MainNotify() {
    }
    return MainNotify;
}());
//==============================界面相关操作=======================================
/**打开背包 */
MainNotify.OPENBAG = "openBag";
/**关闭背包 */
MainNotify.CLOSEBAG = "closeBag";
/**打开角色面板 */
MainNotify.OPENROLEPANEL = "openRolePanel";
/**关闭角色面板 */
MainNotify.CLOSEROLEPANEL = "closeRolePanel";
/**打开排行榜 */
MainNotify.OPENRANKPANEL = "openRankPanel";
/**打开商城面板 */
MainNotify.OPENSTOREPANEL = "openStorePanel";
/** 打开背包熔炼*/
MainNotify.OPENBAGSMELT = "openBagSmelt";
/**关闭背包熔炼*/
MainNotify.CLOSEBAGSMELT = "closeBagSmelt";
/**打开技能面板 */
MainNotify.OPENSKILLPANEL = "openSkillPanel";
/**转生 */
MainNotify.REBORN = "reborn";
/**打开选择角色面板 */
MainNotify.OPENSELECTROLEPANEL = "openSelectRolePanel";
/**关闭选择角色面板 */
MainNotify.CLOSESELECTROLEPANEL = "closeSelectRolePanel";
/**打开主界面 */
MainNotify.OPENMAINPANEL = "openMainPanel";
/**关闭主界面 */
MainNotify.CLOSEMAINPANEL = "closeMainPanel";
MainNotify.CREATENEWROLE = "createNewRole";
MainNotify.DEALACTION = "dealAction";
/**打开创建新角色界面 */
MainNotify.OPENCREATEROLE = "openCreateRole";
/**关闭创建角色界面 */
MainNotify.CLOSECRETEROLE = "closeCreateRole";
/** 打开橙装界面*/
MainNotify.OPENCJPANEL = "openCjPanel";
//====================================元宝金币消费相关================================================
/**购买商品的统一处理 */
MainNotify.BUYITEM = "butItem";
/**从商城以外购买材料 */
MainNotify.OTHERBUYITEM = "otherBuyItem";
/**从商城购买材料 */
MainNotify.STOREBUYITEM = "storeBuyItem";
/** 处理购买后的数据（此事件只针对商城）*/
MainNotify.DEALBUYITEMDATA = "dealBuyItemData";
/**购买物品zong消费发生改变 */
MainNotify.COSTCHANGE = "costChange";
/**添加背包格子 */
MainNotify.HANDSHAKE_ADDBOXNUM = "handShake_addBoxNum";
//=======================================强化提升相关操作============================================
/**翅膀升星 */
MainNotify.STAR_UPGRADE = "star_upGrade";
/**翅膀一键升星 */
MainNotify.AUTO_STAR_UPGRADE = "auto_star_upGrade";
/**翅膀经验提升 */
MainNotify.EXPERIENCE_STAR = "experience_star";
/**翅膀升阶 */
MainNotify.WINGCHANGE = "wingChange";
/**获取龙魂护盾页面数据 */
MainNotify.GETLONGHUN_OR_SHIELD = "getLongHun_or_shield";
/**提升龙魂护盾 */
MainNotify.UP_LONGHUN_OR_HUDUN = "up_longhun_or_hudun";
/**经脉提升 */
MainNotify.JINGMAIUP = "jingMaiUp";
/**使用修为 */
MainNotify.USE_XIUWEI = "use_xiuwei";
/**使用道具 */
MainNotify.USE_GOODS = "use_goods";
//==========================================其它操作====================================
/**职业改变 */
MainNotify.JOBCHAGNE = "jobChange";
/**橙装改变 */
MainNotify.CJCHANGE = "cjChange";
/**显示背包中装备 */
MainNotify.SHOWEQUIP = "showEquip";
/**显示背包中道具 */
MainNotify.SHOWPROP = "showProp";
/**移除背包中item */
MainNotify.REMOVEBAGITEM = "removeBgItem";
/**初始化nav焦点 */
MainNotify.INITNAVFOCUS = "initNavFocus";
/**请求换装 */
MainNotify.RELOADINGCLOTH = "reloadingCloth";
/**换装完成 */
MainNotify.RELOADINGRES = "reloadingRes";
/**血池或法池重置 */
MainNotify.RESET_POOLBALL = "resetPoolBall";
/**血池或法池减少 */
MainNotify.REDUCE_POLLBALL = "reducePollBall";
/**显示poptips */
MainNotify.SHOWPOPTIPS = "showPopTips";
/**橙装合成 */
MainNotify.CJ_ASSEMBLY = "cj_assembly";
/**橙装合成成功 */
MainNotify.CJ_ASSEMBLY_SUCCESS = "cj_assembly_success";
/**橙装分解 */
MainNotify.CJ_DISASSEMBLY = "cj_disassembly";
/**橙装分解成功 */
MainNotify.CJ_DISASSEMBLY_SUCCESS = "cj_disassembly_success";
/**时装激活 */
MainNotify.SJ_ACTIVATE = "sj_activate";
/**时装激活成功 */
MainNotify.SJ_ACTIVATE_SUCCESS = "sj_activate_success";
/**穿上时装 */
MainNotify.SJ_DRESS = "sj_dress";
/**时装成功穿上 */
MainNotify.SJ_DRESS_SUCCESS = "sj_dress_success";
/**时装到期 */
MainNotify.SJ_EXPIRE = "sj_expire";
/**同步时间 */
MainNotify.SYNCTIME = "syncTime";
/**时间计时开始 */
MainNotify.TIMESTART = "timeStart";
/**时间计时结束 */
MainNotify.TIMEEND = "timeEnd";
//===============================================关卡副本相关========================================
/**发送自动挑战请求 */
MainNotify.SENDTOSAUTOCHALLENGE = "sendToSAutoChallenge";
/**打开关卡界面 */
MainNotify.OPENCHALLENGEPANEL = "openChallengePanel";
/**打开副本界面 */
MainNotify.OPENFUBENPANEL = "openFuBenPanel";
/**切换场景 */
MainNotify.CHANGESCENE = "changeScene";
/**当前boss总血量 */
MainNotify.BOSSTOTALHP = "bossTotalHp";
/**boss当前血量 */
MainNotify.BOSSCURHP = "bossCurHp";
///////////////////数据模块//////////////////////////
/**初始化数据 */
MainNotify.INITDATA = "initData";
//////////////////锻造模块////////////////////////
/**打开锻造面板 */
MainNotify.OPENFORGINGPANEL = "openForgingPanel";
//////////////////挑战boss相关////////////////////////
/**打开个人boss页面 */
MainNotify.OPENPERSONALBOSSPANEL = "openPersonalBossPanel";
/**挑战个人boss */
MainNotify.CHALLENGE_PERSONAL_BOSS = "challenge_personal_boss";
/**世界boss复活 */
MainNotify.WORLDBOSSREBIRTH = "worldBossRebirth";
/**挑战全民boss */
MainNotify.CHALLENGE_WORLD_BOSS = "challenge_world_boss";
/**执行额外动作列表操作 */
MainNotify.EXTRACTIONLIST = "extrActionList";
//////////////////聊天////////////////////////
/**打开聊天面板 */
MainNotify.OPENCHATPANEL = "openChatPanel";
/**添加聊天记录 */
MainNotify.ADDCHAT = "addChat";
/**过滤黑名单聊天内容 */
MainNotify.FILTERCHAT = "filterChat";
/**清除过滤 */
MainNotify.CLEARFILTER = "clearFilter";
/**私聊信息 */
MainNotify.PRIVATEDATACATCH = "privateDataCatch";
/**私聊 */
MainNotify.PRIVATESAY = "privateSay";
/**私聊成功 */
MainNotify.SAYSUCESS = "saySuccess";
/**接收私聊信息 */
MainNotify.RECEIVESAY = "receiveSay";
//////////////////好友////////////////////////
/**打开好友面板 */
MainNotify.OPENFRIENDSPANEL = "openFriendsPanel";
// /**添加聊天记录 */
// public static ADDCHAT:string="addChat";
/** 朋友相关操作*/
MainNotify.FRIENDS_OPER = "friends_oper";
/////////////////////邮件/////////////////////////////////////////////////////////
/**打开邮件面板 */
MainNotify.OPENMAILPANEL = "openMailPanel";
__reflect(MainNotify.prototype, "MainNotify");
//# sourceMappingURL=MainNotify.js.map