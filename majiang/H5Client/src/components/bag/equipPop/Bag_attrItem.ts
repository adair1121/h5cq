class Bag_attrItem extends eui.ItemRenderer{
	public attrTitle:eui.Label;
	public itemGroup:eui.DataGroup;
	private arrayCollect:eui.ArrayCollection;
	public static _h:string;
	public constructor() {
		super();
		this.skinName = "Bag_attrItem_skin";
		this.arrayCollect = new eui.ArrayCollection();
		this.itemGroup.dataProvider = this.arrayCollect;
	}
	protected dataChanged():void{
		this.attrTitle.text = this.data.title;
		if(this.data.renderType === 1){
			this.itemGroup.itemRenderer = Attr_baseInfo;
		}else{
			this.itemGroup.itemRenderer = Attr_GemInfo;
		}
		this.arrayCollect.source =this.data.baseAttrSource;
		this.itemGroup.height = this.data.baseAttrSource.length*Attr_baseInfo.getHeight();
		this.height = (this.itemGroup.height + 20);
		Bag_attrItem._h =  (this.itemGroup.height + 20)+"@@" + Math.random();
	}
}