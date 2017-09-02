//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends eui.UILayer {
    /**
     * 加载进度界面
     * loading process interface
     */
    private loadingView: LoadingUI;
    protected createChildren(): void {
        super.createChildren();
        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter",assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter",new ThemeAdapter());
        //Config loading process interface
        //设置加载进度界面
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        // initialize the Resource loading library
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json?v="+Config.RESVERSION, "resource/");
    }
    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     * Loading of configuration file is complete, start to pre-load the theme configuration file and the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        // load skin theme configuration file, you can manually modify the file. And replace the default skin.
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        let theme = new eui.Theme("resource/default.thm.json"+"?v="+Config.THMVERSION, this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);

        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }
    private isThemeLoadEnd: boolean = false;
    /**
     * 主题文件加载完成,开始预加载
     * Loading of theme configuration file is complete, start to pre-load the 
     */
    private onThemeLoadComplete(): void {
        this.isThemeLoadEnd = true;
        this.createScene();
    }
    private isResourceLoadEnd: boolean = false;
    /**
     * preload资源组加载完成
     * preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.isResourceLoadEnd = true;
            this.createScene();
        }
    }
    private createScene(){
        if(this.isThemeLoadEnd && this.isResourceLoadEnd){
            this.startCreateScene();
        }
    }
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }
    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //ignore loading failed projects
        this.onResourceLoadComplete(event);
    }
    /**
     * preload资源组加载进度
     * loading process of preload resource
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }
   



    /**
     * 创建场景界面
     * Create scene interface
     */
    protected startCreateScene(): void {
        var StringObj:any = String;
        /**
         * format
         * @arguments1 {string} {可操作字符串}
         * @...argument {string} {对应的值}
         */
        StringObj.prototype.format = function(){
            var pattern = /\{[0-9]\}+/g;
            var _args = arguments;
            var _cnt = _args[0];
            var _value = _args[1];
            var _match = _cnt.match(pattern);
            for(var i = 0;i<_match.length;i++){
                try{
                   _cnt =  _cnt.replace(_match[i],_value[i]);
                }catch(err){
                    throw new Error("format 格式错误")
                }
            }
            return _cnt;
        }
       

        Config.w_width=this.stage.stageWidth;
        Config.w_height=this.stage.stageHeight;

  

        ViewController.getInstance().registStage(this);   
        temple.TempleManager.init();
        var panel = ViewController.getInstance().getContainer().layer_panel;
        ViewController.getInstance().addView(panel,new View_selectServer());

        
          
      

        // /**链接服务器 */
        // SocketManager.getInstance().connectServer(Config.gameHost,Config.gamePort);


        // var mc:MovieClip=new MovieClip();
		
		// mc.loadFile(Config.path_roleMc+"10000_a_3",true,-1,()=>{
			
				
		// 		// this.effectPlaying=true;
		// },this)
        // this.addChild(mc);
        // mc.x=200;
        // mc.y=200;


        // var index=1;
        // this.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{

        //     var effectName=index+"10001";
        //     index+=1;
        //     if(index>3)index=1;
        //     var dir=3
        //     var p:egret.Point=new egret.Point(200,200)
        //     var mc1:SkillEffect=new SkillEffect();
        //     mc1.createSkill(effectName,dir,p.x+50-mc1.x,p.y-mc1.y)
        //     this.addChild(mc1);
        //     mc1.x=p.x;
        //     mc1.y=p.y;
        // },this)

        



        
        //  var mc1:MovieClip=new MovieClip();
		
		// mc1.loadFile(Config.path_effectMc+"10100_a_3",true,-1,()=>{
		// 	this.addChild(mc1);
		// 		mc1.scaleX=0.87;
		// 		mc1.scaleY=0.87;
        //         mc1.x=200;
        //         mc1.y=300;
				
		// 		// this.effectPlaying=true;
		// },this)

				// var mc=MoviePool.getInstance().getMc("31578_s_1");
				// mc.scaleX=1;
                // this.addChild(mc);
                // mc.x=mc.y=100;
				// var mc1=MoviePool.getInstance().getMc("31578_s_2");
				// mc1.scaleX=1;
                // this.addChild(mc1);
                //  mc1.x=mc1.y=100;
                // var mc2=MoviePool.getInstance().getMc("31578_s_3");
				// mc2.scaleX=1;
                // this.addChild(mc2);
                // mc2.x=mc2.y=100;
				// var mc3=MoviePool.getInstance().getMc("31578_s_4");
				// mc3.scaleX=1;
                // this.addChild(mc3);
                //  mc3.x=mc3.y=100;
                // var mc4=MoviePool.getInstance().getMc("31578_s_5");
				// mc4.scaleX=1;
                // this.addChild(mc4);
                // mc4.x=mc4.y=100;
				// var mc6=MoviePool.getInstance().getMc("31578_s_4");
				// mc6.scaleX=-1;
                // this.addChild(mc6);
                //  mc6.x=mc6.y=100;
                // var mc7=MoviePool.getInstance().getMc("31578_s_3");
				// mc7.scaleX=-1;
                // this.addChild(mc7);
                // mc7.x=mc7.y=100;
				// var mc8=MoviePool.getInstance().getMc("31578_s_2");
				// mc8.scaleX=-1;
                // this.addChild(mc8);
                //  mc8.x=mc8.y=100;

				// var role:RoleMc=new RoleMc(mc,mc1);
				
                // var aaa:Dictionary=new Dictionary();
                // aaa.add("aaa",role);
                // var a=aaa.get("aaa")
                // this.addChild(a);
                // a.x=a.y=250;

                // var b=aaa.get("aaa")
                // this.addChild(b);
                // a.x=a.y=50;

        // var name:string=30201+"_s_"+5;
		// var mc=MoviePool.getInstance().getMc(name);
		// this.addChild(mc);
		// mc.addEventListener(egret.Event.COMPLETE,()=>{
		// 	console.log(this);
			
		// },this);
		// mc.gotoAndPlay(0,1);


    }
      
}
