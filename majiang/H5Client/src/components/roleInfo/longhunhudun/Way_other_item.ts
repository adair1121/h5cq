class Way_other_item extends eui.Component{
	public list:eui.List;
	private arrayCollect:eui.ArrayCollection;
	public title:eui.Label;
	public constructor() {
		super();
		this.skinName = "Way_other_item_skin";
	}
	protected childrenCreated():void{
		this.arrayCollect = new eui.ArrayCollection;
		this.list.itemRenderer = Material_item; 
		this.list.dataProvider = this.arrayCollect;
		this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this);
	}
	public refreshOtherWay(source:any,title:string = "其它途径"):void{
		this.arrayCollect.source = source;
		this.list.height = source.length * Material_item.m_height ;
		this.height =this.list.height + 57;
		this.title.text = title;
	}
	private onItemTap(evt:eui.ItemTapEvent):void{
		var obj:any[] = [{type:TipsEnum.TYPE_WARN,label:"敬请期待"}];
		PopTipsManager.showPopTips(obj);
	}
}