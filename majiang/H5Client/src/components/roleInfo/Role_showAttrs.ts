class Role_showAttrs extends eui.Component {
	public constructor() {
		super();
		this.skinName="Role_showAttrs_skin"
	}
	public attrs:eui.Group;
	public btn_next:eui.Image;
	public btn_prev:eui.Image;
	public txt_hp:eui.Label;
	public txt_mp:eui.Label;
	public txt_atk:eui.Label;
	public txt_def:eui.Label;
	public txt_mdef:eui.Label;
	public txt_critial:eui.Label;
	public txt_critcoe:eui.Label;
	public txt_resicritial:eui.Label;
	public txt_mbChan:eui.Label;
	public txt_mbResi:eui.Label;
	public txt_drd:eui.Label;
	public returnBtn:eui.Image;
	public img_title:eui.Image;

	private currentIndex:number=0;
	private currentRoleData:proto.Client_RoleInfo;
	private startX:number;
	protected childrenCreated():void{
		this.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBtnClick,this);
		this.btn_prev.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBtnClick,this);
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onGroupTouchBegin,this);
		this.returnBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onReturn,this)
		this.setBtnVisible();
		this.changeData();
	}

	private onGroupTouchBegin(event:egret.TouchEvent):void{
		this.startX=event.stageX;
		this.addEventListener(egret.TouchEvent.TOUCH_END,this.onGroupTouchEnd,this);
	}
	private onGroupTouchEnd(event:egret.TouchEvent):void{
		this.removeEventListener(egret.TouchEvent.TOUCH_END,this.onGroupTouchEnd,this);
		if(Math.abs(event.stageX - this.startX) < 80){
			return;
		}
		var isLeft:boolean=event.stageX>this.startX?false:true;
		if(isLeft&&this.currentIndex>=DataCenter.roleAttrsArr.length-1){
			return;
		}else if(!isLeft&&this.currentIndex<=0){
			return;
		}


		if(this.currentIndex<0){
			this.currentIndex=0;
		}
		if(this.currentIndex>DataCenter.roleAttrsArr.length-1){
			this.currentIndex=DataCenter.roleAttrsArr.length-1;
		}
		this.moveData(isLeft);
		this.setBtnVisible();
	}
	private onReturn(evt:egret.TouchEvent):void{
		PopUpManager.removePopUp(this.skinName,0);
	}
	private onBtnClick(event:egret.TouchEvent):void{
		var isLeft:boolean;
		switch (event.target) {
			case this.btn_next:
				this.currentIndex++;
				isLeft=true;
				break;
			case this.btn_next:
				this.currentIndex--;
				isLeft=false;
				break;
		
			default:
				break;
		}
		if(this.currentIndex<0){
			this.currentIndex=0;
		}
		if(this.currentIndex>DataCenter.roleAttrsArr.length-1){
			this.currentIndex=DataCenter.roleAttrsArr.length-1;
		}
		this.moveData(isLeft);
		this.setBtnVisible();
	}

	private setBtnVisible():void{
		var num=DataCenter.roleAttrsArr.length;
		this.btn_next.visible=false;
		this.btn_prev.visible=false;
		this.btn_next.touchEnabled = false;
		this.btn_prev.touchEnabled = false;
		if(num>1){
			if(this.currentIndex>0){
				this.btn_prev.visible=true;
				this.btn_prev.touchEnabled = true;
			}else if(this.currentIndex<num-1){
				this.btn_next.visible=true;
				this.btn_next.touchEnabled = true;
			}
		}
		
	}

	private moveData(isLeft:boolean):void{
		var toX:number;
		var fromX:number;
		var endX:number=200;
		if(isLeft){
			toX=0;
			fromX=400;
		}else{
			toX=400;
			fromX=0;
		}

		egret.Tween.get(this.attrs).to({x:toX,alpha:0},500,egret.Ease.cubicIn).call(()=>{
			this.changeData();
			this.attrs.x=fromX;
			egret.Tween.get(this.attrs).to({x:endX,alpha:1},500,egret.Ease.cubicOut).call(()=>{
				egret.Tween.removeTweens(this.attrs)
			},this)
		},this)
	}
	private changeData():void{
		this.currentRoleData=DataCenter.roleAttrsArr.get(DataCenter.roleList[this.currentIndex].job);

		this.img_title.source="role_attr_title_"+this.currentRoleData.job+"_png";

		this.txt_hp.text=this.currentRoleData[data.RoleAttr.HP] + "";
		this.txt_mbChan.text=this.currentRoleData[data.RoleAttr.palsyRate]+"";
		this.txt_mbResi.text=this.currentRoleData[data.RoleAttr.resiPalsy]+"";
		this.txt_mdef.text=this.currentRoleData[data.RoleAttr.MDEF]+"";
		this.txt_mp.text=this.currentRoleData[data.RoleAttr.MP]+"";
		this.txt_resicritial.text=this.currentRoleData[data.RoleAttr.resicritial]+"";
		this.txt_drd.text=this.currentRoleData[data.RoleAttr.DRD]+"";
		this.txt_def.text=this.currentRoleData[data.RoleAttr.DEF]+"";
		this.txt_critial.text=this.currentRoleData[data.RoleAttr.critial]+"";
		this.txt_critcoe.text=this.currentRoleData[data.RoleAttr.critcoe]+"";
		this.txt_atk.text=this.currentRoleData[data.RoleAttr.ATK]+"";
	}
}