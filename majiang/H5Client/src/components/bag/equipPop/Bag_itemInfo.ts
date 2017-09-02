class Bag_itemInfo extends eui.Component{
	public itemName:eui.Label;
	public score:eui.Label;
	public level:eui.Label;
	public job:eui.Label;
	public position:eui.Label;
	public attrGroup:eui.DataGroup;
	public commonItem:CommonItem;

	public power:eui.BitmapLabel;

	private qualityColor:any = {};
	private attrCollect:eui.ArrayCollection;
	private sourceWatcher:eui.Watcher;
	private hWatcher:eui.Watcher;
	private len:number;
	public constructor() {
		super();
		this.skinName = "Bag_itemInfo_skin";
		this.qualityColor = DataCenter.bag.qualityColor;
		this.attrCollect = new eui.ArrayCollection();
		this.attrGroup.itemRenderer = Bag_attrItem;
		this.attrGroup.dataProvider = this.attrCollect;
		
	}
	public setData(obj:any):void{
		this.valueArr = [];
		Bag_attrItem._h = "";
		this.job.text = GlobalFunc.getJobWord(obj.job);
		if(obj.equipPos.length){
			this.position.text = GlobalFunc.getPositionWord(obj.equipPos[0]);
		}else{
			this.position.text = GlobalFunc.getPositionWord(obj.equipPos);
		}
		this.score.text = obj.point;
		this.level.text = obj.level;
		this.commonItem.bgBox = GlobalFunc.setBgData(obj.quality).boxS;
		this.commonItem.img = obj.equipSource;
		this.itemName.text = obj.itemName;
		this.power.text = obj.point;
		this.itemName.textColor = this.qualityColor[obj.quality];
		this.len = obj.attrSource.length;
		this.attrCollect.source = obj.attrSource;
		this.hWatcher = eui.Binding.bindHandler(Bag_attrItem,["_h"],this.itemChange,this);
	}
	private valueArr:number[] = [];
	private itemChange(value:string):void{
		if(value){
			var arr:string[] = value.split("@@");
			this.valueArr.push(parseInt[arr[0]])
			if(this.valueArr.length > this.len){
				this.valueArr.shift();
			}
			this.attrGroup.height = this.getSum(this.valueArr);
			this.height = this.attrGroup.height + 160;
		}
	}
	public getSum(array):number{
		var sum  = 0
		for (var i = 0; i < array.length; i++){
			sum += parseInt(array[i]);
		}
		return sum;
	}
	public initData():void{
		this.hWatcher.unwatch();
		this.commonItem.bgBox = "";
		this.commonItem.img = "";
	}
}