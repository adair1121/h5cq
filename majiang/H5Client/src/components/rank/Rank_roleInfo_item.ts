class Rank_roleInfo_item extends eui.ItemRenderer{
	public rankOrder:eui.Label;
	public vipNum:eui.Label;
	public uName:eui.Label;
	public rank_value:eui.Label;
	public uLev:eui.Label;
	public uFightValue:eui.Label;
	public m_stateName:string;
	public constructor() {
		super();
		this.skinName = "Rank_roleInfo_item_skin";
	}
	protected dataChanged():void{
		this.stateName = this.data.state;
		this.vNum = this.data.vipNum;
		this.rankOrder.text = this.data.order +"";
		this.userName = this.data.uName;
		this.rankLabel = this.data.rankLabel;
		this.userLev = this.data.uLev;
		this.userFightValue = this.data.uFightValue;
		this.uLev.x = this.uName.x + this.uName.width + 12;
		
	}
	protected getCurrentState():string{
		return this.stateName;
	}
	public set vNum(value:number){
		this.vipNum.text = value + "";
	}
	public set userName(value:string){
		this.uName.text = value + "";
		this.uLev.x = this.uName.x + this.uName.width + 7;
	}
	public set userLev(value:string){
		this.uLev.text = value;
	}
	public set rankLabel(value:string){
		this.rank_value.text = value;
		this.uFightValue.x = this.rank_value.x + this.rank_value.width + 12;
	}
	public set stateName(value:string){
		this.m_stateName = value;
		this.invalidateState();
	}
	public get stateName():string{
		return this.m_stateName;
	}
	public set userFightValue(value:number){
		if(value > 100000){
			var num:string = (value/100000).toFixed(1);
			var arr:string[] = num.split(".");
			var num2:number = parseInt(arr[1]);
			arr[1] = num2?num2+"":"";
			var num3:string = num2?arr.join("."):arr[0];
			this.uFightValue.text = num3+"万";
		}else{
			this.uFightValue.text = value + "";
		}
	}
}