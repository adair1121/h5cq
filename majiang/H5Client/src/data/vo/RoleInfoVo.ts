class RoleInfoVo {
	public constructor() {
	}
	/**
	 * 表中ID
	 */
	public uid:string;
	/**
	 * 地图中的单元ID
	 */
	public mapid:string;
	/**
	 * 职业
	 */
	public job:number=0;
	/**
	 * 性别
	 */
	public sex:number=0;
	/**
	 * 朝向
	 */
	public look:number=0;
	/**
	 * 动作
	 */
	public action:string;
	/**
	 * 衣服ID(内观)
	 */
	public clothId_in:string;
	/**
	 * 衣服ID(外观)
	 */
	public clothId_out:string;
	/**
	 * 武器ID(内观)
	 */
	public weaponId_in:string;
	/**
	 * 武器ID(外观)
	 */
	public weaponId_out:string;
	/**
	 * 翅膀ID(内观)
	 */
	public wingsId_in:number;
	/**
	 * 翅膀ID(外观)
	 */
	public wingsId_out:number;
	/**
	 * 初始所在行
	 */
	public row:number=0;
	/**
	 * 初始所在列
	 */
	public col:number=0;
	/**
	 * 角色对应装备
	 */
	public skills:proto.S_Skill[];
	/**
	 * 角色对应技能
	 */
	public equips:proto.ItemData[];

}