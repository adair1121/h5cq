class Bag_item extends eui.ItemRenderer{
	public labelDisplay:eui.Label;
	public equipImg:eui.Image;
	public equipIntensify:eui.Label;
	public equipBox:eui.Image;
	public constructor() {
		super();
		this.skinName = "Bag_Item_skin"
	}
	protected dataChanged():void{
		this.labelDisplay.text = this.data.label;
		this.equipImg.source = this.data.equipSource;
		this.equipIntensify.text = this.data.num;
		this.equipBox.source = this.data.equipBoxSource;
	}
}