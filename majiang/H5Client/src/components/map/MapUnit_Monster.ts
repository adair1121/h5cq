class MapUnit_Monster extends Base_MapUnit{
	public constructor() {
		super();
		this.state=MapUnitState.STAND;
		this.buffList = new Dictionary("monsterBuffList");
		this.labelDict = new Dictionary("monsterLabelDict");
	}
	private mon:MonsterMc;
	private modelId:number;
	private _direct : number=0;
	private _state : string;
	private buff:egret.Sprite;
	private isCreated:boolean;
	private labelCon:egret.Sprite;
	private labelDict:Dictionary;
	private curMc:string;
	public gx:number;
	public gy:number;
	public insId:string;
	public moveStep:number;
	private buffList:Dictionary;

	public setMonsterInfo(temleId:number):void{
		this.isCreated=false;
		
		this.mon=new MonsterMc();
		this.addChild(this.mon);
		this.direct=5;
		this.state=MapUnitState.STAND;
		this.modelId=temleId;
		var c:data.UnitTemple=temple.TempleManager.select(temleId) as data.UnitTemple;
		

		this.mon.monId=c.model+"";
		this.isCreated=true;

		this.changeStand();

		this.buff=new egret.Sprite();
		this.addChild(this.buff);

		this.labelCon = new egret.Sprite();
		this.addChild(this.labelCon);

	}
	public attack(action:proto.UseSkill):void{
		this.direct=action.look;
		this.state=MapUnitState.ATTACK;
		this.mon.changeMc();
	}
	public move(look:number = -1,state:string = ""):void{
		if(look!= -1){
			this.direct=look;
		}
		if(state){
			this.state=state;
		}
		this.mon.changeMc();
	}
	public changeStand():void{
		this.state=MapUnitState.STAND;
		this.mon.changeMc();
	}

	public  addBuff(buffId:number[]):void{
		for(var i:number = 0;i<buffId.length;i++){
			var buff:MovieClip = new MovieClip();;
			var buffTemplate:data.BuffTemple = temple.TempleManager.select(buffId[i]) as data.BuffTemple;
			var effectId:number = buffTemplate.EffectResId;
			this.buff.addChild(buff);
			buff.loadFile(Config.path_buffMc+effectId+"_a_5",true);
			this.buffList.add(buffId[i]+"",buff);
		}
		// buff.addEventListener(egret.Event.CHANGE,()=>{
		// 	buff.gotoAndStop(buff.totalFrames)
		// },this);
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
				if(this.contains(this.labelDict.get(id[i]+""))){
					this.removeChild(this.labelDict.get(id[i]+""));
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
		this.buff.removeChildren();
	}
	/**清除某一项buff */
	public clearOnceBuff(buffId:number[]):void{
		for(var i:number = 0;i<buffId.length;i++){
			if(this.buffList.hasKey(buffId[i]+"")){
				if(this.buff.contains(this.buffList.get(buffId[i]+""))){
					this.buff.removeChild(this.buffList.get(buffId[i]+""));
				}
				this.buffList.remove(buffId[i]+"");
			}
		}
		
	}

	/**朝向 */
	public get direct() : number {		return this._direct;	}
	public set direct(v : number) {		this._direct = v;	if(this.mon)this.mon.diret=v}
	/**状态 */
	public get state() : string {		return this._state;	}
	public set state(v : string) {		this._state = v=="c"?"a":v;  if(this.mon)this.mon.state=v}
}   


class MonsterMc extends egret.Sprite{
	public constructor() {
		super();
		
		this.initView();
	}
	private mon:MovieClip;
	
	private _state : string;
	private _diret : number;	

	private changeMoning:boolean;

	private monPath:string;
	private weaponPath:string;

	
	private _monId : string;
	
	

	private initView():void{
		this.mon=new MovieClip();

		this.addChild(this.mon);


		eui.Binding.bindHandler(this,["monId"],this.changeMon,this);
	}

	public changeMc():void{
		this.changeMon();
	}
	private changeMon():void{
		if(!this.state||!this.diret||!this.monId){
			return;
		}
		this.changeMoning=true;
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
		var monPath=this.monId+"_"+this.state+"_"+this.diret;
		// var monPath=31000+"_"+this.state+"_"+this.diret;
		path=Config.path_monMc+ this.monId+"_"+this.state+"_"+dir;
		// path=Config.path_monMc+ 31000+"_"+this.state+"_"+dir;
		if(this.monPath==monPath){
			if(this.state==MapUnitState.RUN||this.state==MapUnitState.STAND){
				return;
			}else{
				this.play();
			}
		}
		this.monPath=monPath
		this.mon.addEventListener(egret.Event.CHANGE,()=>{
			this.changeMoning=false;},this);
			
		this.mon.loadFile(path,true,this.playCount(),function(){
			this.state = MapUnitState.STAND;
			this.changeMon();
		},this);
		
		this.mon.scaleX=scale;
	}
	

	public play():void{
		if(!this.changeMoning){
			this.mon.gotoAndPlay(0);
			
		}
	}




	public get state() : string {		return this._state;	}
	public set state(v : string) {		if(this._state == v){return;}this._state = v;	}

	public get diret() : number {		return this._diret;	}
	public set diret(v : number) {		if(this._diret == v){return;}this._diret = v;	}

	public get monId() : string {		return this._monId;	}
	public set monId(v : string) {		this._monId = v;	}

	private playCount():number{
		return this.state==MapUnitState.ATTACK||this.state==MapUnitState.CAST?1:-1
	}

	
} 