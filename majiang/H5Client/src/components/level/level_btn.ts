class level_btn extends eui.Component{
	public progress:eui.ProgressBar;
	public autoBtn:eui.Button;
	public levelIcon:eui.Image;
	private clickState:boolean = false;
	public constructor() {
		super();
		this.skinName = "level_btn_skin";
	}
	protected childrenCreated():void{
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouch,this);
	}
	private onTouch(evt:egret.TouchEvent):void{
		switch(evt.target){
			case this.autoBtn:
				this.clickState = !this.clickState;
				if(this.clickState){
					this.autoBtn.currentState = "down";
					Global.dispatchEvent(MainNotify.SENDTOSAUTOCHALLENGE,{type:1});
				}else{
					this.autoBtn.currentState = "up";
					Global.dispatchEvent(MainNotify.SENDTOSAUTOCHALLENGE,{type:0});
				}
				break;
			case this.levelIcon:
				Global.dispatchEvent(MainNotify.OPENCHALLENGEPANEL);
				break;
		}
		
	}
	/**设置当前挑战波数 */
	public set curValue(value:number){
		this.progress.value = value;
		this.progress["numLabel"].text = value+"/3"
	}
	/**设置当前自动挑战按钮状态 */
	public set curState(value:number){
		if(value){
			this.clickState = true
			this.autoBtn.currentState = "down";
		}else{
			this.clickState = false;
			this.autoBtn.currentState = "up";
		}
	}
}