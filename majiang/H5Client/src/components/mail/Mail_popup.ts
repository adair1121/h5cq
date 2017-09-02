class Mail_popup extends eui.Component{
	public constructor() {
		super();
		this.skinName="Mail_popup_skin";
	}
	public txt_content:eui.Label;
	public rewardList:eui.List;
	private rewardCollect:eui.ArrayCollection;
	public btn_reward:Btn1;
	public returnBtn:eui.Image;
	private callBack:Function;
	private arg:any;


	protected childrenCreated():void{
		this.btn_reward.label = "领取";
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
		this.rewardCollect = new eui.ArrayCollection();
		this.rewardList.itemRenderer = CommonItem;
		this.rewardList.dataProvider = this.rewardCollect;
	}
	private onClickHandler(evt:egret.TouchEvent):void{
		switch(evt.target){
			case this.btn_reward.button:
				this.callBack.call(this.arg);
				PopUpManager.removePopUp(this.skinName,0);
				break;
			case this.returnBtn:
				PopUpManager.removePopUp(this.skinName,0);
				break;
		}
	}
	public setMailData(dataObj:proto.MailData,callBackFunc:Function,arg:any):void{
		this.callBack = callBackFunc;
		this.arg = arg;
		var mailTemple:data.MailTemple = temple.TempleManager.select(dataObj.mailTemplateId) as data.MailTemple;
		var content:any = mailTemple.content;
		var str:string = content.format(content,dataObj.argumentList);
		this.txt_content.text = str;
		var itemList:proto.ItemData[] = dataObj.itemList;
		var arr:any[] = [];
		for(var i:number = 0,len = itemList.length,item:proto.ItemData;i<len;i++){
			item = itemList[i];
			var obj:any = {};
			var template:data.ItemTemple = temple.TempleManager.select(item.TempleID) as data.ItemTemple;
			var bgObj:any = GlobalFunc.setBgData(template.itemQuality);
			var count:number = GlobalFunc.searchAttrValue(data.ItemAttr.count,item.attrList);
			obj.rightValue = count?count:0;
			if(template.itemtype1 ===1 || template.itemtype1 === 3){
				//道具或代币
				obj.imgSource = Config.path_goods + template.icon + ".png";
			}else{
				obj.imgSource = Config.path_equip + template.icon + ".png";
			}
			obj.itemName = template.name;
			obj.boxS = bgObj.boxS;
			obj.color = DataCenter.bag.qualityColor[template.itemQuality];
			arr.push(obj);
		}
		this.rewardCollect.source = arr;
	}
}