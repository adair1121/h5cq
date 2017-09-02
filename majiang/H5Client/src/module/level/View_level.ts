class View_level extends Base_view{
	public expLab:eui.Label;
	public moneyLab:eui.Label;
	public makiLab:eui.Label;
	public zhenqiGroup:eui.Group;
	public checkRank:UI_ConnectWord;
	public rankList:eui.List;
	public bossProgress:eui.ProgressBar;
	public bossGroup:eui.Group;
	public dropList:eui.List;
	public challengeBtn:eui.Image;
	public challengeBtnGroup:eui.Group;
	public returnBtn:eui.Image;
	public bossName:eui.Label;
	public prompt:eui.Label;
	private curModule:Module_level;
	private bossMc:MovieClip;
	private arrayCollect:eui.ArrayCollection;
	private rankCollect:eui.ArrayCollection;
	public constructor() {
		super();
		this.skinName = "View_level_skin";
	}
	protected childrenCreated():void{
		this.curModule = this.module as Module_level;
		this.bossMc = new MovieClip();
		// this.arrayCollect = new eui.ArrayCollection();
		this.rankCollect = new eui.ArrayCollection();
		// this.dropList.itemRenderer = CommonItem;
		// this.dropList.dataProvider = this.arrayCollect;
		this.rankList.itemRenderer = level_rank_item;
		this.rankList.dataProvider = this.rankCollect;
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		// this.dropList.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this);
		this.checkRank.setClickFunction(()=>{
			//打开关卡排行面板
		},this)
	}
	private onTouchTap(evt:egret.TouchEvent):void{
		switch(evt.target){
			case this.returnBtn:
				this.curModule.removeView();
				break;
			case this.challengeBtn:
				//进行挑战相关逻辑操作
				if(DataCenter.curFuBen === data.SenceType.YeWai){
					this.curModule.startChallenge();
				}
				break;
			default:
				break;
		}
	}
	// private onItemTap(evt:eui.ItemTapEvent):void{
		
	// }
	/**设置页面关卡基础数据 */
	public setViewData(dataObj:any):void{
		var expStar:string = "<font color=0x04fe10>"+dataObj.exp+"</font>"+"<font>/小时</font>";
		this.expLab.textFlow = new egret.HtmlTextParser().parser(expStar);
		var moneyStr:string = "<font color=0x04fe10>"+dataObj.money+"</font>"+"<font>/小时</font>";
		this.moneyLab.textFlow = new egret.HtmlTextParser().parser(moneyStr);
		if(dataObj.zhenqi){
			var zhenqiStr:string = "<font color=0x04fe10>"+dataObj.zhenqi+"</font>"+"<font>/小时</font>";
			this.makiLab.textFlow = new egret.HtmlTextParser().parser(zhenqiStr);
			this.zhenqiGroup.visible = true;
		}else{
			this.zhenqiGroup.visible = false;
		}
		var levCount:number = parseInt(DataCenter.challengeNum.split("@@").shift());
		if(levCount === 3){
			this.prompt.visible = false;
			this.challengeBtnGroup.visible = true;
		}else{
			this.prompt.visible = true;
			this.prompt.text = "在击杀"+(3-levCount)+"波怪可挑战";
			this.challengeBtnGroup.visible = false;
		}
		this.bossName.text = dataObj.bossName;
		this.bossProgress.value = dataObj.progressValue;
		// this.arrayCollect.source = dataObj.dropData;
		this.dealWidthBossModule(dataObj.bossPath);
	}
	/**更新关卡面板前三排名数据 */
	public refreshFirstRank(source:any):void{
		this.rankCollect.source = source;
	}
	/**更新boss模型数据 */
	public dealWidthBossModule(path:string):void{
		this.bossMc.loadFile(path,true,-1,null,this);
		this.bossGroup.addChild(this.bossMc);
		this.bossMc.x = (this.bossGroup.width >> 1);
		this.bossMc.y = this.bossGroup.height - 20;
	}
	public removeEvent():void{
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		// this.dropList.removeEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this);
	}
}