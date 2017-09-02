class MainNotify {
	public constructor() {

	}
	//==============================界面相关操作=======================================
	/**打开背包 */
	public static OPENBAG:string = "openBag";
	/**关闭背包 */
	public static CLOSEBAG:string = "closeBag";
	/**打开角色面板 */
	public static OPENROLEPANEL:string = "openRolePanel";
	/**关闭角色面板 */
	public static CLOSEROLEPANEL:string = "closeRolePanel";
	/**打开排行榜 */
	public static OPENRANKPANEL:string = "openRankPanel";
	/**打开商城面板 */
	public static OPENSTOREPANEL:string = "openStorePanel";
	/** 打开背包熔炼*/
	public static OPENBAGSMELT:string = "openBagSmelt";
	/**关闭背包熔炼*/
	public static CLOSEBAGSMELT:string = "closeBagSmelt";
	/**打开技能面板 */
	public static OPENSKILLPANEL:string = "openSkillPanel";
	/**转生 */
	public static REBORN:string = "reborn";
	/**打开选择角色面板 */
	public static OPENSELECTROLEPANEL:string = "openSelectRolePanel";
	/**关闭选择角色面板 */
	public static CLOSESELECTROLEPANEL:string = "closeSelectRolePanel";
	/**打开主界面 */
	public static OPENMAINPANEL:string = "openMainPanel";
	/**关闭主界面 */
	public static CLOSEMAINPANEL:string = "closeMainPanel";
	public static CREATENEWROLE:string = "createNewRole";
	public static DEALACTION:string = "dealAction";
	/**打开创建新角色界面 */
	public static OPENCREATEROLE:string = "openCreateRole";
	/**关闭创建角色界面 */
	public static CLOSECRETEROLE:string = "closeCreateRole";
	/** 打开橙装界面*/
	public static OPENCJPANEL:string = "openCjPanel";
	//====================================元宝金币消费相关================================================
	/**购买商品的统一处理 */
	public static BUYITEM:string = "butItem";
	/**从商城以外购买材料 */
	public static OTHERBUYITEM:string = "otherBuyItem";
	/**从商城购买材料 */
	public static STOREBUYITEM:string = "storeBuyItem";
	/** 处理购买后的数据（此事件只针对商城）*/
	public static DEALBUYITEMDATA:string = "dealBuyItemData"
	/**购买物品zong消费发生改变 */
	public static COSTCHANGE:string = "costChange";
	/**添加背包格子 */
	public static HANDSHAKE_ADDBOXNUM:string = "handShake_addBoxNum";

	//=======================================强化提升相关操作============================================
	/**翅膀升星 */
	public static STAR_UPGRADE:string = "star_upGrade";
	/**翅膀一键升星 */
	public static AUTO_STAR_UPGRADE:string = "auto_star_upGrade";
	/**翅膀经验提升 */
	public static EXPERIENCE_STAR:string = "experience_star";
	/**翅膀升阶 */
	public static WINGCHANGE:string = "wingChange";
	/**获取龙魂护盾页面数据 */
	public static GETLONGHUN_OR_SHIELD:string = "getLongHun_or_shield";
	/**提升龙魂护盾 */
	public static UP_LONGHUN_OR_HUDUN:string = "up_longhun_or_hudun";
	/**经脉提升 */
	public static JINGMAIUP:string = "jingMaiUp"
	/**使用修为 */
	public static USE_XIUWEI:string = "use_xiuwei";
	/**使用道具 */
	public static USE_GOODS:string = "use_goods";
	//==========================================其它操作====================================
	/**职业改变 */
	public static JOBCHAGNE:string = "jobChange";
	/**橙装改变 */
	public static CJCHANGE:string = "cjChange";
	/**显示背包中装备 */
	public static SHOWEQUIP:string = "showEquip";
	/**显示背包中道具 */
	public static SHOWPROP:string = "showProp";
	/**移除背包中item */
	public static REMOVEBAGITEM:string = "removeBgItem";
	/**初始化nav焦点 */
	public static INITNAVFOCUS:string = "initNavFocus";
	/**请求换装 */
	public static RELOADINGCLOTH:string = "reloadingCloth";
	/**换装完成 */
	public static RELOADINGRES:string = "reloadingRes"
	/**血池或法池重置 */
	public static RESET_POOLBALL:string = "resetPoolBall";
	/**血池或法池减少 */
	public static REDUCE_POLLBALL:string = "reducePollBall";
	/**显示poptips */
	public static SHOWPOPTIPS:string = "showPopTips";
	/**橙装合成 */
	public static CJ_ASSEMBLY:string = "cj_assembly";
	/**橙装合成成功 */
	public static CJ_ASSEMBLY_SUCCESS:string = "cj_assembly_success";
	/**橙装分解 */
	public static CJ_DISASSEMBLY:string = "cj_disassembly";
	/**橙装分解成功 */
	public static CJ_DISASSEMBLY_SUCCESS:string = "cj_disassembly_success";
	/**时装激活 */
	public static SJ_ACTIVATE:string = "sj_activate";
	/**时装激活成功 */
	public static SJ_ACTIVATE_SUCCESS:string = "sj_activate_success";
	/**穿上时装 */
	public static SJ_DRESS:string = "sj_dress";
	/**时装成功穿上 */
	public static SJ_DRESS_SUCCESS:string = "sj_dress_success";
	/**时装到期 */
	public static SJ_EXPIRE:string = "sj_expire";
	/**同步时间 */
	public static SYNCTIME:string = "syncTime";
	/**时间计时开始 */
	public static TIMESTART:string = "timeStart";
	/**时间计时结束 */
	public static TIMEEND:string = "timeEnd";
	//===============================================关卡副本相关========================================
	/**发送自动挑战请求 */
	public static SENDTOSAUTOCHALLENGE:string = "sendToSAutoChallenge";
	/**打开关卡界面 */
	public static OPENCHALLENGEPANEL:string = "openChallengePanel";
	/**打开副本界面 */
	public static OPENFUBENPANEL:string = "openFuBenPanel";
	/**切换场景 */
	public static CHANGESCENE:string="changeScene";
	/**当前boss总血量 */
	public static BOSSTOTALHP:string = "bossTotalHp";
	/**boss当前血量 */
	public static BOSSCURHP:string = "bossCurHp";


	///////////////////数据模块//////////////////////////
	/**初始化数据 */
	public static INITDATA:string = "initData"


	//////////////////锻造模块////////////////////////
	/**打开锻造面板 */
	public static OPENFORGINGPANEL:string="openForgingPanel"

	//////////////////挑战boss相关////////////////////////
	/**打开个人boss页面 */
	public static OPENPERSONALBOSSPANEL:string = "openPersonalBossPanel";
	/**挑战个人boss */
	public static CHALLENGE_PERSONAL_BOSS:string = "challenge_personal_boss";
	/**世界boss复活 */
	public static WORLDBOSSREBIRTH:string = "worldBossRebirth";
	/**挑战全民boss */
	public static CHALLENGE_WORLD_BOSS:string = "challenge_world_boss";
	/**执行额外动作列表操作 */
	public static EXTRACTIONLIST:string = "extrActionList";
	//////////////////聊天////////////////////////
	/**打开聊天面板 */
	public static OPENCHATPANEL:string="openChatPanel";
	/**添加聊天记录 */
	public static ADDCHAT:string="addChat";
	/**过滤黑名单聊天内容 */
	public static FILTERCHAT:string = "filterChat";
	/**清除过滤 */
	public static CLEARFILTER:string = "clearFilter";
	/**私聊信息 */
	public static PRIVATEDATACATCH:string = "privateDataCatch";
	/**私聊 */
	public static PRIVATESAY:string = "privateSay";
	/**私聊成功 */
	public static SAYSUCESS:string = "saySuccess";
	/**接收私聊信息 */
	public static RECEIVESAY:string = "receiveSay";
	//////////////////好友////////////////////////
	/**打开好友面板 */
	public static OPENFRIENDSPANEL:string="openFriendsPanel";
	// /**添加聊天记录 */
	// public static ADDCHAT:string="addChat";
	/** 朋友相关操作*/
	public static FRIENDS_OPER:string = "friends_oper";


/////////////////////邮件/////////////////////////////////////////////////////////
	/**打开邮件面板 */
	public static OPENMAILPANEL:string="openMailPanel";
	
	
	

}