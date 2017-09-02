module GlobalFunc {
	/**排序方式--从小到大 */
	export var NORMALIZE:string = "normalize";
	/**排序方式--从大道小 */
	export var REVERSE:string = "reverse";

	/**深复制 */
	export function deepCopy(source:any):any{
		var arr:any[] = [];
		for(var i:number = 0;i<source.length;i++){
			var result = {};
			for(var key in source[i]){
				result[key] = source[i][key]
			}
			arr.push(result);
		}
		return arr;
	}
	/**深复制字典 */
	export function deepCopyDict(source:Dictionary):Dictionary{
		var dic:Dictionary = new Dictionary("");
		for(var key in source.dict){
			var arr:any[] = GlobalFunc.deepCopy(source.dict[key]);
			dic.add(key,arr);
		}
		return dic;
	}
	export function setBgData(quality:number):any{
		var obj:any = {};
		if(quality != 1){
			obj.boxS = "bag_"+quality+"_box_png"
		}else{
			obj.boxS = "bag_1_box_png";
		}
		obj.color = DataCenter.bag.qualityColor[quality];
		return obj;
	}
	export function getPositionWord(pos:number):string{
		var cnt:string = "";
		switch(pos){
			case data.EquipPos.body:
				cnt = "衣服";
				break;
			case data.EquipPos.head:
				cnt = "头盔";
				break;
			case data.EquipPos.left_bracelet:
			case data.EquipPos.right_bracelet:
				cnt = "手镯";
				break;
			case data.EquipPos.left_ring:
			case data.EquipPos.right_ring:
				cnt = "戒指";
				break;
			case data.EquipPos.weapon:
				cnt = "武器";
				break;
			case data.EquipPos.neck:
				cnt = "项链";
				break;
		}
		return cnt;
	}
	export function getJobWord(job:number):string{
		var jobStr:string = "";
		switch(job){
			case data.JobAttr.Player:
				jobStr = "通用";
				break;
			case data.JobAttr.JS:
				jobStr = "战士";
				break;
			case data.JobAttr.FS:
				jobStr = "法师";
				break;
			case data.JobAttr.DS:
				jobStr = "道士";
				break;
		}
		return jobStr;
	}
	export function formatTipsInfo(attrId:number):string{
		var attrCnt:string;
		switch(attrId){
			case data.ItemAttr.ATK:
				attrCnt = "攻击: "
				break;
			case data.ItemAttr.MHP:
				attrCnt = "生命: ";
				break;
			case data.ItemAttr.DEF:
				attrCnt = "物防: ";
				break;
			case data.ItemAttr.MDEF:
				attrCnt = "魔防: ";
				break;
			case data.ItemAttr.MMP:
				attrCnt = "魔法: ";
				break;
		}
		return attrCnt;
	}
	//验证内容是否包含空格
	export function checkTextSpace(content,temp = 1){
		var reg=/(^\s+)|(\s+$)/g;
		//temp用来标识内容是否允许存在空格1为可存在0为不存在
		// if(temp==1){
			reg = /\s+/g;
		// }
		var content2:string = content.replace(reg,"");
		if(!content2){
			return false;
		}
		return true;
	}
	/**获取属性相关汉字描述 */
	export function getAttrWordEnum(attrId:number):any{
		var obj:any = {};
		switch(attrId){
			case data.PlayerAttr.money:
				obj.word = DataCenter.wordGather["money"];
				obj.color = ColorTipsEnum.COLOR_GOLD;
				break;
			case data.PlayerAttr.gold:
				obj.word = DataCenter.wordGather["gold"];
				obj.color = ColorTipsEnum.COLOR_GOLD;
				break;
			case data.PlayerAttr.exp:
				obj.word = DataCenter.wordGather["exp"];
				obj.color = ColorTipsEnum.COLOR_EXPERIENCE;
				break;
			case data.PlayerAttr.jx_zhenqi:
				obj.word = DataCenter.wordGather["jx_zhenqi"];
				obj.color = ColorTipsEnum.COLOR_DEFAULT;
				break;
			case data.PlayerAttr.xiuwei:
				obj.word = DataCenter.wordGather["xiuwei"];
				obj.color = ColorTipsEnum.COLOR_DEFAULT;
				break;
		}
		return obj;
	}
	/**读取单个属性 */
	export function searchAttrValue(searchId:number,searchSource:proto.AttrValue[]):number{
		for(var i:number = 0,len:number = searchSource.length,item:proto.AttrValue;i<len;i++){
			item = searchSource[i];
			if(searchId === item.attrID){
				return item.myvalue;
			}
		}
	}
	/**读取多个属性 */
	export function searchMoreAttrValue(searchIdList:number[],searchSource:proto.AttrValue[]):any{
		var obj:any = {};
		for(var j:number = 0,len2:number = searchIdList.length,id:number;j<len2;j++){
			id = searchIdList[j];
			for(var i:number = 0,len:number = searchSource.length,item:proto.AttrValue;i<len;i++){
				item = searchSource[i];
				if(item.attrID === id){
					obj[id] = item.myvalue;
					continue;
				}
			}
		}
		return obj;
	}
	/**排序规则 */
	export function sortRule(type:string,comparingValues:string,sourceCollection:any[]):any{
		var relationNum:number = 1;
		if(type === GlobalFunc.NORMALIZE){
			relationNum = 1;
		}else{
			relationNum = -1;
		}
		function compareFunc(item1:any,item2:any):number{
			var a:number,b:number;
			if(comparingValues!=""){
				a = item1[comparingValues];
				b = item2[comparingValues];
			}else{
				a = item1;
				b = item2;
			}
			if(a > b){
				return relationNum;
			}else if(a<b){
				return -relationNum;
			}else{
				return 0;
			}
		}
		return sourceCollection.sort(compareFunc);
	}
	/**根据对象键值排序 */
	export function sortByKey(source:any):any{
		var objKeys:string[] = Object.keys(source);
		return source;
	}
	/**时间格式化 */
	export function formatTime(timespan:number,ufc:boolean = true,extra:boolean = false):string{
		var data = new Date((timespan>0?timespan:-timespan)*1000);
		var year:number = data.getFullYear();
		var day:number = data.getDate();
		var hour:number = data.getHours();
		var month:number = data.getMonth()+1;
		var day:number = data.getDate();
		var minutes:number = data.getMinutes();
		var seconds:number = data.getSeconds();
		var str2:string = "";
		var str:string = ""
		if(ufc){
			str2 = year +"-" +(month<10?"0"+month:month)+"-"+(day<10?"0"+day:day)+"\t";
			str = (hour<10?"0"+hour:hour)+":"+(minutes<10?"0"+minutes:minutes)+":"+(seconds < 10?"0"+seconds:seconds);
			return str2+str;
		}else{
			if(extra){
				hour = Math.floor(timespan/3600);
				minutes = Math.floor(timespan%3600/60);
				seconds = Math.floor(timespan%3600%60);
				str = (hour<10?"0"+hour:hour)+":"+(minutes<10?"0"+minutes:minutes)+":"+(seconds < 10?"0"+seconds:seconds);
			}else{
				day = Math.floor(timespan/24/60/60);
				hour = Math.floor(timespan%(24*60*60)/3600);
				minutes = Math.floor(timespan%(24*60*60)%3600/60);
				str = day+"天"+hour+"时"+minutes+"分";
			}
			
			return str;
		}
	}
	 /**初始化锻造数据 */
	export function setForgingData(arr:Array<proto.StrengthenInfo>):Dictionary{
		var dict:Dictionary=new Dictionary("");
		var qianghuaArr:Array<any>=[];
		var gemArr:Array<any>=[];
		var zhulingArr:Array<any>=[];
		var refiningArr:Array<any>=[];
		var qita:any={};
		for(var i:number=0,item:proto.StrengthenInfo;i<arr.length;i++){
			var any:any={};
			item = arr[i];
			any.value=item.strengthId;
			var template:data.StrengthenTemple = temple.TempleManager.select(item.strengthId) as data.StrengthenTemple;
			try{
				any.pos = template.pos;
			}catch(err){
				console.log(item.strengthId);
			}

			switch(any.pos){
				case data.EquipPos.weapon:
					any.index=0;
				break;
				case data.EquipPos.head:
					any.index=1;
				break;
				case data.EquipPos.body:
					any.index=2;
				break;
				case data.EquipPos.neck:
					any.index=3;
				break;
				case data.EquipPos.left_bracelet:
					any.index=4;
				break;
				case data.EquipPos.right_bracelet:
					any.index=5;
				break;
				case data.EquipPos.left_ring:
					any.index=6;
				break;
				case data.EquipPos.right_ring:
					any.index=7;
				break;
				
			}

			switch(item.type){
				case 1:
					qianghuaArr.push(any);
					break;
				case 2:
					gemArr.push(any);
					break;
				case 3:
					zhulingArr.push(any);
					break;
				case 4:
					refiningArr.push(any);
					break;
				default:
					qita[item.type]=any.value;
					break;
				
			}
		}
		qianghuaArr.sort(this.sortArrByIndex);
		gemArr.sort(this.sortArrByIndex);
		zhulingArr.sort(this.sortArrByIndex);
		refiningArr.sort(this.sortArrByIndex);

		dict.add("qianghua",qianghuaArr);
		dict.add("gem",gemArr);
		dict.add("zhuling",zhulingArr);
		dict.add("refining",refiningArr);
		dict.add("other",qita);
		return dict;
	}

	/**
	 * 显示战力增长值相关tips
	 * 
	 * @:fightValue {number} 战力基础值
	 * @:combatValueArr {number[]} 战力提升集合
	 *
	 * */
	export function showPowerUpTips(fightValue:number,combatValueArr:number[]):void{
		function getSum(array){
			var sum:number = 0;
			for(var i:number = 0;i<array.length;i++){
				sum += array[i];
			}
			return sum;
		}
		function showPowerRes(){
			var valueArr:number[] = [];
			valueArr = valueArr.concat(combatValueArr);
			var obj = {w:300,h:20,text:"+"+getSum(valueArr),x:(Config.curWidth()>>1) + 50,y:(Config.curHeight()>>1)};
			var parentCon = ViewController.getInstance().getContainer().layer_popup;
			PopTipsManager.showUpGradeTips(obj,parentCon,null,this);
		}
		var x:number = (Config.curWidth()>>1) - 135;
		var y:number = (Config.curHeight()>>1) + 40;
		PopTipsManager.showPowerTips(x,y,fightValue,showPowerRes,this);
	}
	/**生成人物当前角色装备战力集合 */
	export function creteRolePowerObj(euqips:proto.ItemData[],job:number):void{
		var minEquipValuObj:any = {};
		for(var i:number = 0,len:number = euqips.length,item:proto.ItemData;i<len;i++){
			item = euqips[i];
			var posAndScoreObj:any = GlobalFunc.searchMoreAttrValue([data.ItemAttr.equipPos,data.ItemAttr.score],item.attrList)
			minEquipValuObj[posAndScoreObj[data.ItemAttr.equipPos]] = posAndScoreObj[data.ItemAttr.score];
		}
		DataCenter.roleMinEquipValueObj[job] = minEquipValuObj;
	}
	/**
	 * 挑战副本公共方法
	 * @levelId {number} {关卡id}
	 * @fuben {number} {当前副本}
	 */
	export function changeSence(levelId:number,arg:any,openModule:string = "",msg:string = "",dataObj:any = {}):void{
		var msg_challenge:proto.c_CreateNewSence = new proto.c_CreateNewSence();
		DataCenter.changeSenceState = true;
		msg_challenge.levelStageID = levelId;
		SocketManager.getInstance().sendProto(msg_challenge);
		// arg.sendMsgToModule([ModuleEnum.MAP],MainNotify.INITDATA);
		if(openModule){
			arg.sendMsgToModule([openModule],msg,dataObj);
		}
	}
	
}