class Store_item extends eui.ItemRenderer{
	public buyBtn:eui.Button;
	public commonItem:CommonItem;
	public itemName:eui.Label;
	public itemCost:eui.Label;
	// public itemLev:eui.Label;
	public scoreGroup:eui.Group;
	public score:eui.Label;
	public type:eui.Image;
	public disImg:eui.Image;
	public jifenIcon:eui.Image;
	public jifenCost:eui.Label;
	private _state:string;
	public constructor() {
		super();
		this.skinName = "Store_item_skin";
	}
	protected childrenCreated():void{
		this.commonItem.rightLabelColor = 0xffffff;
		this.buyBtn.label = "购买";
	}
	protected dataChanged():void{
		if(!this.data.scoreUp){
			this.scoreGroup.visible = false;
		}else{
			this.scoreGroup.visible = true;
			this.score.text = this.data.scoreUp + ""
		}
		var len:number = this.data.moneyType.length;
		if(len > 1){
			this._state = "jifen";
			this.invalidateState();
			for(var i:number = 0;i<len;i++){
				if(this.data.moneyType[i] === data.PlayerAttr.gold){
					this.type.source = this.createCostIcon(this.data.moneyType[i]);
					this.itemCost.text = this.createCostLabel(this.data.cost[i]);
				}else{
					this.jifenIcon.source = this.createCostIcon(this.data.moneyType[i]);
					this.jifenCost.text = this.createCostLabel(this.data.cost[i]);
				}
			}
		}else{
			this._state = "normal";
			this.invalidateState();
			this.itemCost.text = this.createCostLabel(this.data.cost[0]);
			this.type.source = this.createCostIcon(this.data.moneyType[0]);
		}
		this.disImg.source = this.data.disCount?this.data.disCount+"_png":"";
		this.commonItem.img = this.data.imgS;
		this.commonItem.bgBox = GlobalFunc.setBgData(this.data.quality).boxS;
		this.commonItem.rightText = this.data.num?this.data.num:"";
		this.itemName.text = this.data.itemName;
		this.itemName.textColor = DataCenter.bag.qualityColor[this.data.quality];
		this.commonItem.rightText = (this.data.goodsNum && this.data.goodsNum != 1)?this.data.goodsNum + "":"";
		// this.itemLev.x = this.itemName.x + this.itemName.width + 10;
		// this.itemLev.text = this.data.desc;
	}
	private createCostLabel(cost:number):string{
		if(cost > 100000){
			var num:string = (cost/100000).toFixed(1);
			var arr:string[] = num.split(".");
			var num2:number = parseInt(arr[1]);
			arr[1] = num2?num2+"":"";
			var num3:string = num2?arr.join("."):arr[0];
			return num3+"万";
		}else{
			return cost+"";
		}
	}
	private createCostIcon(type:number):string{
		var str:string = ""
		switch(type){
			case data.PlayerAttr.money:
				str = "title_jinbi_png";
				break;
			case data.PlayerAttr.gold:
				str = "title_yuanbao_png";
				break;
			case data.PlayerAttr.shopScore:
				str = "title_yuanbao_png";
				break;
		}
		return str;
	}
	protected getCurrentState():string{
		return this._state;
	}
}