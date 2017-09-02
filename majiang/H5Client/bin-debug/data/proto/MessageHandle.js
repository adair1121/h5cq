var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var proto;
(function (proto) {
    var MessageHandle = (function () {
        function MessageHandle() {
            this.commands = {};
            this.commands[proto.MessageType.s_SendMessbox] = this.do_s_SendMessbox;
            this.commands[proto.MessageType.s_Map_Player] = this.do_s_Map_Player;
            this.commands[proto.MessageType.s_skill_up] = this.do_s_skill_up;
            this.commands[proto.MessageType.s_skillAllUp] = this.do_s_skillAllUp;
            this.commands[proto.MessageType.s_Login] = this.do_s_Login;
            this.commands[proto.MessageType.s_wings_up] = this.do_s_wings_up;
            this.commands[proto.MessageType.s_wings_levup] = this.do_s_wings_levup;
            this.commands[proto.MessageType.s_ChangeEquip] = this.do_s_ChangeEquip;
            this.commands[proto.MessageType.s_Reborn] = this.do_s_Reborn;
            this.commands[proto.MessageType.s_GetXiuWei] = this.do_s_GetXiuWei;
            this.commands[proto.MessageType.s_AddBag] = this.do_s_AddBag;
            this.commands[proto.MessageType.s_SmeltEquips] = this.do_s_SmeltEquips;
            this.commands[proto.MessageType.s_Strengthen] = this.do_s_Strengthen;
            this.commands[proto.MessageType.s_AddItems] = this.do_s_AddItems;
            this.commands[proto.MessageType.s_ChangeItemNum] = this.do_s_ChangeItemNum;
            this.commands[proto.MessageType.s_JingMai_Up] = this.do_s_JingMai_Up;
            this.commands[proto.MessageType.s_say] = this.do_s_say;
            this.commands[proto.MessageType.s_SpecialEquip_Up] = this.do_s_SpecialEquip_Up;
            this.commands[proto.MessageType.s_RequestShop] = this.do_s_RequestShop;
            this.commands[proto.MessageType.s_BuyItem] = this.do_s_BuyItem;
            this.commands[proto.MessageType.s_FriendAck] = this.do_s_FriendAck;
            this.commands[proto.MessageType.s_SendFriendList] = this.do_s_SendFriendList;
            this.commands[proto.MessageType.s_ReplyAdd] = this.do_s_ReplyAdd;
            this.commands[proto.MessageType.s_CreateNewSence] = this.do_s_CreateNewSence;
            this.commands[proto.MessageType.s_ChangeMainRole] = this.do_s_ChangeMainRole;
            this.commands[proto.MessageType.s_Kickout] = this.do_s_Kickout;
            this.commands[proto.MessageType.s_CreateRole] = this.do_s_CreateRole;
            this.commands[proto.MessageType.s_RoleAttrChange] = this.do_s_RoleAttrChange;
            this.commands[proto.MessageType.s_ItemAttrChange] = this.do_s_ItemAttrChange;
            this.commands[proto.MessageType.s_BagItem] = this.do_s_BagItem;
            this.commands[proto.MessageType.s_ItemUse] = this.do_s_ItemUse;
            this.commands[proto.MessageType.s_ChatCacheInfo] = this.do_s_ChatCacheInfo;
            this.commands[proto.MessageType.s_ChatInfo] = this.do_s_ChatInfo;
            this.commands[proto.MessageType.s_JingMai_LvUp] = this.do_s_JingMai_LvUp;
            this.commands[proto.MessageType.s_UpdateFriendState] = this.do_s_UpdateFriendState;
            this.commands[proto.MessageType.s_GetRankInfo] = this.do_s_GetRankInfo;
            this.commands[proto.MessageType.s_RankChange] = this.do_s_RankChange;
            this.commands[proto.MessageType.s_GetRankList] = this.do_s_GetRankList;
            this.commands[proto.MessageType.s_MailList] = this.do_s_MailList;
            this.commands[proto.MessageType.s_TakeAward] = this.do_s_TakeAward;
            this.commands[proto.MessageType.s_ReduceLevel] = this.do_s_ReduceLevel;
            this.commands[proto.MessageType.s_AssemblyEquip] = this.do_s_AssemblyEquip;
            this.commands[proto.MessageType.s_DisassembleEquip] = this.do_s_DisassembleEquip;
            this.commands[proto.MessageType.s_TakeAllAward] = this.do_s_TakeAllAward;
            this.commands[proto.MessageType.s_OpenMail] = this.do_s_OpenMail;
            this.commands[proto.MessageType.s_TaskList] = this.do_s_TaskList;
            this.commands[proto.MessageType.s_TaskChange] = this.do_s_TaskChange;
            this.commands[proto.MessageType.s_FinishTask] = this.do_s_FinishTask;
            this.commands[proto.MessageType.s_ShenGongUpgrade] = this.do_s_ShenGongUpgrade;
            this.commands[proto.MessageType.s_JueweiUpgrade] = this.do_s_JueweiUpgrade;
            this.commands[proto.MessageType.s_ActiveFashion] = this.do_s_ActiveFashion;
            this.commands[proto.MessageType.s_DressFashion] = this.do_s_DressFashion;
            this.commands[proto.MessageType.s_FashionExpire] = this.do_s_FashionExpire;
            this.commands[proto.MessageType.s_LearnCheats] = this.do_s_LearnCheats;
            this.commands[proto.MessageType.s_Worship] = this.do_s_Worship;
            this.commands[proto.MessageType.s_RankWorship] = this.do_s_RankWorship;
            this.commands[proto.MessageType.s_CheatsList] = this.do_s_CheatsList;
            this.commands[proto.MessageType.s_FriendList] = this.do_s_FriendList;
            this.commands[proto.MessageType.s_ChangeHeadIcon] = this.do_s_ChangeHeadIcon;
            this.commands[proto.MessageType.s_RefreshMailExpire] = this.do_s_RefreshMailExpire;
            this.commands[proto.MessageType.s_TalismanStrengthen] = this.do_s_TalismanStrengthen;
            this.commands[proto.MessageType.s_PersonalBoss] = this.do_s_PersonalBoss;
            this.commands[proto.MessageType.s_SyncBossPlayer] = this.do_s_SyncBossPlayer;
            this.commands[proto.MessageType.s_NotifyAction] = this.do_s_NotifyAction;
            this.commands[proto.MessageType.s_LeaveBossRoom] = this.do_s_LeaveBossRoom;
            this.commands[proto.MessageType.s_WorldBoss] = this.do_s_WorldBoss;
            this.commands[proto.MessageType.s_BossAck] = this.do_s_BossAck;
            this.commands[proto.MessageType.s_PersonalBossList] = this.do_s_PersonalBossList;
            this.commands[proto.MessageType.s_WorldBossList] = this.do_s_WorldBossList;
            this.commands[proto.MessageType.s_SyncTime] = this.do_s_SyncTime;
            this.commands[proto.MessageType.s_RebornBoss] = this.do_s_RebornBoss;
            this.commands[proto.MessageType.s_MeetBattle] = this.do_s_MeetBattle;
            this.commands[proto.MessageType.s_MeetData] = this.do_s_MeetData;
            this.commands[proto.MessageType.s_MeetKill] = this.do_s_MeetKill;
            this.commands[proto.MessageType.s_GuildList] = this.do_s_GuildList;
            this.commands[proto.MessageType.s_mess] = this.do_s_mess;
            this.commands[proto.MessageType.s_move] = this.do_s_move;
            this.commands[proto.MessageType.s_Mapload] = this.do_s_Mapload;
            this.commands[proto.MessageType.s_Mapshow] = this.do_s_Mapshow;
            this.commands[proto.MessageType.s_setpos] = this.do_s_setpos;
            this.commands[proto.MessageType.s_Map_UnitAdd] = this.do_s_Map_UnitAdd;
            this.commands[proto.MessageType.s_Map_UnitRemove] = this.do_s_Map_UnitRemove;
            this.commands[proto.MessageType.s_MapUnitInfo] = this.do_s_MapUnitInfo;
            this.commands[proto.MessageType.s_MapUnit_Model] = this.do_s_MapUnit_Model;
            this.commands[proto.MessageType.s_MapUnit_title] = this.do_s_MapUnit_title;
            this.commands[proto.MessageType.s_MapUnit_state] = this.do_s_MapUnit_state;
            this.commands[proto.MessageType.s_TweenTo] = this.do_s_TweenTo;
            this.commands[proto.MessageType.s_addFire] = this.do_s_addFire;
            this.commands[proto.MessageType.s_removeFire] = this.do_s_removeFire;
            this.commands[proto.MessageType.s_MapUnit_PkState] = this.do_s_MapUnit_PkState;
            this.commands[proto.MessageType.s_skilluse] = this.do_s_skilluse;
            this.commands[proto.MessageType.s_skill_add] = this.do_s_skill_add;
            this.commands[proto.MessageType.s_Damage] = this.do_s_Damage;
            this.commands[proto.MessageType.s_skill_setAttr] = this.do_s_skill_setAttr;
            this.commands[proto.MessageType.s_CD_add] = this.do_s_CD_add;
            this.commands[proto.MessageType.s_CD_remove] = this.do_s_CD_remove;
            this.commands[proto.MessageType.s_item_add] = this.do_s_item_add;
            this.commands[proto.MessageType.s_item_remove] = this.do_s_item_remove;
            this.commands[proto.MessageType.s_item_setplace] = this.do_s_item_setplace;
            this.commands[proto.MessageType.s_ItemInfo] = this.do_s_ItemInfo;
            this.commands[proto.MessageType.s_item_setAttr] = this.do_s_item_setAttr;
            this.commands[proto.MessageType.s_item_update] = this.do_s_item_update;
            this.commands[proto.MessageType.s_Prefix] = this.do_s_Prefix;
            this.commands[proto.MessageType.s_item_sort] = this.do_s_item_sort;
            this.commands[proto.MessageType.s_item_upgrade] = this.do_s_item_upgrade;
            this.commands[proto.MessageType.s_item_Confirm] = this.do_s_item_Confirm;
            this.commands[proto.MessageType.s_xilian] = this.do_s_xilian;
            this.commands[proto.MessageType.s_item_zhufu] = this.do_s_item_zhufu;
            this.commands[proto.MessageType.s_GroupInfo] = this.do_s_GroupInfo;
            this.commands[proto.MessageType.s_Group_addMember] = this.do_s_Group_addMember;
            this.commands[proto.MessageType.s_Group_removeMember] = this.do_s_Group_removeMember;
            this.commands[proto.MessageType.s_Group_Disband] = this.do_s_Group_Disband;
            this.commands[proto.MessageType.s_GroupUpdateLeader] = this.do_s_GroupUpdateLeader;
            this.commands[proto.MessageType.s_groupInvite] = this.do_s_groupInvite;
            this.commands[proto.MessageType.s_group_leave] = this.do_s_group_leave;
            this.commands[proto.MessageType.s_Task_triger] = this.do_s_Task_triger;
            this.commands[proto.MessageType.s_TaskInfo] = this.do_s_TaskInfo;
            this.commands[proto.MessageType.s_TaskActive] = this.do_s_TaskActive;
            this.commands[proto.MessageType.s_TaskInActive] = this.do_s_TaskInActive;
            this.commands[proto.MessageType.s_TaskRemove] = this.do_s_TaskRemove;
            this.commands[proto.MessageType.s_Task_dayInfo] = this.do_s_Task_dayInfo;
            this.commands[proto.MessageType.s_CharInfo] = this.do_s_CharInfo;
            this.commands[proto.MessageType.s_Player_EndInit] = this.do_s_Player_EndInit;
            this.commands[proto.MessageType.s_CharInfoList] = this.do_s_CharInfoList;
            this.commands[proto.MessageType.s_UIshow] = this.do_s_UIshow;
            this.commands[proto.MessageType.s_UIhide] = this.do_s_UIhide;
            this.commands[proto.MessageType.s_TimerAdd] = this.do_s_TimerAdd;
            this.commands[proto.MessageType.s_TimerRemove] = this.do_s_TimerRemove;
            this.commands[proto.MessageType.s_Buff_add] = this.do_s_Buff_add;
            this.commands[proto.MessageType.s_Buff_remove] = this.do_s_Buff_remove;
            this.commands[proto.MessageType.s_Buff_clear] = this.do_s_Buff_clear;
            this.commands[proto.MessageType.s_mix] = this.do_s_mix;
            this.commands[proto.MessageType.s_market_up] = this.do_s_market_up;
            this.commands[proto.MessageType.s_market_down] = this.do_s_market_down;
            this.commands[proto.MessageType.s_market_buy] = this.do_s_market_buy;
            this.commands[proto.MessageType.s_market_list] = this.do_s_market_list;
            this.commands[proto.MessageType.s_market_item] = this.do_s_market_item;
            this.commands[proto.MessageType.s_Vip_leftime] = this.do_s_Vip_leftime;
            this.commands[proto.MessageType.s_Vip_price] = this.do_s_Vip_price;
            this.commands[proto.MessageType.s_broadcast] = this.do_s_broadcast;
            this.commands[proto.MessageType.s_executeScript] = this.do_s_executeScript;
            this.commands[proto.MessageType.s_mapTimer] = this.do_s_mapTimer;
            this.commands[proto.MessageType.s_map_turn] = this.do_s_map_turn;
            this.commands[proto.MessageType.s_map_entertimes] = this.do_s_map_entertimes;
            this.commands[proto.MessageType.s_map_pop] = this.do_s_map_pop;
            this.commands[proto.MessageType.s_map_lasttime] = this.do_s_map_lasttime;
            this.commands[proto.MessageType.s_map_lastmonster] = this.do_s_map_lastmonster;
            this.commands[proto.MessageType.s_map_lastturn] = this.do_s_map_lastturn;
            this.commands[proto.MessageType.s_reborn] = this.do_s_reborn;
            this.commands[proto.MessageType.s_EXPRate_add] = this.do_s_EXPRate_add;
            this.commands[proto.MessageType.s_heart] = this.do_s_heart;
            this.commands[proto.MessageType.s_boss_state] = this.do_s_boss_state;
            this.commands[proto.MessageType.s_bonus_state] = this.do_s_bonus_state;
            this.commands[proto.MessageType.s_bonus_lixian] = this.do_s_bonus_lixian;
            this.commands[proto.MessageType.s_LiveNess] = this.do_s_LiveNess;
            this.commands[proto.MessageType.s_team_info] = this.do_s_team_info;
            this.commands[proto.MessageType.s_team_list] = this.do_s_team_list;
            this.commands[proto.MessageType.s_team_disband] = this.do_s_team_disband;
            this.commands[proto.MessageType.s_team_leave] = this.do_s_team_leave;
            this.commands[proto.MessageType.s_team_invite] = this.do_s_team_invite;
            this.commands[proto.MessageType.s_look_infos] = this.do_s_look_infos;
            this.commands[proto.MessageType.s_RandShop_updateMoney] = this.do_s_RandShop_updateMoney;
            this.commands[proto.MessageType.s_RandShop] = this.do_s_RandShop;
            this.commands[proto.MessageType.s_RandShopList] = this.do_s_RandShopList;
            this.commands[proto.MessageType.s_TurnList] = this.do_s_TurnList;
            this.commands[proto.MessageType.s_turn_result] = this.do_s_turn_result;
            this.commands[proto.MessageType.s_turn_over] = this.do_s_turn_over;
            this.commands[proto.MessageType.s_turn_notice] = this.do_s_turn_notice;
            this.commands[proto.MessageType.s_SBK_aff] = this.do_s_SBK_aff;
            this.commands[proto.MessageType.s_SBK_btnstatus] = this.do_s_SBK_btnstatus;
            this.commands[proto.MessageType.s_ph_Rank] = this.do_s_ph_Rank;
            this.commands[proto.MessageType.s_huodong_status] = this.do_s_huodong_status;
        }
        MessageHandle.prototype.do_s_SendMessbox = function (mess) { };
        MessageHandle.prototype.do_s_Map_Player = function (mess) { };
        MessageHandle.prototype.do_s_skill_up = function (mess) { };
        MessageHandle.prototype.do_s_skillAllUp = function (mess) { };
        MessageHandle.prototype.do_s_Login = function (mess) { };
        MessageHandle.prototype.do_s_wings_up = function (mess) { };
        MessageHandle.prototype.do_s_wings_levup = function (mess) { };
        MessageHandle.prototype.do_s_ChangeEquip = function (mess) { };
        MessageHandle.prototype.do_s_Reborn = function (mess) { };
        MessageHandle.prototype.do_s_GetXiuWei = function (mess) { };
        MessageHandle.prototype.do_s_AddBag = function (mess) { };
        MessageHandle.prototype.do_s_SmeltEquips = function (mess) { };
        MessageHandle.prototype.do_s_Strengthen = function (mess) { };
        MessageHandle.prototype.do_s_AddItems = function (mess) { };
        MessageHandle.prototype.do_s_ChangeItemNum = function (mess) { };
        MessageHandle.prototype.do_s_JingMai_Up = function (mess) { };
        MessageHandle.prototype.do_s_say = function (mess) { };
        MessageHandle.prototype.do_s_SpecialEquip_Up = function (mess) { };
        MessageHandle.prototype.do_s_RequestShop = function (mess) { };
        MessageHandle.prototype.do_s_BuyItem = function (mess) { };
        MessageHandle.prototype.do_s_FriendAck = function (mess) { };
        MessageHandle.prototype.do_s_SendFriendList = function (mess) { };
        MessageHandle.prototype.do_s_ReplyAdd = function (mess) { };
        MessageHandle.prototype.do_s_CreateNewSence = function (mess) { };
        MessageHandle.prototype.do_s_ChangeMainRole = function (mess) { };
        MessageHandle.prototype.do_s_Kickout = function (mess) { };
        MessageHandle.prototype.do_s_CreateRole = function (mess) { };
        MessageHandle.prototype.do_s_RoleAttrChange = function (mess) { };
        MessageHandle.prototype.do_s_ItemAttrChange = function (mess) { };
        MessageHandle.prototype.do_s_BagItem = function (mess) { };
        MessageHandle.prototype.do_s_ItemUse = function (mess) { };
        MessageHandle.prototype.do_s_ChatCacheInfo = function (mess) { };
        MessageHandle.prototype.do_s_ChatInfo = function (mess) { };
        MessageHandle.prototype.do_s_JingMai_LvUp = function (mess) { };
        MessageHandle.prototype.do_s_UpdateFriendState = function (mess) { };
        MessageHandle.prototype.do_s_GetRankInfo = function (mess) { };
        MessageHandle.prototype.do_s_RankChange = function (mess) { };
        MessageHandle.prototype.do_s_GetRankList = function (mess) { };
        MessageHandle.prototype.do_s_MailList = function (mess) { };
        MessageHandle.prototype.do_s_TakeAward = function (mess) { };
        MessageHandle.prototype.do_s_ReduceLevel = function (mess) { };
        MessageHandle.prototype.do_s_AssemblyEquip = function (mess) { };
        MessageHandle.prototype.do_s_DisassembleEquip = function (mess) { };
        MessageHandle.prototype.do_s_TakeAllAward = function (mess) { };
        MessageHandle.prototype.do_s_OpenMail = function (mess) { };
        MessageHandle.prototype.do_s_TaskList = function (mess) { };
        MessageHandle.prototype.do_s_TaskChange = function (mess) { };
        MessageHandle.prototype.do_s_FinishTask = function (mess) { };
        MessageHandle.prototype.do_s_ShenGongUpgrade = function (mess) { };
        MessageHandle.prototype.do_s_JueweiUpgrade = function (mess) { };
        MessageHandle.prototype.do_s_ActiveFashion = function (mess) { };
        MessageHandle.prototype.do_s_DressFashion = function (mess) { };
        MessageHandle.prototype.do_s_FashionExpire = function (mess) { };
        MessageHandle.prototype.do_s_LearnCheats = function (mess) { };
        MessageHandle.prototype.do_s_Worship = function (mess) { };
        MessageHandle.prototype.do_s_RankWorship = function (mess) { };
        MessageHandle.prototype.do_s_CheatsList = function (mess) { };
        MessageHandle.prototype.do_s_FriendList = function (mess) { };
        MessageHandle.prototype.do_s_ChangeHeadIcon = function (mess) { };
        MessageHandle.prototype.do_s_RefreshMailExpire = function (mess) { };
        MessageHandle.prototype.do_s_TalismanStrengthen = function (mess) { };
        MessageHandle.prototype.do_s_PersonalBoss = function (mess) { };
        MessageHandle.prototype.do_s_SyncBossPlayer = function (mess) { };
        MessageHandle.prototype.do_s_NotifyAction = function (mess) { };
        MessageHandle.prototype.do_s_LeaveBossRoom = function (mess) { };
        MessageHandle.prototype.do_s_WorldBoss = function (mess) { };
        MessageHandle.prototype.do_s_BossAck = function (mess) { };
        MessageHandle.prototype.do_s_PersonalBossList = function (mess) { };
        MessageHandle.prototype.do_s_WorldBossList = function (mess) { };
        MessageHandle.prototype.do_s_SyncTime = function (mess) { };
        MessageHandle.prototype.do_s_RebornBoss = function (mess) { };
        MessageHandle.prototype.do_s_MeetBattle = function (mess) { };
        MessageHandle.prototype.do_s_MeetData = function (mess) { };
        MessageHandle.prototype.do_s_MeetKill = function (mess) { };
        MessageHandle.prototype.do_s_GuildList = function (mess) { };
        MessageHandle.prototype.do_s_mess = function (mess) { };
        MessageHandle.prototype.do_s_move = function (mess) { };
        MessageHandle.prototype.do_s_Mapload = function (mess) { };
        MessageHandle.prototype.do_s_Mapshow = function (mess) { };
        MessageHandle.prototype.do_s_setpos = function (mess) { };
        MessageHandle.prototype.do_s_Map_UnitAdd = function (mess) { };
        MessageHandle.prototype.do_s_Map_UnitRemove = function (mess) { };
        MessageHandle.prototype.do_s_MapUnitInfo = function (mess) { };
        MessageHandle.prototype.do_s_MapUnit_Model = function (mess) { };
        MessageHandle.prototype.do_s_MapUnit_title = function (mess) { };
        MessageHandle.prototype.do_s_MapUnit_state = function (mess) { };
        MessageHandle.prototype.do_s_TweenTo = function (mess) { };
        MessageHandle.prototype.do_s_addFire = function (mess) { };
        MessageHandle.prototype.do_s_removeFire = function (mess) { };
        MessageHandle.prototype.do_s_MapUnit_PkState = function (mess) { };
        MessageHandle.prototype.do_s_skilluse = function (mess) { };
        MessageHandle.prototype.do_s_skill_add = function (mess) { };
        MessageHandle.prototype.do_s_Damage = function (mess) { };
        MessageHandle.prototype.do_s_skill_setAttr = function (mess) { };
        MessageHandle.prototype.do_s_CD_add = function (mess) { };
        MessageHandle.prototype.do_s_CD_remove = function (mess) { };
        MessageHandle.prototype.do_s_item_add = function (mess) { };
        MessageHandle.prototype.do_s_item_remove = function (mess) { };
        MessageHandle.prototype.do_s_item_setplace = function (mess) { };
        MessageHandle.prototype.do_s_ItemInfo = function (mess) { };
        MessageHandle.prototype.do_s_item_setAttr = function (mess) { };
        MessageHandle.prototype.do_s_item_update = function (mess) { };
        MessageHandle.prototype.do_s_Prefix = function (mess) { };
        MessageHandle.prototype.do_s_item_sort = function (mess) { };
        MessageHandle.prototype.do_s_item_upgrade = function (mess) { };
        MessageHandle.prototype.do_s_item_Confirm = function (mess) { };
        MessageHandle.prototype.do_s_xilian = function (mess) { };
        MessageHandle.prototype.do_s_item_zhufu = function (mess) { };
        MessageHandle.prototype.do_s_GroupInfo = function (mess) { };
        MessageHandle.prototype.do_s_Group_addMember = function (mess) { };
        MessageHandle.prototype.do_s_Group_removeMember = function (mess) { };
        MessageHandle.prototype.do_s_Group_Disband = function (mess) { };
        MessageHandle.prototype.do_s_GroupUpdateLeader = function (mess) { };
        MessageHandle.prototype.do_s_groupInvite = function (mess) { };
        MessageHandle.prototype.do_s_group_leave = function (mess) { };
        MessageHandle.prototype.do_s_Task_triger = function (mess) { };
        MessageHandle.prototype.do_s_TaskInfo = function (mess) { };
        MessageHandle.prototype.do_s_TaskActive = function (mess) { };
        MessageHandle.prototype.do_s_TaskInActive = function (mess) { };
        MessageHandle.prototype.do_s_TaskRemove = function (mess) { };
        MessageHandle.prototype.do_s_Task_dayInfo = function (mess) { };
        MessageHandle.prototype.do_s_CharInfo = function (mess) { };
        MessageHandle.prototype.do_s_Player_EndInit = function (mess) { };
        MessageHandle.prototype.do_s_CharInfoList = function (mess) { };
        MessageHandle.prototype.do_s_UIshow = function (mess) { };
        MessageHandle.prototype.do_s_UIhide = function (mess) { };
        MessageHandle.prototype.do_s_TimerAdd = function (mess) { };
        MessageHandle.prototype.do_s_TimerRemove = function (mess) { };
        MessageHandle.prototype.do_s_Buff_add = function (mess) { };
        MessageHandle.prototype.do_s_Buff_remove = function (mess) { };
        MessageHandle.prototype.do_s_Buff_clear = function (mess) { };
        MessageHandle.prototype.do_s_mix = function (mess) { };
        MessageHandle.prototype.do_s_market_up = function (mess) { };
        MessageHandle.prototype.do_s_market_down = function (mess) { };
        MessageHandle.prototype.do_s_market_buy = function (mess) { };
        MessageHandle.prototype.do_s_market_list = function (mess) { };
        MessageHandle.prototype.do_s_market_item = function (mess) { };
        MessageHandle.prototype.do_s_Vip_leftime = function (mess) { };
        MessageHandle.prototype.do_s_Vip_price = function (mess) { };
        MessageHandle.prototype.do_s_broadcast = function (mess) { };
        MessageHandle.prototype.do_s_executeScript = function (mess) { };
        MessageHandle.prototype.do_s_mapTimer = function (mess) { };
        MessageHandle.prototype.do_s_map_turn = function (mess) { };
        MessageHandle.prototype.do_s_map_entertimes = function (mess) { };
        MessageHandle.prototype.do_s_map_pop = function (mess) { };
        MessageHandle.prototype.do_s_map_lasttime = function (mess) { };
        MessageHandle.prototype.do_s_map_lastmonster = function (mess) { };
        MessageHandle.prototype.do_s_map_lastturn = function (mess) { };
        MessageHandle.prototype.do_s_reborn = function (mess) { };
        MessageHandle.prototype.do_s_EXPRate_add = function (mess) { };
        MessageHandle.prototype.do_s_heart = function (mess) { };
        MessageHandle.prototype.do_s_boss_state = function (mess) { };
        MessageHandle.prototype.do_s_bonus_state = function (mess) { };
        MessageHandle.prototype.do_s_bonus_lixian = function (mess) { };
        MessageHandle.prototype.do_s_LiveNess = function (mess) { };
        MessageHandle.prototype.do_s_team_info = function (mess) { };
        MessageHandle.prototype.do_s_team_list = function (mess) { };
        MessageHandle.prototype.do_s_team_disband = function (mess) { };
        MessageHandle.prototype.do_s_team_leave = function (mess) { };
        MessageHandle.prototype.do_s_team_invite = function (mess) { };
        MessageHandle.prototype.do_s_look_infos = function (mess) { };
        MessageHandle.prototype.do_s_RandShop_updateMoney = function (mess) { };
        MessageHandle.prototype.do_s_RandShop = function (mess) { };
        MessageHandle.prototype.do_s_RandShopList = function (mess) { };
        MessageHandle.prototype.do_s_TurnList = function (mess) { };
        MessageHandle.prototype.do_s_turn_result = function (mess) { };
        MessageHandle.prototype.do_s_turn_over = function (mess) { };
        MessageHandle.prototype.do_s_turn_notice = function (mess) { };
        MessageHandle.prototype.do_s_SBK_aff = function (mess) { };
        MessageHandle.prototype.do_s_SBK_btnstatus = function (mess) { };
        MessageHandle.prototype.do_s_ph_Rank = function (mess) { };
        MessageHandle.prototype.do_s_huodong_status = function (mess) { };
        return MessageHandle;
    }());
    proto.MessageHandle = MessageHandle;
    __reflect(MessageHandle.prototype, "proto.MessageHandle");
})(proto || (proto = {}));
//# sourceMappingURL=MessageHandle.js.map