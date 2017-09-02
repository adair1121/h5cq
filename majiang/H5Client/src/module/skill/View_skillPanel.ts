class View_skillPanel extends Base_view{
	public returnBtn:eui.Image;
	public closeBtn:eui.Image;
	public skillList:eui.List;
	public upGradeBtn:Btn1;
	public allUpGradeBtn:Btn1;
	public skillBtn:BagBtn;
	public secretBtn:BagBtn;
	public tupoBtn:BagBtn;
	public skillSource:eui.ArrayCollection;
	private curModule:Module_skillPanel;
	public roleHeadCom:Role_headCom;
	public singleCost:eui.Label;
	public allCost:eui.Label;
	public secretBookBtn:eui.Image;
	public startBtn:BagBtn;
	public secretReplaceLink:eui.Label;
	public secretGroup:eui.Group;
	
	private vLayout:eui.VerticalLayout;
	private curItem:any;
	private combatValueArr:number[];
	
	public isInitSingle:boolean;
	public isInitAll:boolean;
	private secretPanel:Secret_book;
	private secretReplace:Secret_replace;
	private curBtn:BagBtn;
	private STATE_SECRET_START:string = "secretStart";
	private STATE_SECRET_BOOLLIST:string = "secretBookList";
	private STATE_SECRET_PANEL:string = "secretPanel";
	private STATE_SKILL_PANEL:string = "skillPanel";
	private STATE_TOPO_PANEL:string = "topoPanel";
	private layer:eui.Component;
	private attr:number[];
	public constructor() {
		super();
		this.skinName = "View_skill_skin";
	}
	protected childrenCreated():void{
		this.initialize();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		this.touchEnabled = true;
		this.skillList.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this);
		Global.addEventListener(MainNotify.JOBCHAGNE,this.onDispatchRes,this);
		this.secretGroup.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onGroupTouch,this,false);
		this.skillList.selectedIndex = 0;
		this.attr = DataCenter.playerAttr;
		this.roleHeadCom.updateHead(DataCenter.roleList,this.skinName);
	}
	private jobChange(evt:lcp.ChangeEvent):void{
		this.curModule.setJob(evt.c_data);
	}
	private initialize():void{
		this.curBtn = this.skillBtn;
		this.layer = ViewController.getInstance().getContainer().layer_popup;
		this.upGradeBtn.label = "升级"
		this.allUpGradeBtn.label = "全部升级"
		this.skillBtn.setAttr({text:"技能",size:20,currentState:"down"});
		this.secretBtn.setAttr({text:"秘籍",size:20,currentState:"up"});
		this.tupoBtn.setAttr({text:"突破",size:20,currentState:"up"});
		this.startBtn.setAttr({text:"学习",size:20});
		this.secretReplaceLink.textFlow = (new egret.HtmlTextParser).parser('<font color="#9BF707" size="14" fontFamily="SimHei"><u>秘籍置换</u></font>')
		this.skillSource = new eui.ArrayCollection();
		this.secretPanel = new Secret_book();
		this.secretReplace = new Secret_replace();
		this.skillList.itemRenderer = RoleSkillItemRender;
		this.skillList.dataProvider = this.skillSource;
		this.curModule = this.module as Module_skillPanel;
		this.vLayout = new eui.VerticalLayout();
		this.vLayout.gap = 2;
		this.skillList.layout = this.vLayout;
		this.isInitSingle = true;
		this.isInitAll = true;
	}
	/**更新技能数据 */
	public refreshSkillSource(value:any):void{
		this.curItem = {};
		this.skillSource.source = value;
		this.curItem = this.skillList.selectedItem;
		this.curItem["index"] = this.skillList.selectedIndex;
		this.singleCost.text = value[this.skillList.selectedIndex].needMongy;
		// if(value[this.skillList.selectedIndex].needMongy > this.attr[data.PlayerAttr.money]){
		// 	this.singleCost.textColor = 0xfc3434;
		// }else{
		// 	this.singleCost.textColor = 0xEDC589;
		// }
		if(!this.isInitSingle){
			this.showGrideTips({},this.skillList.selectedIndex);
		}
		if(!this.isInitAll){
			for(var i = 0;i<value.length;i++){
				if(value[i].count){
					this.showGrideTips(value[i],i);
				}
			}
		}
	}
	/**显示技能提升等级tips */
	private showGrideTips(valueObj,index):void{
		var count = valueObj.count;
		var sy = index*(RoleSkillItemRender.getHeight() + this.vLayout.gap)
		var obj:any = {w:60,h:20}
		obj.x=  this.skillList.x + this.skillList.width - obj.w;
		obj.y =  sy + (RoleSkillItemRender.getHeight() - obj.h);
		if(count){
			obj.text = "+"+count;
		}else{
			obj.text = "+1";
		}
		PopTipsManager.showUpGradeTips(obj,this.skillList,this.showUpGradeRes,this);
	}
	/**显示战力值显示tips */
	private showUpGradeRes():void{
		var x:number = (Config.curWidth()>>1) - 135;
		var y:number = (Config.curHeight()>>1) + 40;
		var power = DataCenter.playerAttr[data.PlayerAttr.FightValue];
		PopTipsManager.showPowerTips(x,y,power,this.showPowerRes,this);
	}
	private showPowerRes():void{
		var obj = {w:300,h:20,text:"+"+this.getSum(this.curModule.combatValueArr),x:(Config.curWidth()>>1) + 50,y:(Config.curHeight()>>1)};
		this.curModule.combatValueArr = [];
		var parentCon = ViewController.getInstance().getContainer().layer_popup;
		PopTipsManager.showUpGradeTips(obj,parentCon,null,this);
	}
	private getSum(array):number{
		var sum:number = 0;
		for(var i:number = 0;i<array.length;i++){
			sum += array[i];
		}
		return sum;
	}
	private onTouchTap(evt:egret.TouchEvent):void{
		switch(evt.target){
			case this.tupoBtn.button:
				this.changeTap(this.tupoBtn);
				this.skin.currentState = this.STATE_TOPO_PANEL;
				break;
			case this.secretBtn.button:
				this.changeTap(this.secretBtn);
				this.skin.currentState = this.STATE_SECRET_PANEL;
				break;
			case this.skillBtn.button:
				this.changeTap(this.skillBtn);
				this.skin.currentState = this.STATE_SKILL_PANEL;
				break;
			case this.returnBtn:
			case this.closeBtn:
				this.removeView(1);
				break;
			case this.upGradeBtn.button:
				//升级
				this.curModule.requestUpDate(this.curItem);
				break;
			case this.allUpGradeBtn.button:
				//全部升级
				this.curModule.requestAllUp();
				break;
			case this.secretBookBtn:
				//秘籍图鉴
				this.secretPanel.state = this.STATE_SECRET_BOOLLIST;
				PopUpManager.addPopUp(this.secretPanel,true,this.secretPanel.skinName,this.layer,0);
				this.secretPanel.initScroller();
				//测试
				DataCenter.secretBook = [4,4,4,4,4,4,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,5,5,5];
				this.secretPanel.testName = ["中级健体","中级强力","中级防御","中级暴击","中级免伤","中级必杀","中级穿透","中级反伤","中级偷袭","中级神佑"
						,"中级死咒","中级再生","高级健体","高级强力","高级防御","高级暴击","高级免伤","高级必杀","高级穿透","高级反伤"
						,"高级偷袭","高级神佑","高级死咒","高级再生"];
				break;
			case this.startBtn.button:
				this.secretPanel.state = this.STATE_SECRET_START;
				PopUpManager.addPopUp(this.secretPanel,true,this.secretPanel.skinName,this.layer,0);
				this.secretPanel.initScroller();
				//测试
				DataCenter.secretBook = [4,5,4]
				this.secretPanel.testName = ["中级强力","高级神佑","中级必杀"];
				break;
			case this.secretReplaceLink:
				//秘籍置换
				PopUpManager.addPopUp(this.secretReplace,true,this.secretReplace.skinName,this.layer,0);
				break;
			default:
				break;
		}
	}
	private onGroupTouch(evt:egret.TouchEvent):void{
		var item = evt.target.parent;
	}
	private onDispatchRes(evt:lcp.ChangeEvent):void{
		if(evt.c_data.insKey === this.skinName){
			this.curModule.setJob(evt.c_data);
		}
	}
	private onItemTap(evt:eui.ItemTapEvent):void{
		this.initSkillFocus();
		var item:RoleSkillItemRender = this.skillList.getChildAt(evt.itemIndex) as RoleSkillItemRender;
		item.focusImg = "reborn_select_png";
		this.curItem = this.skillList.selectedItem;
		this.curItem.index = this.skillList.selectedIndex;
		this.singleCost.text = this.curItem.needMongy;
		if(this.curItem.needMongy > this.attr[data.PlayerAttr.money]){
			this.singleCost.textColor = 0xfc3434;
		}else{
			this.singleCost.textColor = 0xEDC589;
		}
	}
	private initSkillFocus():void{
		var len:number = this.skillList.numChildren;
		for(var i:number = 0;i<len;i++){
			var item:RoleSkillItemRender = this.skillList.getChildAt(i) as RoleSkillItemRender;
			item.focusImg = "reborn_normal_png";
		}
	}
	/**tab切换 */
	private changeTap(curBtn:BagBtn){
		this.curBtn.setAttr({currentState:"up"});
		this.curBtn = curBtn;
		curBtn.setAttr({currentState:"down"});
	}
	private refreshTextColor():void{

	}
	public set allc(value:number){
		// if(value > this.attr[data.PlayerAttr.money]){
		// 	this.allCost.textColor = 0XFC3434;
		// }else{
		// 	this.allCost.textColor = 0xEDC589;
		// }
		this.allCost.text = value +"";
	}
	public removeView(closeState:number):void{
		this.curModule.removeView(closeState);
	}
	public removeEvent():void{
		Global.removeEventListener(MainNotify.JOBCHAGNE,this.onDispatchRes,this);
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		this.secretGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onGroupTouch,this,false);
		this.skillList.removeEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this);
	}
}