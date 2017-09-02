class Smelt_selectItem extends eui.ItemRenderer{
	public comonItem:CommonItem;
	public itemName:eui.Label;
	public score:eui.Label;
	public checkBox:eui.CheckBox;
	public attrGroup:eui.Group;
	private attrLabel:eui.Label;
	public constructor() {
		super();
		this.skinName = "Smelt_selectItem_skin";
	}
	protected dataChanged():void{
		this.comonItem.equipBox.source = this.data.boxS;
		this.comonItem.equipImg.source = this.data.imgSource;
		this.comonItem.iName = this.data.lev;
		this.itemName.text = this.data.iName;
		this.checkBox.selected = this.data.selected;
		for(var key in this.data.extra){
			var attrName:string = AttrNameUtil.getInstance().getAttrName(parseInt(key),3) + ":";
			var attrValue:string ="\t\t"+this.data.cattr[key] +"+"+this.data.extra[key];
			if(this.data.extra[key]){
				this.createLabel(attrName+attrValue,0x0FB8FF);
			}
		}
	}
	public set checkSelect(value:boolean){
		this.checkBox.selected = value;
	}
	private createLabel(str:string,color:number =0xffffff):void{
		this.attrLabel = new eui.Label();
		this.attrGroup.addChild(this.attrLabel);
		var htmlText:string = "<font color="+color+" size=16 fontFamily='SimHei'>"+str+"</font>";
		this.attrLabel.textFlow = (new egret.HtmlTextParser).parser(htmlText)
	}
}