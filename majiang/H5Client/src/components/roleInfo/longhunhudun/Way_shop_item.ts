class Way_shop_item extends eui.Component{
	public addCom:AddGoodsNumCom;
	public commonItem:CommonItem;
	public itemName:eui.Label;
	public singleCostLabel:eui.Label;
	public allCostLabel:eui.Label;
	public static m_singleCost:number = 100;
	public static allCostNum:number;
	public static costValue:number = 1;
	private watcher:eui.Watcher;
	private m_maxNum:number = 0;
	public constructor() {
		super();
		this.skinName = "Way_shop_item_skin";
	}
	protected childrenCreated():void{
		Global.addEventListener(MainNotify.COSTCHANGE,this.costChange,this);
		this.watcher = eui.Binding.bindHandler(Way_shop_item,["allCostNum"],this.allCostChange,this);
	}
	private allCostChange(value:number):void{
		if(value){
			this.allCostLabel.text = Way_shop_item.allCostNum + "";
			
		}
	}
	private costChange(evt:lcp.ChangeEvent):void{
		Way_shop_item.allCostNum = evt.c_data.curValue*Way_shop_item.m_singleCost;
		Way_shop_item.costValue = evt.c_data.curValue;
	}
	public setItemData(dataObj:any):void{
		this.commonItem.equipBox.source = GlobalFunc.setBgData(dataObj.quality).boxS;
		this.commonItem.equipImg.source = dataObj.imgS;
		this.itemName.text = dataObj.itemName;
		// this.singleCost = dataObj.singleCost;
		Way_shop_item.allCostNum = this.singleCost;
		this.itemName.textColor = DataCenter.bag.qualityColor[dataObj.quality];
	}
	public set relation(value:number){
		this.addCom.minValue = value
	}
	public set singleCost(value:number){
		this.singleCostLabel.text = value + "";
		Way_shop_item.m_singleCost = value;
	}
	public set maxNum(value:number){
		this.addCom.maxValue = value;
	}
	public get singleCost():number{
		return Way_shop_item.m_singleCost;
	}
	public get costNum():number{
		return this.addCom.costNum;
	}
	public set costNum(value:number){
		this.addCom.costNum = value;
	}
	public set allCost(value:number){
		Way_shop_item.allCostNum = value;
	}
}