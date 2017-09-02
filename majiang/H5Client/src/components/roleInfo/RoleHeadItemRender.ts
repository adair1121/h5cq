class RoleHeadItemRender extends eui.ItemRenderer{
	public roleIcon:eui.Image;
	public roleIconFocus:eui.Image;
	public constructor() {
		super();
		this.skinName = "Role_item_skin";
		// this.selected=false;
		// this.roleIconFocus.visible =false;
	}
	protected dataChanged():void{
		this.roleIcon.source = this.data.roleIcon;
		// this.roleIconFocus.visible = this.data.focus;
		// if(this.selected){
		// 	this.roleIconFocus.visible =true;
		// }else{
		// 	this.roleIconFocus.visible =false;
		// }
	}
	public set source(value:string){
		this.roleIcon.source = value;
	}
}