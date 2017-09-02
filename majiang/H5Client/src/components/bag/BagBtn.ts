class BagBtn extends eui.Component{
	public labelTxt:eui.Label;
	public button:eui.Button;
	public constructor() {
		super();
		this.skinName = "BagBtn_skin";
	}
	public setAttr(attrObj:any){
		for(var key in attrObj){
			if(this.labelTxt[key]){
				this.labelTxt[key] = attrObj[key];
			}else{
				this.button[key] = attrObj[key];
			}
		}
		
	}
}