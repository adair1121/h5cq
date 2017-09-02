class level_info extends eui.Component{
	public levelName:eui.Label;
	public levelMoney:eui.Label;
	public levelExp:eui.Label;
	private skinState:string;
	public fubenDesc:eui.Label;
	public constructor() {
		super();
		this.skinName = "level_info_skin";
	}
	/**设置关卡信息皮肤状态 */
	public set levInfoState(skinState:string){
		this.skinState = skinState;
		this.invalidateState();
	}
	protected getCurrentState():string{
		return this.skinState;
	}
	/**设置关卡信息名称 */
	public set levName(name:string){
		this.levelName.text = name;
	}
	/**设置获得金钱能信息 */
	public set getMoney(money:number){
		this.levelMoney.text = money + "/小时";
	}
	/**设置获得经验信息 */
	public set getExp(exp:number){
		this.levelExp.text = exp + "/小时";
	}
	/**设置副本奖励信息 */
	public set fDesc(cnt:string){
		this.fubenDesc.text = cnt;
	}
}