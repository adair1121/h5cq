class Module_skillPanel extends Base_module {
	private static skillSource:any[];
	private static headIconSource:any[];
	private static curSkilIdGather:any[];
	private container:eui.Group;
	private headIconWatcher:eui.Watcher;
	private skillWatcher:eui.Watcher;
	private costWatcher:eui.Watcher;
	private SINGLE:string = "single";
	private ALL:string = "all";
	private attr:number[];
	private curJob:number;
	private static firstOper:boolean = true;
	public constructor() {
		super();
		
	}
	protected bindData():void{
		this.p_type = PanelType.MAINNAV;
		Module_skillPanel.firstOper = true;
		this.attr = DataCenter.playerAttr;
		this.setJob({job:DataCenter.roleList[0].job});
		eui.Binding.bindHandler(DataCenter,["RoleInFoVo"],this.dealWithSkillData,this);
		eui.Binding.bindHandler(Module_skillPanel,["skillSource"],this.onSkillSourceChange,this);
	}
	private onSkillSourceChange(value:any):void{
		if(value && value.length && this.view && this.view.parent && this.view.parent.contains(this.view)){
			this.view.refreshSkillSource(value);
		}
	}
	public setJob(obj:any){
		this.curJob = obj.job;
		var skills:proto.SkillInfo[] = DataCenter.RoleInFoVo[this.curJob].skills;
		this.dealWithcurRoleSkillInfo({UpInfo:skills});
	}
	private dealWithSkillData(value:any):void{
		if(value){
			var skills:proto.SkillInfo[] = value[this.curJob].skills;
			this.dealWithcurRoleSkillInfo({UpInfo:skills});
		}
		
	}
	/**处理技能数据 */
	private dealWithcurRoleSkillInfo(dataObj:any):void{
		Module_skillPanel.skillSource = [];
		Module_skillPanel.curSkilIdGather = [];
		var skillData:any = dataObj.UpInfo;
		var arr:any[] = [];
		var idArr:any[] = [];
		for(var i = 0;i<skillData.length;i++){
			var template:data.SkillTemple = temple.TempleManager.select(parseInt(skillData[i].SkillID)) as data.SkillTemple;
			var obj:any = {};
			obj.skillName = template.name;
			obj.skillDesc = template.describe;
			obj.skillIcon = Config.path_skillIcon+ template.icon + ".png";
			obj.lv = template.skilllev;
			// obj.isactive = skillData[i].isactive;
			obj.skillID = skillData[i].SkillID;
			obj.order = template.skill_category;
			obj.needMongy = template.needMongy;
			obj.focus = false;
			arr.push(obj);
			//记录技能id集合
			var obj2:any = {};
			obj2[obj["order"]] = skillData[i].SkillID;
			obj2["order"] = template.skill_category;
			idArr.push(obj2);
			
		}
		arr = GlobalFunc.sortRule(GlobalFunc.NORMALIZE,"order",GlobalFunc.deepCopy(arr));
		idArr = GlobalFunc.sortRule(GlobalFunc.NORMALIZE,"order",GlobalFunc.deepCopy(idArr));
		arr[0].focus = true;
		Module_skillPanel.skillSource = arr;
		Module_skillPanel.curSkilIdGather = idArr;
	}
	/**
	 * 接收来自模块间的消息并分发
	 * @param msg 消息列表
	 */
	private damage:number;
    public receiveMsgFromModule(msgType:string,data:any=null):void{
		switch(msgType){
			case MainNotify.OPENSKILLPANEL:
				this.createView();
				break;
			default:
				break;
		}
	}
	/**
	 * 解析来自服务器的消息并处理
	 * @param msg 模块对应的消息
	 */
	public receiveMsgFromSever(msg:proto.Pro):void{
		switch (msg.S) {
			case proto.MessageType.s_skill_up:
				var skill_msg:proto.s_skill_up = msg as proto.s_skill_up;
				if(skill_msg.isSuccessed){
					this.requestUpDateRes(skill_msg);
				}else{
					this.showTips("升级失败");
				}	
				break;
			case proto.MessageType.s_skillAllUp:
				var allSkillMsg:proto.s_skillAllUp = msg as proto.s_skillAllUp;
				if(allSkillMsg.idSuccessed){
					//修改---处理技能全部升级问题
					this.requestAllUpDateRes(allSkillMsg);
				}else{
					//此处暂时为测试使用
					this.showTips("升级失败");
				}
				break;
			default:
				break;
		}
	}
	
	protected createView():void{
		if(this.view && this.view.parent && this.view.parent.contains(this.view)){
			this.removeView(1);
		}else{
			//打开技能面板
			this.view = new View_skillPanel();
			super.createView();
			this.view.isInitSingle = true;
			this.view.isInitAll = true;
			this.combatValueArr = [];
			this.calculAllUpCost();
			Module_skillPanel.skillSource[0].focus = true;
			this.setSource(Module_skillPanel.skillSource);
			this.headIconWatcher = eui.Binding.bindProperty(Module_skillPanel,["headIconSource"],this.view.roleHeadCom,"sourceData");
			eui.Binding.bindProperty(this,["allCost"],this.view,"allc");
		}
	}
	public removeView(closeState:number):void{
		//关闭技能面板
		if(this.view && this.view.parent && this.view.parent.contains(this.view)){
			if(this.headIconWatcher){
				this.headIconWatcher.unwatch()
			}
			this.view.removeEvent();
			this.view.parent.removeChild(this.view);
			if(closeState){
				this.sendMsgToModule([ModuleEnum.MAINUI],MainNotify.INITNAVFOCUS);
			}
		}
	}
	/**初始化技能数据*/ 
	private setSource(skillSource:any):void{
		var arr:any[] = GlobalFunc.deepCopy(skillSource);
		Module_skillPanel.skillSource = [];
		Module_skillPanel.skillSource = arr;
	}
	/**初始化技能面板人物头像数据 */
	private initHeadSource():void{
		Module_skillPanel.headIconSource = [];
		for(var i = 0;i<3;i++){
			var obj = {"roleIcon":"","focus":false};
			Module_skillPanel.headIconSource.push(obj);
		}
	}
	/**请求升级单个技能 */
	public requestUpDate(item:any):void{
		var template:data.SkillTemple = temple.TempleManager.select(parseInt(item.skillID)) as data.SkillTemple;
		if(!template.upgradeSkill){
			this.showTips("技能已升到顶级");
			return;
		}
		var template2:data.SkillTemple = temple.TempleManager.select(template.upgradeSkill) as data.SkillTemple;
		this.needGold = template.needMongy;
		var needLevel:number = template2.needLev; 
		this.prevSkillIndex = item.index;
		if(this.attr[data.PlayerAttr.levID] < needLevel ){
			this.showTips("技能等级达到上限,请提升等级");
			return;
		}
		if(this.needGold > this.attr[data.PlayerAttr.money]){
			this.showTips("金币不足");
			return;
		}
		var skill_msg:proto.c_skill_up = new proto.c_skill_up();
		skill_msg.job = this.curJob;
		skill_msg.skillid = item.skillID;
		SocketManager.getInstance().sendProto(skill_msg);
	}
	/**请求升级全部技能 */
	public requestAllUp():void{
		var len = Module_skillPanel.skillSource.length;
		var num:number =0;
		var num2:number = 0;
		for(var i:number = 0;i<len;i++){
			var template:data.SkillTemple = temple.TempleManager.select(parseInt(Module_skillPanel.skillSource[i].skillID)) as data.SkillTemple;
			var nextTemplate:data.SkillTemple = temple.TempleManager.select(template.upgradeSkill) as data.SkillTemple;
			if(nextTemplate.needLev > this.attr[data.PlayerAttr.levID]){
				num += 1;
			}
			if(!template.upgradeSkill){
				num2+=1;
			}
		}
		if(num2 >=5){
			this.showTips("技能已经达到顶级");
			return;
		}
		if(num >= 5){
			this.showTips("技能等级达到上限,请提升等级");
			return;
		}
		if(this.allCost > this.attr[data.PlayerAttr.money]){
			this.showTips("金币不足");
			return;
		}
		var skill_msg:proto.c_skillAllUp = new proto.c_skillAllUp();
		skill_msg.job = this.curJob;
		SocketManager.getInstance().sendProto(skill_msg);
	}
	private prevSkillIndex:number;
	private needGold:number;
	public combatValueArr:number[];
	/**请求升级单个技能返回 */
	private requestUpDateRes(skillMsg:proto.s_skill_up):void{
		if(skillMsg.isSuccessed){
			var skillId:number = skillMsg.skillid;
			Module_skillPanel.skillSource[0].focus = false;
			// var skillTemplate:data.SkillTemple = temple.TempleManager.select(skillId) as data.SkillTemple;
			// var skill_category:number = skillTemplate.skill_category;
			// var preSkillId:number = Module_skillPanel.curSkilIdGather[skill_category];
			// var prevSkillTemplate:data.SkillTemple = temple.TempleManager.select(preSkillId) as data.SkillTemple;
			// var combatValue:number = skillTemplate.FightValue - prevSkillTemplate.FightValue;
			// this.combatValueArr.push(combatValue);
			// var curSkillData = Module_skillPanel.skillSource[this.prevSkillIndex];
			// curSkillData.skillDesc = skillTemplate.describe;
			// curSkillData.lv = skillTemplate.skilllev;
			// curSkillData.skillID = skillMsg.skillid;
			// curSkillData.count = skillTemplate.skilllev - prevSkillTemplate.skilllev;
			// Module_skillPanel.curSkilIdGather[skill_category] = skillId;
			// curSkillData.needMongy = skillTemplate.needMongy;
			this.dealUpData([skillId]);
			this.changeData(this.SINGLE);
		}else{
			//此处暂时为测试使用
			this.showTips("技能升级失败");
		}
	}
	/**请求升级全部技能返回 */
	private requestAllUpDateRes(skillMsg:proto.s_skillAllUp):void{
		if(skillMsg.idSuccessed){
			this.dealUpData(skillMsg.skillInfoList);
			this.changeData(this.ALL);
		}else{
			//此处暂时为测试使用
			this.showTips("技能升级失败");
		}
	}
	/**处理技能升级后的公共方法 */
	private dealUpData(idGather:any[]):void{
		var curIdGather:any = Module_skillPanel.curSkilIdGather;
		var curGatherLen:number = curIdGather.length;
		var curSkillTemplate:data.SkillTemple;
		var skill_category:number;
		var prevSkillTemplate:data.SkillTemple;
		var preSkillId:number;
		var skillIndex:number;
		var id:number;
		for(var i:number = 0,len:number = idGather.length;i<len;i++){
			if(idGather.length <= 1){
				id = idGather[i];
			}else{
				id = idGather[i].SkillID;
			}
			curSkillTemplate = temple.TempleManager.select(id) as data.SkillTemple;
			skill_category = curSkillTemplate.skill_category;
			for(var j:number = 0;j<curGatherLen;j++){
				if(curSkillTemplate.skill_category === curIdGather[j]["order"]){
					preSkillId = curIdGather[j][skill_category];
					skillIndex = j;
				}
			}
			prevSkillTemplate = temple.TempleManager.select(preSkillId) as data.SkillTemple;
			var combatValue:number = curSkillTemplate.FightValue - prevSkillTemplate.FightValue;
			this.combatValueArr.push(combatValue);
			var curSkillData = Module_skillPanel.skillSource[skillIndex];
			curSkillData.skillDesc = curSkillTemplate.describe;
			curSkillData.lv = curSkillTemplate.skilllev;
			curSkillData.skillID = id;
			curSkillData.count = curSkillTemplate.skilllev - prevSkillTemplate.skilllev;
			Module_skillPanel.curSkilIdGather[skillIndex][skill_category] = id;
			curSkillData.needMongy = curSkillTemplate.needMongy;
		}
	}
	/**技能升级后的数据修改 */
	private changeData(type):void{
		if(this.view && this.view.parent && this.view.parent.contains(this.view)){
			if(type === this.SINGLE){
				this.view.isInitSingle = false;
				this.view.isInitAll = true;
			}else{
				this.view.isInitSingle = true;
				this.view.isInitAll = false;
			}
			// this.attr[data.PlayerAttr.FightValue] += changePower;
			// this.attr[data.PlayerAttr.money] -= changeGold;
			this.calculAllUpCost();
			this.setSource(Module_skillPanel.skillSource);
		}
	}
	/** */
	private showTips(msg:string):void{
		var obj:any[] = [{type:TipsEnum.TYPE_WARN,label:msg}];
		PopTipsManager.showPopTips(obj);
	}
	/** 计算消耗金币值*/
	private calculAllUpCost():void{
		var arr = GlobalFunc.deepCopy(Module_skillPanel.skillSource);
		this.allCost = 0;
		this.recursiveCost(arr);
	}
	private allCost:number = 0;
	private recursiveCost(e):void{
		//待测试--排序公共方法
		e = GlobalFunc.sortRule(GlobalFunc.NORMALIZE,"lv",e);;
		var len:number = e.length;
		var minAverageObj:any = this.getMinAverage(e);
		var curAverage:any = e[e.length-1].lv;
		if(minAverageObj){
			//技能等级不同
			var operArr:any[] = [];
			var index:number = e.indexOf(minAverageObj);
			for(var i:number = 0;i<len;i++){
				if(i < index){
					operArr.push(e[i]);
				}
			}
			//例如[5,5,5,6,10]
			var diffValue:number = minAverageObj.lv - operArr[0].lv;
			this.getSum(operArr,diffValue,e);
		}else{
			var id:number = parseInt(e[0].skillID);
			var template:data.SkillTemple = temple.TempleManager.select(id) as data.SkillTemple;
			if(template){
				if(!template.upgradeSkill){
					//技能升到顶级
					// this.allCost = 0;
				}else{
					// var template2:data.SkillTemple = temple.TempleManager.select(template.upgradeSkill) as data.SkillTemple;
					this.allCost = this.allCost === 0?template.needMongy:this.allCost;
					if(this.attr[data.PlayerAttr.levID] >= template.needLev){
						this.getSum(e,1,e);
					}
				}
			}
			
		}
	}
	/**
	 * arr：operArr
	 * diff:diffValue
	 * parr:e 技能数组
	 */
	private getSum(arr,diff,parr){
		for(var i:number = 0;i<arr.length;i++){
			//遍历可操做的数组 < minAverageObj的数组
			for(var j:number = 0;j<diff;j++){
				var id:number = parseInt(arr[i].skillID) + j;
				var template:data.SkillTemple = temple.TempleManager.select(id) as data.SkillTemple;
				if(!template){
					break;
				}
				this.allCost += template.needMongy;
				if(this.allCost > this.attr[data.PlayerAttr.money]){
					this.allCost -= template.needMongy;
					this.allCost = this.allCost === 0?template.needMongy:this.allCost;
					return false;
				}
			}
			parr[i].lv += diff;
			parr[i].skillID = parseInt(parr[i].skillID) + diff;
		}
		this.recursiveCost(parr);
	}
	/**获取差值最小的技能等级 */
	private getMinAverage(arr:any):number{
		for(var i:number = 0;i<arr.length;i++){
			if(!!arr[i+1]){
				if(arr[i].lv < arr[i+1].lv){
					return arr[i+1]
				}
			}
		}
		return 0;
	}
}