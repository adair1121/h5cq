var data;
(function (data) {
    var PAttr;
    (function (PAttr) {
        /**
        * 穿戴限制
        **/
        PAttr[PAttr["Ntype"] = 0] = "Ntype";
        /**
        * 品质
        **/
        PAttr[PAttr["Quality"] = 1] = "Quality";
        /**
        * 内观
        **/
        PAttr[PAttr["looks"] = 2] = "looks";
        /**
        * 内观效果
        **/
        PAttr[PAttr["Lcount"] = 3] = "Lcount";
        /**
        * 数据库递增ID
        **/
        PAttr[PAttr["charID"] = 4] = "charID";
        PAttr[PAttr["lev"] = 5] = "lev";
        /**
        * 转生次数
        **/
        PAttr[PAttr["reborn"] = 6] = "reborn";
        PAttr[PAttr["exp"] = 7] = "exp";
        /**
        * 经验，下一级经验
        **/
        PAttr[PAttr["nextexp"] = 8] = "nextexp";
        /**
        * 翅膀经验
        **/
        PAttr[PAttr["wingsexp"] = 9] = "wingsexp";
        /**
        * 翅膀等级
        **/
        PAttr[PAttr["wingslve"] = 10] = "wingslve";
        /**
        * 翅膀星数
        **/
        PAttr[PAttr["wingsstar"] = 11] = "wingsstar";
        /**
        * 羽毛
        **/
        PAttr[PAttr["feather"] = 12] = "feather";
        /**
        * 技能大等级
        **/
        PAttr[PAttr["maxskilllve"] = 13] = "maxskilllve";
        /**
        * 性别
        **/
        PAttr[PAttr["sex"] = 14] = "sex";
        /**
        * 职业
        **/
        PAttr[PAttr["JOB"] = 15] = "JOB";
        /**
        * 阵营
        **/
        PAttr[PAttr["CAMP"] = 16] = "CAMP";
        /**
        * 地图ID
        **/
        PAttr[PAttr["mapid"] = 17] = "mapid";
        /**
        * 头像ID
        **/
        PAttr[PAttr["head"] = 18] = "head";
        PAttr[PAttr["x"] = 19] = "x";
        PAttr[PAttr["y"] = 20] = "y";
        PAttr[PAttr["MHP"] = 21] = "MHP";
        /**
        * 最大HP，MP
        **/
        PAttr[PAttr["MMP"] = 22] = "MMP";
        PAttr[PAttr["HP"] = 23] = "HP";
        /**
        * ------当前HP，当前MP
        **/
        PAttr[PAttr["MP"] = 24] = "MP";
        /**
        * 声望
        **/
        PAttr[PAttr["Reputation"] = 25] = "Reputation";
        /**
        * 人品值
        **/
        PAttr[PAttr["RP"] = 26] = "RP";
        PAttr[PAttr["HPPool"] = 27] = "HPPool";
        PAttr[PAttr["MPPool"] = 28] = "MPPool";
        PAttr[PAttr["bagcount"] = 29] = "bagcount";
        /**
        * 背包格子数量 仓库格子数量
        **/
        PAttr[PAttr["storecount"] = 30] = "storecount";
        PAttr[PAttr["money"] = 31] = "money";
        /**
        * 元宝，金币
        **/
        PAttr[PAttr["gold"] = 32] = "gold";
        /**
        * 绑金
        **/
        PAttr[PAttr["bindgold"] = 33] = "bindgold";
        PAttr[PAttr["bindmoney"] = 34] = "bindmoney";
        /**
        * 暴击率
        **/
        PAttr[PAttr["critial"] = 35] = "critial";
        /**
        * 暴击伤害系数
        **/
        PAttr[PAttr["critcoe"] = 36] = "critcoe";
        /**
        * 抗暴系数
        **/
        PAttr[PAttr["resicritial"] = 37] = "resicritial";
        /**
        * 物攻
        **/
        PAttr[PAttr["ATK"] = 38] = "ATK";
        /**
        * 物防
        **/
        PAttr[PAttr["DEF"] = 39] = "DEF";
        /**
        * 魔攻
        **/
        PAttr[PAttr["MATK"] = 40] = "MATK";
        /**
        * 魔防
        **/
        PAttr[PAttr["MDEF"] = 41] = "MDEF";
        /**
        * 伤害减免百分率
        **/
        PAttr[PAttr["DRD"] = 42] = "DRD";
        /**
        * dmgReduction 物理傷害減免 傷害減免比率
        **/
        PAttr[PAttr["DRDrate"] = 43] = "DRDrate";
        PAttr[PAttr["MDRD"] = 44] = "MDRD";
        /**
        * 魔法傷害減免 傷害減免比率
        **/
        PAttr[PAttr["MDRDrate"] = 45] = "MDRDrate";
        PAttr[PAttr["DRF"] = 46] = "DRF";
        /**
        * dmgReflection 物理傷害反射 物理傷害反射機率
        **/
        PAttr[PAttr["DRFrate"] = 47] = "DRFrate";
        PAttr[PAttr["MDRF"] = 48] = "MDRF";
        /**
        * dmgReflection 法术傷害反射 法术傷害反射機率
        **/
        PAttr[PAttr["MDRFrate"] = 49] = "MDRFrate";
        /**
        * Ignore Target Defense 无视目标防御
        **/
        PAttr[PAttr["Itd"] = 50] = "Itd";
        PAttr[PAttr["LL"] = 51] = "LL";
        /**
        * LEECH LIFE 偷取生命，偷取生命百分比
        **/
        PAttr[PAttr["LLrate"] = 52] = "LLrate";
        PAttr[PAttr["LM"] = 53] = "LM";
        /**
        * LEECH MP 偷取魔法 偷取魔法百分比
        **/
        PAttr[PAttr["LMrate"] = 54] = "LMrate";
        PAttr[PAttr["FR"] = 55] = "FR";
        /**
        * FireResist FireEnchanted 火系抵抗，火系强化
        **/
        PAttr[PAttr["FE"] = 56] = "FE";
        PAttr[PAttr["CR"] = 57] = "CR";
        /**
        * ColdResist ColdEnchanted 冰系强化，冰系抵抗
        **/
        PAttr[PAttr["CE"] = 58] = "CE";
        PAttr[PAttr["LR"] = 59] = "LR";
        /**
        * LightResist LightEnchanted 电系
        **/
        PAttr[PAttr["LE"] = 60] = "LE";
        PAttr[PAttr["PR"] = 61] = "PR";
        /**
        * PoisonResist PoisonEnchanted 毒系
        **/
        PAttr[PAttr["PE"] = 62] = "PE";
        PAttr[PAttr["impaleR"] = 63] = "impaleR";
        /**
        * 穿刺抵抗和增强
        **/
        PAttr[PAttr["impaleE"] = 64] = "impaleE";
        PAttr[PAttr["chopR"] = 65] = "chopR";
        /**
        * 砍削抵抗和增强
        **/
        PAttr[PAttr["chopE"] = 66] = "chopE";
        PAttr[PAttr["horseR"] = 67] = "horseR";
        /**
        * 落马抵抗 落马增强。
        **/
        PAttr[PAttr["horseE"] = 68] = "horseE";
        /**
        * 运输任务的次数?
        **/
        PAttr[PAttr["points"] = 69] = "points";
        /**
        * 金币倍率
        **/
        PAttr[PAttr["goldrate"] = 70] = "goldrate";
        /**
        * 经验倍率
        **/
        PAttr[PAttr["exprate"] = 71] = "exprate";
        /**
        * 技能倍率
        **/
        PAttr[PAttr["skillrate"] = 72] = "skillrate";
        /**
        * 装备爆率
        **/
        PAttr[PAttr["droprate"] = 73] = "droprate";
        /**
        * 玩家自己设置的PK标志
        **/
        PAttr[PAttr["PKFLAG"] = 74] = "PKFLAG";
        /**
        * PK值
        **/
        PAttr[PAttr["PK"] = 75] = "PK";
        /**
        * 战斗力
        **/
        PAttr[PAttr["FightValue"] = 76] = "FightValue";
        /**
        * VIP等级
        **/
        PAttr[PAttr["VIP"] = 77] = "VIP";
        /**
        * VIP经验
        **/
        PAttr[PAttr["VIPexp"] = 78] = "VIPexp";
        /**
        * VIP激活时间
        **/
        PAttr[PAttr["VIPtime"] = 79] = "VIPtime";
        /**
        * boss积分
        **/
        PAttr[PAttr["Bossear"] = 80] = "Bossear";
        /**
        * 不能移动
        **/
        PAttr[PAttr["CantMove"] = 81] = "CantMove";
        /**
        * 不能被攻击
        **/
        PAttr[PAttr["CantHited"] = 82] = "CantHited";
        /**
        * 不能使用魔法
        **/
        PAttr[PAttr["CantUseMP"] = 83] = "CantUseMP";
        /**
        * 不能使用技能
        **/
        PAttr[PAttr["CantUseSkill"] = 84] = "CantUseSkill";
        /**
        * 不能使用技能
        **/
        PAttr[PAttr["CantUseItem"] = 85] = "CantUseItem";
        /**
        * 是否隐身
        **/
        PAttr[PAttr["CantVisible"] = 86] = "CantVisible";
        /**
        * 是否死亡
        **/
        PAttr[PAttr["isDie"] = 87] = "isDie";
        PAttr[PAttr["End"] = 88] = "End";
    })(PAttr = data.PAttr || (data.PAttr = {}));
    var ChannelType;
    (function (ChannelType) {
        /**
        * 世界
        **/
        ChannelType[ChannelType["world"] = 0] = "world";
        /**
        * 公会
        **/
        ChannelType[ChannelType["guild"] = 1] = "guild";
        /**
        * 私聊
        **/
        ChannelType[ChannelType["whisper"] = 2] = "whisper";
        /**
        * 普通
        **/
        ChannelType[ChannelType["map"] = 3] = "map";
        /**
        * 组队
        **/
        ChannelType[ChannelType["group"] = 4] = "group";
        /**
        * 系统提示
        **/
        ChannelType[ChannelType["system"] = 5] = "system";
        ChannelType[ChannelType["GM"] = 6] = "GM";
    })(ChannelType = data.ChannelType || (data.ChannelType = {}));
    var ActionType;
    (function (ActionType) {
        /**
        * 移动
        **/
        ActionType[ActionType["Move"] = 0] = "Move";
        ActionType[ActionType["AddUnit"] = 1] = "AddUnit";
        ActionType[ActionType["RemoveUnit"] = 2] = "RemoveUnit";
        ActionType[ActionType["UseSkill"] = 3] = "UseSkill";
        ActionType[ActionType["ShowDamage"] = 4] = "ShowDamage";
        ActionType[ActionType["Stay"] = 5] = "Stay";
    })(ActionType = data.ActionType || (data.ActionType = {}));
    var RoleState;
    (function (RoleState) {
        /**
        * 死亡
        **/
        RoleState[RoleState["Dead"] = 0] = "Dead";
        RoleState[RoleState["move"] = 1] = "move";
        RoleState[RoleState["attack"] = 2] = "attack";
        RoleState[RoleState["stay"] = 3] = "stay";
        RoleState[RoleState["dizzy"] = 4] = "dizzy";
    })(RoleState = data.RoleState || (data.RoleState = {}));
    var PlayerAttr;
    (function (PlayerAttr) {
        /**
        * VIP等级
        **/
        PlayerAttr[PlayerAttr["VIP"] = 0] = "VIP";
        /**
        * 头像ID
        **/
        PlayerAttr[PlayerAttr["head"] = 1] = "head";
        /**
        * 等级
        **/
        PlayerAttr[PlayerAttr["levID"] = 2] = "levID";
        /**
        * 经验
        **/
        PlayerAttr[PlayerAttr["exp"] = 3] = "exp";
        /**
        * 金钱
        **/
        PlayerAttr[PlayerAttr["money"] = 4] = "money";
        /**
        * 元宝
        **/
        PlayerAttr[PlayerAttr["gold"] = 5] = "gold";
        /**
        * 背包数量
        **/
        PlayerAttr[PlayerAttr["bagcount"] = 6] = "bagcount";
        /**
        * 转生次数
        **/
        PlayerAttr[PlayerAttr["rebornID"] = 7] = "rebornID";
        /**
        * 修为
        **/
        PlayerAttr[PlayerAttr["xiuwei"] = 8] = "xiuwei";
        /**
        * 降级剩余次数
        **/
        PlayerAttr[PlayerAttr["degraderemaincount"] = 9] = "degraderemaincount";
        /**
        * 高级转生丹剩余次数
        **/
        PlayerAttr[PlayerAttr["gaozhuan_remaincount"] = 10] = "gaozhuan_remaincount";
        /**
        * 超级转生丹剩余次数
        **/
        PlayerAttr[PlayerAttr["chaozhuan_remaincount"] = 11] = "chaozhuan_remaincount";
        /**
        * 熔炼等级
        **/
        PlayerAttr[PlayerAttr["ronglianLv"] = 12] = "ronglianLv";
        /**
        * 熔炼值
        **/
        PlayerAttr[PlayerAttr["ronglianValue"] = 13] = "ronglianValue";
        /**
        * 战斗力
        **/
        PlayerAttr[PlayerAttr["FightValue"] = 14] = "FightValue";
        /**
        * 当前关卡挑战波数
        **/
        PlayerAttr[PlayerAttr["LevelCount"] = 15] = "LevelCount";
        /**
        * 神功等级
        **/
        PlayerAttr[PlayerAttr["shengongLvId"] = 16] = "shengongLvId";
        /**
        * 历练值
        **/
        PlayerAttr[PlayerAttr["lilianValue"] = 17] = "lilianValue";
        /**
        * 爵位等级
        **/
        PlayerAttr[PlayerAttr["jueweiLvId"] = 18] = "jueweiLvId";
        /**
        * 月卡剩余天数
        **/
        PlayerAttr[PlayerAttr["yueka_remaincount"] = 19] = "yueka_remaincount";
        /**
        * 贵族特权剩余天数
        **/
        PlayerAttr[PlayerAttr["gztq_remaincount"] = 20] = "gztq_remaincount";
        /**
        * 今日祈福剩余次数
        **/
        PlayerAttr[PlayerAttr["qifu_remaincount"] = 21] = "qifu_remaincount";
        /**
        * 觉醒等级
        **/
        PlayerAttr[PlayerAttr["jx_lv"] = 22] = "jx_lv";
        /**
        * 觉醒真气
        **/
        PlayerAttr[PlayerAttr["jx_zhenqi"] = 23] = "jx_zhenqi";
        /**
        * 觉醒副本挑战剩余次数
        **/
        PlayerAttr[PlayerAttr["jx_tiaozhan_remaincount"] = 24] = "jx_tiaozhan_remaincount";
        /**
        * 战灵等级
        **/
        PlayerAttr[PlayerAttr["zl_lv"] = 25] = "zl_lv";
        /**
        * 战灵经验
        **/
        PlayerAttr[PlayerAttr["zl_exp"] = 26] = "zl_exp";
        /**
        * 战灵品阶
        **/
        PlayerAttr[PlayerAttr["zl_quality"] = 27] = "zl_quality";
        /**
        * 战灵星级
        **/
        PlayerAttr[PlayerAttr["zl_star"] = 28] = "zl_star";
        /**
        * 密藏开启剩余次数
        **/
        PlayerAttr[PlayerAttr["mz_remaincount"] = 29] = "mz_remaincount";
        /**
        * 王者争霸剩余次数
        **/
        PlayerAttr[PlayerAttr["wzzb_remaincount"] = 30] = "wzzb_remaincount";
        /**
        * 黄金矿洞开采次数
        **/
        PlayerAttr[PlayerAttr["hjkd_collect"] = 31] = "hjkd_collect";
        /**
        * 黄金矿洞掠夺次数
        **/
        PlayerAttr[PlayerAttr["hjkd_fight"] = 32] = "hjkd_fight";
        /**
        * 遭遇战出现新敌人时间
        **/
        PlayerAttr[PlayerAttr["zyz_time"] = 33] = "zyz_time";
        /**
        * 宝石副本每日挑战剩余次数
        **/
        PlayerAttr[PlayerAttr["bsfb_remaincount"] = 34] = "bsfb_remaincount";
        /**
        * 静脉副本每日挑战剩余次数
        **/
        PlayerAttr[PlayerAttr["jmfb_remaincount"] = 35] = "jmfb_remaincount";
        /**
        * 龙魂副本每日挑战剩余次数
        **/
        PlayerAttr[PlayerAttr["lhfb_remaincount"] = 36] = "lhfb_remaincount";
        /**
        * 护盾副本每日挑战剩余次数
        **/
        PlayerAttr[PlayerAttr["hdfb_remaincount"] = 37] = "hdfb_remaincount";
        /**
        * 挑战副本已通关关数
        **/
        PlayerAttr[PlayerAttr["tzfb_remaincount"] = 38] = "tzfb_remaincount";
        /**
        * 全民boss每日挑战次数
        **/
        PlayerAttr[PlayerAttr["boss_remaincount"] = 39] = "boss_remaincount";
        /**
        * 全民Boss残留时间秒数
        **/
        PlayerAttr[PlayerAttr["boss_remainSeconds"] = 40] = "boss_remainSeconds";
        /**
        * 全民Boss挑战时间
        **/
        PlayerAttr[PlayerAttr["boss_tz_time"] = 41] = "boss_tz_time";
        /**
        * 50级个人boss每日挑战次数
        **/
        PlayerAttr[PlayerAttr["boss50_remaincount"] = 42] = "boss50_remaincount";
        /**
        * 当前关卡ID
        **/
        PlayerAttr[PlayerAttr["levelStageID"] = 43] = "levelStageID";
        /**
        * 开启背包格子数量
        **/
        PlayerAttr[PlayerAttr["OpenBagCount"] = 44] = "OpenBagCount";
        /**
        * 神秘商店积分
        **/
        PlayerAttr[PlayerAttr["shopScore"] = 45] = "shopScore";
        /**
        * 神秘商店刷新时间
        **/
        PlayerAttr[PlayerAttr["shopRefreshTime"] = 46] = "shopRefreshTime";
        /**
        * 功勋
        **/
        PlayerAttr[PlayerAttr["gongxun"] = 47] = "gongxun";
        /**
        * 强化总等级
        **/
        PlayerAttr[PlayerAttr["qh_totalLv"] = 48] = "qh_totalLv";
        /**
        * 宝石总等级
        **/
        PlayerAttr[PlayerAttr["bs_totalLv"] = 49] = "bs_totalLv";
        /**
        * 护盾总等级
        **/
        PlayerAttr[PlayerAttr["hd_totalLv"] = 50] = "hd_totalLv";
        /**
        * 主线任务ID
        **/
        PlayerAttr[PlayerAttr["mainTaskID"] = 51] = "mainTaskID";
        /**
        * 战斗经验百分比
        **/
        PlayerAttr[PlayerAttr["exp_percent"] = 52] = "exp_percent";
        /**
        * 战斗金钱百分比
        **/
        PlayerAttr[PlayerAttr["money_percent"] = 53] = "money_percent";
        PlayerAttr[PlayerAttr["MAX"] = 54] = "MAX";
    })(PlayerAttr = data.PlayerAttr || (data.PlayerAttr = {}));
    var RoleAttr;
    (function (RoleAttr) {
        /**
        * 最大HP0
        **/
        RoleAttr[RoleAttr["MHP"] = 0] = "MHP";
        /**
        * 最大MP1
        **/
        RoleAttr[RoleAttr["MMP"] = 1] = "MMP";
        /**
        * 攻击2
        **/
        RoleAttr[RoleAttr["ATK"] = 2] = "ATK";
        /**
        * 物防3
        **/
        RoleAttr[RoleAttr["DEF"] = 3] = "DEF";
        /**
        * 魔防4
        **/
        RoleAttr[RoleAttr["MDEF"] = 4] = "MDEF";
        /**
        * 暴击率5
        **/
        RoleAttr[RoleAttr["critial"] = 5] = "critial";
        /**
        * 暴击伤害系数6
        **/
        RoleAttr[RoleAttr["critcoe"] = 6] = "critcoe";
        /**
        * 抗暴系数7
        **/
        RoleAttr[RoleAttr["resicritial"] = 7] = "resicritial";
        /**
        * 麻痹几率8
        **/
        RoleAttr[RoleAttr["palsyRate"] = 8] = "palsyRate";
        /**
        * 麻痹抵抗9
        **/
        RoleAttr[RoleAttr["resiPalsy"] = 9] = "resiPalsy";
        /**
        * 伤害减免10
        **/
        RoleAttr[RoleAttr["DRD"] = 10] = "DRD";
        /**
        * 经脉在表中ID11
        **/
        RoleAttr[RoleAttr["jingmaiID"] = 11] = "jingmaiID";
        /**
        * 翅膀在表中ID12
        **/
        RoleAttr[RoleAttr["wingsID"] = 12] = "wingsID";
        /**
        * 翅膀经验13
        **/
        RoleAttr[RoleAttr["wingsexp"] = 13] = "wingsexp";
        /**
        * 职业14
        **/
        RoleAttr[RoleAttr["job"] = 14] = "job";
        /**
        * 当前HP15
        **/
        RoleAttr[RoleAttr["HP"] = 15] = "HP";
        /**
        * 当前MP16
        **/
        RoleAttr[RoleAttr["MP"] = 16] = "MP";
        /**
        * 性别17
        **/
        RoleAttr[RoleAttr["sex"] = 17] = "sex";
        /**
        * 战斗力18
        **/
        RoleAttr[RoleAttr["FightValue"] = 18] = "FightValue";
        /**
        * x坐标19
        **/
        RoleAttr[RoleAttr["x"] = 19] = "x";
        /**
        * y坐标20
        **/
        RoleAttr[RoleAttr["y"] = 20] = "y";
        /**
        * 角色状态21
        **/
        RoleAttr[RoleAttr["state"] = 21] = "state";
        /**
        * 治疗效果百分比22
        **/
        RoleAttr[RoleAttr["treat_percent"] = 22] = "treat_percent";
        /**
        * 最大生命百分比30
        **/
        RoleAttr[RoleAttr["hp_percent"] = 30] = "hp_percent";
        /**
        * 最大魔法百分比31
        **/
        RoleAttr[RoleAttr["mp_percent"] = 31] = "mp_percent";
        /**
        * 攻击百分比32
        **/
        RoleAttr[RoleAttr["atk_percent"] = 32] = "atk_percent";
        /**
        * 物防百分比33
        **/
        RoleAttr[RoleAttr["def_percent"] = 33] = "def_percent";
        /**
        * 法防百分比34
        **/
        RoleAttr[RoleAttr["mdef_percent"] = 34] = "mdef_percent";
        /**
        * 暴击伤害百分比36
        **/
        RoleAttr[RoleAttr["critcoe_percent"] = 36] = "critcoe_percent";
        RoleAttr[RoleAttr["MAX"] = 37] = "MAX";
    })(RoleAttr = data.RoleAttr || (data.RoleAttr = {}));
    var GuildJob;
    (function (GuildJob) {
        /**
        * 非公会成员
        **/
        GuildJob[GuildJob["notMember"] = 0] = "notMember";
        /**
        * 会长
        **/
        GuildJob[GuildJob["HuiZhang"] = 1] = "HuiZhang";
        /**
        * 副会长
        **/
        GuildJob[GuildJob["FuHuiZhang"] = 2] = "FuHuiZhang";
        /**
        * 长老
        **/
        GuildJob[GuildJob["ZhangLao"] = 3] = "ZhangLao";
        /**
        * 护法
        **/
        GuildJob[GuildJob["HuFa"] = 4] = "HuFa";
        /**
        * 堂主
        **/
        GuildJob[GuildJob["TangZhu"] = 5] = "TangZhu";
        /**
        * 精英
        **/
        GuildJob[GuildJob["JingYing"] = 6] = "JingYing";
        /**
        * 成员
        **/
        GuildJob[GuildJob["ChengYuan"] = 7] = "ChengYuan";
    })(GuildJob = data.GuildJob || (data.GuildJob = {}));
    var FriendEnum;
    (function (FriendEnum) {
        /**
        * 好友列表
        **/
        FriendEnum[FriendEnum["friendsList"] = 0] = "friendsList";
        /**
        * 最近联系人列表
        **/
        FriendEnum[FriendEnum["recentList"] = 1] = "recentList";
        /**
        * 申请人列表
        **/
        FriendEnum[FriendEnum["replyList"] = 2] = "replyList";
        /**
        * 黑名单列表
        **/
        FriendEnum[FriendEnum["blackList"] = 3] = "blackList";
        /**
        * 移除列表
        **/
        FriendEnum[FriendEnum["removeList"] = 4] = "removeList";
    })(FriendEnum = data.FriendEnum || (data.FriendEnum = {}));
    var SenceType;
    (function (SenceType) {
        /**
        * 野外
        **/
        SenceType[SenceType["YeWai"] = 0] = "YeWai";
        SenceType[SenceType["GuanQia"] = 1] = "GuanQia";
        SenceType[SenceType["FuBen"] = 2] = "FuBen";
        SenceType[SenceType["GeRenBoss"] = 3] = "GeRenBoss";
    })(SenceType = data.SenceType || (data.SenceType = {}));
    var ItemAttr;
    (function (ItemAttr) {
        ItemAttr[ItemAttr["MHP"] = 0] = "MHP";
        /**
        * 最大HP，MP
        **/
        ItemAttr[ItemAttr["MMP"] = 1] = "MMP";
        /**
        * 攻击
        **/
        ItemAttr[ItemAttr["ATK"] = 2] = "ATK";
        /**
        * 物防
        **/
        ItemAttr[ItemAttr["DEF"] = 3] = "DEF";
        /**
        * 魔防
        **/
        ItemAttr[ItemAttr["MDEF"] = 4] = "MDEF";
        /**
        * 暴击率
        **/
        ItemAttr[ItemAttr["critial"] = 5] = "critial";
        /**
        * 暴击伤害系数
        **/
        ItemAttr[ItemAttr["critcoe"] = 6] = "critcoe";
        /**
        * 抗暴系数
        **/
        ItemAttr[ItemAttr["resicritial"] = 7] = "resicritial";
        /**
        * 麻痹几率
        **/
        ItemAttr[ItemAttr["palsyRate"] = 8] = "palsyRate";
        /**
        * 麻痹抵抗
        **/
        ItemAttr[ItemAttr["resiPalsy"] = 9] = "resiPalsy";
        /**
        * 伤害减免
        **/
        ItemAttr[ItemAttr["DRD"] = 10] = "DRD";
        /**
        * 物品数量
        **/
        ItemAttr[ItemAttr["count"] = 11] = "count";
        /**
        * 装备位置 只有在身上装备时这属性才有效
        **/
        ItemAttr[ItemAttr["equipPos"] = 12] = "equipPos";
        /**
        * 评分
        **/
        ItemAttr[ItemAttr["score"] = 13] = "score";
        /**
        * 用于标注共有多少属性
        **/
        ItemAttr[ItemAttr["Max"] = 14] = "Max";
    })(ItemAttr = data.ItemAttr || (data.ItemAttr = {}));
    var JobAttr;
    (function (JobAttr) {
        /**
        * 玩家
        **/
        JobAttr[JobAttr["Player"] = 0] = "Player";
        /**
        * 战士
        **/
        JobAttr[JobAttr["JS"] = 1] = "JS";
        /**
        * 法师
        **/
        JobAttr[JobAttr["FS"] = 2] = "FS";
        /**
        * 道士
        **/
        JobAttr[JobAttr["DS"] = 3] = "DS";
    })(JobAttr = data.JobAttr || (data.JobAttr = {}));
    var FriendState;
    (function (FriendState) {
        /**
        * 好友
        **/
        FriendState[FriendState["Friend"] = 0] = "Friend";
        /**
        * 黑名单
        **/
        FriendState[FriendState["Blacklist"] = 1] = "Blacklist";
        /**
        * 移除
        **/
        FriendState[FriendState["Remove"] = 2] = "Remove";
    })(FriendState = data.FriendState || (data.FriendState = {}));
    var ItemType;
    (function (ItemType) {
        /**
        * 武器
        **/
        ItemType[ItemType["weapon"] = 101] = "weapon";
        /**
        * 衣服
        **/
        ItemType[ItemType["clothes"] = 102] = "clothes";
        /**
        * 头盔
        **/
        ItemType[ItemType["helmet"] = 103] = "helmet";
        /**
        * 项链
        **/
        ItemType[ItemType["necklace"] = 104] = "necklace";
        /**
        * 手镯
        **/
        ItemType[ItemType["bracelet"] = 105] = "bracelet";
        /**
        * 戒指
        **/
        ItemType[ItemType["ring"] = 106] = "ring";
        /**
        * 羽毛
        **/
        ItemType[ItemType["feather"] = 107] = "feather";
        /**
        * 强化石
        **/
        ItemType[ItemType["strStone"] = 108] = "strStone";
        /**
        * 经脉丹
        **/
        ItemType[ItemType["jingmaidan"] = 109] = "jingmaidan";
        /**
        * 金钱
        **/
        ItemType[ItemType["money"] = 110] = "money";
        /**
        * 龙魂碎片
        **/
        ItemType[ItemType["dragonSoul"] = 111] = "dragonSoul";
        /**
        * 护盾碎片
        **/
        ItemType[ItemType["shield"] = 112] = "shield";
        /**
        * 转生丹
        **/
        ItemType[ItemType["zhuanshengdan"] = 113] = "zhuanshengdan";
        /**
        * 高级转生丹
        **/
        ItemType[ItemType["seniorZhuanshengdan"] = 114] = "seniorZhuanshengdan";
        /**
        * 超级转生丹
        **/
        ItemType[ItemType["superZhuanshengdan"] = 115] = "superZhuanshengdan";
        /**
        * 注灵石
        **/
        ItemType[ItemType["zhulingshi"] = 116] = "zhulingshi";
        /**
        * 宝石碎片
        **/
        ItemType[ItemType["baoshisuipian"] = 117] = "baoshisuipian";
    })(ItemType = data.ItemType || (data.ItemType = {}));
    var EquipPos;
    (function (EquipPos) {
        /**
        * 天珠0
        **/
        EquipPos[EquipPos["tianzhu"] = 0] = "tianzhu";
        /**
        * 武器1
        **/
        EquipPos[EquipPos["weapon"] = 1] = "weapon";
        /**
        * 头盔2
        **/
        EquipPos[EquipPos["head"] = 2] = "head";
        /**
        * 衣服3
        **/
        EquipPos[EquipPos["body"] = 3] = "body";
        /**
        * 项链4
        **/
        EquipPos[EquipPos["neck"] = 4] = "neck";
        /**
        * 左手镯5
        **/
        EquipPos[EquipPos["left_bracelet"] = 5] = "left_bracelet";
        /**
        * 右手镯6
        **/
        EquipPos[EquipPos["right_bracelet"] = 6] = "right_bracelet";
        /**
        * 左戒指7
        **/
        EquipPos[EquipPos["left_ring"] = 7] = "left_ring";
        /**
        * 右戒指8
        **/
        EquipPos[EquipPos["right_ring"] = 8] = "right_ring";
        /**
        * 麻痹戒指9
        **/
        EquipPos[EquipPos["palsy_ring"] = 9] = "palsy_ring";
        /**
        * 护身戒指10
        **/
        EquipPos[EquipPos["protect_ring"] = 10] = "protect_ring";
        /**
        * 龙魂11
        **/
        EquipPos[EquipPos["dragon_soul"] = 11] = "dragon_soul";
        /**
        * 护盾12
        **/
        EquipPos[EquipPos["shield"] = 12] = "shield";
        /**
        * 法宝1 21
        **/
        EquipPos[EquipPos["fabao1"] = 21] = "fabao1";
        /**
        * 法宝2 22
        **/
        EquipPos[EquipPos["fabao2"] = 22] = "fabao2";
        /**
        * 法宝3 23
        **/
        EquipPos[EquipPos["fabao3"] = 23] = "fabao3";
        /**
        * 法宝4 24
        **/
        EquipPos[EquipPos["fabao4"] = 24] = "fabao4";
        /**
        * 法宝5 25
        **/
        EquipPos[EquipPos["fabao5"] = 25] = "fabao5";
        /**
        * 角色时装201
        **/
        EquipPos[EquipPos["fashion_role"] = 201] = "fashion_role";
        /**
        * 武器时装202
        **/
        EquipPos[EquipPos["fashion_weapon"] = 202] = "fashion_weapon";
        /**
        * 翅膀时装203
        **/
        EquipPos[EquipPos["fashion_wings"] = 203] = "fashion_wings";
    })(EquipPos = data.EquipPos || (data.EquipPos = {}));
    var Race;
    (function (Race) {
        /**
        * 蛮族
        **/
        Race[Race["Barbarian"] = 1] = "Barbarian";
        /**
        * 侏儒
        **/
        Race[Race["dwarf"] = 2] = "dwarf";
        /**
        * 鬼族
        **/
        Race[Race["Guizu"] = 3] = "Guizu";
        /**
        * 蚁族
        **/
        Race[Race["ant"] = 4] = "ant";
        /**
        * 精灵
        **/
        Race[Race["Wizard"] = 5] = "Wizard";
        /**
        * 龙
        **/
        Race[Race["Dragon"] = 6] = "Dragon";
        /**
        * Alliance
        **/
        Race[Race["Industrial"] = 7] = "Industrial";
        /**
        * Alliance
        **/
        Race[Race["Business"] = 8] = "Business";
        /**
        * alliance
        **/
        Race[Race["Military"] = 9] = "Military";
        /**
        * Union
        **/
        Race[Race["Robber"] = 10] = "Robber";
    })(Race = data.Race || (data.Race = {}));
    var Rongyu;
    (function (Rongyu) {
        /**
        * 蛮族
        **/
        Rongyu[Rongyu["Barbarian"] = 0] = "Barbarian";
        /**
        * 侏儒
        **/
        Rongyu[Rongyu["dwarf"] = 1] = "dwarf";
        /**
        * 鬼族
        **/
        Rongyu[Rongyu["Guizu"] = 2] = "Guizu";
        /**
        * 蚁族
        **/
        Rongyu[Rongyu["ant"] = 3] = "ant";
        /**
        * 精灵
        **/
        Rongyu[Rongyu["Wizard"] = 4] = "Wizard";
        /**
        * 龙族
        **/
        Rongyu[Rongyu["Dragon"] = 5] = "Dragon";
        /**
        * Alliance
        **/
        Rongyu[Rongyu["Industrial"] = 6] = "Industrial";
        /**
        * Alliance
        **/
        Rongyu[Rongyu["Business"] = 7] = "Business";
        /**
        * alliance
        **/
        Rongyu[Rongyu["Military"] = 8] = "Military";
        /**
        * Union
        **/
        Rongyu[Rongyu["Robber"] = 9] = "Robber";
        Rongyu[Rongyu["Honor"] = 10] = "Honor";
        Rongyu[Rongyu["PK"] = 11] = "PK";
        /**
        * 师德
        **/
        Rongyu[Rongyu["Ethics"] = 12] = "Ethics";
        /**
        * 战绩
        **/
        Rongyu[Rongyu["Record"] = 13] = "Record";
        /**
        * 帮贡
        **/
        Rongyu[Rongyu["Contribution"] = 14] = "Contribution";
        /**
        * 财富
        **/
        Rongyu[Rongyu["Wealth"] = 15] = "Wealth";
        /**
        * 勇气
        **/
        Rongyu[Rongyu["Appeal"] = 16] = "Appeal";
        /**
        * 藏宝
        **/
        Rongyu[Rongyu["Booty"] = 17] = "Booty";
        /**
        * 冲
        **/
        Rongyu[Rongyu["Equipment"] = 18] = "Equipment";
        /**
        * 富豪
        **/
        Rongyu[Rongyu["Regal"] = 19] = "Regal";
        /**
        * 魅力
        **/
        Rongyu[Rongyu["Charm"] = 20] = "Charm";
        /**
        * 生产
        **/
        Rongyu[Rongyu["Mining"] = 21] = "Mining";
        /**
        * 活跃
        **/
        Rongyu[Rongyu["Active"] = 22] = "Active";
        /**
        * 人气
        **/
        Rongyu[Rongyu["Popularity"] = 23] = "Popularity";
    })(Rongyu = data.Rongyu || (data.Rongyu = {}));
    var MapMode;
    (function (MapMode) {
        MapMode[MapMode["normal"] = 0] = "normal";
        MapMode[MapMode["fight"] = 1] = "fight";
        MapMode[MapMode["hun"] = 2] = "hun";
        MapMode[MapMode["defence"] = 3] = "defence";
        MapMode[MapMode["attack"] = 4] = "attack";
    })(MapMode = data.MapMode || (data.MapMode = {}));
    var PKFLAG;
    (function (PKFLAG) {
        /**
        * 和平
        **/
        PKFLAG[PKFLAG["safe"] = 0] = "safe";
        /**
        * 组队
        **/
        PKFLAG[PKFLAG["group"] = 1] = "group";
        /**
        * 帮会
        **/
        PKFLAG[PKFLAG["guild"] = 2] = "guild";
        /**
        * 善恶
        **/
        PKFLAG[PKFLAG["shane"] = 3] = "shane";
        /**
        * 自由（全体）
        **/
        PKFLAG[PKFLAG["free"] = 4] = "free";
        /**
        * 阵营
        **/
        PKFLAG[PKFLAG["camp"] = 5] = "camp";
    })(PKFLAG = data.PKFLAG || (data.PKFLAG = {}));
    var DamageType;
    (function (DamageType) {
        DamageType[DamageType["none"] = 0] = "none";
        DamageType[DamageType["miss"] = 1] = "miss";
        DamageType[DamageType["addhp"] = 2] = "addhp";
        DamageType[DamageType["minushp"] = 3] = "minushp";
        DamageType[DamageType["addmp"] = 4] = "addmp";
        DamageType[DamageType["minusmp"] = 5] = "minusmp";
        DamageType[DamageType["sp"] = 6] = "sp";
        DamageType[DamageType["baoji"] = 7] = "baoji";
        DamageType[DamageType["lucky"] = 8] = "lucky";
        DamageType[DamageType["fantan"] = 9] = "fantan";
    })(DamageType = data.DamageType || (data.DamageType = {}));
    var MobState;
    (function (MobState) {
        MobState[MobState["Die"] = 0] = "Die";
        MobState[MobState["Wander"] = 1] = "Wander";
        MobState[MobState["Attak"] = 2] = "Attak";
        MobState[MobState["Back"] = 3] = "Back";
        MobState[MobState["Path"] = 4] = "Path";
    })(MobState = data.MobState || (data.MobState = {}));
    var TargetType;
    (function (TargetType) {
        TargetType[TargetType["self"] = 0] = "self";
        TargetType[TargetType["item"] = 1] = "item";
        TargetType[TargetType["unit"] = 2] = "unit";
        TargetType[TargetType["point"] = 3] = "point";
    })(TargetType = data.TargetType || (data.TargetType = {}));
    var UnitState;
    (function (UnitState) {
        /**
        * 普通状态
        **/
        UnitState[UnitState["normal"] = 0] = "normal";
        /**
        * 死亡状态
        **/
        UnitState[UnitState["die"] = 1] = "die";
        /**
        * 移动状态
        **/
        UnitState[UnitState["move"] = 2] = "move";
        /**
        * 吟唱状态
        **/
        UnitState[UnitState["sing"] = 3] = "sing";
        /**
        * 采集状态
        **/
        UnitState[UnitState["collect"] = 4] = "collect";
    })(UnitState = data.UnitState || (data.UnitState = {}));
    var ItemTarget;
    (function (ItemTarget) {
        ItemTarget[ItemTarget["none"] = 0] = "none";
        ItemTarget[ItemTarget["item"] = 1] = "item";
        ItemTarget[ItemTarget["unit"] = 2] = "unit";
        ItemTarget[ItemTarget["friendunit"] = 3] = "friendunit";
        ItemTarget[ItemTarget["enemyunit"] = 4] = "enemyunit";
        ItemTarget[ItemTarget["point"] = 5] = "point";
    })(ItemTarget = data.ItemTarget || (data.ItemTarget = {}));
    var PlayMode;
    (function (PlayMode) {
        /**
        * 无特效
        **/
        PlayMode[PlayMode["none"] = 0] = "none";
        /**
        * 直线飞行
        **/
        PlayMode[PlayMode["fly"] = 1] = "fly";
        /**
        * 直线播放
        **/
        PlayMode[PlayMode["line"] = 2] = "line";
        /**
        * 从头顶降落
        **/
        PlayMode[PlayMode["fall"] = 3] = "fall";
        /**
        * 原地
        **/
        PlayMode[PlayMode["normal"] = 4] = "normal";
        /**
        * 原地带方向（施法者指向目标）
        **/
        PlayMode[PlayMode["normal_arrow"] = 5] = "normal_arrow";
        /**
        * 追踪
        **/
        PlayMode[PlayMode["Trace"] = 6] = "Trace";
        /**
        * 多枚追踪
        **/
        PlayMode[PlayMode["multTrace"] = 7] = "multTrace";
        /**
        * 多枚飞行
        **/
        PlayMode[PlayMode["multfly"] = 8] = "multfly";
    })(PlayMode = data.PlayMode || (data.PlayMode = {}));
    var SkillShape;
    (function (SkillShape) {
        SkillShape[SkillShape["none"] = 0] = "none";
        /**
        * 单体
        **/
        SkillShape[SkillShape["single"] = 1] = "single";
        /**
        * 直线
        **/
        SkillShape[SkillShape["line"] = 2] = "line";
        /**
        * 圆形
        **/
        SkillShape[SkillShape["circle"] = 3] = "circle";
        /**
        * 扇形
        **/
        SkillShape[SkillShape["fan"] = 4] = "fan";
    })(SkillShape = data.SkillShape || (data.SkillShape = {}));
    var ValidTarget;
    (function (ValidTarget) {
        /**
        * 无
        **/
        ValidTarget[ValidTarget["none"] = 0] = "none";
        /**
        * 自己
        **/
        ValidTarget[ValidTarget["self"] = 1] = "self";
        /**
        * 友好
        **/
        ValidTarget[ValidTarget["friend"] = 2] = "friend";
        /**
        * 敌对
        **/
        ValidTarget[ValidTarget["enemy"] = 3] = "enemy";
        /**
        * 掉落物
        **/
        ValidTarget[ValidTarget["dorpitem"] = 4] = "dorpitem";
        /**
        * 采集物
        **/
        ValidTarget[ValidTarget["collect"] = 5] = "collect";
    })(ValidTarget = data.ValidTarget || (data.ValidTarget = {}));
    var JOB;
    (function (JOB) {
        /**
        * 全职业
        **/
        JOB[JOB["all"] = 0] = "all";
        /**
        * 战士
        **/
        JOB[JOB["ZhanShi"] = 1] = "ZhanShi";
        /**
        * 法师
        **/
        JOB[JOB["FaShi"] = 2] = "FaShi";
        /**
        * 道士
        **/
        JOB[JOB["DaoShi"] = 3] = "DaoShi";
    })(JOB = data.JOB || (data.JOB = {}));
    var BuffType;
    (function (BuffType) {
        /**
        * 眩晕
        **/
        BuffType[BuffType["XuanYun"] = 1] = "XuanYun";
        BuffType[BuffType["ChiXuHuiXue"] = 2] = "ChiXuHuiXue";
        BuffType[BuffType["ChiXuJianXue"] = 3] = "ChiXuJianXue";
        BuffType[BuffType["JiaFang"] = 4] = "JiaFang";
        BuffType[BuffType["JianFang"] = 5] = "JianFang";
        BuffType[BuffType["JianShang"] = 6] = "JianShang";
        BuffType[BuffType["ZengShang"] = 7] = "ZengShang";
    })(BuffType = data.BuffType || (data.BuffType = {}));
    var Look;
    (function (Look) {
        /**
        * 上
        **/
        Look[Look["up"] = 1] = "up";
        Look[Look["rihgt_up"] = 2] = "rihgt_up";
        Look[Look["right"] = 3] = "right";
        Look[Look["right_down"] = 4] = "right_down";
        Look[Look["down"] = 5] = "down";
        Look[Look["left_down"] = 6] = "left_down";
        Look[Look["left"] = 7] = "left";
        Look[Look["left_up"] = 8] = "left_up";
    })(Look = data.Look || (data.Look = {}));
    var StrengthenType;
    (function (StrengthenType) {
        /**
        * 强化
        **/
        StrengthenType[StrengthenType["ST_QH"] = 1] = "ST_QH";
        /**
        * 宝石
        **/
        StrengthenType[StrengthenType["ST_BS"] = 2] = "ST_BS";
        /**
        * 注灵
        **/
        StrengthenType[StrengthenType["ST_ZL"] = 3] = "ST_ZL";
        /**
        * 精炼
        **/
        StrengthenType[StrengthenType["ST_JL"] = 4] = "ST_JL";
        /**
        * 铸魂
        **/
        StrengthenType[StrengthenType["ST_ZH"] = 5] = "ST_ZH";
        /**
        * 龙魂
        **/
        StrengthenType[StrengthenType["ST_LH"] = 11] = "ST_LH";
        /**
        * 护盾
        **/
        StrengthenType[StrengthenType["ST_HD"] = 12] = "ST_HD";
        /**
        * 麻痹戒指
        **/
        StrengthenType[StrengthenType["ST_MB"] = 13] = "ST_MB";
        /**
        * 护身戒指
        **/
        StrengthenType[StrengthenType["ST_HS"] = 14] = "ST_HS";
        /**
        * 法宝1
        **/
        StrengthenType[StrengthenType["ST_FB1"] = 21] = "ST_FB1";
        /**
        * 法宝2
        **/
        StrengthenType[StrengthenType["ST_FB2"] = 22] = "ST_FB2";
        /**
        * 法宝3
        **/
        StrengthenType[StrengthenType["ST_FB3"] = 23] = "ST_FB3";
        /**
        * 法宝4
        **/
        StrengthenType[StrengthenType["ST_FB4"] = 24] = "ST_FB4";
        /**
        * 法宝5
        **/
        StrengthenType[StrengthenType["ST_FB5"] = 25] = "ST_FB5";
    })(StrengthenType = data.StrengthenType || (data.StrengthenType = {}));
    var NPCFUNC;
    (function (NPCFUNC) {
        /**
        * 什么也没有做
        **/
        NPCFUNC[NPCFUNC["None"] = 0] = "None";
        /**
        * 仓库
        **/
        NPCFUNC[NPCFUNC["ck"] = 1] = "ck";
        /**
        * 交易
        **/
        NPCFUNC[NPCFUNC["Deal"] = 2] = "Deal";
        /**
        * npc商人
        **/
        NPCFUNC[NPCFUNC["sd"] = 3] = "sd";
        /**
        * 收取邮件
        **/
        NPCFUNC[NPCFUNC["getMail"] = 4] = "getMail";
        /**
        * 提炼，合成
        **/
        NPCFUNC[NPCFUNC["hc"] = 5] = "hc";
        /**
        * 强化
        **/
        NPCFUNC[NPCFUNC["qh"] = 6] = "qh";
        /**
        * 宝石拆卸
        **/
        NPCFUNC[NPCFUNC["cx"] = 7] = "cx";
        /**
        * 帮会
        **/
        NPCFUNC[NPCFUNC["bh"] = 8] = "bh";
        /**
        * 开始跑环
        **/
        NPCFUNC[NPCFUNC["rw"] = 9] = "rw";
        /**
        * 师徒
        **/
        NPCFUNC[NPCFUNC["st"] = 10] = "st";
        /**
        * 结婚
        **/
        NPCFUNC[NPCFUNC["jh"] = 11] = "jh";
        /**
        * 拍卖行
        **/
        NPCFUNC[NPCFUNC["jy"] = 12] = "jy";
        /**
        * 传送
        **/
        NPCFUNC[NPCFUNC["cs"] = 13] = "cs";
        /**
        * 战场
        **/
        NPCFUNC[NPCFUNC["zc"] = 14] = "zc";
        /**
        * 宠物
        **/
        NPCFUNC[NPCFUNC["cw"] = 15] = "cw";
        /**
        * 赠送礼品
        **/
        NPCFUNC[NPCFUNC["sj"] = 16] = "sj";
        /**
        * 委托任务
        **/
        NPCFUNC[NPCFUNC["ss"] = 17] = "ss";
        /**
        * 内容介绍
        **/
        NPCFUNC[NPCFUNC["ts"] = 18] = "ts";
        /**
        * 排名
        **/
        NPCFUNC[NPCFUNC["pm"] = 19] = "pm";
        /**
        * 悬赏
        **/
        NPCFUNC[NPCFUNC["xs"] = 20] = "xs";
    })(NPCFUNC = data.NPCFUNC || (data.NPCFUNC = {}));
    var FUNC;
    (function (FUNC) {
        /**
        * 什么也没有做0
        **/
        FUNC[FUNC["None"] = 0] = "None";
        /**
        * 影响属性1
        **/
        FUNC[FUNC["effectattr"] = 1] = "effectattr";
        /**
        * 添加buf2
        **/
        FUNC[FUNC["addbuff"] = 2] = "addbuff";
        /**
        * 移除buf3
        **/
        FUNC[FUNC["removebuff"] = 3] = "removebuff";
        /**
        * 添加一种技能4
        **/
        FUNC[FUNC["addskill"] = 4] = "addskill";
        /**
        * 触发任务5
        **/
        FUNC[FUNC["trigerTask"] = 5] = "trigerTask";
        /**
        * 召唤一个宠物6
        **/
        FUNC[FUNC["summonPet"] = 6] = "summonPet";
        /**
        * 召唤坐骑7
        **/
        FUNC[FUNC["summonRide"] = 7] = "summonRide";
        /**
        * 传送8
        **/
        FUNC[FUNC["transport"] = 8] = "transport";
        /**
        * 变身9
        **/
        FUNC[FUNC["changeAvatar"] = 9] = "changeAvatar";
        /**
        * 击退10
        **/
        FUNC[FUNC["kickback"] = 10] = "kickback";
        /**
        * 弹出UI11
        **/
        FUNC[FUNC["popUI"] = 11] = "popUI";
        /**
        * 提升物品等级12
        **/
        FUNC[FUNC["improveitem"] = 12] = "improveitem";
        /**
        * 洗点13
        **/
        FUNC[FUNC["Wash"] = 13] = "Wash";
        /**
        * 商店14
        **/
        FUNC[FUNC["Shop"] = 14] = "Shop";
        /**
        * 增加双倍经验15
        **/
        FUNC[FUNC["addExpRate"] = 15] = "addExpRate";
        /**
        * 回城16
        **/
        FUNC[FUNC["backCity"] = 16] = "backCity";
        /**
        * npc传送 17
        **/
        FUNC[FUNC["NPCTransmit"] = 17] = "NPCTransmit";
    })(FUNC = data.FUNC || (data.FUNC = {}));
    var EntityType;
    (function (EntityType) {
        /**
        * 未指定
        **/
        EntityType[EntityType["None"] = 0] = "None";
        /**
        * 玩家角色
        **/
        EntityType[EntityType["Player"] = 1] = "Player";
        /**
        * 召唤物
        **/
        EntityType[EntityType["Summon"] = 2] = "Summon";
        /**
        * 怪物
        **/
        EntityType[EntityType["Mob"] = 3] = "Mob";
        /**
        * boss
        **/
        EntityType[EntityType["Boss"] = 4] = "Boss";
        /**
        * npc
        **/
        EntityType[EntityType["Npc"] = 5] = "Npc";
        /**
        * 地图
        **/
        EntityType[EntityType["Map"] = 6] = "Map";
        /**
        * 掉落物
        **/
        EntityType[EntityType["DropItem"] = 7] = "DropItem";
        /**
        * 采集物
        **/
        EntityType[EntityType["Collect"] = 8] = "Collect";
        /**
        * 区域
        **/
        EntityType[EntityType["Area"] = 9] = "Area";
    })(EntityType = data.EntityType || (data.EntityType = {}));
    var ReqType;
    (function (ReqType) {
        ReqType[ReqType["addteach"] = 0] = "addteach";
        ReqType[ReqType["addfriend"] = 1] = "addfriend";
        ReqType[ReqType["addenemy"] = 2] = "addenemy";
        /**
        * 申请组队
        **/
        ReqType[ReqType["applygroup"] = 3] = "applygroup";
        /**
        * 发起交易
        **/
        ReqType[ReqType["applydeal"] = 4] = "applydeal";
        /**
        * 申请加入帮会
        **/
        ReqType[ReqType["applyenterguild"] = 5] = "applyenterguild";
        /**
        * 邀请加入帮会
        **/
        ReqType[ReqType["inviteenterguild"] = 6] = "inviteenterguild";
        ReqType[ReqType["End"] = 7] = "End";
    })(ReqType = data.ReqType || (data.ReqType = {}));
    var DamageSort;
    (function (DamageSort) {
        DamageSort[DamageSort["none"] = 0] = "none";
        DamageSort[DamageSort["fire"] = 1] = "fire";
        DamageSort[DamageSort["cold"] = 2] = "cold";
        DamageSort[DamageSort["light"] = 3] = "light";
    })(DamageSort = data.DamageSort || (data.DamageSort = {}));
    var TaskState;
    (function (TaskState) {
        /**
        * 进行中
        **/
        TaskState[TaskState["process"] = 0] = "process";
        /**
        * 已经失败
        **/
        TaskState[TaskState["fail"] = 1] = "fail";
        /**
        * 已经完成
        **/
        TaskState[TaskState["finish"] = 2] = "finish";
    })(TaskState = data.TaskState || (data.TaskState = {}));
    var TaskType;
    (function (TaskType) {
        TaskType[TaskType["none"] = 0] = "none";
        /**
        * 对话类 1
        **/
        TaskType[TaskType["chat"] = 1] = "chat";
        /**
        * 送信类 2
        **/
        TaskType[TaskType["mail"] = 2] = "mail";
        /**
        * 杀怪类 3
        **/
        TaskType[TaskType["killmob"] = 3] = "killmob";
        /**
        * 收集类 4
        **/
        TaskType[TaskType["collect"] = 4] = "collect";
        /**
        * 使用物品类 5
        **/
        TaskType[TaskType["useitem"] = 5] = "useitem";
        /**
        * 探索类 6
        **/
        TaskType[TaskType["explore"] = 6] = "explore";
        /**
        * 数值类 7
        **/
        TaskType[TaskType["num"] = 7] = "num";
        /**
        * 护送类8
        **/
        TaskType[TaskType["help"] = 8] = "help";
        /**
        * 装备9
        **/
        TaskType[TaskType["equip"] = 9] = "equip";
        /**
        * fuben10
        **/
        TaskType[TaskType["fuben"] = 10] = "fuben";
        /**
        * yunshu11
        **/
        TaskType[TaskType["yunshu"] = 11] = "yunshu";
        /**
        * 每日数值型
        **/
        TaskType[TaskType["num2"] = 12] = "num2";
    })(TaskType = data.TaskType || (data.TaskType = {}));
    var TrigerType;
    (function (TrigerType) {
        /**
        * 无
        **/
        TrigerType[TrigerType["none"] = 0] = "none";
        /**
        * 1 NPC给予
        **/
        TrigerType[TrigerType["npc"] = 1] = "npc";
        /**
        * 2 拾取物品获得
        **/
        TrigerType[TrigerType["getitem"] = 2] = "getitem";
        /**
        * 3 进入某场景
        **/
        TrigerType[TrigerType["entermap"] = 3] = "entermap";
        /**
        * 4 系统自动
        **/
        TrigerType[TrigerType["system"] = 4] = "system";
        /**
        * 5 杀死某怪
        **/
        TrigerType[TrigerType["kill"] = 5] = "kill";
        /**
        * 6 使用特定物品。
        **/
        TrigerType[TrigerType["useitem"] = 6] = "useitem";
    })(TrigerType = data.TrigerType || (data.TrigerType = {}));
    var TipType;
    (function (TipType) {
        TipType[TipType["team_kickout"] = 0] = "team_kickout";
        TipType[TipType["team_full"] = 1] = "team_full";
        TipType[TipType["team_disband"] = 2] = "team_disband";
        TipType[TipType["team_enter"] = 3] = "team_enter";
        TipType[TipType["team_leave"] = 4] = "team_leave";
        TipType[TipType["improve_needgold"] = 5] = "improve_needgold";
        TipType[TipType["improve_needmoney"] = 6] = "improve_needmoney";
        TipType[TipType["improve_full"] = 7] = "improve_full";
        TipType[TipType["improvemax_needgold"] = 8] = "improvemax_needgold";
        TipType[TipType["improve_change_suc"] = 9] = "improve_change_suc";
        TipType[TipType["improve_change_needgold"] = 10] = "improve_change_needgold";
        TipType[TipType["pk_kill"] = 11] = "pk_kill";
        TipType[TipType["pk_defence"] = 12] = "pk_defence";
        TipType[TipType["pk_killed"] = 13] = "pk_killed";
        TipType[TipType["pk_weapon"] = 14] = "pk_weapon";
        TipType[TipType["pk_lev50"] = 15] = "pk_lev50";
        TipType[TipType["need_xuefu"] = 16] = "need_xuefu";
        TipType[TipType["need_hudun"] = 17] = "need_hudun";
        TipType[TipType["bag_full"] = 18] = "bag_full";
        TipType[TipType["bag_full5"] = 19] = "bag_full5";
        TipType[TipType["reborn_needlev"] = 20] = "reborn_needlev";
        TipType[TipType["reborn_needitem"] = 21] = "reborn_needitem";
        TipType[TipType["need_lev"] = 22] = "need_lev";
        TipType[TipType["need_job"] = 23] = "need_job";
        TipType[TipType["need_gold"] = 24] = "need_gold";
        TipType[TipType["need_bindmoney"] = 25] = "need_bindmoney";
        TipType[TipType["neeed_money"] = 26] = "neeed_money";
        TipType[TipType["need_bindgold"] = 27] = "need_bindgold";
        TipType[TipType["add_def"] = 28] = "add_def";
        TipType[TipType["add_satk"] = 29] = "add_satk";
        TipType[TipType["addbuf_zd"] = 30] = "addbuf_zd";
        TipType[TipType["addbuf_sh"] = 31] = "addbuf_sh";
        TipType[TipType["sbk_start"] = 32] = "sbk_start";
        TipType[TipType["sbk_zhanlin"] = 33] = "sbk_zhanlin";
        TipType[TipType["sbk_tishi"] = 34] = "sbk_tishi";
        TipType[TipType["sbk_finish"] = 35] = "sbk_finish";
        TipType[TipType["map_change"] = 36] = "map_change";
        TipType[TipType["safe_leave"] = 37] = "safe_leave";
        TipType[TipType["safe_enter"] = 38] = "safe_enter";
    })(TipType = data.TipType || (data.TipType = {}));
    var BroadCastPos;
    (function (BroadCastPos) {
        /**
        * gm公告
        **/
        BroadCastPos[BroadCastPos["GM"] = 0] = "GM";
        /**
        * 主界面中央
        **/
        BroadCastPos[BroadCastPos["Middle"] = 1] = "Middle";
        /**
        * 提示位置
        **/
        BroadCastPos[BroadCastPos["System"] = 2] = "System";
        /**
        * 聊天窗口
        **/
        BroadCastPos[BroadCastPos["Chat"] = 3] = "Chat";
        /**
        * 收益栏
        **/
        BroadCastPos[BroadCastPos["Earning"] = 4] = "Earning";
        /**
        * 弹窗
        **/
        BroadCastPos[BroadCastPos["Alert"] = 5] = "Alert";
    })(BroadCastPos = data.BroadCastPos || (data.BroadCastPos = {}));
    var ABC;
    (function (ABC) {
        ABC[ABC["\u65E0\u6B64\u6570\u636E"] = 0] = "\u65E0\u6B64\u6570\u636E";
    })(ABC = data.ABC || (data.ABC = {}));
    var BBB;
    (function (BBB) {
        BBB[BBB["\u65E0\u6B64\u6570\u636E"] = 0] = "\u65E0\u6B64\u6570\u636E";
    })(BBB = data.BBB || (data.BBB = {}));
})(data || (data = {}));
//# sourceMappingURL=Enums.js.map