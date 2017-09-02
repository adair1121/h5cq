class fuben_material_item extends eui.ItemRenderer{
	public count:eui.Label;
	public cost:eui.Label;
	public challengeBtn:eui.Label;
	public constructor() {
		super();
		this.skinName = "fuben_material_item_skin";
	}
	protected dataChanged():void{
		this.count.text = this.data.count + "";
		this.cost.text = this.data.cost + "";
	}
	public set s_count(count:number){
		this.count.text = this.data.count + "";
	}
	public set s_cost(money:number){
		this.cost.text = this.data.cost + "";
	}
}