class Role_xwExchange_item extends eui.Component{
	public commonBtn:eui.Button;
	public icon:CommonItem;
	public txt_count:eui.Label;
	public txt1:eui.Label;
	public text2:eui.Label;
	public cost:eui.Label;
	private STATE_EXCHANGE:string = "exchangeXw";
	private STATE_BUY:String = "buyXw";
	private type:string;
	public constructor() {
		super();
		this.skinName="Role_xwExchange_item_skin";
	}
	protected childrenCreated():void{
		this.skin.currentState = this.STATE_EXCHANGE;
	}
	public setBtnState(name:string,state:string):void{
		this.commonBtn.label = name;
		this.commonBtn.currentState = state;
	}
	public setItemData(dataObj:any):void{
		this.icon.equipBox.source = GlobalFunc.setBgData(dataObj.quality).boxS;
		this.icon.img = dataObj.imgS;
	}
	public set count(num:number){
		this.txt_count.textFlow = (new egret.HtmlTextParser).parser("<font color=0xe6d8b3>今天还可兑换</font><font color=0x04fe10>"+num+"</font><font color=0xe6d8b3>次</font>")
	}
	public setxw(num:number,color:number){
		this.txt1.textFlow = (new egret.HtmlTextParser).parser("<font color=0xfecc04>增加</font><font color="+color+">"+num+"</font><font color=0xfecc04>修为</font>")
	}
	public set state(value:string){
		this.skin.currentState = value;
	}
	public set item(value:string){
		this.text2.text = value;
	}
	public set icost(value:string){
		this.cost.text = value;
	}
}