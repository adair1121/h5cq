module data{
	export enum PAttr{
		/**
		* 穿戴限制
		**/
		Ntype=0,
		/**
		* 品质
		**/
		Quality=1,
		/**
		* 内观
		**/
		looks=2,
		/**
		* 内观效果
		**/
		Lcount=3,
		/**
		* 数据库递增ID
		**/
		charID=4,
		lev=5,
		/**
		* 转生次数
		**/
		reborn=6,
		exp=7,
		/**
		* 经验，下一级经验
		**/
		nextexp=8,
		/**
		* 翅膀经验
		**/
		wingsexp=9,
		/**
		* 翅膀等级
		**/
		wingslve=10,
		/**
		* 翅膀星数
		**/
		wingsstar=11,
		/**
		* 羽毛
		**/
		feather=12,
		/**
		* 技能大等级
		**/
		maxskilllve=13,
		/**
		* 性别
		**/
		sex=14,
		/**
		* 职业
		**/
		JOB=15,
		/**
		* 阵营
		**/
		CAMP=16,
		/**
		* 地图ID
		**/
		mapid=17,
		/**
		* 头像ID
		**/
		head=18,
		x=19,
		y=20,
		MHP=21,
		/**
		* 最大HP，MP
		**/
		MMP=22,
		HP=23,
		/**
		* ------当前HP，当前MP
		**/
		MP=24,
		/**
		* 声望
		**/
		Reputation=25,
		/**
		* 人品值
		**/
		RP=26,
		HPPool=27,
		MPPool=28,
		bagcount=29,
		/**
		* 背包格子数量 仓库格子数量
		**/
		storecount=30,
		money=31,
		/**
		* 元宝，金币
		**/
		gold=32,
		/**
		* 绑金
		**/
		bindgold=33,
		bindmoney=34,
		/**
		* 暴击率
		**/
		critial=35,
		/**
		* 暴击伤害系数
		**/
		critcoe=36,
		/**
		* 抗暴系数
		**/
		resicritial=37,
		/**
		* 物攻
		**/
		ATK=38,
		/**
		* 物防
		**/
		DEF=39,
		/**
		* 魔攻
		**/
		MATK=40,
		/**
		* 魔防
		**/
		MDEF=41,
		/**
		* 伤害减免百分率
		**/
		DRD=42,
		/**
		* dmgReduction 物理傷害減免 傷害減免比率
		**/
		DRDrate=43,
		MDRD=44,
		/**
		* 魔法傷害減免 傷害減免比率
		**/
		MDRDrate=45,
		DRF=46,
		/**
		* dmgReflection 物理傷害反射 物理傷害反射機率
		**/
		DRFrate=47,
		MDRF=48,
		/**
		* dmgReflection 法术傷害反射 法术傷害反射機率
		**/
		MDRFrate=49,
		/**
		* Ignore Target Defense 无视目标防御
		**/
		Itd=50,
		LL=51,
		/**
		* LEECH LIFE 偷取生命，偷取生命百分比
		**/
		LLrate=52,
		LM=53,
		/**
		* LEECH MP 偷取魔法 偷取魔法百分比
		**/
		LMrate=54,
		FR=55,
		/**
		* FireResist FireEnchanted 火系抵抗，火系强化
		**/
		FE=56,
		CR=57,
		/**
		* ColdResist ColdEnchanted 冰系强化，冰系抵抗
		**/
		CE=58,
		LR=59,
		/**
		* LightResist LightEnchanted 电系
		**/
		LE=60,
		PR=61,
		/**
		* PoisonResist PoisonEnchanted 毒系
		**/
		PE=62,
		impaleR=63,
		/**
		* 穿刺抵抗和增强
		**/
		impaleE=64,
		chopR=65,
		/**
		* 砍削抵抗和增强
		**/
		chopE=66,
		horseR=67,
		/**
		* 落马抵抗 落马增强。
		**/
		horseE=68,
		/**
		* 运输任务的次数?
		**/
		points=69,
		/**
		* 金币倍率
		**/
		goldrate=70,
		/**
		* 经验倍率
		**/
		exprate=71,
		/**
		* 技能倍率
		**/
		skillrate=72,
		/**
		* 装备爆率
		**/
		droprate=73,
		/**
		* 玩家自己设置的PK标志
		**/
		PKFLAG=74,
		/**
		* PK值
		**/
		PK=75,
		/**
		* 战斗力
		**/
		FightValue=76,
		/**
		* VIP等级
		**/
		VIP=77,
		/**
		* VIP经验
		**/
		VIPexp=78,
		/**
		* VIP激活时间
		**/
		VIPtime=79,
		/**
		* boss积分
		**/
		Bossear=80,
		/**
		* 不能移动
		**/
		CantMove=81,
		/**
		* 不能被攻击
		**/
		CantHited=82,
		/**
		* 不能使用魔法
		**/
		CantUseMP=83,
		/**
		* 不能使用技能
		**/
		CantUseSkill=84,
		/**
		* 不能使用技能
		**/
		CantUseItem=85,
		/**
		* 是否隐身
		**/
		CantVisible=86,
		/**
		* 是否死亡
		**/
		isDie=87,
		End=88,
	}

	export enum ChannelType{
		/**
		* 世界
		**/
		world=0,
		/**
		* 公会
		**/
		guild=1,
		/**
		* 私聊
		**/
		whisper=2,
		/**
		* 普通
		**/
		map=3,
		/**
		* 组队
		**/
		group=4,
		/**
		* 系统提示
		**/
		system=5,
		GM=6,
	}

	export enum ActionType{
		/**
		* 移动
		**/
		Move=0,
		AddUnit=1,
		RemoveUnit=2,
		UseSkill=3,
		ShowDamage=4,
		Stay=5,
	}

	export enum RoleState{
		/**
		* 死亡
		**/
		Dead=0,
		move=1,
		attack=2,
		stay=3,
		dizzy=4,
	}

	export enum PlayerAttr{
		/**
		* VIP等级
		**/
		VIP=0,
		/**
		* 头像ID
		**/
		head=1,
		/**
		* 等级
		**/
		levID=2,
		/**
		* 经验
		**/
		exp=3,
		/**
		* 金钱
		**/
		money=4,
		/**
		* 元宝
		**/
		gold=5,
		/**
		* 背包数量
		**/
		bagcount=6,
		/**
		* 转生次数
		**/
		rebornID=7,
		/**
		* 修为
		**/
		xiuwei=8,
		/**
		* 降级剩余次数
		**/
		degraderemaincount=9,
		/**
		* 高级转生丹剩余次数
		**/
		gaozhuan_remaincount=10,
		/**
		* 超级转生丹剩余次数
		**/
		chaozhuan_remaincount=11,
		/**
		* 熔炼等级
		**/
		ronglianLv=12,
		/**
		* 熔炼值
		**/
		ronglianValue=13,
		/**
		* 战斗力
		**/
		FightValue=14,
		/**
		* 当前关卡挑战波数
		**/
		LevelCount=15,
		/**
		* 神功等级
		**/
		shengongLvId=16,
		/**
		* 历练值
		**/
		lilianValue=17,
		/**
		* 爵位等级
		**/
		jueweiLvId=18,
		/**
		* 月卡剩余天数
		**/
		yueka_remaincount=19,
		/**
		* 贵族特权剩余天数
		**/
		gztq_remaincount=20,
		/**
		* 今日祈福剩余次数
		**/
		qifu_remaincount=21,
		/**
		* 觉醒等级
		**/
		jx_lv=22,
		/**
		* 觉醒真气
		**/
		jx_zhenqi=23,
		/**
		* 觉醒副本挑战剩余次数
		**/
		jx_tiaozhan_remaincount=24,
		/**
		* 战灵等级
		**/
		zl_lv=25,
		/**
		* 战灵经验
		**/
		zl_exp=26,
		/**
		* 战灵品阶
		**/
		zl_quality=27,
		/**
		* 战灵星级
		**/
		zl_star=28,
		/**
		* 密藏开启剩余次数
		**/
		mz_remaincount=29,
		/**
		* 王者争霸剩余次数
		**/
		wzzb_remaincount=30,
		/**
		* 黄金矿洞开采次数
		**/
		hjkd_collect=31,
		/**
		* 黄金矿洞掠夺次数
		**/
		hjkd_fight=32,
		/**
		* 遭遇战出现新敌人时间
		**/
		zyz_time=33,
		/**
		* 宝石副本每日挑战剩余次数
		**/
		bsfb_remaincount=34,
		/**
		* 静脉副本每日挑战剩余次数
		**/
		jmfb_remaincount=35,
		/**
		* 龙魂副本每日挑战剩余次数
		**/
		lhfb_remaincount=36,
		/**
		* 护盾副本每日挑战剩余次数
		**/
		hdfb_remaincount=37,
		/**
		* 挑战副本已通关关数
		**/
		tzfb_remaincount=38,
		/**
		* 全民boss每日挑战次数
		**/
		boss_remaincount=39,
		/**
		* 全民Boss残留时间秒数
		**/
		boss_remainSeconds=40,
		/**
		* 全民Boss挑战时间
		**/
		boss_tz_time=41,
		/**
		* 50级个人boss每日挑战次数
		**/
		boss50_remaincount=42,
		/**
		* 当前关卡ID
		**/
		levelStageID=43,
		/**
		* 开启背包格子数量
		**/
		OpenBagCount=44,
		/**
		* 神秘商店积分
		**/
		shopScore=45,
		/**
		* 神秘商店刷新时间
		**/
		shopRefreshTime=46,
		/**
		* 功勋
		**/
		gongxun=47,
		/**
		* 强化总等级
		**/
		qh_totalLv=48,
		/**
		* 宝石总等级
		**/
		bs_totalLv=49,
		/**
		* 护盾总等级
		**/
		hd_totalLv=50,
		/**
		* 主线任务ID
		**/
		mainTaskID=51,
		/**
		* 战斗经验百分比
		**/
		exp_percent=52,
		/**
		* 战斗金钱百分比
		**/
		money_percent=53,
		MAX=54,
	}

	export enum RoleAttr{
		/**
		* 最大HP0
		**/
		MHP=0,
		/**
		* 最大MP1
		**/
		MMP=1,
		/**
		* 攻击2
		**/
		ATK=2,
		/**
		* 物防3
		**/
		DEF=3,
		/**
		* 魔防4
		**/
		MDEF=4,
		/**
		* 暴击率5
		**/
		critial=5,
		/**
		* 暴击伤害系数6
		**/
		critcoe=6,
		/**
		* 抗暴系数7
		**/
		resicritial=7,
		/**
		* 麻痹几率8
		**/
		palsyRate=8,
		/**
		* 麻痹抵抗9
		**/
		resiPalsy=9,
		/**
		* 伤害减免10
		**/
		DRD=10,
		/**
		* 经脉在表中ID11
		**/
		jingmaiID=11,
		/**
		* 翅膀在表中ID12
		**/
		wingsID=12,
		/**
		* 翅膀经验13
		**/
		wingsexp=13,
		/**
		* 职业14
		**/
		job=14,
		/**
		* 当前HP15
		**/
		HP=15,
		/**
		* 当前MP16
		**/
		MP=16,
		/**
		* 性别17
		**/
		sex=17,
		/**
		* 战斗力18
		**/
		FightValue=18,
		/**
		* x坐标19
		**/
		x=19,
		/**
		* y坐标20
		**/
		y=20,
		/**
		* 角色状态21
		**/
		state=21,
		/**
		* 治疗效果百分比22
		**/
		treat_percent=22,
		/**
		* 最大生命百分比30
		**/
		hp_percent=30,
		/**
		* 最大魔法百分比31
		**/
		mp_percent=31,
		/**
		* 攻击百分比32
		**/
		atk_percent=32,
		/**
		* 物防百分比33
		**/
		def_percent=33,
		/**
		* 法防百分比34
		**/
		mdef_percent=34,
		/**
		* 暴击伤害百分比36
		**/
		critcoe_percent=36,
		MAX=37,
	}

	export enum GuildJob{
		/**
		* 非公会成员
		**/
		notMember=0,
		/**
		* 会长
		**/
		HuiZhang=1,
		/**
		* 副会长
		**/
		FuHuiZhang=2,
		/**
		* 长老
		**/
		ZhangLao=3,
		/**
		* 护法
		**/
		HuFa=4,
		/**
		* 堂主
		**/
		TangZhu=5,
		/**
		* 精英
		**/
		JingYing=6,
		/**
		* 成员
		**/
		ChengYuan=7,



	}

	export enum FriendEnum{
		/**
		* 好友列表
		**/
		friendsList=0,
		/**
		* 最近联系人列表
		**/
		recentList=1,
		/**
		* 申请人列表
		**/
		replyList=2,
		/**
		* 黑名单列表
		**/
		blackList=3,
		/**
		* 移除列表
		**/
		removeList=4,
	}

	export enum SenceType{
		/**
		* 野外
		**/
		YeWai=0,
		GuanQia=1,
		FuBen=2,
		GeRenBoss=3,
	}

	export enum ItemAttr{
		MHP=0,
		/**
		* 最大HP，MP
		**/
		MMP=1,
		/**
		* 攻击
		**/
		ATK=2,
		/**
		* 物防
		**/
		DEF=3,
		/**
		* 魔防
		**/
		MDEF=4,
		/**
		* 暴击率
		**/
		critial=5,
		/**
		* 暴击伤害系数
		**/
		critcoe=6,
		/**
		* 抗暴系数
		**/
		resicritial=7,
		/**
		* 麻痹几率
		**/
		palsyRate=8,
		/**
		* 麻痹抵抗
		**/
		resiPalsy=9,
		/**
		* 伤害减免
		**/
		DRD=10,
		/**
		* 物品数量
		**/
		count=11,
		/**
		* 装备位置 只有在身上装备时这属性才有效
		**/
		equipPos=12,
		/**
		* 评分
		**/
		score=13,
		/**
		* 用于标注共有多少属性
		**/
		Max=14,
	}

	export enum JobAttr{
		/**
		* 玩家
		**/
		Player=0,
		/**
		* 战士
		**/
		JS=1,
		/**
		* 法师
		**/
		FS=2,
		/**
		* 道士
		**/
		DS=3,
	}

	export enum FriendState{
		/**
		* 好友
		**/
		Friend=0,
		/**
		* 黑名单
		**/
		Blacklist=1,
		/**
		* 移除
		**/
		Remove=2,
	}

	export enum ItemType{
		/**
		* 武器
		**/
		weapon=101,
		/**
		* 衣服
		**/
		clothes=102,
		/**
		* 头盔
		**/
		helmet=103,
		/**
		* 项链
		**/
		necklace=104,
		/**
		* 手镯
		**/
		bracelet=105,
		/**
		* 戒指
		**/
		ring=106,
		/**
		* 羽毛
		**/
		feather=107,
		/**
		* 强化石
		**/
		strStone=108,
		/**
		* 经脉丹
		**/
		jingmaidan=109,
		/**
		* 金钱
		**/
		money=110,
		/**
		* 龙魂碎片
		**/
		dragonSoul=111,
		/**
		* 护盾碎片
		**/
		shield=112,
		/**
		* 转生丹
		**/
		zhuanshengdan=113,
		/**
		* 高级转生丹
		**/
		seniorZhuanshengdan=114,
		/**
		* 超级转生丹
		**/
		superZhuanshengdan=115,
		/**
		* 注灵石
		**/
		zhulingshi=116,
		/**
		* 宝石碎片
		**/
		baoshisuipian=117,
	}

	export enum EquipPos{
		/**
		* 天珠0
		**/
		tianzhu=0,
		/**
		* 武器1
		**/
		weapon=1,
		/**
		* 头盔2
		**/
		head=2,
		/**
		* 衣服3
		**/
		body=3,
		/**
		* 项链4
		**/
		neck=4,
		/**
		* 左手镯5
		**/
		left_bracelet=5,
		/**
		* 右手镯6
		**/
		right_bracelet=6,
		/**
		* 左戒指7
		**/
		left_ring=7,
		/**
		* 右戒指8
		**/
		right_ring=8,
		/**
		* 麻痹戒指9
		**/
		palsy_ring=9,
		/**
		* 护身戒指10
		**/
		protect_ring=10,
		/**
		* 龙魂11
		**/
		dragon_soul=11,
		/**
		* 护盾12
		**/
		shield=12,
		/**
		* 法宝1 21
		**/
		fabao1=21,
		/**
		* 法宝2 22
		**/
		fabao2=22,
		/**
		* 法宝3 23
		**/
		fabao3=23,
		/**
		* 法宝4 24
		**/
		fabao4=24,
		/**
		* 法宝5 25
		**/
		fabao5=25,
		/**
		* 角色时装201
		**/
		fashion_role=201,
		/**
		* 武器时装202
		**/
		fashion_weapon=202,
		/**
		* 翅膀时装203
		**/
		fashion_wings=203,
	}

	export enum Race{
		/**
		* 蛮族
		**/
		Barbarian=1,
		/**
		* 侏儒
		**/
		dwarf=2,
		/**
		* 鬼族
		**/
		Guizu=3,
		/**
		* 蚁族
		**/
		ant=4,
		/**
		* 精灵
		**/
		Wizard=5,
		/**
		* 龙
		**/
		Dragon=6,
		/**
		* Alliance
		**/
		Industrial=7,
		/**
		* Alliance
		**/
		Business=8,
		/**
		* alliance
		**/
		Military=9,
		/**
		* Union
		**/
		Robber=10,
	}

	export enum Rongyu{
		/**
		* 蛮族
		**/
		Barbarian=0,
		/**
		* 侏儒
		**/
		dwarf=1,
		/**
		* 鬼族
		**/
		Guizu=2,
		/**
		* 蚁族
		**/
		ant=3,
		/**
		* 精灵
		**/
		Wizard=4,
		/**
		* 龙族
		**/
		Dragon=5,
		/**
		* Alliance
		**/
		Industrial=6,
		/**
		* Alliance
		**/
		Business=7,
		/**
		* alliance
		**/
		Military=8,
		/**
		* Union
		**/
		Robber=9,
		Honor=10,
		PK=11,
		/**
		* 师德
		**/
		Ethics=12,
		/**
		* 战绩
		**/
		Record=13,
		/**
		* 帮贡
		**/
		Contribution=14,
		/**
		* 财富
		**/
		Wealth=15,
		/**
		* 勇气
		**/
		Appeal=16,
		/**
		* 藏宝
		**/
		Booty=17,
		/**
		* 冲
		**/
		Equipment=18,
		/**
		* 富豪
		**/
		Regal=19,
		/**
		* 魅力
		**/
		Charm=20,
		/**
		* 生产
		**/
		Mining=21,
		/**
		* 活跃
		**/
		Active=22,
		/**
		* 人气
		**/
		Popularity=23,
	}

	export enum MapMode{
		normal=0,
		fight=1,
		hun=2,
		defence=3,
		attack=4,
	}

	export enum PKFLAG{
		/**
		* 和平
		**/
		safe=0,
		/**
		* 组队
		**/
		group=1,
		/**
		* 帮会
		**/
		guild=2,
		/**
		* 善恶
		**/
		shane=3,
		/**
		* 自由（全体）
		**/
		free=4,
		/**
		* 阵营
		**/
		camp=5,
	}

	export enum DamageType{
		none=0,
		miss=1,
		addhp=2,
		minushp=3,
		addmp=4,
		minusmp=5,
		sp=6,
		baoji=7,
		lucky=8,
		fantan=9,
	}

	export enum MobState{
		Die=0,
		Wander=1,
		Attak=2,
		Back=3,
		Path=4,
	}

	export enum TargetType{
		self=0,
		item=1,
		unit=2,
		point=3,
	}

	export enum UnitState{
		/**
		* 普通状态
		**/
		normal=0,
		/**
		* 死亡状态
		**/
		die=1,
		/**
		* 移动状态
		**/
		move=2,
		/**
		* 吟唱状态
		**/
		sing=3,
		/**
		* 采集状态
		**/
		collect=4,
	}

	export enum ItemTarget{
		none=0,
		item=1,
		unit=2,
		friendunit=3,
		enemyunit=4,
		point=5,
	}

	export enum PlayMode{
		/**
		* 无特效
		**/
		none=0,
		/**
		* 直线飞行
		**/
		fly=1,
		/**
		* 直线播放
		**/
		line=2,
		/**
		* 从头顶降落
		**/
		fall=3,
		/**
		* 原地
		**/
		normal=4,
		/**
		* 原地带方向（施法者指向目标）
		**/
		normal_arrow=5,
		/**
		* 追踪
		**/
		Trace=6,
		/**
		* 多枚追踪
		**/
		multTrace=7,
		/**
		* 多枚飞行
		**/
		multfly=8,
	}

	export enum SkillShape{
		none=0,
		/**
		* 单体
		**/
		single=1,
		/**
		* 直线
		**/
		line=2,
		/**
		* 圆形
		**/
		circle=3,
		/**
		* 扇形
		**/
		fan=4,
	}

	export enum ValidTarget{
		/**
		* 无
		**/
		none=0,
		/**
		* 自己
		**/
		self=1,
		/**
		* 友好
		**/
		friend=2,
		/**
		* 敌对
		**/
		enemy=3,
		/**
		* 掉落物
		**/
		dorpitem=4,
		/**
		* 采集物
		**/
		collect=5,
	}

	export enum JOB{
		/**
		* 全职业
		**/
		all=0,
		/**
		* 战士
		**/
		ZhanShi=1,
		/**
		* 法师
		**/
		FaShi=2,
		/**
		* 道士
		**/
		DaoShi=3,
	}

	export enum BuffType{
		/**
		* 眩晕
		**/
		XuanYun=1,
		ChiXuHuiXue=2,
		ChiXuJianXue=3,
		JiaFang=4,
		JianFang=5,
		JianShang=6,
		ZengShang=7,
	}

	export enum Look{
		/**
		* 上
		**/
		up=1,
		rihgt_up=2,
		right=3,
		right_down=4,
		down=5,
		left_down=6,
		left=7,
		left_up=8,
	}

	export enum StrengthenType{
		/**
		* 强化
		**/
		ST_QH=1,
		/**
		* 宝石
		**/
		ST_BS=2,
		/**
		* 注灵
		**/
		ST_ZL=3,
		/**
		* 精炼
		**/
		ST_JL=4,
		/**
		* 铸魂
		**/
		ST_ZH=5,
		/**
		* 龙魂
		**/
		ST_LH=11,
		/**
		* 护盾
		**/
		ST_HD=12,
		/**
		* 麻痹戒指
		**/
		ST_MB=13,
		/**
		* 护身戒指
		**/
		ST_HS=14,
		/**
		* 法宝1
		**/
		ST_FB1=21,
		/**
		* 法宝2
		**/
		ST_FB2=22,
		/**
		* 法宝3
		**/
		ST_FB3=23,
		/**
		* 法宝4
		**/
		ST_FB4=24,
		/**
		* 法宝5
		**/
		ST_FB5=25,
	}

	export enum NPCFUNC{
		/**
		* 什么也没有做
		**/
		None=0,
		/**
		* 仓库
		**/
		ck=1,
		/**
		* 交易
		**/
		Deal=2,
		/**
		* npc商人
		**/
		sd=3,
		/**
		* 收取邮件
		**/
		getMail=4,
		/**
		* 提炼，合成
		**/
		hc=5,
		/**
		* 强化
		**/
		qh=6,
		/**
		* 宝石拆卸
		**/
		cx=7,
		/**
		* 帮会
		**/
		bh=8,
		/**
		* 开始跑环
		**/
		rw=9,
		/**
		* 师徒
		**/
		st=10,
		/**
		* 结婚
		**/
		jh=11,
		/**
		* 拍卖行
		**/
		jy=12,
		/**
		* 传送
		**/
		cs=13,
		/**
		* 战场
		**/
		zc=14,
		/**
		* 宠物
		**/
		cw=15,
		/**
		* 赠送礼品
		**/
		sj=16,
		/**
		* 委托任务
		**/
		ss=17,
		/**
		* 内容介绍
		**/
		ts=18,
		/**
		* 排名
		**/
		pm=19,
		/**
		* 悬赏
		**/
		xs=20,
	}

	export enum FUNC{
		/**
		* 什么也没有做0
		**/
		None=0,
		/**
		* 影响属性1
		**/
		effectattr=1,
		/**
		* 添加buf2
		**/
		addbuff=2,
		/**
		* 移除buf3
		**/
		removebuff=3,
		/**
		* 添加一种技能4
		**/
		addskill=4,
		/**
		* 触发任务5
		**/
		trigerTask=5,
		/**
		* 召唤一个宠物6
		**/
		summonPet=6,
		/**
		* 召唤坐骑7
		**/
		summonRide=7,
		/**
		* 传送8
		**/
		transport=8,
		/**
		* 变身9
		**/
		changeAvatar=9,
		/**
		* 击退10
		**/
		kickback=10,
		/**
		* 弹出UI11
		**/
		popUI=11,
		/**
		* 提升物品等级12
		**/
		improveitem=12,
		/**
		* 洗点13
		**/
		Wash=13,
		/**
		* 商店14
		**/
		Shop=14,
		/**
		* 增加双倍经验15
		**/
		addExpRate=15,
		/**
		* 回城16
		**/
		backCity=16,
		/**
		* npc传送 17
		**/
		NPCTransmit=17,
	}

	export enum EntityType{
		/**
		* 未指定
		**/
		None=0,
		/**
		* 玩家角色
		**/
		Player=1,
		/**
		* 召唤物
		**/
		Summon=2,
		/**
		* 怪物
		**/
		Mob=3,
		/**
		* boss
		**/
		Boss=4,
		/**
		* npc
		**/
		Npc=5,
		/**
		* 地图
		**/
		Map=6,
		/**
		* 掉落物
		**/
		DropItem=7,
		/**
		* 采集物
		**/
		Collect=8,
		/**
		* 区域
		**/
		Area=9,
	}

	export enum ReqType{
		addteach=0,
		addfriend=1,
		addenemy=2,
		/**
		* 申请组队
		**/
		applygroup=3,
		/**
		* 发起交易
		**/
		applydeal=4,
		/**
		* 申请加入帮会
		**/
		applyenterguild=5,
		/**
		* 邀请加入帮会
		**/
		inviteenterguild=6,
		End=7,
	}

	export enum DamageSort{
		none=0,
		fire=1,
		cold=2,
		light=3,
	}

	export enum TaskState{
		/**
		* 进行中
		**/
		process=0,
		/**
		* 已经失败
		**/
		fail=1,
		/**
		* 已经完成
		**/
		finish=2,
	}

	export enum TaskType{
		none=0,
		/**
		* 对话类 1
		**/
		chat=1,
		/**
		* 送信类 2
		**/
		mail=2,
		/**
		* 杀怪类 3
		**/
		killmob=3,
		/**
		* 收集类 4
		**/
		collect=4,
		/**
		* 使用物品类 5
		**/
		useitem=5,
		/**
		* 探索类 6
		**/
		explore=6,
		/**
		* 数值类 7
		**/
		num=7,
		/**
		* 护送类8
		**/
		help=8,
		/**
		* 装备9
		**/
		equip=9,
		/**
		* fuben10
		**/
		fuben=10,
		/**
		* yunshu11
		**/
		yunshu=11,
		/**
		* 每日数值型
		**/
		num2=12,
	}

	export enum TrigerType{
		/**
		* 无
		**/
		none=0,
		/**
		* 1 NPC给予
		**/
		npc=1,
		/**
		* 2 拾取物品获得
		**/
		getitem=2,
		/**
		* 3 进入某场景
		**/
		entermap=3,
		/**
		* 4 系统自动
		**/
		system=4,
		/**
		* 5 杀死某怪
		**/
		kill=5,
		/**
		* 6 使用特定物品。
		**/
		useitem=6,
	}

	export enum TipType{
		team_kickout=0,
		team_full=1,
		team_disband=2,
		team_enter=3,
		team_leave=4,
		improve_needgold=5,
		improve_needmoney=6,
		improve_full=7,
		improvemax_needgold=8,
		improve_change_suc=9,
		improve_change_needgold=10,
		pk_kill=11,
		pk_defence=12,
		pk_killed=13,
		pk_weapon=14,
		pk_lev50=15,
		need_xuefu=16,
		need_hudun=17,
		bag_full=18,
		bag_full5=19,
		reborn_needlev=20,
		reborn_needitem=21,
		need_lev=22,
		need_job=23,
		need_gold=24,
		need_bindmoney=25,
		neeed_money=26,
		need_bindgold=27,
		add_def=28,
		add_satk=29,
		addbuf_zd=30,
		addbuf_sh=31,
		sbk_start=32,
		sbk_zhanlin=33,
		sbk_tishi=34,
		sbk_finish=35,
		map_change=36,
		safe_leave=37,
		safe_enter=38,
	}

	export enum BroadCastPos{
		/**
		* gm公告
		**/
		GM=0,
		/**
		* 主界面中央
		**/
		Middle=1,
		/**
		* 提示位置
		**/
		System=2,
		/**
		* 聊天窗口
		**/
		Chat=3,
		/**
		* 收益栏
		**/
		Earning=4,
		/**
		* 弹窗
		**/
		Alert=5,
	}

	export enum ABC{
		无此数据=0,
	}

	export enum BBB{
		无此数据=0,
	}


}
