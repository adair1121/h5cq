class Secret_book extends Base_view{
	public scroller:eui.Scroller;
	public itemList:eui.List;
	public bookItem:CommonItem;
	public bookName:eui.Label;
	public bookDesc:eui.Label;
	public bookScore:eui.Label;
	public moduleLink:eui.Label;
	public returnBtn:eui.Image;
	public startBtn:BagBtn;
	public getWayLinkBtn:eui.Label;
	public closeBtn:BagBtn;

	private arrayCollection:eui.ArrayCollection;
	private watcher:eui.Watcher;
	private sourceArr:any[];

	public testName:string[];
	private materialFind:Material_find
	public constructor() {
		super();
		this.skinName = "Secret_book_skin";
	}
	protected childrenCreated():void{
		this.touchEnabled = true;
		this.materialFind = new Material_find();
		this.startBtn.setAttr({text:"学习"});
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		this.arrayCollection = new eui.ArrayCollection();
		this.itemList.dataProvider = this.arrayCollection;
		this.itemList.itemRenderer = CommonItem;
		this.scroller.viewport = this.itemList;
		this.itemList.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this);
		this.moduleLink.textFlow = (new egret.HtmlTextParser).parser('<font color="#9BF707" size="14" fontFamily="SimHei"><u>通过王者争霸玩法获得</u></font>')
		this.getWayLinkBtn.textFlow = (new egret.HtmlTextParser).parser('<font color="#9BF707" size="16" fontFamily="SimHei"><u>获得途径</u></font>')
		//测试
		
		this.testName = ["中级健体","中级强力","中级防御","中级暴击","中级免伤","中级必杀","中级穿透","中级反伤","中级偷袭","中级神佑"
						,"中级死咒","中级再生","高级健体","高级强力","高级防御","高级暴击","高级免伤","高级必杀","高级穿透","高级反伤"
						,"高级偷袭","高级神佑","高级死咒","高级再生"];
		//
		eui.Binding.bindHandler(DataCenter,["secretBook"],this.onBookChange,this);
	}
	private onBookChange(value:any):void{
		if(value){
			this.selectInfo(value)
		}
	}
	private onTouchTap(evt:egret.TouchEvent):void{
		switch(evt.target){
			case this.returnBtn:
			case this.closeBtn:
				this.closeView();
				break;
			case this.moduleLink:
			case this.getWayLinkBtn:
				//获得途径
				this.openMaterialFind();
				break;
			case this.startBtn.button:
				//学习秘籍
				break;
			
			default:
				break;
		}
	}
	/**打开材料获取界面 */
	private openMaterialFind():void{
		this.closeView();
		var layer:eui.Component = ViewController.getInstance().getContainer().layer_popup;
		PopUpManager.addPopUp(this.materialFind,true,this.materialFind.skinName,layer,0);
	}
	private onItemTap(evt:eui.ItemTapEvent):void{
		this.setDesc(evt.item);
	}	
	private setDesc(descObj:any):void{
		this.bookScore.text = descObj.score;
		this.bookName.text = descObj.itemName;
		this.bookName.textColor = descObj.color;
		this.bookDesc.text = descObj.desc;
		this.bookDesc.textColor = 0xefbf00;
		this.bookItem.bgBox = descObj.boxS;
		this.bookItem.img = descObj.imgSource;
	}
	private closeView():void{
		PopUpManager.removePopUp(this.skinName,0);
	}
	private selectInfo(idArr:any):void{
		this.sourceArr = [];
		for(var i:number = 0;i<idArr.length;i++){
			var bgd:any = GlobalFunc.setBgData(idArr[i]);
			var obj:any = {
				itemName:this.testName[i],
				imgSource:"",
				boxS:bgd.boxS,
				quality:idArr[i],
				score:24000,
				desc:"这只是一个测试~~~ @@"+Math.random()*999,
				color:bgd.color
			};
			// var template = temple.TempleManager.select(idArr[i]);
			this.sourceArr.push(obj);
		}
		this.setDesc(this.sourceArr[0]);
		this.arrayCollection.source = this.sourceArr;		
	}
	public set state(value:string){
		this.skin.currentState = value;
	}
	public initScroller():void{
		this.scroller.stopAnimation();
		this.scroller.validateNow();
		this.scroller.viewport.scrollV = 0;
	}
}

