class Module_player extends Base_module{
	public constructor() {
		super();
	}

	protected bindData():void{
		eui.Binding.bindHandler(DataCenter,["playerInfo"],this.dealWithPlayerData,this);

	}

	//////////////////////////////数据绑定函数///////////////
	private dealWithPlayerData():void{
		// var bag = DataCenter.basePlayerInfo.bags;
		// this.dealWithBagData(bag);
		// this.createUserBaseVo(DataCenter.basePlayerInfo);
	}

	/**
	 * 处理背包数据
	 */
	private dealWithBagData (bag:any,oper:number = 0):void{
		var bagArr:any = []
		for(var i:number = 0;i<bag.length;i++){
			var obj = {};
			obj["num"] = bag[i].num;
			obj["uid"] = bag[i].uid;
			bagArr.push(obj)
		}
		DataCenter.bag.roleBagInfo = bagArr;
	}

	/**
	 * 创建玩家基础信息VO
	 */
	private playerBaseVo:PlayerBaseInfoVo;
	private createUserBaseVo(data:any):void{
		// var levelId = data.lvl;
		// var lvConfig = this.getTemple(levelId);
		// console.log(lvConfig);
		this.playerBaseVo = new PlayerBaseInfoVo();
		for(var o in data){
			this.playerBaseVo[o] = data[o];
		}
		// ModuleData_mainUI.playerBaseInfo 
		DataCenter.playerInfoVO= this.playerBaseVo;
		DataCenter.bag.bagNum = data.bagCount;
		// DataCenter.baseInfo.playerBaseInfo = data;
		// this.toDealWithRoleInfoData(this.roleInfo);
		
	}
	
}