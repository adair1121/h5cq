module lcp{
	export class LListener{
		public CLASS_NAME:string = "LListener";
		public static _instance:LListener;
		private _dispatcher:egret.EventDispatcher;
		public constructor(){
			if(this._dispatcher == null){
				this._dispatcher = new egret.EventDispatcher();
			}
		}
		public static getInstance():LListener{
            if(this._instance==null)
                this._instance = new LListener();
            return this._instance;
        }

        public addEventListener(type:string,listener:Function,thisObject:any,useCapture:boolean=false,priority:number=0):void{
            this._dispatcher.addEventListener(type,listener,thisObject,useCapture,priority);
        }

        public removeEventListener(type:string,listener:Function,thisObject:any,useCapture:boolean=false):void{
            this._dispatcher.removeEventListener(type,listener,thisObject,useCapture);
        }

        public hasEventListener(type:string):boolean
		{
			return this._dispatcher.hasEventListener(type);
		}

        public willTrigger(type:string):boolean
		{
			return this._dispatcher.willTrigger(type);
		}

        public dispatchEvent(event:ChangeEvent):boolean {
			return this._dispatcher.dispatchEvent(event);
		}

        public toString():string
		{
			return this._dispatcher.toString();
		}
	}
}