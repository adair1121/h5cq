class Bag_addGrid extends eui.Component{

	public reduceBtn:eui.Image;
	public addBtn:eui.Image;
	public confireBtn:Btn1; 
	public cancleBtn:Btn1;
	public cost:eui.Label;
	public gridNum:eui.Label;
	private curGridNum:number = 5;
	private maxNum:number = 0;
	public constructor() {
		super();
		this.skinName = "Bag_addGrid_skin";
	}

	protected childrenCreated():void{
		this.initialize();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		this.touchEnabled = true;
		var template:data.GlobalDefineTemple = temple.TempleManager.select(DataCenter.maxBoxBuyNum) as data.GlobalDefineTemple;
		this.maxNum = template.argument;
	}
	private initialize():void{
		this.confireBtn.label = "确定";
		this.cancleBtn.label = "取消";
		this.refreshGridNum(this.curGridNum);
	}
	private onTouchTap(evt:egret.TouchEvent):void{
		switch(evt.target){
			case this.cancleBtn.button:
				this.removeView();
				break;
			case this.reduceBtn:
				if(this.curGridNum >5){
					this.curGridNum -= 5;
				}
				this.refreshGridNum(this.curGridNum);
				break;
			case this.addBtn:
				if(this.curGridNum < this.maxNum){
					this.curGridNum += 5;
				}
				this.refreshGridNum(this.curGridNum);
				break;
			case this.confireBtn.button:
				this.sendMsgToServer();
				break;
			default:
				break;
		}
	}
	private removeView():void{
		if(this && this.parent && this.parent.contains(this)){
			this.curGridNum = 5;
			this.refreshGridNum(this.curGridNum);
			PopUpManager.removePopUp(this.skinName,0);
		}
	}
	private refreshGridNum(num:number):void{
		this.gridNum.text = num+"";
		this.cost.text = DataCenter.bagGridRelation[num];
	}
	private sendMsgToServer():void{
		var attr:number[] = DataCenter.playerAttr;
		if(attr[data.PlayerAttr.gold] < this.curGridNum){
			var obj = {
				type:TipsEnum.TYPE_WARN,
				group:[{label:"元宝不足"}]
			}
			PopTipsManager.showPopTips([obj]);
			return;
		}else{
			Global.dispatchEvent(MainNotify.HANDSHAKE_ADDBOXNUM,{num:this.curGridNum});
			//测试使用
			// attr[data.PlayerAttr.gold] -= this.curGridNum;
			this.removeView();
		}
		
	}
}