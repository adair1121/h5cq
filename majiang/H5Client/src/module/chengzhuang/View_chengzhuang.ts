class View_chengzhuang extends Base_view{

	public returnBtn:eui.Image;
	public searchBtn:BagBtn;
	public CJBtn:BagBtn;
	public CQBtn:BagBtn;
	public CkBtn:BagBtn;
	public headCom:Role_headCom;
	public tabGroup:eui.Group;
	public bgSource:eui.Image;
	

	private curBtn:BagBtn;
	private sourceArr:any[] = [];
	private curModule:Module_chengzhuang;
	private curTap:any;
	private curJob:number = 0;
	public constructor() {
		super();
		this.skinName = "View_chengzhuang_skin";
	}
	protected childrenCreated():void{
		this.initialize();
		this.touchEnabled = true;
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		Global.addEventListener(MainNotify.JOBCHAGNE,this.onJobChange,this);
		Global.addEventListener(MainNotify.CJ_ASSEMBLY,this.receiveHandler,this);
		Global.addEventListener(MainNotify.CJ_DISASSEMBLY,this.receiveHandler,this);
		this.headCom.updateHead(DataCenter.roleList,this.skinName);
		this.curTap = new CJ_tab();
		this.curJob = DataCenter.roleList[0].job;
		this.tabGroup.addChild(this.curTap);
		this.curTap.refreshCJEquip(this.curJob);
		this.curBtn = this.CJBtn;
		this.CJBtn.setAttr({currentState:"down"});
	}
	public refreshHeadCom():void{
		this.headCom.updateHead(DataCenter.roleList,this.skinName);
	}
	/**重新计算合成后的橙装数据 */
	public resetCJEquipData(equipItem:any):void{
		if(this.curTap instanceof CJ_tab){
			this.curTap.refreshCJEquip(this.curJob);
		}
	}
	/**更新分解橙装数据 */
	public refreshCJData():void{
		if(this.curTap instanceof CJ_tab){
			this.curTap.refreshCJData();
		}
	}
	private initialize():void{
		this.curModule = this.module as Module_chengzhuang;
		// this.curRoleBtn["roleIcon"].source="head_0_0_png";
		//===========================
		this.searchBtn.setAttr({text:"寻宝",currentState:"up"});
		this.CJBtn.setAttr({text:"橙装",currentState:"up"});
		this.CQBtn.setAttr({text:"传奇",currentState:"up"});
		this.CkBtn.setAttr({text:"仓库",currentState:"up"});
		this.curBtn = this.searchBtn;
	}
	private receiveHandler(evt:lcp.ChangeEvent):void{
		switch(evt.type){
			case MainNotify.CJ_ASSEMBLY:
				var obj:any = {};
				obj.itemId = evt.c_data.itemId;
				obj.job = this.curJob;
				obj.equipPos = evt.c_data.equipPos;
				this.curModule.assemblyEquip(obj);
				break;
			case MainNotify.CJ_DISASSEMBLY:
				this.curModule.disAssemblyEqip(evt.c_data);
				break;
		}
	}
	private onTouchTap(evt:egret.TouchEvent):void{
		switch(evt.target){
			case this.returnBtn:
				//点击返回
				this.curModule.removeView(1);
				break;
			case this.searchBtn.button:
				break;
			case this.CJBtn.button:
				// this.changeTap(this.CJBtn,WingTab);
				this.bgSource.source = "wing_equip_bg_png";
				break;
			case this.CQBtn.button:
				break;
			case this.CkBtn.button:
				break;
			default :
				break;
		}
	}
	/**tab切换 */
	private changeTap(curBtn:BagBtn,Tab:any){
		this.curBtn.setAttr({currentState:"up"});
		this.curBtn = curBtn;
		curBtn.setAttr({currentState:"down"});
		this.curTap.remove();
		this.curTap.parent.removeChild(this.curTap);
		this.curTap = new Tab(Module_roleInfo.type);
		this.tabGroup.addChild(this.curTap);
	}
	private onJobChange(evt:lcp.ChangeEvent):void{
		if(evt.c_data.insKey === this.skinName){
			this.curJob = evt.c_data.job;
			if(this.curTap instanceof CJ_tab){
				this.curTap.refreshCJEquip(this.curJob);
			}
		}
		
	}
	public removeEvent():void{
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		Global.removeEventListener(MainNotify.CJ_ASSEMBLY,this.receiveHandler,this);
		Global.removeEventListener(MainNotify.JOBCHAGNE,this.onJobChange,this);
		if(this.curTap && this.curTap.parent && this.curTap.parent.contains(this.curTap)){
			this.curTap.remove();
			this.curTap.parent.removeChild(this.curTap);
		}
	}

}