class MapUnit_Drop extends Base_MapUnit{
	private state:string;
	private _dropId:number;
	private isCreated:boolean;
	private qualityColor:any = {};
	public eName:string;
	public quality:number;
	public gx:number;
	public gy:number;
	public constructor() {
		super();
		this.qualityColor = DataCenter.bag.qualityColor
		this.state=MapUnitState.STAND;
	}
	public setDropInfo(dropInfo:proto.Client_DropInfo):void{
		this.isCreated = false;
		var template:data.ItemTemple = temple.TempleManager.select(dropInfo.templeID) as data.ItemTemple;
		this._dropId = template.dropIcon;
		this.quality = template.itemQuality;
		this.eName = template.name;
		var configPath:string = Config.path_drop;
		var obj:any = {quality:this.quality,label:this.eName,tid:dropInfo.templeID}
		if(template.itemtype2 === data.ItemType.money){
			//金币
			configPath = Config.path_goods;
			obj.num = dropInfo.num;
			obj.type = TipsEnum.TYPE_GOLD;
			obj.quality = 4;
		}else{
			obj.num = 1;
			obj.type = TipsEnum.TYPE_EQUIP;
			configPath = Config.path_equip;
		}
		DataCenter.bag.curDropGroup.push(obj);
		if(AssetsManager.getAsset(this._dropId+"") == null){
			var dict = AssetsManager.loadAssetsQueue([this._dropId+""],this.loadEquipRes,configPath,this);
		}else{
			this.loadEquipRes();
		}
	}
	private loadEquipRes():void{
		var dropEquip:egret.Bitmap = new egret.Bitmap(AssetsManager.getAsset(this._dropId+""));
		var label:eui.Label = new eui.Label();
		label.size = 12;
		label.fontFamily = "SimHei";
		// label.bold = true;
		label.textAlign = egret.HorizontalAlign.CENTER;
		label.textColor = this.qualityColor[this.quality];
		label.stroke = 1;
		label.strokeColor = 0x000000;
		dropEquip.scaleX = dropEquip.scaleY = 0.6;
		this.addChild(dropEquip);
		this.addChild(label);
		label.text = this.eName;
		label.anchorOffsetX = label.width >>1;
		dropEquip.anchorOffsetX = dropEquip.width >>1;
		dropEquip.anchorOffsetY = dropEquip.height >> 1;
		this.isCreated = true;
		label.y = dropEquip.y -((dropEquip.height*0.6)>>1) - label.height +5;
	}
	public get dropId():number{
		return this._dropId;
	}
}