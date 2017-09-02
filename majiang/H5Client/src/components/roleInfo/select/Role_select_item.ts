class Role_select_item extends eui.ItemRenderer{
	public jobName:eui.Label;
	public ifLocked:eui.Label;
	public roleCom:eui.Group;
	private weaponMc:MovieClip;
	private roleMc:MovieClip;
	public constructor() {
		super();
		this.skinName = "Role_select_item_skin";
	}
	protected dataChanged():void{
		this.ifLocked.text = (this.data.ifLocked?"已激活":"未激活");
		this.jobName.text = this.data.jobName;
		// var img:eui.Image = new eui.Image();
		// img.source = this.data.source;
		// this.roleCom.addChild(img);
		// this.refreshRoleMode(this.data.rolePath,this.data.weaponPath);
	}
	/**更新角色模型 */
	private refreshRoleMode(roleModePath:string = "",roleWeaponPath:string = ""):void{
		this.weaponMc.loadFile(roleWeaponPath,true,-1,null,this);
        this.roleCom.addChild(this.weaponMc);
		this.roleMc.loadFile(roleModePath,true,-1,null,this);
		this.roleCom.addChild(this.roleMc);
		this.roleMc.x = (this.roleCom.width >> 1);
		this.roleMc.y = (this.roleCom.height >> 1) + 25;
		this.weaponMc.x = this.roleMc.x;
		this.weaponMc.y = this.roleMc.y;
	}
}