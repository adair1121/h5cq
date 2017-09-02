class MainUI_title extends eui.Component{

	public roleName:eui.Label;
	public money:eui.Label;
	public gold:eui.Label;
	public constructor() {
		super();
		this.skinName = "MainUI_title_skin";
	}
	public refreshMoneyNum(value:number):void{
		if(value > 100000){
			var num:string = (value/100000).toFixed(1);
			var arr:string[] = num.split(".");
			var num2:number = parseInt(arr[1]);
			arr[1] = num2?num2+"":"";
			var num3:string = num2?arr.join("."):arr[0];
			this.money.text = num3+"万";
		}else{
			this.money.text = value+"";
		}
	}
	public refreshUname(value:string):void{
		this.roleName.text = value;
	}
	public refreshGoldNum(value:number):void{
		if(value > 100000){
			var num:string = (value/100000).toFixed(1);
			var arr:string[] = num.split(".");
			var num2:number = parseInt(arr[1]);
			arr[1] = num2?num2+"":"";
			var num3:string = num2?arr.join("."):arr[0];
			this.gold.text = num3+"万";
		}else{
			this.gold.text = value+"";
		}
	}
}