class CJ_assembly_item extends eui.ItemRenderer{
	public item:CommonItem;
	public equipName:eui.Label;
	public rewardLabel:eui.Label;
	public assemblyBtn:eui.Button;
	public constructor() {
		super();
		this.skinName = "CJ_assembly_item_skin";
		this.assemblyBtn.label = "分解";
	}
	protected dataChanged():void{
		this.item.bgBox = this.data.equipBoxSource;
		this.item.iName = this.data.level;
		this.item.img = this.data.equipSource;
		this.equipName.text = this.data.itemName;
		this.rewardLabel = this.data.orangeResolve;
		this.rewardLabel.textColor = this.data.rewardColor;
	}
}