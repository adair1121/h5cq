class Secret_replace extends eui.Component{
	public returnBtn:BagBtn;
	public closeBtn:BagBtn;
	public replaceBtn:BagBtn;
	public scroller:eui.Scroller;
	public itemList:eui.List;
	public secretRes:CommonItem;
	public secretGroup:eui.List;
	private arrayCollection:eui.ArrayCollection;
	private secretSource:eui.ArrayCollection;
	private itemArr:any[];
	private sourceArr:any[];
	private testName:string[];
	public constructor() {
		super();
		this.skinName = "Secret_replace_skin";
	}
	protected childrenCreated():void{
		this.replaceBtn.setAttr({text:"置换",size:20});
		this.touchEnabled = true;
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		this.secretGroup.touchEnabled = true;
		this.arrayCollection = new eui.ArrayCollection();
		this.itemList.dataProvider = this.arrayCollection;
		this.itemList.itemRenderer = CommonItem;
		this.scroller.viewport = this.itemList;
		this.secretSource = new eui.ArrayCollection();
		this.secretGroup.dataProvider = this.secretSource;
		this.secretGroup.itemRenderer = CommonItem;
		
		this.itemList.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this);
		this.secretGroup.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onSecretItemTap,this);
		//测试
		this.testName = ["中级强力","高级神佑","中级必杀"];
		this.selectInfo([4,5,4]);
		this.initSecretBox();
	}
	private initSecretBox():void{
		this.itemArr = [];
		for(var i:number= 0;i<3;i++ ){
			var bgd:any = GlobalFunc.setBgData(1);
			var obj:any = {
				isEmpty:1,
				imgSource:"",
				boxS:bgd.boxS,
				index:i
			}
			this.itemArr.push(obj);
		}
		this.refreshSecretList();
	}
	private refreshSecretList():void{
		this.secretSource.source = this.itemArr;
	}
	private selectInfo(idArr:any):void{
		this.sourceArr = [];
		for(var i:number = 0;i<idArr.length;i++){
			var bgd:any = GlobalFunc.setBgData(idArr[i]);
			var obj:any = {
				itemName:this.testName[i],
				imgSource:"",
				boxS:bgd.boxS,
				color:bgd.color
			};
			// var template = temple.TempleManager.select(idArr[i]);
			this.sourceArr.push(obj);
		}
		this.arrayCollection.source = this.sourceArr;		
	}
	private refreshScrollerView(source:any):void{
		this.arrayCollection.source = source;
	}
	private onTouchTap(evt:egret.TouchEvent):void{
		switch(evt.target){
			case this.closeBtn:
			case this.returnBtn:
				this.closeView();
				break;
			case this.replaceBtn:
				//置换
				break;
			default:
				break;
		}
	}
	private closeView():void{
		PopUpManager.removePopUp(this.skinName,0);
	}
	private onItemTap(evt:eui.ItemTapEvent):void{
		var item:any = evt.item;
		for(var i:number = 0;i < 3;i++){
			var obj:any = this.itemArr[i];
			if(obj.isEmpty){
				// obj.imgSource = item.bgS;
				obj.isEmpty = 0;
				this.refreshSecretList();
				break;
			}
		}
	}
	private onSecretItemTap(evt:eui.ItemTapEvent):void{
		var item:any = evt.item;
		if(!item.isEmpty){
			this.itemArr[item.index].isEmpty = 1;
			this.itemArr[item.index].imgSource = "";
			this.refreshSecretList();
		}
	}
}