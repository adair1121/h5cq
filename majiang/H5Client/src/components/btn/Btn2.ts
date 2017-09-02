class Btn2 extends eui.Component{
	public labelDisplay:eui.Label;
	public m_order:number;
	public constructor() {
		super();
		this.skinName = "Btn2_skin";
	}
	public set label(value:string){
		this.labelDisplay.text = value;
	}
	public set order(value:number){
		this.m_order = value;
	}
	public get label():string{
		return this.labelDisplay.text;
	}
	public get order():number{
		return this.m_order;
	}
}