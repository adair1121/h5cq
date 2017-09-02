class View_roleSelect extends Base_view{
	public roleList:eui.List;
	public roleBtnMan:BagBtn;
	public roleBtnWoman:BagBtn;
	public createRoleBtn:BagBtn;
	public returnBtn:eui.Image;
	private sex:number = 0;
	private job:number = 0;
	private sourceCollect:eui.ArrayCollection;
	private source:any;
	private ifLocked:boolean = false;
	private curModule:Module_roleSelect;
	public constructor() {
		super();
		this.skinName = "Role_select_skin";
		this.source = {1:{jobName:"战士",roleImg:"",job:1,ifLocked:0},
					   2:{jobName:"法师",roleImg:"",job:2,ifLocked:0},
					   3:{jobName:"道士",job:3,roleImg:"",ifLocked:0}};
	}
	protected childrenCreated():void{
		this.roleBtnMan.setAttr({currentState:"down",text:"男"});
		this.roleBtnWoman.setAttr({currentState:"up",text:"女"});
		this.createRoleBtn.setAttr({text:"开启"});
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		this.sourceCollect = new eui.ArrayCollection();
		this.roleList.itemRenderer = Role_select_item;
		this.roleList.dataProvider = this.sourceCollect;
		this.roleList.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this);
		this.roleList.selectedIndex = 0;
		this.curModule = this.module as Module_roleSelect;
		this.sex = 1
	}
	/**设置人物是否已经开启 */
	public setData(lockObj:any):void{
		this.resetData();
		for(var key in lockObj){
			this.source[key].ifLocked = 1;
			this.ifLocked = true;
			this.createRoleBtn.visible = false;
		}
		this.sourceCollect.source = this.createSource();
		this.roleList.selectedIndex = 0;
	}
	/**重置开启数据 */
	private resetData():void{
		for(var key in this.source){
			this.source[key].ifLocked = 0;
		}
	}
	/**创建列表数据 */
	private createSource():any[]{
		var sourceArr:any[] = []
		for(var key in this.source){
			sourceArr.push(this.source[key]);
		}
		return sourceArr;
	}
	private onItemTap(evt:eui.ItemTapEvent):void{
		this.roleList.selectedIndex = evt.itemIndex;
		this.ifLocked = evt.item.ifLocked;
		if(this.ifLocked){
			this.createRoleBtn.visible = false;
		}else{
			this.createRoleBtn.visible = true;
		}
		this.job = evt.item.job;
	}
	private onTouchTap(evt:egret.TouchEvent):void{
		switch(evt.target){
			case this.roleBtnMan.button:
				this.roleBtnMan.setAttr({currentState:"down"});
				this.roleBtnWoman.setAttr({currentState:"up"});
				this.sex = 1;
				break;
			case this.roleBtnWoman.button:
				this.roleBtnMan.setAttr({currentState:"up"});
				this.roleBtnWoman.setAttr({currentState:"down"});
				this.sex = 2;
				break;
			case this.createRoleBtn.button:
				var level:number = DataCenter.playerAttr[data.PlayerAttr.levID];
				var vipNum:number = DataCenter.playerAttr[data.PlayerAttr.VIP];
				if(DataCenter.roleList.length <= 1){
					if(level < 80 || vipNum >= 1){
						var obj:any = {type:TipsEnum.TYPE_WARN,label:"不满足激活条件"}
						PopTipsManager.showPopTips([obj]);
						return;
					}
				}else if(DataCenter.roleList.length <= 2){
					var reborn:number = DataCenter.playerAttr[data.PlayerAttr.rebornID];
					if(reborn < 4 || vipNum >= 4){
						var obj:any = {type:TipsEnum.TYPE_WARN,label:"不满足激活条件"}
						PopTipsManager.showPopTips([obj]);
						return;
					}
				}
				var obj:any = {sex:this.sex,job:this.job};
				this.curModule.createRole(obj)
				break;
			case this.returnBtn:
				this.curModule.removeView();
				break;
		}
	}
	public removeEvent():void{
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		this.roleList.removeEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this);
	}
}