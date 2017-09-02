class MapConfigVO{
	public constructor() {
	}
	/**
		* 编号ID
		*/
		public ID:number;
		/**
		* 副本名称
		*/
		public name:string;
		/**
		* 副本组
		*/
		public group:string;
		/**
		* 通关后激活下个任务
		*/
		public nexttask:string;
		/**
		* 副本等级
		*/
		public lev:number;
		/**
		* 通关后激活组
		*/
		public activeGroup:number;
		/**
		* 每日战斗次数
		*/
		public maxLex:number;
		/**
		* 携带任务
		*/
		public needTask:string;
		/**
		* 消耗道具
		*/
		public needitem:string;
		/**
		* 是否有帮派
		*/
		public needGuild:boolean;
		/**
		* 需要组队
		*/
		public needGroup:boolean;
		/**
		* 地图个数
		*/
		public count:number;
		/**
		* 脚本
		*/
		public script:string;
		/**
		* 地图怪物
		*/
		public mobs:string[];
		/**
		* 首次通关奖励
		*/
		public bonusitems1:string[];
		/**
		* 再次通关随机奖励
		*/
		public bonusitems2:string[];
		/**
		* 通关银两
		*/
		public  bonusgold:number;
		/**
		* 奖励经验
		*/
		public bonusexp:number;
}