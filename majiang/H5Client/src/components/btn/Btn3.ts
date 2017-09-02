class Btn3 extends eui.Component{
	public constructor() {
		super();
		this.skinName = "Btn3_skin";
		this.labelDisplay.touchEnabled=false;
		this.touchChildren=false;
		this.touchEnabled=true;
	}
	public labelDisplay:eui.Label;
	
	private _label : string;
	public get label() : string {
		return this._label;
	}
	public set label(v : string) {
		this._label = v;
		this.labelDisplay.text=v;
	}
	
	private _size  : number;
	public get size () : number {
		return this._size ;
	}
	public set size (v : number) {
		this._size  = v;
		this.labelDisplay.size=v;
	}
	
	
}