class Config {
	public constructor() {
	}

	/**游戏地址 */
	// public static gameHost:string="127.0.0.1";//本机
	// public static gameHost:string="192.168.1.50";//开发
	public static gameHost:string="192.168.1.51";//测试
	public static gamePort:number=5005;

	/**版本号 */
	public static THMVERSION:string = "0.0.1";
	public static RESVERSION:string = "0.0.1";

	/**测试用户 */
	public static username:string="g42";
	public static password:string="greentea";


	/**窗口大小 */
	public static w_width:number=480;
	public static w_height:number=800;

	/**网络连接状态 */
	public static connectState:boolean;
	/**当前游戏宽度 */
	public static curWidth():number{
		return egret.MainContext.instance.stage.stageWidth;
	}
	/**当前游戏高度 */
	public static curHeight():number{
		return egret.MainContext.instance.stage.stageHeight;
	}
	

	/**默认装备资源路径 */
	public static path_default_equip:string ="resource/assets/picicon/images/public/default/equip/"
	/**装备资源路径 */
	public static path_equip:string = "resource/assets/picicon/images/item/equip/";
	/**技能图标资源路径 */
	public static path_skillIcon:string = "resource/assets/picicon/images/skillIcon/";
	/**道具资源路径 */
	public static path_goods:string = "resource/assets/picicon/images/item/goods/";
	/**掉落装备资源 */
	public static path_drop:string = "resource/assets/picicon/images/item/dropIcon/";
	/**人物模型路径（男） */
	public static path_man:string = "resource/assets/picicon/images/roleInfo/cloth/malebody/";
	/**人物模型路径（女） */
	public static path_woman:string = "resource/assets/picicon/images/roleInfo/cloth/femalebody/";
	/**武器模型路径 */
	public static path_weapon:string = "resource/assets/picicon/images/roleInfo/weapon/";
	/**翅膀模型路径 */
	public static path_wing:string = "resource/assets/movie/wing/";
	/**翅膀动态模型内观路径 */
	public static path_wing_in:string = "resource/assets/movie/wing_in/";
	/** 人物动态模型内观路径*/
	public static path_role_in:string = "resource/assets/movie/role_in/"
	/**为期动态资源内观路径 */
	public static path_weapon_in:string = "resource/assets/movie/weapon_in/";
	/**其他资源路径 */
	public static path_public:string = "resource/assets/picicon/images/public/";
	/**boss头像路径 */
	public static path_monHead:string = "resource/assets/picicon/images/monsterHead/"
	/**外观mc路径 */
	public static path_roleMc:string="resource/assets/movie/role/";
	public static path_weaponMc:string="resource/assets/movie/weapon/";
	public static path_monMc:string="resource/assets/movie/monster/";
	public static path_effectMc:string="resource/assets/movie/effect/";
	public static path_shadowMc:string="resource/assets/movie/shadow/yzm";
	public static path_wingMc:string="resource/assets/movie/wing/";
	public static path_buffMc:string="resource/assets/movie/buff/";

	
	
	

	/**时间戳 */
	public static time_stamps:number=0;
	public static curPanel:egret.DisplayObjectContainer;

	public static curStage():egret.Stage{
		return egret.MainContext.instance.stage;
	}
	/**人物在地图上的id */
	public static personId:string;

}