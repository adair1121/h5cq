class PlayerBaseInfoVo {
	public constructor() {
	}
	/**
	 * 名字
	 */
	public name:string;
	/**
	 * 主职业
	 */
	public firstJob:number;
	/**
	 * 经验值
	 */
	public exp:number;
	/**
	 * 魔法池
	 */
	public MPPool:number;
	/**
	 * 血量池
	 */
	public HPPool:number;
	/**
	 * PK状态
	 */
	public PkFlag:number;
	/**
	 * 转生
	 */
	public reborn:number;
	/**
	 * 背包数量
	 */
	public bagCount:number;
	/**
	 * 金钱
	 */
	public gold:number;
	/**
	 * 等级
	 */
	public lvl:number;
	/**
	 * 元宝
	 */
	public ingots:number=0;
	/**
	 * vip等级
	 */
	public vip:number=0;
}