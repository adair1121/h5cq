class level_rank_item extends eui.ItemRenderer{
	public itemName:eui.Label;
	public itemLev:eui.Label;
	public rankLev:eui.Label;
	public constructor() {
		super();
		this.skinName = "level_rank_item_skin";
	}
	protected dataChanged():void{
		this.rankLev.text = this.data.rankLev;
		this.itemName.text = this.data.itemName;
		this.itemLev.text = this.data.itemLev;
	}
}