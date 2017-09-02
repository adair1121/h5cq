class Forging_DataUtil{
	public constructor() {
	}
	public static getQiangHuaData(arr:Array<any>,job:number):Array<any>{
		var arr1:Array<any>=[];

		for(var i:number=0;i<arr.length;i++){
			var any:any={};
			var temp:data.StrengthenTemple=temple.TempleManager.select(arr[i].value) as data.StrengthenTemple;
			if(temp.nextID!=0){
				var tempNext:data.StrengthenTemple=temple.TempleManager.select(temp.nextID) as data.StrengthenTemple;
				any.n_attrVal=tempNext.Attr;
			}else{
				any.n_attrVal=temp.Attr;
			}
			
			any.equipIntensify=temp.lev;
			any.itemNum=temp.itemNum;
			any.itemID=temp.itemID;
			any.FightValue=temp.FightValue;

			switch (job) {
				case 1:
					any.attrType=temp.AttrEnum;
					any.attrVal=temp.Attr;		
					// any.n_attrVal=tempNext.Attr;
					break;
				case 2:
					any.attrType=temp.AttrEnum;
					any.attrVal=temp.Attr;		
					// any.n_attrVal=tempNext.Attr;
					break;
				case 3:
					any.attrType=temp.AttrEnum;
					any.attrVal=temp.Attr;		
					// any.n_attrVal=tempNext.Attr;	
					break;
			
				default:
					break;
			}
			
			var str:string;
			switch (arr[i].index) {
				case 0:
					str="d_e_001";
					break;
				case 1:
					str="d_e_002";
					break;
				case 2:
					str="d_e_003";
					break;
				case 3:
					str="d_e_004";
					break;
				case 4:
					str="d_e_005";
					break;
				case 5:
					str="d_e_005";
					break;
				case 6:
					str="d_e_006";
					break;
				case 7:
					str="d_e_006";
					break;
			
				default:
					break;
			}
			any.equipSource=Config.path_default_equip+str+".png";
			arr1.push(any);
		}
		return arr1
	}


	public static getGemData(arr:Array<any>):Array<any>{
		var arr1:Array<any>=[];
		for(var i:number=0;i<arr.length;i++){
			var any:any={};
			var temp:data.StrengthenTemple=temple.TempleManager.select(arr[i].value) as data.StrengthenTemple;
			
			any.lev=temp.lev;
			any.itemNum=temp.itemNum;
			any.attrType=temp.AttrEnum;
			any.attrVal=temp.Attr;	
			any.equipIntensify=temp.lev;
			any.itemID=temp.itemID;
			any.FightValue=temp.FightValue;
			any.systemType = temp.systemType;
				
			
			var str:string;
			switch (arr[i].index) {
				case 0:
					str="d_e_001";
					break;
				case 1:
					str="d_e_002";
					break;
				case 2:
					str="d_e_003";
					break;
				case 3:
					str="d_e_004";
					break;
				case 4:
					str="d_e_005";
					break;
				case 5:
					str="d_e_005";
					break;
				case 6:
					str="d_e_006";
					break;
				case 7:
					str="d_e_006";
					break;
			
				default:
					break;
			}
			any.equipSource=Config.path_default_equip+str+".png";
			arr1.push(any);
		}
		return arr1
	}

	public static getZhulingData(arr:Array<any>):Array<any>{
		var arr1:Array<any>=[];
		for(var i:number=0;i<arr.length;i++){
			var any:any={};
			var temp:data.StrengthenTemple=temple.TempleManager.select(arr[i].value) as data.StrengthenTemple;
			if(temp.nextID!=0){
				var tempNext:data.StrengthenTemple=temple.TempleManager.select(temp.nextID) as data.StrengthenTemple;
				any.n_attrVal=tempNext.Attr;
			}else{
				any.n_attrVal=temp.Attr;
			}
			
			any.equipIntensify=temp.lev;
			any.itemNum=temp.itemNum;
			any.attrType=temp.AttrEnum;
			any.attrVal=temp.Attr;	
			any.itemID=temp.itemID;
			any.FightValue=temp.FightValue;
			any.systemType = temp.systemType;
			
			var str:string;
			switch (arr[i].index) {
				case 0:
					str="d_e_001";
					break;
				case 1:
					str="d_e_002";
					break;
				case 2:
					str="d_e_003";
					break;
				case 3:
					str="d_e_004";
					break;
				case 4:
					str="d_e_005";
					break;
				case 5:
					str="d_e_005";
					break;
				case 6:
					str="d_e_006";
					break;
				case 7:
					str="d_e_006";
					break;
			
				default:
					break;
			}
			any.equipSource=Config.path_default_equip+str+".png";
			arr1.push(any);
		}
		return arr1
	}
}