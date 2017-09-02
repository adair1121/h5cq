class Btn1 extends eui.Component{
	public labelTxt:eui.Label;
	public button:eui.Button;
	public constructor() {
		super();
		this.skinName = "Btn1_skin";
	}
	public set label(value:string){
		this.labelTxt.text = value;
	}
}