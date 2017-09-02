class RoleMeridiansTab extends eui.Component{
	public cAttrList:eui.List;
	public nAttrList:eui.List;
	public ptomoteBtn:Btn1;
	public num:eui.Label;
	public costGroup:eui.Group;
	public upLevLab:eui.Label;
	private meritiansP:any[];
	public pGroup:eui.Group;
	public lineGroup:eui.Group;
	public rank:eui.Label;
	public fightValue:eui.Label;
	private clickState:boolean;
	private changeValue:number;
	private m_type:number;
	private btnState:number = 0;
	private c_arrayCollect:eui.ArrayCollection;
	private n_arrayCollect:eui.ArrayCollection;
	public constructor(type:number) {
		super();
		this.skinName = "RoleMeridiansTab_skin";
		this.m_type = type;
		if(type){
			this.costGroup.visible = false;
			this.ptomoteBtn.visible = false;
		}else{
			this.costGroup.visible = true;
			this.ptomoteBtn.visible = true;
		}
	}
	protected childrenCreated():void{
		this.meritiansP = [];
		var len:number = this.pGroup.numChildren;
		for(var i:number = 0;i<len;i++){
			var item:eui.Image = this.pGroup.getChildAt(i) as eui.Image;
			this.meritiansP.push(item);
		}
		this.c_arrayCollect = new eui.ArrayCollection();
		this.n_arrayCollect = new eui.ArrayCollection();
		this.cAttrList.dataProvider = this.c_arrayCollect;
		this.nAttrList.dataProvider = this.n_arrayCollect;
		this.cAttrList.itemRenderer = Role_specialItem;
		this.nAttrList.itemRenderer = Role_specialItem;
		this.ptomoteBtn.label = "提升";
		this.ptomoteBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
	}
	public refreshData(data:any):void{
		var cattr:any = data.cattr;
		var nattr:any = data.nattr;
		this.c_arrayCollect.source = data.cattr;
		this.n_arrayCollect.source = data.nattr;
		this.num.text = data.num+"/" + data.cost;
		this.fightValue.text = data.fightValue+"";
		this.changeValue = data.changeValue;
		if(this.clickState){
			this.clickState = false;
			GlobalFunc.showPowerUpTips(data.fightValue,[this.changeValue]);
		}
		if(data.rank < 10){
			this.rank.text = data.rank+"c";
		}else{
			this.rank.text = "sc";
		}
		if(!this.m_type){
			if(data.lev < 10){
				this.ptomoteBtn.label = "提升";
				this.costGroup.visible = true;
				this.upLevLab.text = "";
				this.btnState = 0;
			}else{
				this.ptomoteBtn.label = "升阶";
				this.costGroup.visible = false;
				this.upLevLab.text = "免费升阶";
				this.btnState = 1; 
			}
		}
		this.refreshSatr(data.lev);
		this.refreshTextColor(data.num);
	}
	private refreshSatr(starNum:number):void{
		this.initLine();
		if(starNum < 2 && starNum >=1){
			var item:eui.Image = this.pGroup.getChildAt(0) as eui.Image;
			item.source = "point_select_png";
			return;
		}
		var arr:any[] = [];
		for(var i:number = 0;i<starNum;i++){
			var item:eui.Image = this.pGroup.getChildAt(i) as eui.Image;
			item.source = "point_select_png";
			var p:egret.Point = new egret.Point(item.x,item.y);
			arr.push(p);
		}
		for(var j:number = 0;j<arr.length;j++){
			if(arr[j+1]){
				var p1:egret.Point = arr[j];
				var p2:egret.Point = arr[j+1];
				this.createLine(p1,p2);
			}
		}
		
	}
	private initLine():void{
		var len:number = this.pGroup.numChildren;
		for(var i:number = 0;i<len;i++){
			var item:eui.Image = this.pGroup.getChildAt(i) as eui.Image;
			item.source = "point_un_select_png";
		}
		this.lineGroup.removeChildren();
	}
	private onTouchTap(evt:egret.TouchEvent):void{
		switch(evt.target){
			case this.ptomoteBtn.button:
				if(this.btnState){
					//免费升阶
					Global.dispatchEvent(MainNotify.JINGMAIUP,{type:2});
				}else{
					Global.dispatchEvent(MainNotify.JINGMAIUP,{type:1});
				}
				this.clickState = true;
				
				break;
			default:
				break;
		}
	}
	public remove():void{
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
	}
	private createLine(mp:egret.Point,lp:egret.Point):void{
		var sp:egret.Sprite = new egret.Sprite();
		this.lineGroup.addChild(sp);
		sp.graphics.clear();
		sp.graphics.lineStyle(3,0x69c1ff);
		sp.graphics.moveTo(mp.x,mp.y);
		sp.graphics.lineTo(lp.x,lp.y);
		sp.graphics.endFill();
	}
	private refreshTextColor(num:number):void{
		if(num < 10){
			this.num.textColor = 0xfc3434;
		}else{
			this.num.textColor = 0xE6D8B3;
		}
		
	}
}