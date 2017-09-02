class SkillEffect extends egret.Sprite{
	public constructor() {
		super();
		this.initView();
	} 
	private effectCon:egret.Sprite;
	private effect1:MovieClip;
	private effect2:MovieClip;
	private effect3:MovieClip;
	private targetX:number;
	private targetY:number;
	private hasEffect2:boolean;
	private hasEffect3:boolean;
	private look:number;
	public direct:number;
	private play1Com:boolean=false;
	private play2Com:boolean=false;

	private initView():void{
		this.effectCon=new egret.Sprite();
		this.addChild(this.effectCon);
		this.effect1=new MovieClip();
		this.effect2=new MovieClip();
		this.effect3=new MovieClip();
		this.effect1.addEventListener(egret.Event.CHANGE,()=>{this.addChild(this.effect1);this.effect1.startPlay(0);},this);
		this.effect2.addEventListener(egret.Event.CHANGE,()=>{this.playEffect2();},this);
		this.effect3.addEventListener(egret.Event.CHANGE,()=>{this.playEffect3();},this);
	}



	public createSkill(skillId:string,sex:number,look:number=5,targetX:number=0,targetY:number=0):void{
			
		this.play1Com=true;
		this.play2Com=true;
		

		this.targetX=targetX;
		this.targetY=targetY;
		this.look=look;

		var c:data.SkillTemple=temple.TempleManager.select(parseInt(skillId)) as data.SkillTemple;
		var model1:number=sex==1?c.skillResIdMan:c.skillResIdLady;
		var modelFly:number=c.skillResIdFly;
		var modelRock:number=c.skillResIdRock;

		switch (c.skill_category){
			case 101:
			case 102:
			case 103:
			case 104:
			case 105:
				this.loadSkill(model1+"_a_"+look);
				break;
			case 201:
				this.loadSkill(model1+"_a_"+5,modelFly+"_a_"+5,modelRock+"_a_"+5);
				break;
			case 202:
				this.loadSkill(model1+"_a_"+5,null,modelRock+"_a_"+5);
				break;
			case 203:
			case 204:
				this.loadSkill(model1+"_a_"+5);
				break;
			case 205:
				this.loadSkill(model1+"_a_"+5,null,modelRock+"_a_"+5);
				break;
			case 301:
				this.loadSkill(model1+"_a_"+5,modelFly+"_a_"+5,modelRock+"_a_"+5);
				break;
			case 302:
				this.loadSkill(model1+"_a_"+5,null,modelRock+"_a_"+5);
				break;
			case 303:
				this.loadSkill(model1+"_a_"+5,null,modelRock+"_a_"+5);
				break;
			case 304:
			case 305:
				this.loadSkill(model1+"_a_"+5);
				break;


			
			// case "110001":
			// 	this.loadSkill(this.arr1[this.effIndex]+"_a_"+look);
			// 	break;
		
			// default:
			// 	var arr=skillId=="210001"?this.arr2:this.arr3;
			// 	var id=arr[this.effIndex].id;
			// 	var num=arr[this.effIndex].num;
			// 		switch (num) {
			// 			case 1:
			// 				this.loadSkill(id+"0_a_"+5);
			// 				break;
			// 			case 2:
			// 				this.loadSkill(id+"0_a_"+5,null,id+"1_a_"+5);
			// 				break;
			// 			case 3:
			// 				this.loadSkill(id+"0_a_"+5,id+"1_a_"+5,id+"2_a_"+5);
			// 				break;
					
			// 			default:
			// 				break;
			// 		}

			// 	break;
		}
	}
	private loadSkill(name1:string=null,name2:string=null,name3:string=null):void{
		
		this.hasEffect2=name2?true:false;
		this.hasEffect3=name3?true:false;
		if(name1){
			this.play1Com=false;
			this.play2Com=false;
			this.effect1.loadFile(Config.path_effectMc+name1,false,1,()=>{
				this.play1Com=true;
				if(this.hasEffect2){
					this.playEffect2();
					return;
				}else if(this.hasEffect3){
					this.play2Com=true;
					this.playEffect3();
					return;
				}
				this.removeSkill();
				return;
			},this);
		}
		if(name2){
			this.play2Com=false;
			this.effect2.loadFile(Config.path_effectMc+name2,false,-1,()=>{},this);
		}
		if(name3){
			this.effect3.loadFile(Config.path_effectMc+name3,false,1,()=>{
				this.removeSkill();return;},this);
		}
	}
	private playEffect1():void{

	}
	private playEffect2():void{
		if(!this.play1Com){
			return
		}
		this.removeChildren();
		this.addChild(this.effect2);
		this.effect2.y=-60;
		var rotation=(this.look-1)*45;
		this.effect2.rotation=rotation;
		this.effect2.startPlay(0);
		egret.Tween.get(this.effect2).to({x:this.targetX,y:this.targetY-60},100).call(()=>{if(this.hasEffect3){	this.play2Com=true;this.playEffect3();	return;}
		this.removeSkill();return;});
	}
	private playEffect3():void{
		if(!this.play2Com){
			return
		}
		this.removeChildren();
		this.addChild(this.effect3);
		this.effect3.x=this.targetX;
		this.effect3.y=this.targetY;
		this.effect3.startPlay(0);
		
	}

	private removeSkill():void{
		this.removeChildren();
		this.dispatchEventWith("skillPlayCom");
	}

}