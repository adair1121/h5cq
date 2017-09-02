class View_selectServer extends eui.Component{
	public group:eui.Group;
	public startBtn:eui.Button;
    public btn_clear:eui.Button;
	public server0:eui.RadioButton;
	public server1:eui.RadioButton;
	public server2:eui.RadioButton;
    public server3:eui.RadioButton;
    private isClear:boolean;
	public constructor() {
		super();
		this.skinName = "View_selectServer_skin";
	}
	protected childrenCreated():void{
		var radioGroup:eui.RadioButtonGroup = new eui.RadioButtonGroup();
		this.server0.group = radioGroup;
		this.server1.group = radioGroup;
		this.server2.group = radioGroup;
        this.server3.group = radioGroup;
		this.server2.selected = true;
		Config.gameHost = this.server2.label;
		radioGroup.addEventListener(eui.UIEvent.CHANGE, this.radioChangeHandler, this);
		this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onStartServer,this);
        this.btn_clear.addEventListener(egret.TouchEvent.TOUCH_TAP,(event:egret.TouchEvent)=>{
            this.isClear=true;
            this.onStartServer(event);
        },this);
		this.startBtn["labelTxt"].text = "进入";
        this.btn_clear["labelTxt"].text = "清缓进入";
        this.btn_clear["labelTxt"].size=12
	}
	private radioChangeHandler(evt:eui.UIEvent):void{
		var radioGroup:eui.RadioButtonGroup = evt.target;
		var radioBtn:eui.RadioButton = radioGroup.selection;
		var txt:string = radioBtn.label;
		Config.gameHost = txt;

	}
	private onStartServer(evt:egret.TouchEvent):void{
		

		var name:string;
        var pwd:string;
		var date=new Date();
        var str=String(date.getTime()).slice(-9,-5);

        if(Config.gameHost=="172.17.1.51"){
            if(this.isClear){
                egret.localStorage.removeItem("loginName_p");
            }
            name=egret.localStorage.getItem("loginName_p");
            pwd=egret.localStorage.getItem("loginPwd_p");
            if(name&&pwd){
            }else{
				name="t"+Math.floor(Math.random()*99)+str;
                pwd="111111";
                egret.localStorage.setItem("loginName_p",name);
                egret.localStorage.setItem("loginPwd_p",pwd);
            }
            
        }else  if(Config.gameHost=="172.17.1.40"){
            if(this.isClear){
                egret.localStorage.removeItem("loginName_s");
            }
            name=egret.localStorage.getItem("loginName_s");
            pwd=egret.localStorage.getItem("loginPwd_s");
            if(name&&pwd){
            }else{
                name="t"+Math.floor(Math.random()*99)+str;
                pwd="111111";
                egret.localStorage.setItem("loginName_s",name);
                egret.localStorage.setItem("loginPwd_s",pwd);
            }
            
        }else  if(Config.gameHost=="172.17.1.40"){
            if(this.isClear){
                egret.localStorage.removeItem("loginName_s");
            }
            name=egret.localStorage.getItem("loginName_s");
            pwd=egret.localStorage.getItem("loginPwd_s");
            if(name&&pwd){
            }else{
                name="t"+Math.floor(Math.random()*99)+str;
                pwd="111111";
                egret.localStorage.setItem("loginName_s",name);
                egret.localStorage.setItem("loginPwd_s",pwd);
            }
            
        }else {
            if(this.isClear){
                egret.localStorage.removeItem("loginPwd_c");
            }
            name=egret.localStorage.getItem("loginName_c");
            pwd=egret.localStorage.getItem("loginPwd_c");
            if(name&&pwd){
            }else{
                name="t"+Math.floor(Math.random()*99)+str;
                pwd="111111";
                egret.localStorage.setItem("loginName_c",name);
                egret.localStorage.setItem("loginPwd_c",pwd);
            }
        }
        // var name = "g42"
        // var pwd="greentea";
        Config.username=name;
        Config.password=pwd;

		this.parent.removeChild(this);
		// /**链接服务器 */
        SocketManager.getInstance().connectServer(Config.gameHost,Config.gamePort);
	}
}