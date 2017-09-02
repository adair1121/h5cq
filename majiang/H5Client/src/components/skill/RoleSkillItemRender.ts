class RoleSkillItemRender extends eui.ItemRenderer{

	public skillName:eui.Label;
	public skillDesc:eui.Label;
	public level:eui.Label;
	public item:CommonItem
	public skillItemBg:eui.Image;
	private static _h:number;
	public constructor() {
		super();
		this.skinName = "Role_skillItem_skin";
		RoleSkillItemRender._h = this.height;
	}
	protected dataChanged():void{
		this.skillName.text = this.data.skillName;
		this.skillDesc.textFlow = (new egret.HtmlTextParser).parser(this.data.skillDesc);
		this.level.text = "lv."+this.data.lv;
		this.item.img = this.data.skillIcon;
		if(this.data.focus){
			this.focusImg = "reborn_select_png";
		}
	}
	public static getHeight():number{
		return RoleSkillItemRender._h;
	}
	public set focusImg(imgSource:string){
		this.skillItemBg.source = imgSource;
	}
	
}