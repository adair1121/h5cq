class Pop_goodsInfo extends eui.Component{

	public itemName:eui.Label;
	public goodsNum:eui.Label;
	public level:eui.Label;
	public attrGroup:eui.DataGroup;
	public goodsBoxSource:eui.Image;
	public goodsSource:eui.Image;

	private sourceArr:eui.ArrayCollection;
	private qualityColor:any;
	private hWatcher:eui.Watcher;
	public constructor() {
		super();
		this.skinName = "Pop_goodsInfo_skin";
		this.qualityColor = DataCenter.bag.qualityColor;
		this.sourceArr = new eui.ArrayCollection();
		this.attrGroup.dataProvider = this.sourceArr;
	}
	public setGoodsPopInfo(obj:any):void{
		this.goodsBoxSource.source = GlobalFunc.setBgData(obj.quality).boxS;
		this.goodsSource.source = obj.equipSource;
		this.itemName.text = obj.itemName;
		this.itemName.textColor = this.qualityColor[parseInt(obj.quality)];
		this.goodsNum.text = obj.num;
		this.level.text = obj.level;
		if(!obj.skinType && !obj.canUse){
			//只是展示
			this.attrGroup.itemRenderer = Attr_goodsItem;
			this.sourceArr.source = obj.itemDesc;
			this.hWatcher = eui.Binding.bindHandler(Attr_goodsItem,["m_height"],this.itemHeightChange,this);
		}else{
			//物品可使用
			Attr_goodsUse.setData({num:obj.num,templateId:obj.TempleID,callBackFunc:this.callBackFunc,arg:this});
			this.attrGroup.itemRenderer = Attr_goodsUse;
			this.sourceArr.source = obj.itemDesc;
			this.hWatcher = eui.Binding.bindHandler(Attr_goodsUse,["m_height"],this.itemHeightChange,this);
		}
	}
	private callBackFunc(data:any):void{
		PopUpManager.removePopUp(this.skinName,0);
		Global.dispatchEvent(MainNotify.USE_GOODS,{useCount:data.num,templateId:data.templateId});
	}
	private itemHeightChange(value:number):void{
		if(value){
			this.attrGroup.height = value;
			this.height = 150 + this.attrGroup.height;
			this.validateSize();
			this.attrGroup.validateSize();
		}
	}
	public initData():void{
		if(this.hWatcher){
			this.hWatcher.unwatch();
		}
		this.goodsSource.source = "";
		this.goodsBoxSource.source = "";
	}
}