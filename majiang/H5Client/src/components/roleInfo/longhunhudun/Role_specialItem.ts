class Role_specialItem extends eui.ItemRenderer{
	public attrTitle:eui.Label;
	public attrNum:eui.Label;
	public constructor() {
		super();
		this.skinName = "Role_specialItem_skin";
	}
	protected dataChanged():void{
		this.attrTitle.text = this.data.attr;
		this.attrNum.text = this.data.value;
		this.attrNum.x = this.attrTitle.x + this.attrTitle.width + 10;
	}
}