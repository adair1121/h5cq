class View_selectRole extends Base_view{
	public taoistBtn_0:eui.Image;
	public taoistBtn_1:eui.Image;
	public masterBtn_0:eui.Image;
	public masterBtn_1:eui.Image;
	public warriorBtn_0:eui.Image;
	public warriorBtn_1:eui.Image;
	public nameTxt:egret.TextField;
	public createBtn:eui.Button;
	private reg:RegExp;
	public tData:any;

	private bgCir:egret.Sprite;
	public constructor() {
		super();
		this.skinName = "View_selectRole_skin";
	}
	protected childrenCreated():void{
		this.touchEnabled = true;
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		this.createBtn["labelTxt"].text="创建";
		this.nameTxt = new egret.TextField();
		this.tData = {name:"",Job:-1,Sex:-1};
		this.addChild(this.nameTxt);
		this.initialize();
	}
	private initialize():void{
		this.nameTxt.width = 200;
		this.nameTxt.height = 30;
		this.nameTxt.fontFamily = "SimHei";
		this.nameTxt.size = 16;
		this.nameTxt.text = "请输入用户名";
		this.nameTxt.background = true;
		this.nameTxt.textColor = 0x999999;
		this.nameTxt.border = true;
		this.nameTxt.inputType = egret.TextFieldInputType.TEXT;
		this.nameTxt.type = egret.TextFieldType.INPUT;
		this.nameTxt.maxChars = 6;
		this.nameTxt.textAlign = egret.HorizontalAlign.LEFT;
		this.nameTxt.verticalAlign = egret.VerticalAlign.MIDDLE;
		this.nameTxt.x = (Config.curWidth()>>1) - (this.nameTxt.width>>1);
		this.nameTxt.y = Config.curHeight() - 150;
		this.nameTxt.addEventListener(egret.FocusEvent.FOCUS_IN,this.onFocusIn,this);
		this.nameTxt.addEventListener(egret.FocusEvent.FOCUS_OUT,this.onFocusOut,this);
		this.reg = new RegExp(/\s+/g);

		this.bgCir = this.createBg();
		this.addChild(this.bgCir);
		this.bgCir.visible = false;
		
	}
	private onFocusIn(evt:egret.FocusEvent):void{
		if(this.nameTxt.textColor === 0x999999){
			this.nameTxt.text = "";
			this.nameTxt.textColor = 0x000000;
		}
	}
	private nameLabel:string;
	private onFocusOut(evt:egret.FocusEvent):void{
		this.nameLabel = this.nameTxt.text.replace(this.reg,"");
		if(this.nameLabel === ""){
			this.nameTxt.text = "请输入用户名";
			this.nameTxt.textColor = 0x999999;
			return
		}
	}
	private curTar:any;
	private onTouchTap(evt:egret.Event):void{
		this.curTar = evt.target;
		switch(evt.target){
			case this.taoistBtn_0:
			case this.taoistBtn_1:
			case this.masterBtn_0:
			case this.masterBtn_1:
			case this.warriorBtn_0:
			case this.warriorBtn_1:
				this.clickHeadOper();
				break;
			case this.createBtn:
			    this.createRoleFunc();
				break;
			default:
				break;
		}
	}
	private clickHeadOper():void{
		var arr:any[] = this.curTar.name.split("_");
		this.tData.Job = arr[0];
		this.tData.Sex = arr[1];
		if(!this.bgCir.visible){
		this.bgCir.visible = true;
		}
		this.bgCir.x = this.curTar.x-1;
		this.bgCir.y = this.curTar.y-1;
	}
	private createRoleFunc():void{
		if((this.tData.Job === -1) || (this.nameTxt.textColor === 0x999999)){
			return;
		}
		this.tData.name = this.nameLabel;
	this.module["createRole"]();
	}

	/**测试使用 */
	private createBg():egret.Sprite{
		var sp:egret.Sprite = new egret.Sprite();
		sp.graphics.lineStyle(1,0xff0000)
		sp.graphics.drawRect(0,0,82,82);
		sp.graphics.endFill();
		return sp;
	}
	
}