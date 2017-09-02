class Chat_ItemRenderer extends eui.ItemRenderer{
	public constructor() {
		super();
		this.skinName="Chat_ItemRenderer_skin";
		this.btn_addBlack.label = "屏蔽";
		this.btn_addBlack.size = 16;
		this.btn_addFriend.label = "好友";
		this.btn_addFriend.size = 16;
	}
	
	public icon:RoleHeadItemRender;
	public group_btnGroup:eui.Group;
	public btn_addFriend:Btn3;
	public btn_addBlack:Btn3;
	public group:eui.Group;
	public content:eui.Label;
	// public img:eui.Image;
	public chatSysImgIcon:eui.Image;
	public notice:eui.Label;
	private static _Sysheight:number = 50;
	private static _DefaultHeight:number = 100;
	
	private stateName:string;
	private roleData:proto.RoleBasicInfo;
	
	protected dataChanged():void{
		if(this.data.state=="system"){
			this.stateName="system";
			this.invalidateState();
			this.setSystemData();
		}else{
			this.stateName="default";
			this.group_btnGroup.visible = false;
			this.invalidateState();
			this.setDefaultData();
		}
	}
	public static m_Sysheight():number{
		return Chat_ItemRenderer._Sysheight;
	}
	public static m_Defaultheight():number{
		return Chat_ItemRenderer._DefaultHeight;
	}
	public setBtnVisible(visible:boolean):void{
		this.group_btnGroup.visible = visible;
	}
	public get btnGroupVisible():boolean{
		return this.group_btnGroup.visible;
	}
	protected getCurrentState(): string{
		if(this.stateName){
			return this.stateName;
		}
		return super.getCurrentState();
	}

	private setDefaultData():void{
		this.roleData=this.data.roleData;

		//type区分是普通，公告，系统
		this.icon.data={roleIcon:"head_"+1+"_"+1+"_png"};
		// if(this.data.type==0){
		// 	this.icon.visible=true;
		// 	this.chatSysImgIcon.visible=false;
		// 	this.icon.data={roleIcon:"head_"+1+"_"+1+"_png"};
		// }else{
		// 	this.icon.visible=false;
		// 	this.chatSysImgIcon.visible=true;
		// 	this.chatSysImgIcon.source="chat_msgType"+this.data.type+"_png";
		// }
		

		this.group.removeChildren();
		if(this.roleData && this.roleData.yueka){
			var yueka:eui.BitmapLabel=new eui.BitmapLabel();
			yueka.font="vipFont_fnt";
			yueka.text="月";
			this.group.addChild(yueka);
		}
		if(this.roleData && this.roleData.vip!=0){
			var vip:eui.BitmapLabel=new eui.BitmapLabel();
			vip.font="vipFont_fnt";
			vip.text="v"+this.roleData.vip;
			this.group.addChild(vip);
		}

		//如果是工会，，要显示职位
		// if(this.data.state=="gang"&&this.roleData.position){
		// 	var position:eui.Label=new eui.Label();
		// 	position.size=16;
		// 	position.textColor=0xfedc1b;
		// 	position.fontFamily="SimHei";
		// 	position.text="["+this.roleData.position+"]";
		// 	this.group.addChild(position);
		// }
		var name:eui.Label=new eui.Label();
		name.size=16;
		name.textColor=0x0fb8ff;
		name.fontFamily="SimHei";
		name.text=this.data.name;
		this.group.addChild(name);


		this.content.text=this.data.content;


	}
	private setSystemData():void{
		this.chatSysImgIcon.source="chat_msgType"+this.data.type+"_png";
		this.notice.text = this.data.content;
		//拼接文本内容
		this.content.textFlow= <Array<egret.ITextElement>>[
            {text: "妈妈再也不用担心我在", style: {"size": 20}}, 
            {text: "Egret", style: {"textColor": 0x336699, "size": 60, "strokeColor": 0x6699cc, "stroke": 2}},
            {text: "里说一句话不能包含", style: {"fontFamily": "楷体"}},
            {text: "各种", style: {"fontFamily": "楷体", "underline" : true}},
            {text: "五", style: {"textColor": 0xff0000}},
            {text: "彩", style: {"textColor": 0x00ff00}},
            {text: "缤", style: {"textColor": 0xf000f0}},
            {text: "纷", style: {"textColor": 0x00ffff}},
            {text: "、\n"},
            {text: "大", style: {"size": 56}},
            {text: "小", style: {"size": 16}},
            {text: "不", style: {"size": 26}},
            {text: "一", style: {"size": 34}},
            {text: "、"},
            {text: "格", style: {"italic": true, "textColor": 0x00ff00}},
            {text: "式", style: {"size": 26, "textColor": 0xf000f0}},
            {text: "各", style: {"italic": true, "textColor": 0xf06f00}},
            {text: "样的文字", style: {"fontFamily": "KaiTi"}},//楷体
            {text: "了！"}
        ];;
	}

}