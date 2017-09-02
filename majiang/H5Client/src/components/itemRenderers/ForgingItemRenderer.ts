class ForgingItemRenderer extends eui.ItemRenderer{

	
	//装备资源
	public equipImg:eui.Image;
	//装备强化等级
	public equipIntensify:eui.Label;
	public iName:eui.Label;
	public boxS:eui.Image;
	public time:eui.Label;
	public constructor() {
		super();
		this.skinName = "ForgingItemRenderer_skin";
	}
	protected dataChanged():void{
		this.equipImg.source = this.data.equipSource;
		if(this.data.equipIntensify){
			this.equipIntensify.visible = true;
			this.equipIntensify.text = "+"+this.data.equipIntensify;
		}else{
			this.equipIntensify.visible = false;
		}
		if(this.data.boxS){
			this.boxS.source = this.data.boxS;
		}else{
			this.boxS.source = "bag_1_box_png";
		}
		if(this.data.iName){
			this.iName.visible = true;
			this.iName.text = this.data.iName;
		}else{
			this.iName.visible = false;
		}
		if(this.data.time){
			this.time.text = GlobalFunc.formatTime(this.data.time,false);
		}
		// if(this.selected){
		// 	this.currentState="down";
		// }else{
		// 	this.currentState="up";
		// }
	}
	
}