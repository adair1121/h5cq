class MapUnit_Role extends Base_MapUnit{
	public constructor() {
		super();
	}
	private role:RoleMc;
	private effect:egret.Sprite;
	private buffCon:egret.Sprite;
	private labelCon:egret.Sprite;
	private buffList:Dictionary;
	private labelDict:Dictionary;
	private _direct : number=0;
	private _state : string;
	private effectPlaying:boolean;
	private isCreated:boolean;
	private curMc:string;
	private weaponId:string="50000";

	public roleInfo:proto.Client_RoleInfo;
	public gx:number;
	public gy:number;
	public range:Dictionary;
	public insId:string;
	
	
	
	public setRoleInfo(job,roleAttr,roleEquip = ""):void{
		this.isCreated=false;
		
		this.job=job;

		this.role=new RoleMc();
		this.addChild(this.role);
		this.role.roleAttr=roleAttr;
		this.role.job = this.job;
		this.role.roleEquip = roleEquip;
		this.direct=5;
		this.state=MapUnitState.STAND;
		this.role.changeMc();

		this.effect=new egret.Sprite();
		this.addChild(this.effect);
	
		this.buffCon=new egret.Sprite();
		this.addChild(this.buffCon);

		this.labelCon = new egret.Sprite();
		this.addChild(this.labelCon);

		this.buffList=new Dictionary("roleUnitBuffList");

		this.labelDict = new Dictionary("roleUnitLabelList");

		this.isCreated=true;

		// this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			
		// 	switch (DataCenter.role1InfoVO_out.job) {
		// 		case 1:
		// 			this.skillIndex=this.skillIndex>=6?0:this.skillIndex+1;
		// 			break;
		// 		case 2:
		// 			this.skillIndex=this.skillIndex>=4?0:this.skillIndex+1;
		// 			break;
		// 		case 3:
		// 			this.skillIndex=this.skillIndex>=4?0:this.skillIndex+1;
		// 			break;
			
		// 		default:
		// 			break;
		// 	}
		// },this);



	}

	
	public attack(action:proto.UseSkill):void{
		if(action.look && action.look!=0){
			this.direct=action.look;
		}
		this.state=MapUnitState.ATTACK;
		this.role.changeMc();
		this.addEffect(action.skillID+"",action.targetX,action.targetY);
	}
	public cast(action:proto.UseSkill):void{
		if(action.look!=0){
			this.direct=action.look;
		}
		
		this.state=MapUnitState.CAST;
		this.role.changeMc();
		this.addEffect(action.skillID+"",action.targetX,action.targetY);
		
	}
	public move(look:number,state:string,times:number=-1):void{
		this.direct=look;
		this.state=state;
		this.role.changeMc(times);
	}
	public changeStand():void{
		this.state=MapUnitState.STAND;
		this.role.changeMc();
	}

	// private skillIndex:number=0;
	/**
	 * 添加特效 
	 */
	public addEffect(effectName:string,tx:number=0,ty:number=0):void{
		// if(this.effectPlaying){
		// 	return;
		// }
		// this.effectPlaying=true;
		var dir:number;
		var scale:number;
		if (this.direct == 6) {
			dir = 4, scale = -1
		} else if (this.direct == 7) { 
			dir = 3, scale = -1 
		} else if (this.direct == 8) { 
			dir = 2, scale = -1 
		} else {  
			dir = this.direct, scale = 1
		}
		var p=PosUtils.gridToPixel(tx,ty);
		
		if(this.job>1){
			scale=1;
		}
		
		
		
		var mc:SkillEffect=new SkillEffect();
		// mc.effIndex=this.skillIndex;
		// mc.addEventListener("addBuff",(event:egret.Event)=>{
		// 	this.addBuff(event.data);
		// },this);
		mc.addEventListener("skillPlayCom",()=>{
			this.effect.removeChild(mc);
			// this.effectPlaying=false;;
		},this);
		// mc.createSkill(effectName,DataCenter.role1InfoVO_out.job,dir,p.x-this.x,p.y-this.y);
		mc.createSkill(effectName,this.job,dir,p.x-this.x,p.y-this.y);
		
		this.effect.addChild(mc);

		mc.scaleX=scale;
		
		
		

	}


	public  addBuff(buffId:number[]):void{
		for(var i:number = 0;i<buffId.length;i++){
			var temp:data.BuffTemple=temple.TempleManager.select(buffId[i]) as data.BuffTemple;

			var buff:MovieClip = new MovieClip();
			this.buffCon.addChild(buff);		
			buff.loadFile(Config.path_buffMc+temp.EffectResId+"_a_5",true);
			this.buffList.add(buffId[i]+"",buff);
		}
	}
	/**添加buff效果展示 */
	public addBuffShowInfo(showInfo:number,id:number[]):void{
		for(var i:number = 0;i<id.length;i++){
			var labelFamily:string = "";
			var txt:eui.BitmapLabel=new eui.BitmapLabel();
			if(showInfo>0){
				labelFamily ="greenFont_fnt";
			}else{
				labelFamily ="redFont_fnt";
			}
			txt.font=RES.getRes(labelFamily);
			txt.text=Math.abs(showInfo)+"";
			// txt.text=damageInfo.showInfo>=0?"+"+damageInfo.showInfo:"-"+(-damageInfo.showInfo);
			this.labelCon.addChild(txt);
			// txt.x=this.buffCon.x;
			// txt.y=unit.y - unit.height
			this.labelDict.add(id[i]+"",txt);
			var yy:number = txt.y;
			this.up(txt,yy);
		}
	}
	private up(txt:eui.BitmapLabel,yy:number):void{
		egret.Tween.get(txt).to({y:yy-120},1000,egret.Ease.circOut).to({alpha:0},500).call(()=>{
			egret.Tween.removeTweens(txt);
			txt.y = yy;
			txt.alpha = 1;
			this.up(txt,yy)
		},this);
	}
	/**移除单项buff效果文字展示 */
	public removeOneBuffShowInfo(id:number[]):void{
		for(var i:number = 0;i<id.length;i++){
			if(this.labelDict.hasKey(id[i]+"")){
				if(this.labelCon.contains(this.labelDict.get(id[i]+""))){
					this.labelCon.removeChild(this.labelDict.get(id[i]+""));
				}
				this.labelDict.remove(id[i]+"");
			}
		}
		
	}
	/**清除全部buff效果文字展示 */
	public clearBuffShowInfo():void{
		this.labelCon.removeChildren();
		this.labelDict.clear();
	}
	/**清除buff列表中所有buff */
	public clearBuff():void{
		this.buffList.clear();
		this.buffCon.removeChildren();
	}
	/**清除某一项buff */
	public clearOnceBuff(buffId:number[]):void{
		for(var i:number = 0;i<buffId.length;i++){
			if(this.buffList.hasKey(buffId[i]+"")){
				if(this.buffCon.contains(this.buffList.get(buffId[i]+""))){
					this.buffCon.removeChild(this.buffList.get(buffId[i]+""));
				}
				this.buffList.remove(buffId[i]+"");
			}
		}
		
	}
	// public setBuff(buffInfo:proto.BuffEffect):void{
	// 	switch (buffInfo.type) {
	// 		case 0:
	// 			this.removeBuff(buffInfo.buffId);
	// 			break;
	// 		case 1:
	// 			// this.removeBuff();
	// 			break;
			
		
	// 		default:
	// 			break;
	// 	}
	// }
	private removeBuff(buffId:number):void{
		var buff:egret.MovieClip=this.buffList.get(buffId+"");
		this.buffCon.removeChild(buff);
		this.buffList.remove(buffId+"");
	}

	private destory():void{
		this.removeChild(this.role);
		this.role=null;
	}

	/**朝向 */
	public get direct() : number {		return this._direct;	}
	public set direct(v : number) {		this._direct = v;	if(this.role)this.role.diret=v}
	/**状态 */
	public get state() : string {		return this._state;	}
	public set state(v : string) {		this._state = v;  if(this.role)this.role.state=v;	}
	
}
class RoleMc extends egret.Sprite{
	public constructor() {
		super();
		
		this.initView();
	}
	private role:MovieClip;
	private weapon:MovieClip;
	private wing:MovieClip;
	private shadow:MovieClip;
	
