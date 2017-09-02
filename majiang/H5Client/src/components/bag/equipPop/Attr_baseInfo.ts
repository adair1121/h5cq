class Attr_baseInfo extends eui.ItemRenderer{
	public attr:eui.Label;
    public attrValue:eui.Label;
    private static _h:number
	public constructor() {
		super();
       
		this.skinName = "Attr_baseInfo_skin";
	}
    protected dataChanged():void{
        this.attrValue.text = this.data.attrValue;
        Attr_baseInfo._h = this.height;
    }

    public static getHeight():number{
        return Attr_baseInfo._h
    }
}
