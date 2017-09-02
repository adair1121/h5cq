class MainUI_progress extends eui.Component{
	public label:eui.Label;
	private _curValue:number;
	private _totalValue:number;
	public constructor() {
		super();
		this.skinName = "MainUI_progress_skin";
	}
	public set curValue(value:number){
		this._curValue = value;
		this.label.text = this._curValue +"/" +this._totalValue;
	}
	public set totalVale(value:number){
		this._totalValue = value;
		this.label.text = this._curValue +"/" +this._totalValue;
	}
	

}