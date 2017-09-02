class Module_chengzhuang extends Base_module{
	
	public constructor() {
		super();
	}
	private assemblyObj:any = {};
	private disAssemblyObj:any = {};
	protected bindData():void{
		this.p_type = PanelType.MAINNAV;
	}
	/**
	 * 接收来自模块间的消息并分发
	 * @param msg 消息列表
	 */
    public receiveMsgFromModule(msgType:string,dataRes:any=null):void{
		switch(msgType){
			case MainNotify.OPENCJPANEL:
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
			case proto.MessageType.s_AssemblyEquip:
				var assembly_msg:proto.s_AssemblyEquip = msg as proto.s_AssemblyEquip;
				if(!assembly_msg.isSuccess){
					var obj:any = {type:TipsEnum.TYPE_WARN,label:assembly_msg.errMsg};
					PopTipsManager.showPopTips([obj]);
				}else{
					this.assemblyObj.equipItem = assembly_msg.equipItem;
					this.sendMsgToModule([ModuleEnum.ROLEINFO],MainNotify.CJ_ASSEMBLY_SUCCESS,this.assemblyObj);
					this.view.resetCJEquipData();
				}
				break;
			case proto.MessageType.s_DisassembleEquip:
				var dis_msg:proto.s_DisassembleEquip = msg as proto.s_DisassembleEquip;
				if(!dis_msg.isSuccess){
					var obj:any = {type:TipsEnum.TYPE_WARN,label:assembly_msg.errMsg};
					PopTipsManager.showPopTips([obj]);
				}else{
					for(var i:number = 0;i<DataCenter.cjEquip.length;i++){
						if(DataCenter.cjEquip[i].uid === this.disAssemblyObj.insId){
							this.sendMsgToModule([ModuleEnum.BAG],MainNotify.REMOVEBAGITEM,[DataCenter.cjEquip[i]]);
							DataCenter.cjEquip.splice(i,1);
							break;
						}
					}
					this.view.refreshCJData();
				}
				break;
			default:
				break;
		}
	}
	
	protected createView():void{
		this.view = new View_chengzhuang();
		super.createView();
	}
	public removeView(closeState):void{
		if(this.view && this.view.parent && this.view.parent.contains(this.view)){
			this.view.removeEvent();
			this.view.parent.removeChild(this.view);
			if(closeState){
				this.sendMsgToModule([ModuleEnum.MAINUI],MainNotify.INITNAVFOCUS);
			}
		}
	}
	/**向服务器发送消息 */
	//请求合成橙装
	public assemblyEquip(dataObj:any):void{
		var assembly_msg:proto.c_AssemblyEquip = new proto.c_AssemblyEquip();
		this.assemblyObj = dataObj;
		assembly_msg.itemId = dataObj.itemId;
		assembly_msg.job = dataObj.job;
		assembly_msg.equipPos = dataObj.equipPos;
		SocketManager.getInstance().sendProto(assembly_msg);
	}
	/**请求分解橙装 */
	public disAssemblyEqip(dataObj:any):void{
		var dis_msg:proto.c_DisassembleEquip = new proto.c_DisassembleEquip();
		dis_msg.equipInstId = dataObj.insId;
		dis_msg.job = dataObj.job;
		this.disAssemblyObj = dataObj;
		SocketManager.getInstance().sendProto(dis_msg);
	}
	//========================================================
}