	private _state : string;
	private _diret : number;	
	
	private _isAttack : boolean;

	
	private _roleAttr : number[];
	private _job:number;
	private _roleEquip:any;
	public get roleAttr() : number[] {
		return this._roleAttr;
	}
	public set roleAttr(v : number[]) {
		this._roleAttr = v;
	}
	public get job() : number {
		return this._job;
	}
	public set job(v : number) {
		this._job = v;
	}
	public get roleEquip() : any {
		return this._roleEquip;
	}
	public set roleEquip(v : any) {
		this._roleEquip = v;
	}
	
	

	private changeRoleing:boolean;
	private changeWeaponing:boolean;
	private changeWinging:boolean;
	private changeShadowing:boolean;
	

	private rolePath:string;
	private weaponPath:string;
	private shadowPath:string;
	private wingPath:string;

	private initView():void{
		this.role=new MovieClip();
		this.weapon=new MovieClip();
		this.wing=new MovieClip();
		this.shadow=new MovieClip();

		this.addChild(this.shadow);
		this.addChild(this.role);
		this.addChild(this.weapon);
		this.addChild(this.wing);
	}

	public changeMc(times:number=-1):void{
		this.changeCloth(times);
		this.changeWeapon(times);
		this.changeShadow(times);
		this.changeWing(times);
	}
	private changeShadow(times:number=-1):void{
		if(!this.state||!this.diret){
			
			return;
		}
		this.changeShadowing=true;
		var path:string;
		
		
		var shadowPath=Config.path_shadowMc+"_"+this.state+"_"+this.diret;

		path=Config.path_shadowMc+"_"+this.state+"_"+this.diret;
		if(this.shadowPath==shadowPath){
			if(this.state==MapUnitState.RUN||this.state==MapUnitState.STAND){
				return;
			}else{
				this.play();
			}
		}
		this.shadowPath=shadowPath;
		this.shadow.addEventListener(egret.Event.CHANGE,()=>{
			this.changeShadowing=false;this.play();},this);
		this.shadow.loadFile(path,true,times==-1?this.playCount():times,this.mcPlayCom,this);
	}
	private changeWing(times:number=-1):void{
		if(!this.state||!this.diret){
			
			return;
		}
		this.changeWinging=true;
		var path:string;
		var dir:number;
		var scale:number;
		if (this.diret == 6) {
			dir = 4, scale = -1
		} else if (this.diret == 7) { 
			dir = 3, scale = -1 
		} else if (this.diret == 8) { 
			dir = 2, scale = -1 
		} else {  
			dir =this.diret, scale = 1
		}


		if(this.diret>=4&&this.diret<=6){
			this.setChildIndex(this.wing,1);
		}else{
			this.setChildIndex(this.wing,3);
		}
		var temp:data.WingsTemple;
		if(DataCenter.wingFashionState){
			temp=temple.TempleManager.select(DataCenter.curWingFashionId) as data.WingsTemple;
		}else{
			temp=temple.TempleManager.select(this.roleAttr[data.RoleAttr.wingsID]) as data.WingsTemple
		}
		try{
			temp.maleResId
		}catch(err){
			console.log("翅膀temple不存在==查询id==》"+this.roleAttr[data.RoleAttr.wingsID]);
			return;
		}
		var wingPath=temp.maleResId+"_"+this.state+"_"+this.diret;
		// path=Config.path_wingMc+ DataCenter.role1InfoVO_out.wingsId_out+"_"+this.state+"_"+dir;
		path=Config.path_wingMc+ temp.maleResId+"_"+this.state+"_"+dir;
		if(this.wingPath==wingPath){
			if(this.state==MapUnitState.RUN||this.state==MapUnitState.STAND){
				return;
			}else{
				this.play();
			}
		}
		this.wingPath=wingPath
		this.wing.addEventListener(egret.Event.CHANGE,()=>{
			this.changeWinging=false;this.play();},this);
		this.wing.loadFile(path,true,times==-1?this.playCount():times,this.mcPlayCom,this);
		
		this.wing.scaleX=scale;
	}
	private changeCloth(times:number=-1):void{
		if(!this.state||!this.diret){
			
			return;
		}
		this.changeRoleing=true;
		var path:string;
		var dir:number;
		var scale:number;
		if (this.diret == 6) {
			dir = 4, scale = -1
		} else if (this.diret == 7) { 
			dir = 3, scale = -1 
		} else if (this.diret == 8) { 
			dir = 2, scale = -1 
		} else {  
			dir =this.diret, scale = 1
		}

		var modelId:number;
		var temp:data.ItemTemple;
		if(DataCenter.roleFashionState){
			temp=temple.TempleManager.select(DataCenter.curRoleFahsionId) as data.ItemTemple;
			try{
				modelId = this.roleAttr[data.RoleAttr.sex]==1?temp.maleResId:temp.femaleResId;
			}catch(err){
				console.log(DataCenter.curRoleFahsionId+'>>>>此人物时装id 在物品表不存在 或资源不存在');
			}
		}else{
			var clothsId=this.roleEquip.clothId;
			if(clothsId){
				temp=temple.TempleManager.select(clothsId) as data.ItemTemple;
				modelId=this.roleAttr[data.RoleAttr.sex]==1?temp.maleResId:temp.femaleResId;
			}else{
				modelId=this.roleEquip.initClothId;
			}
		}
		var rolePath=modelId+"_"+this.state+"_"+this.diret;
		path=Config.path_roleMc+ modelId+"_"+this.state+"_"+dir;
		console.log("=========================>外观衣服路径"+path + "模板id=======>"+clothsId);
		if(this.rolePath==rolePath){
			if(this.state==MapUnitState.RUN||this.state==MapUnitState.STAND){
				return;
			}else{
				this.play();
			}
		}
		this.rolePath=rolePath
		this.role.addEventListener(egret.Event.CHANGE,()=>{
			this.changeRoleing=false;this.play();},this);
		this.role.loadFile(path,true,times==-1?this.playCount():times,this.mcPlayCom,this);
		
		this.role.scaleX=scale;
	}
	private changeWeapon(times:number=-1):void{
		if(!this.state||!this.diret){
			
			return;
		}
		this.changeWeaponing=true;
		var path:string;
		var dir:number;
		var scale:number;
		if (this.diret == 6) {
			dir = 4, scale = -1
		} else if (this.diret == 7) { 
			dir = 3, scale = -1 
		} else if (this.diret == 8) { 
			dir = 2, scale = -1 
		} else {  
			dir =this.diret, scale = 1
		}

		var modelId:number;
		var temp:data.ItemTemple;
		if(DataCenter.weaponFashionState){
			temp=temple.TempleManager.select(DataCenter.weaponFashionId) as data.ItemTemple;
			try{
				modelId=this.roleAttr[data.RoleAttr.sex]==1?temp.maleResId:temp.femaleResId;	
			}catch(err){
				console.log(DataCenter.weaponFashionId+'>>>>此武器时装id 在物品表不存在 或资源不存在');
			}
		}else{
			var weaponId=this.roleEquip.weaponId;
			if(weaponId){
				temp=temple.TempleManager.select(weaponId) as data.ItemTemple;
				modelId=this.roleAttr[data.RoleAttr.sex]==1?temp.maleResId:temp.femaleResId;
			}else{
				modelId=this.roleEquip.initWeaponId;
			}
		}
		
		var weaponPath=modelId+"_"+this.state+"_"+this.diret;

		path=Config.path_weaponMc+ modelId+"_"+this.state+"_"+dir;
		console.log("=========================>外观武器路径"+path + "模板id=======>"+weaponId);
		if(this.weaponPath==weaponPath){
			if(this.state==MapUnitState.RUN||this.state==MapUnitState.STAND){
				return;
			}else{
				this.play();
			}
		}
		this.weaponPath=weaponPath
		this.weapon.addEventListener(egret.Event.CHANGE,()=>{
			this.changeWeaponing=false;this.play();},this);
			
		this.weapon.loadFile(path,true,times==-1?this.playCount():times,this.mcPlayCom,this);
		this.weapon.scaleX=scale;
	}
   
	public play():void{
		if(!this.changeRoleing&&!this.changeWeaponing&&!this.changeShadowing&&!this.changeWinging){
			this.role.gotoAndPlay(0);
			this.weapon.gotoAndPlay(0);
			this.wing.gotoAndPlay(0);
			this.shadow.gotoAndPlay(0);
		
		}
	}
	private mcPlayCom():void{
		if(this.state==MapUnitState.ATTACK||this.state==MapUnitState.CAST){
			this.state=MapUnitState.STAND;
			this.changeMc();
		}
	}

	private playCount():number{
		// return 1;
		return this.state==MapUnitState.ATTACK||this.state==MapUnitState.CAST?1:-1
	}




	public get state() : string {		return this._state;	}
	public set state(v : string) {		this._state = v;	}

	public get diret() : number {		return this._diret;	}
	public set diret(v : number) {		this._diret = v;	}

	public get isAttack() : boolean {		return this._isAttack;	}
	public set isAttack(v : boolean) {		this._isAttack = v;	}

	

	
}

