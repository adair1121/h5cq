class RoleEquipRenderer extends eui.ItemRenderer{

	public showName:eui.Label;
	//装备资源
	public equipImg:eui.Image;
	//装备强化等级
	public equipIntensify:eui.Label;
	public equipLv:eui.Label; 
	public equipBox:eui.Image;
	public specialBtn:eui.Button;

	private stateName:string;
	public constructor() {
		super();
		this.skinName = "Role_equipItem_skin";
	}
	protected dataChanged():void{
		if(this.data.state){
			this.stateName = "specialEquip";
			this.invalidateState();
			
		}else{
			this.stateName = "rect";
			this.invalidateState();
			this.showName.text = this.data.label;
			this.equipImg.source = this.data.equipSource;
			if(this.data.equipIntensify){
				this.equipIntensify.visible = true;
				this.equipIntensify.text = this.data.equipIntensify;
			}else{
				this.equipIntensify.visible = false;
				this.equipIntensify.text = "0";
			}
			if(this.data.equipLv){
				this.equipLv.visible = true;
				this.equipLv.text = this.data.equipLv;
			}else{
				this.equipLv.visible = false;
				this.equipLv.text = "0";
			}
			
			this.equipBox.source = GlobalFunc.setBgData(this.data.quality).boxS;
			if(this.data.attr){
				var attr:any = this.data.attr;
				for(var key in attr){
					if(this.showName[key]){
						this.showName[key] = attr[key];
					}
				}
			}
		}
		
	}

	protected getCurrentState():string{
		return this.stateName;
	}
	public get r_state():string{
		return this.skin.currentState;
	}
}