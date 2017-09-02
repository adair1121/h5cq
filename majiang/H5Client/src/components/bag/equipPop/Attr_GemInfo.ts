class Attr_GemInfo extends eui.ItemRenderer{
	public gem:eui.Image;
	public attr:eui.Label;
	private static _h:number
	public constructor() {
		super();
		this.skinName = "Attr_GemInfo_skin";
	}
	protected dataChanged():void{
        this.attr.text = this.data.attrValue;
		this.gem.source = this.data.gemSource;
        Attr_GemInfo._h = this.height;
    }
	public static getHeight():number{
        return Attr_GemInfo._h;
    }
}