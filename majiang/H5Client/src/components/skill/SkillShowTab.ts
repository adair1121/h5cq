class SkillShowTab extends eui.Component{
	public skillList:eui.List;
	private skillSource:eui.ArrayCollection;
	public constructor(type:number) {
		super();
		this.skinName = "SkillTab_skin";
	}
	protected childrenCreated():void{
		this.skillSource = new eui.ArrayCollection();
		this.skillList.itemRenderer = RoleSkillItemRender;
		this.skillList.dataProvider = this.skillSource;
	}
	public refreshSkillSource(value:any):void{
		this.skillSource.source = value;
	}
	public remove():void{
		
	}
}