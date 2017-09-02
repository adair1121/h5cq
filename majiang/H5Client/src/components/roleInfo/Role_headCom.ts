class Role_headCom extends eui.Component{
	public headList:eui.List;
	public headSource:eui.ArrayCollection;
	public _sourceData:any;
	private layer:eui.Component;
	private lockObj:any;
	private curIndex:number = 0;
	private instanceKey:string;
	public constructor() {
		super();
		this.skinName = "Role_headCom_skin";
	}
	protected childrenCreated():void{
		this.headList.itemRenderer = RoleHeadItemRender;
		this.headSource = new eui.ArrayCollection();
		this.headList.dataProvider = this.headSource;
		// eui.Binding.bindHandler(this,["_sourceData"],this.soureChange,this);
		this.headList.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onRoleChange,this);
		// eui.Binding.bindHandler(DataCenter,["roleList"],this.updateHead,this);
		this.headList.selectedIndex=0;
		this.layer = ViewController.getInstance().getContainer().layer_ui;
	}
	public updateHead(value:any[],key:string):void{
		if(value && value.length){
			this.lockObj = {};
			var arr:Array<any> = [];
			for(var i:number=0;i<3;i++){
				var obj = {}
				if(value[i]){
					
					var sex:number = value[i].sex;
					var job:number = value[i].job;
					obj["roleIcon"] = "head_"+job+"_"+sex+"_png";
					obj["job"]=job;
					obj["sex"]=sex;
					obj["isClocked"]=true;
					this.lockObj[job] = true;
				}else{
					obj["isClocked"]=false;
				}
				arr.push(obj);
			}
			this.instanceKey = key;
			this.headSource.source = [];
			this.headSource.source = arr;
			this.headList.selectedIndex = this.curIndex;
		}
	}
	private soureChange(value:any){
		if(value){
			this.headSource.source = value;
		}
	}
	private onRoleChange(evt:eui.ItemTapEvent):void{
		// 判断当前角色是否已经解锁
		// DataCenter.roleInfo.curRoleInfo["job"] = this.headList.selectedItem.job;
		this.curIndex = evt.itemIndex;
		if(this.headList.selectedItem.isClocked){
			this.headList.selectedIndex=evt.itemIndex;
			Global.dispatchEvent(MainNotify.JOBCHAGNE,{job:this.headList.selectedItem.job,insKey:this.instanceKey});
		}else{
			//弹出解锁页面
			// this.headList.selectedIndex=evt.itemIndex;
			Global.dispatchEvent(MainNotify.CREATENEWROLE,this.lockObj);
			// PopUpManager.addPopUp(this.roleSelect,true,this.roleSelect.skinName,this.layer,0);
			// this.roleSelect.setData(this.lockObj);
		}
		
	}
	// public set sourceData(value:any){
	// 	this._sourceData = value;
	// }
}