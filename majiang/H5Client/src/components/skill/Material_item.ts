class Material_item extends eui.ItemRenderer{
	public icon:eui.Image;
	public way:UI_ConnectWord;
	private static _height:number;
	public constructor() {
		super();
		this.skinName = "Material_item_skin"
		Material_item._height = this.height;
	}
	protected dataChanged():void{
		this.icon.source = this.data.icon;
		this.way.myText = this.data.itemWay;
		if(this.data.width){
			this.width = this.data.width;
		}
	}
	public static get m_height():number{
		return Material_item._height;
	}
}