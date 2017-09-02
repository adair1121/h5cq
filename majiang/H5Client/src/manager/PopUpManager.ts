  /**
    * 面板弹出管理类
    */
module PopUpManager {

	export var darkSpriteDic:Dictionary = new Dictionary("darkSpriteDic");
	export var panelDic:Dictionary = new Dictionary("panelDic");
	var watcher:eui.Watcher;

    /**
    * 添加面板方法
    * panel       		面板
    * dark        		背景是否变黑
    * popUpWidth      	指定弹窗宽度，定位使用
    * popUpHeight      	指定弹窗高度，定位使用
    * effectType        0：没有动画 1:从中间轻微弹出 2：从中间猛烈弹出  3：从左向右 4：从右向左 5、从上到下 6、从下到上
    */
	export function addPopUp(panel, dark:boolean = false,key:string,layer:eui.Component =ViewController.getInstance().getContainer().layer_ui,effectType:number = 0,isAlert:boolean = false):void{ 
		if(layer.contains(panel)){//判断是否包含panel
			return;
		}

		if(dark){
			var darkSprite:egret.Sprite = new egret.Sprite();
	        darkSprite.graphics.clear();
	        darkSprite.graphics.beginFill(0x000000, 0.3);
	        darkSprite.graphics.drawRect(0, 0, Config.w_width, Config.w_height);
	        darkSprite.graphics.endFill();
	        darkSprite.width = Config.w_width;
	        darkSprite.height = Config.w_height;
	        if(!layer.contains(darkSprite)){
				layer.addChild(darkSprite );
	        }
	        darkSprite.touchEnabled = true;
	
	        egret.Tween.get(darkSprite).to({alpha:1},150);        
	        darkSprite.visible = true; 
			PopUpManager.darkSpriteDic.add(key,darkSprite);
		}
		layer.addChild(panel);
		PopUpManager.panelDic.add(key,panel);
		this.watcher = eui.Binding.bindHandler(panel,["height"],function(value:number){
			if(value){
				var popUpWidth = panel.width;
				var popUpHeight = value + 70;

				panel.x = Config.w_width/2 - popUpWidth/2;
				panel.y = Config.w_height/2 - popUpHeight/2;

				//以下是弹窗动画
				var leftX:number = Config.w_width/2 - popUpWidth/2;
				var upY:number = Config.w_height/2 - popUpHeight/2;

				switch(effectType){
					case 0:
						break;
					case 1:
						panel.alpha = 0;
						panel.scaleX = 0.5;
						panel.scaleY = 0.5;
						panel.x = panel.x + popUpWidth/4;
						panel.y = panel.y + popUpHeight/4;
						egret.Tween.get(panel).to({alpha:1,scaleX:1,scaleY:1,x:panel.x - popUpWidth/4,y:panel.y - popUpHeight/4},300,egret.Ease.backOut); 
						break;
					case 2:
						panel.alpha = 0;
						panel.scaleX = 0.5;
						panel.scaleY = 0.5;
						panel.x = panel.x + popUpWidth/4;
						panel.y = panel.y + popUpHeight/4;
						egret.Tween.get(panel).to({alpha:1,scaleX:1,scaleY:1,x:panel.x - popUpWidth/4,y:panel.y - popUpHeight/4},600,egret.Ease.elasticOut); 
						break;
					case 3:
						if(isAlert){
							panel.x = - popUpWidth;
							egret.Tween.get(panel).to({x:leftX},500,egret.Ease.cubicOut); 
						}else{
							panel.x = - popUpWidth;
							egret.Tween.get(panel).to({x:0},500,egret.Ease.cubicOut); 
						}
						break;
					case 4:
						if(isAlert){
							panel.x = popUpWidth;
							egret.Tween.get(panel).to({x:leftX},500,egret.Ease.cubicOut);  
						}else{
							panel.x = popUpWidth;
							egret.Tween.get(panel).to({x:0},500,egret.Ease.cubicOut);  
						}
						break;
					case 5:
						if(isAlert){
							panel.y = - popUpHeight;
							egret.Tween.get(panel).to({y:upY},500,egret.Ease.cubicOut); 
						}else{
							panel.y = - popUpHeight;
							egret.Tween.get(panel).to({y:0},500,egret.Ease.cubicOut);   
						}
						break;
					case 6:
						if(isAlert){
							panel.y = Config.w_height;
							egret.Tween.get(panel).to({y:upY},500,egret.Ease.cubicOut); 
						}else{
							panel.y = popUpHeight;
							egret.Tween.get(panel).to({y:0},500,egret.Ease.cubicOut); 
						}
						break;
					default:
						break;
				}
			}
		},this);
		
				
 
	} 
	function onTouchTap(evt:egret.TouchEvent){
		
	}
	/**
	 * 开启点击消失功能
	 */
	export function  startClickHidden(key:string,callBack:Function = null,callArg:any = null):void{
		var darkSprite:egret.Sprite = PopUpManager.darkSpriteDic.get(key);
		var touchTap:Function = function(evt:egret.TouchEvent){
			darkSprite.removeEventListener(egret.TouchEvent.TOUCH_TAP,touchTap,this,false);
			if(callBack && callArg){
				callBack.call(callArg);
			}
		}
		darkSprite.addEventListener(egret.TouchEvent.TOUCH_TAP,touchTap,this,false);
	}
    /**
    * 移除面板方法
    * panel       		面板
    * effectType        0：没有动画 1:从中间缩小消失 2：  3：从左向右 4：从右向左 5、从上到下 6、从下到上
    */
	export function removePopUp(key:string,effectType:number = 0):void{ 
		var darkSprite:egret.Sprite = PopUpManager.darkSpriteDic.get(key);
		var panel:any = PopUpManager.panelDic.get(key);
		if(darkSprite.parent){
			darkSprite.parent.removeChild( darkSprite );
			PopUpManager.darkSpriteDic.remove(key);
		}
		var onAniComplete:Function = function (){
			 egret.setTimeout(function () {
				panel.parent.removeChild(panel);
			}, this, 500);  
		}
		//以下是弹窗动画
        switch(effectType){
            case 0:
				if(panel && panel.parent && panel.parent.contains(panel)){
					this.watcher.unwatch();
					panel.parent.removeChild(panel);
					PopUpManager.panelDic.remove(key);
					return;
				}
                break;
            case 1:
				egret.Tween.get(panel).to({alpha:0,scaleX:0,scaleY:0,x:panel.x + Config.curWidth()/2,y:panel.y + Config.curHeight()/2},300).call(onAniComplete,this); 
                break;
            case 2:
                break;
            case 3:
		        egret.Tween.get(panel).to({x:Config.curWidth()},500,egret.Ease.cubicOut).call(onAniComplete,this); 
                break;
            case 4:
		        egret.Tween.get(panel).to({x:-Config.curWidth},500,egret.Ease.cubicOut).call(onAniComplete,this);        
                break;
            case 5:
		        egret.Tween.get(panel).to({y:Config.curHeight()},500,egret.Ease.cubicOut).call(onAniComplete,this);             
                break;
            case 6:
		        egret.Tween.get(panel).to({y:-Config.curHeight()},500,egret.Ease.cubicOut).call(onAniComplete,this);              
                break;
            default:
                break;
        }        
		
               
	} 

}


