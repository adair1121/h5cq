module proto {
	export class Processor extends MessageHandle {
		public constructor() {
			super();
		}
		public handle(p: Pro) {
			if (this.commands[p.S]) {
				this.commands[p.S](p);
			}
		}
		public do_close() {
			console.log("与服务器断开连接");
		}
		public do_connect() {
			console.log("连接服务器成功");

			var msg_login:proto.c_Login=new proto.c_Login();
			msg_login.name=Config.username;
			msg_login.pass=Config.password;
			msg_login.isReLogin=false; 
			SocketManager.getInstance().sendProto(msg_login);

		}

		/**初始化数据 */
		public do_s_Map_Player(mess:Pro):void {
			ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.DATA],mess);
		}
		/**登录 */
		public do_s_Login(mess:Pro):void {
			ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.DATA],mess);
		}
		/**创建场景 */
		public do_s_CreateNewSence(mess:Pro):void {
			ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.MAP],mess);
		}
		/**动作列表 */
		public do_s_SendMessbox(mess:Pro):void {
			ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.ACTION],mess);
		}
		// /**换装 */
		public do_s_ChangeEquip(mess:Pro):void {
			ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.ROLEINFO],mess);
		}
		// /**添加背包物品 */
		public do_s_AddItems(mess:Pro):void{
			ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.BAG],mess);
		}
		/**使用物品 */
		public do_s_ItemUse(mess:Pro):void{
			ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.BAG],mess);
		}
		/**修改背包物品 */
		public do_s_ItemAttrChange(mess:Pro):void{
			ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.BAG],mess);
		}
		/**获取背包数据 */
		public do_s_BagItem(mess:Pro):void{
			ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.BAG],mess);
		}
		/**单个技能升级 */
		public do_s_skill_up(mess:Pro):void {
			ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.SKILLPANEL],mess);
		}
		/**全部技能升级 */
		public do_s_skillAllUp(mess:Pro):void{
			ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.SKILLPANEL],mess);
		}
		/**翅膀升星 */
		public do_s_wings_up(mess:Pro):void{
			ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.ROLEINFO],mess);
		}
		/**翅膀升阶 */
		public do_s_wings_levup(mess:Pro):void{
			ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.ROLEINFO],mess);
		}
		/**装备熔炼 */
		public do_s_SmeltEquips(mess:Pro):void{
			ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.BAG_SMELT],mess);
		}
		/**属性改变 */
		public do_s_RoleAttrChange(mess:Pro):void{
			ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.MAINUI,ModuleEnum.DATA],mess);
		}
		/**使用修为 */
		public do_s_GetXiuWei(mess:Pro):void{
			ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.ROLEINFO],mess);
		}
		/**转生 */
		public do_s_Reborn(mess:Pro):void{
			ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.ROLEINFO],mess);
		}
		/**创建角色 */
		public do_s_CreateRole(mess:Pro):void{
			ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.DATA],mess);
		}
		/**强化 */
		public do_s_Strengthen(mess:Pro):void{
			ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.FORGING,ModuleEnum.ROLEINFO],mess);
		}
		/**经脉 */
		public do_s_JingMai_Up(mess:Pro):void{
			ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.ROLEINFO],mess);
		}
		/**经脉升阶 */
		public do_s_JingMai_LvUp(mess:Pro):void{
			ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.ROLEINFO],mess);
		}
		/**龙魂护盾 */
		public do_s_SpecialEquip_Up(mess:Pro):void{
			ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.ROLEINFO],mess);
		}
		/**聊天记录 */
		public do_s_ChatCacheInfo(mess:Pro):void{
			ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.CHAT],mess);
		}
		/**聊天记录 */
		public do_s_ChatInfo(mess:Pro):void{
			ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.CHAT],mess);
		}
		/**聊天 */
		public do_s_say(mess:Pro):void{
			ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.CHAT],mess);
		}
		/**商城 */
		public do_s_RequestShop(mess:Pro):void{
			ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.STORE],mess);
		}
		/**购买物品 */
		public do_s_BuyItem(mess:Pro):void{
			ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.MAINUI],mess);
		}
		// /**全部购买 */
		// public do_s_BuyAllItem(mess:Pro):void{
		// 	ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.STORE],mess);
		// }
		/**初始化好友数据 */
		// public do_s_SendFriendInit(mess:Pro):void{
		// 	ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.FRIEND],mess);
		// }
		/**刷新好友列表 */
		public do_s_FriendList(mess:Pro):void{
			ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.FRIEND],mess);
		}
		/**添加聊天记录 */
		public do_s_PrivateChat(mess:Pro):void{
			ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.FRIEND],mess);
		}
		/**根据名字添加好友返回 */
		public do_s_FriendAck(mess:Pro):void{
			ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.FRIEND],mess);
		}
		/**更新好友状态 */
		public do_s_UpdateFriendState(mess:Pro):void{
			ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.FRIEND],mess);
		}

		/**剔除玩家 */
		public do_s_Kickout(mess:Pro):void{
			ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.MAINUI,ModuleEnum.DATA],mess);
		}
		/**收到邮件 */
		public do_s_MailList(mess:Pro):void{
			ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.MAIL],mess);
		}
		/**收到过期邮件 */
		public do_s_RefreshMailExpire(mess:Pro):void{
			ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.MAIL],mess);
		}
		/**领取邮件商品 */
		public do_s_TakeAward(mess:Pro):void{
			ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.MAIL],mess);
		}
		/**打开邮件 */
		public do_s_OpenMail(mess:Pro):void{
			ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.MAIL],mess);	
		}
		/**获取排行榜信息 */
		public do_s_GetRankList(mess:Pro):void{
			ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.RANK],mess);
		}
		/**获取排行榜玩家详细信息 */
		public do_s_GetRankInfo(mess:Pro):void{
			ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.RANK],mess);
		}
		/**排行榜改变 */
		public do_s_RankChange(mess:Pro):void{
			ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.RANK],mess);
		}
		/**排行榜是否膜拜列表 */
		public do_s_RankWorship(mess:Pro):void{
			ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.RANK],mess);
		}
		/** 排行榜膜拜*/
		public do_s_Worship(mess:Pro):void{
			ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.RANK],mess);
		}
		/**橙装合成 */
		public do_s_AssemblyEquip(mess:Pro):void{
			ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.CJ],mess);
		}
		/**橙装分解 */
		public do_s_DisassembleEquip(mess:Pro):void{
			ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.CJ],mess);
		}
		/**时装激活 */
		public do_s_ActiveFashion(mess:Pro):void{
			ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.ROLEINFO],mess);
		}
		/**穿上时装 */
		public do_s_DressFashion(mess:Pro):void{
			ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.ROLEINFO],mess);
		}
		/**时装过期 */
		public do_s_FashionExpire(mess:Pro):void{
			ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.ROLEINFO],mess);
		}
		/**时间同步 */
		public do_s_SyncTime(mess:Pro):void{
			ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.MAINUI],mess);
		}
		/**个人boss战斗返回 */
		public do_s_PersonalBoss(mess:Pro):void{
			ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.BOSS],mess);
		}
		/**世界boss战斗返回 */
		public do_s_WorldBoss(mess:Pro):void{
			ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.BOSS],mess);
		}
		/**boss战动作列表接收 */
		public do_s_NotifyAction(mess:Pro):void{
			ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.ACTION],mess);
		}
		/**个人boss列表 */
		public do_s_PersonalBossList(mess:Pro):void{
			ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.BOSS],mess);
		}
		/**世界boss列表 */
		public do_s_WorldBossList(mess:Pro):void{
			ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.BOSS],mess);
		}
		/**同步场景内所有的创建动作 */
		public do_s_SyncBossPlayer(mess:Pro):void{
			ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.ACTION],mess);
		}
		/**创建boss房间反馈 */
		public do_s_BossAck(mess:Pro):void{
			ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.BOSS],mess);
		}
		/**退出boss房间 */
		public do_s_LeaveBossRoom(mess:Pro):void{
			ModuleManager.getInstance().receiveMsgFromSever([ModuleEnum.MAINUI],mess);
		}
		// public do_s_mess(mess:Pro):void {}
		// public do_s_move(mess:Pro):void {}
		// public do_s_Mapload(mess:Pro):void {}
		// public do_s_Mapshow(mess:Pro):void {}
		// public do_s_setpos(mess:Pro):void {}
		// public do_s_Map_UnitAdd(mess:Pro):void {}
		// public do_s_Map_UnitRemove(mess:Pro):void {}
		// public do_s_MapUnitInfo(mess:Pro):void {}
		// public do_s_MapUnit_Model(mess:Pro):void {}
		// public do_s_MapUnit_title(mess:Pro):void {}
		// public do_s_MapUnit_state(mess:Pro):void {}
		// public do_s_TweenTo(mess:Pro):void {}
		// public do_s_addFire(mess:Pro):void {}
		// public do_s_removeFire(mess:Pro):void {}
		// public do_s_MapUnit_PkState(mess:Pro):void {}
		// public do_s_skill_add(mess:Pro):void {}
		// public do_s_skilluse(mess:Pro):void {}
		// public do_s_Damage(mess:Pro):void {}
		// public do_s_skill_setAttr(mess:Pro):void {}
		// public do_s_CD_add(mess:Pro):void {}
		// public do_s_CD_remove(mess:Pro):void {}
		// public do_s_item_add(mess:Pro):void {}
		// public do_s_item_remove(mess:Pro):void {}
		// public do_s_item_setplace(mess:Pro):void {}
		// public do_s_ItemInfo(mess:Pro):void {}
		// public do_s_item_setAttr(mess:Pro):void {}
		// public do_s_item_update(mess:Pro):void {}
		// public do_s_Prefix(mess:Pro):void {}
		// public do_s_item_sort(mess:Pro):void {}
		// public do_s_item_upgrade(mess:Pro):void {}
		// public do_s_item_Confirm(mess:Pro):void {}
		// public do_s_xilian(mess:Pro):void {}
		// public do_s_item_zhufu(mess:Pro):void {}
		// public do_s_GuildInfo(mess:Pro):void {}
		// public do_s_Guild_addMember(mess:Pro):void {}
		// public do_s_Guild_removeMember(mess:Pro):void {}
		// public do_s_GuildList(mess:Pro):void {}
		// public do_s_Guild_ApplyList(mess:Pro):void {}
		// public do_s_GuildInvite(mess:Pro):void {}
		// public do_s_GuildCreate(mess:Pro):void {}
		// public do_s_GuildMemberList(mess:Pro):void {}
		// public do_s_Guild_leave(mess:Pro):void {}
		// public do_s_Guild_Events(mess:Pro):void {}
		// public do_s_Guild_Member_update(mess:Pro):void {}
		// public do_s_Guild_NameOk(mess:Pro):void {}
		// public do_s_Guild_benifits(mess:Pro):void {}
		// public do_s_Guild_Apply(mess:Pro):void {}
		// public do_s_GuildInfo_update(mess:Pro):void {}
		// public do_s_GroupInfo(mess:Pro):void {}
		// public do_s_Group_addMember(mess:Pro):void {}
		// public do_s_Group_removeMember(mess:Pro):void {}
		// public do_s_Group_Disband(mess:Pro):void {}
		// public do_s_GroupUpdateLeader(mess:Pro):void {}
		// public do_s_groupInvite(mess:Pro):void {}
		// public do_s_group_leave(mess:Pro):void {}
		// public do_s_Task_triger(mess:Pro):void {}
		// public do_s_TaskInfo(mess:Pro):void {}
		// public do_s_TaskActive(mess:Pro):void {}
		// public do_s_TaskInActive(mess:Pro):void {}
		// public do_s_TaskRemove(mess:Pro):void {}
		// public do_s_Task_dayInfo(mess:Pro):void {}
		
		// public do_s_CharInfo(mess:Pro):void {}
		// public do_s_Player_EndInit(mess:Pro):void {}
		// public do_s_CharInfoList(mess:Pro):void {}
		// public do_s_UIshow(mess:Pro):void {}
		// public do_s_UIhide(mess:Pro):void {}
		// public do_s_TimerAdd(mess:Pro):void {}
		// public do_s_TimerRemove(mess:Pro):void {}
		// public do_s_setAttr(mess:Pro):void {}
		// public do_s_setAttrs(mess:Pro):void {}
		// public do_s_Buff_add(mess:Pro):void {}
		// public do_s_Buff_remove(mess:Pro):void {}
		// public do_s_Buff_clear(mess:Pro):void {}
		// public do_s_mix(mess:Pro):void {}
		// public do_s_market_up(mess:Pro):void {}
		// public do_s_market_down(mess:Pro):void {}
		// public do_s_market_buy(mess:Pro):void {}
		// public do_s_market_list(mess:Pro):void {}
		// public do_s_market_item(mess:Pro):void {}
		// public do_s_Vip_leftime(mess:Pro):void {}
		// public do_s_Vip_price(mess:Pro):void {}
		// public do_s_broadcast(mess:Pro):void {}
		// public do_s_executeScript(mess:Pro):void {}
		// public do_s_mapTimer(mess:Pro):void {}
		// public do_s_map_turn(mess:Pro):void {}
		// public do_s_map_entertimes(mess:Pro):void {}
		// public do_s_map_pop(mess:Pro):void {}
		// public do_s_map_lasttime(mess:Pro):void {}
		// public do_s_map_lastmonster(mess:Pro):void {}
		// public do_s_map_lastturn(mess:Pro):void {}
		// public do_s_AddFriend(mess:Pro):void {}
		// public do_s_reborn(mess:Pro):void {}
		// public do_s_EXPRate_add(mess:Pro):void {}
		// public do_s_heart(mess:Pro):void {}
		// public do_s_boss_state(mess:Pro):void {}
		// public do_s_bonus_state(mess:Pro):void {}
		// public do_s_bonus_lixian(mess:Pro):void {}
		// public do_s_LiveNess(mess:Pro):void {}
		// public do_s_team_info(mess:Pro):void {}
		// public do_s_team_list(mess:Pro):void {}
		// public do_s_team_disband(mess:Pro):void {}
		// public do_s_team_leave(mess:Pro):void {}
		// public do_s_team_invite(mess:Pro):void {}
		// public do_s_look_infos(mess:Pro):void {}
		// public do_s_RandShop_updateMoney(mess:Pro):void {}
		// public do_s_RandShop(mess:Pro):void {}
		// public do_s_RandShopList(mess:Pro):void {}
		// public do_s_TurnList(mess:Pro):void {}
		// public do_s_turn_result(mess:Pro):void {}
		// public do_s_turn_over(mess:Pro):void {}
		// public do_s_turn_notice(mess:Pro):void {}
		// public do_s_SBK_aff(mess:Pro):void {}
		// public do_s_SBK_btnstatus(mess:Pro):void {}
		// public do_s_ph_Rank(mess:Pro):void {}
		// public do_s_huodong_status(mess:Pro):void {}
	}
}