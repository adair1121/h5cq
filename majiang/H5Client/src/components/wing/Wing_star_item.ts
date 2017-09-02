class Wing_star_item extends eui.ItemRenderer{
	public star:eui.Image;
	public constructor() {
		super();
		this.skinName = "Wing_star_item_skin";
	}
	protected dataChanged():void{
		this.star.source = this.data.img;
	}
}