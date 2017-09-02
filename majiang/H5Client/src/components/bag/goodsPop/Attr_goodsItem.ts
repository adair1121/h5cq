class Attr_goodsItem extends eui.ItemRenderer{
	public descItem:eui.Label;
	public static m_height:number;
	public constructor() {
		super();
		this.skinName = "Attr_goodsItem_skin";
	}
	protected dataChanged():void{
		this.descItem.textFlow = (new egret.HtmlTextParser).parser(this.data.desc);
		this.height = this.descItem.height + 12;
		Attr_goodsItem.m_height = this.height;
	}
}