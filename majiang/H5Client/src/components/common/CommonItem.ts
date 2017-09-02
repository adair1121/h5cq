class CommonItem extends eui.ItemRenderer{

	public equipImg:eui.Image;
	public rightLabel:eui.Label;
	public leftLabel:eui.Label;
	public equipBox:eui.Image;
	private m_index:number;
	private m_isLock:boolean;
	public itemName:eui.Label;
	public constructor() {
		super();
		this.skinName = "ItemSkin"
	}
	protected dataChanged():void{
		this.equipImg.source = this.data.imgSource;
		if(this.data.rightValue){
			this.rightLabel.text = this.data.rightValue;
		}
		if(this.data.leftValue){
			this.leftLabel.text = this.data.leftValue;
		}
		this.itemName.text = this.data.itemName;
		this.itemName.textColor = this.data.color;
		this.equipBox.source = this.data.boxS
	}
	public set bgBox(value:string){
		this.equipBox.source = value;
	}
	public set img(value:string){
		this.equipImg.source = value;
	}
	public set leftText(value:string){
		this.leftLabel.text = value;
	}
	public set rightText(value:string){
		this.rightLabel.text = value;
	}
	public set index(value:number){
		this.m_index = value;
	}
	public set isLock(value:boolean){
		this.m_isLock = value;
	}
	public set iName(value:string){
		this.itemName.text = value;
	}
	public set iNameColor(value:number){
		this.itemName.textColor = value;
	}
	public set rightLabelSize(value:number){
		this.rightLabel.size = value;
	}
	public set rightLabelColor(value:number){
		this.rightLabel.textColor = value;
	}
	
	public get isLock():boolean{
		return this.m_isLock;
	}
	public get index():number{
		return this.m_index;
	}
}